from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import TemplateSerializer
from springboard_api.models import Template


# Get Template by id
class GetTemplate(generics.ListAPIView):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

    def get(self, request, *args, **kwargs):
        template_id = self.kwargs.get('template_id')

        try:
            template = Template.objects.get(id=template_id)
            serializer = TemplateSerializer(template)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Template.DoesNotExist:
            return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
