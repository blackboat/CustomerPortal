from django.conf.urls import include, url

from .views import (
    NetworksListView,
    NetworkDetailView
)


urlpatterns = [
    url(r'^$', NetworksListView.as_view(), name='list'),
    url(r'^(?P<pk>[0-9]+)/$', NetworkDetailView.as_view(), name='detail')
    ]
