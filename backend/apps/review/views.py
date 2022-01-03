from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404, render
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from .models import Review
from .serializers import ParkReviewSerializer, UserReviewSerializer


# 공원별 리뷰
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
        permission_classes = [permissions.IsAuthenticated]

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
