from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.views import APIView

from records.models import Record, SubRecord, Proposition, PropositionItem, PropositionItemImage, AskRecordItem, AskRecordItemImage, Feedback, Report
from users.serializers import UserSerializer


class PropositionItemListSerializer(ModelSerializer):
    class Meta:
        model = PropositionItem
        exclude = ("proposition",)


class SubRecordSerializer(ModelSerializer):

    class Meta:
        model = SubRecord
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


class PropositionSerializer(ModelSerializer):
    record = RecordDetailSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    proposition_items = PropositionItemListSerializer(
        read_only=True, many=True)

    class Meta:
        model = Proposition
        fields = "__all__"


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

    class Meta:
        model = Feedback
        fields = "__all__"


class ReportSerializer(ModelSerializer):
    writer = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Report
        fields = "__all__"
