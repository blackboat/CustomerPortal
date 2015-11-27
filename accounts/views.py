from django.views.generic import FormView, RedirectView, TemplateView, UpdateView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
import hashlib
from django.core.mail import send_mail

from accounts.forms import CustomUserCreationForm, CustomUserLoginForm
from accounts.models import CustomUser, CustomUserManager
from networks.models import Network
from CustomerPortal.settings import EMAIL_HOST_USER
# from integrations.salesforce.models import OauthToken as SalesforceOauth


class LoginRequiredMixin(object):
    @classmethod
    def as_view(cls, **initkwargs):
        view = super(LoginRequiredMixin, cls).as_view(**initkwargs)
        return login_required(view)


class CustomUserCreateView(UpdateView):
    form_class = CustomUserCreationForm
    template_name = 'registration/registration_form.html'
    success_url = '/welcome/'

    def form_valid(self, form):
        # is_active is true by default in model
        form.save()

        user = authenticate(
            username=form.cleaned_data['email'],
            password=form.cleaned_data['password1']
        )
        login(self.request, user)
        # call super simply redirect to success_url
        return super(CustomUserCreateView, self).form_valid(form)

    def get_object(self, queryset=None):
        try:
            user = CustomUser.objects.get(token=self.request.GET.get('token', ''))
            return user
        except:
            return

    def get_context_data(self, **kwargs):
        context = super(CustomUserCreateView, self).get_context_data(**kwargs)
        if self.request.GET.get('token', '') == '':
            context['user'] = False
            return context
        try:
            user = CustomUser.objects.get(token=self.request.GET.get('token', ''))
            context['user'] = user
        except:
            context['user'] = False
        return context


class CustomUserLoginView(FormView):
    form_class = CustomUserLoginForm
    template_name = 'registration/login.html'
    success_url = '/'

    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name, {'form':form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(data=request.POST)
        context = self.get_context_data(**kwargs)
        context['form'] = form
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
                )
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect(self.success_url)
                else:
                    messages.error(self.request, "Not activated account!")
                    return self.render_to_response(context)
            else:
                messages.error(self.request, "Invalid username or password!")
                return self.render_to_response(context)
        else:
            return self.form_invalid(form)


class LogoutView(LoginRequiredMixin, RedirectView):
    """
    Provides users the ability to logout
    """
    url = '/accounts/login/'

    def get(self, request, *args, **kwargs):
        logout(request)
        return super(LogoutView, self).get(request, *args, **kwargs)


class UserConnectionsView(LoginRequiredMixin, TemplateView):
    """
    Displays connected software/apps like Salesforce, GoToMeeting, etc. as well
    as settings for how Perry should automate tasks, etc.
    """

    template_name = 'connections.html'

    def get_context_data(self, **kwargs):
        context = super(UserConnectionsView, self).get_context_data(**kwargs)

        # try:
        #     context['salesforce_accounts'] = SalesforceOauth.objects.filter(
        #         user=self.request.user
        #     )
        # except:
        #     pass

        return context


def UserInvite(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        networkId = request.POST.get('network')
        token = hashlib.sha1(email).hexdigest()
        ret = "Invite User"
        try:
            user = CustomUser.objects.get(email=email)
            try:
                send_mail('CustomerPortal', 'Administrator assigned new network to you.', "tomslauva@gmail.com", [email])
            except:
                ret = "Email Failed"
                pass
        except:
            user = CustomUser.objects.create_user(email=email, first_name='', last_name='', is_active=False, token=token, password='')
            try:
                send_mail('CustomerPortal', 'You are invited from CustomerPortal. You can signup CustomerPortal from ' + 'http://portal.cloudwifi.ca:8000/accounts/register?token=' + token, "tomslauva@gmail.com", [email])
            except:
                ret = "Email Failed"
                pass

        network = Network.objects.get(pk=networkId)
        user.network_set.add(network)


        # CustomUserManager.create_user(CustomUserManager, email=email, first_name='', last_name='', is_active=False, token=token, password='')
        return HttpResponse(ret)
    else:
        return HttpResponse("Failed")