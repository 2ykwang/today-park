from django.urls import include, path

from . import views

urlpatterns = [
    path("list/", views.ReviewList.as_view()),
]
