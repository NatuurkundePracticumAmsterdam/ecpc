# Python voorkennis; Batteries (not yet) included

Python is een _batteries included_ taal. Dat betekent dat als je 'kaal' Python installeert er al heel veel functionaliteit standaard meegeleverd wordt. Allereerst omdat de taal zelf al behoorlijk krachtig is, maar ook omdat de _standaardbibliotheek_ zeer uitgebreid is. Met een eenvoudig `#!py import`-statement haal je extra functionaliteit binnen, onder andere op het gebied van datatypes, wiskunde, toegang tot bestanden, een database, datacompressie, cryptografie, netwerktoegang, e-mail, multimedia, etc. Nog veel meer bibliotheken zijn beschikbaar via de _Python Package Index_[@pypi].

In dit hoofdstuk behandelen we de kennis die nuttig kan zijn voor de rest van deze cursus. We gaan ervan uit dat iedereen bekend is met recente versies van Python en we gaan niet in op de -- soms ingrijpende -- veranderingen die de taal heeft ondergaan.[^python3] Een deel van wat we hier behandelen kan al bekend zijn uit eerdere cursussen. Een ander deel is nieuw.[^zelf programmeren]

[^python3]: Python 2 is dood. Leve Python 3!
[^zelf programmeren]:Tenzij je al veel zelf hebt geprogrammeerd in Python, buiten de cursussen om.


In de cursus gaan we bibliotheken (_modules, packages_) en een applicatie ontwikkelen. Dat betekent dat we verder gaan dan het schrijven van _scripts_ en dat we dus meer gaan doen dan functies schrijven. Uiteindelijk moet het mogelijk zijn de software te verspreiden op een wat meer professionele manier. Dus niet alleen via een zipje met wat Pythonbestanden waar uiteindelijk verschillende versies van rondslingeren en die lastig zijn te updaten. Wat er nodig is voor een goede distributie van software en om het mogelijk te maken met meerdere mensen software te (blijven) ontwikkelen zal in deze cursus aan bod komen.

Een punt wat vaak onderschoven blijft is _documentatie_. Als je software schrijft die gebruikt (en doorontwikkeld) wordt in een onderzoeksgroep, dan is het heel belangrijk dat iedereen kan begrijpen wat je software doet en hoe die uitgebreid kan worden. Het is zonder hulp vaak heel moeilijk om de code van een iemand anders te begrijpen. En in de praktijk blijkt heel vaak dat als je code schrijft en daar een paar weken of maanden later op terugkijkt, jij zélf die ander bent. Wat toen blijkbaar heel logisch leek, is dat later toch niet meer. Dus documentatie schrijf je heel vaak ook gewoon voor jezelf.

