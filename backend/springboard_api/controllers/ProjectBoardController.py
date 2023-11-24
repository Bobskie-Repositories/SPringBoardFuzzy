from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectBoardSerializer
from springboard_api.models import ProjectBoard, Project
import requests
from django.db.models import Max



class CreateProjectBoard(generics.CreateAPIView):
    serializer_class = ProjectBoardSerializer

    def perform_create(self, serializer, data):
        serializer.save(**data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        data = {}
        # Initial Changes
        api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
        
        # Additional Rule: Focus area, end-user/beneficiary, and knowledge/capability
        focus_area = request.data.get('focus_area', '')
        end_user = request.data.get('end_user', '')
        knowledge_capability = request.data.get('knowledge_capability', '')
        
        prompt = (
            f"Rate the usefulness of the idea in the input data on a scale of 1-10. "
            f"Provide recommendations and feedback on how to improve the data. "
            f"Include references to support your recommendations and feedback. "
            f"Focus area: {focus_area}. End-user/Beneficiary: {end_user}. Knowledge/Capability: {knowledge_capability}. "
            f"{request.data.get('content', '')}"
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
            "Authorization": "Bearer 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"
        }

        try:
            response = requests.post(api_url, json=request_payload, headers=headers)

            if response.status_code == 200:
                response_content = response.json()

                if response_content and response_content.get("choices"):
                    improved_unit_test = response_content["choices"][0]["text"].strip()
                    print(improved_unit_test)

                    # Split the improved_unit_test by '+' to extract values
                    values = improved_unit_test.split('+')

                    # Parse the values for each field
                    novelty = int(values[0].split(': ')[1].replace('%', ''))
                    technical_feasibility = int(values[1].split(': ')[1].replace('%', ''))
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
                        'focus_area': focus_area,  # Added focus_area to the data
                        'end_user': end_user,      # Added end_user to the data
                        'knowledge_capability': knowledge_capability  # Added knowledge_capability to the data
                    }

                    # Save the score to update later
                    project_score = ((novelty * 0.4) + (technical_feasibility * 0.3) + (capability * 0.3))

                    if project_score < 5:
                        # If the score is below 5, set subtract_score to a negative value
                        subtract_score = project_score * -1
                    else:
                        subtract_score = 0

                    # Update the project score
                    update_score_url = f"http://127.0.0.1:8000/api/project/{project_fk}/update_score"
                    update_score_data = {
                        "score": project_score,
                        "subtract_score": subtract_score
                    }

                    # Add comments and references to recommendations and feedback
                    recommendations += " This data can be improved by [Reference 1] and [Reference 2]."
                    feedback += " Consider [Reference 3] for better structuring and [Reference 4] for more information."

                    # Include the comments and references in the data
                    data['recommendation'] = recommendations
                    data['feedback'] = feedback

                    response = requests.put(update_score_url, json=update_score_data)

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

    def create(self, request, *args, **kwargs):
        data = request.data
        project_board_id = kwargs.get('projectboard_id')

        try:
            # Get the project board based on the provided ID
            project_board = ProjectBoard.objects.get(id=project_board_id)

            # Calculate subtract_score based on novelty, technical feasibility, and capability
            subtract_score = (
                (project_board.novelty * 0.4) + (project_board.technical_feasibility * 0.3) + (project_board.capability * 0.3))

            # Perform OpenAI API request
            api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"

            prompt = (
                f"Rate the usefulness of the idea in the input data on a scale of 1-10. "
                f"Provide recommendations and feedback on how to improve the data. "
                f"Include references to support your recommendations and feedback. {data.get('content', '')}"
            )
            #prompt = "Parse these data " + \
            #    str(data.get('content', '')) + "And Give the percentage rating(1-10) in terms of novelty, technical feasibility, Capability. Give below 5 rating to data which has bad composition, lack effort, and lack of information. Put labels like 'Novelty: (value), References: (value), Feedback : (value) ...'. Provide at least 2 sentence for recommendations on parts of the data, 2 for feedback on parts of the data in regards with how the data is presented and structure. Add 2 referrence links for that topic in string.The output for each should be separated with a '+' all in one line"

            # prompt = "Parse these data " + \
            #     str(data.get('content', '')) + "And Give the percentage rating(1-10) in terms of novelty, technical feasibility, Capability. Put labels like 'Novelty: (value)'. Give very low rating to bad composition, lack effort and lack of information. and provide at least 2 sentence for recommendations on parts of the data, and 2 for feedback on parts of the data. Add 2 referrence links for that topic in string. The output for each should be separated with a '+' all in single line"



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

            response = requests.post(
                api_url, json=request_payload, headers=headers)

            if response.status_code == 200:
                response_content = response.json()

                if response_content and response_content.get("choices"):
                    improved_unit_test = response_content["choices"][0]["text"].strip(
                    )
                    print(improved_unit_test)
                    values = improved_unit_test.split('+')

                    novelty = int(values[0].split(': ')[1].replace('%', ''))
                    technical_feasibility = int(
                        values[1].split(': ')[1].replace('%', ''))
                    capability = int(values[2].split(': ')[1].replace('%', ''))
                    recommendations = values[3].split(': ')[1]
                    feedback = values[4].split(': ')[1]
                    reference_links = values[5].split(': ')[1]

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
                        'boardId': project_board.boardId,  # Retain the boardId
                    }

                    # Create a new instance of ProjectBoard with provided data
                    new_board_instance = ProjectBoard(**data)

                    # Save the new instance to create the record
                    new_board_instance.save()

                    # Update the project score
                    update_score_url = f"http://127.0.0.1:8000/api/project/{project_board.project_fk.id}/update_score"
                    update_score_data = {
                        "score": ((novelty * 0.4) + (technical_feasibility * 0.3) + (capability * 0.3)),
                        "subtract_score": subtract_score
                    }
                    response = requests.put(
                        update_score_url, json=update_score_data)
                else:
                    return Response("No response content or choices found", status=status.HTTP_400_BAD_REQUEST)
            else:
                error_message = response.text
                return Response(error_message, status=status.HTTP_400_BAD_REQUEST)
        except ProjectBoard.DoesNotExist:
            return Response("ProjectBoard not found", status=status.HTTP_404_NOT_FOUND)
        except requests.exceptions.RequestException as e:
            return Response(f"An error occurred: {e}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"id": new_board_instance.id}, status=status.HTTP_201_CREATED)


class DeleteProjectBoard(generics.DestroyAPIView):
    queryset = ProjectBoard.objects.all()
    serializer_class = ProjectBoardSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        try:
            # Get the ProjectBoard instance based on the provided ID
            instance = self.get_object()

            # Calculate subtract_score for the specified project board
            subtract_score = (
                (instance.novelty * 0.4) +
                (instance.technical_feasibility * 0.3) +
                (instance.capability * 0.3)
            )

            # Update the project's score using the calculated subtract_score
            update_score_url = f"http://127.0.0.1:8000/api/project/{instance.project_fk.id}/update_score"
            update_score_data = {
                "score": 0,
                "subtract_score": subtract_score
            }
            response = requests.put(update_score_url, json=update_score_data)

            if response.status_code != 200:
                # Handle the case where updating the project score fails
                return Response({"error": "Failed to update project score"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Delete all related project boards with the same boardId
            related_boards = ProjectBoard.objects.filter(
                boardId=instance.boardId)
            related_boards.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except ProjectBoard.DoesNotExist:
            return Response({"error": "ProjectBoard not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
