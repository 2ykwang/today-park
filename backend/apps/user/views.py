from drf_yasg.utils import swagger_auto_schema
from rest_framework import authentication, generics, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserResetPasswordSerializer, UserSerializer


# TODO: APIVIEW
class UserRegisterView(generics.CreateAPIView):
    """
    사용자를 생성합니다.
    """

    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]  # noqa
    serializer_class = UserSerializer


class UserResetPasswordView(APIView):
    """
    사용자의 패스워드를 변경 합니다.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserResetPasswordSerializer

    def get_object(self, queryset=None):
        return self.request.user

    @swagger_auto_schema(request_body=UserResetPasswordSerializer)
    def put(self, request, *args, **kwargs):

        self.user = self.get_object()

        serializer = self.serializer_class(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        old_password = serializer.data.get("old_password")
        if not self.user.check_password(old_password):
            print(old_password)
            return Response(
                {"old_password": ["잘못된 패스워드 입니다."]}, status=status.HTTP_400_BAD_REQUEST
            )

        self.user.set_password(serializer.data.get("password"))
        self.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
