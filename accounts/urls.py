from django.conf.urls import include, url

from accounts.views import (
    CustomUserCreateView,
    CustomUserLoginView,
    LogoutView,
    UserConnectionsView,
    UserInvite
    )


urlpatterns = [
    url(r'^register/', CustomUserCreateView.as_view(), name='register'),
    url(r'^login/', CustomUserLoginView.as_view(), name='login'),
    url(r'^connections/', UserConnectionsView.as_view(), name='settings'),
    url(r'^logout/', LogoutView.as_view(), name='logout'),
    url(r'^invitation/$', UserInvite, name='invitation')
    ]
