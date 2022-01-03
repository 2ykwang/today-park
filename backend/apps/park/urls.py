from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path("search/", views.ParkList.as_view()),
    path("detail/<int:pk>/", views.ParkDetail.as_view()),
    path("<int:parkId>/reviews/", views.ParkReviewList.as_view()),
]
