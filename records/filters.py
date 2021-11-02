import django_filters

from .models import Record


class RecordFilter(django_filters.FilterSet):
    class Meta:
        model = Record
        fields = ("city_destination", "city_arrival",
                  "moyen_de_transport", "type")
