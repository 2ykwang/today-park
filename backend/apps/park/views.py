from django.http import Http404
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from .models import Equipment, Park, ParkEquipment
from .serializers import ParkSerializer


class ParkList(APIView):
    def get(self, request, format=None):
        keyword = request.GET.get("search", None)  # 공원이름, 동이름
        sort_by = request.GET.get("sort", None)  # 평점, 리뷰많은순, 가나다
        sort_type = {
            "score_asc": 0,
            "score_desc": 1,
            "review_asc": 2,
            "review_desc": 3,
            "dict_asc": 4,
            "dict_desc": 5,
        }

        if keyword is None and sort_by is None:
            park = Park.objects.all().order_by("score")
        elif keyword is not None and sort_by is not None:
            park = Park.objects.filter(
                park_name__contains=keyword, full_address__contains=keyword
            )
            if sort_type[sort_by] == "score_asc":
                park.order_by("score")
            elif sort_by == "score_desc":
                park.order_by("-score")
            # elif sort_by == 'review_asc':
            # elif sort_by == 'review_desc':
            elif sort_by == "dict_asc":
                park.order_by("park_name")
            elif sort_by == "dict_desc":
                park.order_by("-park_name")

        serializer = ParkSerializer(park, many=True)
        # serializer.is_valid()
        # serializer.validated_data["search"]

        return Response(serializer.data)


class ParkDetail(APIView):
    def get(self, request, pk, format=None):
        park = get_object_or_404(Park, pk=pk)
        serializer = ParkSerializer(park)
        return Response(serializer.data)
