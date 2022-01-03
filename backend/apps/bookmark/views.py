from apps.core.permissions import IsOwner
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bookmark
from .serializers import BookmarkListSerializer, BookmarkSerializer


class BookmarkListView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookmarkListSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def get(self, request, format=None):

        self.user = self.get_object()

        bookmark = Bookmark.objects.filter(user_id=self.user.id)

        serializer = self.serializer_class(bookmark, many=True)

        return Response(serializer.data)


class BookmarkView(APIView):
    permission_classes = [IsOwner]
    serializer_class = BookmarkSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def post(self, request, format=None):
        self.user = self.get_object()

        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        # 이미 북마크 되어있는지 check
        if Bookmark.objects.filter(
            user_id=self.user.id, park_id=serializer.validated_data["park_id"]
        ).exists():
            return Response(
                {"message": "이미 북마크 되어있습니다."}, status.HTTP_406_NOT_ACCEPTABLE
            )

        serializer.save()

        return Response(serializer.data, status.HTTP_201_CREATED)

    def delete(self, request, bookmark_id):
        self.user = self.get_object()

        bookmark = Bookmark.objects.filter(user_id=self.user.id, id=bookmark_id).first()

        #  북마크 되어있는지 check
        if bookmark is None:
            return Response(
                {"message": "북마크 되어있지 않습니다."}, status.HTTP_406_NOT_ACCEPTABLE
            )

        bookmark.delete()
        return Response({"message": "삭제 되었습니다."}, status=status.HTTP_202_ACCEPTED)
