from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import random
import string
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
    deleted_at = models.DateTimeField(null=True, blank=True)

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
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.class_name


class Group(models.Model):
    name = models.CharField(max_length=50, unique=True)
    key_code = models.CharField(max_length=10, unique=True, editable=False)
    classroom_fk = models.ForeignKey(
        Classroom, on_delete=models.SET_NULL, null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def generate_key_code(self):
        characters = string.ascii_letters + string.digits
        while True:
            new_code = ''.join(random.choice(characters) for _ in range(10))
            if not Group.objects.filter(key_code=new_code).exists():
                return new_code

    def save(self, *args, **kwargs):
        if not self.key_code:
            self.key_code = self.generate_key_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(default='')
    isActive = models.BooleanField(default=False)
    score = models.FloatField(default=0)
    reason = models.TextField(default='')
    group_fk = models.ForeignKey(
        Group, on_delete=models.SET_NULL, null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class ProjectBoard(models.Model):
    boardId = models.IntegerField(default=0)
    title = models.CharField(max_length=50)
    templateId = models.IntegerField(default=0)
    content = models.TextField()
    desirability = models.FloatField()
    feasibility = models.FloatField()
    viability = models.FloatField()
    output_metric = models.FloatField(default=0)
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
    deleted_at = models.DateTimeField(null=True, blank=True)

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
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = AdminManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Template(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    exp_output = models.TextField(default='')
    rules = models.TextField()
    description = models.TextField()
    isActive = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title
