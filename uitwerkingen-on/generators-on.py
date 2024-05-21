def Collatz(x):
    """Illustrates Collatz's conjecture

    Starts with x generates next number when x is not equal to 1. 
    Next number is x devided by 2 if x is even and x times 3 + 1 if x is odd. 
    Collatz suspects that you always end with number 1 despite of the starting value. 

    Args:
        x (int): starting value

    Yields:
        int: next number in the sequence
    """
    yield x
    while x != 1:
        if x % 2 == 0:
            # x is even and is divided by 2
            x = x // 2  # dubble // makes it an integer
        else:
            # x is odd, multiply by 3 and add 1
            x = 3 * x + 1
        yield x


print("print the values of generator with next")
collatz_generator = Collatz(3)
print(next(collatz_generator))
print(next(collatz_generator))
print(next(collatz_generator))
print(next(collatz_generator))
print(next(collatz_generator))
print(next(collatz_generator))
print(next(collatz_generator))
print(next(collatz_generator))
# print(next(collatz_generator)) # gives StopIteration exception

print("print values of generator without next:")
for number in Collatz(28):
    print(number)