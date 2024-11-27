from django.urls import path
from knox import views as knox_views
from . import views
from django.contrib.auth import views as auth_views
from .views import SetNewPasswordAPIView,PasswordTokenCheckAPI, RequestPasswordResetEmail
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('login/', views.login),
    path('register/', views.register),
    path('logout/', views.LogoutView),
    path('renew-access-token/', views.renew_access_token),
    path('password-reset/', views.passwordReset),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete'),

]