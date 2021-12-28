from django.contrib import admin

from .models import Park


class ParkAdmin(admin.ModelAdmin):
    list_display = (
        "park_name",
        "gu_id",
        "full_address",
        "dong_address",
        "latitude",
        "longitude",
    )
    fields = [
        "park_name",
        "gu_id",
        "full_address",
        "dong_address",
        (
            "latitude",
            "longitude",
        ),
    ]
    list_filter = ("dong_address",)


# Register your models here.
admin.site.register(Park, ParkAdmin)
