# web app models
from apps.bugbook.models import (
    ProgrammingLanguage,
    Tag,
    MainTopic,
    SubTopic,
    Note,
    NoteType,
    GenericDetails,
    CodeSnippet,
    User,
)

from rest_framework import serializers


# ---------------- TAG ----------------
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "tag_name"]


# ---------------- GENERIC DETAILS ----------------
class GenericDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericDetails
        fields = [
            "note_explanation",
            "note_reasoning",
            "note_misconception",
        ]


# ---------------- NOTE CREATE ----------------
class NoteCreateSerializer(serializers.Serializer):
    # identity (custom, no auth)
    username = serializers.CharField(write_only=True)

    # ---- relations (DRF resolves objects) ----
    language = serializers.PrimaryKeyRelatedField(
        queryset=ProgrammingLanguage.objects.all()
    )
    note_type = serializers.PrimaryKeyRelatedField(
        queryset=NoteType.objects.all()
    )
    topic = serializers.PrimaryKeyRelatedField(
        queryset=MainTopic.objects.all(),
        required=False,
        allow_null=True
    )
    sub_topic = serializers.PrimaryKeyRelatedField(
        queryset=SubTopic.objects.all(),
        required=False,
        allow_null=True
    )

    # ---- tags ----
    tags = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

    custom_topic = serializers.CharField(required=False, allow_blank=True)

    # ---- content ----
    explanation = serializers.CharField()
    reasoning = serializers.CharField(required=False, allow_blank=True)
    misconception = serializers.CharField(required=False, allow_blank=True)
    code = serializers.CharField(required=False, allow_blank=True)

    # ---------- FIELD VALIDATION ----------
    def validate_tags(self, value):
        cleaned = []

        for tag in value:
            tag = tag.strip().lower()
            if not tag:
                raise serializers.ValidationError("Empty tag not allowed")
            cleaned.append(tag)

        if len(cleaned) > 4:
            raise serializers.ValidationError("Max 4 tags allowed")

        return cleaned

    # ---------- OBJECT CREATION ----------
    def create(self, validated_data):
        # --- resolve user ---
        username = validated_data.pop("username")
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError({
                "username": "User does not exist"
            })

        tags = validated_data.pop("tags", [])
        code = validated_data.pop("code", None)

        # --- create note ---
        note = Note.objects.create(
            user=user,
            language=validated_data["language"],
            note_type=validated_data["note_type"],
            main_topic=validated_data.get("topic"),
            sub_topic=validated_data.get("sub_topic"),
            custom_subtopic=validated_data.get("custom_topic", "")
        )

        # --- generic details ---
        GenericDetails.objects.create(
            note=note,
            note_explanation=validated_data["explanation"],
            note_reasoning=validated_data.get("reasoning", ""),
            note_misconception=validated_data.get("misconception", "")
        )

        # --- tags (M2M) ---
        tag_objs = [
            Tag.objects.get_or_create(
                tag_name=tag,
                defaults={"created_by": user}
            )[0]
            for tag in tags
        ]
        if tag_objs:
            note.tags.set(tag_objs)

        # --- optional code ---
        if code:
            CodeSnippet.objects.create(
                note=note,
                code=code,
                language=note.language
            )

        return note


# ---------------- TOPIC + SUBTOPICS ----------------
class SubTopicListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTopic
        fields = ["id", "sub_topic"]


class TopicWithSubtopicsSerializer(serializers.ModelSerializer):
    subtopics = SubTopicListSerializer(many=True, read_only=True)

    class Meta:
        model = MainTopic
        fields = ["id", "topic_name", "subtopics"]



class NoteResponseSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    language = serializers.StringRelatedField()
    note_type = serializers.StringRelatedField()
    main_topic = serializers.StringRelatedField()
    sub_topic = serializers.StringRelatedField()

    class Meta:
        model = Note
        fields = [
            "id",
            "language",
            "note_type",
            "main_topic",
            "sub_topic",
            "custom_subtopic",
            "tags",
            "created_at",
        ]


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
            model = ProgrammingLanguage
            fields = '__all__'    



from .models import Note
from .models import CodeSnippet
from rest_framework import serializers
from .models import GenericDetails

class GenericDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericDetails
        fields = [
            "id",
            "note_explanation",
            "note_reasoning",
            "note_misconception",
        ]

class CodeSnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSnippet
        fields = ["id", "code", "language"]


class NoteDetailSerializer(serializers.ModelSerializer):
    sections = GenericDetailsSerializer(many=True, read_only=True)
    code_snippets = CodeSnippetSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = [
            "id",
            "language",
            "note_type",
            "main_topic",
            "sub_topic",
            "custom_subtopic",
            "tags",
            "sections",
            "code_snippets",
            "created_at",
        ]
