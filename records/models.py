from django.db import models

from users.models import CustomUser
from records.utils import IntegerRangeField

import random


def random_number():
    return str(random.randint(1000, 9999))


class Record(models.Model):
    TRANSPORTS = [
        ("Car", "Car"),
        ("Avion", "Avion"),
    ]

    RECORD_TYPE = [
        ("Propose", "Propose"),
        ("Ask", "Ask")
    ]

    type = models.CharField(max_length=20, choices=RECORD_TYPE, null=True)

    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    city_destination = models.CharField(max_length=50)
    city_arrival = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    moyen_de_transport = models.CharField(
        max_length=50, choices=TRANSPORTS, blank=True, null=True)
    min_price = models.PositiveIntegerField(blank=True, null=True)
    max_weight = models.PositiveIntegerField(blank=True, null=True)
    max_volume = IntegerRangeField(
        min_value=1, max_value=5, blank=True, null=True)
    categories = models.JSONField(blank=True, null=True)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="records", null=True, blank=True)
    disabled = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    approved = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=20, null=True)
    image_ask = models.ImageField(upload_to="images/",null=True,blank=True) 
    image_propose = models.ImageField(upload_to="images/",null=True,blank=True)

    def __str__(self):
        return f"From {self.city_arrival} to {self.city_destination} at {str(self.date)}"


class SubRecord(models.Model):
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)

    accepted = models.BooleanField()

    price = models.PositiveIntegerField()
    max_quantity = models.PositiveIntegerField()
    max_weight = models.FloatField()

    record = models.ForeignKey(
        Record, on_delete=models.CASCADE, related_name="sub_records")

    def __str__(self):
        return self.name


class AskRecordItem(models.Model):
    record = models.ForeignKey(
        Record, related_name="ask_items", on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    quantity = models.PositiveBigIntegerField()
    weight = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    state = models.CharField(
        max_length=255, default="Accepted")

    def __str__(self):
        return self.name


class AskRecordItemImage(models.Model):
    item = models.ForeignKey(
        AskRecordItem, models.CASCADE, related_name="item_images", blank=True, null=True)
    image = models.ImageField(upload_to="images/")


class Proposition(models.Model):

    ADDRESS_STATE = [
        ("Undefined", "Undefined"),
        ("Pending", "Pending"),
        ("Accepted", "Accepted"),
        ("Rejected", "Rejected")
    ]

    PROPOSITION_STATE = [
        ("Pending", "Pending"),
        ("Accepted", "Accepted"),
        ("Rejected", "Rejected")
    ]

    user = models.ForeignKey(
        CustomUser, related_name="requested_propositions", blank=True, null=True, on_delete=models.CASCADE)
    record = models.ForeignKey(
        Record, on_delete=models.CASCADE, related_name="propositions", blank=True, null=True)
    address_state = models.CharField(
        max_length=255, choices=ADDRESS_STATE, default="Undefined")
    paid = models.BooleanField(default=False)

    date_of_meeting = models.DateTimeField(blank=True, null=True)

    address = models.CharField(max_length=100, blank=True, null=True)
    meeting_code = models.CharField(
        max_length=4, default=random_number)
    meeting_confirmed = models.BooleanField(default=False)
    delivery_code = models.CharField(max_length=25, default=random_number)
    delivery_confirmed = models.BooleanField(default=False)
    proposition_state = models.CharField(
        max_length=255, choices=PROPOSITION_STATE, default="Pending")
    message = models.TextField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f'{self.user}: {self.record}'


class PropositionItem(models.Model):

    STATE = [
        ("Undefined", "Undefined"),
        ("Accepted", "Accepted"),
        ("Rejected", "Rejected")
    ]

    proposition = models.ForeignKey(
        Proposition, on_delete=models.CASCADE, related_name="proposition_items", blank=True, null=True)

    name = models.CharField(max_length=50)
    quantity = models.PositiveBigIntegerField(null=True)
    weight = models.PositiveIntegerField()
    price = models.PositiveIntegerField(blank=True, null=True)

    state = models.CharField(
        max_length=255, choices=STATE, default="Undefined")

    def __str__(self):
        return self.name


class PropositionItemImage(models.Model):
    item = models.ForeignKey(
        PropositionItem, models.CASCADE, related_name="item_images", blank=True, null=True)
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return self.item.name


class Feedback(models.Model):
    writer = models.ForeignKey(
        CustomUser, related_name="written_feedback", on_delete=models.CASCADE, null=True)
    receiver = models.ForeignKey(
        CustomUser, related_name="received_feedback", on_delete=models.CASCADE, null=True)
    note = models.PositiveIntegerField()
    text = models.TextField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    validated = models.BooleanField(default=True)

    def __str__(self):
        return str(self.note)


class Report(models.Model):
    writer = models.ForeignKey(
        CustomUser, related_name="written_report", on_delete=models.CASCADE, null=True)
    receiver = models.ForeignKey(
        CustomUser, related_name="received_report", on_delete=models.CASCADE, null=True)
    text = models.TextField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    validated = models.BooleanField(default=True)

    def __str__(self):
        return str(self.text)

class Captcha(models.Model):
    all_form = models.BooleanField(default=False)
    reg_form = models.BooleanField(default=False)
    login_form = models.BooleanField(default=False)
    annonce_form = models.BooleanField(default=False)
    demande_form = models.BooleanField(default=False)
    search_form = models.BooleanField(default=False)

    


