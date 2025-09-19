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
<pre><code>PS> python -V <button type="button" name="python -V" onclick="runScript('python -V')">{{ enter }}</button><button type="button" name="python -V" onclick="runScript('python -V')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python -V">Python 3.13.5</span>
</code></pre>

Hiermee vraag je Python om het versienummer weer te geven. Soms kunnen _opties_ zelf weer een _argument_ meekrijgen. Bijvoorbeeld:
``` ps1con title="Terminal"
PS> python -m antigravity
```
Met deze regel geef je Python de optie `-m` en die importeert een module (hier `antigravity`) en voert die uit. Probeer maar eens zelf wat er gebeurt als je dat commando uitvoert.

Als applicaties veel verschillende functionaliteit hebben dan krijg je regelmatig te maken met een lange regel met een combinatie van argumenten en opties:
``` ps1con title="Terminal"
PS> uv venv --python 3.13
```
Uitgesplitst in <mark>_argumenten_</mark> en __opties__, met vierkante haken [] om aan te geven welke onderdelen bij elkaar horen, is dat:

<q>uv <mark>_venv_</mark> [__--python__ <mark>_3.13_</mark>]</q>


!!! opdracht-basis "uv argumenten"
    
    1. Naast `uv venv` heb je ook met andere argumenten gewerkt zoals `sync` en `add`. Welke argumenten ken je al van de applicatie `uv`?
    2. Vraag de lijst met argumenten (commando's) op van uv met `uv help` (scroll terug naar boven om alles te zien), hoeveel kende je nog niet?
    
!!! opdracht-basis "uv opties en argumenten"
    Het gaat er bij deze opdracht niet om dat je alle helpteksten volledig doorleest en alle opties bekijkt. Het is heel veel. Het gaat er vooral om dat je een beetje bekend raakt met helpteksten, het verschil tussen argumenten en opties, en waar je informatie kunt vinden.

    1. Open een terminal en bekijk de helptekst van uv.
    2. Zoek de _optie_ op om de uv versie weer te geven.
    3. Maak gebruik van het argument `help` om de helpfunctie van het commando _pip_ op te vragen (`uv help pip`)
    4. Welke argumenten moet je meegeven (positional arguments?) en welke opties mag je meegeven (optional arguments?) (argument: `COMMAND`, opties o.a. : `--no-cache`, `--managed-python`).


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
<code>PS> python cli.py test 123
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

Als je meerdere opties en argumenten meegeeft dan wordt het veel werk om die in je script uit elkaar te plukken en ze goed te interpreteren. Om dat makkelijker te maken zijn er verschillende bibliotheken beschikbaar &mdash; waaronder een paar in de _standard library_ van Python. Een hele handige &mdash; die níet in de _standard library_ van Pythhon zit maar wél heel populair is, is Click.[@click]

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

Dit levert ons nog niet zoveel op, maar op de achtergrond is click wel degelijk aan het werk. De `#!py @click.command()` houdt in de gaten wat er in de command line wordt ingetypt. Zo kunnen we de helpfunctie aanroepen door `--help` achter de naam van het script te zetten. Om de code te runnen moet je wel eerst een virtual environment aanmaken, activeren en `click` installeren. {{lightbulb}}

``` ps1con title="Terminal"
python hello.py --help
```
<div id="opd:hello-help"></div>
!!! opdracht-basis "Help functie"
    === "opdracht"

        <div class="grid-tree" markdown>
            <div>
            Je neemt het script {{file}}`hello.py` over. Je vraagt de helpfunctie van het script op. Je ziet een helptekst verschijnen. Je vraagt je af wat er gebeurt als je `#!py @click.command()` weg haalt en dan de helpfunctie opvraagt. Je krijgt gewoon de output van de functie `#!py hello()` een geen help tekst.
            </div>
            <div>
            {{folder}} `ECPC`  
            {{T}} {{github}} `oefenopdrachten`  
            {{tab}} {{T}} {{new_file}} `hello.py`  
            {{tab}} {{L}} {{dots}}  
            {{T}} {{github}} `pythondaq`  
            {{L}} {{dots}}  
            </div>
        </div>

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
        <pre><code>(oefenopdrachten) > python hello.py --help <button type="button" name="python hello.py_help" onclick="runScript('python hello.py_help')">{{ enter }}</button><button type="button" name="python hello.py_help" onclick="runScript('python hello.py_help')" class="invisible">{{ reload }}</button>
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
        - [ ] Vlag

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
        Je runt het bestand {{file}}`hello.py` en geeft achter de bestandsnaam de naam `Alice` mee. Er verschijnt `Hello Alice!` als output in de terminal.
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
        <pre><code>(oefenopdrachten) > python hello.py <button type="button" name="hello.py_name" onclick="runScript('hello.py_name')">{{ enter }}</button><button type="button" name="hello.py_name" onclick="runScript('hello.py_name')" class="invisible">{{ reload }}</button>
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
        - [ ] Vlag

!!! warning
    Let er op dat je bij `#!py @click.argument` de naam meegeeft die overeenkomt met de namen van de parameters van je functie. In ons geval hebben we een argument `#!py "name"`. Dit moet overeenkomen met de functiedefinitie `#!py def hello(name)`.

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
        Je runt het bestand {{file}}`hello.py` en geeft achter de bestandsnaam de naam van je assistent mee en geeft aan dat je deze 5 keer wilt printen. Er verschijnt vijf keer `Hello <assistent>!` als output in de terminal.
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
        <pre><code>(oefenopdrachten) > python hello.py David -c 5 <button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')">{{ enter }}</button><button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')" class="invisible">{{ reload }}</button>
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

            <pre><code>(oefenopdrachten) > python hello.py David -c <button type="button" name="python hello.py David -c" onclick="runScript('python hello.py David -c')">{{ enter }}</button><button type="button" name="python hello.py David -c" onclick="runScript('python hello.py David -c')" class="invisible">{{ reload }}</button>
            <span class="invisible" name="python hello.py David -c">Error: Option '-c' requires an argument.</span>
            </code></pre>
        

        **Projecttraject:**

        - [x] Help functie
        - [x] Argumenten toevoegen
        - [x] Test hello
        - [ ] Helptekst toevoegen
        - [ ] Pauze optie
        - [ ] Vlag        



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
<pre><code>(oefenopdrachten) > python hello.py --help <button type="button" name="python hello.py --help" onclick="runScript('python hello.py --help')">{{ enter }}</button><button type="button" name="python hello.py --help" onclick="runScript('python hello.py --help')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py --help">Usage: hello.py [OPTIONS] NAME

