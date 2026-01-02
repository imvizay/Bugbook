# views.py

from rest_framework.views import APIView
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
