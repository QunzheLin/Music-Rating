# Generated by Django 3.1.7 on 2021-04-20 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artists',
            name='song',
            field=models.CharField(max_length=255, primary_key=True, serialize=False, unique=True),
        ),
    ]
