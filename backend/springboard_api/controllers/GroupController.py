from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import GroupSerializer
from springboard_api.serializers import ClassroomSerializer, GroupSerializer, ProjectSerializer
from springboard_api.models import Classroom, Group, Project, ProjectBoard
from django.db.models import Max
from rest_framework.views import APIView


class CreateGroup(generics.CreateAPIView):
    serializer_class = GroupSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = GroupSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetGroupById(generics.RetrieveAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

    def get(self, request, *args, **kwargs):
        group_id = self.kwargs.get('group_id')  # parameter name

        try:
            # Retrieve a single Classroom instance by ID
            group = Group.objects.get(id=group_id)
            # Serialize the single instance
            serializer = GroupSerializer(group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Gets all the Groups that belongs to the classroom. This returns:
# the classroom name, list of groups (group name and list of projects),
# list of projects per group that are active with the average scores of each board


class GetGroupsAndProjects(APIView):
    def get(self, request):
        try:
            all_group_data = []  # You need to store all group data

            groups = Group.objects.all()
            for group in groups:
                group_data = {
                    "id": group.id,
                    "name": group.name,
                    "classroom_id": group.classroom_fk.id,
                    "class_name": group.classroom_fk.class_name,
                    "projects": []
                }

                projects = Project.objects.filter(group_fk=group)
                for project in projects:
                    project_data = {
                        "id": project.id,
                        "name": project.name,
                        "isActive": project.isActive,
                        "description": project.description,
                        "reason": project.reason,
                        "project_score": project.score,
                        "created_at": project.created_at,
                        "project_boards": []
                    }

                    # Get the latest distinct project boards for each templateId within the project
                    project_boards = ProjectBoard.objects.filter(
                        project_fk=project
                    ).values('templateId').annotate(
                        latest_id=Max('id')
                    ).values('latest_id')

                    for board_data in project_boards:
                        board = ProjectBoard.objects.get(
                            id=board_data['latest_id'])
                        board_score = (
                            board.novelty + board.technical_feasibility + board.capability) / 3
                        project_board_data = {
                            "id": board.id,
                            "board_score": board_score,
                            "templateId": board.templateId
                        }
                        project_data["project_boards"].append(
                            project_board_data)

                    group_data["projects"].append(project_data)

                # Append each group data to the list
                all_group_data.append(group_data)

            # Flatten the list to match the specified format
            flattened_data = []
            for group_data in all_group_data:
                if not group_data["projects"]:
                    flattened_data.append({
                        "id": group_data["id"],
                        "name": group_data["name"],
                        "classroom_id": group_data["classroom_id"],
                        "class_name": group_data["class_name"],
                        "projects": [{"id": None, "name": "No Project", "project_boards": []}]
                    })
                else:
                    for project_data in group_data["projects"]:
                        flattened_data.append({
                            "id": group_data["id"],
                            "name": group_data["name"],
                            "classroom_id": group_data["classroom_id"],
                            "class_name": group_data["class_name"],
                            "projects": [project_data]
                        })

            return Response(flattened_data, status=status.HTTP_200_OK)

        except Group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)


class GetGroupByClassId(generics.ListAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

    def get(self, request, *args, **kwargs):
        class_id = self.kwargs.get('class_id')  # parameter name

        try:
            groups = Group.objects.filter(classroom_fk=class_id)
            serializer = GroupSerializer(groups, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateGroup(generics.RetrieveUpdateAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    lookup_url_kwarg = 'group_id'  # Set to the parameter name used in your URL pattern

    def put(self, request, *args, **kwargs):
        # Use the same parameter name here
        group_id = self.kwargs.get('group_id')

        try:
            group = self.get_object()
            serializer = GroupSerializer(group, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
