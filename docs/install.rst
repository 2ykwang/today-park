.. installation:

=======================
설치 / 실행
=======================
 
-----------------------
백엔드
-----------------------

의존성 관리
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

서버 환경변수
===================

``export`` 명령을 이용하여 직접 환경변수를 설정하거나 ``/backend`` 디렉터리에서 ``.env`` 파일을 생성하여 환경변수를 설정할 수 있습니다.


.. code-block:: bash
    
    # 기본
    SECRET_KEY="secret key"
    ALLOWED_HOSTS="*"

    # 데이터 베이스
    MYSQL_DATABASE="database" 
    MYSQL_USER="root"
    MYSQL_HOST="host" # docker를 사용하여 운용시 docker 컨테이너 이름을 입력. > `database`
    MYSQL_PORT="3306"
    MYSQL_PASSWORD="1234"

    # local 환경에서만 적용
    USE_SQLITE3=1

    # config.settings.local or config.settings.production
    DJANGO_SETTINGS_MODULE="config.settings.local"

-----------------------
도커
-----------------------

`도커 설치하기`_ 

도커가 설치 되어있을경우 프로젝트 root 디렉터리에서 아래 명령어를 입력합니다.

도커 환경변수
=======================

``/backend`` 디렉터리에서 ``.env.database`` 파일을 생성합니다

.. code-block:: bash

    # 데이터 베이스 이름
    MYSQL_DATABASE="database"
    # root 패스워드
    MYSQL_ROOT_PASSWORD="password"

도커 실행
=======================

.. code-block:: bash

    # 기존 서비스 중지
    $ docker-compose stop

    # 로컬 개발 실행 
    $ docker-compose -f docker-compose.yml -f docker-compose.local.yml up --build

    # 배포할 경우 prod 를 통해 실행 
    $ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build


.. _도커 설치하기: https://docs.docker.com/get-docker/
.. _Poetry: https://python-poetry.org/docs/