import os

"""
설정 값 
이 곳에
"""
CUSTOM_DATABASE_URI = ""


"""
Settings
"""
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DEFAULT_DABASE_URI = f"sqlite:///{os.path.join(BASE_DIR,'output.sqlite3')}"
DATABASE_URI = CUSTOM_DATABASE_URI or DEFAULT_DABASE_URI
