from django.shortcuts import get_object_or_404, render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from .models import Review
from .serializers import ParkReviewSerializer, UserReviewSerializer


# 공원별 리뷰
class ParkReviewList(APIView):
    def get(self, request, format=None):
        park_id = request.GET.get("park_id", None)
        if request.GET.get("park_id") is not None:
            review = Review.objects.filter(park_id=park_id)

        serializer = ParkReviewSerializer(review, many=True)
        return Response(serializer.data)


# 유저별 리뷰
class UserReviewList(APIView):
    def get(self, request, format=None):
        review = Review.objects.filter(user_id=AccessToken["user_id"])
        serializer = UserReviewSerializer(review, many=True)
        return Response(serializer.data)
