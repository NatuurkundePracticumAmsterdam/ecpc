import numpy as np
from numpy import pi
import matplotlib.pyplot as plt

# dictionary with linear, quadratic and sine function
models = {
    "linear": lambda x, a, b: a * x + b,
    "quadratic": lambda x, a, b, c: a * x ** 2 + b * x + c,
    "sine": lambda x, a, b, c, d: a + b * np.sin(c * x + d),
}

# test the next piece of code
f = models["linear"]
print(f(5, a=2, b=3))

# Graph of sine function on domain [0, 2pi] with parameters a=1, b=2, c=2, d=0.5pi
x = np.linspace(0, 2 * pi, 100)
f = models["sine"]

plt.plot(x, f(x, a=1, b=2, c=2, d=0.5 * pi))
plt.show()