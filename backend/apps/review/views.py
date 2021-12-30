from django.shortcuts import get_object_or_404, render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Review
from .serializers import ReviewSerializer


# Create your views here.
class ReviewList(APIView):
    def get(self, request, format=None):
        review = Review.objects.all()
        serializer = ReviewSerializer(review, many=True)
        return Response(serializer.data)
