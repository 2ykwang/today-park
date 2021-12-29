from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path("list/", views.ParkList.as_view()),
    path("detail/<int:pk>/", views.ParkDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
