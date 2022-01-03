from django.urls import include, path

from . import views

urlpatterns = [
    path("<int:id>/", views.ParkReviewList.as_view()),
]
