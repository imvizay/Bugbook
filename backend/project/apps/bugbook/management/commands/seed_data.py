from django.core.management.base import BaseCommand
import json
from apps.bugbook.models import (
    ProgrammingLanguage,
    NoteType,
    Tag,
    TopicCategory,
    MainTopic,
    SubTopic,
)

class Command(BaseCommand):
    help = "Seed predefined data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding started...")

        with open("apps/bugbook/seed_data/predefined_data.json", encoding="utf-8") as f:
            data = json.load(f)

        # -------------------------------
        # Programming Languages
        # -------------------------------
        lang_map = {}
        for lang in data.get("programming_languages", []):
            obj, _ = ProgrammingLanguage.objects.get_or_create(
                language_name=lang["language_name"]
            )
            lang_map[obj.language_name] = obj

        # -------------------------------
        # Note Types
        # -------------------------------
        for nt in data.get("note_types", []):
            NoteType.objects.get_or_create(
                note_type=nt["note_type"]
            )

        # -------------------------------
        # Topic Categories
        # -------------------------------
        cat_map = {}
        for cat in data.get("topic_categories", []):
            obj, _ = TopicCategory.objects.get_or_create(
                primary_topic=cat["primary_topic"]
            )
            cat_map[obj.primary_topic] = obj

        # -------------------------------
        # Main Topics
        # -------------------------------
        topic_map = {}
        for topic in data.get("main_topics", []):
            main_topic, _ = MainTopic.objects.get_or_create(
                topic_name=topic["topic_name"],
                category=cat_map.get(topic["category"])
            )

            # attach languages
            langs = [
                lang_map[l]
                for l in topic.get("languages", [])
                if l in lang_map
            ]
            main_topic.languages.set(langs)

            topic_map[main_topic.topic_name] = main_topic

        # -------------------------------
        # SubTopics 
        # -------------------------------
        for sub in data.get("subtopics", []):
            parent_topic = topic_map.get(sub["topic_name"])
            if not parent_topic:
                self.stdout.write(
                    self.style.WARNING(
                        f"Skipping subtopic '{sub['sub_topic']}' "
                        f"(main topic '{sub['topic_name']}' not found)"
                    )
                )
                continue

            SubTopic.objects.get_or_create(
                sub_topic=sub["sub_topic"],
                topic_name=parent_topic,
                defaults={"order": sub.get("order", 0)}
            )

        # -------------------------------
        # Tags
        # -------------------------------
        for tag in data.get("tags", []):
            Tag.objects.get_or_create(
                tag_name=tag["tag_name"],
                defaults={"created_by": None}
            )

        self.stdout.write(self.style.SUCCESS("Seed data inserted successfully"))
