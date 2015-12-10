from django import forms
from django.contrib.auth.forms import UserChangeForm

from .models import CustomUser


class CustomUserCreationForm(UserChangeForm):
    first_name = forms.CharField(label='First Name', required=True)
    last_name = forms.CharField(label='Last Name', required=True)
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Passwords do not match!')
        return password2

    def save(self, commit=True, is_active=True):
        # Save the provided password in hashed format
        user = super(UserChangeForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        user.is_active = is_active
        if commit:
            user.save()
        return user


class CustomUserLoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput)
    password = forms.CharField(widget=forms.PasswordInput)
