from apps.park.models import Park
from apps.user.models import User
from rest_framework import serializers

from .models import Review


class ParkReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "score",
            "content",
            "user_id",
            "park_id",
            "created_at",
            "modified_at",
            "is_deleted",
        ]


class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "score",
            "content",
            "user_id",
            "park_id",
            "created_at",
            "modified_at",
            "is_deleted",
        ]
