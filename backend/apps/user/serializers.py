from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from typing_extensions import Required

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=True, style={"input_type": "password"}, label="비밀번호", write_only=True
    )

    def create(self, validated_data):
        password = validated_data["password"]

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = [
            "username",
            "email",
            "password",
        ]


class UserResetPasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(
        style={"input_type": "password"}, label="기존 비밀번호"
    )

    password = serializers.CharField(style={"input_type": "password"}, label="새로운 비밀번호")

    re_password = serializers.CharField(
        style={"input_type": "password"}, label="비밀번호 확인"
    )

    def validate(self, data):

        # 바꾸려는 패스워드가 기존 패스워드와 동일할 경우
        if data["old_password"] == data["password"]:
            raise serializers.ValidationError("기존 패스워드와 동일합니다.")

        # 패스워드가 일치하지 않을 경우
        if data["password"] != data["re_password"]:
            raise serializers.ValidationError("새로운 패스워드가 일치하지 않습니다.")

        # password 형식 체크
        validate_password(data["password"])
        return data
