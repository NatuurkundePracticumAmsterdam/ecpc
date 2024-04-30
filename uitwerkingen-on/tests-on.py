from models.polynomials import line


def test_line():
    actual = line(2, 4, 3)
    expected = 11

    if actual == expected:
        print("TEST PASSED")
    else:
        print("TEST FAILED")
