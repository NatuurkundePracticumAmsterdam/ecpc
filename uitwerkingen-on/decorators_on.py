import datetime


def log(func):
    def inner(*args, **kwargs):
        return_value = func(*args, **kwargs)

        print(40 * "-")
        print(f"Logging function call at {datetime.datetime.now()}.")
        print(f"Function was called as follows:")
        print(f"Arguments: {args}")
        print(f"Keyword arguments: {kwargs}")
        print(f"And the return value was {return_value}")
        print(40 * "-")

        return return_value

    return inner


@log
def f(a, b):
    return a * b


f(3, 4)
f(3, b=4)