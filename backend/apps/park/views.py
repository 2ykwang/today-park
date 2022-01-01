from apps.review.models import Review
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

        if keyword is None and sort_by is None:
            park = Park.objects.all()

        serializer = ParkSerializer(park, many=True)
        # serializer.is_valid()
        # serializer.validated_data["search"]

        return Response(serializer.data)


class ParkDetail(APIView):
    def get(self, request, pk, format=None):
        park = get_object_or_404(Park, pk=pk)
        serializer = ParkSerializer(park)
        return Response(serializer.data)
