from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectSerializer, InactiveProjectSerializer
from springboard_api.models import Project, ProjectBoard
from django.shortcuts import get_object_or_404


# Create your views here.
# Create a project


class ProjectCreateView(generics.CreateAPIView):
    # Return all projects and create
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        serializer.save()  # Save the new project object

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


class GetPublicProjectsByGroupId(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        group_id = self.kwargs.get('group_id')
        # Filter projects by group ID and isActive attribute
        return Project.objects.filter(group_fk_id=group_id, isActive=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetActiveProjectsView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(isActive=True)

    def list(self, request, *args, **kwargs):
        public_projects = self.get_queryset()  # Get the queryset of active projects
        serializer = self.get_serializer(public_projects, many=True)

        if public_projects:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_204_NO_CONTENT)


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


class ProjectUpdateView(generics.UpdateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def put(self, request, *args, **kwargs):
        project_id = self.kwargs.get('project_id')
        project = get_object_or_404(Project, pk=project_id)

        serializer = self.get_serializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateProjectScoreView(generics.UpdateAPIView):
    serializer_class = ProjectSerializer

    def update(self, request, project_id, *args, **kwargs):
        instance = get_object_or_404(Project, id=project_id)
        try:
            new_score = float(request.data.get('score', '0'))
            subtract_score = float(request.data.get('subtract_score', '0'))
        except ValueError:
            return Response("Invalid score format", status=status.HTTP_400_BAD_REQUEST)

        instance.score += (new_score - subtract_score)
        instance.save()
        serializer = self.serializer_class(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateProjectStatusView(generics.UpdateAPIView):
    serializer_class = ProjectSerializer

    def update(self, request, project_id, *args, **kwargs):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response("Project not found", status=status.HTTP_404_NOT_FOUND)

        # Get the group ID of the project
        group_id = project.group_fk_id

        # Set isActive=False for all projects in the same group
        Project.objects.filter(group_fk=group_id).update(isActive=False)

        # Set isActive=True for the specific project
        project.isActive = True
        project.save()

        serializer = self.serializer_class(project)

        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteProjectView(generics.DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def destroy(self, request, *args, **kwargs):
        project_id = self.kwargs.get('project_id')
        project = get_object_or_404(Project, pk=project_id)

        # Delete the project
        project.delete()

        return Response({"message": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class InactiveProjectsView(generics.ListAPIView):
    serializer_class = InactiveProjectSerializer

    def get_queryset(self):
        # Retrieve all projects with isActive=False
        return Project.objects.filter(isActive=False)
