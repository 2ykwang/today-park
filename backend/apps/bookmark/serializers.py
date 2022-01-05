from apps.park.models import Park
from apps.park.serializers import ParkSerializer
from drf_yasg.utils import swagger_serializer_method
from rest_framework import serializers

from .models import Bookmark


class BookmarkListSerializer(serializers.ModelSerializer):
    """
    북마크 목록 조회
    """

    parks = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=ParkSerializer(many=True))
    def get_parks(self, instance):
        return ParkSerializer(instance.park_id).data

    class Meta:
        model = Bookmark
        fields = [
            "id",
            "parks",
            "created_at",
        ]
        read_only_fields = ("created_at",)


class BookmarkResponseSerializer(serializers.ModelSerializer):
    """
    단일 북마크 조회
    """

    park = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=ParkSerializer)
    def get_park(self, instance):
        return ParkSerializer(instance.park_id).data

    class Meta:
        model = Bookmark
        fields = [
            "id",
            "park",
            "created_at",
        ]
        read_only_fields = ("created_at",)


class BookmarkSerializer(serializers.ModelSerializer):
    """
    북마크 생성, 삭제
    """

    class Meta:
        model = Bookmark
        fields = [
            "id",
            "park_id",
            "created_at",
        ]
        extra_kwargs = {"park_id": {"write_only": True}}
        read_only_fields = ("created_at",)

    def create(self, validated_data):

        request = self.context.get("request")

        bookmark = Bookmark()
        bookmark.park_id = validated_data["park_id"]
        bookmark.user_id = request.user

        bookmark.save()

        return bookmark
