from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.views import exception_handler

# 프로젝트에서 사용되는 Exception 클래스 모음
# https://www.django-rest-framework.org/api-guide/exceptions/#apiexception


class DetailDictMixin:
    def __init__(self, detail=None, code=None):
        detail_dict = {"detail": self.default_detail, "code": self.default_code}

        if isinstance(detail, dict):
            detail_dict.update(detail)
        elif detail is not None:
            detail_dict["detail"] = detail

        if code is not None:
            detail_dict["code"] = code

        super().__init__(detail_dict)


# 아래 클래스를 상속받아 에러를 정의해주세요.
class BaseException(DetailDictMixin, APIException):
    pass


class UserAlreadyBookmarked(BaseException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "이미 북마크 되어있습니다."
    default_code = "already_bookmarked"


# errro handling
# https://www.django-rest-framework.org/api-guide/exceptions/#custom-exception-handling
def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        response.data["status_code"] = response.status_code
    print(response)
    return response
