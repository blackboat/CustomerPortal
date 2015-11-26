# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(null=True, verbose_name='last login', blank=True)),
                ('first_name', models.CharField(max_length=256, null=True, blank=True)),
                ('last_name', models.CharField(max_length=256, null=True, blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('email', models.EmailField(unique=True, max_length=255, error_messages={b'unique': b'This email has already been registered.', b'required': b'Email is required.'})),
                ('mobile_number', models.CharField(null=True, validators=[django.core.validators.RegexValidator(regex=b'^\\+?1?\\d{9,15}$', message=b"Phone number must be entered in the format:             '+999999999'. Up to 15 digits allowed.")], error_messages={b'unique': b'This number has already been registered.', b'required': b'Mobile number is required.'}, max_length=20, blank=True, unique=True)),
                ('is_first_login', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
