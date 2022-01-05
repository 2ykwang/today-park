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
from .pagination import ParkListPagination
from .serializers import ParkReviewSerializer, ParkSerializer


class ParkListView(APIView, ParkListPagination):
    """
    공원 검색

    조건에 따른 공원 목록 검색 결과를 반환합니다.
    """

    guId = openapi.Parameter(
        "guId",
        openapi.IN_QUERY,
        description="구 이름",
        required=True,
        type=openapi.TYPE_STRING,
    )
    keyword = openapi.Parameter(
        "keyword", openapi.IN_QUERY, description="검색키워드", type=openapi.TYPE_STRING
    )
    sort = openapi.Parameter(
        "sort", openapi.IN_QUERY, description="정렬", type=openapi.TYPE_STRING
    )
    page = openapi.Parameter(
        "page",
        openapi.IN_QUERY,
        description="페이지",
        type=openapi.TYPE_INTEGER,
        default=1,
    )
    size = openapi.Parameter(
        "size",
        openapi.IN_QUERY,
        description="페이지당 보여줄 갯수",
        type=openapi.TYPE_INTEGER,
        default=ParkListPagination.page_size,
    )

    @swagger_auto_schema(
        manual_parameters=[guId, keyword, sort, page, size],
        responses={
            status.HTTP_200_OK: ParkSerializer(many=True),
            status.HTTP_404_NOT_FOUND: "공원 정보가 존재하지 않음",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def get(self, request, format=None):
        guId = request.GET.get("guId", None)
        keyword = request.GET.get("keyword", None)
        sort = request.GET.get("sort", None)

        def key_filter():
            park = Park.objects.filter(
                Q(dong_address__contains=keyword) | Q(park_name__contains=keyword)
            )
            return park

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
            return Response(
                {"detail": "구ID를 입력해 주세요."}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            park = (
                Park.objects.filter(gu_address=guId)
                if keyword is None
                else key_filter()
            )
            if len(park) == 0:
                return Response(
                    {"detail": "일치하는 공원이 없습니다."}, status=status.HTTP_204_NO_CONTENT
                )

        if sort is not None:  # 정렬o
            park = sort_type(sort, park)

        parks = self.paginate_queryset(park, request, view=self)
        serializer = ParkSerializer(parks, many=True)
        return self.get_paginated_response(serializer.data)


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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_user(self):
        return self.request.user

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: ParkReviewSerializer(many=True),
            status.HTTP_404_NOT_FOUND: "잘못된 요청",
        },
    )
    def get(self, request, park_id: int, format=None):
        """
        공원별 리뷰 요청

        공원(id)에 대한 리뷰 요청 - 삭제된 리뷰 제외
        """
        review = Review.objects.filter(Q(park_id=park_id) & Q(is_deleted=False))
        serializer = ParkReviewSerializer(review, many=True)
        return Response(serializer.data)

    # TODO: drf_yasg response scheme 실제 반환 되는 값과 다른 문제가 있음.
    @swagger_auto_schema(
        request_body=ParkReviewSerializer,
        responses={
            status.HTTP_201_CREATED: ParkReviewSerializer,
            status.HTTP_401_UNAUTHORIZED: "권한 없음",
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
            status.HTTP_404_NOT_FOUND: "존재하지 않는 공원 ID",
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


class ParkReviewView(APIView):

    permission_classes = [IsOwner]

    park_id = openapi.Parameter(
        "park_id",
        openapi.IN_QUERY,
        description="공원ID",
        required=True,
        type=openapi.TYPE_STRING,
    )
    review_id = openapi.Parameter(
        "review_id",
        openapi.IN_QUERY,
        description="리뷰ID",
        required=True,
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(
        manual_parameters=[park_id, review_id],
        responses={
            status.HTTP_200_OK: "성공",
            status.HTTP_401_UNAUTHORIZED: "권한 없음",
            status.HTTP_404_NOT_FOUND: "리뷰가 존재하지 않음",
        },
    )
    def delete(self, request, park_id, review_id, format=None):
        """
        공원 리뷰 삭제

        공원 리뷰(review_id) 삭제
        """
        review = get_object_or_404(Review, pk=review_id)
        review.is_deleted = True
        review.save()
        return Response({"detail": "댓글이 삭제되었습니다."}, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=ParkReviewSerializer,
        responses={
            status.HTTP_200_OK: ParkReviewSerializer,
            status.HTTP_401_UNAUTHORIZED: "권한 없음",
            status.HTTP_404_NOT_FOUND: "리뷰가 존재하지 않음",
        },
    )
    def put(self, request, park_id, review_id, format=None):
        """
        공원 리뷰 수정

        공원 리뷰를 수정합니다.
        """
        review = get_object_or_404(Review, pk=review_id)
        serializer = ParkReviewSerializer(review, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

        validated_data = serializer.validated_data

        review.content = validated_data["content"]
        review.score = validated_data["score"]

        review.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


# TODO: 유저별 리뷰
class UserReviewListView(APIView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: ParkReviewSerializer(many=True),
            status.HTTP_401_UNAUTHORIZED: "권한 없음",
            status.HTTP_404_NOT_FOUND: "잘못된 요청",
        },
    )
    def get(self, request, format=None):
        """
        사용자 공원 리뷰 목록

        사용자가 작성한 공원 리뷰 목록을 반환합니다.
        """
        review = Review.objects.filter(user_id=request.user.id)
        serializer = ParkReviewSerializer(review, many=True)
        return Response(serializer.data)
