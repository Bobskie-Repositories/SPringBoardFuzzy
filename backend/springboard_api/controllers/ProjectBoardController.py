import json
import copy
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import ProjectBoardSerializer
from springboard_api.models import ProjectBoard, Project, Template
from springboard_api.FuzzyLogic import output_membership, convert_to_linguistic_variable, transform_values, calculate_percentage, average_percentages, count_criteria, convert_to_fuzzy_variables, fuzzy_inference
import requests
from django.db.models import Max
from django.conf import settings
import os
import numpy as np
import skfuzzy as fuzz
from openai import OpenAI


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

        template_id = request.data.get('templateId', '')
        template = Template.objects.get(id=template_id)
        # print(template.rules)

        highest_board_id = ProjectBoard.objects.aggregate(Max('boardId'))[
            'boardId__max']
        new_board_id = highest_board_id + 1 if highest_board_id is not None else 1

        prompt = (
            f"Considering the rules: {template.rules}, please conduct a critical analysis of the following data regarding the startup idea: {request.data.get('content', '')}. The content should fit in the rules."
            f"For each numbered question, assign a numerical rating (1-5), not in string, for each of the following aspects. On a separate key, give feedback(everything is compressed to 4-5 sentences) and recommendation (everything is compressed to 4-5 sentences) of the content in regards the template rules . Strictly follow this format and no explanation on the values: Problem: [1,3,4,5,1] ... , Feedback: (response), Recommendation: (response). The first element of the list is the 1st question, and the fifth element is the 5th question. Make it in JSON format."
            f"\nEnsure a fair and balanced assessment for each aspect, maintaining a conservative mindset to reserve higher ratings for truly accurate, detailed, and good answers. "
            f"Approach the evaluation with skepticism, requiring clear evidence of groundbreaking innovation, robust feasibility, and undeniable market demand to justify ratings above 3."
            f"This evaluation method is designed to ensure that only ideas with undeniable merit and a clear pathway to successful implementation receive high scores. Your conservative ratings and detailed justifications will help identify areas where the idea needs significant refinement or rethinking."
        )

        client = OpenAI(api_key=os.environ.get("OPENAI_KEY", ""))
        message = [
            {"role": "user", "content": prompt}
        ]

        try:
            # bring back once api is returned
            response = client.chat.completions.create(
                model="gpt-4-turbo-preview", messages=message, temperature=0.5, max_tokens=1050
            )
            if response:
                try:
                    choices = response.choices
                    first_choice_content = response.choices[0].message.content
                    first_choice_content = first_choice_content.replace(
                        "```json", "")
                    first_choice_content = first_choice_content.replace(
                        "```", "")

                    # remove
                    # choices = True
                    # first_choice_content = {'Problem': [3, 4, 4, 4, 3], 'Customer Segment': [4, 3, 3, 3, 4], 'Unique Value Proposition': [4, 4, 4, 3, 3], 'Solution': [4, 4, 3, 3, 4], 'Feedback': 'The idea of EcoShift is timely and aligns well with current environmental trends, showing a good understanding of the problem and customer segment. The problem of connecting environmentally conscious consumers with sustainable businesses is clearly defined, has evidence of customer pain, and solving it would likely have a significant positive impact. The target customer segment is well-defined, though more details on accessibility and market penetration potential would strengthen the proposal. The value proposition is clear and differentiates from competitors, but could benefit from more emphasis on emotional connection. The solution seems feasible and well-adapted to the problem, but its adaptability to changing market conditions and integration with existing systems could be further elaborated.',
                    #                         'Recommendation': 'To strengthen the proposal, EcoShift should provide more evidence of customer pain and market demand, including specific research or data. Additionally, focusing on the scalability and accessibility of the customer segment will be crucial for success. Enhancing the emotional connection in the value proposition and providing a more detailed plan for adaptability and integration with existing systems will make the solution more compelling. Finally, validating the concept with a prototype or pilot and gathering initial user feedback would significantly support the value proposition.'}

                    if choices:
                        # gpt_response = choices[0]["text"].strip()
                        gpt_response = first_choice_content
                        json_response = json.loads(gpt_response)
                        # json_response = {'Problem': [3, 4, 4, 4, 3], 'Customer Segment': [4, 3, 3, 3, 4],  'Feedback': 'The idea of EcoShift is timely and aligns well with current environmental trends, showing a good understanding of the problem and customer segment. The problem of connecting environmentally conscious consumers with sustainable businesses is clearly defined, has evidence of customer pain, and solving it would likely have a significant positive impact. The target customer segment is well-defined, though more details on accessibility and market penetration potential would strengthen the proposal. The value proposition is clear and differentiates from competitors, but could benefit from more emphasis on emotional connection. The solution seems feasible and well-adapted to the problem, but its adaptability to changing market conditions and integration with existing systems could be further elaborated.',
                        #                  'Recommendation': 'To strengthen the proposal, EcoShift should provide more evidence of customer pain and market demand, including specific research or data. Additionally, focusing on the scalability and accessibility of the customer segment will be crucial for success. Enhancing the emotional connection in the value proposition and providing a more detailed plan for adaptability and integration with existing systems will make the solution more compelling. Finally, validating the concept with a prototype or pilot and gathering initial user feedback would significantly support the value proposition.'}
                        # Create a copy of the original dictionary
                        data_attrib = copy.deepcopy(json_response)
                        print(json_response)
                        data_attrib.pop('Feedback', None)
                        data_attrib.pop('Recommendation', None)
                        print(json_response)
                        transform_res = transform_values(data_attrib)
                        print(transform_res)
                        percentage = calculate_percentage(transform_res)
                        print(percentage)
                        count = count_criteria(percentage)
                        print(count)
                        averages = average_percentages(percentage)
                        print(averages)
                        linguistic_variables = convert_to_fuzzy_variables(
                            averages)
                        print(linguistic_variables)

                        desirability = averages['Desirability']
                        feasibility = averages['Feasibility']
                        viability = averages['Viability']

                        # if there is no criteria, set to medium for neutral
                        if count['Desirability'] == 0:
                            desirability = 56

                        if count['Feasibility'] == 0:
                            feasibility = 56

                        if count['Viability'] == 0:
                            viability = 56

                        output_variable = fuzzy_inference(
                            desirability, feasibility, viability)
                        print(output_variable)
                        output_mem = convert_to_linguistic_variable(
                            output_variable, output_membership)
                        print(output_mem)

                        if count['Desirability'] == 0:
                            desirability = -1
                        if count['Feasibility'] == 0:
                            feasibility = -1
                        if count['Viability'] == 0:
                            viability = -1

                        title = request.data.get('title', '')
                        content = request.data.get('content', '')
                        project_fk_id = request.data.get('project_fk', None)

                        data = {
                            'title': title,
                            'content': content,
                            'desirability': desirability,
                            'feasibility': feasibility,
                            'viability': viability,
                            'output_metric': output_variable,
                            'recommendation': json_response['Recommendation'],
                            'feedback': json_response['Feedback'],
                            # 'references': reference_links,
                            'project_fk': Project.objects.get(id=project_fk_id),
                            'boardId': new_board_id,
                        }

                        project_instance = Project.objects.get(
                            id=project_fk_id)
                        add_score = output_variable
                        self.update_project_score(
                            project_instance, add_score)

                    else:
                        print("No response content or choices found.")
                except json.JSONDecodeError as json_error:
                    return Response({"error": f"Error decoding JSON response: {json_error}"}, status=status.HTTP_400_BAD_REQUEST)
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

            subtract_score = project_board.output_metric
            template = Template.objects.get(id=project_board.templateId)

            # api_url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
            prompt = (
                f"Considering the rules: {template.rules}, please conduct a critical analysis of the following data regarding the startup idea: {request.data.get('content', '')}. The content should fit in the rules."
                f"For each numbered question, assign a numerical rating (1-5), not in string, for each of the following aspects. On a separate key, give feedback(everything is compressed to 4-5 sentences) and recommendation (everything is compressed to 4-5 sentences) of the content in regards the template rules . Strictly follow this format and no explanation on the values: Problem: [1,3,4,5,1] ... , Feedback: (response), Recommendation: (response). The first element of the list is the 1st question, and the fifth element is the 5th question. Make it in JSON format."
                f"\nEnsure a fair and balanced assessment for each aspect, maintaining a conservative mindset to reserve higher ratings for truly accurate, and good answers. "
                f"Approach the evaluation with skepticism, requiring clear evidence of groundbreaking innovation, robust feasibility, and undeniable market demand to justify ratings above 3."
                f"This evaluation method is designed to ensure that only ideas with undeniable merit and a clear pathway to successful implementation receive high scores. Your conservative ratings and detailed justifications will help identify areas where the idea needs significant refinement or rethinking."
            )

            client = OpenAI(api_key=os.environ.get("OPENAI_KEY", ""))
            message = [
                {"role": "user", "content": prompt}
            ]
            response = client.chat.completions.create(
                model="gpt-4-turbo-preview", messages=message, temperature=0.5, max_tokens=1050
            )

            if response:
                try:
                    # response_content = response.json()
                    # choices = response_content.get("choices", [])

                    # return
                    choices = response.choices
                    first_choice_content = response.choices[0].message.content
                    first_choice_content = first_choice_content.replace(
                        "```json", "")
                    first_choice_content = first_choice_content.replace(
                        "```", "")

                    if choices:
                        # gpt_response = choices[0]["text"].strip()
                        gpt_response = first_choice_content
                        json_response = json.loads(gpt_response)
                        # json_response = {'Problem': [3, 4, 4, 4, 3], 'Customer Segment': [4, 3, 3, 3, 4], 'Unique Value Proposition': [4, 4, 4, 3, 3], 'Solution': [4, 4, 3, 3, 4], 'Feedback': 'The idea of EcoShift is timely and aligns well with current environmental trends, showing a good understanding of the problem and customer segment. The problem of connecting environmentally conscious consumers with sustainable businesses is clearly defined, has evidence of customer pain, and solving it would likely have a significant positive impact. The target customer segment is well-defined, though more details on accessibility and market penetration potential would strengthen the proposal. The value proposition is clear and differentiates from competitors, but could benefit from more emphasis on emotional connection. The solution seems feasible and well-adapted to the problem, but its adaptability to changing market conditions and integration with existing systems could be further elaborated.',
                        #                  'Recommendation': 'To strengthen the proposal, EcoShift should provide more evidence of customer pain and market demand, including specific research or data. Additionally, focusing on the scalability and accessibility of the customer segment will be crucial for success. Enhancing the emotional connection in the value proposition and providing a more detailed plan for adaptability and integration with existing systems will make the solution more compelling. Finally, validating the concept with a prototype or pilot and gathering initial user feedback would significantly support the value proposition.'}
                        # Create a copy of the original dictionary
                        data_attrib = copy.deepcopy(json_response)
                        print(json_response)
                        data_attrib.pop('Feedback', None)
                        data_attrib.pop('Recommendation', None)
                        print(json_response)
                        transform_res = transform_values(data_attrib)
                        print(transform_res)
                        percentage = calculate_percentage(transform_res)
                        print(percentage)
                        count = count_criteria(percentage)
                        print(count)
                        averages = average_percentages(percentage)
                        print(averages)
                        linguistic_variables = convert_to_fuzzy_variables(
                            averages)
                        print(linguistic_variables)

                        desirability = averages['Desirability']
                        feasibility = averages['Feasibility']
                        viability = averages['Viability']

                        # if there is no criteria, set to medium for neutral
                        if count['Desirability'] == 0:
                            desirability = 56
                        if count['Feasibility'] == 0:
                            feasibility = 56
                        if count['Viability'] == 0:
                            viability = 56

                        output_variable = fuzzy_inference(
                            desirability, feasibility, viability)
                        print(output_variable)
                        output_mem = convert_to_linguistic_variable(
                            output_variable, output_membership)
                        print(output_mem)

                        if count['Desirability'] == 0:
                            desirability = -1
                        if count['Feasibility'] == 0:
                            feasibility = -1
                        if count['Viability'] == 0:
                            viability = -1

                        data = {
                            'title': data.get('title', ''),
                            'content': data.get('content', ''),
                            'desirability': desirability,
                            'feasibility': feasibility,
                            'viability': viability,
                            'recommendation': json_response['Recommendation'],
                            'feedback': json_response['Feedback'],
                            'output_metric': output_variable,
                            # 'references': reference_links,
                            'project_fk': project_board.project_fk,
                            'templateId': project_board.templateId,
                            'boardId': project_board.boardId,
                        }

                        new_board_instance = ProjectBoard(**data)
                        new_board_instance.save()

                        project_instance = Project.objects.get(
                            id=project_board.project_fk.id)

                        new_score = output_variable
                        self.update_project_score(
                            project_instance, subtract_score, new_score)

                        # if response.status_code != 200:
                        #     return Response({"error": "Failed to update project score"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    else:
                        return Response({"error": "No response content or choices found"}, status=status.HTTP_400_BAD_REQUEST)
                except json.JSONDecodeError as json_error:
                    return Response({"error": f"Error decoding JSON response: {json_error}"}, status=status.HTTP_400_BAD_REQUEST)
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
            subtract_score = instance.output_metric

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
