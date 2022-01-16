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
    PropositionItemImageSerializer, RecordListSerializer, CaptchaSerializer, SubRecordSerializer, PropositionSerializer,
    PropositionItemSerializer, RecordSerializer, RecordGetSerializer, RecordDetailSerializer, AskRecordItemSerializer, AskRecordItemImageSerializer, FeedbackSerializer,
    ReportSerializer,FeedbackSerializer_user,RecordDetailSerializer_lighter,RecordGetSerializer_list,PropositionSerializer_list,get_list_offers_serializers,
    get_list_requests_PropositionSerializer_list,PropositionSerializer_for_proposition_state,FeedbackSerializer_for_creation,
    RecordDetailSerializer_only_travel_card_for_index)
from records.utils import CustomLimitOffsetPagination
from users.models import CustomUser

from notifications.utils import create_notification
from records.models import Captcha
import datetime
from django.views.decorators.cache import cache_page
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q


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
            print(obj)
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
    date_from = datetime.datetime.now() - datetime.timedelta(hours=10)
    record_count = Record.objects.filter(user=request.user,created_at__gt=date_from).count()
    
    print("===================Debgu rje star=====================")
    print(record_count)
    print(date_from)
    print( datetime.datetime.now())
    print(datetime.timedelta(hours=10))
    print("===============Debgu rje star===========================")
    if record_count > 100:
         return Response("You can not have more than x records in Last x Hours", status=status.HTTP_400_BAD_REQUEST)
    print(request.data)
    
    total_number_of_ads = Record.objects.filter(user=request.user).count()
    total_number_of_ads_dic = {}
    total_number_of_ads_dic["total_number_of_ads"] =  total_number_of_ads

    serializer_feedback = FeedbackSerializer_user(data=total_number_of_ads_dic)

    serializer = RecordSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        if serializer_feedback.is_valid():
            serializer_feedback.update(request.user,serializer_feedback.validated_data)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#BackUp
# @api_view(["GET"])
# def get_record(request, pk):
#     record = get_object_or_404(Record, id=pk, deleted=False)
#     print("====================== ")
#     print("i am called here ")
#     print("====================== ")
#     serializer = RecordDetailSerializer(record)
#     return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_record(request, pk):
    record = get_object_or_404(Record, id=pk, deleted=False)
    print("====================== ")
    print("i am called here ")
    print("====================== ")
    serializer = RecordDetailSerializer_lighter(record)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_recaptcha(request):
    cs = Captcha.objects.all()
    if cs:
        c = cs[0]
        serializer = CaptchaSerializer(c)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
    




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




"""
Get record by theses conditions : 
-approved=True, deleted=False, last 30 element , 
- Date for propose  greater then now.

"""
import time


@cache_page(60 * 60)  # 60 minutes 
@api_view(["GET"])
def get_all_records(request):

    start = time.time()
    records = Record.objects.filter(
        approved=True,
        deleted=False,
    ).order_by('-date')
    # ).order_by('-id') date
    
    end = time.time()
    durantion = end - start 
    print("***** time for records.object = " +  str(durantion))
    # records = Record.objects.filter(
    #     approved=True,
    #     deleted=False
    # ).order_by('-updated_at')

    max_weight = request.GET.get("max_weight", "")
    max_volume = request.GET.get("max_volume", "")
    date = request.GET.get("date", "")

    start = time.time()
    record_filter = RecordFilter(request.GET, queryset=records)
    records = record_filter.qs
    end = time.time()
    durantion = end - start
    print("***** time for record_filter = " +  str(durantion))


    if max_weight != "":
        records = records.filter(max_weight__gte=int(max_weight))

    if max_volume != "":
        records = records.filter(max_volume__gte=int(max_volume))

    if date != "":
        records = records.filter(
            date__gte=datetime.datetime.now().date(), date__lte=datetime.datetime.strptime(date, "%Y-%m-%d").date())


    # see the data in json is repeat itself to be filtred by the elimanted maybe the record details  repeated fields 
    start2 = time.time()
    serializer = RecordDetailSerializer_only_travel_card_for_index(records, many=True)
    #print(serializer.data)
    end2 = time.time()
    durantion2 = end2 - start2
    print("***** time for serializer = " + str(durantion2))
    start1 = time.time()
    res = Response(serializer.data, status=status.HTTP_200_OK)
    end1 = time.time()
    durantion1 = end1 - start1
    print("***** time for response = " + str(durantion1))
    print("index button called me")
    return res


