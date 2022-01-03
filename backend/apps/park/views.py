from django.db.models import Avg, Count, Q
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from .models import Equipment, Park, ParkEquipment, Review
from .serializers import (
    ParkRequestSerializer,
    ParkReviewSerializer,
    ParkSerializer,
    UserReviewSerializer,
)


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
                park = park.annotate(avg_rating=Avg("review_park__score")).order_by(
                    "avg_rating"
                )
            elif sort == "score_desc":
                park = park.annotate(avg_rating=Avg("review_park__score")).order_by(
                    "-avg_rating"
                )
            elif sort == "review_more":
                park = park.annotate(cnt_reviews=Count("review_park")).order_by(
                    "-cnt_reviews"
                )
            elif sort == "review_less":
                park = park.annotate(cnt_reviews=Count("review_park")).order_by(
                    "cnt_reviews"
                )
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


class ParkReviewList(APIView):
    def get(self, request, id, format=None):
        """
        공원별 리뷰 요청

        공원(id)에 대한 리뷰 요청
        """
        review = Review.objects.filter(park_id=id)
        serializer = ParkReviewSerializer(review, many=True)
        return Response(serializer.data)

    review_id = openapi.Parameter(
        "review_id", openapi.IN_QUERY, description="리뷰ID", type=openapi.TYPE_STRING
    )

    @swagger_auto_schema(
        manual_parameters=[review_id],
        responses={
            status.HTTP_200_OK: "성공",
            status.HTTP_204_NO_CONTENT: "리뷰가 존재하지 않음",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def post(self, request, id, format=None):
        """
        공원 리뷰 등록

        공원(id) 리뷰 등록
        """
        # permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, id, format=None):
        """
        공원 리뷰 삭제

        공원(id) 리뷰 삭제
        """
        review_id = request.GET.get("reviewId")
        print(review_id)
        review = Review.objects.get(id=review_id)
        if len(review) == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)

        review.is_deleted = True
        review.save()
        return Response(status=status.HTTP_200_OK)


# 유저별 리뷰
class UserReviewList(APIView):
    def get(self, request, format=None):
        review = Review.objects.filter(user_id=AccessToken["user_id"])
        serializer = UserReviewSerializer(review, many=True)
        return Response(serializer.data)
