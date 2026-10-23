import numpy as np
from models.polynomials import line
from models import tests
import matplotlib.pyplot as plt

x = np.arange(0, 28)
a = 1
b = 7

plt.plot(x, line(x, a, b))
plt.show()

tests.test_line()