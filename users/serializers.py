from django.contrib.auth.password_validation import validate_password
from django.db.models.base import ModelState

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from users.models import CustomUser
from records.models import Record, Feedback


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("email", "id", "username")


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"


class FeedbackSerializer(serializers.ModelSerializer):
    writer = GetUserSerializer(read_only=True)
    receiver = GetUserSerializer(read_only=True)

    class Meta:
        model = Feedback
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'password2', "phone_number")

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop("password2", None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class SignupSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ["email", "city",
                  "address", "password", "dob", "gender"]


class UserSerializer(serializers.ModelSerializer):
    records = RecordSerializer(many=True, read_only=True)
    received_feedback = FeedbackSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "email", "username", "first_name", "records", "phone_number",
                  "checked_email", "checked_phone", "checked_billet", "start_date", "received_feedback"]


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ["password", "groups", "user_permissions"]

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['id'] = user.id
#         token["first_name"] = user.first_name
#         token["last_name"] = user.last_name
#         return token