Als je niet zo heel veel in Python geprogrammeerd hebt kan het helpen om de [paragraaf over de cursus _inleiding programmeren_](voorkennis.md#inleiding-programmeren-terugblik)[@inl_prog] door te nemen. Een boek dat zeker bij natuurkundigen in de smaak kan vallen is _Effective Computation in Physics_[@eff_comp_physics], maar deze is niet gratis verkrijgbaar. Een boek dat zowel op papier te bestellen is als in de vorm van een pdf of webpagina is te lezen is _Think Python_.[@think_python]


## Zen of Python

Python is niet C (of iedere willekeurige andere programmeertaal). Er zit een gedachte achter die op een gegeven moment verwoord is door Tim Peters[@zenofpython].
<!-- % \begin{verse}
%   The Zen of Python, by Tim Peters

%   Beautiful is better than ugly.\\
%   Explicit is better than implicit.\\
%   Simple is better than complex.\\
%   Complex is better than complicated.\\
%   Flat is better than nested.\\
%   Sparse is better than dense.\\
%   Readability counts.\\
%   Special cases aren't special enough to break the rules.\\
%   Although practicality beats purity.\\
%   Errors should never pass silently.\\
%   Unless explicitly silenced.\\
%   In the face of ambiguity, refuse the temptation to guess.\\
%   There should be one-- and preferably only one --obvious way to do it.\\
%   Although that way may not be obvious at first unless you're Dutch.\\
%   Now is better than never.\\
%   Although never is often better than *right* now.\\
%   If the implementation is hard to explain, it's a bad idea.\\
%   If the implementation is easy to explain, it may be a good idea.\\
%   Namespaces are one honking great idea -- let's do more of those!
% \end{verse} -->

Je kunt het lezen middels een _easter egg_ in Python zelf: `#!py import this`.

!!! opdracht-basis "zen"
    Open een Python terminal en type in:
    ``` ps1 title="Terminal"
    import this
    ```

Deze tekst kan nog behoorlijk cryptisch overkomen, maar een paar dingen worden snel duidelijk: code moet _mooi_ zijn (regel 1) en duidelijk (regels 2, 3 en 6). Er bestaan prachtige programmeertrucs in één of twee regels, maar onleesbaar is het wel. Een voorbeeld [@contemplating_zenofpython]:
``` py
print('\n'.join("%i bytes = %i bits which has %i possible values." %
      (j, j*8, 256**j) for  j in (1 << i for i in range(4))))
```

Kun je zien wat de uitvoer van dit programma moet zijn? Misschien als we het op deze manier uitschrijven:

``` py
for num_bytes in [1, 2, 4, 8]:
    num_bits = 8 * num_bytes
    num_possible_values = 2 ** num_bits
    print(
        f"{num_bytes} bytes = {num_bits} bits which has {num_possible_values} possible values."
    )
```
De code is langer, met duidelijkere namen van variabelen en zonder bitshifts of joins. De uitvoer zie je hieronder.

``` ps1 title="Terminal"
1 bytes = 8 bits which has 256 possible values.
2 bytes = 16 bits which has 65536 possible values.
4 bytes = 32 bits which has 4294967296 possible values.
8 bytes = 64 bits which has 18446744073709551616 possible values.
```

Moraal van dit verhaal: we worden gelukkiger van code die leesbaar en begrijpelijk is, dan van code die wel heel slim in elkaar zit maar waar bijna niet uit te komen is. Overigens komt het regelmatig voor dat de programmeur zélf een paar weken later al niet zo goed meer weet hoe de code nou precies in elkaar zat.

Als je samenwerkt aan software kan het andere Pythonprogrammeurs erg helpen om dingen 'op de Python-manier te doen'. Een C-programmeur herken je vaak aan het typische gebruik van lijsten of arrays in `#!py for`-loops. Als je een lijst hebt: `#!py names = ['Alice', 'Bob', 'Carol']`, doe dan niet:
``` py
i = 0
while i < len(names):
    print("Hi,", names[i])
    i = i + 1
```
of:
``` py
for i in range(len(names)):
    print("Hi,", names[i])
```
waarbij je loopt over een index `#!py i`. Gebruik liever het feit dat een lijst al een _iterator_ is:
``` py
for name in names:
    print("Hi,", name)
```
Deze code is bovendien veel korter en gebruikt minder variabelen. Soms is het nodig om de index te hebben, bijvoorbeeld wanneer je een namenlijstje wilt nummeren:
``` ps1 title="Terminal"
1. Alice
2. Bob
3. Carol
```

Dit kan dan in Python-code het makkelijkst als volgt:
``` py
for idx, name in enumerate(names, 1):
    print(f"{idx}. {name}")
```
Hier maken we gebruik van de `#!py enumerate(iterable, start=0)`-functie en de (relatief recent geïntroduceerde) f-strings. Er zijn dus veel manieren om programmeerproblemen op te lossen, maar het helpt om het op de `Pythonmanier' te doen. Andere programmeurs zijn dan veel minder tijd en energie kwijt om jouw code te begrijpen -- én andersom wanneer jij zelf op internet zoekt naar antwoorden op problemen. Immers, je herkent dan veel makkelijker en sneller hoe andermans code werkt.

  
## Datatypes

Gehele getallen, kommagetallen, strings: allemaal voorbeelden van _datatypes_. Veel zullen jullie al wel bekend voorkomen, zoals strings, lists en NumPy arrays. Andere zijn misschien alweer wat weggezakt, zoals dictionaries of booleans. Weer andere zijn misschien wat minder bekend, zoals complexe getallen of sets. En als laatste voegt Python af en toe nieuwe datatypes toe, zoals _f-strings_ in Python 3.6 of _data classes_ sinds Python 3.7.

!!! info
    De _python-standard-library_ documentatie [@python-standard-library] bevat een mooi overzicht van alle datatypes met een beschrijving van operaties en eigenschappen. Voor uitgebreidere tutorials kun je vaak terecht bij _real-python_ [@real-python]. Het kan makkelijk zijn om in een zoekmachine bijvoorbeeld `real python dict` te typen als je een tutorial zoekt over Python dictionaires.

Om nog even te oefenen met de datatypes volgt er een aantal korte opdrachten.

!!! opdracht-basis "list"
    Schrijf een kort scriptje.
    
      1. Maak een `#!py list` van de wortels van de getallen 1 tot en met 10. Dus de rij $\left(\sqrt{1}, \sqrt{2}, \sqrt{3}, \ldots, \sqrt{10}\right)$.
      1. Print die rij onder elkaar (één getal per regel, met drie decimalen).
      1. Geef weer of het getal 3 voorkomt in die rij en geef weer of het getal 4 voorkomt in die rij.
    


!!! opdracht-basis "np.array"
    Doe hetzelfde als de vorige opdracht, maar nu met NumPy arrays.


!!! opdracht-basis "f-strings"
    Herschrijf het volgende script door f-strings te gebruiken:
    ``` py
    print("Enter your name and press return:")
    name = input()
    length_name = len(name)
    
    print(
        "Hi %s, your name has %d letters and the first letter is a %c."
        % (name, length_name, name[0])
    )
    ```

### dictionaries, tuples, * args, ** kwargs and sets

??? meer-leren "Meer leren"

    Dictionaries zijn een bijzonder handige manier om informatie op te slaan. Een dictionary bestaat uit een of meerder key-value tweetallen. Met een handige gekozen naam voor de key kan je betekenis geven aan een value. 

    !!! opdracht-meer "dict"
        Schrijf een kort scriptje:
        
        1. Maak een dictionary `constants` met de waardes van de (natuur)constantes $\pi$, de valversnelling $g$, de lichtsnelheid $c$ en het elementaire ladingskwantum $e$.
        1. Print de namen -- niet de waardes -- van de constantes die zijn opgeslagen in `constants`.
        1. Bereken de zwaartekracht $F_\text{z} = mg$ voor een voorwerp met een massa van 14 kg door gebruik te maken van de waarde van $g$ uit de dictionary.
        1. Maak een dictionary `measurement` die de resultaten van een meting bevat: een spanning van 1.5 V bij een stroomsterkte van 75 mA.
        1. Bereken de weerstand van de schakeling op basis van de voorgaande meting en bewaar het resultaat in dezelfde dictionary.
        


    In Python zijn `#!py tuple`'s een soort <q>alleen-lezen</q> `#!py list`'s. Een tuple is een _immutable[^immutable] object_. Daarom worden ze vaak gebruikt wanneer lijstachtige objecten altijd dezelfde vorm moeten hebben. Bijvoorbeeld een lijst van $(x, y)$-coördinaten zou je zo kunnen definiëren:
    [^immutable]: Letterlijk: onveranderbaar.

    ``` py
    coords = [(0, 0), (1, 0), (0, 1)]
    ```
    Hier is `#!py coords[0]` gelijk aan `#!py (0, 0)`. Je kunt nu _niet_ dit coördinaat uitbreiden naar drie dimensies met `#!py coords[0].append(1)` en dat is waarschijnlijk precies wat je wilt voor een lijst met tweedimensionale coördinaten. Ook is dit object veel compacter dan een `#!py dict`:
    ``` py
    coords = [{"x": 0, "y": 0}, {"x": 1, "y": 0}, {"x": 0, "y": 1}]
    ```
    Hier zijn tuples dus best handig, al moet je dus wel onthouden in welke volgorde de elementen staan. Dat is voor $(x, y)$-coördinaten niet zo'n probleem maar kan in andere situaties lastiger zijn.[^tuple] Tuples ondersteunen _tuple unpacking_. Je kunt het volgende doen:
    [^tuple]:Daar is bijvoorbeeld de `#!py collections.namedtuple()` dan weer handig voor.

    ``` py
    (x, y, z) = (2, 3, 4)
    ```
    Na deze operatie geldt $x = 2$, $y = 3$ en $z = 4$. Je mag zelfs de haakjes weglaten voor nog compactere notatie:
    ``` py
    x, y, z = 2, 3, 4
    ```
    Op deze manier kan een functie ook meerdere argumenten teruggeven die je vervolgens uit elkaar plukt:
    ``` py
    def get_measurement():
        ...  # perform measurement
        return voltage, current


    voltage, current = get_measurement()
    ```
    Het uit elkaar plukken van argumenten kan zelfs als je een functie aanroept:
    ``` py
    def power(a, b):
        return a ** b


    # regular function call
    power(2, 7)

    # function call with tuple unpacking
    args = 2, 7
    power(*args)
    ```
    Wat zelfs werkt is _dictionary unpacking_. Je kunt aan functies ook argumenten bij naam meegeven -- de volgorde maakt dan niet uit en je maakt in je programma expliciet duidelijk welke argumenten je meegeeft. Dat werkt zo:
    ``` py
    # regular function call
    power(b=7, a=2)

    # function call with dictionary unpacking
    kwargs = {"b": 7, "a": 2}
    power(**kwargs)
    ```

    !!! opdracht-meer "odds"
        Gegeven de lijst `#!py odds = [1, 3, 5, 7, 9]`, print de waardes uit deze lijst op één regel. Je mag er niet vanuit gaan dat de lijst altijd 5 elementen bevat.


    Als laatste willen we nog de aandacht vestigen op `#!py set`'s: een unieke verzameling van objecten. Ieder element komt maar één keer voor in een set:
    ``` py
    l = [1, 2, 2, 3, 5, 5]
    set(l)
    # {1, 2, 3, 5}
    ```
    Je moet even oppassen: de `#!py {}`-haakjes worden gebruikt voor zowel sets als dictionaries. Omdat een dictionary (key: value) paren heeft en een set losse elementen kan Python het verschil wel zien:
    ``` py
    is_set = {1, 2, 3, 4}
    is_dict = {1: 1, 2: 4, 3: 9, 4: 16}
    ```
    Dat gaat alleen mis als je een _lege_ set wilt maken. Daarvoor zul je expliciet de `#!py set()`-constructor moeten gebruiken:
    ``` py
    is_dict = {}
    is_set = set()
    ```
    Je kunt elementen toevoegen aan een set met `#!py .add()` en sets gebruiken om verzamelingen met elkaar te vergelijken. Komen er elementen wel of niet voor in een set? Is de ene set een subset van de andere set? Enzovoorts. Zie daarvoor verder de documentatie.


## Arrays en comprehensions

NumPy arrays zijn vaak handiger dan lists. Als je een array hebt van 20 $x$-waardes in het domein $[0, \pi]$ kun je in één keer alle waardes van $\sin x$ uitrekenen. Bijvoorbeeld:
``` py
# from numpy import pi, linspace, sin
x = linspace(0, pi, 20)
y = sin(x)
```
NumPy voert de berekeningen uit binnen een C-bibliotheek[^C] en is daarmee veel sneller dan een berekening in Python zelf:

[^C]: De programmertaal C ligt dichter bij machinetaal dan Python en is daarmee veel sneller maar ook veel minder geavanceerd.

``` py
# x = [list of x-values]
y = []
for u in x:
    y.append(sin(u))
```
Niet alleen is NumPy zo'n honderd keer sneller,[^numpy] het is ook veel korter op te schrijven. Het nadeel van NumPy arrays is dat je geen elementen kunt toevoegen.[^arrays] Python lijsten hebben dus voordelen, zeker als rekentijd geen probleem voor je is.

[^numpy]:Echt. De sinus van 2000 $x$-waardes berekenen kostte NumPy in een test 11.6$\micro$s en de for-loop wel 1357.7$\micro$s.
[^arrays]:Strikt genomen is dit niet helemaal waar. Je kunt een nieuwe array creëren door meerdere arrays aan elkaar te plakken. Maar een eenvoudige `#!py append()`-method bestaat niet voor arrays.

Als je veel functies uit NumPy gebruikt is het handig -- en gebruikelijk -- om je import-statements kort te houden en duidelijk te maken dat je de `#!py sin()`-functie uit NumPy gebruikt en niet uit de `#!py math` module. Constantes worden wel vaak los geïmporteerd:
``` py
import numpy as np
from numpy import pi

x = np.linspace(0, pi, 100)
y = np.sin(x)
```

### comprehensions

Door gebruik te maken van een _list comprehension_ kun je de for-loop in één regel opschrijven:
``` py
# x = [list of x-values]
y = [sin(u) for u in x]
```
Er is in veel gevallen tegenwoordig geen groot verschil met een for-loop qua snelheid. In andere gevallen is de list comprehension net wat sneller. Als je lijsten niet te lang zijn is het makkelijker (en sneller) om een list comprehension te gebruiken in plaats van je lijst éérst naar een array te veranderen en er dan mee verder te rekenen. Als je lijst wél lang is of je weet al dat je meerdere berekeningen wilt uitvoeren kan dat wel:
``` py
# from numpy import sin, array
# x = [list of x-values]
x = array(x)
y = sin(x)
```

Kortom: _berekeningen_ met arrays zijn sneller, maar for-loops (en list comprehensions) zijn veelzijdiger. Het is zelfs mogelijk om een `#!py if`-statement op te nemen in je list comprehension. Bijvoorbeeld:
``` py
filenames = ["test.out", "text.pdf", "manual.pdf", "files.zip"]
pdfs = [name for name in filenames if name.endswith(".pdf")]
# pdfs=['text.pdf', 'manual.pdf']
```
In een for-loop heb je daar meer ruimte voor nodig. Naast list comprehensions heb je ook _set comprehensions_[^{}] en _dict comprehensions_.

[^{}]: Notatie hetzelfde, maar gebruik nu `#!py {`}-haakjes.

