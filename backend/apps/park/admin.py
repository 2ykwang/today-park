from django.contrib import admin

from .models import Equipment, Park, ParkEquipment, Review


@admin.register(Park)
class ParkAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "park_name",
        "gu_id",
        "full_address",
        "si_address",
        "gu_address",
        "dong_address",
        "latitude",
        "longitude",
    )

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "park_name",
                    "gu_id",
                    "park_image",
                )
            },
        ),
        (
            "Address",
            {
                "fields": (
                    "full_address",
                    "si_address",
                    "gu_address",
                    "dong_address",
                    "latitude",
                    "longitude",
                )
            },
        ),
    )
    list_filter = ("dong_address",)


@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ("id", "equipment_name", "equipment_type")

    list_filter = ("equipment_type",)


@admin.register(ParkEquipment)
class ParkEquipmentAdmin(admin.ModelAdmin):
    list_display = ("id", "park_id", "equipment_id", "quantity")

    list_filter = ("park_id", "equipment_id")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "id",
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
