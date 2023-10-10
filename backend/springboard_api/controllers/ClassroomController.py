from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ClassroomSerializer, GroupSerializer
from springboard_api.models import Classroom, Group


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
