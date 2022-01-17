from django.urls import path

from .views import BookmarDeletekView, BookmarkView

# EndPoints
"""
    GET, POST /api/bookmarks
    DELETE /api/bookmarks/<int:bookmark_id>
"""

# reverse("<app_name>:<name>") 으로 접근 가능
app_name = "bookmark"
urlpatterns = [
    path("", name="list", view=BookmarkView.as_view()),
    path("/<int:bookmark_id>", name="detail", view=BookmarDeletekView.as_view()),
]
