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
