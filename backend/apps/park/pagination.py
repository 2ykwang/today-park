from rest_framework.pagination import PageNumberPagination

# 공원 페이지네이션
# 참고: https://www.django-rest-framework.org/api-guide/pagination/


class ParkListPagination(PageNumberPagination):
    # 페이지당 보여줄 갯수 기본값
    page_size = "10"
    # 페이지당 보여줄 갯수 query 매개변수 이름
    page_size_query_param = "size"
    # 페이지당 보여줄 갯수 최댓값
    max_page_size = 50
    # 페이지 query 매개변수 이름
    page_query_param = "page"
