from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
    path('details/', views.studentDetails),
    path('failandpass/', views.FailandPass),
    path('results/', views.Results),
    path('list/', views.Locations)
]