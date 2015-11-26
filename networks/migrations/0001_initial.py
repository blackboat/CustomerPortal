# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Network',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=256)),
                ('description', models.TextField()),
                ('postal_address', models.CharField(max_length=10)),
                ('data_key', models.CharField(max_length=256)),
                ('data_token', models.CharField(max_length=256)),
                ('data_network_id', models.CharField(max_length=256)),
                ('assigned_user', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
