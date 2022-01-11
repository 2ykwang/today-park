.. installation:

=======================
프로젝트 설치
=======================
 
-----------------------
백엔드 (Django)
-----------------------

의존성 설치
===================

의존성 관리는 `Poetry`_ 를 통해 관리됩니다. ``/backend`` 디렉터리에서 아래 명령어를 입력합니다.

.. code-block:: bash

    $ poetry install
    $ poetry shell

실행
===================



.. code-block:: bash

    $ python manage.py migrate
    $ python manage.py runserver

환경변수
===================
.. code-block:: bash
    
    # 기본
    SECRET_KEY="secret key"
    ALLOWED_HOSTS="*"

    # 데이터 베이스
    MYSQL_DATABASE="database"
    MYSQL_USER="root"
    MYSQL_HOST="host" # local docker mysql 사용시 host를 `database` 으로 입력
    MYSQL_PORT="3306"
    MYSQL_PASSWORD="1234" 

    # local 환경에서만 적용
    USE_SQLITE3=1

도커를 통한 실행 
===================

`도커 설치하기`_ 안내에 따라 도커 설치합니다. 그 후 프로젝트 root 디렉터리에서 아래 명령어를 입력합니다.

.. code-block:: bash

    # 기존 서비스 중지
    $ docker-compose stop

    # 로컬 개발 실행 
    $ docker-compose -f docker-compose.yml -f docker-compose.local.yml up --build

    # 배포할 경우 prod 를 통해 실행 
    $ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build


.. _도커 설치하기: https://docs.docker.com/get-docker/
.. _Poetry: https://python-poetry.org/docs/