from django.urls import path
from .controllers.ClassroomController import GetClassroom, GetClassroomById, GetGroupByClassId
from .controllers.ProjectController import ProjectCreateView, ProjectView, GetProjectsByGroupId, GetProjectById, ProjectCreateView, ProjectUpdateView, DeleteProjectView
from .controllers.ProjectBoardController import GetProjectBoards, CreateProjectBoard, GetProjectBoardById, UpdateBoard, DeleteProjectBoard
from .controllers.TemplateController import GetTemplate, GetAllTemplate, GetTemplateByTeacherId, GetAllPublicTemplates, CreateTemplate, UpdateTemplate, DeleteTemplate
from .controllers.StudentController import RegisterStudent, LoginStudent, LogoutStudent, StudentView
from .controllers.TeacherController import RegisterTeacher, LoginTeacher, LogoutTeacher, TeacherView, GetTeacherById
from .controllers.GroupController import GetGroupById

urlpatterns = [
    path('api/register-student', RegisterStudent.as_view()),
    path('api/login-student', LoginStudent.as_view()),
    path('api/active-student', StudentView.as_view()),
    path('api/logout-student', LogoutStudent.as_view()),

    path('api/register-teacher', RegisterTeacher.as_view()),
    path('api/login-teacher', LoginTeacher.as_view()),
    path('api/active-teacher', TeacherView.as_view()),
    path('api/logout-teacher', LogoutTeacher.as_view()),

    path('api/teacher/<int:id>', GetTeacherById.as_view()),

    path('', ProjectView.as_view()),
    path('api/group/<int:group_id>/projects', GetProjectsByGroupId.as_view()),
    path('api/project/<int:project_id>', GetProjectById.as_view()),
    path('api/project/create', ProjectCreateView.as_view()),
    path('api/project/<int:project_id>/update', ProjectUpdateView.as_view()),
    path('api/project/<int:project_id>/delete', DeleteProjectView.as_view()),

    path('api/classroom/<int:teacher_fk_id>/all', GetClassroom.as_view()),
    path('api/classroom/<int:class_id>', GetClassroomById.as_view()),
    path('api/classroom/<int:class_id>/group', GetGroupByClassId.as_view()),

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
    path('api/template/public', GetAllPublicTemplates.as_view()),
    path('api/teacher/template/<int:teacher_id>/',
         GetTemplateByTeacherId.as_view()),
    path('api/template/add', CreateTemplate.as_view()),
    path('api/template/<int:template_id>/update', UpdateTemplate.as_view()),
    path('api/template/<int:template_id>/delete', DeleteTemplate.as_view()),

    path('api/group/<int:group_id>', GetGroupById.as_view()),
]