Options:
  -c, --count INTEGER  Number of times to print greeting.  [default: 1]
  --help               Show this message and exit.
  </span>

(oefenopdrachten) > python hello.py Alice <button type="button" name="python hello.py Alice" onclick="runScript('python hello.py Alice')">{{ enter }}</button><button type="button" name="python hello.py Alice" onclick="runScript('python hello.py Alice')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py Alice">Hello Alice!</span>

(oefenopdrachten) > python hello.py Alice -c 2 <button type="button" name="python hello.py Alice -c 2" onclick="runScript('python hello.py Alice -c 2')">{{ enter }}</button><button type="button" name="python hello.py Alice -c 2" onclick="runScript('python hello.py Alice -c 2')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py Alice -c 2">Hello Alice!
Hello Alice!</span>

(oefenopdrachten) > python hello.py Alice --count 3 <button type="button" name="python hello.py Alice --count 3" onclick="runScript('python hello.py Alice --count 3')">{{ enter }}</button><button type="button" name="python hello.py Alice --count 3" onclick="runScript('python hello.py Alice --count 3')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python hello.py Alice --count 3">Hello Alice!
Hello Alice!
Hello Alice!</span>
</code></pre>

<div id="opd:hello-pauze"></div>
!!! opdracht-basis "Pauze optie"
    === "opdracht"
        Je runt het bestand {{file}}`hello.py` en geeft achter de bestandsnaam de naam van je assistent mee en geeft aan dat je deze 5 keer wilt printen met een pauze van 2 seconde ertussen. Het duurt 8 seconden voordat er vijf keer `Hello <assistent>!` als output in de terminal staat. Als je geen pauze-optie meegeeft wordt er ook geen pauze gehouden. 
        
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
        <pre><code>(oefenopdrachten) > python hello.py David -c 5 <button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')">{{ enter }}</button><button type="button" name="python hello.py David -c 5" onclick="runScript('python hello.py David -c 5')" class="invisible">{{ reload }}</button>
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
        - [ ] Vlag


