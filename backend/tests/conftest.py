import os

from django.conf import settings


def pytest_configure():
    os.environ["USE_SQLITE3"] = "1"
    os.environ["DJANGO_SETTINGS_MODULE"] = "config.settings.test"

    try:
        import django

        django.setup()
    except AttributeError:
        pass
