from apps.review.models import Review
from django.contrib import admin


# Register your models here.
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "user_id",
        "park_id",
        "content",
        "score",
        "created_at",
        "updated_at",
        "is_deleted",
    )
    list_filter = (
        "user_id",
        "park_id",
        "score",
        "created_at",
        "updated_at",
        "is_deleted",
    )


admin.site.register(Review, ReviewAdmin)
