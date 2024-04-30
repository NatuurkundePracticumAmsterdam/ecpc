import numpy as np

# Make an array from 1 to
numbers = np.arange(1, 11, 1)

# Take the squareroot of range 1 to 10
squareroot = np.sqrt(numbers)

# print the list of squareroots below each other with three decimal places
for root in squareroot:
    print(f"{root:.3f}")

# State if number 3 or 4 appears in the list of squares
print("does number 3 appears in the list of squares?", 3 in squareroot)
print("does number 4 appears in the list of squares?", 4 in squareroot)