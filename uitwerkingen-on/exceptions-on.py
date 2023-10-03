def average(values):
    try:
        average = sum(values) / len(values)
    except TypeError:
        average = None
        print("Input is not correct type")
    except ZeroDivisionError:
        average = None
        print("Input is empty")

    return average


print(average([1, 2, 3]))

average([])
# # gives: ZeroDivisionError: division by zero

average(4)
# # gives: TypeError: 'int' object is not iterable

a = average("12345")
# # gives: TypeError: unsupported operand type(s) for +: 'int' and 'str'
# print(a)
