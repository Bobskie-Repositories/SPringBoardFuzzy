from rest_framework import serializers
from .models import Classroom, Group, Project, ProjectBoard, Teacher, Student, Template


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ('id', 'class_code', 'class_name',
                  'teacher_fk_id', 'created_at', 'deleted_at')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'project_fk',
                  'classroom_fk', 'created_at', 'deleted_at')


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'created_at', 'group_fk_id')


class ProjectBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectBoard
        fields = ('id', 'title', 'content',
                  'novelty', 'capability', 'technical_feasibility',
                  'feedback', 'recommendation', 'references',
                  'project_fk', 'created_at', 'deleted_at')


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'firstname', 'lastname',
                  'created_at', 'deleted_at')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'firstname', 'lastname',
                  'group_fk', 'created_at', 'deleted_at')


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('id', 'title', 'content', 'rules', 'description',
                  'teacher_fk', 'created_at', 'deleted_at')
