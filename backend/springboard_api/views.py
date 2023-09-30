from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectSerializer, ClassroomSerializer, GroupSerializer, ProjectBoardSerializer, TemplateSerializer
from .models import Classroom, Group, Project, ProjectBoard, Teacher, Student, Template


# Create your views here.
class ProjectCreateView(generics.CreateAPIView):
    # return all projects and create
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectView(generics.ListAPIView):
    # return all projects
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ClassroomView(generics.ListAPIView):
    # return all projects
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer


class GetClassroom(generics.ListAPIView):
    serializer_class = ClassroomSerializer
    queryset = Classroom.objects.all()

    def get(self, request, *args, **kwargs):
        teacher_fk_id = self.kwargs.get('teacher_fk_id')  # parameter name

        try:
            classrooms = Classroom.objects.filter(teacher_fk_id=teacher_fk_id)
            serializer = ClassroomSerializer(classrooms, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Classroom.DoesNotExist:
            return Response({"error": "Classrooms not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetProjectByGroupId(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get(self, request, *args, **kwargs):
        group_id = self.kwargs.get('group_id')

        try:
            projects = Project.objects.filter(group_fk_id=group_id)
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({"error": "Projects not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetProject(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get(self, request, *args, **kwargs):
        project_id = self.kwargs.get('project_id')

        try:
            projects = Project.objects.get(id=project_id)
            serializer = ProjectSerializer(projects)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({"error": "Projects not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetProjectBoards(generics.ListAPIView):
    serializer_class = ProjectBoardSerializer
    queryset = ProjectBoard.objects.all()

    def get(self, request, *args, **kwargs):
        project_fk_id = self.kwargs.get('project_id')

        try:
            projectboard = ProjectBoard.objects.filter(
                project_fk_id=project_fk_id)
            serializer = ProjectBoardSerializer(projectboard, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProjectBoard.DoesNotExist:
            return Response({"error": "ProjectBoards not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetTemplate(generics.ListAPIView):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

    def get(self, request, *args, **kwargs):
        template_id = self.kwargs.get('template_id')

        try:
            template = Template.objects.get(id=template_id)
            serializer = TemplateSerializer(template)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Template.DoesNotExist:
            return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
