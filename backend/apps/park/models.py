from django.db import models
from django.db.models import Avg, Sum


# Create your models here.
class Park(models.Model):
    @property
    def average_rating(self):
        cnt = self.review_park.count()
        if cnt == 0:
            return 0
        else:
            avg_score = self.review_park.aggregate(Avg("score"))["score__avg"]
            return avg_score

    park_name = models.CharField(max_length=50, unique=True, verbose_name="공원이름")
    gu_id = models.IntegerField(verbose_name="구ID")
    full_address = models.TextField(verbose_name="주소")
    si_address = models.CharField(max_length=50, verbose_name="시")
    gu_address = models.CharField(max_length=50, verbose_name="구")
    dong_address = models.CharField(max_length=50, verbose_name="동")
    latitude = models.DecimalField(
        max_digits=10,
        decimal_places=8,
        verbose_name="위도(lat)",
    )
    longitude = models.DecimalField(
        max_digits=11,
        decimal_places=8,
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
        related_name="park",
        db_column="park_id",
        verbose_name="공원ID",
    )
    equipment_id = models.ForeignKey(
        Equipment,
        on_delete=models.CASCADE,
        related_name="equipment",
        db_column="equipment_id",
        verbose_name="운동시설ID",
    )
    quantity = models.IntegerField(default=0, verbose_name="수량")

    class Meta:
        ordering = ["park_id"]
