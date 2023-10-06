import numpy as np

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# use a for loop to create a list with cube root of numbers
cube_root = []
for number in numbers:
    answer = number ** (1 / 3)
    cube_root.append(answer)


# use list comprehension to create a list with cube root of numbers
cube_root_comprehension = [n ** (1 / 3) for n in numbers]

# use numpy arrays to create a list with cube root of numbers
numbers = np.array(numbers)
cube_root_array = numbers ** (1 / 3)

print(cube_root)
print(cube_root_comprehension)
print(cube_root_array)
