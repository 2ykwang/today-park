import os
import sys
import uuid
from io import BytesIO

from apps.core.models import BaseModel
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.utils.html import mark_safe
from PIL import Image

from .validators import UserNameValidator


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
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

    username = models.CharField(
        verbose_name="닉네임",
        max_length=30,
        unique=True,
        validators=[username_validator],
    )
    email = models.EmailField(verbose_name="이메일", max_length=128, unique=True)
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

        temp_image = Image.open(self.profile_image)

        outputIoStream = BytesIO()

        resized_image = temp_image.resize((500, 500))
        resized_image.save(outputIoStream, format="JPEG", quality=100)

        outputIoStream.seek(0)

        self.profile_image = InMemoryUploadedFile(
            outputIoStream,
            "ImageField",
            "%s.jpg" % self.profile_image.name.split(".")[0],
            "image/jpeg",
            sys.getsizeof(outputIoStream),
            None,
        )
        super().save(*args, **kwargs)

    # admin 페이지 프로필 사진 미리보기
    def _profile_image(self, size=50):
        return (
            mark_safe(
                f'<img src="{self.profile_image.url}" width="auto" height="{size}" />'
            )  # noqa
            if self.profile_image
            else ""
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
