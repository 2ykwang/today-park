from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    로그인한 유저는 읽기 가능함
    객체를 생성한 특정 유저만 수정, 삭제 가능함
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        # 요청한 유저가 객체 user_id 값과 동일한지 체크
        # APIView 에서 check_object_permissions 명시적으로 호출해야함
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user_id == request.user
