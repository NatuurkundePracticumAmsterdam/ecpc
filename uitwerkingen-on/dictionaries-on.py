import numpy as np

# Dictionary of constants pi, gravitational acceleration (g), the speed of light (c) and elementary charge (e)
constants = {"pi": np.pi, "g": 9.81, "c": 3e8, "e": 1.6e-19}

# print de names -not the values- of the constants in the dictionary
print(constants.keys())

# Calculate gravity of an object with mass of 14 kg
mass = 14  # kg
F_z = mass * constants["g"]
print(f"Gravity of an object with {mass} kg is: {F_z} N")

# Dictionary with results of a measurement 
measurement = {"U": 1.5, "I": 75e-3}  # U in V, I in A

# Add resistance to dictionary
measurement["R"] = measurement["U"] / measurement["I"]

print(f'The resistance was: {measurement["R"]:.2f} \u03A9')