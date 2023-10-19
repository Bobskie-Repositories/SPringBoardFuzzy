from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectBoardSerializer
from springboard_api.models import ProjectBoard
import requests 


class CreateProjectBoard(generics.CreateAPIView):
    serializer_class = ProjectBoardSerializer
    
    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
        prompt = "Parse these data " + str(request.data) + "And Give the percentage rating in terms of novelty, technical feasibility, Capability and provide atleast 2 sentences for recommendations and feedback. The output for each should be concatanated with a '+'"
        request_payload = {
            "prompt": prompt,
            "temperature": 0.5,
            "max_tokens": 256,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0
        }
        headers = {
            "Authorization": "Bearer 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"
        }

        try:
            response = requests.post(api_url, json=request_payload, headers=headers)

            if response.status_code == 200:
                response_content = response.json()

                if response_content and response_content.get("choices"):
                    improved_unit_test = response_content["choices"][0]["text"].strip()
                    print(improved_unit_test)
                else:
                    print("No response content or choices found.")
            else:
                error_message = response.text
                print(error_message)
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
        
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


class UpdateBoard(generics.UpdateAPIView):
    serializer_class = ProjectBoardSerializer
    queryset = ProjectBoard.objects.all()
    lookup_url_kwarg = 'projectboard_id'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProjectBoard(generics.DestroyAPIView):
    queryset = ProjectBoard.objects.all()
    serializer_class = ProjectBoardSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ProjectBoard.DoesNotExist:
            return Response({"error": "ProjectBoard not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
