# Poetry

In de vorige hoofdstukken heb je gewerkt met een eigen conda environment zodat je jouw pythonomgeving mooi gescheiden kan houden van andere studenten die op dezelfde computer werken. Dit is echt _de_ oplossing voor alle problemen waarbij volledige Pythoninstallaties onbruikbaar kunnen worden &mdash; waarna je alles opnieuw moet installeren.

Opnieuw beginnen of nieuwe environments aanmaken heeft wel een nadeel: je moet alle packages die je nodig hebt opnieuw installeren. Welke waren dat ook alweer? Vast `numpy`, en `matplotlib`, en&hellip;? Niet handig. Als je code gaat delen met elkaar krijg je regelmatig te maken met een `#!py ImportError` waarna je _weer_ één of ander package moet installeren.

Nu pythondaq netjes is uitgesplitst in een MVC-structuur en de wijzigingen met Git worden bijgehouden, ga je er een package van maken zodat je het ook met anderen kan delen.

Packages op PyPI geven altijd hun _dependencies_ op. Dat zijn de packages die verder nog nodig zijn om alles te laten werken. Installeer je `matplotlib`, dan krijg je er `six, python-dateutil, pyparsing, pillow, numpy, kiwisolver, cycler` automatisch bij. Maar dat is niet genoeg. Welke versies van `numpy` werken met de huidige versie van `matplotlib`? Allemaal zaken die je &mdash; als je een package schrijft &mdash; zelf moet bijhouden. Het voordeel is dat jouw gebruikers alleen maar _jouw_ pakket hoeven te installeren &mdash; de rest gaat vanzelf.

En&hellip; hoe test je je package zodat je zeker weet dat hij het bij een ander ook doet? Heel vaak werkt het bij jou wel, maar vergeet je een bestand mee te sturen dat wel echt nodig is.[^missende bestanden] Of: bij jou werkt `#!py import my_new_cool_app.gui` wel, maar bij een ander geeft hij een `#!py ImportError`. De bestanden zijn er wel, maar worden verkeerd geïmporteerd.

[^missende bestanden]: Echt gebeurd: meerdere studenten leverden hun grafische applicatie in voor een beoordeling. We konden het niet draaien, want er misten bestanden. Bij de student werkte het wel, maar bij ons _echt_ niet.

Hoe _krijg_ je eigenlijk je code bij iemand anders? Liefst als één bestand, of zelfs met `pip install my_new_cool_app`; dat zou wel mooi zijn.

En daar is _Poetry_.

Er zijn meerdere tools ontwikkeld om dezelfde problemen op te lossen. Poetry is heel populair geworden. Het richt zich op het officiële ecosysteem: standaard Python packages, ofwel PyPI en `pip`; niet `conda`. Jammer, maar dit zorgt er wel voor dat iedereen mét of zónder Anaconda je package kan installeren. Dat is dan wel weer fijn. Wij gaan Anaconda gebruiken om een virtual environment met _alleen_ Python te maken. Vervolgens installeren we alles dat we nodig hebben met `pip`. Dat werkt prima, want we mengen verder geen `conda` met `pip` packages. Het maken van conda packages valt daarmee buiten het bestek van deze cursus, al is dat een relatief kleine stap als je je standaard Python package af hebt.

We gaan Poetry bedienen door commando's te geven in de terminal van Visual Studio Code. We laten de terminal weten welk programma wij willen gaan besturen, door `poetry` in te typen. En daarachter wat we willen dat Poetry gaat doen. We kunnen informatie over Poetry opvragen met het commando `about`.

``` ps1 title="Terminal"
poetry about
```

!!! opdracht-basis "Poetry about"
    Open een terminal en vraag informatie over Poetry op met het commando `poetry about`. Lees de tekst die Poetry aan je teruggeeft, waar kan je meer informatie vinden?


