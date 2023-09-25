from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectSerializer, ClassroomSerializer
from .models import Classroom, Group, Project, ProjectBoard, Teacher, Student


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
        teacher_fk_id = self.kwargs.get('teacher_fk_id')

        try:
            classrooms = Classroom.objects.filter(teacher_fk_id=teacher_fk_id)
            serializer = ClassroomSerializer(classrooms, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Classroom.DoesNotExist:
            return Response({"error": "Classrooms not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