!!! opdracht-basis "array, for-loops en comprehensions"
    Voer, door een script te schrijven, de volgende opdrachten uit:
    
    1. Maak een lijst van de getallen 1 tot en met 10.
    1. Gebruik een 'gewone' _for_-loop om een lijst te maken van de derdemachtswortel van de getallen.
    1. Maak nogmaals een lijst van de derdemachtswortel van de getallen maar gebruik nu list comprehension.
    1. Gebruik tot slot arrays om de lijst met derdemachtswortels van de getallen te maken. 


## Lambda functions

??? meer-leren "meer leren"
    In Python zijn functies ook objecten. Je kunt ze bewaren in een lijst of dictionary, of je kunt ze meegeven als parameter aan een andere functie. Dat kan heel handig zijn! Stel je hebt een lijst met verschillende soorten fruit die je wilt sorteren op alfabet:
    ``` py
    a = ["kiwi", "banana", "apple"]
    sorted(a)
    # ['apple', 'banana', 'kiwi']
    ```
    Dat gaat heel makkelijk met de ingebouwde `#!py sorted()`-functie. Je kunt aan deze functie ook een `key`-parameter meegeven; een ándere functie die gebruikt wordt om te bepalen waarop gesorteerd moet worden. Zo kun je sorteren op de _lengte_ van de fruitnamen door simpelweg de `#!py len()`-functie als parameter mee te geven:
    ``` py
    len("apple")
    # 5
    sorted(a, key=len)
    # ['kiwi', 'apple', 'banana']
    ```
    Als je wilt sorteren op de tweede letter van de naam -- waarom niet? -- dan kun je zelf een functie definiëren en gebruiken:
    ``` py
    def second_letter(value):
        return value[1]

    second_letter("lemon")
    # e
    sorted(a, key=second_letter)
    # ['banana', 'kiwi', 'apple']
    ```
    Lambdafuncties zijn bedacht om je een hoop typewerk te besparen. Je kunt korte functies in één regel opschrijven en gebruiken, zolang het maar een geldige _expression_ is. Géén if-then-else, maar de meeste andere dingen mogen wel. Bijvoorbeeld:
    ``` py
    squared = lambda x: x ** 2
    squared(4)
    # 16

    second_letter = lambda x: x[1]
    sorted(a, key=second_letter)
    # ['banana', 'kiwi', 'apple']
    ```
    Aangezien de definitie van een lambdafunctie zelf ook een expression is kun je het sorteren op de tweede letter zelfs in één regel doen:
    ``` py
    sorted(a, key=lambda x: x[1])
    # ['banana', 'kiwi', 'apple']
    ```

    Lambdafuncties kom je ook tegen als je wilt fitten aan een bepaald model. Je definiëert je model dan in één regel met een lambdafunctie:[^lmfit]

    [^lmfit]: Het is hierbij wel belangrijk dat `#!py lmfit` er vanuit gaat dat de eerste variabele in de functiedefinitie de onafhankelijke variabele ($x$-as) is. Dit is verder geen Pythonlimitatie.

    ``` py
    # from lmfit import models
    f = lambda x, a, b: a * x + b
    model = models.Model(f)
    fit = model.fit(y, x=x)
    ```
    Je kunt de functies ook bewaren in een dictionary voor later gebruik.

    !!! opdracht-meer "lambda"
        Maak een dictionary `models` met functies voor een lineaire functie `linear` gegeven door $y = ax + b$, een kwadratische functie `quadratic` gegeven door $y = ax^2 + bx + c$ en een sinusfunctie `sine` gegeven door $a + b\sin(cx + d)$. Hierna moet de volgende code werken:
        ``` py
        f = models['linear']
        f(5, a=2, b=3)
        # 13
        ```
        Maak een grafiek van de sinusfunctie op het domein $[0,\, 2\pi]$ met parameters $a=1$, $b=2$, $c=2$ en $d=\frac{\pi}{2}$.



