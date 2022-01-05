from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, parsers, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .models import User
from .serializers import (
    TokenBlacklistResponseSerializer,
    TokenObtainPairResponseSerializer,
    TokenRefreshResponseSerializer,
    TokenVerifyResponseSerializer,
    UserCheckAvailableSerializer,
    UserImageUploadSerializer,
    UserRegisterSerializer,
    UserResetPasswordSerializer,
    UserSerializer,
)


# TODO: APIVIEW
class UserRegisterView(generics.CreateAPIView):
    """
    유저 생성

    입력받은 데이터를 통해 유저를 생성합니다.
    """

    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer


class UserImageUploadView(generics.CreateAPIView):

    """
    유저 프로필 이미지 업로드

    유저 프로필 이미지를 업로드한 뒤 요청이 유효할 경우 이미지 주소를 반환 합니다.
    """

    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserImageUploadSerializer
    parser_classes = (
        parsers.MultiPartParser,
        parsers.FormParser,
    )

    def get_object(self, queryset=None):
        return self.request.user

    @swagger_auto_schema(
        request_body=UserImageUploadSerializer,
        responses={
            status.HTTP_201_CREATED: UserImageUploadSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
            status.HTTP_401_UNAUTHORIZED: "인증 필요",
        },
    )
    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self, queryset=None):
        return self.request.user

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: UserSerializer,
            status.HTTP_401_UNAUTHORIZED: "인증 필요",
        }
    )
    def get(self, request, *args, **kwargs):
        """
        유저 정보 조회

        유저 정보를 반환 합니다.
        """
        self.user = self.get_object()
        serializer = self.serializer_class(self.user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={
            status.HTTP_204_NO_CONTENT: "유저 정보 수정 요청이 정상적으로 처리됨",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
            status.HTTP_401_UNAUTHORIZED: "인증 필요",
        },
    )
    def put(self, request, *args, **kwargs):
        """
        유저 정보 수정

        유저 정보를 수정 합니다.
        """
        self.user = self.get_object()

        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        self.user.username = serializer.validated_data.get(
            "username", self.user.username
        )
        # 이메일 수정 X
        # self.user.email = serializer.validated_data.get("email", self.user.email)
        self.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserResetPasswordView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserResetPasswordSerializer

    def get_object(self, queryset=None):
        return self.request.user

    @swagger_auto_schema(
        request_body=UserResetPasswordSerializer,
        responses={
            status.HTTP_204_NO_CONTENT: "비밀번호 수정 요청이 정상적으로 처리됨",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
            status.HTTP_401_UNAUTHORIZED: "인증 필요",
        },
    )
    def put(self, request, *args, **kwargs):
        """
        유저 패스워드 변경

        유저 패스워드를 변경 합니다.
        """
        self.user = self.get_object()

        serializer = self.serializer_class(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        old_password = serializer.data.get("old_password")
        if not self.user.check_password(old_password):
            return Response(
                {"old_password": ["잘못된 패스워드 입니다."]}, status=status.HTTP_400_BAD_REQUEST
            )

        self.user.set_password(serializer.data.get("password"))
        self.user.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserCheckAvailableView(APIView):
    permission_classes = [permissions.AllowAny]

    valid_schema = {
        "valid": openapi.Schema(type=openapi.TYPE_BOOLEAN, description="올바른 값인지"),
        "detail": openapi.Schema(type=openapi.TYPE_STRING, description="필드 응답 메세지"),
    }

    @swagger_auto_schema(
        request_body=UserCheckAvailableSerializer,
        responses={
            status.HTTP_200_OK: openapi.Schema(
                title="검사 결과",
                type=openapi.TYPE_OBJECT,
                properties={
                    "username": openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=valid_schema,
                        description="username 유효성 검사",
                    ),
                    "email": openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=valid_schema,
                        description="email 유효성 검사",
                    ),
                },
            ),
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def post(self, request, *args, **kwargs):
        """
        가입 필드 유효성 검사

        아이디, 닉네임이 가입가능한 값인지 유효성을 체크합니다.
        """
        serializer = UserCheckAvailableSerializer(data=request.data)
        serializer.is_valid(raise_exception=False)

        response = {}

        errors = serializer.errors
        # 입력받은 필드를 가져온다
        for key in request.data.keys():
            response[key] = {"valid": True, "detail": "사용가능한 값 입니다."}
            # validation check 에러가 발생한 필드일경우
            if key in errors and errors[key]:
                response[key] = {"valid": False, "detail": errors[key][0]}

        return Response(response, status=status.HTTP_200_OK)


# simplejwt drf-yasg integration


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
            status.HTTP_401_UNAUTHORIZED: "만료되거나 유효하지 않은 토큰",
        }
    )
    def post(self, request, *args, **kwargs):
        """
        로그인

        이메일과 비밀번호를 전송하고 refresh, access 토큰값을 요청합니다.
        """
        return super().post(request, *args, **kwargs)


class DecoratedTokenBlacklistView(TokenBlacklistView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenBlacklistResponseSerializer,
            status.HTTP_401_UNAUTHORIZED: "만료되거나 유효하지 않은 토큰",
        }
    )
    def post(self, request, *args, **kwargs):
        """
        로그아웃

        refresh 토큰을 전송하고 token 을 블랙리스트에 추가합니다 (토큰 만료)
        """
        return super().post(request, *args, **kwargs)


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
            status.HTTP_401_UNAUTHORIZED: "만료되거나 유효하지 않은 토큰",
        }
    )
    def post(self, request, *args, **kwargs):
        """
        토큰 갱신

        refresh 토큰을 전송하고 새로운 access 토큰값을 발급받습니다.
        """
        return super().post(request, *args, **kwargs)


class DecoratedTokenVerifyView(TokenVerifyView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenVerifyResponseSerializer,
            status.HTTP_401_UNAUTHORIZED: "만료되거나 유효하지 않은 토큰",
        }
    )
    def post(self, request, *args, **kwargs):
        """
        토큰 유효성 검사

        access 토큰을 전송하여 토큰이 유효한지 체크합니다.
        """
        return super().post(request, *args, **kwargs)
