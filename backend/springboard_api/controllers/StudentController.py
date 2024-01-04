from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import StudentSerializer
from springboard_api.models import Student, Group
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
import jwt
import datetime


class RegisterStudent(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def perform_create(self, serializer):
        serializer.save()  # Save the new project object

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginStudent(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = Student.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'role': 'student',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=600),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret',
                           algorithm='HS256')
        response = Response()
        response.set_cookie('jwt', value=token, httponly=True,
                            samesite='None', secure=True)
        response.data = {
            'jwt': token,
        }

        return response


class StudentView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Token is missing')  # Token is missing

        try:
            # Specify 'algorithms' as a list
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(
                'Token has expired')  # Token has expired
        except jwt.DecodeError:
            raise AuthenticationFailed('Token is invalid')  # Invalid token

        user = Student.objects.filter(id=payload['id']).first()
        if not user:
            raise AuthenticationFailed('User not found')  # User not found
        serializer = StudentSerializer(user)
        return Response(serializer.data)


class LogoutStudent(APIView):
    def post(self, request):
        try:
            response = JsonResponse({'message': 'Logout successful'})
            response.delete_cookie('jwt')
            return response
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateGroupFK(APIView):

    def post(self, request, user_id, *args, **kwargs):
        try:
            # Get the current user (student) based on the provided user_id
            student = Student.objects.get(id=user_id)

            # Ensure the request data contains the 'group_key_code' field
            group_key_code = request.data.get('group_key_code')

            if not group_key_code:
                return Response({"error": "Group key code is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Find the group with the given key code
            try:
                group = Group.objects.get(key_code=group_key_code)
            except Group.DoesNotExist:
                return Response({"error": "Group not found with the given key code"}, status=status.HTTP_404_NOT_FOUND)

            # Update the student's group_fk
            student.group_fk = group
            student.save()

            # Serialize the updated student data
            serializer = StudentSerializer(student)
            return Response({"new_group_fk": serializer.data['group_fk']}, status=status.HTTP_200_OK)

        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
