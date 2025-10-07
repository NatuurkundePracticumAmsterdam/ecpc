from math import sqrt


class PointMass:
    def __init__(self, mass, position, velocity):
        self.mass = mass
        self.position = position
        self.velocity = velocity

    def update_velocity(self, velocity):
        self.velocity = velocity

    def update_position_after(self, duration):
        x, y = self.position
        vx, vy = self.velocity
        x += vx * duration
        y += vy * duration
        self.position = x, y
        return self.position

    def get_momentum(self):
        vx, vy = self.velocity
        return self.mass * sqrt(vx**2 + vy**2)

    def get_kinetic_energy(self):
        vx, vy = self.velocity
        return 0.5 * self.mass * (vx**2 + vy**2)


m = PointMass(mass=5.0, position=(1.0, 0.0), velocity=(3.0, 0.0))
print(f"{m.update_position_after(0)=}")
print(f"{m.update_position_after(0.5)=}")
print(f"{m.update_position_after(0.5)=}")

m.update_velocity((0.0, 3.0))
print(f"{m.update_position_after(0.5)=}")
print(f"{m.update_position_after(0.5)=}")

print(f"{m.velocity=}")
print(f"{m.get_momentum()=}")
print(f"{m.get_kinetic_energy()=}")
