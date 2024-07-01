# Classes

Voor een snelle meting is het script dat je geschreven hebt bij [opdracht _quick 'n dirty_ meting](basisscript.md#opd:quickndirty-meting) en [opdracht _Pythondaq: CSV_](basisscript.md#opd:quickndirty-csv) prima! Maar als de meetapparatuur ingewikkelder wordt (meer verschillende commando's) of je wilt meer aanpassingen doen, dan is het wel lastig dat je op allerlei plekken de commando's opnieuw moet programmeren &mdash; en eerst moet opzoeken. Als je een nieuw script schrijft moet je opnieuw goed opletten dat je de goede _terminator characters_ gebruikt, etc. Het is wat werk, maar toch heel handig, om je code op te splitsen en een _class_ te schrijven.

Een class is eigenlijk een groep functies die je bij elkaar pakt en die met elkaar gegevens kunnen delen. Zodra een programma wat complexer wordt merk je dat het fijn kan zijn om variabelen op te sluiten in geïsoleerde omgevingen. Wanneer je bijvoorbeeld de volgende code schrijft gaat er mogelijk iets mis:
``` py
# find first student in alphabetical sorted list
names = ["Bob", "Alice", "Charlie"]
first_name = sorted(names)[0]
# first_name='Alice'
...
# split first and last name based on space character
first_name, last_name = "Carl Sagan".split(" ")
# first_name='Carl'
```
In bovenstaand voorbeeld waren we eerst op zoek naar de eerste naam in een alfabetisch gesorteerde lijst. Later in het programma splitsten we een naam op in een voornaam en een achternaam. Daarmee hebben we een variabele overschreven&hellip; Hoe langer het programma wordt, hoe makkelijker dat gebeurt.

Lange programma's worden vaak opgedeeld in functies en dat maakt het al een stuk makkelijker omdat functies hun eigen ruimte voor variabelen hebben. In het volgende geval wordt de variabele `#!py first_name` _niet_ overschreven:

``` py
def sort_and_find_first_name(names):
    return sorted(names)[0]


def find_last_name(name):
    first_name, last_name = name.split(" ")
    return last_name


first_name = sort_and_find_first_name(["Bob", "Alice", "Charlie"])
# first_name='Alice'
...
last_name = find_last_name("Carl Sagan")
# first_name='Alice'
# last_name='Sagan'
```

Een groot voordeel van functies is natuurlijk ook dat we ze vaker aan kunnen roepen. Ook helpt het de overzichtelijkheid als je goede namen geeft aan je functies. Soms kan het gebruiken van functies ook wat onhandig zijn &mdash; vooral als je gegevens wilt bewaren. Stel dat we voor een webshop code gaan schrijven die een <q>winkelmandje</q> inbouwt. We gaan de functionaliteit handmatig testen en uitbouwen. We beginnen als volgt:
``` py
cart = []

item = "Dune by Frank Herbert"
# ... some code to check that item is still available
# add item to cart
cart.append(item)

item = "Eon by Greg Bear"
# ... some code to check that item is still available
# add item to cart
cart.append(item)

item = "The Hunger Games by Suzanne Collins"
# ... some code to check that item is still available
# add item to cart
cart.append(item)

# removing an item
item = "Eon by Greg Bear"
# ... some code to check that item is actually in cart
cart.remove(item)

for item in cart:
    print(item)
# Dune by Frank Herbert
# The Hunger Games by Suzanne Collins
```

Vooral het implementeren van de controles dat producten nog leverbaar zijn is een hoop werk. Je besluit functies te gaan gebruiken zodat je die code maar op één plek hoeft te gebruiken:
``` py
def add_to_cart(cart, item):
    # ... some code to check that item is still available
    cart.append(item)


def remove_from_cart(cart, item):
    # ... some code to check that item is actually in cart
    cart.remove(item)


cart = []
add_to_cart(cart, "Dune by Frank Herbert")
add_to_cart(cart, "Eon by Greg Bear")
add_to_cart(cart, "The Hunger Games by Suzanne Collins")
remove_from_cart(cart, "Eon by Greg Bear")

for item in cart:
    print(item)
# Dune by Frank Herbert
# The Hunger Games by Suzanne Collins    
```

