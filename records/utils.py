import math

from django.db import models
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value': self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)


class CustomLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

    def get_paginated_response(self, data):
        if not self.offset:
            offset = 1
        else:
            offset = self.offset

        return Response({
            "total_pages": math.ceil(self.count / offset),
            "count": self.count,
            "results": data
        })

