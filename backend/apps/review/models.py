import datetime

from apps.core.models import DeletableModel, TimeStampModel
from apps.park.models import Park
from apps.user.models import User
from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey


# Create your models here.
class Review(TimeStampModel, DeletableModel):
    user_id = ForeignKey(
        User,
        on_delete=CASCADE,
        related_name="review_user",
        db_column="user_id",
        verbose_name="유저ID",
    )
    park_id = ForeignKey(
        Park,
        on_delete=CASCADE,
        related_name="review_park",
        db_column="park_id",
        verbose_name="공원ID",
    )
    content = models.CharField(max_length=255, verbose_name="내용")
    score = models.IntegerField(verbose_name="평점")

    def __str__(self):
        return str(self.id)
