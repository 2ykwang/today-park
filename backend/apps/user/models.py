import os
import sys
import uuid
from io import BytesIO

from apps.core.models import TimeStampModel
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.core import validators
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.utils.html import mark_safe
from PIL import Image

from .validators import UserNameValidator


class User(TimeStampModel, AbstractBaseUser, PermissionsMixin):
    """
    username, email, profile_image

    AbstractBaseUser
        fields:
            password, last_login, is_active
    PermissionsMixin
        fields:
            is_superuser, groups, user_permissions
    """  # noqa

    username = models.CharField(
        verbose_name="닉네임",
        max_length=30,
        unique=True,
        error_messages={
            "unique": "이미 사용중인 닉네임 입니다.",
        },
        validators=[
            UserNameValidator(),
            validators.MinLengthValidator(2),
        ],
    )
    email = models.EmailField(
        verbose_name="이메일",
        validators=[validators.MinLengthValidator(8)],
        error_messages={
            "unique": "이미 사용중인 이메일 입니다.",
        },
        max_length=60,
        unique=True,
    )
    is_staff = models.BooleanField(verbose_name="is staff", default=False)

    def _get_uuid_path(instance, filename):
        uuid4 = uuid.uuid4()
        new_path = os.path.join("upload/", f"{uuid4}_{filename}")
        return new_path

    profile_image = models.ImageField(
        verbose_name="유저 프로필 이미지", upload_to=_get_uuid_path, blank=True
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)
        if self.profile_image:
            temp_image = Image.open(self.profile_image.path)

            temp_image = temp_image.convert("RGB").resize((500, 500))
            temp_image.save(self.profile_image.path, format="JPEG", quality=100)

    # admin 페이지 프로필 사진 미리보기
    def _profile_image(self, size=50):
        return mark_safe(
            f'<img src="{self.profile_image.url}" width="auto" height="{size}" />'
            if self.profile_image
            else f'<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" width="auto" height="{size}" />'  # noqa
        )

    def profile_image_tag(self):
        return self._profile_image()

    def profile_image_tag_large(self):
        return self._profile_image(100)

    profile_image_tag.short_description = "이미지"
    profile_image_tag_large.short_description = "이미지"

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.email


class UserKeyword(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    keyword = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user_id} {self.keyword}"
