from django.urls import path
from .views import ProjectView, ClassroomView, GetClassroom

urlpatterns = [
    path('', ProjectView.as_view()),
    path('api/classroom/<int:teacher_fk_id>', GetClassroom.as_view())
]
