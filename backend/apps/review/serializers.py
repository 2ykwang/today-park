from apps.park.models import Park
from apps.user.models import User
from rest_framework import serializers

from .models import Review


class ParkReviewSerializer(serializers.ModelSerializer):
    park_reviews = serializers.SerializerMethodField()

    def get_park_reviews():
        return

    class Meta:
        model = Review
        fields = "__all__"


class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