De code werkt nog op dezelfde manier, fijn! Het is alleen wel lastig dat je de hele tijd een variabele `#!py cart` moet meegeven aan de functies. Je bedenkt nog veel meer functies om de levertijd te controleren, om de bestelling op te splitsen in verschillende bezorgmomenten, om de bestelling af te rekenen, etc. Elke keer moet je dezelfde variabele blijven meegeven. Een oplossing is het gebruiken van een class. Je begint met een regel `#!py class Cart:` en daaronder plaats je de functies die je geschreven hebt &mdash; de zogeheten _methods_ van de class. Iedere method krijgt automatisch een parameter `#!py self` mee die verwijst naar de gedeelde geheugenopslag. Zo kun je een list `#!py self.contents` definiëren waarin we de producten in de bestelling bewaren. Opstarttaken kun je onderbrengen in de speciale method `#!py __init__()`. Als volgt:
``` py
class Cart:
    def __init__(self):
        self.contents = []

    def add_to_cart(self, item):
        # ... some code to check that item is still available
        self.contents.append(item)

    def remove_from_cart(self, item):
        # ... some code to check that item is actually in cart
        self.contents.remove(item)
```

Wanneer we deze class gaan gebruiken hoeven we de parameter `#!py self` _niet_ mee te geven, dat gaat automatisch. Wel moeten we de class eerst <q>klaarzetten</q> voor gebruik door hem aan te roepen:
``` py
cart = Cart()
cart.add_to_cart("Dune by Frank Herbert")
cart.add_to_cart("Eon by Greg Bear")
cart.add_to_cart("The Hunger Games by Suzanne Collins")
cart.remove_from_cart("Eon by Greg Bear")

for item in cart.contents:
    print(item)
# Dune by Frank Herbert
# The Hunger Games by Suzanne Collins
```
In bovenstaande code hebben we de _class_ `#!py Cart` en de _class instance_ `#!py cart`. Je kunt meerdere instances hebben van dezelfde class, bijvoorbeeld wanneer meerdere klanten in de webshop tegelijkertijd winkelmandjes vullen:
``` py
class Cart:
    ...

cart_alice = Cart()
...
cart_bob = Cart()
...
```

Je kunt je afvragen wat we hier precies nu mee gewonnen hebben. De code is wat veranderd, maar in plaats van
``` py
add_to_cart(cart, "Eon by Greg Bear")
```
hebben we nu
``` py
cart.add_to_cart("Eon by Greg Bear")
```
en dat is even lang. Het grote voordeel ontstaat pas wanneer de class ingewikkelder wordt en meer data gaat bewaren. Ook kun je de class in een ander pythonbestand (bijvoorbeeld {{file}}`my_webshop_backend.py` zetten en alle functionaliteit in één keer importeren met:
``` py
from my_webshop_backend import Cart

cart = Cart()
...
```
Op deze manier kun je code ook makkelijker delen en verspreiden. Zodra je een class definieert zal Visual Studio Code tijdens het programmeren je code automatisch aanvullen. Zodra je typt `#!py cart.add` hoef je alleen maar op ++tab++ te drukken en VS Code vult de rest aan.



!!! opdracht-basis "Opbouw van een class"

    1. Beschouw de onderstaande code
    1. Bespreek met elkaar wat de code precies doet en verplaast de onderdelen naar de juiste plek in de code.

    <iframe src="https://h5plti.avwebs.nl/h5p/82/embed" width="740" height="830" frameborder="0" allowfullscreen="allowfullscreen" lang="en" scrolling="no"></iframe>
    


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
    Je kunt behalve een class ook een _subclass_ aanmaken. Stel dat je een class `#!py Animal` hebt aangemaakt met handige methods en attributes maar je wilt een nieuwe, iets specifiekere class maken (bijvoorbeeld `#!py Cow`). Het is duidelijk dat een koe een dier is, maar een dier nog geen koe. Je kunt een subclass maken:
    ``` py
    class Cow(Animal):
        pass
    ```
    Het keyword `#!py pass` doet niets overigens. Met alleen dit statement heeft de class `#!py Cow` precies alle functionaliteit van de class `#!py Animal`. Je kunt daarna zelf nog extra methods en attributes definiëren.