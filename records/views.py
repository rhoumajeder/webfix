from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import os, random 
import string
from django.core.files.base import ContentFile
from io import BytesIO, StringIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
import datetime

# Open an Image


Color = {"red" : (255, 0, 0), "green" : (102, 175, 50) }
def VX(Ads,key):
    return "V" if Ads[key] else "X"
def RG(Ads,key):
     return Color["green"] if Ads[key] else Color["red"]
def rd_string():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))

def Create_imagefrom_ad(Ads):

    link_image_card = "records/card.PNG"
    link_image_plane = "plane.png"
    link_image_ask = "imageAskrecord.PNG"

    
    if Ads["type"] == "Propose" :
        img = Image.open('plane.png' if Ads["plane"] else 'card.PNG')

         # Call draw Method to add 2D graphics in an image
        I1 = ImageDraw.Draw(img)
        # Custom font style and font size
        myFontbd = ImageFont.truetype('arialbd.ttf', 18)
        myFont = ImageFont.truetype('arial.ttf', 18)


        # Add Text to an image
        I1.text((300, 60), Ads["date"], font=myFontbd, fill =(0, 0, 0))
        I1.text((838, 57), Ads["min_price"], font=myFontbd, fill =(0, 0, 0))
        I1.text((850, 80), Ads["max_weight"], font=myFontbd, fill =(0, 0, 0))
        I1.text((323,125), Ads["destination"], font=myFont, fill =(0, 0, 0))
        I1.text((323,  94),Ads["depart"], font=myFont, fill =(0, 0, 0))
        I1.text((120, 174),Ads["username"], font=myFont, fill =(0, 0, 0))


        I1.text((347, 175), VX(Ads,"f") , font=myFontbd, fill = RG(Ads,"f") )
        I1.text((483, 175), VX(Ads,"M"), font=myFontbd, fill =  RG(Ads,"M") )
        I1.text((646, 175), VX(Ads,"SE"), font=myFontbd, fill = RG(Ads,"SE") )
        I1.text((815, 175), VX(Ads,"SA"), font=myFontbd, fill = RG(Ads,"SA") )

        I1.text((386, 209), VX(Ads,"V"), font=myFontbd, fill = RG(Ads,"V") )
        I1.text((539, 209), VX(Ads,"BM"), font=myFontbd, fill = RG(Ads,"BM") )
        I1.text((684, 209), VX(Ads,"BE"), font=myFontbd, fill = RG(Ads,"BE") )
        I1.text((769, 209), VX(Ads,"Autres"), font=myFontbd, fill = RG(Ads,"Autres") )



        img_io = BytesIO()
        img.save(img_io, format='PNG', quality=100)
        img_content = ContentFile(img_io.getvalue(), Ads["name_image_url"] + '.jpg')
        return img_content 
    
    elif Ads["type"] == "Ask": 

        img = Image.open('imageAskrecord.PNG')
         # Call draw Method to add 2D graphics in an image
        I1 = ImageDraw.Draw(img)
        # Custom font style and font size
        myFontbd = ImageFont.truetype('arialbd.ttf', 18)
        myFont = ImageFont.truetype('arial.ttf', 18)


        # Add Text to an image
        I1.text((240, 40), Ads["date"], font=myFontbd, fill =(0, 0, 0))

        I1.text((675, 40), Ads["ask_total_price"], font=myFontbd, fill =(0, 0, 0))
        I1.text((684, 61), Ads["ask_total_weight"], font=myFontbd, fill =(0, 0, 0))

        I1.text((260, 104), Ads["destination"], font=myFont, fill =(0, 0, 0))
        I1.text((260, 75),Ads["depart"], font=myFont, fill =(0, 0, 0))

        I1.text((95, 145),Ads["username"], font=myFont, fill =(0, 0, 0))

        index = 0 
        inc_y = 0
        for i in Ads["ask_item_info"] : 
            # 'name': 'Trotinette ', 'quantity': 1, 'weight': '50', 'price': '70',
            I1.text((321, 226 + inc_y ),i["name"], font=myFont, fill =(0, 0, 0))
            I1.text((494, 226 + inc_y ),str(i["quantity"]), font=myFont, fill =(0, 0, 0))
            I1.text((592, 226 + inc_y ),str(i["weight"]), font=myFont, fill =(0, 0, 0))
            I1.text((685, 226 + inc_y ),str(i["price"]), font=myFont, fill =(0, 0, 0))
            index = index + 1 
            inc_y = inc_y + 30
            if index == 3 : 
                break
            
        img_io = BytesIO()
        img.save(img_io, format='PNG', quality=100)
        img_content = ContentFile(img_io.getvalue(), Ads["name_image_url"] + '.jpg')
        return img_content 





"""
end of modification to insert image

"""
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
    record_count_all = Record.objects.filter(user=request.user).count() + 1
    
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
    data_treated=request.data

    print("==========rje star")
    print(data_treated)
    print("==========rje end")
    
    if data_treated["type"] == "Propose" :
        Ads_propose ={  
                "username": request.user.username,
                "plane" : True if data_treated["moyen_de_transport"] == "Avion" else False ,
                "date":   datetime.datetime.strptime(data_treated["date"], "%Y-%m-%d").strftime("%A %d %B %Y"),
                "depart":  data_treated["city_arrival"],
                "destination":  data_treated["city_destination"],
                "max_weight":  str(data_treated["max_weight"]),
                "min_price":  str(data_treated["min_price"]),
                "f":      True if "Food" in data_treated["categories"] else False,
                "M":      True if "Medicaments" in data_treated["categories"] else False,
                "SE":     True if "Small Electronics" in data_treated["categories"] else False,
                "SA":     True if "Small Accessories" in data_treated["categories"] else False,
                "V":      True if "Vetements" in data_treated["categories"] else False,
                "BM":     True if "Big Mechanical" in data_treated["categories"] else False,
                "BE":     True if "Big Electronics" in data_treated["categories"] else False,
                "Autres": True if "Autres" in data_treated["categories"] else False,
                "name_image_url": request.user.username + "-img-propose-share-on-fb-" + str(record_count_all),
                "type" : data_treated["type"]

            }
        image = Create_imagefrom_ad(Ads_propose)
        data_treated["image_propose"]  = image

    elif data_treated["type"] == "Ask" : 
        Ads_Ask ={  
                "username": request.user.username,
                "date":   datetime.datetime.strptime(data_treated["date"], "%Y-%m-%d").strftime("%A %d %B %Y"),
                "depart":  data_treated["city_arrival"],
                "destination":  data_treated["city_destination"],

                "ask_total_weight":  str(data_treated["ask_total_weight"]),
                "ask_total_price":  str(data_treated["ask_total_price"]),
                "ask_item_info" : data_treated["ask_item_info"], 

                "name_image_url":  request.user.username + "-img-Ask-share-on-fb-" + str(record_count_all),
                "type" : data_treated["type"]

            }
        image = Create_imagefrom_ad(Ads_Ask)
        data_treated["image_ask"]  = image
        del data_treated["ask_item_info"]


    
    # data_treated["ask_item_info"] = []
    serializer = RecordSerializer(data=data_treated)


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
