from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ClassroomSerializer, GroupSerializer, ProjectSerializer
from springboard_api.models import Classroom, Group, Project, ProjectBoard
from django.db.models import Max
from rest_framework.views import APIView


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


class GetClassroomById(generics.RetrieveAPIView):
    serializer_class = ClassroomSerializer
    queryset = Classroom.objects.all()

    def get(self, request, *args, **kwargs):
        class_id = self.kwargs.get('class_id')  # parameter name

        try:
            # Retrieve a single Classroom instance by ID
            classroom = Classroom.objects.get(id=class_id)
            # Serialize the single instance
            serializer = ClassroomSerializer(classroom)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Classroom.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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


# Inside your GetTopProjectsByClassroom view
class GetTopProjectsByClassroom(generics.ListAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

    def get(self, request, *args, **kwargs):
        classroom_id = self.kwargs.get('classroom_id')

        try:
            groups = self.get_queryset().filter(classroom_fk=classroom_id).order_by('name')
            group_serializer = GroupSerializer(groups, many=True)

            group_top_projects = []

            for group in groups:
                group_projects = Project.objects.filter(group_fk=group)

                top_project = group_projects.filter(
                    isActive=True).order_by('-score').first()

                if top_project:
                    project_serializer = ProjectSerializer(top_project)
                    group_top_projects.append({
                        'group_id': group.id,  # Add group ID
                        'group_name': group.name,
                        'top_project': project_serializer.data
                    })
                else:
                    # If no top project found, set the top_project field to zero
                    group_top_projects.append({
                        'group_id': group.id,  # Add group ID
                        'group_name': group.name,
                        'top_project': {'score': 0}
                    })

            # Sort groups based on the top project's score in descending order
            group_top_projects = sorted(
                group_top_projects, key=lambda x: x['top_project']['score'], reverse=True)

            return Response(group_top_projects, status=status.HTTP_200_OK)

        except Classroom.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Group.DoesNotExist:
            return Response({"error": "Groups not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Gets all the Groups that belongs to the classroom. This returns:
# the classroom name, list of groups (group name and list of projects),
# list of projects per group that are active with the average scores of each board
class GetClassroomGroupsAndProjects(APIView):
    def get(self, request, class_id):
        try:
            classroom = Classroom.objects.get(id=class_id)

            classroom_data = {
                "id": classroom.id,
                "name": classroom.class_name,
                "groups": []
            }

            groups = Group.objects.filter(classroom_fk=classroom)
            for group in groups:
                group_data = {
                    "id": group.id,
                    "name": group.name,
                    "projects": []
                }

                projects = Project.objects.filter(
                    group_fk=group, isActive=True)
                for project in projects:
                    project_data = {
                        "id": project.id,
                        "name": project.name,
                        "project_score": project.score,
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

                classroom_data["groups"].append(group_data)

            return Response(classroom_data, status=status.HTTP_200_OK)

        except Classroom.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
