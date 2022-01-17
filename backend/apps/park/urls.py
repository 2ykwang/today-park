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

app_name = "park"
urlpatterns = [
    path("/search", name="search", view=views.ParkListView.as_view()),
    path("/detail/<int:park_id>", name="detail", view=views.ParkDetailView.as_view()),
    path(
        "/<int:park_id>/reviews",
        name="reviews",
        view=views.ParkReviewListView.as_view(),
    ),
    path(
        "/<int:park_id>/nearby",
        name="nearby-parks",
        view=views.ParkNearbyListView.as_view(),
    ),
    path(
        "/<int:park_id>/reviews/<int:review_id>",
        name="reviews-detail",
        view=views.ParkReviewView.as_view(),
    ),
    path("/user-reviews", name="user-reviews", view=views.UserReviewListView.as_view()),
]
