from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework import status
from rest_framework.parsers import MultiPartParser

from .filters import RecordFilter
from records.models import Record, SubRecord, Proposition, PropositionItem, AskRecordItem, AskRecordItemImage, Feedback, Report
from records.serializers import (
    PropositionItemImageSerializer, RecordListSerializer, SubRecordSerializer, PropositionSerializer,
    PropositionItemSerializer, RecordSerializer, RecordGetSerializer, RecordDetailSerializer, AskRecordItemSerializer, AskRecordItemImageSerializer, FeedbackSerializer,
    ReportSerializer)
from records.utils import CustomLimitOffsetPagination
from users.models import CustomUser
from notifications.utils import create_notification

import datetime


class SubRecordViewSet(viewsets.ModelViewSet):
    queryset = SubRecord.objects.all()
    serializer_class = SubRecordSerializer
    pagination_class = CustomLimitOffsetPagination
    permission_classes = [IsAuthenticated]


class SubRecordBulkInsertView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        saved_objects = list()
        invalid_objects = list()

        for obj in request.data:
            serializer = SubRecordSerializer(data=obj)
            if serializer.is_valid():
                serializer.create(serializer.validated_data)
                saved_objects.append(obj)
            else:
                obj["errors"] = serializer.errors
                invalid_objects.append(obj)

        return Response({"saved": saved_objects, "error": invalid_objects})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_record(request):
    # record_count = Record.objects.filter(user=request.user).count()

    # if record_count > 1:
    #     return Response("You can not have more than two active records", status=status.HTTP_400_BAD_REQUEST)

    serializer = RecordSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_record(request, pk):
    record = get_object_or_404(Record, id=pk, deleted=False)
    serializer = RecordDetailSerializer(record)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_record(request, pk):
    record = get_object_or_404(Record, id=pk)
    serializer = RecordSerializer(
        data=request.data, instance=record, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_record(request, pk):
    record = get_object_or_404(Record, id=pk)
    record.deleted = True
    record.save()
    return Response("Record Deleted", status=status.HTTP_200_OK)


@api_view(["GET"])
def get_all_records(request):
    records = Record.objects.filter(
        approved=True,
        deleted=False
    ).order_by('-updated_at')
    max_weight = request.GET.get("max_weight", "")
    max_volume = request.GET.get("max_volume", "")
    date = request.GET.get("date", "")

    record_filter = RecordFilter(request.GET, queryset=records)
    records = record_filter.qs

    if max_weight != "":
        records = records.filter(max_weight__gte=int(max_weight))

    if max_volume != "":
        records = records.filter(max_volume__gte=int(max_volume))

    if date != "":
        records = records.filter(
            date__gte=datetime.datetime.now().date(), date__lte=datetime.datetime.strptime(date, "%Y-%m-%d").date())

    serializer = RecordDetailSerializer(records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_propose_records(request):
    records = Record.objects.filter(type="Propose").order_by('-updated_at')
    serializer = RecordDetailSerializer(records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_ask_records(request):
    records = Record.objects.filter(type="Ask").order_by('-updated_at')
    serializer = RecordDetailSerializer(records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_ask_record_items(request, pk):
    record = get_object_or_404(Record, id=pk)
    serializer = AskRecordItemSerializer(data=request.data, many=True)

    if serializer.is_valid():
        serializer.save(record=record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def create_ask_record_item_images(request, pk):
    item = get_object_or_404(AskRecordItem, id=pk)
    serializer = AskRecordItemImageSerializer(
        data=request.data)

    if serializer.is_valid():
        serializer.save(item=item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_ask_record_item_images(request, pk):
    item = get_object_or_404(AskRecordItem, id=pk)
    serializer = AskRecordItemImageSerializer(
        item.item_images.all(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_records_for_user(request):
    records = Record.objects.filter(user=request.user).order_by('-updated_at')
    serializer = RecordGetSerializer(records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_proposition(request, pk):
    record = get_object_or_404(Record, id=pk)
    serializer = PropositionSerializer(data=request.data)

    if serializer.is_valid():
        proposition = serializer.save(record=record, user=request.user)
        create_notification(to_user=record.user, created_by=request.user,
                            message=f"{request.user.username} has sent you a proposition", type="Proposition", reference=proposition)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_proposition(request, pk):
    proposition = get_object_or_404(Proposition, id=pk)
    serializer = PropositionSerializer(
        instance=proposition, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

        to_user = ""

        if proposition.record.user.username == request.user.username:
            to_user = proposition.user
        else:
            to_user = proposition.record.user

        create_notification(
            to_user=to_user, created_by=request.user, type="Proposition", reference=proposition, message=f"{request.user.username} has made an update in a proposition.",)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_proposition(request, pk):
    proposition = get_object_or_404(Proposition, id=pk)
    serializer = PropositionSerializer(proposition)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_propositions_offers(request):
    propositions = Proposition.objects.filter(
        record__created_by=request.user).order_by('-updated_at')
    serializer = PropositionSerializer(propositions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_proposition_requests(request):
    propositions = Proposition.objects.filter(
        user=request.user).order_by('-updated_at')
    serializer = PropositionSerializer(propositions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_proposition_items(request, pk):
    proposition = get_object_or_404(Proposition, id=pk)
    serializer = PropositionItemSerializer(data=request.data, many=True)

    if serializer.is_valid():
        serializer.save(proposition=proposition)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_proposition_item(request, pk):
    item = get_object_or_404(PropositionItem, id=pk)
    serializer = PropositionItemSerializer(
        instance=item, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def create_item_images(request, pk):
    print(pk)
    print(request.data)
    item = get_object_or_404(PropositionItem, id=pk)
    serializer = PropositionItemImageSerializer(
        data=request.data)

    if serializer.is_valid():
        serializer.save(item=item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_item_images(request, pk):
    item = get_object_or_404(PropositionItem, id=pk)
    serializer = PropositionItemImageSerializer(
        item.item_images.all(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_feedback(request, receiver_email):
    receiver = get_object_or_404(CustomUser, email=receiver_email)

    if Feedback.objects.filter(writer=request.user, receiver=receiver).exists():
        return Response("You have already left feedback for this user", status=status.HTTP_400_BAD_REQUEST)

    serializer = FeedbackSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(writer=request.user, receiver=receiver)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_user(request, receiver_email):
    receiver = get_object_or_404(CustomUser, email=receiver_email)

    if Report.objects.filter(writer=request.user, receiver=receiver).exists():
        return Response("You have already left report for this user", status=status.HTTP_400_BAD_REQUEST)

    serializer = ReportSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(writer=request.user, receiver=receiver)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