@cache_page(60 * 60)  # 60 minutes 
@api_view(["GET"])
def search_all_records(request):

    max_weight = request.GET.get("max_weight", "")
    max_volume = request.GET.get("max_volume", "")
    date = request.GET.get("date", "")
     
    #records = Record.objects.filter(approved=True,deleted=False).order_by('-date')
    records = Record.objects.filter( 
        Q(approved=True) & Q(deleted=False ),
         ).exclude( Q(type="Propose") & Q( date__lt=datetime.datetime.now().date() ))
    
    record_filter = RecordFilter(request.GET, queryset=records)
    records = record_filter.qs
     
    if max_weight != "":
        records = records.filter(max_weight__gte=int(max_weight))

    if max_volume != "":
        records = records.filter(max_volume__gte=int(max_volume))

    if date != "":
        records = records.filter(
            date__gte=datetime.datetime.now().date(), date__lte=datetime.datetime.strptime(date, "%Y-%m-%d").date())

    print("search button called me")
    
    
    #records = records[:25]
   
   
    paginator = PageNumberPagination()
    paginator.page_size = 3
    result_page = paginator.paginate_queryset(records, request)
    serializer = RecordDetailSerializer_only_travel_card_for_index(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
    
    # start1 = time.time()
    # res = Response(serializer.data, status=status.HTTP_200_OK)

    # end1 = time.time()
    # durantion1 = end1 - start1
    # print("***** search all time for response = " + str(durantion1))
    # return res

@api_view(["GET"])
def get_all_records_backup(request):
    records = Record.objects.filter(
        approved=True,
        deleted=False,
    ).order_by('-id')[:30]
    print(records)
    # records = Record.objects.filter(
    #     approved=True,
    #     deleted=False
    # ).order_by('-updated_at')
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
def get_records_for_user(request): # we do not use this function , it's replaced by get_list_offers 
    records = Record.objects.filter(user=request.user).order_by('-updated_at')[:11]
    serializer = RecordGetSerializer(records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_list_offers(request):
    records = Record.objects.filter(user=request.user).order_by('-date')

    paginator = PageNumberPagination()
    paginator.page_size = 3
    result_page = paginator.paginate_queryset(records, request)
    serializer = get_list_offers_serializers(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

    # serializer = get_list_offers_serializers(records, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_list_requests(request):
    propositions = Proposition.objects.filter(
        user=request.user).order_by('-updated_at')[:11]
    
    paginator = PageNumberPagination()
    paginator.page_size = 3
    result_page = paginator.paginate_queryset(propositions, request)
    serializer = get_list_requests_PropositionSerializer_list(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

    # return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_proposition(request, pk):
    record = get_object_or_404(Record, id=pk)
    serializer = PropositionSerializer(data=request.data)

    date_from = datetime.datetime.now() - datetime.timedelta(hours=10)
    record_count = Proposition.objects.filter(user=request.user,created_at__gt=date_from).count()
    print("===================Debgu rje star=====================")
    print(record_count)
    print(date_from)
    print( datetime.datetime.now())
    print(datetime.timedelta(hours=10))
    print("===============Debgu rje star===========================")
    if record_count > 100:
         return Response("You can not have more than x proposition in Last x Hours", status=status.HTTP_400_BAD_REQUEST)

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
        # if proposition.record.user.username == request.user.username:
        if proposition.record.user.id == request.user.id:
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
    # serializer = PropositionSerializer(proposition)
    serializer = PropositionSerializer_for_proposition_state(proposition)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_propositions_offers(request):
    propositions = Proposition.objects.filter(
        record__created_by=request.user).order_by('-updated_at')
    serializer = PropositionSerializer(propositions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_proposition_requests(request):
#     propositions = Proposition.objects.filter(
#         user=request.user).order_by('-updated_at')
#     serializer = PropositionSerializer(propositions, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_proposition_requests(request):
    propositions = Proposition.objects.filter(
        user=request.user).order_by('-updated_at')
    serializer = PropositionSerializer_list(propositions, many=True)
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
# def create_feedback(request, receiver_email):
def create_feedback(request, id):
    receiver = get_object_or_404(CustomUser, id=id)

    notes_feedback = CustomUser.objects.filter(id=id).values_list('note_feedback', flat=True)
    get_total_feedback = Feedback.objects.filter(receiver=receiver).count()
    Feedback_notes = {}
    Feedback_notes["number_of_feedbacks"] =  get_total_feedback + 1
    Feedback_notes["note_feedback"] = request.data["note"]  + notes_feedback[0]

    if Feedback.objects.filter(writer=request.user, receiver=receiver).exists():
        return Response("You have already left feedback for this user", status=status.HTTP_400_BAD_REQUEST)

    serializer = FeedbackSerializer_for_creation(data=request.data)

    serializer_feedback = FeedbackSerializer_user(data=Feedback_notes)

    

    if serializer.is_valid():
        
        if serializer_feedback.is_valid():
            serializer_feedback.update(receiver,serializer_feedback.validated_data)
        
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
