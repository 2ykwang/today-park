import pytest
from rest_framework import exceptions


def test_1():

    test = 1
    assert test == 1

    # serializer = ExampleSerializer(data={"number": 1, "text": "Hello world"})
    # assert serializer.is_valid()
    # assert serializer.data == {"number": 1, "text": "Hello world"}
