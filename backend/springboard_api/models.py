from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class TeacherManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Teacher(AbstractBaseUser):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(unique=True, default=None)
    is_staff = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')

    objects = TeacherManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Classroom(models.Model):
    class_code = models.CharField(max_length=6)
    class_name = models.CharField(max_length=200)
    teacher_fk = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')

    def __str__(self):
        return self.class_name


class Group(models.Model):
    name = models.CharField(max_length=50, unique=True)
    classroom_fk = models.ForeignKey(
        Classroom, on_delete=models.SET_NULL, null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=50)
    isActive = models.BooleanField(default=False)
    score = models.FloatField(default=0)
    group_fk = models.ForeignKey(
        Group, on_delete=models.SET_NULL, null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class ProjectBoard(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    novelty = models.IntegerField()
    capability = models.IntegerField()
    technical_feasibility = models.IntegerField()
    feedback = models.TextField(default='')
    recommendation = models.TextField(default='')
    references = models.TextField(default='')
    project_fk = models.ForeignKey(
        Project, on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)
    # deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')

    def __str__(self):
        return self.title


class StudentManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Student(AbstractBaseUser):
    email = models.EmailField(unique=True, default=None)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    group_fk = models.ForeignKey(
        Group, on_delete=models.SET_NULL, null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')

    objects = StudentManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class AdminManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Admin(AbstractBaseUser):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(unique=True, default=None)
    is_staff = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')

    objects = AdminManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Template(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    rules = models.TextField()
    description = models.TextField()
    isActive = models.BooleanField(default=False)
    teacher_fk = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title
