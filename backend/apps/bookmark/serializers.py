from apps.park.models import Park
from apps.park.serializers import ParkSerializer
from rest_framework import serializers

from .models import Bookmark


class BookmarkListSerializer(serializers.ModelSerializer):
    """
    북마크 조회
    """

    park = serializers.SerializerMethodField()

    class Meta:
        model = Bookmark
        # User ID 를 굳이 내보낼 필요 없을 거 같음
        fields = [
            "id",
            "user_id",
            "park",
            "created_at",
        ]
        read_only_fields = ("created_at",)

    # TODO: park를 nested 로 처리할지 or park id만 뿌려줄지
    def get_park(self, instance):
        return ParkSerializer(instance.park_id).data


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
        read_only_fields = ("created_at",)

    def create(self, validated_data):

        request = self.context.get("request")

        bookmark = Bookmark()
        bookmark.park_id = validated_data["park_id"]
        bookmark.user_id = request.user

        bookmark.save()

        return bookmark
