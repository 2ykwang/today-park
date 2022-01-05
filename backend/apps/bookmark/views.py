from apps.core.permissions import IsOwner
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bookmark
from .serializers import (
    BookmarkListSerializer,
    BookmarkResponseSerializer,
    BookmarkSerializer,
)


# 200, 201, 202 403,406
class BookmarkView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_user(self):
        return self.request.user

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: BookmarkListSerializer,
            status.HTTP_401_UNAUTHORIZED: "만료되거나 유효하지 않은 토큰",
        }
    )
    def get(self, request, format=None):
        """
        북마크 목록

        사용자가 북마크한 공원의 목록을 반환합니다.
        """
        self.user = self.get_user()

        bookmark = Bookmark.objects.filter(user_id=self.user.id)

        serializer = BookmarkListSerializer(bookmark, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=BookmarkSerializer,
        responses={
            status.HTTP_200_OK: BookmarkResponseSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
            status.HTTP_401_UNAUTHORIZED: "만료되거나 유효하지 않은 토큰",
            status.HTTP_406_NOT_ACCEPTABLE: "이미 추가된 공원",
        },
    )
    def post(self, request, format=None):
        """
        북마크 추가

        북마크 목록에 공원을 추가합니다.
        """
        self.user = self.get_user()

        serializer = BookmarkSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        # 이미 북마크 되어있는지 check
        if Bookmark.objects.filter(
            user_id=self.user.id, park_id=serializer.validated_data["park_id"]
        ).exists():
            return Response(
                {"detail": "이미 북마크 되어있습니다."}, status.HTTP_406_NOT_ACCEPTABLE
            )

        serializer.save()
        bookmark = serializer.instance

        return Response(
            BookmarkResponseSerializer(bookmark).data,
            status.HTTP_201_CREATED,
        )


class BookmarDeletekView(APIView):
    permission_classes = [IsOwner]

    def get_user(self):
        return self.request.user

    def get_object(self, bookmark_pk):
        bookmark = get_object_or_404(Bookmark, pk=bookmark_pk)
        self.check_object_permissions(self.request, bookmark)
        return bookmark

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: "북마크 삭제 완료",
            status.HTTP_404_NOT_FOUND: "존재하지 않는 북마크 ID",
            status.HTTP_401_UNAUTHORIZED: "만료되거나 유효하지 않은 토큰",
        },
    )
    def delete(self, request, bookmark_id):
        """
        북마크 삭제

        북마크를 제거합니다.
        """
        self.user = self.get_user()

        bookmark = self.get_object(bookmark_id)

        bookmark.delete()
        return Response({"detail": "삭제 되었습니다."}, status.HTTP_200_OK)
