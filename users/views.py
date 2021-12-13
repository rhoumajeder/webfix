import jwt
import requests
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from jwt import DecodeError
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from ipware import get_client_ip
from django.views.decorators.csrf import csrf_exempt


from users.errors import UserAlreadyExistsError
from users.models import CustomUser
from users.serializers import (
    CustomUserSerializer, UserSerializer, UserDetailSerializer, UserUpdateSerializer)
from users.utils import send_reset_email


@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    serializer = CustomUserSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        if user:
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response({"user": serializer.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    serializer = UserSerializer(user)
    return Response({"user": serializer.data})


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ListUsers(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        if 'email' in self.request.GET:
            return CustomUser.objects.filter(email=self.request.GET['email'])
        else:
            return CustomUser.objects.all()


class MyDetails(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    queryset = CustomUser.objects.all()


@api_view(['PUT'])
def change_password(request):
    password = request.data["password"]
    user = request.user

    user.set_password(password)
    user.save()

    return HttpResponse(status=status.HTTP_200_OK)

@api_view(['PUT', 'PATCH'])
def update_profile(request):
    serializer = UserUpdateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.update(request.user, serializer.validated_data)
    return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)


@api_view(['POST'])
def forget_password(request):
    email = request.data['email']
    # only users which are signed up are able to reset password (not the social login users)
    users = CustomUser.objects.filter(email=email, is_social_login=False)

    if not users:
        response = Response(
            data={"error": "user with this email not found."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user = users[0]

        token = jwt.encode({"id": user.id}, settings.SECRET_KEY, "HS256")
        send_reset_email(email, token)
        user.email = email

        user.save()

        response = Response(status=status.HTTP_200_OK)

    return response


@api_view(['PUT'])
def change_password_by_token(request):
    token = request.data['token']
    password = request.data['password']
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, "HS256")
        user_id = decoded_token['id']
    except DecodeError:
        return Response(data={"error": "invalid token provided"}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.get(id=user_id)
    user.set_password(password)
    user.save()

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def verify_g_token(request):


    x = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={
            'secret': 'SECRET KEY CAPTCHA',
            'response': request.data['recaptcha_token'],
            'remoteip': get_client_ip(request)
        },
        verify=True
    ).json()

    if x['success'] == True:
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
    
    

