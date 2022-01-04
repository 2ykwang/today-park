from django.db.models import Sum, fields
from rest_framework import serializers

from .models import Equipment, Park, ParkEquipment, Review


class EquipmentSerializer(serializers.ModelSerializer):
    """
    공원 시설
    """

    class Meta:
        model = Equipment
        fields = ["equipment_name", "equipment_type"]


class ParkEquipmentSerializer(serializers.ModelSerializer):
    equipment_name = serializers.CharField(source="equipment_id.equipment_name")

    class Meta:
        model = ParkEquipment
        fields = ["equipment_name", "quantity"]


class ParkSerializer(serializers.ModelSerializer):
    """
    공원 정보
    """

    total_equipments = serializers.SerializerMethodField()
    equipments = ParkEquipmentSerializer(source="park_equipments", many=True)
    avg_score = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()

    def get_total_equipments(self, obj):
        # 참고: https://docs.djangoproject.com/en/4.0/ref/models/database-functions/#coalesce
        sum_of_quantity = ParkEquipment.objects.filter(park_id=obj.id).aggregate(
            Sum("quantity", default=0)
        )["quantity__sum"]
        return sum_of_quantity

    def get_avg_score(self, obj):
        return obj.average_rating

    def get_total_reviews(self, obj):
        return obj.count_reviews

    class Meta:
        model = Park
        fields = [
            "id",
            "park_name",
            "gu_id",
            "full_address",
            "si_address",
            "gu_address",
            "dong_address",
            "latitude",
            "longitude",
            "park_image",
            "total_equipments",
            "equipments",
            "total_reviews",
            "avg_score",
        ]


class ParkReviewSerializer(serializers.ModelSerializer):

    """
    공원 리뷰 조회, 생성, 수정
    """

    username = serializers.CharField(source="user_id.username", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "score",
            "content",
            "username",
        ]
        read_only_fields = ("id",)
        extra_kwargs = {
            # "user_id": {"write_only": True},
            # "park_id": {"write_only": True},
        }
