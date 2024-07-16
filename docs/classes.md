# Classes

Voor een snelle meting is het script dat je geschreven hebt bij [opdracht _quick 'n dirty_ meting](basisscript.md#opd:quickndirty-meting) en [opdracht _Pythondaq: CSV_](basisscript.md#opd:quickndirty-csv) prima! Maar als de meetapparatuur ingewikkelder wordt (meer verschillende commando's) of je wilt meer aanpassingen doen, dan is het wel lastig dat je op allerlei plekken de commando's opnieuw moet programmeren &mdash; en eerst moet opzoeken. Als je een nieuw script schrijft moet je opnieuw goed opletten dat je de goede _terminator characters_ gebruikt, etc. Het is wat werk, maar toch heel handig, om je code op te splitsen en een _class_ te schrijven.

Een class is eigenlijk een groep functies die je bij elkaar pakt en die met elkaar gegevens kunnen delen. Zodra een programma wat complexer wordt merk je dat het fijn kan zijn om variabelen op te sluiten in geïsoleerde omgevingen. 


## Aanmaken van een class
Een class is een verzameling functies. Hieronder staat een versimpelde weergave van de class `Turtle`. Een class maak je aan met de regel `#!py class Turtle:` [^ClassTitle] Daaronder komt ingesprongen de inhoud van de class. De class bestaat uit een collectie van fucnties &mdash; de zogeheten _methods_ van de class. De eerste method `#!py __init__()` is speciaal (voor meer informatie zie: [dunder methods](vervolg-python.md#dunder-methods) ), dit is de _initializer_ waarin alle taken staan die uitgevoerd worden zodra de class gebruikt wordt. 

[^ClassTitle]: Wanneer je de Google Style Guide[@google_style_guide] volgt schrijf je de naam van de class in CapWords of CamelCase. 

``` py
class Turtle:
    def __init__(self, shape):
        # transform turtle into shape

    def forward(self, distance):
        # move turtle by distance

    def left(self, angle):
        # turn turtle counterclockwise
        # by angle in degrees
```

De eerste parameter van de `#!py __init__()`-method en van alle andere methods, is `#!py self`, daarna komen &mdash;indien nodig&mdash; andere parameters die in de method nodig zijn. Later meer over [de speciale parameter self](classes.md#de-speciale-parameter-self), eerst gaan we kijken hoe je een class gebruikt. 

## Aanroepen van een class

Het aanroepen van een class lijkt veel op het aanroepen van een functie. Stel we hebben de functie
``` py
def power(a, b):
    return a ** b
```
Dan roep je die aan met `#!py result = power(2, 3)`. Hierbij is `power` de naam van de functie en `result` de parameter waar de uitkomst heen gaat. Bij het aanroepen van een class doe je iets soortgelijks. 

``` py
master_oogway = Turtle("turtle")
```

In de parameter `master_oogway` gaat de 'uitkomst' van de class, dat is in dit geval een collectie van methods (en variabelen). De parameter `master_oogway` noemen we een _instance_ van de class `Turtle`. Net zoals je een functie vaker kunt aanroepen, kan je ook meerdere instances van een class aanmaken. Na de naam van de class: `Turtle`, komen tussen ronde haakjes de variabelen die worden meegegeven aan de  `#!py __init__()`-method (`#!py self` niet meegerekend), de parameter `#!py shape` krijgt dus de variabele `#!py "turtle"` toegewezen.

???+ meer-leren "Meerdere instances"
    Je kunt meerdere instances hebben van dezelfde class, bijvoorbeeld wanneer meerdere klanten in de webshop tegelijkertijd winkelmandjes vullen:
    ``` py
    class Cart:
        ...

    cart_alice = Cart()
    ...
    cart_bob = Cart()
    ...
    ```

!!! opdracht-basis "`#!py __init__(self)`"
    Stel dat de init-method geen extra parameters mee krijgt, zoals in het volgende geval:
    ```py
    class Turtle:
        def __init__(self):
            # initialiseer class
        
        def forward(self, distance):
            # move turtle by distance

        def left(self, angle):
            # turn turtle counterclockwise
            # by angle in degrees
    ```
    hoe maak je dan een instance aan van de class?
    ??? uitwerkingen
        ```py
        master_oogway = Turtle()
        ```

Omdat de instance `master_oogway` alle methods bevat kunnen we deze methods aanroepen:
```py
master_oogway = Turtle("turtle")

master_oogway.forward(50)
master_oogway.left(30)
master_oogway.forward(50)
```
    
!!! opdracht-basis "turtle"
    1. Maak een bestand aan met de naam {{file}}`turtle.py`.
    1. Importeer de Turtle class met `#!py from turtle import Turtle`
    1. Maak een instance van de class Turtle aan met `#!py master_oogway = Turtle("turtle")`
    1. Laat de schildpad lopen en draaien door de methods `#!py forward()` en `#!py left()` aan te roepen.

    !!! info "Schildpad verdwijnt"
        Na het uitvoeren van het script sluit Python het scherm van de schildpad. Voeg de regel `#!py master_oogway.screen.mainloop()` toe om het scherm te laten staan en handmatig af te sluiten. 

## De speciale parameter `#!py self`
Een _class method_ is vrijwel gelijk aan een normale functie, behalve dat een class method als eerste de parameter `#!py self` verwacht. Aan deze parameter wordt de eigen instance van de class meegegeven wanneer je de method aanroept. Gelukkig hoef je dit niet zelf te doen want wanneer je een method aanroept wordt impliciet de instance als eerste parameter meegegeven. 

Maar waarom zou je dit doen? De instance bevat alle methods en variabele, door de instance aan elke method mee te geven kan je de informatie die daarin is opgeslagen in elke method gebruiken. 

Stel we maken een nieuwe method `#!py do_kungfu_move` waarin we `#!py forward()` en `#!py left()` willen gebruiken:

``` py
class Turtle:
    def __init__(self, shape):
        # transform turtle into shape

    def forward(self, distance):
        # move turtle by distance

    def left(self, angle):
        # turn turtle counterclockwise
        # by angle in degrees

    def do_kungfu_move(self):
        # Do kungfu move
        self.forward(130)
        self.left(350)
        self.forward(60)
```

Als we de method `#!py do_kungfu_move` aanroepen met `#!py master_oogway.do_kungfu_move()` geeft python automatisch de instance `#!py master_oogway` mee aan de method. De parameter `#!py self` is dus nu gelijk aan de instance `#!py master_oogway`, daarmee is `#!py self.forward(130)` ook gelijk aan `#!py master_oogway.forward(130)`. 

### Instance attribute
De instance van een class bevat niet alleen alle methods, maar kan ook variabele hebben. In het voorbeeld hieronder voegen we de variabele `#!py quote` toe in de init-method aan de instance, daarmee wordt het een _intance attribute_.

``` py
class Turtle:
    def __init__(self, shape):
        # transform turtle into shape
        self.quote = "Yesterday is history, Tomorrow is a mystery, but Today is a gift. That is why it is called the present"

    ...
```
De instance attribute `#!py quote` is nu onderdeel van de instance. We kunnen die oproepen binnen elke method met `#!py self.quote` maar ook buiten de class:

```py
master_oogway = Turtle("turtle")

print(master_oogway.quote)
# "Yesterday is history, Tomorrow is a mystery, but Today is a gift. That is why it is called the present"
```

!!! opdracht-basis "Opbouw van een class"

    1. Beschouw de onderstaande code
    1. Bespreek met elkaar wat de code precies doet en verplaast de onderdelen naar de juiste plek in de code. 
    Twijfel je of je nog weet wat een module is kijk dan voor meer informatie in de [paragraaf modules](vervolg-python.md#modules).

    <iframe src="https://h5plti.avwebs.nl/h5p/82/embed" width="740" height="830" frameborder="0" allowfullscreen="allowfullscreen" lang="en" scrolling="no"></iframe>
    

???+ meer-leren "Classes importeren"

    Wat is nu het praktisch nut van classes en methods gebruiken in plaats van functies? Want in plaats van
    ``` py
    forward(master_oogway, distance=50)
    ```
    hebben we nu
    ``` py
    master_oogway.forward(distance=50)
    ```
    en dat is even lang. Het grote voordeel ontstaat pas wanneer de class ingewikkelder wordt en meer data gaat bewaren. Ook kun je de class in een ander pythonbestand (bijvoorbeeld {{file}}`animals.py`) zetten en alle functionaliteit in één keer importeren met:
    ``` py
    from animals import Turtle

    master_oogway = Turtle()
    ...
    ```
    Op deze manier kun je code ook makkelijker delen en verspreiden. Zodra je een class definieert zal Visual Studio Code tijdens het programmeren je code automatisch aanvullen. Zodra je typt `#!py master_oogway.f` hoef je alleen maar op ++tab++ te drukken en VS Code vult de rest aan.





!!! opdracht-basis "Class Particle"
    Maak een class `#!py Particle` die de naam van het deeltje en de spin van het deeltje bewaard. Een method `#!py is_up_or_down()` vertelt je of het deeltje spin omhoog (positief) of spin omlaag (negatief) heeft. Maak nog een method `#!py flip()` die de spin van het deeltje omkeert. De volgende code zou moeten werken:
    ``` py
    proton = Particle('mooi proton', 0.5)
    proton.is_up_or_down()
    # 'up'
    proton.flip()
    proton.is_up_or_down()
    # 'down'
    print(proton.spin)
    # -0.5
    print(proton.name)
    # 'mooi proton'
    ```


!!! opdracht-inlever "Class ElectronicLoadMeasurements"
    Schrijf een class `#!py ElectronicLoadMeasurements` waarmee je spanningsmetingen aan een weerstand (_load_) kunt bewaren. De class moet voldoen aan deze eisen:
    
    1. Een method `#!py add_measurement(R, U)` waarmee je een gekozen weerstandswaarde en een gemeten spanning kunt toevoegen aan de lijst van metingen.
    1. Een method `#!py get_loads()` om de gekozen weerstanden in één keer terug te vragen.
    1. Een method `#!py get_voltages()` om de gemeten spanningen in één keer terug te vragen.
    1. Een method `#!py get_currents()` om een lijst stroomsterktes op te vragen, berekend op basis van de metingen.
    1. Een method `#!py get_powers()` om een lijst vermogens op te vragen, berekend op basis van de metingen.
    1. Een method `#!py clear()` waarmee je alle metingen in één keer kunt wissen.
    
    Test je class uitgebreid, je kunt het volgende scriptje als inspiratie gebruiken:
    ``` py
    measurements = ElectronicLoadMeasurements()
    measurements.add_measurement(R=10, U=.5)
    measurements.add_measurement(R=20, U=1.5)
    R = measurements.get_loads()
    # R=[10, 20]
    U = measurements.get_voltages()
    # U=[0.5, 1.5]
    P = measurements.get_powers()
    # P=[0.025, 0.1125]
    I = measurements.get_currents()
    # I=[0.05, 0.075]
    ```

???+ meer-leren "Subclass"
    ## Subclasses

    Je kunt behalve een class ook een _subclass_ aanmaken. De class `#!py Turtle` heeft hele handige methods maar je kunt een specifiekere class `#!py GiantTortoise` maken.

    ```py
    class GiantTortoise(Turtle):
    def __init__(self):
        super().__init__()
        self.shape("turtle")
        self.color("dark green")
        self.turtlesize(5)
        self.speed(1)

    def move(self, distance):
        steps = range(0, distance, 5)
        i = 1
        for step in steps:
            self.tiltangle(i * 5)
            self.forward(step)
            time.sleep(1)
            i = i * -1
    ```
    
    Door de parentclass `#!py Turtle` tussen ronde haakjes mee te geven aan de nieuwe subclass `#!py GiantTortoise` krijgt de subclass alle functionaliteit mee van de parentclass, waaronder alle methods zoals `#!py forward()`. Als je in de init-method van de subclass methods of attributes wilt gebruiken van de parentclass, moet je ervoor zorgen dat de parentclass is geïnitialiseerd . Dit doe je met `#!py super().__init__()` hierbij verwijst `#!py super()` naar de parentclass en met `#!py __init__()` voer je de init-method van de parentclass uit. 
    Nadat we in de init-method van de subclass de eigenschappen van de Reuzenschildpad hebben gedefinieerd, kunnen we extra functionaliteit gaan toevoegen bijvoorbeeld de manier van bewegen met de method `#!py move()`. 

    !!! opdracht-meer "`#!py super().__init__()`"
        1. Maak een bestand aan waarin je de subclass `GiantTortoise` aanmaakt.
        1. Zorg dat de volgende voorbeeldcode werkt:
        ```py
        t = GiantTortoise()
        t.move(50)
        ```
        1. Wat gebeurd er als je `#!py super().__init__()` weglaat?
    

    !!! opdracht-meer "Hawksbill turtle"
        1. Maak een subclass aan voor de Hawksbill turtle.
        1. De Hawksbill turtle is een zeeschildpad. Maak de omgeving van de schildpad standaard blauw met `#!py self.screen.bgcolor("cyan")`.
        1. Schrijf een method `#!py swim()` die de schildpad over het scherm laat bewegen. 
    