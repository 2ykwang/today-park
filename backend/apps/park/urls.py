from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

# EndPoints
"""
    GET /api/parks/search
    GET /api/parks/detail/<int:park_id>
    GET, POST /api/parks/<int:park_id>/reviews
    PUT, DELETE /api/parks/<int:park_id>/reviews/<int:review_id>
"""

urlpatterns = [
    path("search/", views.ParkListView.as_view()),
    path("detail/<int:park_id>", views.ParkDetailView.as_view()),
    path("<int:park_id>/reviews", views.ParkReviewListView.as_view()),
    path("<int:park_id>/reviews/<int:review_id>", views.ParkReviewView.as_view()),
    # TODO: 마이페이지 리뷰 리스트 엔드포인트 고민
    path("user-reviews/", views.UserReviewListView.as_view()),
]
