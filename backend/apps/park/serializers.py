from rest_framework import serializers

from .models import Park


class ParkSerializer(serializers.ModelSerializer):
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
        ]
