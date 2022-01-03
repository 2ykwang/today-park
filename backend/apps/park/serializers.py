from django.db.models import Sum
from rest_framework import serializers

from .models import Equipment, Park, ParkEquipment, Review


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["equipment_name", "equipment_type"]


# TODO: 코드 리팩토링 가능할지
class ParkSerializer(serializers.ModelSerializer):
    total_equipments = serializers.SerializerMethodField()
    equipments = serializers.SerializerMethodField()
    eq_list = EquipmentSerializer(many=True, read_only=True)
    avg_score = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()

    def get_total_equipments(self, obj):
        parkequipment = ParkEquipment.objects.filter(park_id=obj.id).aggregate(
            Sum("quantity")
        )
        if parkequipment["quantity__sum"] is None:
            return 0
        return parkequipment["quantity__sum"]

    def get_equipments(self, obj):
        parkequipment = ParkEquipment.objects.filter(park_id=obj.id)
        result = []
        for p in parkequipment:
            equipment = Equipment.objects.get(id=p.equipment_id.id)
            result.append(
                {"equipment_name": equipment.equipment_name, "quantity": p.quantity}
            )
        return result

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


class ParkReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "score",
            "content",
            "user_id",
            "park_id",
            "created_at",
            "modified_at",
            "is_deleted",
        ]


class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "score",
            "content",
            "user_id",
            "park_id",
            "created_at",
            "modified_at",
            "is_deleted",
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
