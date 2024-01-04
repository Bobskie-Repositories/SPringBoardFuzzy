import json
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectBoardSerializer
from springboard_api.models import ProjectBoard, Project
import requests
from django.db.models import Max
from django.conf import settings
import os


class CreateProjectBoard(generics.CreateAPIView):
    serializer_class = ProjectBoardSerializer

    def perform_create(self, serializer, data):
        serializer.save(**data)

    def update_project_score(self, project, add_score):
        project.score += add_score
        project.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        data = {}

        highest_board_id = ProjectBoard.objects.aggregate(Max('boardId'))[
            'boardId__max']
        new_board_id = highest_board_id + 1 if highest_board_id is not None else 1

        api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
        prompt = (
            f"Parse these data {request.data.get('content', '')} and give a detailed and critical rating (1-10) number in terms of "
            f"novelty, technical feasibility, and capability. Consider giving a rating BELOW 5 for data which has bad composition, "
            f"lack of effort, very few words, and lack of information. Be critical and practical when rating. Provide at least 2 insightful/advice sentences for recommendations on parts of the data, "
            f"2 for feedback on parts of the data in regards to how the data is presented and structured, what can be done to improve those parts. Use the web and add 2 reference links(enclosed in double quotation, separate the links with a comma, and name the header as References) for "
            f"that topic in string. Put labels like 'Novelty: (the response)...'. The output should be in a sentence. "
            f"Please ensure to critically assess each aspect and provide a fair and balanced rating. And make it in a JSON format."
        )
        request_payload = {
            "prompt": prompt,
            "temperature": 0.5,
            "max_tokens": 256,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0
        }

        headers = {"Authorization": os.environ.get("OPENAI_KEY", "")}

        try:
            response = requests.post(
                api_url, json=request_payload, headers=headers)

            if response.status_code == 200:
                try:
                    response_content = response.json()
                    choices = response_content.get("choices", [])

                    if choices:
                        gpt_response = choices[0]["text"].strip()
                        json_response = json.loads(gpt_response)
                        novelty = json_response.get("Novelty", 0)
                        technical_feasibility = json_response.get(
                            "Technical Feasibility", 0)
                        capability = json_response.get("Capability", 0)
                        recommendations = json_response.get(
                            "Recommendations", "")
                        feedback = json_response.get("Feedback", "")
                        reference_links = json_response.get(
                            "References", "").strip('"')

                        if not (reference_links.startswith('"') and reference_links.endswith('"')):
                            reference_links = f'{reference_links}'

                        title = request.data.get('title', '')
                        content = request.data.get('content', '')
                        project_fk_id = request.data.get('project_fk', None)

                        data = {
                            'title': title,
                            'content': content,
                            'novelty': novelty,
                            'technical_feasibility': technical_feasibility,
                            'capability': capability,
                            'recommendation': recommendations,
                            'feedback': feedback,
                            'references': reference_links,
                            'project_fk': Project.objects.get(id=project_fk_id),
                            'boardId': new_board_id,
                        }

                        project_instance = Project.objects.get(
                            id=project_fk_id)
                        add_score = (
                            (novelty * 0.4) +
                            (technical_feasibility * 0.3) +
                            (capability * 0.3)
                        )
                        self.update_project_score(
                            project_instance, add_score)

                    else:
                        print("No response content or choices found.")
                except json.JSONDecodeError as json_error:
                    return Response({"error": f"Error decoding JSON response: {json_error}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"error": response.text}, status=status.HTTP_400_BAD_REQUEST)
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            data = {}

        if serializer.is_valid():
            self.perform_create(serializer, data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetProjectBoards(generics.ListAPIView):
    serializer_class = ProjectBoardSerializer

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')

        # Get the latest distinct project boards for each templateId within the specified project
        queryset = ProjectBoard.objects.filter(project_fk_id=project_id).values(
            'templateId').annotate(
                latest_id=Max('id'),
        ).values(
                'latest_id',
        )

        return ProjectBoard.objects.filter(id__in=queryset)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetVersionProjectBoards(generics.ListAPIView):
    serializer_class = ProjectBoardSerializer
    queryset = ProjectBoard.objects.all()

    def get(self, request, *args, **kwargs):
        projectboard_id = self.kwargs.get('projectboard_id')

        try:
            projectboard = ProjectBoard.objects.get(id=projectboard_id)
            template_id = projectboard.templateId
            board_id = projectboard.boardId

            # Retrieve related project boards with the same templateId and boardId
            related_projectboards = ProjectBoard.objects.filter(
                templateId=template_id, boardId=board_id)

            # Sort the related project boards in decreasing order of their creation date
            related_projectboards = related_projectboards.order_by(
                '-created_at')

            serializer = ProjectBoardSerializer(
                related_projectboards, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProjectBoard.DoesNotExist:
            return Response({"error": "ProjectBoard not found"}, status=status.HTTP_404_NOT_FOUND)
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


class UpdateBoard(generics.CreateAPIView):
    serializer_class = ProjectBoardSerializer

    def update_project_score(self, project, subtract_score, new_score):
        project.score -= subtract_score
        project.score += new_score
        project.save()

    def create(self, request, *args, **kwargs):
        data = request.data
        project_board_id = kwargs.get('projectboard_id')

        try:
            project_board = ProjectBoard.objects.get(id=project_board_id)

            subtract_score = (
                (project_board.novelty * 0.4) +
                (project_board.technical_feasibility * 0.3) +
                (project_board.capability * 0.3)
            )

            api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
            prompt = (
                f"Parse these data {request.data.get('content', '')} and give a detailed and critical rating (1-10) number in terms of "
                f"novelty, technical feasibility, and capability. Consider giving a rating BELOW 5 for data which has bad composition, "
                f"lack of effort, very few words, and lack of information. Be critical and practical when rating. Provide at least 2 insightful/advice sentences for recommendations on parts of the data, "
                f"2 for feedback on parts of the data in regards to how the data is presented and structured, what can be done to improve those parts. Use the web and add 2 reference links(enclosed in double quotation, separate the links with a comma, and name the header as References) for "
                f"that topic in string. Put labels like 'Novelty: (the response)...'. The output should be in a sentence. "
                f"Please ensure to critically assess each aspect and provide a fair and balanced rating. And make it in a JSON format."
            )

            request_payload = {
                "prompt": prompt,
                "temperature": 0.5,
                "max_tokens": 256,
                "top_p": 1.0,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.0
            }

            headers = {
                "Authorization": os.environ.get("OPENAI_KEY") + ""
            }

            response = requests.post(
                api_url, json=request_payload, headers=headers)

            if response.status_code == 200:
                try:
                    response_content = response.json()
                    choices = response_content.get("choices", [])
                    if choices:
                        gpt_response = choices[0]["text"].strip()
                        json_response = json.loads(gpt_response)

                        novelty = json_response.get("Novelty", 0)
                        technical_feasibility = json_response.get(
                            "Technical Feasibility", 0)
                        capability = json_response.get("Capability", 0)
                        recommendations = json_response.get(
                            "Recommendations", "")
                        feedback = json_response.get("Feedback", "")
                        reference_links = json_response.get(
                            "References", "").strip('"')

                        if not (reference_links.startswith('"') and reference_links.endswith('"')):
                            reference_links = f'{reference_links}'

                        data = {
                            'title': data.get('title', ''),
                            'content': data.get('content', ''),
                            'novelty': novelty,
                            'technical_feasibility': technical_feasibility,
                            'capability': capability,
                            'recommendation': recommendations,
                            'feedback': feedback,
                            'references': reference_links,
                            'project_fk': project_board.project_fk,
                            'templateId': project_board.templateId,
                            'boardId': project_board.boardId,
                        }

                        new_board_instance = ProjectBoard(**data)
                        new_board_instance.save()

                        project_instance = Project.objects.get(
                            id=project_board.project_fk.id)

                        new_score = (
                            (novelty * 0.4) +
                            (technical_feasibility * 0.3) + (capability * 0.3)
                        )
                        subtract_score = subtract_score

                        self.update_project_score(
                            project_instance, subtract_score, new_score)

                        if response.status_code != 200:
                            return Response({"error": "Failed to update project score"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    else:
                        return Response({"error": "No response content or choices found"}, status=status.HTTP_400_BAD_REQUEST)
                except json.JSONDecodeError as json_error:
                    return Response({"error": f"Error decoding JSON response: {json_error}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"error": response.text}, status=status.HTTP_400_BAD_REQUEST)

        except ProjectBoard.DoesNotExist:
            return Response({"error": "ProjectBoard not found"}, status=status.HTTP_404_NOT_FOUND)
        except requests.exceptions.RequestException as e:
            return Response({"error": f"An error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"id": new_board_instance.id}, status=status.HTTP_201_CREATED)


class DeleteProjectBoard(generics.DestroyAPIView):
    queryset = ProjectBoard.objects.all()
    serializer_class = ProjectBoardSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        try:
            # Use get_object_or_404 for cleaner code
            instance = self.get_object()

            # Calculate subtract_score for the specified project board
            subtract_score = (
                (instance.novelty * 0.4) +
                (instance.technical_feasibility * 0.3) +
                (instance.capability * 0.3)
            )

            # Update the project's score directly in the code
            instance.project_fk.score -= subtract_score
            instance.project_fk.save()

            # Delete all related project boards with the same boardId in a single query
            ProjectBoard.objects.filter(boardId=instance.boardId).delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except ProjectBoard.DoesNotExist:
            return Response({"error": "ProjectBoard not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
