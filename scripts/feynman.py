from turtle import Turtle

# create instance of class Turtle
t = Turtle("turtle")

t.left(30)
t.forward(50)

t.left(120)
t.forward(50)

t.left(180)
t.forward(50)

t.left(-15)

for _ in range(5):
    t.forward(15)
    t.left(90)
    t.forward(15)
    t.left(270)

t.left(15)
t.forward(50)

t.left(180)
t.forward(50)

t.left(-120)
t.forward(50)

ts = t.getscreen()

ts.getcanvas().postscript(file="feynman.eps")

t.screen.mainloop()