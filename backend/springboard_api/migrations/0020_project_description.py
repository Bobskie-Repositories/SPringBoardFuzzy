# Generated by Django 4.2.4 on 2023-11-06 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('springboard_api', '0019_projectboard_boardid'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='description',
            field=models.TextField(default=''),
        ),
    ]