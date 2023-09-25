from django.urls import path
from .views import ProjectView, ClassroomView, GetClassroom, GetProjectByGroupId, GetProjectBoards, GetProject

urlpatterns = [
    path('', ProjectView.as_view()),
    path('api/classroom/<int:teacher_fk_id>', GetClassroom.as_view()),
    path('api/group/<int:group_id>/projects', GetProjectByGroupId.as_view()),
    path('api/project/<int:project_id>/projectboards', GetProjectBoards.as_view()),
    path('api/project/<int:project_id>', GetProject.as_view()),
]
