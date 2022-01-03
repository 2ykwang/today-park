from django.urls import path

from .views import BookmarkListView, BookmarkView

# EndPoints
"""
    GET /api/bookmarks
    POST /api/bookmark
    DELETE /api/bookmark/<int:bookmark_id>
"""

urlpatterns = [
    path("bookmarks/", BookmarkListView.as_view()),
    path("bookmark/", BookmarkView.as_view()),
    path("bookmark/<int:bookmark_id>", BookmarkView.as_view()),
]
