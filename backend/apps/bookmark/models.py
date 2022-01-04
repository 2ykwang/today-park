from apps.core.models import TimeStampModel
from apps.park.models import Park
from apps.user.models import User
from django.db import models


class Bookmark(TimeStampModel):
    user_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookmark_user",
        db_column="user_id",
        verbose_name="유저 ID",
    )
    park_id = models.ForeignKey(
        Park,
        on_delete=models.CASCADE,
        related_name="bookmark_park",
        db_column="park_id",
        verbose_name="공원 ID",
    )

    class Meta:
        pass

    def __str__(self):
        return f"{self.user_id.username} -> {self.park_id.park_name}"
