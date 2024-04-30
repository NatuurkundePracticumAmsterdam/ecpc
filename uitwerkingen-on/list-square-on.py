import math

squares = []
for n in range(1, 11):
    squares.append(math.sqrt(n))

# print the list below each other with three decimal places
print("Square of range 1 to 10 with three decimal places: ")
for square in squares:
    print(f"{square:.3f}")

# State if number 3 or 4 appears in the list of squares
for number in [3, 4]:
    print(f"does number {number} appears in the list of squares?", number in squares)
