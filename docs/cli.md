# Command-line interface
## Gebruikersomgevingen

Vanaf de jaren '60 van de vorige eeuw werden computers _interactief_. Het was mogelijk om via een _terminal_ commando's aan de computer te geven en te wachten op een antwoord. In tegenstelling tot moderne gebruikersomgevingen waren deze volledig op tekst gebaseerd. Hoewel moderne besturingssystemen &mdash; of het nu computers, tablets of mobiele telefoons betreft &mdash; volledig grafisch zijn ingericht, is de tekstuele interface nooit verdwenen. Opdrachten geven door te typen is gewoon best wel handig en snel. Ook is het veel eenvoudiger om applicaties te ontwikkelen zonder grafische interface.

Op ieder besturingssysteem &mdash; Linux, MacOS, Windows &mdash; is een _shell_, _terminal_ of _command prompt_ te vinden. Als je die opstart kun je op de zogeheten _command line_ opdrachten intypen. Veelal zijn dit commando's om het bestandssysteem te navigeren en programma's op te starten.

Wanneer je in Visual Studio Code een Python script start dan opent het een terminal onderin het scherm.

### Commando's

Je hebt tot nu toe al heel wat commando's in de terminal getypt. Laten we een paar voorbeelden bestuderen:
``` ps1con title="Terminal"
PS> python script.py
```
Als eerste vertel je welke applicatie je wilt gaan starten; in dit geval: `python`. Daarna geef je met het _argument_ `script.py` aan welk Pythonscript je wilt uitvoeren. Vaak kun je ook _opties_ meegeven zoals in:
``` ps1con title="Terminal"
PS> python -V
Python 3.9.13
```
Hiermee vraag je Python om het versienummer weer te geven. Soms kunnen _opties_ zelf weer een _argument_ meekrijgen. Bijvoorbeeld:
``` ps1con title="Terminal"
PS> python -m antigravity
```
Met deze regel geef je Python de optie `-m` en die importeert een module (hier `antigravity`) en voert die uit. Probeer maar eens zelf wat er gebeurt als je dat commando uitvoert.

Als applicaties veel verschillende functionaliteit hebben dan krijg je regelmatig te maken met een lange regel met een combinatie van argumenten en opties:
``` ps1con title="Terminal"
PS> conda create -n pythondaq -c conda-forge python pyvisa-py
```
Uitgesplitst in \textit{argumenten} en __opties__, met vierkante haken [] om aan te geven welke onderdelen bij elkaar horen, is dat:
\begin{quote}
    conda \textit{create} [__-n__ \textit{pythondaq}] [__-c__ \textit{conda-forge}] [\textit{python pyvisa-py}]
\end{quote}


