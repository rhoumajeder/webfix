from django.contrib.auth.password_validation import validate_password
from django.db.models.base import ModelState

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from users.models import CustomUser
from records.models import Record, Feedback


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username")
        #fields = "__all__"
        #fields = ("email", "id", "username")


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"

class UserSerializer_for_feedbacks(serializers.ModelSerializer):
    #records = RecordSerializer(many=True, read_only=True)
    #received_feedback = FeedbackSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id",  "username", ]

class FeedbackSerializer(serializers.ModelSerializer):
    writer = GetUserSerializer(read_only=True)    #UserSerializer_for_feedbacks
    receiver = GetUserSerializer(read_only=True)

    # writer = UserSerializer_for_feedbacks(read_only=True)    
    # receiver = UserSerializer_for_feedbacks(read_only=True)
    

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
        fields = ["id", "intro", "photo", "email", "username", "first_name", "last_name", "records", "phone_number",
                  "checked_email", "checked_phone","number_of_feedbacks","note_feedback", "checked_billet", "start_date", "received_feedback",
                  "address", "dob", "is_pro"]

class UserSerializer_for_my_profil(serializers.ModelSerializer):
    #records = RecordSerializer(many=True, read_only=True)
    received_feedback = FeedbackSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "intro", "photo", "email", "username", "first_name", "last_name", "phone_number",
                  "checked_email", "checked_phone", "checked_billet", "start_date","number_of_feedbacks","note_feedback", "received_feedback",
                  "address", "dob", "is_pro","total_number_of_ads"]


class UserSerializer_for_profil(serializers.ModelSerializer):
    #records = RecordSerializer(many=True, read_only=True)
    received_feedback = FeedbackSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "intro", "photo","username", "dob", "is_pro","number_of_feedbacks","note_feedback","received_feedback","total_number_of_ads"] # we need to add email or add feedback will not work


class UserSerializer_for_message(serializers.ModelSerializer):
    #records = RecordSerializer(many=True, read_only=True)
    #received_feedback = FeedbackSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id","photo","username"] # we need to add email or add feedback will not work



# i just finished fixing add feedback by adding email to show profil we leak the eamils 
class UserSerializer_record_details(serializers.ModelSerializer):
    #records = RecordSerializer(many=True, read_only=True)
    received_feedback = FeedbackSerializer(many=True, read_only=True)
    class Meta:
        model = CustomUser
        # fields = ["id", "photo","username","email","note_feedback","total_number_of_ads","number_of_feedbacks","received_feedback",
        #           "checked_email", "checked_phone", "checked_billet", "start_date","is_pro"]
        fields = ["id", "photo","username","note_feedback","total_number_of_ads","number_of_feedbacks","received_feedback",
                  "checked_email", "checked_phone", "checked_billet", "start_date","is_pro"]


class UserSerializer_lighter(serializers.ModelSerializer):
    #records = RecordSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id","photo","username","is_pro","note_feedback","number_of_feedbacks"]

from sharedfunctions.tools import compress



class UserUpdateSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField( required=False,validators=[])
    note_feedback = serializers.CharField( required=False,validators=[])
    password = serializers.CharField(
        write_only=True, required=False, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=False)
    old_password = serializers.CharField(write_only=True, required=False)

    def validate(self, attrs):
        if ('password' in attrs) and ('confirm_password' in attrs):
            if 'old_password' not in attrs:
                raise serializers.ValidationError(
                    {"old_passwrd": "Old Password fields is required."})
            if attrs['password'] != attrs['confirm_password']:
                raise serializers.ValidationError(
                    {"password": "Password fields didn't match."})
        return attrs

    def update(self, instance, validated_data, *args, **kwargs):
        old_pass = validated_data.pop('old_password', None)
        password = validated_data.pop('password', None)
        password2 = validated_data.pop("confirm_password", None)
        photo = validated_data.get("photo", None)

        if photo is not None:
            # instance.photo = photo
            instance.photo = compress(photo)

        instance.intro = validated_data.get('intro', instance.intro)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.note_feedback = validated_data.get('note_feedback', instance.note_feedback)
        instance.address = validated_data.get('address', instance.address)
        instance.dob = validated_data.get('dob', instance.dob)

        if password is not None:
            if instance.check_password(old_pass):
                instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        fields = ["id", "intro", "last_name", "first_name", "phone_number", "address", "photo",
            'dob', 'password', 'confirm_password', 'old_password',"note_feedback"]
        optional_fields = ["photo", 'password', 'confirm_password', 'old_password']


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
