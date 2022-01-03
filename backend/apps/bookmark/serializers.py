from apps.park.models import Park
from apps.park.serializers import ParkSerializer
from rest_framework import serializers

from .models import Bookmark


class BookmarkListSerializer(serializers.ModelSerializer):
    """
    북마크 조회
    """

    park = serializers.SerializerMethodField()

    def get_park(self, instance):
        return ParkSerializer(instance.park_id).data

    class Meta:
        model = Bookmark
        # User ID 를 굳이 내보낼 필요 없을 거 같음
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

    park = serializers.SerializerMethodField()

    def get_park(self, instance):
        return ParkSerializer(instance.park_id).data

    class Meta:
        model = Bookmark
        fields = [
            "id",
            "park_id",
            "park",
            "created_at",
        ]
        extra_kwargs = {"park_id": {"write_only": True}}
        # MEMO: meta read_only_fields 는 명시적으로 정의되어 있지 않는 fields 만 적용된다.
        read_only_fields = ("created_at", "park")

    def create(self, validated_data):

        request = self.context.get("request")

        bookmark = Bookmark()
        bookmark.park_id = validated_data["park_id"]
        bookmark.user_id = request.user

        bookmark.save()

        return bookmark
