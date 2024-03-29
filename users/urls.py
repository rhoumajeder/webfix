from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import (
    sign_up, ListUsers, forget_password, change_password, change_password_by_token,
    MyDetails, BlacklistTokenUpdateView, get_user)

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup', sign_up),
    path('logout', BlacklistTokenUpdateView.as_view(), name="logout"),
    path('get-user', get_user, name="get-user"),
    path('forgot', forget_password),
    path('change-password', change_password),
    path('change-password/token', change_password_by_token),
    path('users', ListUsers.as_view()),
    path('me/<int:pk>', MyDetails.as_view()),
]
