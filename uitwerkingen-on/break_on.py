voltage = 0  # mV
steps = 50  # mV
while voltage < 3300:
    voltage += steps
    print(f"The voltage is set to {voltage} mV.")
    break
