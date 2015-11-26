from django.db import models

from accounts.models import CustomUser as User

class Network(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    postal_address = models.CharField(max_length=10)
    data_key = models.CharField(max_length=256)
    data_token = models.CharField(max_length=256)
    data_network_id = models.CharField(max_length=256)
    assigned_user = models.ManyToManyField(User)

    def __unicode__(self):
        return self.name
