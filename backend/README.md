# Backend

backend directory


## 설치

```python
# poetry 설치-> https://python-poetry.org/docs/
poetry install

```

### 환경변수

.env 파일 생성 후 아래 내용을 입력

```ini
# 기본
SECRET_KEY=secretkey

# 개발환경
USE_SQLITE3=0 # 0 = mysql 사용, 1 = sqlite3 사용
ALLOWED_HOSTS="*"

# 데이터 베이스
MYSQL_DATABASE=emptycart
MYSQL_USER=root
MYSQL_HOST=database # 컨테이너 mysql 사용시 (database) 
MYSQL_PORT=3306
MYSQL_PASSWORD=1234

ALLOWED_HOSTS=host # 접속 허용 HOSTS (콤마로 구분)
```

.env.database (docker)

```ini
MYSQL_DATABASE=MYSQL_DATABASE  
MYSQL_ROOT_PASSWORD=MYSQL_ROOT_PASSWORD
```
