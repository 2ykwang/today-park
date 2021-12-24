import os
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    """
    id, username, first_name, last_name, email, is_staff, is_active, date_joined(created)
    """  # noqa

    def _get_uuid_path(instance, filename):
        uuid4 = uuid.uuid4()
        new_path = os.path.join("upload/", f"{uuid4}_{filename}")
        return new_path

    profile_image = models.ImageField(
        verbose_name="user image", upload_to=_get_uuid_path
    )

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.email
