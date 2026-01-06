from django.db import models
from django.contrib.auth.models import User


# User Model

class User(models.Model):
    username = models.CharField(max_length=20,unique=True)
    password = models.CharField(max_length=10)
    def __str__(self):
        return self.username

# ==================== CORE MODELS ====================
class ProgrammingLanguage(models.Model):
    """Supported programming languages"""
    LANGUAGE_CHOICES = [
        ('javascript', 'JavaScript'),
        ('python', 'Python'),
        ('java', 'Java'),
        ('cpp', 'C++'),
        ('csharp', 'C#'),
        ('react', 'React'),
        ('unity', 'Unity'),
        ('sql', 'SQL'),
        ('html_css', 'HTML/CSS'),
        ('github', 'GitHub'),

    ]
    language_name = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, unique=True)

    def __str__(self):
        return self.language_name
    
    

class NoteType(models.Model):
    """Type of notes"""
    TYPE_CHOICES = [
        ('concept', 'Concept'),
        ('bug', 'Bug'),
        ('learning', 'Learning'),
        ('mistake', 'Mistake'),
        ('project_issue', 'Project Issue'),
        ('interview_insight', 'Interview Insight'),
        ('optimization', 'Optimization'),
        ('cheatsheet', 'Cheatsheet'),
        ('algorithm', 'Algorithm'),
    ]
    
    note_type = models.CharField(max_length=20, choices=TYPE_CHOICES, unique=True)
    
    def __str__(self):
        return f"{self.note_type}"

class Tag(models.Model):
    """Tags for categorizing notes"""
    tag_name = models.CharField(max_length=50, unique=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.tag_name

# ==================== TOPIC MANAGEMENT ====================

class TopicCategory(models.Model):
    """Broad categories Frontend, Backend, Database."""
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend Development'),
        ('backend', 'Backend Development'),
        ('database', 'Database'),
        ('game_dev', 'Game Development'),
    ]

    primary_topic = models.CharField(max_length=20, choices=CATEGORY_CHOICES, unique=True)
    
    def __str__(self):
        return self.primary_topic


class MainTopic(models.Model):
    """ Topic Heading """
    topic_name = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(TopicCategory, on_delete=models.SET_NULL, null=True, blank=True)
    languages = models.ManyToManyField(ProgrammingLanguage, blank=True, related_name='topics')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.topic_name

class SubTopic(models.Model):
    """Subtopics like 'useState', 'useEffect', etc."""
    sub_topic = models.CharField(max_length=100)
    topic_name = models.ForeignKey(MainTopic, on_delete=models.CASCADE, related_name='subtopics')
    order = models.IntegerField(default=0, help_text="Display order")
    
    def __str__(self):
        return f"{self.topic_name} > {self.sub_topic}"

class CustomTopic(models.Model):
    main_topic = models.ForeignKey(MainTopic,on_delete=models.CASCADE)
    custom_topic = models.CharField(max_length = 100)

    def __str__(self):
        return self.main_topic


# ==================== NOTES CORE GENERIC ====================
class Note(models.Model):
    """Main note model"""
    # Categorization
    language = models.ForeignKey(ProgrammingLanguage, on_delete=models.PROTECT)
    note_type = models.ForeignKey(NoteType, on_delete=models.PROTECT)

    main_topic = models.ForeignKey(MainTopic, on_delete=models.SET_NULL, null=True, blank=True)
    sub_topic = models.ForeignKey(SubTopic, on_delete=models.SET_NULL, null=True, blank=True)

    # Custom topics (if not in predefined)
    custom_subtopic = models.CharField(max_length=200, blank=True)
    # user tags
    tags = models.ManyToManyField(Tag, blank=True, related_name='notes')

    # Ownership
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.note_type}"


# ==================== NOTE DETAILS ====================

class GenericDetails(models.Model):
    """Modular sections for detailed note taking"""
    SECTION_TYPES = [
        ('explanation', 'Explanation'),
        ('code', 'Code Example'),
        ('reasoning', 'Reasoning'),
        ('misconception', 'Misconception'),
    ]
    
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='sections')
    title = models.CharField(max_length=100,blank=False,null=True ,help_text="Provide title for the note")
    note_explanation = models.CharField(max_length=500,blank=False,null=False)
    note_reasoning = models.CharField(max_length=500,blank=True,null=True)
    note_misconception = models.CharField(max_length=500,blank=True,null=True)
    
    def __str__(self):
        return f"{self.note}"

class CodeSnippet(models.Model):
    """Store code snippets separately"""
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='code_snippets')
    code = models.TextField()
    language = models.ForeignKey(ProgrammingLanguage,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.note
