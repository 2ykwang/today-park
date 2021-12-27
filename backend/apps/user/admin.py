from django.contrib import admin

from .models import User


@admin.register(User)
class StudentAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "username",
    ]
