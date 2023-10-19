from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import GroupSerializer
from springboard_api.models import Group


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