!!! opdracht-basis "Poetry argumenten"
    
    1. Naast `conda create` heb je ook met andere argumenten gewerkt zoals `activate` en `install`. Welke argumenten ken je al van de applicatie `poetry`?
    1. Vraag de lijst met argumenten (commando's) op van Poetry met `poetry list`, hoeveel kende je nog niet?
    




### Click
Als we gebruik willen maken van commando's in onze eigen applicatie moeten we weten wat de gebruiker in de terminal typt. Dit is mogelijk met `sys.argv`.\footnote{argv staat voor: argument vector, een lijst met argumenten}

``` py
# cli.py

import sys

print(sys.argv)
```

Alles wat we in de terminal typen wordt aan input meegegeven:
``` ps1con title="Terminal"
PS> python  cli.py test 123   
['cli.py', 'test', '123']
```

Met if-statements kunnen we acties verbinden aan bepaalde argumenten:
\begin{pythoncode*}{highlightlines={8-11}}
# cli.py

import sys

args = sys.argv
print(args)

if args[1] == "test":
    print(f"This is a test: {args[2]}")
else:
    print(f"CommandNotFoundError: No command '{args[1]}'.")
\end{pythoncode*}

Als je meerdere opties en argumenten meegeeft dan wordt het veel werk om die in je script uit elkaar te plukken en ze goed te interpreteren. Om dat makkelijker te maken zijn er verschillende bibliotheken beschikbaar &mdash; waaronder een paar in de _standard library_. Een hele handige &mdash; die níet in de _standard library_ zit maar wél meegeleverd is met Anaconda &mdash; is Click \cite{click}.

\begin{info}
    Click maakt gebruik van _decorators_ (`#!py @decorator`). Om decorators te _gebruiken_, hoef je niet per se te weten hoe ze _werken_. Als je meer wilt weten over de werking ervan lees dan \secref{sec:decorators}.
\end{info}

Als kort voorbeeld &mdash; geïnspireerd op de documentatie van Click &mdash; nemen we het volgende script:
``` py
# hello.py

def hello():
    print("Hello physicist!")

if __name__ == "__main__":
    hello()
```

Dit script print de uitdrukking "Hello physicist!". We gaan dit aanpassen en maken het mogelijk om de naam en het aantal begroetingen te kiezen. Hiervoor gebruiken we Click. Allereerst moeten we `#!py click` importeren en aangeven dat we de `#!py hello()`-functie willen gebruiken als _commando_:

\begin{pythoncode*}{highlightlines={5}}
# hello.py

import click

@click.command()
def hello():
    print("Hello physicist!")

if __name__ == "__main__":
    hello()
\end{pythoncode*}

Dit levert ons nog niet zoveel op, maar op de achtergrond is click wel degelijk aan het werk. De `#!py @click.command()` houdt in de gaten wat er in de command line wordt ingetypt. Zo kunnen we de helpfunctie aanroepen door `--help` achter de naam van het script te zetten.

``` ps1con title="Terminal"
PS> python hello.py --help
```

!!! opdracht-basis "Help functie"
    \label{opd:hello-help}
    Neem het script :fontawesome-regular-file-code:`hello.py` over en vraag de helpfunctie op. Test dit met én zonder `#!py @click.command()`.


!!! opdracht-basis "Argument toevoegen"
    Laten we zorgen dat we een naam als argument mee kunnen geven.
    
    1. In de code hieronder geven we met de regel `#!py @click.argument("name")` aan dat we van de gebruiker een argument verwachten. Zorg dat het argument ook gebruikt wordt in de functie `hello`:
            \begin{pythoncode*}{highlightlines={6,8}}
            # hello.py
            
            import click
            
            @click.command()
            @click.argument("name")
            def hello(name):
                print(f"Hello {name}!")
            
            if __name__ == "__main__":
                hello()
            \end{pythoncode*}
    1. Draai :fontawesome-regular-file-code:`hello.py` eerst zonder een argument `python hello.py` en bekijk de foutmelding.
    1. Draai :fontawesome-regular-file-code:`hello.py` nu met een argument: `python hello.py Alice`.
    


\begin{warning}
    Let er op dat je bij `#!py @click.argument` de naam meegeeft die overeen komt met de namen van de parameters van je functie. In ons geval hebben we een argument `#!py "name"`. Dit moet overeenkomen met de functiedefinitie `#!py def hello(name)`.
\end{warning}

% Als we dit script nu runnen _zonder_ argument krijgen we een foutmelding:
% ``` ps1con title="Terminal"
% PS> python hello.py
% Usage: hello.py [OPTIONS] NAME
% Try 'hello.py --help' for help.

% Error: Missing argument 'NAME'.
% ```
% maar _met_ argument krijgen we dit:

% ``` ps1con title="Terminal"
% PS> python hello.py Alice
% Hello Alice!
% ```


Argumenten zijn altijd verplicht en moeten in een vaste volgorde staan. Bij _opties_ is dat anders. Je geeft met mintekens aan dat je een optie meegeeft. Veel opties hebben een lange naam en een afkorting (bijvoorbeeld `--count` en `-c`). Opties kunnen zelf weer een argument hebben (bijvoorbeeld `--count 3`). Opties zonder argument werken als vlag &mdash; een soort aan/uitknop.\footnote{Gebruik forward slash om een vlaggetje te maken: `#!py @click.option("-f", "--flag/--no-flag`} Het is handig om een standaardwaarde te definiëren. In dat geval mag de gebruiker de optie weglaten. We voegen een for-loop\footnote{Merk op in de code hieronder: `#!py _` is de weggooivariabele in Python. Het gaat ons erom dat de lus een aantal keer doorlopen wordt en we hoeven niets te doen met de loop index.} toe om de begroeting te herhalen.

\begin{pythoncode*}{highlightlines={7-11,13}}
# hello.py

import click

@click.command()
@click.argument("name")
@click.option(
    "-c",
    "--count",
    default=1,
)
def hello(name, count):
    for _ in range(count):
        print(f"Hello {name}!")

if __name__ == "__main__":
    hello()
\end{pythoncode*}

!!! opdracht-basis "Test hello"
    Neem bovenstaande pythoncode over en test :fontawesome-regular-file-code:`hello.py`. Kun je 5 keer een begroeting printen met de naam van je assistent?


\begin{warning}
    Let er op dat je bij `#!py @click.option` de afkorting met 1 minteken meegeeft en de lange naam met 2 mintekens. De lange naam moet overeenkomen met de paramater van je functie. In ons geval hebben we een optie `#!py "--count"` &mdash; de lange naam telt. Dit moet overeenkomen met de functiedefinitie `#!py def hello(name, count)`.
\end{warning}

Het is handig om een korte helptekst toe te voegen. Dit gaat als volgt:

\begin{pythoncode*}{highlightlines={11,12}}
# hello.py

import click

@click.command()
@click.argument("name")
@click.option(
    "-c",
    "--count",
    default=1,
    help="Number of times to print greeting.",
    show_default=True,  # show default in help
)
def hello(name,count):
    for _ in range(count):
        print(f"Hello {name}!")

if __name__ == "__main__":
    hello()  
\end{pythoncode*}

!!! opdracht-basis "Helptekst toevoegen"
    Voeg de helptekst toe en vraag de helptekst op zoals in \opdref{opd:hello-help}.


Als je dit script gebruikt ziet dat er zo uit:

``` ps1con title="Terminal"
PS> python hello.py --help
Usage: hello.py [OPTIONS] NAME

Options:
  -c, --count INTEGER  Number of times to print greeting.  [default: 1]
  --help               Show this message and exit.
  
PS> python hello.py Alice
Hello Alice!
  
PS> python hello.py Alice -c 2
Hello Alice!
Hello Alice!

PS> python hello.py Alice --count 3
Hello Alice!
Hello Alice!
Hello Alice!
```


!!! opdracht-basis "Pauze optie"
    \label{opd:hello-pauze}
    Breid het bovenstaande script `hello.py` uit met een optie om een korte pauze in te lassen na het printen van ieder `#!py print()`-statement. Een pauze kun je inlassen met `#!py time.sleep()`. Zorg er voor dat er zonder die optie géén pauze is en dat je met de optie kunt kiezen hoe lang er gewacht moet worden.


??? opdracht-meer "Vlag"
    Gebruik een optie als vlag om de gebruiker te laten kiezen tussen <q>hello</q> of <q>goodbye</q>. Zorg dat er standaard <q>hello</q> wordt geprint.


!!! opdracht-basis "Argumenten en opties"
    Bij \opdref{opd:Poetry_commando} heb je een applicatie gemaakt om de oppervlakte van een tafel te berekenen met de bijbehorende onzekerheid. In deze opdracht gaan we het script uitbreiden om de lengte en de breedte én de onzekerheid daarop als argument of optie mee te geven op de command line. Voer de volgende stappen uit:

    1. Maak een schone environment aan en installeer de applicatie (doet alles het nog?)
    1. Voeg click toe en pas het script aan zodat je de lengte zelf kan kiezen.\footnote{Click maakt van alle argumenten een string, tenzij je een default waarde of een type definieerd. Gebruik `#!py type=int`, `#!py type=float` enzovoorts om aan te geven wat voor type object het argument moet worden}
    1. Test de applicatie.
    1. Voeg ook opties of argumenten toe om de breedte en de onzekerheden mee te geven. Wanneer kies je in het script voor een optie en wanneer voor een argument?
    1. Maak de applicatie compleet met helpteksten en default waardes.
    


### Click subcommando's
Tot nu toe konden we maar één functie uitvoeren in onze applicatie. Maar het is ook mogelijk om subcommando's aan te maken zodat je met één programma meerdere <q>taken</q> kunt uitvoeren. Denk bijvoorbeeld aan `conda`. Je installeert packages met `conda install`, verwijdert ze met `conda remove`, maakt een environment met `conda create` en activeert het met `conda activate`.

!!! opdracht-basis "Subcommando's bedenken"
    \label{opd:subcommandos}
    Je gaat de `pythondaq` applicatie straks verder uitbreiden zodat er veel meer mogelijk is dan nu. Wat zou je willen dat de applicatie allemaal kan? Welke subcommando's wil je gaan aanmaken? Overleg met elkaar om goede ideeën uit te wisselen.



Een eenvoudig voorbeeldscript waarin de conda commando's `install` en `remove` worden nagebootst leggen we hieronder uit. Eerst de code:

\begin{pythoncode*}{linenos}
    # fakeconda.py
    
    import click
    
    @click.group()
    def cmd_group():
        pass
    
    @cmd_group.command()
    @click.argument("package")
    def install(package):
        print(f"Installing {package}...")
    
    @cmd_group.command()
    @click.argument("package")
    def remove(package):
        print(f"Removing {package}...")
    
    if __name__ == "__main__":
        cmd_group()
\end{pythoncode*}
In (de laatste) regel 20 roepen we de hoofdfunctie aan die we enigszins willekeurig `#!py cmd_group()` genoemd hebben en die we bovenaan definiëren. In tegenstelling tot het :fontawesome-regular-file-code:`hello.py`-script doet deze functie helemaal niets (`#!py pass`). We vertellen aan click dat we een groep van commando's aan gaan maken met de `#!py @click.group()`-decorator in regel 5. Vervolgens gaan we commando's binnen deze groep hangen door _niet_ de decorator `#!py @click.command()` te gebruiken, maar `#!py @cmd_group.command()` &mdash; zie regels 9 en 14. De namen van de commando's die worden aangemaakt zijn de namen van de functies. Dus regel 9 en 11 maken samen het commando `install`. Verder werkt alles hetzelfde. Dus een argument toevoegen &mdash; zoals in regel 10 &mdash; is gewoon met `#!py @click.argument()`. Hier hoef je geen `#!py cmd_group` te gebruiken.

\begin{warning}
    \label{warn:cmd_name}
    Omdat de naam van een subcommando gelijk is aan de functienaam kan dat voor problemen zorgen wanneer je gereserveerde namen van python wilt gebruiken zoals: `#!py import`, `#!py return`, `#!py lambda`. Of wanneer je de naam van het subcommando graag hetzelfde wilt hebben als een ander pythonfunctie zoals `#!py sin` of `#!py list`.
    Een oplossing is om de functienaam aan te passen en de subcommando naam expliciet aan click mee te geven bij `command`:
    ``` py
        @cmd_group.command("import")
        @click.argument("package")
        def import_package(package):
            print(f"import {package}...")
    ```
    We hebben nu een commando `import` aangemaakt &mdash; _niet_ een commando `import_package`.
\end{warning}

!!! opdracht-basis "Pyproject toml"
    Hieronder zie je :fontawesome-regular-file-code:`pyproject.toml` van fake-conda:
    \begin{tomlcode}
        [tool.poetry]
        name = "fake_conda"
        version = "0.1.0"
        description = ""
        authors = ["YourName <YourName@users.noreply.github.com>"]

        [tool.poetry.dependencies]
        python = "^3.9"

        [build-system]
        requires = ["poetry-core>=1.0.0"]
        build-backend = "poetry.core.masonry.api"
    \end{tomlcode}
    % [tool.poetry.scripts]

    Hoe moet je de toml-file aanpassen zodat de volgende uitvoer mogelijk wordt?
    ``` ps1con title="Terminal"
    PS> fake_conda install scipy
    Installing scipy...
    ```


!!! opdracht-meer "Smallangle (uitdaging)"
    Met deze opdracht kun je testen hoe goed je het Python-jargon onder de knie hebt. Je zult het woord <q>smallangle</q> zó vaak tegenkomen dat het je duizelt &mdash; maar jij weet precies over welk onderdeel we het hebben.

    1. Maak een nieuw poetry project (met een `src` indeling) aan met de naam :fontawesome-brands-github:`smallangle`.
    1. Maak een nieuw environment die `smallangle` heet met daarin alleen Python.
    1. Zet in de package :fontawesome-regular-folder:`smallangle` een module :fontawesome-regular-file-code:`smallangle.py`.
    1. Plak de onderstaande code in :fontawesome-regular-file-code:`smallangle.py`:
        ``` py
        import numpy as np
        from numpy import pi
        import pandas as pd
        
        
        def sin(number):
            x = np.linspace(0, 2 * pi, number)
            df = pd.DataFrame({"x": x, "sin (x)": np.sin(x)})
            print(df)
            return
        
        
        def tan(number):
            x = np.linspace(0, 2 * pi, number)
            df = pd.DataFrame({"x": x, "tan (x)": np.tan(x)})
            print(df)
            return
        
        
        if __name__ == "__main__":
            sin(10)
        ```
        1. Ga door naar \opdref{opd:smallangle} stap 2. Je mag stap 1 overslaan &mdash; dat werk heb je nu zelf al gedaan.
    


!!! opdracht-inlever "smallangle"
    \label{opd:smallangle}
    Het project :fontawesome-brands-github:`smallangle` wordt met Poetry beheerd. Je gaat click aan de module :fontawesome-regular-file-code:`smallangle.py` toevoegen zodat je met subcommando's, argumenten en/of opties kunt werken. Tot slot maak je van smallangle een applicatie die je in de terminal kunt aanroepen.

    1. Ga naar GitHub en open :fontawesome-brands-github:`AnneliesVlaar / smallangle` in GitHub Desktop en Visual Studio Code.
    1. Installeer de package in een nieuw environment.
    1. Run het script :fontawesome-regular-file-code:`smallangle.py` en los de errors op totdat het werkt.
    1. Voeg click toe zodat je de subcommando's `sin` en `tan` hebt. Het aantal stappen (het aantal $x$-waardes tussen 0 en $2\pi$) moet gekozen kunnen worden met een optie (geef een standaardwaarde mee, zodat de gebruiker de optie kan weglaten).
    1. Zorg dat smallangle een applicatie wordt die je aan kunt roepen met bijvoorbeeld `smallangle sin -n 9`.
    


??? opdracht-meer "Smallangle (uitdaging)"
    Met het commando `approx` en een argument $\epsilon$ moet het script de grootste hoek geven waarvoor nog geldt dat $\abs{x - \sin(x)} \leq \epsilon$, ofwel de grootste hoek waarvoor de kleine-hoekbenadering nog geldt met de opgegeven nauwkeurigheid. Doe dit op drie cijfers nauwkeurig (loop over \numlist{.000;.001;.002}, etc. totdat de vergelijking niet meer geldt). N.B. besteed geen tijd aan het analytisch oplossen van de vergelijking. Een voorbeeld van de uitvoer:
    ``` ps1con title="Terminal"
    PS> smallangle approx .1
    For an accuracy of 0.1, the small-angle approximation holds
    up to x = 0.854.
    ```


## Docstrings
Documentatie is vaak een onderschoven kindje, maar is ontzettend belangrijk. Als je zelf informatie opzoekt over bijvoorbeeld een voor jou onbekende Pythonbibliotheek dan vind je het heel fijn als er een duidelijke tutorial is. Als je code schrijft die ook door andere mensen gebruikt moet worden is documentatie nodig. Als de code langer mee moet gaan dan zeg een paar weken, dan helemaal. Want over een paar weken ben jij _zelf_ een ander persoon. Hoe vervelend het ook is, code die je nota bene zelf geschreven hebt is over een paar weken niet meer glashelder. Je zult dan moeten uitzoeken hoe je ook alweer iets hebt gedaan of wat de gedachte erachter was.

Tot nu toe heb je waarschijnlijk gebruik gemaakt van `#!py #stukjes commentaar` om duidelijk te maken wat je code doet. Maar als je de applicatie aan het gebruiken bent en je wilt weten wat een bepaalde functie eigenlijk doet, moet je dus de code induiken op zoek naar de betreffende functie. Met _docstrings_ &mdash; documentatiestrings &mdash; is dat verleden tijd. De documentatie over een functie kan automatisch gegenereerd worden vanuit je code met behulp van de docstring. Docstrings staat tussen 3 dubbele aanhalingstekens en hebben doorgaans een vaste structuur:\footnote{Die vaste structuur wordt niet door Python afgedwongen, maar is een goed gebruik. Er worden verschillende stijlen gebruikt. Eén van de meest gebruikte stijlen is door programmeurs van Google bedacht [@google_style_guide].}

``` py
# integers_up_to.py
def integers_up_to(number):
    """List integers up to a given number.

    Args:
        number (int): list integers up to this number

    Returns:
        list: containing the integers
    """
    if number > 1:
        return list(range(1, number))
    else:
        return []


help(integers_up_to)
```
De eerste regel geeft een korte samenvatting weer, na de witregel komt een langere samenvatting. Met `Args:` worden alle argumenten opgesomd die aan de functie worden meegegeven en `Returns:` geeft aan wat de functie teruggeeft. We kunnen de documentatie van deze functie opvragen met: `#!py help(integers_up_to`. Dat geeft het volgende resultaat:
``` ps1con title="Terminal"
PS> python integers_up_to.py 
    Help on function integers_up_to in module __main__:
    
    integers_up_to(number)
        List integers up to a given number.
    
        Args:
            number (int): list integers up to this number
    
        Returns:
            list: containing the integers
```
Je zult niet altijd de `#!py help()` functie gebruiken misschien, maar gebruik zoveel mogelijk docstrings &mdash; ze helpen ook enorm als je de code leest. Het is extra werk maar het verdient zich dubbel en dwars terug. Je hoeft geen proza te schrijven, maar wees duidelijk. Lees voor meer voorbeelden bijvoorbeeld de \citetitle{google_style_guide} [@google_style_guide].


### Docstring generator

Om het gemakkelijker te maken om docstrings ook écht te gaan schrijven, zijn er docstring generators ontwikkeld. Voor Visual Studio Code is er de extensie \citetitle{AutoDocstring} [@AutoDocstring].

!!! opdracht-basis "Autodocstring"
    Kijk in Visual Studio Code bij extensions hoe je AutoDocstring kunt gebruiken. Kies daarvoor in de linkerkantlijn het goede icoon voor _extensions_ en selecteer dan de `autoDocstring` extensie. Zoek in de documentatie naar hoe je automatisch (een deel van) de docstring genereert.


Wanneer we voor de functie `#!py integers_up_to()` de docstring generator gebruiken, krijgen we het volgende:
``` py
def integers_up_to(number):
"""_summary_

Args:
    number (_type_): _description_

Returns:
    _type_: _description_
"""
if number > 1:
    return list(range(1, number))
else:
    return []
```

Zo kunnen we gemakkelijk alles gaan invullen. Vergeet niet om de docstring aan te vullen als je een functie aanpast.


### Docstrings en Click `-{-help`}

Docstrings werken ook heel handig samen met Click want ze worden gebruikt als we de helpfunctie aanroepen. We voegen docstrings toe aan fake-conda:

``` py
# fakeconda.py

import click


@click.group()
def cmd_group():
    pass


@cmd_group.command()
@click.argument("package")
def install(package):
    """Install a conda package.

    Args:
        package (string): name of the package
    """
    print(f"Installing {package}...")


@cmd_group.command()
@click.argument("package")
def remove(package):
    """Remove a conda package.

    Args:
        package (string): name of the package
    """
    print(f"Removing {package}...")

if __name__ == "__main__":
    cmd_group()
```
Als we vervolgens de help functie aanroepen zien we de eerste regel van de docstrings verschijnen voor alle subcommando's:
``` ps1con title="Terminal"
PS> fake_conda --help
Usage: fake_conda [OPTIONS] COMMAND [ARGS]...

Options:
    --help  Show this message and exit.

Commands:
    install  Install a conda package.
    remove   Remove a conda package.
```
Daarna kun je uitleg vragen voor de subcommando's waarbij je de hele docstring te zien krijgt:
``` ps1con title="Terminal"
PS> fake_conda install --help
Usage: fakeconda.py install [OPTIONS] PACKAGE

    Install a conda package.

    Args:     package (string): name of the package

Options:
    --help  Show this message and exit.
```

!!! opdracht-inlever "Smallangle: docstring"
    Voorzie de functies in :fontawesome-regular-file-code:`smallangle.py` die je gemaakt hebt bij \opdref{opd:smallangle} volledig van docstrings, zodat `smallangle --help` zinvolle informatie geeft.\footnote{Als de docstring zeer uitgebreid wordt met meerdere argumenten dan wordt de helptekst van click onoverzichtelijk. Als je wilt dat alleen de korte samenvatting in de help verschijnt, zet dan na de korte samenvatting: `#!py \f`.}


!!! opdracht-inlever "Pythondaq: docstring"

    1. Pak de `pythondaq` applicatie erbij. Zet bij _alle_ functies een nuttige docstring.
    1. Schrijf ook docstrings voor de classes die je gemaakt hebt.
    


### Documentatie met _Sphinx_
??? meer-leren "Meer leren"
    Een bijkomend voordeel van docstrings is dat ze gebruikt kunnen worden om automatisch documentatie te genereren voor een heel project met behulp van Sphinx.
    _Sphinx_ is een Python documentatie generator. Het is de meestgebruikte manier om documentatie te schrijven voor Python projecten. Een paar voorbeelden zijn bijvoorbeeld het web framework _Django_ \cite{django_docs} (\citeurl{django_docs}) of de populaire HTTP bibliotheek _Requests_ \cite{requests_docs} (\citeurl{requests_docs}). Behalve dat je vrij eenvoudig uitgebreide documentatie kunt schrijven kan Sphinx alle docstrings gebruiken om een referentie op te bouwen.

    Het voert tijdens deze cursus te ver om veel aandacht te besteden aan Sphinx. Maar aangezien documentatie zo belangrijk is wilden we het toch noemen met pointers naar de Sphinx documentatie \cite{sphinx}. Klik daar, als je geïnteresseerd bent, op _First steps with Sphinx_.


## Command-line interface voor ons experiment

In \chref{ch:mvc} heb je `pythondaq` uitgesplitst in model, view en controller. Wanneer we een command-line interface gaan bouwen dan is dat de softwarelaag tussen de gebruiker en de rest van de code. De command-line interface is dus een _view_. Het is helemaal niet gek om meerdere views te hebben, bijvoorbeeld een eenvoudig script zoals :fontawesome-regular-file-code:`view.py`, een command-line interface en een grafische interface. Hier gaan we ons richten op een command-line interface. We gaan een nieuw bestand :fontawesome-regular-file-code:`cli.py` aanmaken en dat langzaam opbouwen.

!!! opdracht-inlever "Pythondaq: commando's"

    1. Maak een nieuw bestand :fontawesome-regular-file-code:`src/pythondaq/cli.py`.
    1. Maak een `#!py @click.group()` aan en voeg de subcommando's `list` en `scan` daaraan toe. Laat de commando's voorlopig alleen tekst printen. Merk op dat `#!py list()` een Pythonfunctie is.\footnote{Zie ook de waarschuwing op \mypageref{warn:cmd_name}.}
    1. Zorg dat je de command-line applicatie met een commando in de terminal kunt aanroepen, inclusief de subcommando's `list` en `scan`.
    



### Het uitvoeren van een meetserie

We gaan ons eerst richten op het uitvoeren van een volledige meetserie en het tonen van de resultaten daarvan aan de gebruiker.

!!! info
    Bij het opgeven van argumenten en opties voor de spanning kan het belangrijk zijn om te controleren of de spanning überhaupt wel een getal is tussen \qtylist{0;3.3}{\volt}. Je kunt dit doen door de `#!py type`-parameter in `#!py @click.argument()` en `#!py @click.option()`. Je kunt een Pythontype opgeven (bijvoorbeeld: `#!py type=int` of `#!py type=float`) en Click heeft speciale types zoals `#!py type=click.FloatRange(0, 3.3)` voor een kommagetal tussen 0 en 3.3. Bekijken alle speciale types op [https://click.palletsprojects.com/en/8.1.x/parameters/#parameter-types](https://click.palletsprojects.com/en/8.1.x/parameters/#parameter-types). Als je hiervan gebruik maakt hoef je niet _zelf_ te controleren of de parameters kloppen. Click doet dat voor je.

!!! opdracht-inlever "Pythondaq: `scan`"
    Met het commando `scan` wil je een meetserie uitvoeren over een spanningsbereik. De uitvoer is een lijst van metingen van de stroomsterkte door en de spanning over de LED. De gebruiker moet het spanningsbereik (in volt) zelf kunnen kiezen. Geef ook de mogelijkheid de metingen op te slaan als CSV-bestand. Gebruik daarvoor een optie `{-`{-}output FILENAME}. Wanneer met die optie een bestandsnaam wordt meegegeven sla je de metingen op en anders niet. Als een meting lang duurt is het niet erg als de resultaten pas ná de meting worden weergegeven.


!!! opdracht-inlever "Pythondaq: Onzekerheid"
    Het is wel fijn om de onzekerheid op de metingen te weten. Bouw een optie in waarmee het aantal herhaalmetingen bij iedere spanning in de meetserie gekozen kan worden. Bereken op basis van de herhaalmetingen de beste schatting van de stoomsterkte en de onzekerheid daarop, en ook voor de spanning over de LED.


### Het meetinstrument kiezen

We kunnen de Arduino benaderen als we de naam weten die de VISA driver er aan heeft toegekend. Helaas kan &mdash; ook afhankelijk van het besturingssysteem &mdash; die naam veranderen als we de Arduino in een andere poort van onze computer steken of soms zelfs als we een andere Arduino op dezelfde poort koppelen. Met het commando `list` laten we alle apparaten zien die gevonden worden door de VISA drivers.

!!! opdracht-inlever "Pythondaq: `list`"
    Schrijf het commando `list` zodat het een lijst geeft van de aangesloten instrumenten &mdash; zoals we in het vorige hoofdstuk al eens gedaan hebben.


!!! opdracht-inlever "Pythondaq: choose device"
    Pas het commando `scan` aan zodat je de naam van een device moet meegeven.
    Zorg dat het gekozen device ook daadwerkelijk wordt gebruikt in het model en de controller.


!!! opdracht-inlever "Pythondaq: `info`"
    Maak een commando `info` waarmee je de identificatiestring van een opgegeven instrument opvraagt en weergeeft. Je kunt het instrument met een optie of argument meegeven.


!!! opdracht-inlever "Pythondaq: Helpteksten"
    Loop al je commando's nog eens na en zorg ervoor dat er duidelijke helpteksten aanwezig zijn. Een nieuwe gebruiker moet met deze informatie met jouw command-line interface uit de voeten kunnen.


!!! opdracht-inlever "Pythondaq: Grafiek"
    Breid je `scan` opdracht uit met een optie om een grafiek te tekenen. Dat kan het makkelijkst met een _boolean flag_. Bijvoorbeeld: `{-`{-}graph} om een grafiek te tekenen en `{-`{-}no-graph} om dat niet te doen. De standaardkeuze kan zijn om dat niet te doen. Lees meer over boolean flags voor Click op [https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags](https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags).


