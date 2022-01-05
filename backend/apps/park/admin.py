from django.contrib import admin

from .models import Equipment, Park, ParkEquipment


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


class EquipmentAdmin(admin.ModelAdmin):
    list_display = ("id", "equipment_name", "equipment_type")

    list_filter = ("equipment_type",)


class ParkEquipmentAdmin(admin.ModelAdmin):
    list_display = ("id", "park_id", "equipment_id", "quantity")

    list_filter = ("park_id", "equipment_id")


# Register your models here.
admin.site.register(Park, ParkAdmin)
admin.site.register(Equipment, EquipmentAdmin)
admin.site.register(ParkEquipment, ParkEquipmentAdmin)
