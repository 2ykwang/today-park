import json

from django.db.models import Sum
from rest_framework import serializers

from .models import Equipment, Park, ParkEquipment


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["equipment_name", "equipment_type"]


class ParkSerializer(serializers.ModelSerializer):
    total_equipments = serializers.SerializerMethodField()
    equipments = serializers.SerializerMethodField()
    eq = EquipmentSerializer(many=True, read_only=True)

    def get_total_equipments(self, obj):
        parkequipment = ParkEquipment.objects.filter(park_id=obj.id).aggregate(
            Sum("quantity")
        )
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
            "eq",
        ]
