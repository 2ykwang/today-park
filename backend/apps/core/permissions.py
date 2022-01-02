from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    특정 유저만 읽고 쓰기 가능함
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    # user 키값 - > user_id
    def has_object_permission(self, request, view, obj):
        return obj.user_id == request.user
