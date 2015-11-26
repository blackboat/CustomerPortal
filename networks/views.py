from django.shortcuts import render
from django.views import generic

from .models import Network

class NetworksListView(generic.ListView):
    template_name = 'networks/index.html'
    context_object_name = 'networks'

    def get_queryset(self):
        return Network.objects.filter(assigned_user=self.request.user)

class NetworkDetailView(generic.DetailView):
    model = Network
    template_name = 'networks/detail.html'