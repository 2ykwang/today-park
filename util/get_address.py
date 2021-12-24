import argparse
import os 

import requests 

HOST = "dapi.kakao.com"
GET_ADDRESS_ENDPOINT = f"https://{HOST}/v2/local/search/keyword.json"

"""
    사용법
    python3 get_address.py -a (apikey) -i (입력파일이름)
    
    python3 get_address.py -a (apikey) -i test.csv ( 현재 디렉터리 )
    python3 get_address.py -a (apikey) -i /home/test.csv ( 절대 경로 )
 
    출력:
    output.csv
    
    장소, 주소, 좌표
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
        target = documents[0]
        return (target["place_name"], target["address_name"], target["y"], target["x"])
    return None


def _make_parser():

    parser = argparse.ArgumentParser(description="이름 -> 주소, 좌표 변환")
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
    return parser


def main():
    parser = _make_parser()
    args = parser.parse_args()

    filename = args.input
    api_key = os.environ.get("API_KEY", "") or args.apikey 

    output_file = open("output.csv", "w", encoding="utf-8")

    output_file.write("검색어,장소,주소,위도,경도\n")
    with open(filename, "r") as file:
        lines = file.readlines()
        for line in lines:
            result = search(line, api_key)
            if result:
                output_file.write(f"{line.rstrip()},{result[0]},{result[1]},{result[2]},{result[3]}\n")
            else:
                # 찾을 수 없을때 장소만 저장
                output_file.write(f"{line.rstrip()},,,,\n")

    output_file.close()


if __name__ == "__main__":
    main()
