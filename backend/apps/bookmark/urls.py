from apps.park import views
from django.urls import path

from . import views

# EndPoints
"""
    GET /api/bookmarks
    POST /api/bookmark
    DELETE /api/bookmark/<int:bookmark_id>
"""

urlpatterns = [
    path("bookmarks/", views.BookmarkListView.as_view()),
    path("bookmark/", views.BookmarkView.as_view()),
    path("bookmark/<int:bookmark_id>", views.BookmarkView.as_view()),
]
