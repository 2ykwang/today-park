"""

도로명 주소 -> 지번 주소로 변환

"""
import argparse
import csv
import os

import requests

HOST = "dapi.kakao.com"
GET_ADDRESS_ENDPOINT = f"https://{HOST}/v2/local/search/address.json"

"""
    사용법
    python3 road.py -a (apikey) -i (입력파일이름) -c (도로명주소 컬럼 위치 0부터 시작)
    
    python3 roadaddress_conv.py -a (apikey) -i test.csv ( 현재 디렉터리 ) -c 4
    python3 roadaddress_conv.py -a (apikey) -i /home/test.csv ( 절대 경로 ) -c 3
 
    출력:
    output.csv
    
    지번주소
    (시) (구) (동)
"""


def search(query: str, api_key: str):
    """query를 입력받아 장소 정보를 불러옵니다.

    참고: https://developers.kakao.com/tool/rest-api/open/get/v2-local-search-keyword.%7Bformat%7D
    Args:
        query (str): 검색할 query
    """  # noqa

    params = {"query": query}
    headers = {"Authorization": f"KakaoAK {api_key}"}
    response = requests.get(GET_ADDRESS_ENDPOINT, params=params, headers=headers)

    result = response.json()
    documents = result["documents"]

    if documents:
        target = documents[0]["road_address"] or documents[0]["address"]
        print(target)
        if target is not None:
            address = " ".join(
                [
                    target[f"region_{x}depth_name"]
                    for x in range(1, 4)
                    if target[f"region_{x}depth_name"] is not None
                ]
            )

            return address
    return None


def _make_parser():

    parser = argparse.ArgumentParser(description="도로명주소 -> 지번주소")
    parser.add_argument(
        "-a",
        "--apikey",
        help="카카오 api key",
    )
    parser.add_argument(
        "-i",
        "--input",
        help="입력 파일 경로",
    )
    parser.add_argument(
        "-c",
        "--column",
        type=int,
        help="컬럼 번호 입력 (0 부터 시작)",
    )
    return parser


def main():
    parser = _make_parser()
    args = parser.parse_args()

    filename = args.input
    api_key = os.environ.get("API_KEY", "") or args.apikey
    column = args.column

    output_file = open("output.csv", "w", encoding="utf-8")

    output_file.write("주소")
    with open(filename, "r") as file:
        csvreader = csv.reader(file)
        for line in csvreader:
            result = search(line[column], api_key)
            if result:
                output_file.write(f"{result}\n")
            else:
                # 못찾았을 경우
                output_file.write(f"{line[column].rstrip()}\n")

    output_file.close()


if __name__ == "__main__":
    main()
