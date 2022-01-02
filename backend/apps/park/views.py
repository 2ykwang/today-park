from apps.review.models import Review
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from .models import Equipment, Park, ParkEquipment
from .serializers import ParkRequestSerializer, ParkSerializer


class ParkList(APIView):
    """
    공원 검색

    조건에 따른 공원 목록 검색 결과를 반환합니다.
    """

    guId = openapi.Parameter(
        "guId",
        openapi.IN_QUERY,
        description="구ID",
        required=True,
        type=openapi.TYPE_STRING,
    )
    keyword = openapi.Parameter(
        "keyword", openapi.IN_QUERY, description="검색키워드", type=openapi.TYPE_STRING
    )
    sort = openapi.Parameter(
        "sort", openapi.IN_QUERY, description="정렬", type=openapi.TYPE_STRING
    )

    @swagger_auto_schema(
        manual_parameters=[guId, keyword, sort],
        responses={
            status.HTTP_200_OK: ParkSerializer,
            status.HTTP_204_NO_CONTENT: "공원 정보가 존재하지 않음",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def get(self, request, format=None):
        guId = request.GET.get("guId", None)
        keyword = request.GET.get("keyword", None)  # 공원이름, 동이름
        sort = request.GET.get("sort", None)  # 평점, 리뷰많은순, 가나다

        def key_filter():
            park = Park.objects.filter(
                Q(dong_address__contains=keyword) | Q(park_name__contains=keyword)
            )
            return park

        # TODO: count_reviews average_rating 순으로 정렬되는 부분 코드 다시 짜야함
        def sort_type(sort, park):
            if sort == "score_asc":
                park = park.order_by("average_rating")
            elif sort == "score_desc":
                park = park.order_by("-average_rating")
            elif sort == "review_more":
                park = park.order_by("count_reviews")
            elif sort == "review_less":
                park = park.order_by("-count_reviews")
            elif sort == "dict_asc":
                park = park.order_by("park_name")
            elif sort == "dict_desc":
                park = park.order_by("-park_name")
            return park

        if guId is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if keyword is not None:  # 검색어o
            park = key_filter()
        else:  # 검색어x
            park = Park.objects.filter(gu_address=guId)

        if not len(park):  # 공원이 없을때
            return Response(status=status.HTTP_204_NO_CONTENT)

        if sort is not None:  # 정렬o
            park = sort_type(sort, park)

        serializer = ParkSerializer(park, many=True)

        return Response(serializer.data)


class ParkDetail(APIView):
    """
    공원 상세 정보

    요청한 공원의 상세 정보를 반환
    """

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: ParkSerializer,
            status.HTTP_404_NOT_FOUND: "잘못된 요청",
        },
    )
    def get(self, request, pk, format=None):
        park = get_object_or_404(Park, pk=pk)
        serializer = ParkSerializer(park)
        return Response(serializer.data)
