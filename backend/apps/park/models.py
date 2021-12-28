from django.db import models


# Create your models here.
class Park(models.Model):
    park_name = models.CharField(
        max_length=50,
    )
    gu_id = models.IntegerField()
    full_address = models.TextField()
    dong_address = models.CharField(max_length=50)
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
    park_image = models.ImageField(blank=True)

    class Meta:
        ordering = ["park_name"]

    def __str__(self):
        return self.park_name
