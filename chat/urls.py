from django.urls import path

from . import views

urlpatterns = [
    # path('chat-room/<str:owner_email>/<str:user_email>/<str:record_id>/',
    #      views.chat_room),
     path('chat-room/<str:owner_id>/<str:user_id>/<str:record_id>/',
         views.chat_room),
    path('get-rooms/', views.get_rooms),
    path('create-message/<str:room_id>/', views.create_message),
    path('get-messages/<str:room_id>/', views.get_messages)
]
