from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, UserKeyword


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Edit
    fieldsets = (
        (
            _("Personal info"),
            {
                "fields": (
                    "username",
                    "email",
                    "password",
                    "profile_image",
                    "profile_image_tag_large",
                )
            },
        ),
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
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                ),
            },
        ),
    )

    # 읽기 전용 필드
    readonly_fields = ("created_at", "updated_at", "profile_image_tag_large")

    # List
    list_display = ("profile_image_tag", "username", "email", "is_staff", "last_login")
    list_filter = ("is_staff", "is_superuser", "groups")
    search_fields = ("username", "username", "email")
    ordering = ("username",)


@admin.register(UserKeyword)
class UserKeywordAdmin(admin.ModelAdmin):
    list_display = (
        "user_id",
        "keyword",
    )
    list_filter = (
        "user_id",
        "keyword",
    )
