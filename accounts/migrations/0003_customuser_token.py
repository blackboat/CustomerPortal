# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20151125_2220'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='token',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
    ]
