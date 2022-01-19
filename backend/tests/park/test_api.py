# drf testing example
# https://www.django-rest-framework.org/api-guide/testing/#example

from ast import AsyncFunctionDef
from lib2to3.pgen2.pgen import DFAState

from apps.park.models import Equipment, Park, ParkEquipment, Review
from apps.park.serializers import ParkReviewSerializer, ParkSerializer
from apps.user.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class ParkListViewTest(APITestCase):
    ß
class TestParkAPI(APITestCase):
    def setUp(self):
        # 테스트 케이스 실행전 먼저 실행되는 메소드
        # 테스트 할 객체들을 생성해주거나 미리 셋팅
        self.user = User.objects.create(username='테스트용', email='test1@test.com')
        self.park = Park.objects.create(park_name="도봉산공원", 
            gu_id=12345, 
            full_address="서울특별시 관악구 신림동",
            si_address = "서울특별시", 
            gu_address = "관악구",
            dong_address = "신림동",
            latitude = "13.35343",
            longitude = "15.3424",
            park_image = "./.media/abc.jpg"
        )
        self.equipment = Equipment.objects.create(equipment_name='허리돌리기', equipment_type='상체')
        self.parkEquipment = ParkEquipment.objects.create(park_id=self.park, equipment_id=self.equipment, quantity='1')
        self.review = Review.objects.create(user_id=self.user, park_id=self.park, content="리뷰컨텐츠1", score="3")
        self.review2 = Review.objects.create(user_id=self.user, park_id=self.park, content="리뷰컨텐츠2", score="3")
    
    def authenticate(self):
        '''
        리뷰 기능 테스트를 위한 유저 등록, 로그인 및 클라이언트 권한부여
        '''
        # 유저 가입
        self.client.post(reverse('user:register'), {
            "username": "테스트용",
            "email": "test@example.com",
            "password": "password"
        })
        # 유저 로그인
        response = self.client.post(reverse('user:login'), {
            "email": "test@example.com",
            "password": "password"
        })
        # 클라이언트에 토큰 저장
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {response.data["access"]}')
    
    def test_get_park_detail_success(self):
        # 요청
        response = self.client.get("/api/parks/detail/1")
        # 응답 코드 (int)
        status_code = response.status_code
        self.assertEqual(status.HTTP_200_OK, status_code)
        # 응답 데이터 (json)
        response_data = response.data
        park_serializer_data = ParkSerializer(self.park).data
        self.assertEqual(park_serializer_data, response_data)

    def test_get_park_detail_fail(self):
        # 잘못된 값을 전달 했을때
        response = self.client.get("/api/parks/detail/abc")
        # 응답하는 상태코드는 200이 아님을 예상할 수 있다
        answer = response.status_code
        not_expected = 200  # 예상되는 값
        assert answer != not_expected
    
    def test_post_park_reviews_success(self):
        self.authenticate()
        response = self.client.post(f"api/parks/{self.park.id}/reviews", {
            "park_id": self.park,
            "score": 3,
            "content": "테스트리뷰1",
        })
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
    