## Nieuw Poetry project
!!! info
    We gaan werken met modules en packages. Ben je daar nog niet zo bekent mee, zorg dan dat je [paragraaf _Modules_](voorkennis.md#modules) en [paragraaf _packages_](voorkennis.md#packages) gemaakt hebt.

Stel je wilt een package schrijven met wat handige functies om veelgebruikte statistische berekeningen makkelijk uit te voeren. Je noemt het `easystat`. Het doel is eerst om het in al je eigen analyses makkelijk te kunnen gebruiken (`#!py import easystat`) maar je wilt het ook op GitHub zetten en wie weet vinden anderen het ook handig! Je wilt het dus ook _netjes_ doen. En niet later van anderen horen: <q>leuk, maar bij mij werkt het niet!</q>

!!! opdracht-basis "Poetry project aanmaken"
    Maak een nieuw Poetry project met de naam `easystat`, als volgt:

    1. Open in Visual Studio Code een geschikte map[^geschikte map] en open een terminal.
    1. Dan maken we met Poetry als volgt een nieuw project.[^src-layout] We maken het daarmee _expres_ iets moeilijker om vanuit een script je package te importeren. Je kunt dat dan alleen nog maar doen door het package zelf ook te _installeren_ (zoals andere gebruikers ook moeten doen) en daardoor loop je zelf tegen eventuele problemen aan. Werkt het uiteindelijk bij jou? Dan werkt het _ook_ bij andere mensen.} `easystat` aan:
    ``` ps1con title="Terminal"
    PS> poetry new --src easystat
    Created package easystat in easystat
    ```
    
    [^geschikte map]: Bijvoorbeeld {{folder}}`Documents/NSP2/Experimentautomatisering`
    [^src-layout]: We gaan het package opbouwen in de zogenaamde src-layout[@srclayout]


Er is nu de volgende structuur aangemaakt:

    easystat/
        src/
            easystat/
                __init__.py
        tests/
            __init__.py
            test_easystat.py
        pyproject.toml
        README.md