## Generators

??? meer-leren "meer leren"
    Als een functie een serie metingen verricht kan het lang duren voordat de functie de resultaten teruggeeft. Laten we die functie even `#!py perform_measurements()` noemen. Het is soms lastig als de rest van het programma daarop moet wachten voordat een analyse kan worden gedaan, of een melding aan de gebruiker kan worden gegeven. Het kan dan gebeuren dat je je programma draait en je dan afvraagt: <q>doet hij het, of doet hij het niet?</q> Je kunt dit oplossen door `#!py print()`-statements in je programma op te nemen, maar dit is niet zo netjes. Als je `#!py perform_measurements()` inbouwt in een tekstinterface die ook <q>stil</q> moet kunnen zijn? Of als je de functie gaat gebruiken vanuit een grafisch programma waarin je geen tekst wilt printen, maar een grafiek wilt opbouwen? Je moet dan steeds `#!py perform_measurements()` gaan aanpassen. Een ander probleem kan optreden wanneer je langdurige metingen doet die ook veel geheugen innemen. Wachten op de hele meetserie betekent dat het geheugen vol kan lopen. Lastig op te lossen!

    Of&hellip; je maakt gebruik van een _generator function_: een functie die tussendoor resultaten teruggeeft. Dat kan door gebruik te maken van `#!py yield` in plaats van `#!py return`. De rest gaat automatisch. Maar: je moet wel even weten hoe je omgaat met de generator. Stel, we willen de kwadraten berekenen van een reeks getallen tot een bepaald maximum:
    ``` py
    def calculate_squares_up_to(max_number):
        """Calculate squares of all integers up to a maximum number"""
        squares = []
        for number in range(max_number):
            squares.append(number ** 2)
        return squares

    calculate_squares_up_to(5)
    # [0, 1, 4, 9, 16]
    ```
    De functie berekent eerst alle kwadraten, voegt ze toe aan een lijst en geeft vervolgens de lijst met uitkomsten terug. Een generator definieer je als volgt:
    ``` py
    def calculate_squares_up_to(max_number):
        """Generate squares of all integers up to a maximum number"""
        for number in range(max_number):
            yield number ** 2
    ```
    Lekker kort, want we hoeven geen lijst bij te houden! Als je de functie aanroept krijg je geen resultaat terug, maar een _generator_. Als je de waardes wil zien dan gebruik je `#!py next()`, als volgt:
    ``` py
    square_generator = calculate_squares_up_to(5)
    next(square_generator)
    # 0
    next(square_generator)
    # 1
    ...
    next(square_generator)
    # 16
    next(square_generator)
    # StopIteration
    ```
    Als de generator is uitgeput (de for-loop is afgelopen, de functie sluit af) dan geeft Python een `#!py StopIteration` exception en crasht het programma -- tenzij je de exception afvangt. Het werkt, maar het is niet helemaal ideaal. Makkelijker is om de generator te gebruiken in een loop:
    ``` py
    for square in calculate_squares_up_to(5):
        print("Still calculating...")
        print(square)

    # Still calculating...
    # 0
    # Still calculating...
    # 1
    # Still calculating...
    # 4
    # Still calculating...
    # 9
    # Still calculating...
    # 16
    ```
    Dit kan ook in list comprehensions. En als je _toch_ wilt wachten op alle resultaten, dan kan dat eenvoudig met `#!py squares = list(calculate_squares_up_to(5))`.

    !!! opdracht-meer "generators"
        Schrijf een generator function die het _vermoeden van Collatz_ illustreert. Dat wil zeggen: beginnend bij een getal $n$, genereer het volgende getal als volgt: is het getal _even_, deel het dan door twee; is het getal _oneven_, vermenigvuldig het met 3 en tel er 1 bij op. Enzovoorts. Sluit de generator af als de uitkomst gelijk is aan 1. Dat is het vermoeden van Collatz: ongeacht met welk geheel getal je begint, je komt altijd op 1 uit. Als voorbeeld, beginnend bij het getal 3 krijg je de reeks 3, 10, 5, 16, 8, 4, 2, 1.



### Dunder methods

??? meer-leren "meer leren"
    Hoe _weet_ Python eigenlijk wat de lengte is van een string? Of hoe je getallen optelt? Voor operatoren als `#!py + - * / **` wordt eigenlijk een _method_ aangeroepen. bijvoorbeeld `#!py __add__()` voor `#!py +`, en `#!py __mul__()` voor `#!py *`. Een ingebouwde functie als `#!py len()` roept stiekem de _method_ `#!py __len__()` aan en `#!py print()` print de uitvoer van `#!py __str__()`. Zulke methodes worden _dunder methods_[^dunder] of _magic methods_ genoemd. We kunnen zelf bijvoorbeeld een vector introduceren waarbij we de operatoren voor onze eigen doeleinden gebruiken [@operator_overloading]. We definiëren het optellen van vectoren en de absolute waarde (norm) van de vector:

    [^dunder]: Dunder staat voor _double underscore_, de twee lage streepjes die om de naam heen staan.

    ``` py
    class Vector:
        def __init__(self, x, y):
            self.x = x
            self.y = y

        def __add__(self, other):
            new_x = self.x + other.x
            new_y = self.y + other.y
            return Vector(new_x, new_y)

        def __abs__(self):
            return (self.x ** 2 + self.y ** 2) ** .5
    ```
    De speciale `#!py __init__()` methode zorgt voor de initialisatie van de klasse en de eerste parameter die alle methodes meekrijgen verwijst naar zichzelf en wordt dus gewoonlijk `#!py self` genoemd.[^niet_doen] Met de regel `#!py self.x = x` wordt de parameter `#!py x` bewaard voor later gebruik. Je kunt de klasse gebruiken op de volgende manier:

    [^niet_doen]: Maar dat is niet verplicht, je mag in principe zelf een naam kiezen. Doe dat echter niet.

    ``` ps1 title="Terminal"
    >>> v1 = Vector(0, 1)
    >>> v2 = Vector(1, 0)
    >>> abs(v1)
    1.0
    >>> abs(v2)
    1.0
    >>> abs(v1 + v2)
    1.4142135623730951
    >>> (v1 + v2).x, (v1 + v2).y
    (1, 1)
    >>> v1 + v2
    <__main__.Vector object at 0x7fdf80b3ae10>
    >>> print(v1 + v2)
    <__main__.Vector object at 0x7fdf80b45450>
    ```
    In de eerste regels maken we twee vectoren **v_1** en **v_2** en berekenen de lengtes[^norm] **||v_1||**, **||v_2||** en **||v_1 + v_2||**. Ook kunnen we de coördinaten van de som bekijken. Het gaat mis als we de somvector willen printen of willen kijken wat voor object het is. We krijgen technisch juiste, maar totaal onbruikbare informatie terug. Dit lossen we op met het definiëren van `#!py __str__()`, gebruikt door `#!py str()` en dus ook `#!py print()`, en `#!py __repr__()`, gebruikt door `#!py repr()` en de Python interpreter.[^subtiel_verschil]

    [^norm]: Absolute waarde of beter, _norm_, van een vector is eenvoudig gezegd haar lengte.
    [^subtiel_verschil]: Het verschil tussen de twee is subtiel. De Pythondocumentatie geeft aan dat de `#!py __repr__` altijd ondubbelzinnig moet zijn, terwijl de `#!py __str__` vooral leesbaar moet zijn. Voor eenvoudige objecten zijn ze veelal gelijk.

    ``` py
    class Vector:
        ...
        def __repr__(self):
            return f"Vector: ({self.x}, {self.y})"

        def __str__(self):
            # roept __repr__ aan
            return repr(self)
    ```
    ``` ps1 title="Terminal"
    >>> v1 + v2
    Vector: (1, 1)
    >>> print(v1 + v2)
    Vector: (1, 1)
    ```
    We raden je aan altijd een zinnige `#!py __str__` en `#!py __repr__` te definiëren.

    Vaak hebben classes geen dunder methods nodig (behalve `#!py __repr__` en `#!py __str__`).

    Je kunt behalve een class ook een _subclass_ aanmaken. Stel dat je een class `#!py Animal` hebt aangemaakt met handige methods en attributes maar je wilt een nieuwe, iets specifiekere class maken (bijvoorbeeld `#!py Cow`). Het is duidelijk dat een koe een dier is, maar een dier nog geen koe. Je kunt een subclass maken:
    ``` py
    class Cow(Animal):
        pass
    ```
    Het keyword `#!py pass` doet niets overigens. Met alleen dit statement heeft de class `#!py Cow` precies alle functionaliteit van de class `#!py Animal`. Je kunt daarna zelf nog extra methods en attributes definiëren.


