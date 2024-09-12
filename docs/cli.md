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
<pre><code>(ecpc) > python -V <button type="button" name="python -V" onclick="runScript('python -V')">{{ enter }}</button><button type="button" name="python -V" onclick="runScript('python -V')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python -V">Python 3.10.13</span>
</code></pre>

Hiermee vraag je Python om het versienummer weer te geven. Soms kunnen _opties_ zelf weer een _argument_ meekrijgen. Bijvoorbeeld:
``` ps1con title="Terminal"
PS> python -m antigravity
```
Met deze regel geef je Python de optie `-m` en die importeert een module (hier `antigravity`) en voert die uit. Probeer maar eens zelf wat er gebeurt als je dat commando uitvoert.

Als applicaties veel verschillende functionaliteit hebben dan krijg je regelmatig te maken met een lange regel met een combinatie van argumenten en opties:
``` ps1con title="Terminal"
PS> conda create -n pythondaq -c conda-forge python pyvisa-py
```
Uitgesplitst in _argumenten_ en __opties__, met vierkante haken [] om aan te geven welke onderdelen bij elkaar horen, is dat:

<q>conda _create_ [__-n__ _pythondaq_] [__-c__ _conda-forge_] [_python pyvisa-py_]</q>


!!! opdracht-basis "Poetry argumenten"
    
    1. Naast `conda create` heb je ook met andere argumenten gewerkt zoals `activate` en `install`. Welke argumenten ken je al van de applicatie `poetry`?
    1. Vraag de lijst met argumenten (commando's) op van Poetry met `poetry list`, hoeveel kende je nog niet?
    
!!! opdracht-basis "Conda opties en argumenten"
    1. Open een `Anaconda Prompt`
    1. Maak gebruik van de optie __-h__ om de helpfunctie van conda op te vragen. (`conda -h`)
    1. Zoek de optie op om de conda versie weer te geven (`conda -V`)
    1. Maak gebruik van de optie __-h__ om de helpfunctie van het commando _activate_ op te vragen (`conda activate -h`)
    1. Welke argumenten moet je meegeven (positional arguments?) en welke opties mag je meegeven (optional arguments?) (argument: env_name_or_prefix, opties: --help, --stack, --no-stack)


### Click
Als we gebruik willen maken van commando's in onze eigen applicatie moeten we weten wat de gebruiker in de terminal typt. Dit is mogelijk met `sys.argv`.[^argv]
Waarbij alles wat we in de terminal typen aan input wordt meegegeven:

[^argv]: argv staat voor: _argument vector_, een lijst met argumenten
<div class="code-box"><button type="button" name="cli.py" onclick="runScript('cli.py')" class="run">{{ run }}</button><button type="button" name="cli.py" onclick="runScript('cli.py')" class="reload invisible">{{ reload }}</button> cli.py
``` py
import sys

print(sys.argv)
```
<pre>
<code>(ecpc) > python cli.py test 123
<span class="invisible" name="cli.py">['cli.py', 'test', '123']</span>
</code></pre></div>

Met if-statements kunnen we acties verbinden aan bepaalde argumenten:
``` py title="cli.py" hl_lines="6-9"
import sys

args = sys.argv
print(args)

if args[1] == "test":
    print(f"This is a test: {args[2]}")
else:
    print(f"CommandNotFoundError: No command '{args[1]}'.")
```

Als je meerdere opties en argumenten meegeeft dan wordt het veel werk om die in je script uit elkaar te plukken en ze goed te interpreteren. Om dat makkelijker te maken zijn er verschillende bibliotheken beschikbaar &mdash; waaronder een paar in de _standard library_. Een hele handige &mdash; die níet in de _standard library_ zit maar wél meegeleverd is met Anaconda &mdash; is Click.[@click]

!!! info
    Click maakt gebruik van _decorators_ (`#!py @decorator`). Om decorators te _gebruiken_, hoef je niet per se te weten hoe ze _werken_. Als je meer wilt weten over de werking ervan kijk dan de [calmcode tutorial](https://calmcode.io/decorators/introduction.html) of lees de [Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/).

Als kort voorbeeld &mdash; geïnspireerd op de documentatie van Click &mdash; nemen we het volgende script:
``` py title="hello.py"
def hello():
    print("Hello physicist!")

if __name__ == "__main__":
    hello()
```

Dit script print de uitdrukking "Hello physicist!". We gaan dit aanpassen en maken het mogelijk om de naam en het aantal begroetingen te kiezen. Hiervoor gebruiken we Click. Allereerst moeten we `#!py click` importeren en aangeven dat we de `#!py hello()`-functie willen gebruiken als _commando_:

``` py title="hello.py" hl_lines="3"
import click

@click.command()
def hello():
    print("Hello physicist!")

if __name__ == "__main__":
    hello()
```

Dit levert ons nog niet zoveel op, maar op de achtergrond is click wel degelijk aan het werk. De `#!py @click.command()` houdt in de gaten wat er in de command line wordt ingetypt. Zo kunnen we de helpfunctie aanroepen door `--help` achter de naam van het script te zetten.

``` ps1con title="Terminal"
python hello.py --help
```
<div id="opd:hello-help"></div>
!!! opdracht-basis "Help functie"
    === "opdracht"
        Je neemt het script {{file}}`hello.py` over. Je vraagt de helpfunctie van het script op. Je ziet een helptekst verschijnen. Je vraagt je af wat er gebeurt als je `#!py @click.command()` weghaald en dan de helpfunctie opvraagt. Je krijgt gewoon de output van de functie `#!py hello()` een geen help tekst.
    === "code"
        **Pseudo-code**
        ``` py title="hello.py"
        import click

        # make function Click command
        # function
            # print hello physicist!

        # when run this script:
            # run function
        ```
        **Testcode**
        <pre><code>(ecpc) > python hello.py --help <button type="button" name="python hello.py_help" onclick="runScript('python hello.py_help')">{{ enter }}</button><button type="button" name="python hello.py_help" onclick="runScript('python hello.py_help')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="python hello.py_help">Usage: hello.py [OPTIONS]        
        Options:
            --help  Show this message and exit.
        </span>
        </code></pre>
        
        
    === "check"
        **Checkpunten:**

        - [ ] Je vraagt de helpfunctie op door `--help` achter de bestandsnaam te zetten in de terminal.
        - [ ] Er verschijnt een standaard helptekst.
        - [ ] Zonder `@click.command()` verschijnt er geen helptekst, maar de output van de functie.


        **Projecttraject:**

        - [x] Help functie
        - [ ] Argumenten toevoegen
        - [ ] Test hello
        - [ ] Helptekst toevoegen
        - [ ] Pauze optie

In de code hieronder geven we met de regel `#!py @click.argument("name")` aan dat we van de gebruiker een argument verwachten. Zorg dat het argument ook gebruikt wordt in de functie `hello`:

``` py title="hello.py" hl_lines="4 6"
import click

@click.command()
@click.argument("name")
def hello(name):
    print(f"Hello {name}!")

if __name__ == "__main__":
    hello()
```

!!! opdracht-basis "Argument toevoegen"
    === "opdracht"
        Je runt het bestand {{file}}`hello.py` en geef achter de bestandsnaam de naam `Alice` mee. Er verschijnt `Hello Alice!` als output in de terminal.
    === "code"
        **Pseudo-code**
        ``` py title="hello.py"
        import click

        # make function Click command
        # make argument name
        # function, parameter name
            # print hello <name>!

        # when run this script:
            # run function
        ```
        **Testcode**
        <pre><code>(ecpc) > python hello.py <button type="button" name="hello.py_name" onclick="runScript('hello.py_name')">{{ enter }}</button><button type="button" name="hello.py_name" onclick="runScript('hello.py_name')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="hello.py_name">Usage: hello.py [OPTIONS] NAME
        Try 'hello.py --help' for help.
        Error: Missing argument 'NAME'.
        </span>
        </code></pre>
        
    === "check"
        **Checkpunten:**

        - [ ] Het draaien van {{file}}`hello.py` zonder een argument: `python hello.py` geeft een foutmelding.
        - [ ] Het draaien van {{file}}`hello.py` met een argument: `python hello.py Alice` werkt zoals verwacht.

        **Projecttraject:**

        - [x] Help functie
        - [x] Argumenten toevoegen
        - [ ] Test hello
        - [ ] Helptekst toevoegen
        - [ ] Pauze optie


!!! warning
    Let er op dat je bij `#!py @click.argument` de naam meegeeft die overeen komt met de namen van de parameters van je functie. In ons geval hebben we een argument `#!py "name"`. Dit moet overeenkomen met de functiedefinitie `#!py def hello(name)`.

Argumenten zijn altijd verplicht en moeten in een vaste volgorde staan. Bij _opties_ is dat anders. Je geeft met mintekens aan dat je een optie meegeeft. Veel opties hebben een lange naam en een afkorting (bijvoorbeeld `--count` en `-c`). Opties kunnen zelf weer een argument hebben (bijvoorbeeld `--count 3`). Het is handig om een standaardwaarde te definiëren. In dat geval mag de gebruiker de optie weglaten. We voegen een for-loop[^weggooivariabele] toe om de begroeting te herhalen.

[^weggooivariabele]: Merk op in de code hieronder: `#!py _` is de weggooivariabele in Python. Het gaat ons erom dat de loop een aantal keer doorlopen wordt en we hoeven niets te doen met de loop index.

``` py title="hello.py" hl_lines="5-9 11"
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
```

!!! opdracht-basis "5 keer hello"
    === "opdracht"
        Je runt het bestand {{file}}`hello.py` en geef achter de bestandsnaam de naam van je assistent mee en geeft aan dat je deze 5 keer wilt printen. Er verschijnt vijf keer `Hello <assistent>!` als output in de terminal.
    === "code"
        **Pseudo-code**
        ``` py title="hello.py"
        import click

        # make function Click command
        # make argument name
        # make option count with default value 1
        # function, parameter name and count
            # repeat count times
                # print hello <name>!

        # when run this script:
            # run function
        ```
        **Testcode**
        <pre><code>(ecpc) > python hello.py David -c 5 <button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')">{{ enter }}</button><button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="python hello.py David -c 5">Hello David!
        Hello David!
        Hello David!
        Hello David!
        Hello David!</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**

        - [ ] Je kan de naam van je assistent 5 keer printen met één commando
        - [ ] Je kan het aantal keer printen opgeven met `-c`.
        - [ ] Je kan het aantal keer printen ook opgeven met `--count`.
        - [ ] Wanneer de optie `count` wordt weggelaten wordt de naam 1 keer geprint.
        - [ ] Wanneer er geen argument wordt meegegeven met `count` volgt een foutmelding:

            <pre><code>(ecpc) > python hello.py David -c <button type="button" name="python hello.py David -c" onclick="runScript('python hello.py David -c')">{{ enter }}</button><button type="button" name="python hello.py David -c" onclick="runScript('python hello.py David -c')" class="invisible">{{ reload }}</button>
            <span class="invisible" name="python hello.py David -c">Error: Option '-c' requires an argument.</span>
            </code></pre>
        

        **Projecttraject:**

        - [x] Help functie
        - [x] Argumenten toevoegen
        - [x] Test hello
        - [ ] Helptekst toevoegen
        - [ ] Pauze optie



!!! warning
    Let er op dat je bij `#!py @click.option` de afkorting met 1 minteken meegeeft en de lange naam met 2 mintekens. De lange naam moet overeenkomen met de paramater van je functie. In ons geval hebben we een optie `#!py "--count"` &mdash; de lange naam telt. Dit moet overeenkomen met de functiedefinitie `#!py def hello(name, count)`.

Het is handig om een korte helptekst toe te voegen. Dit gaat als volgt:

``` py title="hello.py" hl_lines="9-10"
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
```

!!! opdracht-basis "Helptekst toevoegen"
    Voeg de helptekst toe en vraag de helptekst op zoals in de [_opdracht Help functie_](#opd:hello-help).


Als je dit script gebruikt ziet dat er zo uit:
<pre><code>(ecpc) > python hello.py --help <button type="button" name="python hello.py --help" onclick="runScript('python hello.py --help')">{{ enter }}</button><button type="button" name="python hello.py --help" onclick="runScript('python hello.py --help')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py --help">Usage: hello.py [OPTIONS] NAME

Options:
  -c, --count INTEGER  Number of times to print greeting.  [default: 1]
  --help               Show this message and exit.
  </span>

(ecpc) > python hello.py Alice <button type="button" name="python hello.py Alice" onclick="runScript('python hello.py Alice')">{{ enter }}</button><button type="button" name="python hello.py Alice" onclick="runScript('python hello.py Alice')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py Alice">Hello Alice!</span>

(ecpc) > python hello.py Alice -c 2 <button type="button" name="python hello.py Alice -c 2" onclick="runScript('python hello.py Alice -c 2')">{{ enter }}</button><button type="button" name="python hello.py Alice -c 2" onclick="runScript('python hello.py Alice -c 2')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py Alice -c 2">Hello Alice!
Hello Alice!</span>

(ecpc) > python hello.py Alice --count 3 <button type="button" name="python hello.py Alice --count 3" onclick="runScript('python hello.py Alice --count 3')">{{ enter }}</button><button type="button" name="python hello.py Alice --count 3" onclick="runScript('python hello.py Alice --count 3')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py Alice --count 3">Hello Alice!
Hello Alice!
Hello Alice!</span>
</code></pre>

<div id="opd:hello-pauze"></div>
!!! opdracht-basis "Pauze optie"
    === "opdracht"
        Je runt het bestand {{file}}`hello.py` en geef achter de bestandsnaam de naam van je assistent mee en geeft aan dat je deze 5 keer wilt printen met een pauze van 2 seconde ertussen. Het duurt 8 seconden voordat er vijf keer `Hello <assistent>!` als output in de terminal staat. Als je geen pauze-optie meegeeft wordt er ook geen pauze gehouden. 
        
        !!! info
            Je kan hiervoor gebruik maken van de module _time_ die standaard met Python meekomt[^standard-library]. Met de functie `#! sleep()` kun je de executie van de volgende regel in het script met een aantal seconden uitstellen.

            ``` py
            import time
            # wait 28 second
            time.sleep(28)
            ```

            [^standard-library]: Zie ook: [The Python Standard Library](vervolg-python.md#de-standard-library-en-de-python-package-index)
    === "code"
        **Pseudo-code**
        ``` py title="hello.py"
        import click

        # make function Click command
        # make argument name
        # make option count with default value 1
        # make option pause
        # function, parameter name and count
            # repeat count times
                # print hello <name>!
                # pause

        # when run this script:
            # run function
        ```
        **Testcode**
        <pre><code>(ecpc) > python hello.py David -c 5 <button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')">{{ enter }}</button><button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="python hello.py David -c 5">Hello David!
        Hello David!
        Hello David!
        Hello David!
        Hello David!</span>
        </code></pre>

    === "check"
        **Checkpunten:**

        - [ ] Als de pauze optie niet wordt meegegeven, dan wordt er géén pauze ingelast
        - [ ] Bij het meegeven van de pauze optie, wacht het programma zo lang als verwacht

        **Projecttraject:**

        - [x] Help functie
        - [x] Argumenten toevoegen
        - [x] Test hello
        - [x] Helptekst toevoegen
        - [x] Pauze optie


Opties zonder argument werken als vlag &mdash; een soort aan/uitknop.[^flag]
[^flag]: Zie voor meer informatie over flags de [Click documentatie](https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags).

???+ opdracht-meer "Vlag"
    Gebruik een optie als vlag om de gebruiker te laten kiezen tussen het wel (<q>tea</q>) of niet (<q>no tea</q>) aanbieden van een kopje thee. Zorg dat er standaard <q>tea</q> wordt aangeboden.


!!! opdracht-basis "Argumenten en opties"
    === "opdracht"
        Je opent met Github Desktop de {{github}}`just_count` in Visual Studio Code. Je hebt ooit een environment voor deze repository aangemaakt maar je hebt geen idee of die in de tussentijd niet per ongeluk stuk is gegaan. Daarom maak je {{lightbulb}} een nieuwe environment `just_count` met daarin Python en gebruikt Poetry om het pakket `just_count` in de nieuwe omgeving te installeren. 

        Je activeert het juiste conda environment en met het commando `square 6` wordt het kwadraat van 6 in de terminal geprint.

        !!! info argument is standaard string
            Click maakt van alle argumenten een string, tenzij je een default waarde of een type definieerd. Gebruik `#!py type=int`, `#!py type=float` enzovoorts om aan te geven wat voor type object het argument moet worden

        ???+ opdracht-meer "Meer functies"
            1. Pas de applicatie aan zodat je kan kiezen tussen het kwadraat of de wortel van het getal. 
    === "code"
        **Pseudo-code**
        ``` py title="count_count.py"
        import square

        # Add functionality to select a number via click and print its square
        def main():
            print(f"The square of 5 is {square.square(5)}")

        if __name__ == '__main__':
            main()
        ```
        **Testcode**
        <pre><code>(ecpc) > square 6 <button type="button" name="square 6" onclick="runScript('square 6')">{{ enter }}</button><button type="button" name="square 6" onclick="runScript('square 6')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="square 6">The square of 6 is 36</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**

        - [ ] Je hebt `poetry install` in een schone environment (met alleen Python) gedaan.
        - [ ] Je hebt de juiste omgeving geactiveerd.
        - [ ] Je kan zelf het getal kiezen met het commando en krijgt het verwachte antwoord terug
        - [ ] Bij het aanroepen van `count --help` krijg je duidelijke helpteksten en default waardes te zien waarmee je het programma kan begrijpen

        **Projecttraject**
        
        - [x] Main functie toevoegen
        - [x] commando toevoegen
        - [x] Commando testen
        - [x] Argumenten en opties

    
### Click subcommando's
Tot nu toe konden we maar één functie uitvoeren in onze applicatie. Maar het is ook mogelijk om subcommando's aan te maken zodat je met één programma meerdere <q>taken</q> kunt uitvoeren. Denk bijvoorbeeld aan `conda`. Je installeert packages met `conda install`, verwijdert ze met `conda remove`, maakt een environment met `conda create` en activeert het met `conda activate`.

!!! opdracht-basis "Subcommando's bedenken"
    <div id="opd:subcommandos"></div>
    Je gaat de `pythondaq` applicatie straks verder uitbreiden zodat er veel meer mogelijk is dan nu. Wat zou je willen dat de applicatie allemaal kan? Welke subcommando's wil je gaan aanmaken? Overleg met elkaar om goede ideeën uit te wisselen.



Een eenvoudig voorbeeldscript waarin de conda commando's `install` en `remove` worden nagebootst leggen we hieronder uit. Eerst de code:

``` py title="fake_conda.py" linenums="1"
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
```
In (de laatste) regel 18 roepen we de hoofdfunctie aan die we enigszins willekeurig `#!py cmd_group()` genoemd hebben en die we bovenaan definiëren. In tegenstelling tot het {{file}}`hello.py`-script doet deze functie helemaal niets (`#!py pass`). We vertellen aan click dat we een groep van commando's aan gaan maken met de `#!py @click.group()`-decorator in regel 3. Vervolgens gaan we commando's binnen deze groep hangen door _niet_ de decorator `#!py @click.command()` te gebruiken, maar `#!py @cmd_group.command()` &mdash; zie regels 7 en 12. De namen van de commando's die worden aangemaakt zijn de namen van de functies. Dus regel 7 en 9 maken samen het commando `install`. Verder werkt alles hetzelfde. Dus een argument toevoegen &mdash; zoals in regel 8 &mdash; is gewoon met `#!py @click.argument()`. Hier hoef je geen `#!py cmd_group` te gebruiken.

<div id="warn:cmd_name"></div>
!!! warning
    Omdat de naam van een subcommando gelijk is aan de functienaam kan dat voor problemen zorgen wanneer je gereserveerde namen van python wilt gebruiken zoals: `#!py import`, `#!py return`, `#!py lambda`. Of wanneer je de naam van het subcommando graag hetzelfde wilt hebben als een ander pythonfunctie zoals `#!py sin` of `#!py list`.
    Een oplossing is om de functienaam aan te passen en de subcommando naam expliciet aan click mee te geven bij `command`:
    ``` py
    @cmd_group.command("import")
    @click.argument("package")
    def import_package(package):
        print(f"import {package}...")
    ```
    We hebben nu een commando `import` aangemaakt &mdash; _niet_ een commando `import_package`.

!!! opdracht-basis "Fake conda"
    === "opdracht"
        Nu je hebt geleerd om met Click subcommando's te maken wil je deze uittesten in combinatie met het commando wat je met Poetry kan aanmaken om een functie uit een script uit te voeren. Je maakt in de map {{folder}}`ECPC` {{lightbulb}} een nieuw Poetry project aan voor {{folder}}`fake_conda` en zet daarin de code uit het bestand {{file}}`fake_conda.py`. Je past de {{file_lines}}`pyproject.toml` aan zodat je met het commando `fake_conda install scipy` zogenaamd `scipy` kunt installeren. 

        !!! info "commando"
            Als je een commando met Poetry toevoegt dan heeft dat de opbouw `naam_commando = "package.module:naam_functie"`, welke functie moet uitgevoerd worden als je het commando aanroept?
    === "code"
        **Pseudo-code**
        ``` toml title="pyproject.toml"
        [tool.poetry.scripts]
        naam_commando = "package.module:naam_functie"
        ```
        **Testcode**
        <pre><code>(ecpc) > fake_conda install scipy <button type="button" name="fake_conda install scipy" onclick="runScript('fake_conda install scipy')">{{ enter }}</button><button type="button" name="fake_conda install scipy" onclick="runScript('fake_conda install scipy')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="fake_conda install scipy">Installing scipy...</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**

        - [ ] In de pyproject.toml verwijst `[tool.poetry.scripts]` naar een functie zodat `install` en `remove` subcommando's zijn.
        - [ ] Het commando `fake_conda install scipy` print de tekst `Installing scipy...` als output in de terminal. 

        **Projecttraject**

        - [ ] Fake conda

!!! opdracht-meer "Smallangle (meer leren)"
    Met deze opdracht kun je testen hoe goed je het Python-jargon onder de knie hebt. Je zult het woord <q>smallangle</q> zó vaak tegenkomen dat het je duizelt &mdash; maar jij weet precies over welk onderdeel we het hebben.

    1. Maak een nieuw poetry project (met een `src` indeling) aan met de naam {{github}}`smallangle`.
    1. Let op de Octocat {{github}} voor {{github}}`smallangle`, het moet dus een repository zijn (of worden). 
    1. Maak een nieuw environment die `smallangle` heet met daarin alleen Python.
    1. Zet in het package {{folder}}`smallangle` een module {{file}}`smallangle.py`.
    1. Plak de onderstaande code in {{file}}`smallangle.py`:
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
    1. Ga door naar stap 2 van de [_opdracht smallangle_](#opd:smallangle). Je mag stap 1 overslaan &mdash; dat werk heb je nu zelf al gedaan.
    

<div id="opd:smallangle"></div>
!!! opdracht-inlever "smallangle"
    Het project {{github}}`smallangle` wordt met Poetry beheerd. Je gaat click aan de module {{file}}`smallangle.py` toevoegen zodat je met subcommando's, argumenten en/of opties kunt werken. Tot slot maak je van smallangle een applicatie die je in de terminal kunt aanroepen.

    1. Ga naar GitHub naar {{github}}`AnneliesVlaar/smallangle` en [open de repository in GitHub desktop](x-github-client://openRepo/https://github.com/AnneliesVlaar/smallangle) in GitHub Desktop en Visual Studio Code.
    1. Installeer de package in een nieuw environment.
    1. Run het script {{file}}`smallangle.py` en los de errors op totdat het werkt.
    1. Voeg click toe zodat je de subcommando's `sin` en `tan` hebt. Het aantal stappen (het aantal $x$-waardes tussen 0 en $2\pi$) moet gekozen kunnen worden met een optie (geef een standaardwaarde mee, zodat de gebruiker de optie kan weglaten).

        ??? info "TypeError: 'int' object is not iterable"

            Probeer je de code te draaien maar krijg je een foutmelding zoals deze:
            ``` ps1 title="Terminal"
            Traceback (most recent call last):
            File "c:\smallangle\src\smallangle\smallangle.py", line 28, in < module >
                sin(10)
            File "C:\click\core.py", line 1157, in __call__     
                return self.main(*args, **kwargs)
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^
            File "C:\click\core.py", line 1067, in main
                args = list(args)
                    ^^^^^^^^^^
            TypeError: 'int' object is not iterable
            ```

            Dan komt dat doordat je `#!py sin(10)` probeert uit te voeren, terwijl de functie al verClickt is. De functie verwacht een argument vanuit de terminal en geen integer vanuit het pythonscript.
            Pas je script aan zodat `#!py if __name__ == "__main__":` naar de juiste functie verwijst en Click aanroept; niet `#!py sin(10)`.

    1. Zorg dat smallangle een applicatie wordt die je aan kunt roepen met bijvoorbeeld `smallangle sin -n 9`.

!!! opdracht-inlever "smallangle installeren"
    === "opdracht"
        Je cloned het Poetry project {{github}}`smallangle` van {{github}}`AnneliesVlaar/smallangle` door [de repository in GitHub desktop te openen](x-github-client://openRepo/https://github.com/AnneliesVlaar/smallangle). Daarna open je het project in Visual Studio Code. Na het installeren van het project in een nieuwe conda environment run je het bestand {{file}}`smallangle.py` en krijg je een lijst van 10 punten tussen 0 en 2 $\pi$ en de sinus van deze punten. 
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="smallangle" onclick="runScript('smallangle')" class="run">{{ run }}</button><button type="button" name="smallangle" onclick="runScript('smallangle')" class="reload invisible">{{ reload }}</button> smallangle.py
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
        <pre>
        <code>(ecpc) > python smallangle.py
        <span class="invisible" name="smallangle">          x       sin (x)
        0  0.000000  0.000000e+00
        1  0.698132  6.427876e-01
        2  1.396263  9.848078e-01
        3  2.094395  8.660254e-01
        4  2.792527  3.420201e-01
        5  3.490659 -3.420201e-01
        6  4.188790 -8.660254e-01
        7  4.886922 -9.848078e-01
        8  5.585054 -6.427876e-01
        9  6.283185 -2.449294e-16</span>
        </code></pre></div>
    === "check"
        **Checkpunten:**

        - [ ] Het project is geïnstalleerd in een nieuwe conda environment.
        - [ ] Na het installeren van het pakket geeft de code de verwachte output.

        **Projecttraject:**

        - [x] smallangle installeren
        - [ ] smallangle aanpassen
        - [ ] smallangle docstrings

!!! opdracht-inlever "smallangle aanpassen"
    === "opdracht"
        Je kunt met het commando `smallangle` en de subcommando's `sin` en `tan` een lijst genereren van getallen tussen de 0 en 2 $\pi$ en de bijbehorende sinus dan wel tanges van deze getallen. Met de optie `-n` kan je het aantal stappen (het aantal $x$-waardes tussen 0 en $2\pi$) kiezen. Als je de optie `-n` weglaat werkt de applicatie met een standaardwaarde.

        !!! info "TypeError: 'int' object is not iterable"

            Probeer je de code te draaien maar krijg je een foutmelding zoals deze:
            ``` ps1 title="Terminal"
            Traceback (most recent call last):
            File "c:\smallangle\src\smallangle\smallangle.py", line 28, in <module>
                sin(10)
            File "C:\click\core.py", line 1157, in __call__     
                return self.main(*args, **kwargs)
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^
            File "C:\click\core.py", line 1067, in main
                args = list(args)
                    ^^^^^^^^^^
            TypeError: 'int' object is not iterable
            ```

            Dan komt dat doordat je `#!py sin(10)` probeert uit te voeren, terwijl de functie al verClickt is. De functie verwacht een argument vanuit de terminal en geen integer vanuit het pythonscript.
            Pas je script aan zodat `#!py if __name__ == "__main__":` naar de juiste functie verwijst en Click aanroept; niet `#!py sin(10)`.
    === "code"
        <pre><code>(ecpc) > smallangle sin -n 9 <button type="button" name="smallangle sin -n 9" onclick="runScript('smallangle sin -n 9')">{{ enter }}</button><button type="button" name="smallangle sin -n 9" onclick="runScript('smallangle sin -n 9')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="smallangle sin -n 9">          x       sin (x)
        0  0.000000  0.000000e+00
        1  0.785398  7.071068e-01
        2  1.570796  1.000000e+00
        3  2.356194  7.071068e-01
        4  3.141593  1.224647e-16
        5  3.926991 -7.071068e-01
        6  4.712389 -1.000000e+00
        7  5.497787 -7.071068e-01
        8  6.283185 -2.449294e-16</span>
        </code></pre>
        
        
    === "check"
        **Checkpunten:**

        - [ ] De gebruiker kan met subcommando's kiezen tussen `sin` en `tan`.
        - [ ] De gebruiker kan het aantal stappen kiezen met een optie.
        - [ ] De gebruiker kan de optie ook weglaten.

        **Projecttraject:**

        - [x] smallangle installeren
        - [x] smallangle aanpassen
        - [ ] smallangle docstrings

???+ opdracht-meer "Smallangle (uitdaging)"
    Met het commando `approx` en een argument $\epsilon$ moet het script de grootste hoek geven waarvoor nog geldt dat $\lvert x - \sin(x) \rvert \leq \epsilon$, ofwel de grootste hoek waarvoor de kleine-hoekbenadering nog geldt met de opgegeven nauwkeurigheid. Doe dit op drie cijfers nauwkeurig (loop over .000, .001 en .002, etc. totdat de vergelijking niet meer geldt). N.B. besteed geen tijd aan het analytisch oplossen van de vergelijking. Een voorbeeld van de uitvoer:
    <pre><code>(ecpc) > smallangle approx .1 <button type="button" name="smallangle approx .1" onclick="runScript('smallangle approx .1')">{{ enter }}</button><button type="button" name="smallangle approx .1" onclick="runScript('smallangle approx .1')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="smallangle approx .1">For an accuracy of 0.1, the small-angle approximation holds
    up to x = 0.854.</span>
    </code></pre>

## Docstrings en Click `--help`

Docstrings werken ook heel handig samen met Click want ze worden gebruikt als we de helpfunctie aanroepen. 
!!! info
    We gebruiken bij click-functies niet de standaard structuur voor docstrings. Click breekt de docstrings standaard af waardoor het algauw een onogelijke brij aan informatie wordt. We kiezen daarom voor een samenvatting en eventueel een korte toelichting daarop. 

???+ meer-leren "Uitgebreide documentatie en Click"
    In de documentatie van Click vind je meer informatie over het afbreken van zinnen (en het [voorkomen](https://click.palletsprojects.com/en/8.1.x/documentation/#preventing-rewrapping) daarvan). Ook vind je daar een manier om een uitgebreide docstring te schrijven [zonder](https://click.palletsprojects.com/en/8.1.x/documentation/#truncating-help-texts) dat het een bende wordt.

We voegen docstrings toe aan fake-conda:

``` py title="fakeconda.py"
import click


@click.group()
def cmd_group():
    pass


@cmd_group.command()
@click.argument("package")
def install(package):
    """Install a conda PACKAGE.

    PACKAGE is the name of the package.
    """
    print(f"Installing {package}...")


@cmd_group.command()
@click.argument("package")
def remove(package):
    """Remove a conda PACKAGE.

    PACKAGE is the name of the package.
    """
    print(f"Removing {package}...")

if __name__ == "__main__":
    cmd_group()
```
Als we vervolgens de help functie aanroepen zien we de eerste regel van de docstrings verschijnen voor alle subcommando's:
<pre><code>(ecpc) > python fake_conda.py --help <button type="button" name="python fake_conda --help" onclick="runScript('python fake_conda --help')">{{ enter }}</button><button type="button" name="python fake_conda --help" onclick="runScript('python fake_conda --help')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python fake_conda --help">Usage: fake_conda.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  install  Install a conda PACKAGE.
  remove   Remove a conda PACKAGE.</span>
</code></pre>


Daarna kun je uitleg vragen voor de subcommando's waarbij je de hele docstring te zien krijgt:

<pre><code>(ecpc) > python fake_conda.py install --help <button type="button" name="python fake_conda.py install --help" onclick="runScript('python fake_conda.py install --help')">{{ enter }}</button><button type="button" name="python fake_conda.py install --help" onclick="runScript('python fake_conda.py install --help')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python fake_conda.py install --help">Usage: fake_conda.py install [OPTIONS] PACKAGE

  Install a conda PACKAGE.

  PACKAGE is the name of the package.

Options:
  --help  Show this message and exit.</span>
</code></pre>

!!! opdracht-inlever "Smallangle docstrings"
    === "opdracht"
        Je gebruikt het commando `smallangle --help` en leest de helptekst van de [_opdracht smallangle_](#opd:smallangle). De helptekst bevat zinvolle informatie die je in staat stelt om te begrijpen wat je met de applicatie kan doen. Je ziet dat er twee subcommando's zijn en bekijkt de helptekst van deze commando's met `smallangle sin --help` en daarna `smallangle tan --help`. Beide helpteksten stellen je in staat op de applicatie te begrijpen en te bedienen. Tevreden test je de applicatie verder uit.
    === "code"
        **Pseudo-code**
        ```
        """Summary containing ARGUMENTs.

        ARGUMENT description of the argument.
        """
        ```
        **Testcode**
        <pre><code>(ecpc) > smallangle --help <button type="button" name="smallangle --help" onclick="runScript('smallangle --help')">{{ enter }}</button><button type="button" name="smallangle --help" onclick="runScript('smallangle --help')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="smallangle --help">Usage: smallangle [OPTIONS] COMMAND [ARGS] ...
            Options: 
                --help Show this message and exit.
            Commands:
                Subcommand Summary containing ARGUMENTs.
        </span>
        </code></pre>
        
    === "check"
        **Checkpunten:**
    
        - [ ] `smallangle --help` geeft zinvolle informatie
        - [ ] `smallangle sin --help` geeft zinvolle informatie
        - [ ] `smallangle tan --help` geeft zinvolle informatie

        **Projecttraject**
    
        - [x] smallangle installeren
        - [x] smallangle aanpassen
        - [x] smallangle docstrings

## Command-line interface voor ons experiment

In [hoofdstuk _Model-View-Controller_](mvc.md) heb je `pythondaq` uitgesplitst in model, view en controller. Wanneer we een command-line interface gaan bouwen dan is dat de softwarelaag tussen de gebruiker en de rest van de code. De command-line interface is dus een _view_. Het is helemaal niet gek om meerdere views te hebben, bijvoorbeeld een eenvoudig script zoals {{file}}`view.py`, een command-line interface en een grafische interface. Hier gaan we ons richten op een command-line interface. We gaan een nieuw bestand {{file}}`cli.py` aanmaken en dat langzaam opbouwen.

!!! opdracht-inlever "Pythondaq: commando's"

    1. Maak een nieuw bestand {{file}}`src/pythondaq/cli.py`.
    1. Maak een `#!py @click.group()` aan en voeg de subcommando's `list` en `scan` daaraan toe. Laat de commando's voorlopig alleen een willekeurige korte tekst printen; ze hoeven nu nog niet echt iets te doen. Merk op dat `#!py list()` een Pythonfunctie is, dus daar moet je misschien nog iets mee.[^cmd_name]
    1. Zorg dat je de command-line applicatie met de naam `diode` in de terminal kunt aanroepen, inclusief de subcommando's `list` en `scan`, dus bijvoorbeeld:

        ``` ps1con title="Terminal"
        PS> diode list
        List, dit moet ik later nog afmaken.
        ```

!!! opdracht-inlever "Pythondaq: commando's"
    === "opdracht"
        1. Maak een nieuw bestand {{new_file}}`src/pythondaq/cli.py`.
        1. Maak een `#!py @click.group()` aan en voeg de subcommando's `list` en `scan` daaraan toe. Laat de commando's voorlopig alleen een willekeurige korte tekst printen; ze hoeven nu nog niet echt iets te doen. Merk op dat `#!py list()` een Pythonfunctie is, dus daar moet je misschien nog iets mee.[^cmd_name]
        
    === "code"
        <pre><code>(ecpc) > diode list <button type="button" name="diode list" onclick="runScript('diode list')">{{ enter }}</button><button type="button" name="diode list" onclick="runScript('diode list')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode list">List, dit moet ik later nog afmaken.</span>
        </code></pre>

    === "check"
        **Checkpunten:**

        - [ ] De applicatie is aan te roepen met `diode`.
        - [ ] De subcommando's `list` en `scan` verwijzen naar de juiste functies.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [ ] Pythondaq: `scan`
        - [ ] Pythondaq: herhaalmetingen
        - [ ] Pythondaq: `list`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: Helpteksten
        - [ ] Pythondaq: Grafiek
    
[^cmd_name]: Zie ook de waarschuwing op [warn:cmd_name](#warn:cmd_name)


### Het uitvoeren van een meetserie

We gaan ons eerst richten op het uitvoeren van een volledige meetserie en het tonen van de resultaten daarvan aan de gebruiker.

!!! info
    Bij het opgeven van argumenten en opties voor de spanning kan het belangrijk zijn om te controleren of de spanning überhaupt wel een getal is tussen 0 en 3.3 V. Je kunt dit doen door de `#!py type`-parameter in `#!py @click.argument()` en `#!py @click.option()`. Je kunt een Pythontype opgeven (bijvoorbeeld: `#!py type=int` of `#!py type=float`) en Click heeft speciale types zoals `#!py type=click.FloatRange(0, 3.3)` voor een kommagetal tussen 0 en 3.3. Bekijk alle speciale types in de [Click documentatie](https://click.palletsprojects.com/en/8.1.x/parameters/#parameter-types). Als je hiervan gebruik maakt hoef je niet _zelf_ te controleren of de parameters kloppen. Click doet dat voor je.

!!! opdracht-inlever "Pythondaq: `scan`"
    Met het commando `scan` wil je een meetserie uitvoeren over een spanningsbereik. Als een meting lang duurt is het niet erg als de resultaten pas ná de meting worden weergegeven. Je applicatie moet straks het volgende kunnen:
    
    1. Print een lijst van metingen van de stroomsterkte dóór en de spanning óver de LED.
    1. De gebruiker moet het spanningsbereik (in volt) zelf kunnen opgeven met argumenten of opties.
    1. Geef ook de mogelijkheid de metingen op te slaan als CSV-bestand. Gebruik daarvoor een optie `--output FILENAME`. Wanneer met die optie een bestandsnaam wordt meegegeven sla je de metingen op en anders niet.

!!! opdracht-inlever "Pythondaq: `scan`"
    === "opdracht"
        Met het commando `scan` wil je een meetserie uitvoeren over een spanningsbereik. Als een meting lang duurt is het niet erg als de resultaten pas ná de meting worden weergegeven.
        
    === "code"
        <pre><code>(ecpc) > diode scan --output FILENAME <button type="button" name="diode scan --output FILENAME" onclick="runScript('diode scan --output FILENAME')">{{ enter }}</button><button type="button" name="diode scan --output FILENAME" onclick="runScript('diode scan --output FILENAME')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode scan --output FILENAME">...</span>
        </code></pre>
        

    === "check"
        **Checkpunten:**

        - [ ] Het programma print een lijst van metingen van de stroomsterkte dóór en de spanning óver de LED.
        - [ ] De gebruiker moet het spanningsbereik (in volt) zelf kunnen opgeven met argumenten of opties.
        - [ ] De gebruiker kan de metingen opslaan in een CSV-bestand met een optie `--output FILENAME`.
        - [ ] De meting wordt alleen opgeslagen als de optie wordt meegegeven.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [ ] Pythondaq: herhaalmetingen
        - [ ] Pythondaq: `list`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: Helpteksten
        - [ ] Pythondaq: Grafiek

!!! opdracht-inlever "Pythondaq: herhaalmetingen"
    Als het goed is geeft je programma al een onzekerheid op de metingen terug op basis van herhaalmetingen. Bouw een optie in waarmee het aantal herhaalmetingen gekozen kan worden. Waarschijnlijk doe je dat al, maar bereken op basis van de herhaalmetingen de beste schatting van de stoomsterkte en de onzekerheid daarop, en ook voor de spanning over de LED.

!!! opdracht-inlever "Pythondaq: herhaalmetingen"
    === "opdracht"
        Als het goed is geeft je programma al een onzekerheid op de metingen terug op basis van herhaalmetingen. De gebruiker wil nu het aantal herhaalmetingen kunnen kiezen met een optie.
 
    === "check"
        **Checkpunten:**

        - [ ] De gebruiker kan het aantal herhaalmetingen met een optie kiezen.
        - [ ] De herhaalmetingen worden gebruikt om de beste schatting en onzekerheid te berekenen van de stroomsterkte en de spanning.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [ ] Pythondaq: `list`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: Helpteksten
        - [ ] Pythondaq: Grafiek

### Het meetinstrument kiezen

We kunnen de Arduino benaderen als we de naam weten die de VISA driver er aan heeft toegekend. Helaas kan &mdash; ook afhankelijk van het besturingssysteem &mdash; die naam veranderen als we de Arduino in een andere poort van onze computer steken of soms zelfs als we een andere Arduino op dezelfde poort koppelen. Met het commando `list` laten we alle apparaten zien die gevonden worden door de VISA drivers.

!!! opdracht-inlever "Pythondaq: `list`"
    Schrijf het commando `list` zodat het een lijst geeft van de aangesloten instrumenten &mdash; zoals we in het vorige hoofdstuk al eens gedaan hebben.

!!! opdracht-inlever "Pythondaq: `list`"
    === "opdracht"
        De gebruiker wil nu ook makkelijk de lijst met aangesloten instrumenten op kunnen vragen met het subcommando `list` &mdash; zoals we in het vorige hoofdstuk al eens gedaan hebben.
        
    === "code"
        <pre><code>(ecpc) > diode list <button type="button" name="diode list_filled_in" onclick="runScript('diode list_filled_in')">{{ enter }}</button><button type="button" name="diode list_filled_in" onclick="runScript('diode list_filled_in')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode list_filled_in">[lijst met devices]</span>
        </code></pre>

    === "check"
        **Checkpunten:**

        - [ ] De gebruiker kan met `diode list` de lijst met aangesloten devices opvragen.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: Helpteksten
        - [ ] Pythondaq: Grafiek

!!! opdracht-inlever "Pythondaq: choose device"
    Pas het commando `scan` aan zodat je de poortnaam van een device kunt meegeven. Zorg dat het gekozen device ook daadwerkelijk wordt gebruikt in het model en de controller. Als je géén poortnaam opgeeft, geef dan een foutmelding.

!!! opdracht-inlever "Pythondaq: choose device"
    === "opdracht"
        De gebruiker wil nu bij het aanroepen van `scan` ook een poortnaam van een device mee kunnen geven.

    === "check"
        **Checkpunten:**

        - [ ] De gebruiker kan een poortnaam meegeven.
        - [ ] De gekozen device wordt ook daadwerkelijk gebruikt in het model en de controller.
        - [ ] Als géén poortnaam wordt opgegeven, krijgt de gebruiker een foutmelding.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: choose device
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: Helpteksten
        - [ ] Pythondaq: Grafiek

!!! opdracht-inlever "Pythondaq: `info`"
    Maak een commando `info` waarmee je de identificatiestring[^identificatie] van een opgegeven instrument opvraagt en weergeeft. Je kunt het instrument met een optie of argument meegeven.

    [^identificatie]: De identificatiestring van onze Arduino was `Arduino VISA firmware v1.0.0`. Je moet natuurlijk niet letterlijk deze string copy/pasten, maar de identificatie opvragen van het instrument. Welk firmwarecommando moest je daarvoor ook alweer gebruiken?

!!! opdracht-inlever "Pythondaq: `info`"
    === "opdracht"
        We willen nu de identificatiestring[^identificatie] van een opgegeven instrument op kunnen vragen en weergeven.
        
    === "code"
        Bijvoorbeeld:
        <pre><code>(ecpc) > diode info ASRL3::INSTR <button type="button" name="diode info ASRL3::INSTR" onclick="runScript('diode info ASRL3::INSTR')">{{ enter }}</button><button type="button" name="diode info ASRL3::INSTR" onclick="runScript('diode info ASRL3::INSTR')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode info ASRL3::INSTR">Arduino VISA firmware v1.0.0</span>
        </code></pre>

    === "check"
        **Checkpunten:**

        - [ ] De identificatiestring is met `diode info ...` op te vragen.
        - [ ] De string is niet direct gecopypaste, maar wordt daadwerkelijk opgevraagd.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: choose device
        - [x] Pythondaq: `info`
        - [ ] Pythondaq: Helpteksten
        - [ ] Pythondaq: Grafiek


!!! opdracht-inlever "Pythondaq: Helpteksten"
    Loop al je commando's nog eens na en zorg ervoor dat er duidelijke helpteksten aanwezig zijn. Een nieuwe gebruiker moet met deze informatie met jouw command-line interface uit de voeten kunnen.

!!! opdracht-inlever "Pythondaq: Helpteksten"
    === "opdracht"
        Een nieuwe gebruiker moet ook jouw command-line interface kunnen gebruiken, dus voeg duidelijke helpteksten toe aan je applicatie.

    === "check"
        **Checkpunten:**

        - [ ] `diode --help` vertelt duidelijk welke subcommando's aanwezig zijn en wat ze doen.
        - [ ] Bij de subcommando's, bijvoorbeeld `diode list --help`, is het duidelijk welke opties en argumenten er zijn, wat de standaardwaarden zijn en wat ze doen.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: choose device
        - [x] Pythondaq: `info`
        - [x] Pythondaq: Helpteksten
        - [ ] Pythondaq: Grafiek

!!! opdracht-inlever "Pythondaq: Grafiek"
    Breid je `scan` opdracht uit met een optie om een grafiek te tekenen. Dat kan het makkelijkst met een _boolean flag_. Bijvoorbeeld: `--graph` om een grafiek te tekenen en `--no-graph` om dat niet te doen. De standaardkeuze kan zijn om dat niet te doen. Lees meer over boolean flags in de [Click documentatie](https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags).

!!! opdracht-inlever "Pythondaq: Grafiek"
    === "opdracht"
        Als laatste willen we een grafiek kunnen maken van onze metingen. De gebruiker moet dit aan kunnen geven met een optie. Dat kan het makkelijkst met een _boolean flag_. Bijvoorbeeld: `--graph` om een grafiek te tekenen en `--no-graph` om dat niet te doen. De standaardkeuze kan zijn om dat niet te doen. Lees meer over boolean flags in de [Click documentatie](https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags).

    === "check"
        **Checkpunten:**

        - [ ] De grafiek wordt alleen gemaakt wanneer `--graph` wordt meegegeven.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: choose device
        - [x] Pythondaq: `info`
        - [x] Pythondaq: Helpteksten
        - [x] Pythondaq: Grafiek

???+ opdracht-meer "Pythondaq: `list --search`"
    Breid het commando `list` uit met een optie `--search` waarmee je niet een lijst van _alle_ instrumenten krijgt, maar alleen de instrumenten die de zoekterm bevatten. Dus bijvoorbeeld:
    <pre><code>(ecpc) > diode list <button type="button" name="diode list" onclick="runScript('diode list')">{{ enter }}</button><button type="button" name="diode list" onclick="runScript('diode list')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="diode list">The following devices are connected to your computer:                                                                             
    ASRL/dev/cu.SOC::INSTR
    ASRL/dev/cu.MALS::INSTR
    ASRL/dev/cu.AirPodsvanDavid-Wireles-1::INSTR
    ASRL/dev/cu.Bluetooth-Incoming-Port::INSTR
    ASRL/dev/cu.usbmodem143401::INSTR 
    </span>
    (ecpc) > diode list -s usbmodem <button type="button" name="diode list -s usbmodem" onclick="runScript('diode list -s usbmodem')">{{ enter }}</button><button type="button" name="diode list -s usbmodem" onclick="runScript('diode list -s usbmodem')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="diode list -s usbmodem">The following devices match your search string:                                                                       
    ASRL/dev/cu.usbmodem143401::INSTR </span>
    </code></pre>

    De lijst met instrumenten kan er op Windows heel anders uitzien. Sterker nog, op Windows is de lijst meestal vrij saai. Maar leen eens heel even een Arduino van iemand anders en je ziet dat er dan _twee_ poorten in de lijst verschijnen.
    
    Pas &mdash; na het uitbreiden van `list` &mdash; de commando's `scan` en `info` aan zodat het niet nodig is om de volledige devicenaam mee te geven, maar alleen een zoekterm.


Op dit punt hebben we de functionaliteit van ons snelle script van het vorige hoofdstuk bereikt. Dit was veel meer werk, maar het is veel flexibeler. Als je wilt meten met een andere Arduino, een ander bereik, of een andere stapgrootte dan type je gewoon een iets ander commando in de terminal. Je hoeft geen scripts meer aan te passen. Als je na een tijdje niet meer precies weet hoe het ook alweer werkte allemaal kun je dat snel weer oppakken door `--help` aan te roepen.

!!! opdracht-basis "Alle subcommando's implementeren"
    Kijk nog eens terug naar het lijstje subcommando's die je in [opdracht _Subcommando's bedenken_](cli.md#opd:subcommandos) hebt opgeschreven. Heb je alles geïmplementeerd? Wat zou je willen dat je nog meer kan instellen? Als er tijd over is, kijk dan of dit lukt.


???+ meer-leren "Rich"

    ## Een interface met stijl

    Ook command-line interfaces gaan met hun tijd mee. Vroeger waren ze per definitie zwart/wit en statisch, maar tegenwoordig worden interfaces vaak opgeleukt met kleur, emoji's en bewegende progressbars. _Rich_[@rich] is een project dat in recordtijd heel populair is geworden. Het bestaat pas sinds november 2019 en heeft precies twee jaar later meer dan 31000{{star}} verzameld. Dat is _veel_ &mdash; en de populariteit is sindsdien nog verder toegenomen.

    Rich is ontzettend uitgebreid en heeft heel veel mogelijkheden. Voor ons project kan het handig zijn om een progressbar te gebruiken of met Rich een tabel weer te geven. De documentatie[@rich-docs] van Rich is best goed, maar kan lastig zijn om een mooi overzicht te krijgen. Een serie van korte video tutorials kun je vinden bij [calmcode](https://calmcode.io/rich/introduction.html). Iedere video duurt maar één tot twee minuten en laat mooi de mogelijkheden zien. Voor de functies die je wilt gebruiken kun je dan meer informatie opzoeken in de documentatie van Rich zelf.

    !!! opdracht-meer "Rich"
        Verrijk je interface met Rich. Doe dit naar eigen wens en inzicht.


???+ meer-leren "Data-analyse"

    ## Data-analyse

    Door de $I,U$-karakteristiek van de (lichtgevende) diode te analyseren is het mogelijk om de constante van Boltzmann te bepalen. De stoomsterkte door een diode wordt gegeven door de [_Shockley diodevergelijking_](diodes.md#eq:Shockley). Zie ook [hoofdstuk _diode_](diodes.md).

    Lukt het, om binnen de te bepalen onzekerheid, overeenkomst te vinden met de literatuurwaarde? Een LED is helaas geen ideale diode dus dit kan lastig zijn.

    !!! opdracht-meer "Model fitten"
            Fit het model van Shockley aan je $I,U$-karakteristiek. Welke parameters kun je bepalen? Overleg met je begeleider!