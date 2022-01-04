from django.urls import path

from .views import BookmarDeletekView, BookmarkView

# EndPoints
"""
    GET, POST /api/bookmark
    DELETE /api/bookmark/<int:bookmark_id>
"""

urlpatterns = [
    path("", BookmarkView.as_view()),
    path("<int:bookmark_id>", BookmarDeletekView.as_view()),
]
