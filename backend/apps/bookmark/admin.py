from django.contrib import admin

from .models import Bookmark

# Register your models here.


@admin.register(Bookmark)
class ParkAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user_id",
        "park_id",
        "created_at",
        "updated_at",
    )
    list_filter = ("user_id", "park_id", "created_at", "updated_at")
