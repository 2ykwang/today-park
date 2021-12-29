from django.http import Http404
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from .models import Park
from .serializers import ParkSerializer


class ParkList(APIView):
    def get(self, request, format=None):
        park = Park.objects.all()
        serializer = ParkSerializer(park, many=True)
        return Response(serializer.data)


class ParkDetail(APIView):
    def get_object(self, pk):
        try:
            return Park.objects.get(pk=pk)
        except Park.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        park = self.get_object(pk)
        serializer = ParkSerializer(park)
        return Response(serializer.data)
