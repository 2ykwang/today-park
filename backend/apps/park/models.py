import datetime

from apps.core.models import DeletableModel, TimeStampModel
from apps.user.models import User
from django.db import models
from django.db.models import Avg, Sum
from django.db.models.deletion import CASCADE, DO_NOTHING, SET_DEFAULT
from django.db.models.fields.related import ForeignKey


# Create your models here.
class Park(models.Model):
    @property
    def average_rating(self):
        avg_score = self.review_park.aggregate(Avg("score"))["score__avg"]
        return avg_score if avg_score else 0

    @property
    def count_reviews(self):
        return self.review_park.count()

    park_name = models.CharField(max_length=50, unique=True, verbose_name="공원이름")
    gu_id = models.IntegerField(verbose_name="구ID")
    full_address = models.TextField(verbose_name="주소")
    si_address = models.CharField(max_length=50, verbose_name="시")
    gu_address = models.CharField(max_length=50, verbose_name="구")
    dong_address = models.CharField(max_length=50, verbose_name="동")
    latitude = models.CharField(max_length=50, verbose_name="위도(lat)")
    longitude = models.CharField(
        max_length=50,
        verbose_name="경도(long)",
    )
    park_image = models.ImageField(blank=True, verbose_name="공원사진")

    class Meta:
        ordering = ["park_name"]

    def __str__(self):
        return self.park_name


class Equipment(models.Model):
    equipment_name = models.CharField(
        max_length=50, unique=True, verbose_name="운동기구 이름"
    )
    equipment_type = models.CharField(max_length=50, verbose_name="운동기구 유형")

    def __str__(self):
        return self.equipment_name


class ParkEquipment(models.Model):
    park_id = models.ForeignKey(
        Park,
        on_delete=models.CASCADE,
        related_name="park_equipments",
        db_column="park_id",
        verbose_name="공원 ID",
    )
    equipment_id = models.ForeignKey(
        Equipment,
        on_delete=models.CASCADE,
        related_name="park",
        db_column="equipment_parks",
        verbose_name="운동시설 ID",
    )
    quantity = models.IntegerField(default=0, verbose_name="수량")

    class Meta:
        ordering = ["park_id"]


class Review(TimeStampModel, DeletableModel):
    user_id = ForeignKey(
        User,
        on_delete=DO_NOTHING,
        related_name="review_user",
        db_column="user_id",
        verbose_name="유저 ID",
    )
    park_id = ForeignKey(
        Park,
        on_delete=CASCADE,
        related_name="review_park",
        db_column="park_id",
        verbose_name="공원 ID",
    )
    content = models.CharField(max_length=255, verbose_name="내용")
    score = models.IntegerField(verbose_name="평점")

    def __str__(self):
        return str(self.id)
