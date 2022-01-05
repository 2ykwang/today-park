from django.db import models
from django.utils import timezone


class TimeStampModel(models.Model):
    """
    생성, 수정 날짜 필드를 포함하는 추상 모델
    """

    created_at = models.DateTimeField(
        verbose_name="생성된 날짜", db_index=True, default=timezone.now
    )
    updated_at = models.DateTimeField(verbose_name="수정된 날짜", auto_now=True)

    class Meta:
        abstract = True


class DeletableModel(models.Model):
    """
    삭제 여부 필드(boolean)를 포함하는 추상 모델
    """

    is_deleted = models.BooleanField(verbose_name="삭제 여부", default=False)
    deleted_at = models.DateTimeField(verbose_name="삭제된 날짜", null=True)

    class Meta:
        abstract = True
