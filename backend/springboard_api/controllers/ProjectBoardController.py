from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectBoardSerializer
from springboard_api.models import ProjectBoard, Project
import requests
from .ProjectController import UpdateProjectScoreView


class CreateProjectBoard(generics.CreateAPIView):
    serializer_class = ProjectBoardSerializer

    def perform_create(self, serializer, data):
        serializer.save(**data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        data = {}

        api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
        prompt = "Parse these data " + \
            str(request.data.get('content', '')) + "And Give the percentage rating(1-10) in terms of novelty, technical feasibility, Capability and provide at least 2 sentence for recommendations, and 2 for feedback. Add 2 referrence links for that topic in string. The output for each should be separated with a '+' all in single line"
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
            response = requests.post(
                api_url, json=request_payload, headers=headers)

            if response.status_code == 200:
                response_content = response.json()

                if response_content and response_content.get("choices"):
                    improved_unit_test = response_content["choices"][0]["text"].strip(
                    )
                    print(improved_unit_test)
                    # Split the improved_unit_test by '+' to extract values
                    values = improved_unit_test.split('+')

                    # Parse the values for each field
                    novelty = int(values[0].split(': ')[1].replace('%', ''))
                    technical_feasibility = int(
                        values[1].split(': ')[1].replace('%', ''))
                    capability = int(values[2].split(': ')[1].replace('%', ''))
                    recommendations = values[3].split(': ')[1]
                    feedback = values[4].split(': ')[1]
                    reference_links = values[5].split(': ')[1]

                    # Get the title, content, and project_fk from the request data
                    title = request.data.get('title', '')
                    content = request.data.get('content', '')
                    project_fk = request.data.get('project_fk', None)

                    data = {
                        'title': title,
                        'content': content,
                        'novelty': novelty,
                        'technical_feasibility': technical_feasibility,
                        'capability': capability,
                        'recommendation': recommendations,
                        'feedback': feedback,
                        'references': reference_links,
                        'project_fk': Project.objects.get(id=project_fk),
                    }
                    project_fk = request.data.get('project_fk', None)
                    update_score_url = f"http://127.0.0.1:8000/api/project/{project_fk}/update_score"
                    update_score_data = {
                        "score": novelty + technical_feasibility + capability,
                        "subtract_score": 0
                    }
                    response = requests.put(
                        update_score_url, json=update_score_data)

                else:
                    print("No response content or choices found.")
            else:
                error_message = response.text
                print(error_message)
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            data = {}

        if serializer.is_valid():
            self.perform_create(serializer, data)
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

            # Code for updating the board's content and other details with OpenAI
            data = {}  # Initialize data dictionary for OpenAI request

            existing_novelty = instance.novelty
            existing_technical_feasibility = instance.technical_feasibility
            existing_capability = instance.capability
            prev_score = existing_capability + \
                existing_novelty + existing_technical_feasibility

            print("Previous Score: {}".format(prev_score))

            api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
            prompt = "Parse these data " + str(request.data.get('content', '')) + \
                "And Give the percentage rating(1-10) in terms of novelty, technical feasibility, Capability and provide at least 2 sentences for recommendations, and 2 for feedback. Add 3 reference links for that topic in string. The output for each should be separated with a '+' all in a single line"

            request_payload = {
                "prompt": prompt,
                "temperature": 0.5,
                "max_tokens": 256,
                "top_p": 1.0,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.0
            }

            headers = {
                # Your OpenAI API key
                "Authorization": "Bearer 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"
            }

            try:
                response = requests.post(
                    api_url, json=request_payload, headers=headers)

                if response.status_code == 200:
                    response_content = response.json()

                    if response_content and response_content.get("choices"):
                        improved_unit_test = response_content["choices"][0]["text"].strip(
                        )

                        # Split the improved_unit_test by '+' to extract values
                        values = improved_unit_test.split('+')

                        # Parse the values for each field
                        novelty = int(values[0].split(
                            ': ')[1].replace('%', ''))
                        technical_feasibility = int(
                            values[1].split(': ')[1].replace('%', ''))
                        capability = int(values[2].split(': ')[
                                         1].replace('%', ''))
                        recommendations = values[3].split(': ')[1]
                        feedback = values[4].split(': ')[1]
                        reference_links = values[5].split(': ')[1]

                        data = {
                            'novelty': novelty,
                            'technical_feasibility': technical_feasibility,
                            'capability': capability,
                            'recommendation': recommendations,
                            'feedback': feedback,
                            'references': reference_links,
                        }
                        project_fk = request.data.get('project_fk', None)
                        update_score_url = f"http://127.0.0.1:8000/api/project/{project_fk}/update_score"
                        update_score_data = {
                            "score": novelty + technical_feasibility + capability,
                            "subtract_score": prev_score
                        }
                        response = requests.put(
                            update_score_url, json=update_score_data)
                    else:
                        print("No response content or choices found.")
                else:
                    error_message = response.text
                    print(error_message)
            except requests.exceptions.RequestException as e:
                print(f"An error occurred: {e}")

            # Update the instance with the parsed data from OpenAI
            for key, value in data.items():
                setattr(instance, key, value)
            instance.save()

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
