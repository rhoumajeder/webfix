from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('sub-records', views.SubRecordViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create-record/', views.create_record),
    path('update-record/<str:pk>/', views.update_record),
    path('delete-record/<str:pk>/', views.delete_record),
    path('get-record/<str:pk>/', views.get_record),
    path('get-all-records/', views.get_all_records),
    path('get-ask-records/', views.get_ask_records),
    path('get-propose-records/', views.get_propose_records),
#     path('get-records-for-user/', views.get_records_for_user),  get_list_offers
    path('get-records-for-user/', views.get_list_offers),
    path('sub-records/bulk', views.SubRecordBulkInsertView.as_view()),
    path('create-proposition/<str:pk>/',
         views.create_proposition),
    path('get-proposition/<str:pk>/', views.get_proposition),
    path('update-proposition/<str:pk>/',
         views.update_proposition),
    path('get-offers/', views.get_propositions_offers),
    path('get-requests/', views.get_list_requests),
#     path('get-requests/', views.get_proposition_requests),

    path('create-proposition-items/<str:pk>/',
         views.create_proposition_items),
    path('update-proposition-item/<str:pk>/',
         views.update_proposition_item),
    path('create-item-images/<str:pk>/',
         views.create_item_images),
    path('get-item-images/<str:pk>/', views.get_item_images),
    path('create-ask-record-items/<str:pk>/', views.create_ask_record_items),
    path('create-ask-record-item-images/<str:pk>/',
         views.create_ask_record_item_images),
    path('get-ask-record-item-images/<str:pk>/',
         views.get_ask_record_item_images),
    path('create-feedback/<str:receiver_email>/',
         views.create_feedback),
    path('report-user/<str:receiver_email>/',
         views.report_user),
    path('getrecaptcha/', views.get_recaptcha),

]
