"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from apps.bugbook.views import (
    TopicSubtopicView,NoteCreateView,
    lang_list,
    note_list,
    delete_note,
    update_note
    )

# login and signup
from apps.authentication.views import RegisterView,LoginView,LogoutView


urlpatterns = [
    path('admin/', admin.site.urls),
    # login 
    path('api/signup/',RegisterView.as_view(),name='singup_view'),
      path("api/logout/", LogoutView.as_view(), name="logout"),
    # signup
    path('api/login/',LoginView.as_view(),name='login_view'),


    path('api/lang/',lang_list,name="notes"),
    path('api/user/language/notes/',note_list,name='user_notes'),
    path('api/notes/',NoteCreateView.as_view(),name="notes"), # add note
    path('api/notes/<int:note_id>/',delete_note,name="delete_note"), # add note
    path('api/update_note/<int:update_id>/',update_note,name="delete_note"), # add note


    path('api/topic-subtopics/<str:language>',TopicSubtopicView.as_view(),name="topic-subtopics")
]
