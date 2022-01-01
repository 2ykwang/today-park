from django.urls import include, path

from . import views

urlpatterns = [
    path("list/<int:pk>", views.ParkReviewList.as_view()),
]
