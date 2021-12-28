import re

from django.core import validators
from django.utils.translation import gettext_lazy as _


class UserNameValidator(validators.RegexValidator):
    # 한글,영문,숫자 조합만 가능
    regex = r"^[가-힣\w]+\Z"

    message = _("올바른 닉네임을 입력해주세요. " "(한글 영문 숫자 조합)")
    flags = 0
