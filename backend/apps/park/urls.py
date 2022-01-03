from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path("search/", views.ParkList.as_view()),
    path("detail/<int:pk>/", views.ParkDetail.as_view()),
    # TODO: get, post
    path("<int:park_id>/reviews/", views.ParkReviewList.as_view()),
    # TODO: 단일 review 접근 api 만들어야함(get, put, delete)
    # path(
    #     "<int:park_id>/reviews/<int:review_id>",
    # ),
]
