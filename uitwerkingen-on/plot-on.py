import matplotlib.pyplot as plt

time = [0, 0.5, 1, 1.5, 2, 2.5, 3]  # seconds
distance = [0, 15, 50, 100, 200, 300, 400]  # meters

plt.plot(time, distance, "o")
plt.xlabel("Time (s)")
plt.ylabel("Distance (m)")
plt.savefig("plot.png")
