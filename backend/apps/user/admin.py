from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Edit
    fieldsets = (
        (_("Personal info"), {"fields": ("username", "email", "password")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "created_at", "updated_at")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "password1", "password2"),
            },
        ),
    )

    # 읽기 전용 필드
    readonly_fields = ("created_at", "updated_at")

    # List
    list_display = ("username", "email", "is_staff", "last_login")
    list_filter = ("is_staff", "is_superuser", "groups")
    search_fields = ("username", "username", "email")
    ordering = ("username",)
