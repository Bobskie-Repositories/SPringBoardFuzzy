from django.urls import path
from .views import ClassroomView, GetClassroom
from .controllers.ProjectController import ProjectCreateView, ProjectView, GetProjectsByGroupId, GetProjectById, ProjectCreateView, DeleteProjectView
from .controllers.ProjectBoardController import GetProjectBoards, CreateProjectBoard, GetProjectBoardById, UpdateBoard, DeleteProjectBoard
from .controllers.TemplateController import GetTemplate, GetAllTemplate

urlpatterns = [
    path('', ProjectView.as_view()),
    path('api/group/<int:group_id>/projects', GetProjectsByGroupId.as_view()),
    path('api/project/<int:project_id>', GetProjectById.as_view()),
    path('api/project/create', ProjectCreateView.as_view()),
    path('api/project/<int:project_id>/delete', DeleteProjectView.as_view()),

    path('api/classroom/<int:teacher_fk_id>', GetClassroom.as_view()),

    path('api/project/<int:project_id>/projectboards', GetProjectBoards.as_view()),
    path('api/projectboards/<int:projectboard_id>',
         GetProjectBoardById.as_view()),
    path('api/project/<int:project_id>/addprojectboards',
         CreateProjectBoard.as_view()),
    path('api/projectboards/<int:projectboard_id>/update', UpdateBoard.as_view()),
    path('api/projectboards/<int:id>/delete',
         DeleteProjectBoard.as_view()),

    path('api/template/<int:template_id>', GetTemplate.as_view()),
    path('api/template/', GetAllTemplate.as_view()),
]