??? opdracht-meer "Pythondaq: `list` `--search`"
    Breid het commando `list` uit met een optie `--search` waarmee je niet een lijst van _alle_ instrumenten krijgt, maar alleen de instrumenten die de zoekterm bevatten. Dus bijvoorbeeld:
    ``` ps1con title="Terminal"
    PS> diode list
    The following devices are connected to your computer:
    
    ASRL/dev/cu.SOC::INSTR
    ASRL/dev/cu.MALS::INSTR
    ASRL/dev/cu.AirPodsvanDavid-Wireles-1::INSTR
    ASRL/dev/cu.Bluetooth-Incoming-Port::INSTR
    ASRL/dev/cu.usbmodem143401::INSTR
    PS> diode list -s usbmodem
    The following devices match your search string:
    
    ASRL/dev/cu.usbmodem143401::INSTR
    ```
    De lijst met instrumenten kan er op Windows heel anders uitzien. Pas daarna `scan` en `info` aan zodat het niet nodig is om de volledige devicenaam mee te geven, maar alleen een zoekterm.


Op dit punt hebben we de functionaliteit van ons snelle script van het vorige hoofdstuk bereikt. Dit was veel meer werk, maar het is veel flexibeler. Als je wilt meten met een andere Arduino, een ander bereik, of een andere stapgrootte dan type je gewoon een iets ander commando in de terminal. Je hoeft geen scripts meer aan te passen. Als je na een tijdje niet meer precies weet hoe het ook alweer werkte allemaal kun je dat snel weer oppakken door `--help` aan te roepen.

