from apps.core.permissions import IsOwner
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bookmark
from .serializers import BookmarkListSerializer, BookmarkSerializer


# 200, 201, 202 403,406
class BookmarkView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_user(self):
        return self.request.user

    def get(self, request, format=None):

        self.user = self.get_user()

        bookmark = Bookmark.objects.filter(user_id=self.user.id)

        serializer = BookmarkListSerializer(bookmark, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request, format=None):
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

        return Response(serializer.data, status.HTTP_201_CREATED)


class BookmarDeletekView(APIView):
    permission_classes = [IsOwner]

    def get_user(self):
        return self.request.user

    def get_object(self, bookmark_pk):
        bookmark = get_object_or_404(Bookmark, pk=bookmark_pk)
        self.check_object_permissions(self.request, bookmark)
        return bookmark

    def delete(self, request, bookmark_id):
        self.user = self.get_user()

        bookmark = self.get_object(bookmark_id)

        bookmark.delete()
        return Response({"detail": "삭제 되었습니다."}, status.HTTP_202_ACCEPTED)
