from django.shortcuts import render
from django.views import generic

from .models import Network

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