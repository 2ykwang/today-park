from apps.core.permissions import IsOwner
from django.db.models import Avg, Count, Q
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from .models import Park, Review
from .serializers import ParkReviewSerializer, ParkSerializer


class ParkListView(APIView):
    """
    공원 검색

    조건에 따른 공원 목록 검색 결과를 반환합니다.
    """

    guId = openapi.Parameter(
        "guId",
        openapi.IN_QUERY,
        description="구ID",
        required=True,
        type=openapi.TYPE_STRING,
    )
    keyword = openapi.Parameter(
        "keyword", openapi.IN_QUERY, description="검색키워드", type=openapi.TYPE_STRING
    )
    sort = openapi.Parameter(
        "sort", openapi.IN_QUERY, description="정렬", type=openapi.TYPE_STRING
    )

    @swagger_auto_schema(
        manual_parameters=[guId, keyword, sort],
        responses={
            status.HTTP_200_OK: ParkSerializer,
            status.HTTP_204_NO_CONTENT: "공원 정보가 존재하지 않음",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def get(self, request, format=None):
        guId = request.GET.get("guId", None)
        keyword = request.GET.get("keyword", None)  # 공원이름, 동이름
        sort = request.GET.get("sort", None)  # 평점, 리뷰많은순, 가나다

        def key_filter():
            park = Park.objects.filter(
                Q(dong_address__contains=keyword) | Q(park_name__contains=keyword)
            )
            return park

        # TODO: count_reviews average_rating 순으로 정렬되는 부분 코드 다시 짜야함
        def sort_type(sort, park):
            if sort == "score_asc":
                park = park.annotate(avg_rating=Avg("review_park__score")).order_by(
                    "avg_rating"
                )
            elif sort == "score_desc":
                park = park.annotate(avg_rating=Avg("review_park__score")).order_by(
                    "-avg_rating"
                )
            elif sort == "review_more":
                park = park.annotate(cnt_reviews=Count("review_park")).order_by(
                    "-cnt_reviews"
                )
            elif sort == "review_less":
                park = park.annotate(cnt_reviews=Count("review_park")).order_by(
                    "cnt_reviews"
                )
            elif sort == "dict_asc":
                park = park.order_by("park_name")
            elif sort == "dict_desc":
                park = park.order_by("-park_name")
            return park

        if guId is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if keyword is not None:  # 검색어o
            park = key_filter()
        else:  # 검색어x
            park = Park.objects.filter(gu_address=guId)

        if not len(park):  # 공원이 없을때
            return Response(status=status.HTTP_204_NO_CONTENT)

        if sort is not None:  # 정렬o
            park = sort_type(sort, park)

        serializer = ParkSerializer(park, many=True)

        return Response(serializer.data)


class ParkDetailView(APIView):
    """
    공원 상세 정보

    요청한 공원의 상세 정보를 반환
    """

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: ParkSerializer,
            status.HTTP_404_NOT_FOUND: "잘못된 요청",
        },
    )
    def get(self, request, park_id, format=None):
        park = get_object_or_404(Park, pk=park_id)
        serializer = ParkSerializer(park)
        return Response(serializer.data)


class ParkReviewListView(APIView):
    # 인증 없으면 읽기만해라.
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: ParkReviewSerializer,
            status.HTTP_404_NOT_FOUND: "잘못된 요청",
        },
    )
    def get_user(self):
        return self.request.user

    # TODO: is_deleted 값이 True 일 경우 반환하지 않게 해야함.
    def get(self, request, park_id, format=None):
        """
        공원별 리뷰 요청

        공원(id)에 대한 리뷰 요청
        """
        review = Review.objects.filter(park_id=park_id)
        serializer = ParkReviewSerializer(review, many=True)
        return Response(serializer.data)

    # TODO: drf_yasg response scheme 실제 반환 되는 값과 다른 문제가 있음.
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: ParkReviewSerializer,
            status.HTTP_404_NOT_FOUND: "잘못된 요청",
        },
    )
    def post(self, request, park_id, format=None):
        """
        공원 리뷰 등록

        공원(id) 리뷰 등록
        """
        user = self.get_user()
        park = get_object_or_404(Park, pk=park_id)

        serializer = ParkReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data

        review = Review()
        review.user_id = user
        review.park_id = park
        review.content = validated_data["content"]
        review.score = validated_data["score"]

        review.save()

        return Response({"detail": "리뷰가 생성되었습니다."}, status=status.HTTP_201_CREATED)
        # permission_classes = [permissions.IsAuthenticated]


class ParkReviewView(APIView):

    permission_classes = [IsOwner]

    review_id = openapi.Parameter(
        "review_id", openapi.IN_QUERY, description="리뷰ID", type=openapi.TYPE_STRING
    )

    @swagger_auto_schema(
        manual_parameters=[review_id],
        responses={
            status.HTTP_200_OK: "성공",
            status.HTTP_204_NO_CONTENT: "리뷰가 존재하지 않음",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def delete(self, request, park_id, review_id, format=None):
        """
        공원 리뷰 삭제

        공원(id) 리뷰 삭제
        """
        # review = Review.objects.get(id=review_id)
        # if len(review) == 0:
        #     return Response(status=status.HTTP_204_NO_CONTENT)

        review = get_object_or_404(Review, pk=review_id)

        # 아래 로직은 permission_classes 사용하면 됩니다!
        # if review.user_id != AccessToken["user_id"]:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

        review.delete()
        return Response({"detail": "댓글이 삭제되었습니다."}, status=status.HTTP_202_ACCEPTED)

    # TODO: 리뷰 수정
    def put(self, request, park_id, review_id, format=None):
        pass


# 유저별 리뷰
class UserReviewList(APIView):
    def get(self, request, format=None):
        review = Review.objects.filter(user_id=AccessToken["user_id"])
        serializer = ParkReviewSerializer(review, many=True)
        return Response(serializer.data)
