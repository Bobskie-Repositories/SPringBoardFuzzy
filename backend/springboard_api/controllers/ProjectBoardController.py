from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectBoardSerializer
from springboard_api.models import ProjectBoard


class CreateProjectBoard(generics.CreateAPIView):
    serializer_class = ProjectBoardSerializer


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


class GetProjectBoardById(generics.ListAPIView):
    serializer_class = ProjectBoardSerializer
    queryset = ProjectBoard.objects.all()

    def get(self, request, *args, **kwargs):
        projectboard_id = self.kwargs.get('projectboard_id')

        try:
            projectboard = ProjectBoard.objects.get(id=projectboard_id)
            serializer = ProjectBoardSerializer(projectboard)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProjectBoard.DoesNotExist:
            return Response({"error": "ProjectBoards not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
