from django.urls import path
from . import views

urlpatterns = [
    path('get-notifications/', views.get_notifications),
    path('update-notification/<str:pk>/', views.update_notification),
    path('delete-notification/<str:pk>/', views.delete_notification)
]
