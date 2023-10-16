from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from springboard_api.serializers import TeacherSerializer, CustomTeacherSerializer
from springboard_api.models import Teacher
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime


class RegisterTeacher(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

    def perform_create(self, serializer):
        serializer.save()  # Save the new project object

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginTeacher(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = Teacher.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'role': 'teacher',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
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


class TeacherView(APIView):
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

        user = Teacher.objects.filter(id=payload['id']).first()
        if not user:
            raise AuthenticationFailed('User not found')  # User not found
        serializer = TeacherSerializer(user)
        return Response(serializer.data)


class LogoutTeacher(APIView):
    def post(self, request):
        try:
            response = JsonResponse({'message': 'Logout successful'})
            response.delete_cookie('jwt')
            return response
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetTeacherById(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()  # Replace with your specific queryset
    serializer_class = CustomTeacherSerializer  # Use the serializer for teachers

    def retrieve(self, request, *args, **kwargs):
        # Get the teacher's id from the URL parameter
        teacher_id = self.kwargs.get('id')
        try:
            teacher = Teacher.objects.get(id=teacher_id)
            serializer = CustomTeacherSerializer(teacher)
            return Response(serializer.data)
        except Teacher.DoesNotExist:
            return Response({"error": "Teacher not found"}, status=status.HTTP_404_NOT_FOUND)
