import os
import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models

from .validators import NickNameValidator


class User(AbstractBaseUser, PermissionsMixin):
    """
    username, nickname, email, profile_image

    AbstractBaseUser
        fields:
            password, last_login, is_active
    PermissionsMixin
        fields:
            is_superuser, groups, user_permissions
    """  # noqa

    username_validator = UnicodeUsernameValidator()
    nickname_validator = NickNameValidator()

    username = models.CharField(
        verbose_name="User name",
        max_length=128,
        unique=True,
        validators=[username_validator],
    )

    # 닉네임 중복 가능한지..?
    nickname = models.CharField(
        verbose_name="user nickname",
        max_length=30,
        unique=True,
        validators=[nickname_validator],
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

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "nickname"]

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.email
