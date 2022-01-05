from django.db.models import Sum, fields
from rest_framework import serializers

from .models import Equipment, Park, ParkEquipment


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["equipment_name", "equipment_type"]


class ParkEquipmentSerializer(serializers.ModelSerializer):
    equipment_name = serializers.CharField(source="equipment_id.equipment_name")

    class Meta:
        model = ParkEquipment
        fields = ["equipment_name", "quantity"]


# TODO: 코드 리팩토링 가능할지
class ParkSerializer(serializers.ModelSerializer):
    total_equipments = serializers.SerializerMethodField()
    equipments = serializers.SerializerMethodField()
    eq_list = EquipmentSerializer(many=True, read_only=True)
    avg_score = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()

    def get_total_equipments(self, obj):
        # 참고: https://docs.djangoproject.com/en/4.0/ref/models/database-functions/#coalesce
        sum_of_quantity = ParkEquipment.objects.filter(park_id=obj.id).aggregate(
            Sum("quantity", default=0)
        )["quantity__sum"]
        return sum_of_quantity

    def get_equipments(self, obj):
        # 참고: https://gaussian37.github.io/python-rest-nested-serializer/
        park_equipment = ParkEquipment.objects.filter(park_id=obj.id)
        return ParkEquipmentSerializer(park_equipment, many=True).data

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
            "eq_list",
            "total_reviews",
            "avg_score",
        ]


class ParkRequestSerializer(serializers.Serializer):
    guId = serializers.CharField(help_text="구 이름(required)")
    keyword = serializers.CharField(help_text="검색어(optional)")
    sort = serializers.ChoiceField(
        help_text="정렬방식(optional)",
        choices=(
            "score_asc",
            "score_desc",
            "review_more",
            "review_less",
            "dict_asc",
            "dict_desc",
        ),
    )
