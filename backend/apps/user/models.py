import os
import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models

from .validators import UserNameValidator


class User(AbstractBaseUser, PermissionsMixin):
    """
    username, email, profile_image

    AbstractBaseUser
        fields:
            password, last_login, is_active
    PermissionsMixin
        fields:
            is_superuser, groups, user_permissions
    """  # noqa

    username_validator = UserNameValidator()

    # 닉네임 중복 가능한지..?
    username = models.CharField(
        verbose_name="user username",
        max_length=30,
        unique=True,
        validators=[username_validator],
    )
    email = models.EmailField(verbose_name="User Email", max_length=128, unique=True)
    is_staff = models.BooleanField(verbose_name="is staff", default=False)

    def _get_uuid_path(instance, filename):
        uuid4 = uuid.uuid4()
        new_path = os.path.join("upload/", f"{uuid4}_{filename}")
        return new_path

    profile_image = models.ImageField(
        verbose_name="user image", upload_to=_get_uuid_path, blank=True
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.email
