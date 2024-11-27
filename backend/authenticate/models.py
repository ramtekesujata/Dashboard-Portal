from django.db import models

# Create your models here.
class RenewAccessToken(models.Model):
    user_name = models.CharField(max_length=200, blank=False, null=False)
    renew_access_token = models.CharField(max_length=200, blank=True, null=True)
    salt = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)