Allereerst is er een projectmap `easystat` aangemaakt. Je kunt nu in GitHub Desktop deze map toevoegen als nieuwe repository, zoals we gedaan hebben in [opdracht _Repository toevoegen_](github.md#opd:add_repository).

Laten we één voor één kijken welke mappen en bestanden Poetry heeft aangemaakt. We zien een {{file_lines}}`README.md` in de projectmap staan. Hierin komt een algemene beschrijving van ons project.[^README]

[^README]: Wanneer de repository op GitHub wordt geplaatst wordt deze README automatisch op de hoofdpagina van de repository getoond, onder de code.

Daarna is er een map {{folder}}`tests`. Goede software wordt getest. In deze map komen bestanden te staan die delen van de code runnen en resultaten vergelijken met verwachte resultaten &mdash; zoals je kunt doen in [opdracht _Packages_](voorkennis.md#opd:test_package).[^unittest]

[^unittest]: Python heeft een ingebouwde module `#!py unittest` die deze tests kan vinden, kan runnen en daarna een handige weergave geeft van welke tests geslaagd zijn en welke faalden. Ook het package `#!py pytest` is erg bekend. Op deze manier weet je altijd zeker dat wanneer je aanpassingen doet in je code, dat de rest van de code nog steeds is blijven werken &mdash; zónder dat je zelf uitvoerig alles hebt hoeven uitproberen. Je draait gewoon even snel alle tests. Helaas, helaas &mdash; in deze cursus is te weinig tijd om het schrijven van tests te behandelen.

Dan komt de {{folder}}`src`-map. Daarin komt ons nieuwe package {{folder}}`easystat`[^projectmap] te staan. Er is alvast voor ons een {{file}}`__init__.py` aangemaakt. Handig!

[^projectmap]: Ja er is een map {{folder}}`easystat` met daarin een map {{folder}}`src` met daarin weer een map {{folder}}`easystat` &mdash; dat kan nog wel eens verwarrend zijn. Het is conventie om de projectmap dezelfde naam te geven als je package. Het pad is dus eigenlijk {{folder}}`project/src/package` en dat wordt dan, in ons geval, {{folder}}`easystat/src/easystat`.

En als laatste&hellip; een {{file}}`pyproject.toml`[^setup.py] waarin alle informatie over je project wordt bijgehouden. Ook staat er in dit bestand informatie voor de verschillende tools die je kunt gebruiken. De inhoud van het bestand ziet er ongeveer zo uit:
``` toml
[tool.poetry]
name = "easystat"
version = "0.1.0"
description = ""
authors = ["David Fokkema <davidfokkema@icloud.com>"]
readme = "README.md"
packages = [{include = "easystat", from = "src"}]

[tool.poetry.dependencies]
python = "^3.10"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

[^setup.py]: Vroeger was er een `setup.py` maar Python schakelt nu langzaam over naar dit nieuwe bestand.

Het bestand is in het TOML-formaat.[@TOML] Tussen de vierkante haken staan de koppen van de verschillende secties in dit configuratiebestand. Overal zie je `poetry` terugkomen, want dat is de tool die wij gebruiken. In de eerste sectie staat informatie over ons project. Je kunt daar bijvoorbeeld een beschrijving toevoegen of het versienummer aanpassen. De tweede sectie bevat de _dependencies_. Dit zijn alle Pythonpackages die ons project nodig heeft. Op dit moment is dat alleen maar Python. Ook het versienummer van Python is belangrijk. Hier is dat 3.10 en het dakje geeft aan dat nieuwere versies 3.11, 3.12, enz. ook prima zijn, maar 3.9 (te oud) 4.0 (te nieuw) _niet_. Dit kan belangrijk zijn. Gebruikers met een iets oudere versie van Python &mdash; bijvoorbeeld versie 3.9 &mdash; kunnen nu het package niet installeren. Als je niet per se de nieuwste snufjes van Python 3.10 nodig hebt kun je aangeven dat een iets oudere versie van Python ook prima is.

!!! opdracht-basis "Dependency python aanpassen"
    
    1. Open het bestand {{file}}`pyproject.toml`
    1. Verander bij de dependencies voor python `^3.10` in `^3.9`.
    




### Environment aanmaken

Bij het schrijven van een nieuw package is het zéker belangrijk om een environment te gebruiken. Anders loop je het risico dat je package _lijkt_ te werken maar bij iemand anders crasht. Immers, het kan best zijn dat jij NumPy gebruikt en al eerder geïnstalleerd had. Bij iemand die NumPy nog _niet_ geïnstalleerd had gaat het dan mis.

!!! opdracht-basis "Environment aanmaken"
    We maken &mdash; speciaal voor `easystat` &mdash; een environment.

    1. Open in Visual Studio Code de _project_-map {{github}}`easystat`
    1. Open een terminal en maak een easystat conda environment aan:
            ``` ps1 title="Terminal"
            conda create -n easystat python=3.9
            ```
    1. Selecteer dit nieuwe conda environment in Visual Studio Code.
    
    Merk op dat we nu niet gebruik hoeven te maken van de `conda-forge` channel. Python zelf staat in _alle_ kanalen en we gaan verder geen software installeren met conda, dus ook niet uit `conda-forge`.


### Maken van de easystat-package

We starten met ons package. Stel, we berekenen vaak de standaarddeviatie van het gemiddelde en maken daarvoor een handige <q>shortcut</q>.
!!! opdracht-basis "Shortcuts.py aanmaken"
    Maak het bestand {{file}}`src/easystat/shortcuts.py`:[^missende import]
    ``` py
    # src/easystat/shortcuts.py
    import numpy as np
    
    
    def stdev_of_mean(values):
        # Calculate the standard deviation of the mean
        return np.std(values) / np.sqrt(len(values))    
    ```

    [^missende import]: Misschien is het je al opgevallen dat VS Code een oranje kringeltje onder `#!py numpy` zet in de eerste regel. Als je daar je muiscursor op plaatst krijg je een popup met de melding `Import <q>numpy</q> could not be resolved`. Daar moeten we misschien wat mee.



Nu willen we de package `easystat` importeren in een ander script zodat we de functie `stdev_of_mean` daar kunnen gebruiken. We maken een script om onze nieuwe code te testen.[^tests]

[^tests]: Niet formeel. Dus hoewel we een script gaan plaatsen in de {{folder}}`tests`-folder is het hier niet een test die automatisch gerunt kan worden.

!!! opdracht-basis "Test script aanmaken"
    Maak het bestand {{file}}`tests/try_shortcuts.py`:
    ``` py
    # tests/try_shortcuts.py
    from easystat.shortcuts import stdev_of_mean

    print(f"{stdev_of_mean([1, 2, 2, 2, 3])=}")    
    ```


In de eerste regel importeren we de functie uit het nieuwe package om uit te proberen. In de laatste regel gebruiken we een handige functie van f-strings.[^f-string-=]

[^f-string-=]: In f-strings kunnen tussen de accolades variabelen of functieaanroepen staan. Voeg daar het `=`-teken aan toe en je krijgt niet alleen de _waarde_, maar ook de variabele of aanroep zelf te zien. Bijvoorbeeld: als je definieert `#!py name = "Alice"`, dan geeft `#!py print(f"{name`")

!!! opdracht-basis "Script testen"
    Run {{file}}`tests/try_shortcuts.py` en kijk of het script het doet.


We krijgen de foutmelding:
``` py
ModuleNotFoundError: No module named 'easystat'
```
Dit konden we verwachten. We hebben ons package immers nog niet geïnstalleerd. Als we ons package gaan delen met andere mensen verwachten wij dat zij ons package ook gaan installeren, door dezelfde stappen te doorlopen als andere gebruikers komen we erachter of alles wel goed werkt.

### Installeren van een package
Het installeren van de package kan makkelijk met Poetry:
``` ps1con title="Terminal"
PS> poetry install
Updating dependencies
Resolving dependencies... (0.1s)

Writing lock file

Installing the current project: easystat (0.1.0)
```

Poetry is even bezig en ons package is geïnstalleerd.

!!! opdracht-basis "Poetry install"
    We draaien opnieuw de test, als volgt:

    1. Installeer de easystat package met `poetry install`.
    1. Draai {{file}}`tests/try_shortcuts.py` en controleer of het nu wel werkt.
    


Als we het testscript nu draaien krijgen we wéér een foutmelding:
``` py
ModuleNotFoundError: No module named 'numpy'
```
Ons package heeft NumPy nodig en dat hebben we nog niet geïnstalleerd. Dat kunnen we handmatig doen maar dan hebben andere gebruikers een probleem. Veel beter is het om netjes aan te geven dat ons package NumPy nodig heeft &mdash; als _dependency_.


### Dependencies toevoegen

Om een dependency aan te geven vertellen we Poetry dat hij deze moet toevoegen met:
``` ps1con title="Terminal"
PS> poetry add numpy
Using version ^1.23.2 for numpy

Updating dependencies
Resolving dependencies...

Writing lock file

Package operations: 1 install, 0 updates, 0 removals

  • Installing numpy (1.23.2)
```

!!! opdracht-basis "Dependencies toevoegen"
    We voegen de dependency toe en runnen opnieuw de test, als volgt:

    1. Voeg numpy als dependency toe met `poetry add numpy`.
    1. Draai {{file}}`tests/try_shortcuts.py` en bekijk de uitkomst.
    


Ditmaal krijgen we:
```
stdev_of_mean([1, 2, 2, 2, 3])=0.282842712474619
```
Fijn! Als je nu de {{file}}`pyproject.toml` nog eens bekijkt zie je dat NumPy daar als dependency is toegevoegd. Het verwijderen van dependency `PACKAGE` gaat met `poetry remove PACKAGE`. Poetry heeft Numpy nu toegevoegd aan de environment `easystat`.[^conda-list] Gewone package managers als Pip en Conda zullen geen packages toevoegen aan je Poetry project als je `pip/conda install package` aanroept. Gebruik daarom altijd `poetry add package` als je met Poetry aan een package werkt.

[^conda-list]: De lijst met packages in de active Conda enviornment vraag je in de terminal op met het `conda list`, kijk maar of numpy daar tussen staat.

!!! info
    Als we de code in ons package aanpassen dan hoeven we het niet opnieuw te installeren met Poetry, maar als we met de hand iets wijzigen in de {{file}}`pyproject.toml` dan moet dat _wel_. Als je een `#!py ImportError` krijgt voor je eigen package &mdash; bijvoorbeeld als je nieuwe mappen of bestanden hebt aangemaakt &mdash; probeer dan _eerst_ voor de zekerheid `poetry install`.

### Poetry.lock

??? meer-leren "Meer leren"
    Na het toevoegen van Numpy is er ook een bestand {{file_lines}}`poetry.lock` bijgekomen. Hierin staan de exacte versies van alle geïnstalleerde packages. Vaak wordt dit bestand gecommit zodat collega-ontwikkelaars exact dezelfde versies installeren zodra ze `poetry install` aanroepen. Om dat te proberen maken we even een schone conda environment:

    !!! opdracht-meer "Schone environment"

        1. Maak een schone conda environment met `PS> conda create -n easystat python=3.9`
        1. Kies voor ja als Conda een waarschuwing geeft dat deze environment al bestaat en vraagt of je het bestaande environment wilt verwijderen.
        1. Draai {{file}}`tests/try_shortcuts.py` en bekijk de foutmelding.
        


    We krijgen meteen foutmeldingen. Immers, we hebben nog niets geïnstalleerd.

    !!! opdracht-meer "Poetry.lock"

        1. Installeer de `easystat` package met `poetry`.
        1. Waarvoor gebruikt Poetry de lock file ({{file_lines}}`poetry.lock)`?
        1. Draai {{file}}`tests/try_shortcuts.py` en bekijk de uitkomst.


### Wheels

??? meer-leren "Meer leren"
    Wanneer we klaar zijn om ons package te delen met andere gebruikers gebruiken we het commando `build` om wheels te bouwen.

    !!! opdracht-meer "Bouw een wheel"
        
        1. Bouw het wheel van easystat met `poetry build`.
        1. Bekijk de namen van de bestanden in de nieuwe map {{folder}}`easystat/dist`, welke extensie hebben ze?
        


    ``` ps1con title="Terminal"
    PS> poetry build  
    Building easystat (0.1.0)
        - Building sdist
        - Built easystat-0.1.0.tar.gz
        - Building wheel
        - Built easystat-0.1.0-py3-none-any.whl
    ```
    Een <q>sdist</q> is een _source distribution_. Een `.tar.gz`-bestand is een soort zipbestand met daarin de broncode van ons pakket. De tests worden daar niet in meegenomen. Een <q>wheel</q> is een soort bestand dat direct geïnstalleerd kan worden met `pip`. Zogenaamde _pure-python_ packages bevatten alleen Pythoncode &mdash; en geen C-code die gecompileerd moet worden voor verschillende besturingssystemen of hardwareplatforms. Je herkent ze aan `none-any` in de bestandsnaam. <q>None</q> voor <q>niet-OS-specifiek</q> en <q>any</q> voor <q>draait op elk hardwareplatform</q>. We kunnen dit bestand als download neerzetten op een website of aan anderen mailen.

    !!! opdracht-meer "Test wheel"
        Laten we het wheel uitproberen. We gaan straks een nieuwe conda environment aanmaken, installeren het wheel en proberen het testscript te runnen &mdash; één keer vóór het installeren van het wheel en één keer ná het installeren, als volgt:

        1. Maak een nieuwe conda environment aan met de naam `test-wheel` en activeer deze.
                ``` ps1con title="Terminal"
                PS> conda create -n test-wheel python=3.9
                ...
                PS> conda activate test-wheel
                ```
        1. Draai {{file}}`tests/try_shortcuts.py` en bekijk de foutmelding.
        1. Installeer het wheel met `pip install dist/easystat-0.1.0-py3-none-any.whl`.
        1. Draai {{file}}`tests/try_shortcuts.py` en bekijk de uitkomst.
        
    Het werkt! Je ziet dat `pip install` niet alleen ons package `easystat` installeert, maar _ook de dependency_ `numpy`. Dat is precies wat we willen.
    
    Het is belangrijk om de wheels _niet_ in je GitHub repository te committen. Je repository is voor _broncode_, waarmee wheels gebouwd kunnen worden. Als je de stappen voor het aanmaken van de repository netjes gevolgd hebt dan heb je een {{file_lines}}`.gitignore` toegevoegd met Python-specifieke bestandsnamen en directories die genegeerd worden door Git en GitHub.


## Poetry gebruiken voor een bestaand project

Met `poetry new` start je een _nieuw_ project en maakt Poetry voor jou bestanden en mappen aan waarmee je aan de slag kunt. Maar vaak ben je al bezig met een project en wil je dat niet overschrijven. Ook is het een gedoe om een nieuw project te maken en daar je bestaande code in te kopieëren. Gelukkig kun je Poetry ook vertellen dat je al bezig bent en dat Poetry _alleen_ een {{file}}`pyproject.toml`-bestand moet aanmaken. Dat doe je met:
``` ps1 title="Terminal"
poetry init --no-interaction
```
Je geeft met `poetry init` de opdracht om Poetry alleen te initialiseren en `--no-interaction` voorkomt je dat je eerst honderd vragen krijgt over je project. Meestal kies je toch de standaardantwoorden.[^poetry-init]

[^poetry-init]: Het is eenvoudig om zelf de {{file}}`pyproject.toml` te openen en daar wat in aan te passen voor zover nodig.

!!! info
    Als je al bezig bent met een project dan werk je als het goed is al in een conda environment. Daar heb je dan met `conda install` al packages geïnstalleerd die je nodig hebt. Het gebeurt dan makkelijk dat je vergeet om dat aan te geven met `poetry add`. Dat betekent alleen dat als iemand anders je package installeert dat er dependencies missen en dat jouw code dus _niet_ werkt! Dit is makkelijk op te lossen. Zodra je Poetry gaat gebruiken _wis dan je environment en maak een nieuwe aan met alleen Python._ Dat gaat het makkelijkst als volgt. Stel dat je bezig bent in het environment `pythondaq`. We maken dan een nieuw environment met dezelfde naam:
    ``` ps1 title="Terminal"
    conda create -n pythondaq python=3.9
    WARNING: A conda environment already exists at '/Users/david/opt/anaconda3/envs/pythondaq'
    Remove existing environment (y/[n])? y

    ...
    ```
    Je overschrijft dus je huidige environment met een nieuwe, lege. Je kunt daarna met `poetry add` packages toevoegen net zo lang tot je geen `#!py ImportError` meer krijgt.

!!! opdracht-basis "Poetry knipperlicht"
    We gaan nu poetry gebruiken om van het script met de knipperende lichtjes uit [opdracht _KnipperLED_](communicatie.md#opd:knipperled) een package te maken én om ons environment te beheren. Voer de volgende stappen uit:
    
    1. Maak in GitHub Desktop een _nieuwe_ repository {{github}}`flasher`.
    1. Maak een map {{folder}}`src` met daarin een map {{folder}}`flasher`.
    1. Kopieer uit de {{github}}`Oefenopdrachten` die je bij [opdracht _Repository toevoegen_](github.md#opd:add_repository) hebt aangemaakt het scriptje uit [opdracht _KnipperLED_](communicatie.md#opd:knipperled) naar {{folder}}`src/flasher`.
    1. Open {{github}}`flasher` in Visual Studio Code.
    1. Commit alles dat je tot nu toe gedaan hebt.
    1. Open een terminal. Maak een nieuwe conda environment met alleen python 3.9:
        ``` ps1 title="Terminal"
        conda create -n flasher python=3.9
        ```
        en maak dat actief in Visual Studio Code.
    1. Voer dan het volgende commando uit:
        ``` ps1 title="Terminal"
        poetry init --no-interaction
        ```
        om een {{file}}`pyproject.toml` aan te maken.
    1. Gebruik `poetry add` om de dependencies van je script toe te voegen (welke Pythonpackages gebruik je?).[^dependencies]
    1. Installeer je `flasher` package met `poetry install`.
    1. Test het scriptje, werkt het allemaal nog?

    [^dependencies]: In ieder geval pyvisa-py, maar wat nog meer? Waarschijnlijk krijg je een foutmelding: No module named 'serial'. Met de vraag om Pyserial te installeren. Het conda package van pyvisa gaf zelf al pyserial op als dependency om te communiceren over USB. Nu we conda niet gebruiken moeten we dat handmatig doen.


## Poetry gebruiken voor pythondaq
Natuurlijk willen we Poetry ook gaan gebruiken bij `pythondaq`. Daarvoor moeten we twee dingen doen. Als eerste gaan we de `pythondaq` repository in een `src`-structuur zetten en daarna gaan we Poetry initialiseren.

!!! info
    Vergeet niet &mdash; waar nodig &mdash; de {{file}}`__init__.py` bestanden toe te voegen aan de packages.

!!! opdracht-inlever "Pythondaq: package"
    Zet {{github}}`pythondaq` om in een src-structuur, als volgt, en vergeet niet na elke stap te committen:

    1. Maak in {{github}}`pythondaq` een map {{folder}}`src` met daarin een map {{folder}}`pythondaq`.
    1. Zet de model, view, controller scripts in de {{folder}}`pythondaq` package zodat je onderstaande structuur krijgt:

            pythondaq/
                src/
                    pythondaq/
                        __init__.py
                        arduino_device.py
                        diode_experiment.py
                        view.py
                README.md
            
    1. Test je {{file}}`view.py` script.



??? opdracht-meer "Model, view, controller packages"
    In grotere projecten is het gebruikelijk om model, view, controller niet alleen uit te splitsen in verschillende scripts, maar ook in aparte packages te zetten.

    1. Maak 3 extra packages in de {{folder}}`pythondaq` package. {{folder}}`models`, {{folder}}`views` en {{folder}}`controllers`.
    1. Zet de modules in de juiste packages.
    1. Ga door naar opdracht Pythondaq: poetry.
    


!!! opdracht-inlever "Pythondaq: poetry"
    Gebruik Poetry om `pythondaq` als package te installeren, als volgt:

    1. Ga in Visual Studio Code naar {{github}}`pythondaq`. Open een terminal.
    1. Overschrijf je conda environment zodat hij weer leeg is (met alleen `python=3.9`).
    1. Initialiseer Poetry, zodat een {{file}}`pyproject.toml` wordt aangemaakt.
    1. Installeer je package.
    1. Test je {{file}}`view.py` script, terwijl je dependencies toevoegt die je in je scripts nodig hebt.
    1. Vergelijkbaar met [opdracht _Packages_](voorkennis.md#opd:test_package) is het verstandig om het importeren van onderdelen van het package te testen voordat we het verder gaan uitbouwen. Maak een {{folder}}`tests`-map met {{file}}`__init__.py` aan in hoofdmap van de repository zodat je onderstaande structuur krijgt:

            pythondaq/
                src/
                    ...
                tests/
                    __init__.py
                README.md
            

    1. Maak een script {{file}}`tests/test_imports.py` met de regel:
            ``` py
            import pythondaq.view
            ```
            en run het script. Overleg met elkaar hoe je de import-errors op moet lossen zodat alles werkt. Als dat gelukt is dan werkt je package ook als je het aanroept van buiten de map met broncode.
    
    Je {{github}}`pythondaq`-repository is nu een volledig project dat je met andere gebruikers van Python kunt delen, bijvoorbeeld via een _wheel_. We gaan pythondaq in de komende hoofdstukken steeds verder uitbouwen.


## Van script naar applicatie
Om onze python code te testen heb je tot nu toe waarschijnlijk op de `run`-knop in Visual Studio Code gedrukt. Of je hebt in de terminal aan python gevraagd om het {{file}}`script.py` te runnen:
``` ps1 title="Terminal"
python script.py
```
Je moet dan wel de juiste map geopend hebben zodat python het bestand kan vinden. En als je de `run`-knop gebruikt moet wel het bestandje open hebben staan dat je wilt runnen. Kortom, best een beetje gedoe. Maar als we programma's zoals Poetry, Conda of Python willen gebruiken hoeven we helemaal niet het juiste bestandje op te zoeken en te runnen. We hoeven alleen maar een commando in de terminal te geven &mdash; bijvoorbeeld `python` of `conda` &mdash; en de computer start automatisch het juiste programma op.

Dat willen wij ook voor onze programma's! En omdat we Poetry gebruiken kunnen we dat heel eenvoudig doen. We gaan een commando toevoegen om de module uit te voeren waarvan je de code in [paragraaf _Modules_](voorkennis.md#modules) kunt vinden. De twee bestanden {{file}}`square.py` en {{file}}`count_count.py` hebben we voor jullie netjes in een package geplaats in de repository {{github}}`AnneliesVlaar/just_count` met de volgende structuur:

    just_count/
        src/
            just_count/
                __init__.py
                square.py
                count_count.py
            tests/
                __init__.py
        pyproject.toml
        README.md

De bestanden {{file}}`square.py` en {{file}}`count_count.py` zien er hetzelfde uit als in [paragraaf _Modules_](voorkennis.md#modules):
=== "square.py"

    ``` py
    def square(x):
        return x ** 2

    if __name__ == "__main__":
        print(f"The square of 4 is {square(4)}")
    ```
=== "count_count.py"

    ``` py
    import square

    print(f"The square of 5 is {square.square(5)}")  
    ```


We kunnen Poetry niet vragen om een script te runnen, maar wel om een functie uit te voeren.

!!! opdracht-basis "Main functie toevoegen"

    1. Ga naar {{github}}`AnneliesVlaar/just_count` en [open de repository in GitHub desktop](x-github-client://openRepo/https://github.com/AnneliesVlaar/just_count) en daarna in Visual Studio Code.
    1. Maak een nieuwe conda environment met python 3.9, activeer deze en installeer de `just_count` package.
    1. Open {{file}}`src/just_count/count_count.py` en voeg een functie `#!py def main()` toe die de wortel van 5 print.
    ``` py title="count_count.py"
    import square

    def main():
        print(f"The square of 5 is {square.square(5)}")
    ```
    We zetten daarmee de <q>body</q> van de module in een functie. 
    1. Als je het script nu runt doet hij niets meer, want hij roept de functie `#!py main()` niet aan. 
    1. Voeg een `#!py if __name__ == '__main__'`-statement toe waarin je de functie `#!py main()` aanroept. 
    1. Als je het script runt, doet hij het weer.
    


In {{file}}`pyproject.toml` kunnen we nu het commando toe gaan voegen. Met de `scripts`-tool van Poetry kunnen we aangeven met welk commando een functie uit een script wordt uitgevoerd. Om een commando toe te voegen ga je naar {{file}}`pyproject.toml` en voeg je een extra kopje toe:
``` toml
[tool.poetry.scripts]
naam_commando = "package.module:naam_functie"
```
Om de wijzigingen aan {{file}}`pyproject.toml` door te voeren moet je de package opnieuw installeren.

!!! opdracht-basis "commando toevoegen"

    Voor de volgende stappen uit:

    1. Open {{file}}`pyproject.toml` en voeg het kopje `[tool.poetry.scripts]` toe.
    1. Als naam voor het commando kiezen we `count`.
    1. Voor het gemak vullen we de rechterkant van het =-teken van rechts naar links in. Achter de dubbele punt komt de naam van de functie die uitgevoerd moet worden, dat is in ons geval `main`.
    1. De functie `main` staat in module {{file}}`count_count.py`. De module hebben we ondergebracht in de package {{folder}}`just_count`.
            ``` toml
            [tool.poetry.scripts]
            count = "just_count.count_count:main"
            ```
    1. Omdat we handmatig de toml-file hebben aangepast installeren we de package `just_count` opnieuw met `poetry install`.
    

<div id="opd:Poetry_commando"></div>
!!! opdracht-basis "Commando testen"

    1. Type in de terminal het commando `count`.
    1. Je krijgt nu een `ModuleNotFoundError` voor de module square. Poetry zoekt vanuit de {{folder}}`src`-map naar de packages en modules. Pas het importstatement in {{file}}`count_count.py` aan zodat het count commando werkt.   
    1. Activeer een andere conda environment en probeer meteen het commando opnieuw; waarom werkt dit niet?
    1. Navigeer naar de bovenliggende map met `cd..`. Zorg dat het conda environment waar je `just_count` hebt geïnstalleerd is geactiveerd en test het commando. 

    Het maakt nu dus niet meer uit waar je bent, als je de juiste conda environment hebt geactiveerd kun je altijd je applicatie starten!
    

??? opdracht-meer "Error analysis"
    Als extra oefening gaan we met Poetry een commando maken om een ander script uit te laten voeren. De package is al aangemaakt, maar werkt nog niet naar behoren. Los in de volgende opdrachten de errors op om het script {{file}}`data_analysis.py` te laten runnen.

    1. Ga naar GitHub en open {{github}}[`AnneliesVlaar/erroranalysis`](https://github.com/AnneliesVlaar/erroranalysis) in GitHub Desktop en Visual Studio Code.
    1. Natuurlijk maak je gelijk een nieuwe Conda environment aan, voordat we dit package gaan testen.
    1. Snuffel door de bestanden en mappen, en open {{file}}`src/erroranalysis/data_analysis.py`. Dit is het script wat moet kunnen runnen.
    1. Run het script {{file}}`data_analysis.py` en los de errors één voor één op.
    
    Om erachter te komen of de problemen die we hierboven hadden écht zijn opgelost maak je een nieuwe Conda environment aan, installeer je het package en run je het script. Werkt alles? Mooi! Dan gaan we nu een commando aanmaken om de functie `#!py table()` aan te roepen.

    1. Open {{file}}`pyproject.toml` en voeg een kopje toe voor scripts.
            ``` toml
            [tool.poetry.scripts]
            naam_commando = "package.module:naam_functie"
            ```
            pas de regel aan zodat jouw commando de functie `#!py table()` aanroept in {{file}}`src/erroranalysis/data_analysis.py`. Je mag de naam van het commando zelf kiezen.
    1. Ga naar de terminal en kijk of het werkt!
            ``` ps1con title="Terminal"
            PS> naam_commando
            Area of the kitchen table is: 1.8386 ± 0.0049 m
            ```

!!! opdracht-inlever "Pythondaq: applicatie"
    We gaan nu een commando maken voor {{github}}`pythondaq`:

    1. Schrijf een functie in {{file}}`view.py` die je wilt uitvoeren als je het commando gaat aanroepen. Je kunt hierin de hele body van je script plaatsen.
    1. Voeg een commando aan {{file}}`pyproject.toml` toe.
    1. Installeer het Poetry project en test het commando. Los eventuele errors op totdat het werkt.
    1. Open &mdash; buiten Visual Studio Code &mdash; een `Anaconda prompt` en test of jouw commando dan nog steeds werkt.[^activeer-env]

    [^activeer-env]: Activeer wel eerst de juiste conda environment.
    


Wat een feest! Je hebt nu een applicatie geschreven die een Arduino aanstuurt om een ledje te laten branden. En je kunt je applicatie gewoon vanuit de terminal aanroepen!