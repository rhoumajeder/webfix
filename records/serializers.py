from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.views import APIView

from records.models import Record, Captcha, SubRecord, Proposition, PropositionItem, PropositionItemImage, AskRecordItem, AskRecordItemImage, Feedback, Report
from users.serializers import UserSerializer, UserSerializer_for_message,UserSerializer_lighter,UserSerializer_record_details,UserSerializer_for_feedbacks
from users.models import CustomUser


class PropositionItemListSerializer(ModelSerializer):
    class Meta:
        model = PropositionItem
        exclude = ("proposition",)


class SubRecordSerializer(ModelSerializer):

    class Meta:
        model = SubRecord
        fields = "__all__"


class SubRecordSerializer_light(ModelSerializer):

    class Meta:
        model = SubRecord
        #fields = "__all__"
        fields = ["name","category","accepted","price","max_quantity","max_weight","record"]


class CaptchaSerializer(ModelSerializer):

    class Meta:
        model = Captcha
        fields = "__all__"


class RecordListSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Record
        fields = "__all__"


class RecordSerializer(ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"


class AskRecordItemSerializer(ModelSerializer):
    class Meta:
        model = AskRecordItem
        fields = "__all__"


class RecordDetailSerializer(ModelSerializer):
    sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"

class RecordDetailSerializer_only_travel_card_for_index(ModelSerializer):
    sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer_lighter(read_only=True)
    #user = UserSerializer(read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"
        # fields = ["id","date","city_destination","city_arrival","moyen_de_transport","description","min_price",
        # "max_weight","max_volume","categories","user","ask_items","sub_records","type"]

class RecordDetailSerializer_lighter(ModelSerializer):
    sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer_record_details(read_only=True)
    #user = UserSerializer(read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"
        # fields = ["id","date","city_destination","city_arrival","moyen_de_transport","description","min_price",
        # "max_weight","max_volume","categories","user","ask_items","sub_records","type"]

class RecordDetailSerializer_for_get_rooms(ModelSerializer):
    #sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer_for_message(read_only=True)
    #user = UserSerializer(read_only=True)
    #ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"
        # fields = ["id","date","city_destination","city_arrival","moyen_de_transport","description","min_price",
        # "max_weight","max_volume","categories","user","ask_items","sub_records","type"]


class PropositionSerializer_list(ModelSerializer):
    record = RecordDetailSerializer_lighter(read_only=True)
    user = UserSerializer_lighter(read_only=True)
    proposition_items = PropositionItemListSerializer(
        read_only=True, many=True)

    class Meta:
        model = Proposition
        fields = "__all__"

class RecordDetailSerializer_get_list_requests(ModelSerializer):
    sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer_lighter(read_only=True)
    #user = UserSerializer(read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"

class get_list_requests_PropositionSerializer_list(ModelSerializer):
    record = RecordDetailSerializer_get_list_requests(read_only=True)
    user = UserSerializer_lighter(read_only=True)
    proposition_items = PropositionItemListSerializer(
        read_only=True, many=True)

    class Meta:
        model = Proposition
        fields = "__all__"

class RecordDetailSerializer_for_list_offers(ModelSerializer):
    sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer_lighter(read_only=True)
    #user = UserSerializer(read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"
        # fields = ["id","date","city_destination","city_arrival","moyen_de_transport","description","min_price",
        # "max_weight","max_volume","categories","user","ask_items","sub_records","type"]

class RecordDetailSerializer_for_notification(ModelSerializer):
    #sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer_for_message(read_only=True)
    #user = UserSerializer(read_only=True)
    #ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"


class RecordDetailSerializer_for_proposition_state(ModelSerializer):
    sub_records = SubRecordSerializer(many=True, read_only=True)
    user = UserSerializer_lighter(read_only=True)
    #user = UserSerializer(read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)

    class Meta:
        model = Record
        fields = "__all__"
        # fields = ["id","date","city_destination","city_arrival","moyen_de_transport","description","min_price",
        # "max_weight","max_volume","categories","user","ask_items","sub_records","type"]

class list_offers_Propositions_Serializer(ModelSerializer):
    record = RecordDetailSerializer_for_list_offers(read_only=True)
    user = UserSerializer_lighter(read_only=True)
    proposition_items = PropositionItemListSerializer(
        read_only=True, many=True)

    class Meta:
        model = Proposition
        fields = "__all__"

class PropositionSerializer_for_proposition_state(ModelSerializer):
    record = RecordDetailSerializer_for_proposition_state(read_only=True)
    user = UserSerializer_lighter(read_only=True)
    proposition_items = PropositionItemListSerializer(
        read_only=True, many=True)

    class Meta:
        model = Proposition
        fields = "__all__"

#backup
class PropositionSerializer(ModelSerializer):
    record = RecordDetailSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    proposition_items = PropositionItemListSerializer(
        read_only=True, many=True)

    class Meta:
        model = Proposition
        fields = "__all__"
class RecordGetSerializer_list(ModelSerializer):
    user = UserSerializer_lighter(read_only=True)
    propositions =  PropositionSerializer_list(many=True, read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)
    sub_records = SubRecordSerializer(many=True, read_only=True)

    class Meta:
        model = Record
        fields = "__all__"

class PropositionSerializer_for_notifications(ModelSerializer):
    # record = RecordDetailSerializer_for_list_offers(read_only=True)
    record = RecordDetailSerializer_for_notification(read_only=True)
    user = UserSerializer_for_message(read_only=True)
    #proposition_items = PropositionItemListSerializer( read_only=True, many=True)

    class Meta:
        model = Proposition
        fields = "__all__"



class RecordGetSerializer_list(ModelSerializer):
    user = UserSerializer_lighter(read_only=True)
    propositions =  PropositionSerializer_list(many=True, read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)
    sub_records = SubRecordSerializer(many=True, read_only=True)

    class Meta:
        model = Record
        fields = "__all__"

class get_list_offers_serializers(ModelSerializer):
    user = UserSerializer_lighter(read_only=True)
    propositions =  list_offers_Propositions_Serializer(many=True, read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)
    sub_records = SubRecordSerializer(many=True, read_only=True)

    class Meta:
        model = Record
        fields = "__all__"

#backup
class RecordGetSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    propositions = PropositionSerializer(many=True, read_only=True)
    ask_items = AskRecordItemSerializer(read_only=True, many=True)
    sub_records = SubRecordSerializer(many=True, read_only=True)

    class Meta:
        model = Record
        fields = "__all__"


class PropositionItemImageSerializer(ModelSerializer):
    class Meta:
        model = PropositionItemImage
        fields = ("image",)


class PropositionItemSerializer(ModelSerializer):
    proposition = PropositionSerializer(read_only=True)
    item_images = PropositionItemImageSerializer(read_only=True, many=True)

    class Meta:
        model = PropositionItem
        fields = ("proposition", "name", "quantity",
                  "weight", "price", "state", "item_images", "id")


class AskRecordItemImageSerializer(ModelSerializer):
    class Meta:
        model = AskRecordItemImage
        fields = ("image",)


class FeedbackSerializer(ModelSerializer):
    writer = UserSerializer(read_only=True)  
    receiver = UserSerializer(read_only=True)
    # writer = UserSerializer_for_feedbacks(read_only=True)  
    # receiver = UserSerializer_for_feedbacks(read_only=True)

    class Meta:
        model = Feedback
        fields = "__all__"

class FeedbackSerializer_for_creation(ModelSerializer):
    writer = UserSerializer(read_only=True)  
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Feedback
        fields = "__all__"

class FeedbackSerializer_user(ModelSerializer):

    def update(self, instance, validated_data, *args, **kwargs):
        instance.note_feedback = validated_data.get('note_feedback', instance.note_feedback)
        instance.number_of_feedbacks = validated_data.get('number_of_feedbacks', instance.note_feedback)
        instance.total_number_of_ads = validated_data.get('total_number_of_ads', instance.note_feedback)
        instance.save()
        return instance
   
    class Meta:
        model = CustomUser
        fields = ["note_feedback","number_of_feedbacks","total_number_of_ads"]


class ReportSerializer(ModelSerializer):
    writer = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Report
        fields = "__all__"
