from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import ProjectSerializer
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