!!! opdracht-basis "Alle subcommando's implementeren"
    Kijk nog eens terug naar het lijstje subcommando's die je in \opdref{opd:subcommandos} hebt opgeschreven. Heb je alles geïmplementeerd? Wat zou je willen dat je nog meer kan instellen? Als er tijd over is, kijk dan of dit lukt.


## Een interface met stijl
??? meer-leren "Meer leren"

    Ook command-line interfaces gaan met hun tijd mee. Vroeger waren ze per definitie zwart/wit en statisch, maar tegenwoordig worden interfaces vaak opgeleukt met kleur, emoji's en bewegende progressbars. _Rich_~\cite{rich} is een project dat in recordtijd heel populair is geworden. Het bestaat pas sinds november 2019 en heeft precies twee jaar later meer dan 31000\,\raisebox{-1.5pt}{\FiveStar} verzameld. Dat is _veel_ &mdash; en de populariteit is sindsdien nog verder toegenomen.

    Rich is ontzettend uitgebreid en heeft heel veel mogelijkheden. Voor ons project kan het handig zijn om een progressbar te gebruiken of met Rich een tabel weer te geven. De documentatie~\cite{rich-docs} van Rich is best goed, maar kan lastig zijn om een mooi overzicht te krijgen. Een serie van korte video tutorials kun je vinden bij [https://calmcode.io/rich/introduction.html](https://calmcode.io/rich/introduction.html). Iedere video duurt maar één tot twee minuten en laat mooi de mogelijkheden zien. Voor de functies die je wilt gebruiken kun je dan meer informatie opzoeken in de documentatie van Rich zelf.

    !!! opdracht-meer "Rich"
        Verrijk je interface met Rich. Doe dit naar eigen wens en inzicht.


## Data-analyse
??? meer-leren "Meer leren"

    Door de $I,U$-karakteristiek van de (lichtgevende) diode te analyseren is het mogelijk om de constante van Boltzmann te bepalen. De stoomsterkte door een diode wordt gegeven door de Shockley diodevergelijking \eqref{eq:Shockley}. Zie ook \appref{ch:diode}.

    Lukt het, om binnen de te bepalen onzekerheid, overeenkomst te vinden met de literatuurwaarde? Een LED is helaas geen ideale diode dus dit kan lastig zijn.

    !!! opdracht-meer "Model fitten"
            Fit het model van Shockley aan je $I,U$-karakteristiek. Welke parameters kun je bepalen? Overleg met je begeleider!