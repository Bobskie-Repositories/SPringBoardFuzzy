from rest_framework import serializers
from .models import Classroom, Group, Project, ProjectBoard, Teacher, Student, Template, Admin


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ('id', 'class_code', 'class_name',
                  'teacher_fk', 'created_at', 'deleted_at')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name',
                  'classroom_fk', 'created_at', 'deleted_at')


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'group_fk', 'score',
                  'reason', 'isActive', 'created_at')


class ProjectBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectBoard
        fields = ('id', 'boardId', 'title', 'content', 'templateId',
                  'novelty', 'capability', 'technical_feasibility',
                  'feedback', 'recommendation', 'references',
                  'project_fk', 'created_at', 'deleted_at')


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'firstname', 'lastname', "password", "is_staff", 'email',
                  'created_at', 'deleted_at')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CustomTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'firstname', 'lastname')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'firstname', 'lastname', "password", "is_staff", 'email',
                  'group_fk', 'created_at', 'deleted_at')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ('id', 'firstname', 'lastname', "password", "is_staff", 'email',
                  'created_at', 'deleted_at')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('id', 'title', 'content', 'rules', 'description', 'isActive',
                  'created_at', 'deleted_at')


class InactiveProjectSerializer(serializers.ModelSerializer):
    group_name = serializers.ReadOnlyField(source='group_fk.name')
    classroom_name = serializers.ReadOnlyField(
        source='group_fk.classroom_fk.class_name')
    classroom_id = serializers.ReadOnlyField(source='group_fk.classroom_fk.id')
    teacher_name = serializers.ReadOnlyField(
        source='group_fk.classroom_fk.teacher_fk.firstname')
    teacher_id = serializers.ReadOnlyField(
        source='group_fk.classroom_fk.teacher_fk.id')
    reason = serializers.CharField()
    score = serializers.FloatField()
    template_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ('id', 'name', 'group_name', 'classroom_id', 'classroom_name',
                  'teacher_id', 'teacher_name',  'reason', 'score', 'template_count')

    def get_template_count(self, obj):
        return Template.objects.count()
