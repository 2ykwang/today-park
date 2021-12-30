from django.db import models


# Create your models here.
class Park(models.Model):
    park_name = models.CharField(verbose_name="공원이름", max_length=50, unique=True)
    gu_id = models.IntegerField(verbose_name="구ID")
    full_address = models.TextField(verbose_name="주소")
    si_address = models.CharField(verbose_name="시", max_length=50)
    gu_address = models.CharField(verbose_name="구", max_length=50)
    dong_address = models.CharField(verbose_name="동", max_length=50)
    latitude = models.DecimalField(
        verbose_name="위도(lat)",
        max_digits=10,
        decimal_places=8,
    )
    longitude = models.DecimalField(
        verbose_name="경도(long)",
        max_digits=11,
        decimal_places=8,
    )
    park_image = models.ImageField(verbose_name="공원사진", blank=True)

    class Meta:
        ordering = ["park_name"]

    def __str__(self):
        return self.park_name


class Equipment(models.Model):
    equipment_name = models.CharField(
        verbose_name="운동기구 이름", max_length=50, unique=True
    )
    equipment_type = models.CharField(verbose_name="운동기구 유형", max_length=50)

    def __str__(self):
        return self.equipment_name


class ParkEquipment(models.Model):
    park_id = models.ForeignKey(
        Park,
        on_delete=models.CASCADE,
        related_name="park",
        db_column="park_id",
    )
    equipment_id = models.ForeignKey(
        Equipment,
        on_delete=models.CASCADE,
        related_name="equipment",
        db_column="equipment_id",
    )
    quantity = models.IntegerField(default=0)

    class Meta:
        ordering = ["park_id"]
