from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    유저 추가
    """

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


class UserSerializer(serializers.ModelSerializer):
    """
    유저 정보 조회, 수정
    """

    class Meta:
        model = get_user_model()
        fields = [
            "username",
            "email",
            "profile_image",
        ]
        # NOTE: 일단은 username만 수정 가능하게끔
        read_only_fields = ("profile_image",)
        # 부분적으로 수정이 가능
        extra_kwargs = {
            "username": {
                "required": False,
            },
            "email": {
                "required": False,
            },
        }


class UserImageUploadSerializer(serializers.ModelSerializer):
    """
    유저 프로필 이미지 업로드
    """

    class Meta:
        model = get_user_model()
        fields = ["username", "profile_image"]
        read_only_fields = ("username",)


class UserResetPasswordSerializer(serializers.Serializer):
    """
    유저 비밀번호 변경
    """

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


# simplejwt drf-yasg integration


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenVerifyResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenBlacklistResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()
