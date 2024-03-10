from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import TemplateSerializer
from springboard_api.models import Template, ProjectBoard


class CreateTemplate(generics.CreateAPIView):
    serializer_class = TemplateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAllTemplate(generics.ListAPIView):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()


class GetAllPublicTemplates(generics.ListAPIView):
    serializer_class = TemplateSerializer

    def get_queryset(self):
        return Template.objects.filter(isActive=True)


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


class GetTemplateByTeacherId(generics.ListAPIView):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

    def get(self, request, *args, **kwargs):
        teacher_id = self.kwargs.get('teacher_id')

        try:
            templates = Template.objects.filter(teacher_fk_id=teacher_id)
            serializer = TemplateSerializer(templates, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Template.DoesNotExist:
            return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateTemplate(generics.UpdateAPIView):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

    def update(self, request, *args, **kwargs):
        template_id = self.kwargs.get('template_id')

        try:
            template = Template.objects.get(id=template_id)
        except Template.DoesNotExist:
            return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TemplateSerializer(template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateTemplate(generics.UpdateAPIView):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

    def update(self, request, *args, **kwargs):
        template_id = self.kwargs.get('template_id')

        try:
            template = Template.objects.get(id=template_id)
        except Template.DoesNotExist:
            return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TemplateSerializer(template, data=request.data)
        if serializer.is_valid():
            updated_template = serializer.save()

            # Update all project boards with the same template_id
            project_boards = ProjectBoard.objects.filter(
                templateId=updated_template.id)
            for project_board in project_boards:
                project_board.title = updated_template.title
                project_board.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteTemplate(generics.DestroyAPIView):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

    def destroy(self, request, *args, **kwargs):
        template_id = self.kwargs.get('template_id')

        try:
            template = Template.objects.get(id=template_id)
            template.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Template.DoesNotExist:
            return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)
