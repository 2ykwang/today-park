.. testing:

=======================
테스트
=======================

-----------------------
라이브러리
-----------------------

- 테스트 자동화 도구 `tox`_
- 테스트 프레임워크 `pytest`_
- django pytest 플러그인 `pytest-django`_
- 테스트 커버리지 툴 `pytest-cov`_

-----------------------
실행
-----------------------

`backend` 디렉터리에서 `poetry install -E tests` 명령어를 입력하여 테스트를 하기위한 의존성을 설치해주세요.

그 후 아래 명령어로 테스트를 실행할 수 있습니다.

.. code-block:: bash

    $ tox

tox 도구는 테스트, 포멧팅, 린트를 실행합니다.

테스트 커버리지
-----------------------

`coverage`_ - 현재 프로젝트에서 작성한 테스트 코드가 프로젝트 코드를 얼마나 커버하는지 측정할 수 있는 도구.

아래 명령어로 커버리지 결과를 생성할 수 있습니다.
 
.. code-block:: bash

    # 테스트 실행
    $ pytest --cov=apps

    # 커버리지 측정 결과를 보여줍니다.
    $ coverage report

    Name                           Stmts   Miss  Cover
    --------------------------------------------------
    apps/__init__.py                   0      0   100%
    apps/bookmark/__init__.py          0      0   100%
    ...
    ...

    # 커버리지 측정 결과를 html파일로 저장합니다. ( htmlcov 폴더 생성됨 )
    $ coverage html

    Wrote HTML report to htmlcov/index.html 

.. _coverage: https://coverage.readthedocs.io/
.. _tox: https://tox.wiki/en/latest/
.. _pytest: https://docs.pytest.org/
.. _pytest-django: https://pytest-django.readthedocs.io/en/latest/
.. _pytest-cov: https://pytest-cov.readthedocs.io/en/latest