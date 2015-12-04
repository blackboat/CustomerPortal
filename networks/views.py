from django.shortcuts import render
from django.views import generic
from django.views.generic.detail import SingleObjectMixin
from django.http import HttpResponse
from django.core import serializers

from .models import Network
import json


class HomepageView(generic.ListView):
    template_name = 'index.html'
    context_object_name = 'networks'

    def get_context_data(self, **kwargs):
        context = super(HomepageView, self).get_context_data(**kwargs)
        context['is_active'] = self.request.user.is_admin
        return context

    def get_queryset(self):
        if self.request.user.is_admin == True:
            return Network.objects.all()
        return Network.objects.filter(assigned_user=self.request.user)


class NetworksListView(generic.ListView):
    template_name = 'networks/index.html'
    context_object_name = 'networks'

    def get_context_data(self, **kwargs):
        context = super(NetworksListView, self).get_context_data(**kwargs)
        context['is_active'] = self.request.user.is_admin
        return context

    def get_queryset(self):
        if self.request.user.is_admin == True:
            return Network.objects.all()
        return Network.objects.filter(assigned_user=self.request.user)


class NetworkDetailView(generic.DetailView):
    model = Network
    template_name = 'networks/detail.html'


class JsonNetworkListView(generic.View):

    def get(self, request, *args, **kwargs):
        leads_as_json = serializers.serialize('json', Network.objects.all())
        return HttpResponse(leads_as_json, content_type='json')