import datetime

from apps.park.models import Park
from apps.user.models import User
from django.db import models
from django.db.models.deletion import CASCADE, DO_NOTHING, SET_DEFAULT
from django.db.models.fields.related import ForeignKey


# Create your models here.
class Review(models.Model):
    user_id = ForeignKey(
        User,
        on_delete=DO_NOTHING,
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
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="최초작성날짜")
    modified_at = models.DateTimeField(auto_now=True, verbose_name="최근수정날짜")
    is_deleted = models.BooleanField(default=False, verbose_name="삭제여부")

    def __str__(self):
        return str(self.id)
