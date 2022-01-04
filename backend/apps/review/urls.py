from django.urls import include, path

from . import views

urlpatterns = [
    path("list/", views.ParkReviewList.as_view()),
]
