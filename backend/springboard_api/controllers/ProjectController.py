from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectSerializer
from springboard_api.models import Project

# Create your views here.
# Create a project


class ProjectCreateView(generics.CreateAPIView):
    # return all projects and create
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Get all Projects


class ProjectView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Get all projects of the group


class GetProjectsByGroupId(generics.ListAPIView):
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

# Get project by id


class GetProjectById(generics.ListAPIView):
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
