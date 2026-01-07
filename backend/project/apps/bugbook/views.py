# views.py

from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.viewsets import generics
from rest_framework.response import Response
from apps.bugbook.models import MainTopic
from apps.bugbook.serializers import TopicWithSubtopicsSerializer
from apps.bugbook.serializers import NoteResponseSerializer,NoteCreateSerializer

from rest_framework.permissions import IsAuthenticated

from apps.bugbook.models import Note

class TopicSubtopicView(APIView):
     def get(self, request ,language):
        topics = (
            MainTopic.objects
            .filter(languages__language_name=language)
            .prefetch_related("subtopics")
            .distinct()
            .order_by("topic_name")
        )

        serializer = TopicWithSubtopicsSerializer(topics, many=True)
        return Response(serializer.data)


class NoteCreateView(generics.CreateAPIView):
    serializer_class = NoteCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        note = serializer.save()

        return Response(
            NoteResponseSerializer(note).data,
            status=201
        )





# Languaage List
from apps.bugbook.serializers import LanguageSerializer
from apps.bugbook.models import ProgrammingLanguage
@api_view(["GET"])
def lang_list(request):
    user = "randomuser@gmail.com"

    if(user):
        query_set = ProgrammingLanguage.objects.all()
        serializer = LanguageSerializer(query_set,many=True)
        return Response(serializer.data)
    
    return Response({"error":"UnAuthorised user"},status=401)

from apps.bugbook.serializers import NoteDetailSerializer
@api_view(["GET"])
def note_list(request):
    language_id = request.query_params.get("language")
    if not language_id:
        return Response({"error":"no language id provided with request"},status=400)
    
    notes = ( 
        Note.objects
            .filter(language=language_id)
            .select_related("language","note_type")
            .prefetch_related("sections","code_snippets","tags")
        )

    serializer = NoteDetailSerializer(notes, many=True)
    print("SERIALIZER DATA :")
    print(serializer.data)
    return Response(serializer.data or [])


@api_view(["DELETE"])
def delete_note(request, note_id):
    try:
        note = Note.objects.get(id=note_id)
    except Note.DoesNotExist:
        return Response(
            {"error": "Note not found"},
            status=404
        )

    note.delete()
    return Response(
        {"message": "Note deleted successfully"},
        status=204
    )

from apps.bugbook.models import GenericDetails,Tag,CodeSnippet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction
from apps.bugbook.models import Note, GenericDetails, CodeSnippet, Tag

@api_view(["PUT"])
@transaction.atomic
def update_note(request, update_id):
    try:
        note = Note.objects.select_for_update().get(id=update_id)
    except Note.DoesNotExist:
        return Response({"error": "Note not found"}, status=404)

    data = request.data

    # -------- SAFE FK ASSIGNMENT --------
    def safe_fk(val):
        return val if val not in (0, "0", "", None) else None

    note.language_id = safe_fk(data.get("language"))
    note.note_type_id = safe_fk(data.get("note_type"))
    note.main_topic_id = safe_fk(data.get("topic"))
    note.sub_topic_id = safe_fk(data.get("sub_topic"))
    note.custom_subtopic = data.get("custom_topic", "")

    note.save()

    # -------- GENERIC DETAILS --------
    section, _ = GenericDetails.objects.get_or_create(note=note)
    section.note_explanation = data.get("explanation", "")
    section.note_reasoning = data.get("reasoning", "")
    section.note_misconception = data.get("misconception", "")
    section.save()

    # -------- CODE SNIPPET --------
    code = data.get("code", "")
    if code.strip():
        snippet, _ = CodeSnippet.objects.get_or_create(
            note=note,
            defaults={"language_id": note.language_id}
        )
        snippet.code = code
        snippet.language_id = note.language_id
        snippet.save()
    else:
        CodeSnippet.objects.filter(note=note).delete()

    # -------- TAGS (M2M) --------
    tag_names = data.get("tags", [])
    tag_objs = []

    for name in tag_names:
        if name.strip():
            tag, _ = Tag.objects.get_or_create(tag_name=name.strip().lower())
            tag_objs.append(tag)

    note.tags.set(tag_objs)

    return Response(
        {"message": "Note updated successfully"},
        status=200
    )
