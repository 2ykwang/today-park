from django.urls import path

from . import views

# EndPoints
"""
    GET /api/parks/search
    GET /api/parks/detail/<int:park_id>
    GET, POST /api/parks/<int:park_id>/reviews
    GET /api/parks/<int:park_id>/nearby
    PUT, DELETE /api/parks/<int:park_id>/reviews/<int:review_id>
    GET /api/parks/user-reviews
"""

urlpatterns = [
    path("/search", views.ParkListView.as_view()),
    path("/detail/<int:park_id>", views.ParkDetailView.as_view()),
    path("/<int:park_id>/reviews", views.ParkReviewListView.as_view()),
    path("/<int:park_id>/nearby", views.ParkNearbyListView.as_view()),
    path("/<int:park_id>/reviews/<int:review_id>", views.ParkReviewView.as_view()),
    path("/user-reviews", views.UserReviewListView.as_view()),
]