Opties zonder argument werken als vlag &mdash; een soort aan/uitknop.[^flag]
[^flag]: Zie voor meer informatie over flags de [Click documentatie](https://click.palletsprojects.com/en/stable/options/#boolean-flags).

!!! opdracht-basis "Vlag"
    Gebruik een optie als vlag om de gebruiker te laten kiezen tussen het wel (<q>tea</q>) of niet (<q>no tea</q>) aanbieden van een kopje thee. Zorg dat er standaard <q>tea</q> wordt aangeboden.
    
    !!! info "boolean flags"
        Lees meer over boolean flags in de [Click documentatie](https://click.palletsprojects.com/en/stable/options/#boolean-flags).


!!! opdracht-basis "Argumenten en opties"
    === "opdracht"
        Je opent met Github Desktop de {{github}}`easystat` in Visual Studio Code. Je hebt ooit een environment voor deze repository aangemaakt maar je hebt geen idee of die in de tussentijd niet per ongeluk stuk is gegaan. Daarom synchroniseer je het environment {{lightbulb}}. Je test of je de applicatie nog kunt aanroepen met het commando `easystat`.

        Je activeert het environment en past de code aan zodat met het commando `easystat 4, 5, 6` het resultaat van de serie metingen met waardes 4, 5 en 6 in de terminal wordt geprint.

        !!! info argument is standaard string
            Click maakt van alle argumenten een string, tenzij je een default waarde of een type definieert. Gebruik `#!py type=int`, `#!py type=float` enzovoorts om aan te geven wat voor type object het argument moet worden. Gebruik `#!py nargs=-1` om aan te geven dat je argument meerdere waardes accepteert, en zelfs oneindig veel (-1).

        ???+ opdracht-meer "Meer functies"
            1. Pas de applicatie aan zodat je zónder argument geen gekke foutmelding krijgt met `nan ± nan`, maar de uitleg dat je een argument _moet_ meegeven. Met andere woorden: je argument is _required_.
    === "code"
        **Pseudo-code**
        ``` py title="app.py"
        from easystat.measurements import result_with_uncertainty


        # Add click-related code to pass measurements as an argument to easystat

        def main(measurements):
            result, uncertainty = result_with_uncertainty(measurements)

            print(f"{measurements=}")
            print(f"Result of measurements is: {result:.2f} +- {uncertainty:.2f}.")


        if __name__ == "__main__":
            main()
        ```
        **Testcode**
        <pre><code>(oefenopdrachten) > easystat 4, 5, 6 <button type="button" name="easystat 4, 5, 6" onclick="runScript('easystat 4, 5, 6')">{{ enter }}</button><button type="button" name="easystat 4, 5, 6" onclick="runScript('easystat 4, 5, 6')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="easystat 4, 5, 6">measurements=(4.0, 5.0, 6.0)
        Result of measurements is: 5.00 +- 0.47.</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**

        - [ ] Je hebt `uv sync` gedaan.
        - [ ] Je hebt de juiste omgeving geactiveerd.
        - [ ] Na het commando `easystat` kun je getallen meegeven en krijg je het verwachte antwoord terug.

        **Projecttraject**
        
        - [x] Main functie toevoegen
        - [x] commando toevoegen
        - [x] Commando testen
        - [x] Argumenten en/of opties

    
### Click subcommando's
Tot nu toe konden we maar één functie uitvoeren in onze applicatie. Maar het is ook mogelijk om subcommando's aan te maken zodat je met één programma meerdere <q>taken</q> kunt uitvoeren. Denk bijvoorbeeld aan `uv`. Je voegt packages toe aan je project met `uv add`, verwijdert ze met `uv remove`, maakt een environment met `uv venv` en synchroniseert het met `uv sync`.

!!! opdracht-basis "Subcommando's bedenken"
    <div id="opd:subcommandos"></div>
    Je gaat de `pythondaq` applicatie straks verder uitbreiden zodat er veel meer mogelijk is dan nu. Wat zou je willen dat de applicatie allemaal kan? Welke subcommando's wil je gaan aanmaken? Overleg met elkaar om goede ideeën uit te wisselen.



Een eenvoudig voorbeeldscript waarin de uv commando's `add` en `remove` worden nagebootst leggen we hieronder uit. Eerst de code:

``` py title="fake_uv.py" linenums="1"
import click


@click.group()
def cmd_group():
    pass


@cmd_group.command()
@click.argument("package")
def add(package):
    print(f"Adding and installing {package}...")


@cmd_group.command()
@click.argument("package")
def remove(package):
    print(f"Removing {package}...")


if __name__ == "__main__":
    cmd_group()
```
In (de laatste) regel 22 roepen we de hoofdfunctie aan die we enigszins willekeurig `#!py cmd_group()` genoemd hebben en die we redelijk bovenaan definiëren. In tegenstelling tot het {{file}}`hello.py`-script doet deze functie helemaal niets (`#!py pass`). We vertellen aan click dat we een groep van commando's aan gaan maken met de `#!py @click.group()`-decorator in regel 4. Vervolgens gaan we commando's binnen deze groep hangen door _niet_ de decorator `#!py @click.command()` te gebruiken, maar `#!py @cmd_group.command()` &mdash; zie regels 9 en 15. De namen van de commando's die worden aangemaakt zijn de namen van de functies. Dus regel 9 en 11 maken samen het commando `add`. Verder werkt alles hetzelfde. Dus een argument toevoegen &mdash; zoals in regel 10 &mdash; is gewoon met `#!py @click.argument()`. Hier hoef je geen `#!py cmd_group` te gebruiken.


!!! opdracht-basis "Fake uv"
    === "opdracht"

        <div class="grid-tree" markdown>
            <div>
            Nu je hebt geleerd om met Click subcommando's te maken wil je deze uittesten in combinatie met het commando wat je met uv kan aanmaken om een functie uit een script uit te voeren. Je maakt in de map {{folder}}`ECPC` een nieuw uv project aan voor {{folder}}`fake_uv` {{lightbulb}} en zet daarin de code uit het bestand {{file}}`fake_uv.py`. Je maakt een nieuw virtual environment met daarin de benodigde packages {{lightbulb}}. Je past de {{file_lines}}`pyproject.toml` aan zodat je met het commando `fake_uv add scipy` zogenaamd `scipy` kunt installeren {{lightbulb}}. 
            </div>
            <div>
            {{folder}} `ECPC`  
            {{T}} {{new_folder}} `fake_uv`  
            {{tab}} {{T}} {{new_folder}} `src/fake_uv`  
            {{tab}} {{tab}} {{T}} {{new_file}} `__init__.py`  
            {{tab}} {{tab}} {{L}} {{new_file}} `fake_uv.py`  
            {{tab}} {{L}} {{new_file_lines}} `pyproject.toml`  
            {{tab}} {{L}} {{dots}}  
            {{T}} {{github}} `oefenopdrachten`  
            {{T}} {{github}} `pythondaq`  
            {{L}} {{dots}}  
            </div>
        </div>

        !!! info "commando"
            Als je een commando met uv toevoegt dan heeft dat de opbouw `naam_commando = "package.module:naam_functie"`, welke functie moet uitgevoerd worden als je het commando aanroept?
    === "code"
        **Pseudo-code**
        ``` toml title="pyproject.toml"
        [project.scripts]
        naam_commando = "package.module:naam_functie"
        ```
        **Testcode**
        <pre><code>(oefenopdrachten) > fake_uv add scipy <button type="button" name="fake_uv add scipy" onclick="runScript('fake_uv add scipy')">{{ enter }}</button><button type="button" name="fake_uv add scipy" onclick="runScript('fake_uv add scipy')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="fake_uv add scipy">Adding and installing scipy...</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**

        - [ ] Je hebt een uv project met een actief virtual environment.
        - [ ] Na het wijzigen van de {{file_lines}}`pyproject.toml` is het virtual environment opnieuw gesynchroniseerd.
        - [ ] In de {{file_lines}}`pyproject.toml` verwijst `[project.scripts]` naar een functie zodat `add` en `remove` subcommando's zijn.
        - [ ] Het commando `fake_uv add scipy` print de tekst `Adding and installing scipy...` als output in de terminal. 

        **Projecttraject**

        - [x] Fake uv

!!! opdracht-meer "Smallangle (meer leren)"
    Met deze opdracht kun je testen hoe goed je het Python-jargon onder de knie hebt. Je zult het woord <q>smallangle</q> zó vaak tegenkomen dat het je duizelt &mdash; maar jij weet precies over welk onderdeel we het hebben.

    1. Maak een nieuw uv project aan met de naam {{github}}`smallangle` {{lightbulb}}.
    2. Let op de Octocat {{github}} voor {{github}}`smallangle`, het moet dus een repository zijn (of worden). 
    3. Zet in het package {{folder}}`smallangle` een module {{file}}`smallangle.py`.
    4. Plak de onderstaande code in {{file}}`smallangle.py`:
        ``` py
        import numpy as np
        from numpy import pi
        import pandas as pd
        
        
        def sin(number):
            x = np.linspace(0, 2 * pi, number)
            df = pd.DataFrame({"x": x, "sin (x)": np.sin(x)})
            print(df)
        
        
        def tan(number):
            x = np.linspace(0, 2 * pi, number)
            df = pd.DataFrame({"x": x, "tan (x)": np.tan(x)})
            print(df)
        
        
        if __name__ == "__main__":
            sin(10)
        ```
    5. Ga door naar de [_opdracht smallangle aanpassen_](#opd:smallangle). Je mag de opdracht smallangle installeren overslaan &mdash; dat werk heb je nu zelf al gedaan.
    

!!! opdracht-inlever "smallangle installeren"
    === "opdracht"

        <div class="grid-tree" markdown>
            <div>
            Je cloned {{github}}`NatuurkundepracticumAmsterdam/smallangle` door [de repository in GitHub desktop te openen](https://github.com/NatuurkundepracticumAmsterdam/smallangle). Daarna open je het project in Visual Studio Code. Na het synchroniseren van het uv project {{lightbulb}} run je het bestand {{file}}`smallangle.py` en krijg je een lijst van 10 punten tussen 0 en 2 $\pi$ en de sinus van deze punten. 
            </div>
            <div>
            {{folder}} `ECPC`  
            {{T}} {{github}} `pythondaq`   
            {{L}} {{github}} `smallangle`  
            {{tab}} {{L}} {{dots}}  
            {{L}} {{dots}}  
            </div>
        </div>

    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="smallangle" onclick="runScript('smallangle')" class="run">{{ run }}</button><button type="button" name="smallangle" onclick="runScript('smallangle')" class="reload invisible">{{ reload }}</button> smallangle.py
        ``` py
        import click
        import numpy as np
        from numpy import pi
        import pandas as pd


        def sin(number):
            x = np.linspace(0, 2 * pi, number)
            df = pd.DataFrame({"x": x, "sin (x)": np.sin(x)})
            print(df)


        def tan(number):
            x = np.linspace(0, 2 * pi, number)
            df = pd.DataFrame({"x": x, "tan (x)": np.tan(x)})
            print(df)


        if __name__ == "__main__":
            sin(10)
        ```
        <pre>
        <code>(oefenopdrachten) > python smallangle.py
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

        - [ ] Het project is gesynchroniseerd.
        - [ ] Na het installeren van het pakket geeft de code de verwachte output.

        **Projecttraject:**

        - [x] smallangle installeren
        - [ ] smallangle aanpassen
        - [ ] smallangle docstrings

<div id="opd:smallangle"></div>
!!! opdracht-inlever "smallangle aanpassen"
    === "opdracht"
        Je kunt met het commando `smallangle` en de subcommando's `sin` en `tan` een lijst genereren van getallen tussen de 0 en 2 $\pi$ en de bijbehorende sinus dan wel tangens van deze getallen. Met de optie `-n` kan je het aantal stappen (het aantal $x$-waardes tussen 0 en $2\pi$) kiezen. Als je de optie `-n` weglaat werkt de applicatie met een standaardwaarde.

        !!! info "TypeError: 'int' object is not iterable"

            Probeer je de code te draaien maar krijg je een foutmelding zoals deze:
            ``` ps1con title="Terminal"
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
        <pre><code>(oefenopdrachten) > smallangle sin -n 9 <button type="button" name="smallangle sin -n 9" onclick="runScript('smallangle sin -n 9')">{{ enter }}</button><button type="button" name="smallangle sin -n 9" onclick="runScript('smallangle sin -n 9')" class="invisible">{{ reload }}</button>
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
    <pre><code>(oefenopdrachten) > smallangle approx .1 <button type="button" name="smallangle approx .1" onclick="runScript('smallangle approx .1')">{{ enter }}</button><button type="button" name="smallangle approx .1" onclick="runScript('smallangle approx .1')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="smallangle approx .1">For an accuracy of 0.1, the small-angle approximation holds
    up to x = 0.854.</span>
    </code></pre>

## Docstrings en Click `--help`

Docstrings werken ook heel handig samen met Click want ze worden gebruikt als we de helpfunctie aanroepen. 
!!! info
    We gebruiken bij click-functies niet de standaard structuur voor docstrings. Click breekt de docstrings standaard af waardoor het algauw een onogelijke brij aan informatie wordt. We kiezen daarom voor een samenvatting in een zin met daarin de PARAMETERS (argumenten) in hoofdletters en eventueel een korte toelichting daarop. 

???+ meer-leren "Uitgebreide documentatie en Click"
    In de documentatie van Click vind je meer informatie over het afbreken van zinnen (en het [voorkomen](https://click.palletsprojects.com/en/stable/documentation/#escaping-click-s-wrapping) daarvan). Ook vind je daar een manier om een uitgebreide docstring te schrijven [zonder](https://click.palletsprojects.com/en/stable/documentation/#truncating-help-texts) dat het een bende wordt.

We voegen docstrings toe aan fake uv:

``` py title="fake_uv.py"
"""A fake implementation of several uv commands."""

import click


@click.group()
def cmd_group():
    """Fake uv commands."""
    pass


@cmd_group.command()
@click.argument("package")
def add(package):
    """Add a package to a uv project.

    PACKAGE is the package to add to the project.
    """
    print(f"Adding and installing {package}...")


@cmd_group.command()
@click.argument("package")
def remove(package):
    """Remove a package from a uv project.

    PACKAGE is the package to remove.
    """
    print(f"Removing {package}...")


if __name__ == "__main__":
    cmd_group()
```
Als we vervolgens de help functie aanroepen zien we de eerste regel van de docstrings verschijnen voor alle subcommando's:
<pre><code>(oefenopdrachten) > fake_uv --help <button type="button" name="python fake_uv --help" onclick="runScript('python fake_uv --help')">{{ enter }}</button><button type="button" name="python fake_uv --help" onclick="runScript('python fake_uv --help')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python fake_uv --help">Usage: fake_uv.py [OPTIONS] COMMAND [ARGS]...

  Fake uv commands.

Options:
  --help  Show this message and exit.

Commands:
  add     Add a package to a uv project.
  remove  Remove a package from a uv project.</span>
</code></pre>

Daarna kun je uitleg vragen voor de subcommando's waarbij je de hele docstring te zien krijgt:

<pre><code>(oefenopdrachten) > fake_uv add --help <button type="button" name="python fake_uv.py add --help" onclick="runScript('python fake_uv.py add --help')">{{ enter }}</button><button type="button" name="python fake_uv.py add --help" onclick="runScript('python fake_uv.py add --help')" class="invisible">{{ reload }}</button>
<span class="invisible" name="python fake_uv.py add --help">Usage: fake_uv.py add [OPTIONS] PACKAGE

  Add a package to a uv project.

  PACKAGE is the package to add to the project.

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
        <pre><code>(oefenopdrachten) > smallangle --help <button type="button" name="smallangle --help" onclick="runScript('smallangle --help')">{{ enter }}</button><button type="button" name="smallangle --help" onclick="runScript('smallangle --help')" class="invisible">{{ reload }}</button>
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

In [hoofdstuk _Model-View-Controller_](mvc.md) heb je `pythondaq` uitgesplitst in model, view en controller. Wanneer we een command-line interface gaan bouwen dan is dat de softwarelaag tussen de gebruiker en de rest van de code. De command-line interface is dus een _view_. Het is helemaal niet gek om meerdere views te hebben, bijvoorbeeld een eenvoudig script zoals {{file}}`run_experiment.py`, een command-line interface en een grafische interface. Hier gaan we ons richten op een command-line interface. We gaan een nieuw bestand {{file}}`cli.py` aanmaken en dat langzaam opbouwen.

!!! opdracht-inlever "Pythondaq: commando's"
    === "opdracht"

        <div class="grid-tree" markdown>
            <div>
            Om de command-line interface voor pythondaq te maken ga je in een nieuw bestand {{new_file}}`src/pythondaq/cli.py` een opzetje maken waar je stap voor stap functionaliteit aan toevoegt. De oude {{file}}`run_experiment.py` maakte eerst een lijst van aangesloten apparaten en daarna werd een scan uitgevoerd. Daarom zet je in {{file}}`cli.py` de subcommando's `list` en `scan`. En zorg je dat ze voor nu alleen een stukje tekst printen.
            </br></br>
            De gebruiker test de test-subcommmando's met de volgende handelingen. De gebruiker typt in de terminal het commando `diode` met daarachter het subcommando `list` en ziet een tekst verschijnen: `Work in progress, list devices`. De gebruiker test vervolgens het subcommando `scan` en ziet de tekst `Work in progress, scan LED` verschijnen.
            </div>
            <div>
            {{folder}} `ECPC`  
            {{T}} {{github}} `pythondaq`  
            {{tab}} {{T}} {{folder}} `src/pythondaq`  
            {{tab}} {{tab}} {{T}} {{file}} `__init__.py`  
            {{tab}} {{tab}} {{T}} {{file}} `arduino_device.py`  
            {{tab}} {{tab}} {{T}} {{file}} `diode_experiment.py`  
            {{tab}} {{tab}} {{T}} {{file}} `run_experiment.py`  
            {{tab}} {{tab}} {{L}} {{new_file}} `cli.py`  
            {{tab}} {{L}} {{dots}}  
            {{L}} {{dots}}  
            </div>
        </div>

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
        
    === "code"
        **Pseudo-code**
        ```py title="cli.py"
        # subcommando list
            # print Work in progress, list devices
        # subcommando scan
            # print Work in progress, scan LED
        ```
        **Testcode**
        <pre><code>(oefenopdrachten) > diode list <button type="button" name="diode list" onclick="runScript('diode list')">{{ enter }}</button><button type="button" name="diode list" onclick="runScript('diode list')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode list">Work in progress, list devices </span>
        </code></pre>

        <pre><code>(oefenopdrachten) > diode scan <button type="button" name="diode scan" onclick="runScript('diode scan')">{{ enter }}</button><button type="button" name="diode scan" onclick="runScript('diode scan')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode scan">Work in progress, scan LED</span>
        </code></pre>
        

    === "check"
        **Checkpunten:**

        - [ ] De applicatie is aan te roepen met `diode`.
        - [ ] Het subcommando `list` print een stukje tekst.
        - [ ] Het subcommando `scan` print een ander stukje tekst.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [ ] Pythondaq: `scan`
        - [ ] Pythondaq: herhaalmetingen
        - [ ] Pythondaq: `list`
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: Grafiek        
        - [ ] Pythondaq: `--help`
 

### Het uitvoeren van een meetserie ![Klik hier](assets/eastereggs/ECPC-silver.svg){: id="easterEggImage" style="width:1.5%" data-message="Pssst met 'ALT' ingedrukt kun je met je linkermuisknop meerdere cursors creeëren. Handig als je op meer plekken tegelijk hetzelfde wil typen of wehalen! Probeer maar eens!"}

We gaan ons eerst richten op het uitvoeren van een volledige meetserie en het tonen van de resultaten daarvan aan de gebruiker.

!!! info
    Bij het opgeven van argumenten en opties voor de spanning kan het belangrijk zijn om te controleren of de spanning überhaupt wel een getal is tussen 0 en 3.3 V. Je kunt dit doen door de `#!py type`-parameter in `#!py @click.argument()` en `#!py @click.option()`. Je kunt een Pythontype opgeven (bijvoorbeeld: `#!py type=int` of `#!py type=float`) en Click heeft speciale types zoals `#!py type=click.FloatRange(0, 3.3)` voor een kommagetal tussen 0 en 3.3. Bekijk alle speciale types in de [Click documentatie](https://click.palletsprojects.com/en/stable/parameters/#parameter-types). Als je hiervan gebruik maakt hoef je niet _zelf_ te controleren of de parameters kloppen. Click doet dat voor je.

!!! opdracht-inlever "Pythondaq: `scan`"
    === "opdracht"
        Pas het subcommando `scan` aan.
        </br></br>
        De gebruiker test het subcommando `scan` met de volgende handelingen. De gebruiker typt het commando `diode scan` in de terminal. Aan de hand van de helptekst weet de gebruiker dat het met argumenten of opties mogelijk is om het spanningsbereik (in Volt) aan te passen. Er wordt een meting gestart die binnen het spanningsbereik blijft. De gebruiker ziet dat de stroomsterkte dóór en de spanning óver de LED in de terminal worden geprint. De gebruiker start een nieuwe meting en geeft ditmaal met de optie `--output FILENAME` een naam voor een CSV-bestand mee. Dit keer worden de metingen ook opgeslagen als CSV-bestand onder de meegegeven bestandsnaam.
    === "code"
        **Pseudo-code**
        ```py
        # subcommando scan with range in Volt and output CSV
            # start scan with range
            # print current and voltage
            # if output:
                # create csv
        ```
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
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: Grafiek        
        - [ ] Pythondaq: `--help`

!!! opdracht-inlever "Pythondaq: herhaalmetingen"
    === "opdracht"
        Pas het subcommando `scan` aan zodat je met een optie het aantal herhaalmetingen kan kiezen.
        </br></br>
        De gebruiker test de optie om het aantal herhaalmetingen te kiezen met de volgende handelingen. Met het subcommando `scan` voert de gebruiker een meting uit in het bereik 2.8V tot 3.3V. Met een optie zet de gebruiker het aantal herhaalmetingen op 5. De gebruiker ziet dat het resultaat van de metingen met onzekerheden worden geprint in de terminal. De gebruiker bekijkt de grootte van de onzekerheden en voert nogmaals een scan uit maar dan met 10 metingen en daarna met 20 metingen. De gebruiker ziet dat de onzekerheden afnemen wanneer het aantal metingen toeneem.t
    === "code"
        **Pseudo-code**
        ```py
        # subcommando scan with range in Volt, output CSV and repeat measurements
            # start scan with range and repeat measurements
            # print current, voltage and errors
            # if output:
                # create csv
        ```
    === "check"
        **Checkpunten:**

        - [ ] De gebruiker kan het aantal herhaalmetingen met een optie kiezen.
        - [ ] De herhaalmetingen worden gebruikt om de beste schatting en onzekerheid te berekenen van de stroomsterkte en de spanning.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [ ] Pythondaq: `list`
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: Grafiek        
        - [ ] Pythondaq: `--help`

???+ opdracht-meer "Pythondaq: stapgrootte"
    Soms wil je snel een meting uitvoeren over het hele bereik, dan is het handig om minder punten te meten dan 1023 punten. Breid de applicatie uit zodat de gebruiker de stapgrootte kan aanpassen. 


### Het meetinstrument kiezen

We kunnen de Arduino benaderen als we de naam weten die de VISA driver er aan heeft toegekend. Helaas kan &mdash; ook afhankelijk van het besturingssysteem &mdash; die naam veranderen als we de Arduino in een andere poort van onze computer steken of soms zelfs als we een andere Arduino op dezelfde poort koppelen. Met het commando `list` laten we alle apparaten zien die gevonden worden door de VISA drivers.

!!! opdracht-inlever "Pythondaq: `list`"
    === "opdracht"
        Pas het subcommando `list` aan.
        </br></br>
        De gebruiker test het subcommando `list` met de volgende handelingen. De gebruiker typt het commando `diode list` in de terminal. Daarna verschijnt in de terminal een lijst van aangesloten instrumenten.
        
    === "code"
        <pre><code>(oefenopdrachten) > diode list <button type="button" name="diode list_filled_in" onclick="runScript('diode list_filled_in')">{{ enter }}</button><button type="button" name="diode list_filled_in" onclick="runScript('diode list_filled_in')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode list_filled_in">('ASRL28::INSTR','ASRL5::INSTR')</span>
        </code></pre>

    === "check"
        **Checkpunten:**

        - [ ] De gebruiker kan met `diode list` de lijst met aangesloten devices opvragen.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [ ] Pythondaq: `info`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: Grafiek        
        - [ ] Pythondaq: `--help`

!!! opdracht-inlever "Pythondaq: `info`"
    === "opdracht"
        Voeg een subcommando `info` toe.
        </br></br>
        De gebruiker test het subcommando `info` met de volgende handelingen. Eerst heeft de gebruiker met het commando `diode list` een lijst van aangesloten devices opgevraagd. De gebruiker wil weten wat de identificatiestring is van het apparaat dat aan een bepaalde poortnaam hangt. De gebruiker geeft daarom de poortnaam mee als argument aan het subcommando `info` waarna de identificatiestring van het instrument in de terminal wordt geprint. 

        !!! info "identificatiestring"
            De identificatiestring van onze Arduino was `Arduino VISA firmware v1.1.0`. Je moet natuurlijk niet letterlijk deze string copy/pasten, maar de identificatie opvragen van het instrument. Welk firmwarecommando moest je daarvoor ook alweer gebruiken?
        
    === "code"
        **Pseudo-code**
        ```py
        # subcommando info with device
            # print identificationstring of device
        ```
        **Testcode**
        <pre><code>(oefenopdrachten) > diode info ASRL28::INSTR <button type="button" name="diode info ASRL28::INSTR" onclick="runScript('diode info ASRL28::INSTR')">{{ enter }}</button><button type="button" name="diode info ASRL28::INSTR" onclick="runScript('diode info ASRL28::INSTR')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode info ASRL28::INSTR">Arduino VISA firmware v1.1.0</span>
        </code></pre>

    === "check"
        **Checkpunten:**

        - [ ] De identificatiestring is met `diode info DEVICE` op te vragen.
        - [ ] De string is niet direct gecopypaste, maar wordt daadwerkelijk opgevraagd.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: `info`
        - [ ] Pythondaq: choose device
        - [ ] Pythondaq: Grafiek        
        - [ ] Pythondaq: `--help`

!!! opdracht-inlever "Pythondaq: choose device"
    === "opdracht"
        Pas het subcommando `scan` aan zodat je kan aangeven met welke Arduino je een meting wilt uitvoeren. 
        </br></br>
        De gebruiker test het subcommando `scan` met de volgende handelingen. De gebruiker typt het commando `diode scan` in de terminal en vergeet daarbij een poortnaam mee te geven. De gebruiker ziet een foutmelding verschijnen want een poortnaam opgeven is verplicht.
        </br></br>
        De gebruiker vraagt met het subcommando `list` een lijst van aangesloten instrumenten op. Met het subcommando `info` is de gebruiker er achtergekomen wat de naam is van de poort waar de Arduino aanhangt. Vervolgens geeft de gebruiker deze poortnaam mee bij het subcommando `scan` om een meting op de (juiste) Arduino uit te laten voeren.
        </br></br>
        Tot slot leent de gebruiker een Arduino van een buurmens. De gebruiker sluit de tweede Arduino aan op de computer. Met `list` en `info` kijkt de gebruiker wat de poortnaam is van de tweede Arduino. Met het subcommando `scan` voert de gebruiker een meting uit en ziet dat het lampje van de tweede Arduino gaat branden en niet het lampje van de eerste Arduino. 
    === "code"
        <pre><code>(oefenopdrachten) > diode scan <button type="button" name="diode scan_no device" onclick="runScript('diode scan_no device')">{{ enter }}</button><button type="button" name="diode scan_no device" onclick="runScript('diode scan_no device')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode scan_no device">errorUsage: diode [OPTIONS] DEVICE
        Try 'diode --help' for help.
        Error: Missing argument 'DEVICE'.</span>
        </code></pre>
    === "check"
        **Checkpunten:**

        - [ ] De gebruiker moet een poortnaam meegeven.
        - [ ] De gekozen device wordt ook daadwerkelijk gebruikt in het model en de controller.
        - [ ] Als géén poortnaam wordt opgegeven, krijgt de gebruiker een foutmelding.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: `info`
        - [x] Pythondaq: choose device
        - [ ] Pythondaq: Grafiek
        - [ ] Pythondaq: `--help`


!!! opdracht-inlever "Pythondaq: Grafiek"
    === "opdracht"
        Pas het subcommando `scan` aan zodat je met een _boolean flag_ kan aangeven of er wel of niet een grafiek wordt getoond.
        </br></br>
        De gebruiker test het subcommando `scan` met de volgende handelingen. De gebruiker start een meting en geeft ook de optie `--graph` na afloop ziet de gebruiker een grafiek met daarin de metingen. Daarna start de gebruiker opnieuwe een meting en geeft dit keer de optie `--no-graph` mee, na afloopt van de meting ziet de gebruiker _geen_ grafiek verschijnen. Tot slot start de gebruiker een meting en geeft daarbij geen van beide opties (`--graph/--no-graph) wederom ziet de gebruiker na afloop van de meting geen grafiek verschijnen.
    === "check"
        **Checkpunten:**

        - [ ] De grafiek wordt alleen getoond wanneer `--graph` wordt meegegeven.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: `info`
        - [x] Pythondaq: choose device
        - [x] Pythondaq: Grafiek
        - [ ] Pythondaq: `--help`

!!! opdracht-inlever "Pythondaq: `--help`"
    === "opdracht"
        Voeg helpteksten toe.
        </br></br>
        De gebruiker test de applicatie `diode` met de volgende handelingen. De gebruiker typt `diode --help` en bekijkt de helptekst. De gebruiker ziet dat er subcommando's zijn. Met `subcommando --help` test de gebruiker de helpteksten een voor een uit. Ook bekijkt de gebruiker de helpteksten over de argumenten en otpies. De helpteksten stellen de gebruiker in staat om de applicatie te begrijpen en te bedienen.
    === "code"
        **Pseudo-code**
        ```
        """Summary containing ARGUMENTs.

        ARGUMENT description of the argument.
        """
        ```
        **Testcode**
        <pre><code>(oefenopdrachten) > diode --help <button type="button" name="diode --help_assignment" onclick="runScript('diode --help_assignment')">{{ enter }}</button><button type="button" name="diode --help_assignment" onclick="runScript('diode --help_assignment')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="diode --help_assignment">Usage: diode [OPTIONS] COMMAND [ARGS] ...
            Options: 
                --help Show this message and exit.
            Commands:
                Subcommand Summary containing ARGUMENTs.</span>
        </code></pre>
    === "check"
        **Checkpunten:**

        - [ ] De informatie in de helpteksten is voldoende om de applicatie te begrijpen en te bedienen.
        - [ ] `diode --help` vertelt duidelijk welke subcommando's aanwezig zijn en wat ze doen.
        - [ ] Bij alle subcommando's, is het duidelijk welke opties en argumenten er zijn, wat de standaardwaarden zijn en wat ze doen.

        **Projecttraject:**

        - [x] Pythondaq: commando's
        - [x] Pythondaq: `scan`
        - [x] Pythondaq: herhaalmetingen
        - [x] Pythondaq: `list`
        - [x] Pythondaq: `info`
        - [x] Pythondaq: choose device
        - [x] Pythondaq: Grafiek
        - [x] Pythondaq: `--help`

???+ opdracht-meer "Pythondaq: `list --search`"
    Breid het commando `list` uit met een optie `--search` waarmee je niet een lijst van _alle_ instrumenten krijgt, maar alleen de instrumenten die de zoekterm bevatten. Dus bijvoorbeeld:
    <pre><code>(oefenopdrachten) > diode list <button type="button" name="diode list" onclick="runScript('diode list')">{{ enter }}</button><button type="button" name="diode list" onclick="runScript('diode list')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="diode list">The following devices are connected to your computer:                                                                             
    ASRL/dev/cu.SOC::INSTR
    ASRL/dev/cu.MALS::INSTR
    ASRL/dev/cu.AirPodsvanDavid-Wireles-1::INSTR
    ASRL/dev/cu.Bluetooth-Incoming-Port::INSTR
    ASRL/dev/cu.usbmodem143401::INSTR 
    </span>
    (oefenopdrachten) > diode list -s usbmodem <button type="button" name="diode list -s usbmodem" onclick="runScript('diode list -s usbmodem')">{{ enter }}</button><button type="button" name="diode list -s usbmodem" onclick="runScript('diode list -s usbmodem')" class="invisible">{{ reload }}</button>
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