## Decorators

??? meer-leren "meer leren"
    Functies zijn ook objecten in Python. Je kunt ze, zoals we eerder gezien hebben, meegeven als argument of bewaren in een dictionary. Ook kun je functies in functies definiëren en functies definiëren die functies teruggeven. Vaag[^Calmcode]. Ik moet hier altijd weer even over nadenken en daarom mag je dit stukje overslaan. Om decorators te _gebruiken_, hoef je niet per se te weten hoe ze _werken_.

    [^Calmcode]: Calmcode doet een goeie poging om dit rustig uit te leggen, kijk daarvoor op [https://calmcode.io/decorators/functions.html](https://calmcode.io/decorators/functions.html)

    <!-- % Met decorators kan je functionaliteit aan een functie toevoegen.  -->
    Decorators worden vaak gebruikt om het gedrag van een functie aan te passen.


    <!-- %   Ik vind dit voorbeeld best lastig, maar misschien komt dat dus omdat mijn hoofd zich de hele tijd afvraagd, maar WAAROM zou je dat willen of WAAROM zou je dat doen. -->


    Stel je hebt een functie die eenvoudig twee getallen vermenigvuldigd. Je wilt deze functie, zonder hem van binnen te veranderen, aanpassen zodat hij altijd het kwadraat van de vermenigvuldiging geeft. Dus niet $a\cdot b$, maar $(a\cdot b)^2$. Dat kan als volgt:

    <!-- %   Het voorbeeld is al vrij abstract, misschien maakt 'f' het als functienaam nog abstracter. Misschien moeten we hem gewoon multiply noemen. -->

    ``` py
    def f(a, b):
        return a * b


    def squared(func, a, b):
        return func(a, b) ** 2

    f(3, 4)
    # 12
    squared(f, 3, 4)
    # 144
    ```
    Het werkt, maar we moeten er wel steeds aan denken om `#!py squared()` aan te roepen en dan óók nog de functie `#!py f()` als eerste argument mee te geven. Lastig. Maar omdat functies objecten zijn kan dit ook:
    ``` py linenums="1"
    def squared_func(func):
        def inner_func(a, b):
            return func(a, b) ** 2

        return inner_func


    g = squared_func(f)
    g(3, 4)
    # 144

    ```

    Hier gebeurt iets geks&hellip; Om te begrijpen wat hier gebeurt moeten we een beetje heen en weer springen. In regel 8 roepen we de functie `#!py squared_func(f)` aan. In regel 5 zien we dat die functie een andere functie teruggeeft -- die _niet_ wordt aangeroepen! In regel 8 wordt die functie bewaard als `#!py g` en pas in regel 9 roepen we hem aan. De functie `#!py g()` is dus eigenlijk gelijk aan de functie `#!py inner_func()` die in regels 2--3 gedefinieerd wordt. De aanroep in regel 9 zorgt er uiteindelijk voor dat in regel 3 de oorspronkelijke functie `#!py f(a, b)` wordt aangeroepen en dat het antwoord gekwadrateerd wordt. Dit is echt wel even lastig.

    <!-- % \begin{todo}
    %   Als we studenten nog niet kwijt waren, dan raken we ze hier wel kwijt. De stap van a en b naar *args en **kwargs is best groot. Misschien kunnen we eerst @decorators uitleggen, dan een opdracht laten maken en dan nog een stapje verder met args en kwargs
    % \end{todo} -->

    In deze opzet moet de `#!py inner_func(a, b)` nog weten dat de oorspronkelijke functie aangeroepen wordt met twee argumenten `#!py a` en `#!py b`. Maar ook dat hoeft niet. We hebben immers argument (un)packing met `#!py *args`:
    ``` py
    def squared_func(func):
        def inner_func(*args):
            return func(*args) ** 2

        return inner_func
    ```
    En nu komt het: in Python kun je de _decorator syntax_ gebruiken om je functie te vervangen door een iets aangepaste functie. In plaats van:
    ``` py
    f = squared_func(f)
    ```
    op te nemen in je code kun je de functie meteen `decoraten' als volgt:
    ``` py
    @squared_func
    def f(a, b):
        return a * b

    f(3, 4)
    # 144
    ```

    Als je meer wilt weten over hoe decorators werken en hoe je je eigen decorators kunt maken, dan vind je een uitgebreide uitleg in _Primer on Python Decorators_ [@decorators]. Deze tutorial heb je niet per se nodig voor de volgende opdracht.

    <!-- % \begin{todo}
    %   Deze opdracht vond ik best lastig, vooral omdat ik er volgens mij nog geen drol van begreep. Misschien is het goed om hier een opzetje te maken. Dus een scriptje met een functie die argumenten nodig heeft een een waarde teruggeeft.
    %   ``` py
    %     import datetime


    %     def log(func):
    %         def inner():

    %             return func(a,b)

    %         return inner


    %     @log
    %     def f(a, b):
    %         return a * b


    %     print(f(3, 4))
    %     print(f(3, b=4))
    %     ```
    %   En dan in een paar stappen. Zorg eerst dat de logfunctie het zonder poespas gaat doen (oftewel run die handel en los de error op) en dan functionaliteit toevoegen dat de datum enzo wordt geprint.
    % \end{todo} -->

    !!! opdracht-meer "decorators"
        Schrijf en test een decorator die werkt als een soort logboek. Als je een functie aanroept die gedecoreerd is print dan een regel op het scherm met het tijdstip van de aanroep, de parameters die meegegeven werden én de return value van de functie.


## Modules

Als je een nieuw script begint te schrijven staat alle code in één bestand. Dat is lekker compact, maar heeft ook nadelen. Als je je experiment of programma gaat uitbreiden kan het erg onoverzichtelijk worden. Ook zul je al je wijzigingen steeds in dit bestand moeten doen terwijl je je code van eerdere experimenten misschien wel wilt bewaren. Mogelijk kopieer je steeds je script naar een nieuw bestand, maar dat is niet erg _DRY_.[^DRY] Als je dan bijvoorbeeld een functie of klasse wilt aanpassen, moet dat nog steeds op heel veel plekken. Daarom is het handig om gebruik te maken van _modules_.

[^DRY]: _DRY_ staat voor _Don't Repeat Yourself_, een belangrijk principe in software engineering.

Eenvoudig gezegd is een module een stuk Python code dat je kunt importeren en gebruiken. Meestal worden er in een module handige functies en klasses gedefinieerd:
``` ps1 title="Terminal"
>>> import math
>>> math.sqrt(2)
1.4142135623730951
>>> math.pi
3.141592653589793
>>> math.sin(.5 * math.pi)
1.0
```
Door de `#!py math` module te importeren hebben we opeens de beschikking over het getal $\pi$ en de sinus- en wortelfunties.

Je kunt je eigen code ook importeren, maar hier moet je wel even opletten. Stel, we hebben een bestand {{file}}square.py:
``` py title="square.py"
--8<-- "scripts/square-1.py"
```
Als je deze code runt is de uitvoer:
``` ps1 title="Terminal"
The square of 4 is 16
```
Zoals verwacht! Maar nu willen we in een nieuw script, {{file}}count\_count.py, de functie importeren en gebruiken:
``` py title="count_count.py"
--8<-- "scripts/count_count.py"
```
!!! opdracht-basis "square.square"
    Waarom staat er in bovenstaande code nu opeens `#!py square.square()` in plaats van gewoon `#!py square()`?

Maar nu is er een probleem met de uitvoer van dit script:
``` ps1 title="Terminal"
The square of 4 is 16
The square of 5 is 25
```
Tijdens het importeren wordt alle code die aanwezig is in {{file}}square.py ook daadwerkelijk gerunt. Er zijn twee manieren om dit op te lossen:

  1. Alle `extra' code verwijderen uit de module ({{file}}square.py)
  1. De code in de module _alleen_ laten runnen als de module als script wordt aangeroepen, maar _niet_ wanneer de module wordt geïmporteerd

De eerste oplossing is lang niet altijd wenselijk. Voor de tweede oplossing pas je {{file}}square.py als volgt aan:
``` py title="square.py"
--8<-- "scripts/square.py"
```
Wanneer je een python script runt is de speciale variabele `#!py __name__` gelijk aan de string `__main__`. Maar als je een module importeert is
`#!py __name__` gelijk aan de _naam_ van de module; in dit geval `#!py square`. Met bovenstaande constructie wordt de code alleen uitgevoerd wanneer de module direct gerunt wordt:

```ps1con title="Terminal"
PS> python square.py
The square of 4 is 16
PS> python count_count.py
The square of 5 is 25
```

Het `#!py if __name__ == '__main__'`-statement wordt heel veel gebruikt in Python modules.

!!! opdracht-basis "modules"
    * Maak zelf de bestanden {{file}}square.py en {{file}}just\_count.py aan en probeer het importeren uit, met en zonder het `#!py if __name__ == '__main__'`-statement.
    * Voeg `#!py print(f"{__name__ = }")` toe bovenaan {{file}}square.py. Run {{file}}square.py en daarna {{file}}just\_count.py. Zie hoe de speciale variabele `#!py __name__` veranderd. 


## Packages

In Python zijn _packages_ collecties van modules. Ook krijg je automatisch _namespaces_. Dat wil zeggen, wanneer je functies en modules uit een package importeert zitten ze niet in één grote vormeloze berg, maar in een soort boomstructuur. Dat betekent dat namen niet uniek hoeven te zijn. Er zijn duizenden bibliotheken beschikbaar voor python (`numpy`, `scipy`, `matplotlib`, etc.) en die mogen allemaal een module `test` bevatten. Namespaces zorgen ervoor dat je ze uniek kunt benaderen:
``` py
import numpy.test
import scipy.test
```
In bovenstaande code zijn `#!py numpy` en `#!py scipy` afzonderlijke namespaces. Ook zijn `#!py numpy.test` en `#!py scipy.test` afzonderlijke namespaces. De namen van bijvoorbeeld variabelen en functies binnen die modules zullen nooit met elkaar in conflict komen.

Wij gaan in deze cursus onze code ook in packages stoppen. Op die manier kun je een softwarebibliotheek opbouwen voor je experiment en die code makkelijker delen met andere onderzoekers. Een pakket is opgebouwd zoals hieronder weergegeven:

<div id="fig:packagetree"></div>
- {{github}} my\_project\_folder
    - {{folder}} my\_pkg
        - {{file}} \_\_init\_\_.py
        - {{folder}} pkg1
            - {{file}} \_\_init\_\_.py
            - {{file}} module1.py
            - {{file}} module2.py
        - {{folder}} pkg2
            - {{file}}\_\_init\_\_.py
            - {{file}}module3.py
        - {{file}}module4.py

Iedere package bestaat uit een directory met een {{file}}\_\_init\_\_.py-bestand.[^init]

[^init]: Dat bestand is vaak leeg, maar kan code bevatten die gerunt wordt zodra het package wordt geïmporteerd.

De verschillende modules uit [figuur packagetree](voorkennis.md#fig:packagetree) kun je als volgt importeren en gebruiken (we gaan er even vanuit dat iedere module een functie `#!py some_func()` bevat):
``` py
# module direct importeren
import my_pkg.pkg1.module1
my_pkg.pkg1.module1.some_func()

# losse module vanuit een package importeren
from my_pkg.pkg1 import module2
module2.some_func()

# module importeren onder een andere naam
import my_pkg.module4 as m4
m4.some_func()
```

In deze cursus gaan we ook packages maken. Feitelijk hoeven we een python script dus alleen maar in een map te stoppen en in diezelfde map een lege {{file}}\_\_init\_\_.py aan te maken.

!!! waarschuwing
    Let op: als je de {{file}}\_\_init\_\_.py vergeet dan lijkt alles het alsnog te doen. Maar je maakt nu een _implicit namespace package_ waarbij bepaalde directories toch weer op een grote hoop gegooid worden. Geloof me, echt niet handig.[^fout] Namespace packages kunnen handig zijn voor grote projecten, maar dat is het dan ook wel. Wij gaan hier niet verder op in. Kortom: let op en gebruik _altijd_ een {{file}}\_\_init\_\_.py.

[^fout]: En wat mij betreft: een fout dat zoiets überhaupt kan in Python. Zen of Python: _explicit is better than implicit._

<!-- % \begin{info}
%   Als je in een module een andere module wilt importeren dan zijn daarvoor twee opties: relatieve en absolute imports. Relatief wil zeggen: importeer module1 uit _dezelfde_ directory, of ten opzichte van deze directory (`..` betekent een directory hoger bijvoorbeeld). Bij een absolute import moet je de volledige locatie binnen het package opgeven. Als voorbeeld, stel dat `module1` uit \figref{fig:packagetree} de modules `module2` en `module3` wil importeren:
%   ``` py
%     # module1.py

%     # relative imports
%     from . import module2
%     from ..pkg2 import module 3

%     # absolute imports
%     from my_pkg.pkg1 import module2
%     from my_pkg.pkg2 import module3
%   ```
%   Absolute imports zijn wat meer werk, maar je maakt wel heel duidelijk welke module je wilt importeren. Relative imports zorgen in de praktijk regelmatig voor -- soms lastig te vinden -- bugs. Als je tegen problemen aanloopt: gebruik dan absolute imports.
% \end{info} -->

<div id="opd:test_package"></div>
!!! opdracht-basis "Packages"
    In deze opdracht ga je oefenen met het aanmaken van packages, modules en het importeren en aanroepen daarvan.
    
    1. Maak een package `#!py models` met twee modules: `#!py polynomials` en `#!py tests`.
    1. In de `#!py polynomials`-module maak je een functie `#!py line(x, a, b)` die de de vergelijking voor een lijn voor ons berekent: $y = ax + b$.
    1. In de `#!py tests`-module maak je een functie `#!py test_line()` die het volgende doet:
            
        1. gebruik de `#!py line()`-functie uit de `#!py polynomials`-module om de $y$-waarde uit te rekenen voor een bepaald punt bij een gegeven $a$ en $b$.
        1. Vergelijk die berekende waarde met de waarde die het volgens jij moet zijn (met de hand nagerekend).
        1. Print `TEST PASSED` als het klopt, en `TEST FAILED` als het niet klopt.
            
    1. Maak een script die:
            
        1. Een grafiek maakt van jouw lijn. Bepaal zelf het domein en de waardes voor $a$ en $b$.
        1. De test uitvoert door de `#!py test_line()`-functie aan te roepen.
        1. Pas je `#!py line()`-functie eventjes aan om te kijken of je test ook echt werkt. Bijvoorbeeld: bij $y = ax$ zou je `TEST FAILED` moeten zien.
            
    



## De Standard Library en de Python Package Index

??? meer-leren "meer leren"
    Voor Python zijn ontzettend veel bibliotheken beschikbaar die het leven een stuk aangenamer maken. Voor een gedeelte daarvan geldt dat ze altijd aanwezig zijn als je Python geïnstalleerd hebt. Deze set vormt de _standard library_ [@python-standard-library]. Om te voorkomen dat je zelf het wiel uitvindt is het goed om af en toe door de lijst te bladeren zodat je een idee krijgt wat er allemaal beschikbaar is. Ziet het er bruikbaar uit? Lees dan vooral de documentatie! Tip: vergeet de _built-in functions_ niet.

    Verder zijn er nog eindeloos veel packages beschikbaar gesteld door programmeurs, van hobbyist tot multinational. Deze kunnen centraal gepubliceerd worden in de _Python Package Index_ [@pypi]. Je kunt daar vaak ook zien hoe populair een package is. Dit is een belangrijke indicatie voor de kwaliteit en bruikbaarheid van een package.


## Exceptions

??? meer-leren "meer leren"
    Exceptions zijn de foutmeldingen van Python. Je krijgt ze als je bijvoorbeeld probeert te delen door nul of wanneer je een typefout maakt in de naam van een method of attribute:
    ``` ps1 title="Terminal"
    >>> 1 / 0
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    ZeroDivisionError: division by zero
    >>> s = "particle"
    >>> s.upler()
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    AttributeError: 'str' object has no attribute 'upler'
    ```
    Merk op dat je een exception met traceback meestal van onder naar boven leest. Onderaan staat de foutmelding (exception) en daar boven een _traceback_: een kruimelpad van wáár in de code het probleem optrad; onderaan de regel waarin het echt fout ging, en naar boven toe alle tussenliggende functies en bibliotheken met bovenaan het hoofdprogramma.

    Een exception kan vervelend zijn. Het is een beetje jammer als je bijvoorbeeld tijdens een langdurige meting telkens een weerstand aan het uitrekenen bent ($R = \frac{U}{I}$) en de stroomsterkte $I$ wordt na anderhalf uur heel eventjes nul. Je programma crasht en je metingen zijn weg. Zoek de fout (niet altijd makkelijk!) en probeer het nog eens.

    Je kunt exceptions afvangen en afhandelen met een `#!py try...except` blok:
    ``` py
    def R(U, I):
        try:
            R = U / I
        except ZeroDivisionError:
            R = "Inf"
        return R
    ```
    ``` ps1 title="Terminal"
    >>> R(10, 2)
    5.0
    >>> R(10, 0)
    'Inf'
    ```

    Ook kun je zelf exceptions maken. Stel je schrijft een programma om een oscilloscoop uit te lezen dat twee kanalen heeft om de spanning te meten. Kanaal 0 en kanaal 1. Het programma moet gebruikt kunnen worden door andere studenten in de onderzoeksgroep dus het kan nu eenmaal gebeuren dat iemand niet op zit te letten -- niet jij, jij let altijd goed op. Een andere student die een programma schrijft en jouw code gebruikt wil een spanning meten op kanaal 2, het was immers een tweekanaals oscilloscoop. Maar kanaal 2 bestaat niet. Sommige oscilloscopen klagen dan niet maar geven een random getal terug. Dit kan leiden tot heel vervelende en lastig te achterhalen fouten in het experiment. Met dat idee in je achterhoofd kun je code schrijven die controleert op het kanaalnummer en een exception geeft:
    ``` py
    # we maken een subclass van de 'standaard' Exception
    class InvalidChannelException(Exception):
        pass

    def get_voltage(channel):
        if channel not in [0, 1]:
            raise InvalidChannelException(f"Use channel 0 or 1, not {channel}")
        ...
        return voltage
    ```
    Met deze uitvoer in het geval dat er iets mis gaat:
    ``` ps1 title="Terminal"
    >>> get_voltage(1)
    1.0
    >>> get_voltage(2)
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
        get_voltage(2)
    File "exc_channel.py", line 6, in get_voltage
        raise InvalidChannelException(f"Use channel 0 or 1, not {channel}")
    InvalidChannelException: Use channel 0 or 1, not 2
    ```
    Je kunt op deze manier voorkomen dat iemand dagen kwijt is aan het overdoen van achteraf verkeerd gebleken metingen. Ook kun je 'vage' foutmeldingen omzetten in duidelijkere foutmeldingen:
    ``` py
    class NoCurrentError(Exception):
        pass


    def R(U, I):
        try:
            R = U / I
        except ZeroDivisionError:
            raise NoCurrentError("There is no current flowing through the resistor.")
        return R
    ```
    In plaats van een `#!py ZeroDivisionError` krijg je nu een `#!py NoCurrentError`. Je programma crasht nog steeds (wellicht niet handig) maar de foutmelding is nu wel specifiek voor het probleem en kan in de rest van je programma wellicht beter afgevangen en opgelost worden. Misschien beter dan niet crashen en een mogelijk foute waarde doorgeven. Die afweging zul je zelf moeten maken.

    === "Opdracht"
        !!! opdracht-meer "exceptions"
            De volgende code berekent een gemiddelde van een lijst getallen:
            ``` py
            def average(values):
                return sum(values) / len(values)    
            ```
            Er is alleen geen foutafhandeling en dat kan leiden tot exceptions. De volgende aanroepen zorgen voor een crash (probeer ze allemaal uit!):
            ``` py
            average([])
            average(4)
            average("12345")
            ```
            Pas de functie `#!py average()` zodanig aan dat bij bovenstaande aanroepen slechts een waarschuwing wordt geprint. Vang daartoe de exceptions netjes af en geef de waarde `#!py None` terug wanneer een gemiddelde niet berekend kan worden. Dus bovenstaande drie aanroepen krijgen `#!py None` terug terwijl er een waarschuwing wordt geprint.

    === "uitwerkingen"
        ``` py
        --8<-- "uitwerkingen-on/exceptions-on.py"
        ```

## Inleiding programmeren; terugblik

Bij de cursus inleiding programmeren heb je de basis van het programmeren in Python geleerd. Bij inleiding programmeren mocht je kiezen om je code in het Nederlands of Engels te schrijven. Omdat wij jullie voorbereiden om in een onderzoeksgroep je bachelor project te gaan doen waar je hoogstwaarschijnlijk internationale collega's gaat treffen vragen we jou om bij ECPC alles in het Engels te schrijven. In deze paragraaf nemen we de hoofdlijnen van inleiding programmeren met je door in een aantal opdrachten. 

!!! opdracht-basis "f-strings, variabelen en input"
    1. Schrijf een python script waarin je de gebruiker vraagt wat de diameter van de bal is. 
    1. Bereken de radius van de bal.
    1. Print de diameter en radius in een zin en maak gebruik van f-string. Bijvoorbeeld: "A ball with a diameter of 2.8 m has a radius of 1.4 m."
    1. Test je script met het getal 2.8. 


!!! opdracht-basis "if-statement en operatoren"
    Met een `#!py if`-statement kan je een conditie testen door operatoren te gebruiken. 

    1. Schrijf de operatoren op voor:
        * gelijk aan
        * ongelijk aan
        * groter dan
        * groter of gelijk aan
        * kleiner dan
        * kleiner dan of gelijk aan
    1. Vul op de `#!py ...` de juiste condities in door gebruik te maken van `#!py and`, `#!py not` en `#!py or`.
    ``` py
    rain = False
    umbrella = False

    if ... :
        print("Lucky you have your umbrella with you since it's raining.")

    if ... :
        if ... :
            print("You will get wet without an umbrella since it's raining.")
        if ... :
            print("you can use your umbrella as a walking stick since it doesn't rain")

    if ... :
        print("Without an umbrella there is no problem since it's not raining.")
    ```

!!! opdracht-basis "For-loop, while-loop en break"
    1. Beschouw de volgende code:
    ``` py
    voltage = 0  # mV
    steps = 50  # mV
    while voltage < 3300:
        voltage += steps
    ```
    
    Bij het programmeren krijg je vaak errors. Bij het debuggen van een loop zijn twee dingen heel handig `#!py print` en `#!py break`.

    1. Gebruik `#!py print` om het voltage te printen in the while-loop, doe dit handig met f-strings zodat je weet wat je je print bijvoorbeeld: "The voltage is set to 0 mV."
    1. Gebruik dan `#!py break` om de loop maar een keer te laten lopen. 
    1. Schrijf de code om waarbij je gebruikt maakt van een `#!py for`-loop. 


!!! opdracht-basis "functies"
    1. Maak uit de onderstaande code de functie _exponentiation_ werkend. 
    ``` py
    def exponentiation():
        solution =
        ...


    number_1 = 2
    number_2 = 8

    answer = exponentiation(number_1, number_2)
    print(f"{number_1}^{number_2} = {answer}")
    ```

    1. In deze opdracht zijn 4 variabele `#!py solution`, `#!py number_1`, `#!py number_2` en `#!py answer`. Welk van deze variabele zijn globaal en welke zijn lokaal?
    1. Leg uit wat daarvan de consequentie is voor het gebruiken van deze variabelen. 

!!! opdracht-basis "lijsten"
    1. Schrijf een python script waarin je een lijst definieerd met de namen van de maanden.
    1. Print de negende maand.
    1. Voeg een dertiende maand toe aan de lijst.

Bij inleiding programmeren heb je ook geleerd hoe je code netjes opschrijft zodat het leesbaar en begrijpelijk is. Hieronder vind je een samenvatting, die een beetje aangevuld is met ECPC stijl.
- Je schrijft je code in het Engels.
- `#!py def functie_namen_met_doel():` Namen van functies mogen lang zijn, maar geven duidelijk weer wat de functie doet.
- `#!py korte_variabele = 28` de namen van variabele houd je kort en duidelijk. Gebruik alleen afkortingen waarneer deze door veel mensen gekend zijn.
- Je hoeft de code niet af te drukken dus gebruik liever meer regels dan een hele lange regel waar meer dan 1 ding gebeurd.
- Gebruik `#!py #commentaar-kopjes` om een stukje code samen te vatten, een waarschuwing te geven, uitleg van complexe algoritmen te doen, voor bronvermelding, uitleg van een variabele te geven en zet dit altijd boven het stukje code waar het omgaat. 
- Spring in waar nodig, gebruik witregels, zet spaties rondom operatoren.

Ook heb je geleerd om functies uit andere (python) modules te importeren, meer hierover vind je in de [paragraaf _Modules_](voorkennis.md#modules). 

!!! opdracht-basis "Grafieken"
    Gebruik matplotlib om een scatterplot te maken van twee lijsten die hieronder zijn weergegeven. Zet de grootheden en eenheden bij beide assen en sla het figuur op als .png-bestand.
    ``` py 
    time = [0, 0.5, 1, 1.5, 2, 2.5, 3] #seconds
    distance = [0, 15, 50, 100, 200, 300, 400] #meters
    ```

!!! opdracht-basis "txt-bestanden lezen"
    Hieronder vind je een verhaal, kopieer de inhoud naar een .txt-bestand en sla deze op een handige plek op.
    ```
    "Do you have a favourite
    saying?" asked the boy.
    "Yes" said the mole
    "What is it?"
    "If at first you don't 
    succeed have some cake."
    "I see, does it work?"
    "Every time."
    From: The Boy, the mole, the fox and the Horse - Charlie Mackesy
    ```

    Schrijf een script om het .txt-bestand te lezen en regel voor regel te printen.