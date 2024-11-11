# Poetry

In de vorige hoofdstukken heb je gewerkt met een eigen conda environment zodat je jouw pythonomgeving mooi gescheiden kan houden van andere studenten die op dezelfde computer werken. Dit is echt _de_ oplossing voor alle problemen waarbij volledige Pythoninstallaties onbruikbaar kunnen worden &mdash; waarna je alles opnieuw moet installeren.

Opnieuw beginnen of nieuwe environments aanmaken heeft wel een nadeel: je moet alle packages die je nodig hebt opnieuw installeren. Welke waren dat ook alweer? Vast `numpy`, en `matplotlib`, en&hellip;? Niet handig. Als je code gaat delen met elkaar krijg je regelmatig te maken met een `#!py ImportError` waarna je _weer_ één of ander package moet installeren.

Nu pythondaq netjes is uitgesplitst in een MVC-structuur en de wijzigingen met Git worden bijgehouden, ga je er een package van maken zodat je het ook met anderen kan delen.

Packages op PyPI geven altijd hun _dependencies_ op. Dat zijn de packages die verder nog nodig zijn om alles te laten werken. Installeer je `matplotlib`, dan krijg je er `six, python-dateutil, pyparsing, pillow, numpy, kiwisolver, cycler` automatisch bij. Maar dat is niet genoeg. Welke versies van `numpy` werken met de huidige versie van `matplotlib`? Allemaal zaken die je &mdash; als je een package schrijft &mdash; zelf moet bijhouden. Het voordeel is dat jouw gebruikers alleen maar _jouw_ pakket hoeven te installeren &mdash; de rest gaat vanzelf.

En&hellip; hoe test je je package zodat je zeker weet dat hij het bij een ander ook doet? Heel vaak werkt het bij jou wel, maar vergeet je een bestand mee te sturen dat wel echt nodig is.[^missende bestanden] Of: bij jou werkt `#!py import my_new_cool_app.gui` wel, maar bij een ander geeft hij een `#!py ImportError`. De bestanden zijn er wel, maar worden verkeerd geïmporteerd.

[^missende bestanden]: Echt gebeurd: meerdere studenten leverden hun grafische applicatie in voor een beoordeling. We konden het niet draaien, want er misten bestanden. Bij de student werkte het wel, maar bij ons _echt_ niet.

Hoe _krijg_ je eigenlijk je code bij iemand anders? Liefst als één bestand, of zelfs met `pip install my_new_cool_app`; dat zou wel mooi zijn.

En daar is _Poetry_.

Er zijn meerdere tools ontwikkeld om dezelfde problemen op te lossen. Poetry is heel populair geworden. Het richt zich op het officiële ecosysteem: standaard Python packages, ofwel PyPI en `pip`; niet `conda` (zie meer hierover in [paragraaf _pip vs conda_](software-tools.md#pip-vs-conda)). Jammer, maar dit zorgt er wel voor dat iedereen mét of zónder Anaconda je package kan installeren. Dat is dan wel weer fijn. Wij gaan Anaconda gebruiken om een virtual environment met _alleen_ Python te maken. Vervolgens installeren we alles dat we nodig hebben met `pip`. Dat werkt prima, want we mengen verder geen `conda` met `pip` packages. Het maken van conda packages valt daarmee buiten het bestek van deze cursus, al is dat een relatief kleine stap als je je standaard Python package af hebt.

!!! opdracht-basis "Werken in een terminal"
    Poetry is een tool die je enkel en alleen in de terminal kunt gebruiken. Het heeft alleen een command-line interface (CLI). Ben je nog niet zo bekend met het navigeren in een terminal dan kun je als oefening de [Terminal Adventure Game](terminal-adventure-game.md) spelen.

!!! opdracht-inlever "Poetry installeren"
    Om Poetry te installeren gaan we gebruik maken van `pipx`, zie voor meer informatie [paragraaf _pipx_](software-tools.md#pipx).
    Eerst moeten we `pipx` installeren

    1. Open een Anaconda Prompt.
    1. Maak een nieuwe environment en installeer pipx via pip
        ```ps1 title="Terminal"
        conda create --name pipx python
        conda activate pipx
        python -m pip install --user pipx
        ```
    1. Zorg ervoor dat de map waarin pipx apps opslaat, is opgenomen in je PATH omgevingsvariabele.
        ```ps1 title="Terminal"
        python -m pipx ensurepath
        ```
    1. __Sluit de Anaconda Prompt en open een nieuwe.__
    1. Test of pipx nu werkt met:
        ```ps1 title="Terminal"
        pipx
        ```

    Nu kunnen we `Poetry` installeren met `pipx`.

    1. Installeer Poetry met behulp van pipx. 
        ```ps1 title="Terminal"
        pipx install poetry
        ```
    1. Test of poetry nu werkt met:
        ```ps1 title="Terminal"
        poetry
        ```
    1. Activeer een _andere_ environment en test of Poetry ook daar werkt.


We gaan Poetry bedienen door commando's te geven in de terminal van Visual Studio Code. We laten de terminal weten welk programma wij willen gaan besturen, door `poetry` in te typen. En daarachter wat we willen dat Poetry gaat doen. We kunnen informatie over Poetry opvragen met het commando `about`.

<pre><code>(ecpc) > poetry about <button type="button" name="filename_suffix" onclick="runScript('filename_suffix')">{{ enter }}</button><button type="button" name="filename_suffix" onclick="runScript('filename_suffix')" class="invisible">{{ reload }}</button>
<span class="invisible" name="filename_suffix">Poetry - Package Management for Python

Version: 1.7.0
Poetry-Core Version: 1.8.1

Poetry is a dependency manager tracking local dependencies of your projects and libraries.
See https://github.com/python-poetry/poetry for more information.</span>
</code></pre>

!!! opdracht-basis "Poetry about"
    Open een terminal en vraag informatie over Poetry op met het commando `poetry about`. Lees de tekst die Poetry aan je teruggeeft, waar kan je meer informatie vinden?


## Nieuw Poetry project
!!! info
    We gaan werken met modules en packages. Ben je daar nog niet zo bekend mee, zorg dan dat je [paragraaf _Modules_](vervolg-python.md#modules) en [paragraaf _packages_](vervolg-python.md#packages) gemaakt hebt.

Stel je wilt een package schrijven met wat handige functies om veelgebruikte statistische berekeningen makkelijk uit te voeren. Je noemt het `easystat`. Het doel is eerst om het in al je eigen analyses makkelijk te kunnen gebruiken (`#!py import easystat`) maar je wilt het ook op GitHub zetten en wie weet vinden anderen het ook handig! Je wilt het dus ook _netjes_ doen. En niet later van anderen horen: <q>leuk, maar bij mij werkt het niet!</q>

!!! opdracht-basis "Easystat Poetry project aanmaken"
    === "opdracht"
        Een project stop je altijd in een map {{folder}} , als je aan Poetry vraagt om een project te maken zal er een _nieuwe_ (project)map worden aangemaakt.
        Je denkt na over een geschikte locatie en besluit dat de projectmap in de {{folder}}`ECPC` map moet komen te staan. Je opent Visual Studio Code en opent de map {{folder}}`ECPC`. Je opent een terminal en controleert dat de terminal ook in de map {{folder}}`ECPC` is. 
        Je geeft Poetry de opdracht om een nieuw project met de naam {{folder}}`easystat` aan te maken in de src-layout[@srclayout] met het commando `poetry new --src easystat`. Je bekijkt de nieuw gemaakte mappenstructuur en ziet dat het overeenkomt met de mappenstructuur zoals hieronder weergegeven.

        !!! info "src-layout"
            Door het project in een source layout (src-layout) te bouwen maken we het _expres_ iets moeilijker om vanuit een script je package te importeren. Je kunt dat dan alleen nog maar doen door het package zelf ook te _installeren_ (zoals andere gebruikers ook moeten doen) en daardoor loop je zelf tegen eventuele problemen aan. Werkt het uiteindelijk bij jou? Dan werkt het _ook_ bij andere mensen.
    === "code"
        **Testcode**
        <pre><code>(ecpc) > poetry new --src easystat <button type="button" name="poetry new --src easystat" onclick="runScript('poetry new --src easystat')">{{ enter }}</button><button type="button" name="poetry new --src easystat" onclick="runScript('poetry new --src easystat')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="poetry new --src easystat">Created package easystat in easystat</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**
    
        - [ ] De projectmap {{folder}}`easystat` staat in de map {{folder}}`ECPC`.
        - [ ] In de _projectmap_ {{folder}}`easystat` staat een map {{folder}}`src`.
        - [ ] In de map {{folder}}`src` staat een _package_ map {{folder}}`easystat`

        **Projecttraject**
    
        - [x] Easystat Poetry project aanmaken
        - [ ] Easystat conda environment aanmaken
        - [ ] Easystat shortcuts.py en try_shortcuts.py aanmaken
        - [ ] Easystat try_shortcuts.py testen
        - [ ] Easystat Poetry install
        - [ ] Easystat dependencies toevoegen


Er is nu de volgende structuur aangemaakt:

{{folder}} `ECPC`  
{{T}} {{github}} `oefenopdrachten`  
{{T}} {{github}} `pythondaq`  
{{T}} {{new_folder}} `easystat`  
{{tab}} {{T}} {{new_folder}} `src`  
{{tab}} {{tab}} {{L}} {{new_folder}} `easystat`  
{{tab}} {{tab}} {{tab}} {{L}} {{new_file}} `__init__.py`  
{{tab}} {{T}} {{new_folder}} `tests`  
{{tab}} {{tab}} {{L}} {{new_file}} `__init__.py`  
{{tab}} {{T}} {{new_file_lines}} `pyproject.toml`  
{{tab}} {{L}} {{new_file_lines}} `readme.md`  
{{L}} {{folder}} {{dots}}  

Allereerst is er een projectmap `easystat` (waar de map {{folder}}`src` in staat) aangemaakt . Je kunt nu in GitHub Desktop deze map toevoegen als nieuwe repository, zoals we gedaan hebben in [opdracht _Repository toevoegen_](github.md#opd:add_repository).

Laten we één voor één kijken welke mappen en bestanden Poetry heeft aangemaakt. We zien een {{file_lines}}`README.md` in de projectmap staan. Hierin komt een algemene beschrijving van ons project.[^README]

[^README]: Wanneer de repository op GitHub wordt geplaatst wordt deze README automatisch op de hoofdpagina van de repository getoond, onder de code.

Daarna is er een map {{folder}}`tests`. Goede software wordt getest. In deze map komen bestanden te staan die delen van de code runnen en resultaten vergelijken met verwachte resultaten &mdash; zoals je kunt doen in [opdracht _Packages_](vervolg-python.md#opd:test_package).[^unittest]

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
python = "^3.13"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

[^setup.py]: Vroeger was er een `setup.py` maar Python schakelt nu langzaam over naar dit nieuwe bestand.

Het bestand is in het TOML-formaat.[@TOML] Tussen de vierkante haken staan de koppen van de verschillende secties in dit configuratiebestand. Overal zie je `poetry` terugkomen, want dat is de tool die wij gebruiken. In de eerste sectie staat informatie over ons project. Je kunt daar bijvoorbeeld een beschrijving toevoegen of het versienummer aanpassen. De tweede sectie bevat de _dependencies_. Dit zijn alle Pythonpackages die ons project nodig heeft. Op dit moment is dat alleen maar Python. Ook het versienummer van Python is belangrijk. Hier is dat 3.13 en het dakje geeft aan dat nieuwere versies 3.14, enz. ook prima zijn, maar 3.12 (te oud) 4.0 (te nieuw) _niet_. Dit kan belangrijk zijn. Gebruikers met een iets oudere versie van Python &mdash; bijvoorbeeld versie 3.11 &mdash; kunnen nu het package niet installeren. Als je niet per se de nieuwste snufjes van Python 3.13 nodig hebt kun je aangeven dat een iets oudere versie van Python ook prima is. Op dit moment &mdash; herfst 2024 &mdash; is Python 3.13 de nieuwste versie. Het is dus prima om minimaal 3.12 te vragen &mdash; die versie is inmiddels een jaar oud.


### Conda environment aanmaken

Bij het schrijven van een nieuw package is het zéker belangrijk om een conda environment te gebruiken. Anders loop je het risico dat je package _lijkt_ te werken maar bij iemand anders crasht. Immers, het kan best zijn dat jij NumPy gebruikt en al eerder geïnstalleerd had. Bij iemand die NumPy nog _niet_ geïnstalleerd had gaat het dan mis.

!!! opdracht-basis "Easystat conda environment aanmaken"
    === "opdracht"
        Je voegt de projectmap {{folder}}`easystat` toe als repository in GitHub {{lightbulb}}. Vanuit GitHub Desktop open je de repository {{github}}`easystat` in Visual Studio Code. Je maakt een nieuwe conda environment aan met de naam `easystat` en daarin `python=3.12` {{lightbulb}}. Uiteraard selecteer je het nieuwe environment in Visual Studio Code. 
    === "code"
        **Testcode**
        <pre><code>(easystat) > conda list <button type="button" name="conda list" onclick="runScript('conda list')">{{ enter }}</button><button type="button" name="conda list" onclick="runScript('conda list')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="conda list"><span># packages in environment at C:\easystat:</span>
        <span>#</span>
        <span># Name                    Version                   Build  Channel</span>
        bzip2                     1.0.8                h2bbff1b_6
        ca-certificates           2024.7.2             haa95532_0
        libffi                    3.4.4                hd77b12b_1
        openssl                   3.0.15               h827c3e9_0
        pip                       24.2            py310haa95532_0
        **python                    3.12.7               h99e199e_0**
        setuptools                72.1.0          py310haa95532_0
        sqlite                    3.45.3               h2bbff1b_0
        tk                        8.6.14               h0416ee5_0
        tzdata                    2024a                h04d1e81_0
        vc                        14.40                h2eaa2aa_1
        vs2015_runtime            14.40.33807          h98bb1dd_1
        wheel                     0.43.0          py310haa95532_0
        xz                        5.4.6                h8cc25b3_1
        zlib                      1.2.13               h8cc25b3_1</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**
    
        - [ ] De projectmap {{github}}`easystat` is geopend in Visual Studio Code.
        - [ ] Python is geïnstalleerd in de conda environment `easystat`.
        - [ ] In Visual Studio Code is de conda environment `easystat` geactiveerd.

        **Projecttraject**
    
        - [x] Easystat Poetry project aanmaken
        - [x] Easystat conda environment aanmaken
        - [ ] Easystat shortcuts.py en try_shortcuts.py aanmaken
        - [ ] Easystat try_shortcuts.py testen
        - [ ] Easystat Poetry install
        - [ ] Easystat dependencies toevoegen
    
!!! meer-leren "conda-forge"
    Merk op dat we nu niet gebruik hoeven te maken van de `conda-forge` channel. Python zelf staat in _alle_ kanalen en we gaan verder geen software installeren met conda, dus ook niet uit `conda-forge`.


### Maken van de easystat-package
We starten met onze package. Stel, we berekenen vaak de standaarddeviatie van het gemiddelde en maken daarvoor een handige <q>shortcut</q> in {{file}}`shortcuts.py`. Nu willen we deze shortcut ook in een ander script gebruiken. Dit kunnen we doen door package `easystat` te importeren in dit nieuwe script zodat we de functie `stdev_of_mean` daar ook kunnen gebruiken. We maken een script {{file}}`try_shortcuts.py` om dit te testen.[^tests]

!!! opdracht-basis "Easystat shortcuts.py en try_shortcuts.py aanmaken"
    Maak zoals hieronder aangegeven de bestanden {{new_file}}`shortcuts.py` en {{new_file}}`try_shortcuts.py` aan:
    <div class="grid-tree" markdown>
        <div>
        ``` py title="shortcuts.py"
        import numpy as np 
        
        
        def stdev_of_mean(values):
            """Calculate the standard deviation of the mean"""
            return np.std(values) / np.sqrt(len(values))    
        ```
        ``` py title="try_shortcuts.py"
        from easystat.shortcuts import stdev_of_mean

        print(f"{stdev_of_mean([1, 2, 2, 2, 3])=}")
        ```
        </div>
        <div>
        {{github}} `easystat`  
        {{T}} {{folder}} `src`  
        {{tab}} {{T}} {{folder}} `easystat`  
        {{tab}} {{tab}} {{T}} {{file}} `__init__.py`  
        {{tab}} {{tab}} {{L}} {{new_file}} `shortcuts.py`  
        {{T}} {{folder}} `tests`  
        {{tab}} {{T}} {{file}} `__init__.py`  
        {{tab}} {{L}} {{new_file}} `try_shortcuts.py`  
        {{T}} {{file_lines}} `pyproject.toml`  
        {{L}} {{file_lines}} `readme.md`  
        </div>
    </div>

    !!! info "`Import numpy could not be resolved`"
        Misschien is het je al opgevallen dat VS Code een oranje kringeltje onder `#!py numpy` zet in de eerste regel. Als je daar je muiscursor op plaatst krijg je een popup met de melding `Import numpy could not be resolved`. Daar moeten we misschien wat mee en dat gaan we *straks* ook doen.


[^tests]: Niet formeel. Dus hoewel we een script gaan plaatsen in de {{folder}}`tests`-folder is het hier niet een test die automatisch gerund kan worden.

In de eerste regel van {{file}}`test_shortcuts.py` importeren we de functie uit het nieuwe package om uit te proberen. In de laatste regel gebruiken we een handige functie van f-strings.[^f-string-=]

[^f-string-=]: In f-strings kunnen tussen de accolades variabelen of functieaanroepen staan. Voeg daar het `=`-teken aan toe en je krijgt niet alleen de _waarde_, maar ook de variabele of aanroep zelf te zien. Bijvoorbeeld: als je definieert `#!py name = "Alice"`, dan geeft `#!py print(f"{name}")` als uitkomst `#!py Alice`. Maar voeg je het `=`-teken toe zoals in `#!py print(f"{name=")}` wordt de uitvoer `#!py name='Alice'`. Je ziet dan dus ook meteen de naam van de variabele en dat kan handig zijn.

!!! opdracht-basis "Easystat try_shortcuts.py testen"
    === "opdracht"
        Je bent heel benieuwd of je package al werkt. Je runt het bestand {{file}}`try_shortcuts.py` en krijgt een foutmelding...
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="try_shortcuts_error" onclick="runScript('try_shortcuts_error')" class="run">{{ run }}</button><button type="button" name="try_shortcuts_error" onclick="runScript('try_shortcuts_error')" class="reload invisible">{{ reload }}</button> try_shortcuts.py
        ``` py
        from easystat.shortcuts import stdev_of_mean

        print(f"{stdev_of_mean([1, 2, 2, 2, 3])=}")
        ```
        <pre>
        <code>(easystat) > python try_shortcuts.py
        <span class="invisible" name="try_shortcuts_error">Traceback (most recent call last):
            File "c:\ECPC\easystat\tests\try_shortcuts.py", line 1, in < module >
                from easystat.shortcuts import stdev_of_mean
        ModuleNotFoundError: No module named 'easystat'
        </code></pre></div>
        
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt de juiste conda environment geactiveerd.
        - [ ] Je runt het bestand {{file}}`try_shortcuts.py` uit de map {{folder}}`tests`.
        - [ ] Je krijgt een foutmelding `#!py ModuleNotFoundError: No module named 'easystat'`
        
        **Projecttraject**
    
        - [x] Easystat Poetry project aanmaken
        - [x] Easystat conda environment aanmaken
        - [x] Easystat shortcuts.py en try_shortcuts.py aanmaken
        - [x] Easystat try_shortcuts.py testen
        - [ ] Easystat Poetry install
        - [ ] Easystat dependencies toevoegen

Dit konden we verwachten. We hebben onze package immers nog niet geïnstalleerd. Als we onze package gaan delen met andere mensen verwachten wij dat zij onze package ook gaan installeren, door dezelfde stappen te doorlopen als andere gebruikers komen we erachter of alles wel goed werkt.

### Installeren van een package
Het installeren van de package kan makkelijk met Poetry:
<pre><code>(easystat) > poetry install <button type="button" name="poetry install_tekst" onclick="runScript('poetry install_tekst')">{{ enter }}</button><button type="button" name="poetry install_tekst" onclick="runScript('poetry install_tekst')" class="invisible">{{ reload }}</button>
<span class="invisible" name="poetry install_tekst">Updating dependencies
Resolving dependencies... (0.1s)

Writing lock file

Installing the current project: easystat (0.1.0)</span>
</code></pre>

Poetry is even bezig en ons package is geïnstalleerd.

!!! opdracht-basis "Easystat Poetry install"
    === "opdracht"
        Je gaat het project `easystat` installeren in de conda environment `easystat` met het commando `poetry install`. Waarschijnlijk krijg je een error maar door rustig te lezen los je die op. Je installeert alsnog het project `easystat` draai je opnieuw {{file}}`tests/try_shortcuts.py` en zie je een nieuwe error verschijnen `ModuleNotFoundError: No module named 'numpy'`. Hoera {{feesttoeter}} de vorige error is met succes opgelost.

        !!! info "Current Python version is not allowed by the project"
            Waarschijnlijk krijg je in dikke rode letters de error:
            ``` ps1con
            Current Python version (3.12.7) is not allowed by the project (^3.13).
            Please change python executable via the "env use" command.
            ```
            In de {{file_lines}}`pyproject.toml` staat bij de Python dependency dat er minstens versie 3.13 of hoger (^3.13) nodig is voor dit project[^versie]. En de conda environment `easystat` heeft Python 3.12 geïnstalleerd. Je kunt nu twee dingen doen: 
            
            1. Je bedenkt dat voor dit project een lagere versie van Python ook voldoende is en past de Python versie dependency aan in de {{file_lines}}`pyproject.toml` naar ^3.12.
            1. Je vindt dat het project minstens versie 3.13 moet gebruiken en upgrade Python in de `easystat` environment met `conda install python=3.13`.
            
            [^versie]: Dit is bij het aanmaken standaard ingevuld op basis van de Python versie die in de base environment zit, kijk maar met `conda list` in de base environment welke versie van Python daarin zit.
    === "code"
        **Testcode**
        <pre><code>(easystat) > conda list <button type="button" name="conda list_poetry install" onclick="runScript('conda list_poetry install')">{{ enter }}</button><button type="button" name="conda list_poetry install" onclick="runScript('conda list_poetry install')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="conda list_poetry install"><span># packages in environment at C:\easystat:</span>
        <span>#</span>
        <span># Name                    Version                   Build  Channel</span>
        bzip2                     1.0.8                h2bbff1b_6
        ca-certificates           2024.7.2             haa95532_0
        **easystat                  0.1.0                    pypi_0    pypi**
        libffi                    3.4.4                hd77b12b_1
        openssl                   3.0.15               h827c3e9_0
        pip                       24.2            py310haa95532_0
        python                    3.10.14              he1021f5_1
        setuptools                72.1.0          py310haa95532_0
        sqlite                    3.45.3               h2bbff1b_0
        tk                        8.6.14               h0416ee5_0
        tzdata                    2024a                h04d1e81_0
        vc                        14.40                h2eaa2aa_1
        vs2015_runtime            14.40.33807          h98bb1dd_1
        wheel                     0.43.0          py310haa95532_0
        xz                        5.4.6                h8cc25b3_1
        zlib                      1.2.13               h8cc25b3_1</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt de juiste conda environment geactiveerd.
        - [ ] Nadat je `poetry install` hebt gedaan krijg je de melding `Installing the current project: easystat (0.1.0)`.
        - [ ] Je runt het bestand {{file}}`tests/try_shortcuts.py`.
        - [ ] Je krijgt een foutmelding `#!py ModuleNotFoundError: No module named 'numpy'`

        **Projecttraject**
    
        - [x] Easystat Poetry project aanmaken
        - [x] Easystat conda environment aanmaken
        - [x] Easystat shortcuts.py en try_shortcuts.py aanmaken
        - [x] Easystat try_shortcuts.py testen
        - [x] Easystat Poetry install
        - [ ] Easystat dependencies toevoegen


Als we het testscript nu draaien krijgen we wéér een foutmelding:
``` py
ModuleNotFoundError: No module named 'numpy'
```
Ons package heeft NumPy nodig en dat hebben we nog niet geïnstalleerd. Dat kunnen we handmatig doen maar dan hebben andere gebruikers een probleem. Veel beter is het om netjes aan te geven dat ons package NumPy nodig heeft &mdash; als _dependency_.


### Dependencies toevoegen

Om een dependency aan te geven vertellen we Poetry dat hij deze moet toevoegen met:
<pre><code>(easystat) > poetry add numpy <button type="button" name="poetry add numpy" onclick="runScript('poetry add numpy')">{{ enter }}</button><button type="button" name="poetry add numpy" onclick="runScript('poetry add numpy')" class="invisible">{{ reload }}</button>
<span class="invisible" name="poetry add numpy">Using version ^1.23.2 for numpy

Updating dependencies
Resolving dependencies...

Writing lock file

Package operations: 1 install, 0 updates, 0 removals

  • Installing numpy (1.23.2)</span>
</code></pre>

!!! opdracht-basis "Easystat dependencies toevoegen"
    === "opdracht"
        Je voegt `Numpy` als dependency toe aan het project `easystat` met het commando `poetry add numpy`. Je kijkt in de {{file_lines}}`pyproject.toml` en warempel daar staat `Numpy` nu bij de dependencies! Je vraagt je af of `Numpy` nu ook in de conda environment `easystat` is geïnstalleerd en controleert dit met `conda list` en waarachtig `Numpy` staat in de lijst {{feesttoeter}}. Weer ga je {{file}}`tests/try_shortcuts.py` draaien en ditmaal krijg je een uitkomst!
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="try_shortcuts_numpy" onclick="runScript('try_shortcuts_numpy')" class="run">{{ run }}</button><button type="button" name="try_shortcuts_numpy" onclick="runScript('try_shortcuts_numpy')" class="reload invisible">{{ reload }}</button> try_shortcuts.py
        ``` py
        from easystat.shortcuts import stdev_of_mean

        print(f"{stdev_of_mean([1, 2, 2, 2, 3])=}")
        ```
        <pre>
        <code>(ecpc) > python try_shortcuts.py
        <span class="invisible" name="try_shortcuts_numpy">stdev_of_mean([1, 2, 2, 2, 3])=np.float64(0.282842712474619)</span>
        </code></pre></div>
        
        
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt de juiste conda environment geacitveerd.
        - [ ] Je hebt `Numpy` als dependency toegevoegd.
        - [ ] Je krijgt een uitkomst als je het bestand {{file}}`tests/try_shortcuts.py` runt.

        **Projecttraject**
    
        - [x] Easystat Poetry project aanmaken
        - [x] Easystat conda environment aanmaken
        - [x] Easystat shortcuts.py en try_shortcuts.py aanmaken
        - [x] Easystat try_shortcuts.py testen
        - [x] Easystat Poetry install
        - [x] Easystat dependencies toevoegen


Fijn! Het verwijderen van dependency `PACKAGE` gaat met `poetry remove PACKAGE`. Poetry heeft Numpy nu toegevoegd aan de environment `easystat`.Gewone package managers als Pip en Conda zullen geen packages toevoegen aan je Poetry project als je `pip/conda install package` aanroept. Gebruik daarom altijd `poetry add package` als je met Poetry aan een package werkt.

!!! info
    Als we de code in ons package aanpassen dan hoeven we het niet opnieuw te installeren met Poetry, maar als we met de hand iets wijzigen in de {{file}}`pyproject.toml` dan moet dat _wel_. Als je een `#!py ImportError` krijgt voor je eigen package &mdash; bijvoorbeeld als je nieuwe mappen of bestanden hebt aangemaakt &mdash; probeer dan _eerst_ voor de zekerheid `poetry install`.

???+ meer-leren "Poetry.lock"

    ### Poetry.lock

    Na het toevoegen van Numpy is er ook een bestand {{file_lines}}`poetry.lock` bijgekomen. Hierin staan de exacte versies van alle geïnstalleerde packages. Vaak wordt dit bestand gecommit zodat collega-ontwikkelaars exact dezelfde versies installeren zodra ze `poetry install` aanroepen. Om dat te proberen maken we even een schone conda environment:

    !!! opdracht-meer "Schone environment"

        1. Maak een schone conda environment met `conda create --name easystat python=3.12`
        1. Kies voor ja als Conda een waarschuwing geeft dat deze environment al bestaat en vraagt of je het bestaande environment wilt verwijderen.
        1. Draai {{file}}`tests/try_shortcuts.py` en bekijk de foutmelding.
        


    We krijgen meteen foutmeldingen. Immers, we hebben nog niets geïnstalleerd.

    !!! opdracht-meer "Poetry.lock"

        1. Installeer de `easystat` package met `poetry`.
        1. Waarvoor gebruikt Poetry de lock file ({{file_lines}}`poetry.lock)`?
        1. Draai {{file}}`tests/try_shortcuts.py` en bekijk de uitkomst.


???+ meer-leren "Wheels"

    ### Wheels

    Wanneer we klaar zijn om ons package te delen met andere gebruikers gebruiken we het commando `build` om wheels te bouwen.

    !!! opdracht-meer "Bouw een wheel"
        
        1. Bouw het wheel van easystat met `poetry build`.
        1. Bekijk de namen van de bestanden in de nieuwe map {{folder}}`easystat/dist`, welke extensie hebben ze?
        

    <pre><code>(ecpc) > poetry build <button type="button" name="poetry build" onclick="runScript('poetry build')">{{ enter }}</button><button type="button" name="poetry build" onclick="runScript('poetry build')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="poetry build">Building easystat (0.1.0)
        - Building sdist
        - Built easystat-0.1.0.tar.gz
        - Building wheel
        - Built easystat-0.1.0-py3-none-any.whl</span>
    </code></pre>
    Een <q>sdist</q> is een _source distribution_. Een `.tar.gz`-bestand is een soort zipbestand met daarin de broncode van ons pakket. De tests worden daar niet in meegenomen. Een <q>wheel</q> is een soort bestand dat direct geïnstalleerd kan worden met `pip`. Zogenaamde _pure-python_ packages bevatten alleen Pythoncode &mdash; en geen C-code die gecompileerd moet worden voor verschillende besturingssystemen of hardwareplatforms. Je herkent ze aan `none-any` in de bestandsnaam. <q>None</q> voor <q>niet-OS-specifiek</q> en <q>any</q> voor <q>draait op elk hardwareplatform</q>. We kunnen dit bestand als download neerzetten op een website of aan anderen mailen.

    !!! opdracht-meer "Test wheel"
        Laten we het wheel uitproberen. We gaan straks een nieuwe conda environment aanmaken, installeren het wheel en proberen het testscript te runnen &mdash; één keer vóór het installeren van het wheel en één keer ná het installeren, als volgt:

        1. Maak een nieuwe conda environment aan met de naam `test-wheel` en activeer deze.
                ``` ps1con title="Terminal"
                PS> conda create --name test-wheel python=3.12
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
    Vergeet niet &mdash; waar nodig &mdash; de {{file}}`__init__.py` bestanden toe te voegen aan de packages. Meer informatie over de {{file}}`__init__.py` bestanden vind je in [paragraaf _packages_](vervolg-python.md#packages).

!!! info
    Als je al bezig bent met een project dan werk je als het goed is al in een conda environment. Daar heb je dan met `conda install` al packages geïnstalleerd die je nodig hebt. Het gebeurt dan makkelijk dat je vergeet om dat aan te geven met `poetry add`. Dat betekent alleen dat als iemand anders je package installeert dat er dependencies missen en dat jouw code dus _niet_ werkt! Dit is makkelijk op te lossen. Zodra je Poetry gaat gebruiken _wis dan je environment en maak een nieuwe aan met alleen Python._ Dat gaat het makkelijkst als volgt. Stel dat je bezig bent in het environment `pythondaq`. We maken dan een nieuw environment met dezelfde naam:
    <pre><code>(ecpc) > conda create --name pythondaq python=3.12 <button type="button" name="conda create --name pythondaq python=3.12" onclick="runScript('conda create --name pythondaq python=3.12')">{{ enter }}</button><button type="button" name="conda create --name pythondaq python=3.12" onclick="runScript('conda create --name pythondaq python=3.12')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="conda create --name pythondaq python=3.12">WARNING: A conda environment already exists at '/Users/david/opt/anaconda3/envs/pythondaq'
    Remove existing environment (y/[n])? y                                                                                                                                      
    ...</span>
    </code></pre>
    
    Je overschrijft dus je huidige environment met een nieuwe, lege. Je kunt daarna met `poetry add` packages toevoegen net zo lang tot je geen `#!py ImportError` meer krijgt.

!!! opdracht-basis "Poetry flashingLED"
    === "opdracht"
    
        <div class="grid-tree" markdown>
            <div>
            Je gaat een bestaand project maken zodat je kunt oefenen om daar Poetry aan toe te voegen. Omdat de [opdracht _flashingLED_](communicatie.md#opd:flashingLED) een oefenopdracht was voor `Pythondaq` besluit je deze als oefenpackage te gebruiken. Je maakt een nieuwe repository {{github}}`flasher` aan {{lightbulb}} en opent deze in Visual Studio Code. Je maakt zelf in de repository {{github}}`flasher` de src-layout van mappen en bestanden, zoals hier rechts is weergegeven. Het bestand {{file}}`flashingLED` heb je gekopieerd uit je repository {{github}}`oefenopdrachten`. Nu het oefenpackage klaar staat (commit{{feesttoeter}}) maak je een nieuwe conda environment met de naam `flasher` met daarin `python=3.12` {{lightbulb}}. Je activeert de environment `flasher` en voegt Poetry toe {{lightbulb}}. Je installeert het pakket en daarna voeg je de benodigde dependencies toe (in ieder geval `pyvisa-py` maar wat nog meer?) net zolang tot het scriptje weer werkt {{lightbulb}}. 
            </div>
            <div>
            {{folder}} `ECPC`  
            {{T}} {{github}} `oefenopdrachten`  
            {{T}} {{github}} `pythondaq`  
            {{T}} {{github}} `flasher`  
            {{tab}} {{L}} {{folder}} `src`  
            {{tab}} {{tab}} {{L}} {{folder}} `flasher`  
            {{tab}} {{tab}} {{tab}} {{T}} {{new_file_lines}}`__init__.py`  
            {{tab}} {{tab}} {{tab}} {{L}} {{file}} `flashingLED.py`  
            {{L}} {{dots}}  
            </div>
        </div>
        !!! info "No module named 'serial'"
            Waarschijnlijk krijg je onder andere de foutmelding:
            ``` ps1con
                ValueError: Please install PySerial (>=3.0) to use this resource type.
                No module named 'serial'
            ```
            Super handig dat iemand daarboven heeft opgeschreven wat je moet doen om dit probleem op te lossen. Maar waarom moeten we nu ineens `PySerial` installeren[^pyserial]? Dat komt omdat we eerst `pyvisa-py` met conda uit de conda-forge channel installeerde en daar komt `PySerial` als dependencie mee. Nu installeerd Poetry met behulp van pip `pyvisa-py` en daar komt `PySerial` niet automatisch mee. En dus moeten we het nu zelf handmatig toevoegen.

            [^pyserial]: PySerial is een package die we gebruiken om te communiceren over USB poorten.
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="flasherLED_poetry" onclick="runScript('flasherLED_poetry')" class="run">{{ run }}</button><button type="button" name="flasherLED_poetry" onclick="runScript('flasherLED_poetry')" class="reload invisible">{{ reload }}</button> flasherLED.py
        ``` py
        import pyvisa
        import numpy as np
        import time

        rm = pyvisa.ResourceManager("@py")
        ports = rm.list_resources()
        print(ports)
        device = rm.open_resource(
            "ASRL3::INSTR", read_termination="\r\n", write_termination="\n"
        )

        for value in np.arange(0, 10):
            device.query(f"OUT:CH0 {0}")
            time.sleep(1)
            device.query(f"OUT:CH0 {1023}")
            time.sleep(1)

        ```
        <pre>
        <code>(ecpc) > python flasherLED.py
        <span class="invisible" name="flasherLED_poetry"><span>()</span>
        <span>Traceback (most recent call last):</span>
          File "c:\ECPC\flasher\src\flasher\flashingLED.py", line 8, in <module>
              device = rm.open_resource(
          File "C:\envs\flasher\lib\site-packages\pyvisa\highlevel.py", line 3292, in open_resource
              res.open(access_mode, open_timeout)
          File "C:\envs\flasher\lib\site-packages\pyvisa\resources\resource.py", line 281, in open
              self.session, status = self._resource_manager.open_bare_resource(
          File "C:\envs\flasher\lib\site-packages\pyvisa\highlevel.py", line 3217, in open_bare_resource
              return self.visalib.open(self.session, resource_name, access_mode, open_timeout)
          File "C:\envs\flasher\lib\site-packages\pyvisa_py\highlevel.py", line 168, in open
              sess = cls(session, resource_name, parsed, open_timeout)
          File "C:\envs\flasher\lib\site-packages\pyvisa_py\sessions.py", line 861, in __init__
              raise ValueError(self.session_issue)
        **ValueError: Please install PySerial (>=3.0) to use this resource type.**
        No module named 'serial'</span>
        </code></pre></div>
        
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt een repository {{github}}`flasher` met daarin een src-layout.
        - [ ] Je hebt de juiste conda environment geactiveerd.
        - [ ] Poetry is toegevoegd aan het project.
        - [ ] Alle benodigde dependencies staan in het {{file_lines}}`pyproject.toml` _en_ zijn geïnstalleerd in de conda environment.
        - [ ] Het runnen van {{file}}`flashingLED` laat het LED knipperen.

        **Projecttraject**
    
        - [x] Communicatie met een meetinstrument: flashingLED
        - [x] Versiebeheer met GitHub: Repository toevoegen
        - [x] Poetry flashingLED

## Poetry gebruiken voor pythondaq
Natuurlijk willen we Poetry ook gaan gebruiken bij `pythondaq`. Daarvoor moeten we twee dingen doen. Als eerste gaan we de `pythondaq` repository in een `src`-structuur zetten en daarna gaan we Poetry initialiseren.


!!! opdracht-inlever "Pythondaq: src-layout"
    <div class="grid-tree" markdown>
        <div>
        Je project {{github}}`pythondaq` is zo tof aan het worden dat je het met Poetry gaat beheren zodat jij en andere het gemakkelijk kunnen installeren en gebruiken. Om te beginnen zet je de repository om in een src-layout zoals hiernaast:
        </div>
        <div>
        {{github}}`pythondaq`  
        {{T}}{{new_folder}}`src`  
        {{tab}}{{L}}{{new_folder}}`pythondaq`  
        {{tab}}{{tab}}{{T}}{{new_file}}`__init__.py`  
        {{tab}}{{tab}}{{T}}{{file}}`arduino_device.py`  
        {{tab}}{{tab}}{{T}}{{file}}`diode_experiment.py`  
        {{tab}}{{tab}}{{L}}{{file}}`view.py`  
        {{L}}{{file_lines}}`README.md`  
        </div>
    </div>

!!! opdracht-inlever "Pythondaq: poetry"
    === "opdracht"
        Nu de repository {{github}}`pythondaq` in de src-layout staat voeg je Poetry toe om het project te beheren. Nadat alles gelukt is test je het project door een nieuwe conda environment aan te maken met de naam `pythondaq` met daarin alleen `python=3.12` {{lightbulb}}. Daarna installeer je het Poetry project {{lightbulb}} en wanneer je `view.py` runt zie je als vanouds een lampje branden en een plot verschijnen. 
    === "code"
        **Pseudo-code**
        <pre><code>(ecpc) > poetry install <button type="button" name="poetry install_pythondaq" onclick="runScript('poetry install_pythondaq')">{{ enter }}</button><button type="button" name="poetry install_pythondaq" onclick="runScript('poetry install_pythondaq')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="poetry install_pythondaq"><span>Installing dependencies from lock file</span>
        <span></span>
        <span>Package operations: x installs, 0 updates, 0 removals</span>
        <span></span>
        - Installing xxx (1.2.3)
        - Installing xxx (1.2.3)
        - Installing xxx (1.2.3): Pending...
        - Installing xxx (1.2.3): Installing...
        - Installing xxx (1.2.3)
        <span></span>
        Installing the current project: pythondaq (0.1.0)</span>
        </code></pre>
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt Poetry geïnitialiseerd in de Pythondaq project map.
        - [ ] Na het initialiseren van Poetry is er een {{file}}`pyproject.toml` in de projectmap aangemaakt.
        - [ ] Wanneer met `poetry install` in een nieuwe conda environment met alleen python=3.12 het pakket wordt geïnstalleerd werkt {{file}}`view.py` daarna in die nieuwe omgeving naar behoren. 

        **Projecttraject**
    
        - [x] Pythondaq: Docstring
        - [x] Pythondaq: src-layout
        - [x] Pythondaq: poetry    
        - [ ] Pythondaq: test imports
        - [ ] Pythondaq: applicatie

!!! opdracht-inlever "Pythondaq: test imports"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Bij het uitbouwen van de applicatie ga je mogelijk onderdelen uit de pythonpackage importeren. Daarom is het verstandig om, net als met de [opdracht _Packages_](vervolg-python.md#opd:test_package), het importeren uit de package te testen.
            Maak daarvoor een {{folder}}`tests`-map met {{file}}`__init__.py` en {{file}}`test_imports.py` in de repository {{github}}`pythondaq`. 
            ```py title="test_imports.py"
            import pythondaq.view
            ```
            Je runt het bestand {{file}}`test_imports.py` en lost de errors op. Daarna  werkt je package ook als je het aanroept van buiten de map met broncode. Je {{github}}`pythondaq`-repository is nu een volledig project dat je met andere gebruikers van Python kunt delen, bijvoorbeeld via een _wheel_.
            </div>
            <div>
            {{github}}`pythondaq`  
            {{T}}{{folder}}`src`  
            {{tab}}{{L}}{{folder}}`pythondaq`  
            {{tab}}{{tab}}{{T}}{{file}}`__init__.py`  
            {{tab}}{{tab}}{{T}}{{file}}`arduino_device.py`  
            {{tab}}{{tab}}{{T}}{{file}}`diode_experiment.py`  
            {{tab}}{{tab}}{{L}}{{file}}`view.py`  
            {{T}}{{new_folder}}`tests`  
            {{tab}}{{T}}{{new_file}}`__init__.py`  
            {{tab}}{{L}}{{new_file}}`test_imports.py`  
            {{T}}{{file_lines}}`pyproject.toml`  
            {{L}}{{file_lines}}`README.md`  
            </div>
        </div>
        
    === "code"
        **Pseudocode**
        ```py title="view.py"
        # define from which package the module diode_experiment should be imported
        ...

        ```
        **Testcode**
        <div class="code-box"><button type="button" name="test_imports_pythondaq" onclick="runScript('test_imports_pythondaq')" class="run">{{ run }}</button><button type="button" name="test_imports_pythondaq" onclick="runScript('test_imports_pythondaq')" class="reload invisible">{{ reload }}</button> test_imports.py
        ``` py
        import pythondaq.view
        ```
        <pre>
        <code>(ecpc) > python test_imports.py
        <span class="invisible" name="test_imports_pythondaq">Traceback (most recent call last):
            File "c:\pythondaq\tests\test_imports.py", line 1, in < module >
                import pythondaq.view
            File "C:\pythondaq\src\pythondaq\view.py", line 4, in < module >
                from diode_experiment import DiodeExperiment
            ModuleNotFoundError: No module named 'diode_experiment'</span>
        </code></pre></div>
        
    === "check"
        **Checkpunten:**
    
        - [ ] Er is een map {{folder}}`tests` in de repository {{github}}`pythondaq`.
        - [ ] Er is een bestand {{file}}`__init__.py` in de map {{folder}}`tests`.
        - [ ] De import statements in de modules in het package {{folder}}`pythondaq` zijn aangepast zodat het bestand {{file}}`test_imports` runt zonder problemen.

        **Projecttraject**

        - [x] Pythondaq: Docstring
        - [x] Pythondaq: src-layout
        - [x] Pythondaq: poetry    
        - [x] Pythondaq: test imports
        - [ ] Pythondaq: applicatie


???+ opdracht-meer "Model, view, controller packages"
    In grotere projecten is het gebruikelijk om model, view, controller niet alleen uit te splitsen in verschillende scripts, maar ook in aparte packages te zetten.

    1. Maak 3 extra packages in de {{folder}}`pythondaq` package. {{folder}}`models`, {{folder}}`views` en {{folder}}`controllers`.
    1. Zet de modules in de juiste packages.
    1. Test je code zodat alle imports weer werken.


## Van script naar applicatie
Om onze python code te testen heb je tot nu toe waarschijnlijk op de `run`-knop in Visual Studio Code gedrukt. Of je hebt in de terminal aan python gevraagd om het {{file}}`script.py` te runnen:
``` ps1 title="Terminal"
python script.py
```
Je moet dan wel de juiste map geopend hebben zodat python het bestand kan vinden. En als je de `run`-knop gebruikt moet wel het bestandje open hebben staan dat je wilt runnen. Kortom, best een beetje gedoe. Maar als we programma's zoals Poetry, Conda of Python willen gebruiken hoeven we helemaal niet het juiste bestandje op te zoeken en te runnen. We hoeven alleen maar een commando in de terminal te geven &mdash; bijvoorbeeld `python` of `conda` &mdash; en de computer start automatisch het juiste programma op.

Dat willen wij ook voor onze programma's! En omdat we Poetry gebruiken kunnen we dat heel eenvoudig doen. We gaan een commando toevoegen om de module uit te voeren waarvan je de code in [paragraaf _Modules_](vervolg-python.md#modules) kunt vinden. De twee bestanden {{file}}`square.py` en {{file}}`count_count.py` hebben we voor jullie netjes in een package geplaats in de repository {{github}}`AnneliesVlaar/just_count` met de volgende structuur:

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

De bestanden {{file}}`square.py` en {{file}}`count_count.py` zien er hetzelfde uit als in [paragraaf _Modules_](vervolg-python.md#modules):
=== "square.py"

    ``` py
    --8<-- "scripts/square.py"
    ```
=== "count_count.py"

    ``` py
    --8<-- "scripts/count_count.py"
    ```


We kunnen Poetry niet vragen om een script te runnen, maar wel om een functie uit te voeren.
   
!!! opdracht-basis "Main functie toevoegen"
    === "opdracht"
        Je [cloned de repository just_count in GitHub desktop](x-github-client://openRepo/https://github.com/AnneliesVlaar/just_count) en opent het daarna vanuit GitHub Desktop in Visual Studio Code. Je ziet een {{file_lines}}`pyproject.toml` in de repository staan. Dus installeer je het pakket met Poetry in een nieuwe conda environment (met alleen python=3.12) {{lightbulb}}. Je opent het hoofdbestand {{file}}`count_count.py` en zet de <q>body</q> van de module in een functie `#!py main()`. Daarna pas je het bestand aan zodat de functie nog steeds wordt uitgevoerd wanneer je het bestand {{file}}`count_count.py` runt. 
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="count_count_main function" onclick="runScript('count_count_main function')" class="run">{{ run }}</button><button type="button" name="count_count_main function" onclick="runScript('count_count_main function')" class="reload invisible">{{ reload }}</button> count_count.py
        ``` py
        import square

        def main():
            print(f"The square of 5 is {square.square(5)}")

        if __name__ == '__main__':
            main()
        ```
        <pre>
        <code>(ecpc) > python count_count.py
        <span class="invisible" name="count_count_main function">The square of 5 is 25</span>
        </code></pre></div>
        
    === "check"
        **Checkpunten:**
    
        - [ ] Er is een functie `#!py main()` in het bestand {{file}}`count_count.py`
        - [ ] Het runnen van het bestand {{file}}`count_count.py` geeft de output `The square of 5 is 25`

        **Projecttraject**
    
        - [x] main functie toevoegen 
        - [ ] commando toevoegen
        - [ ] commando testen
    

In {{file}}`pyproject.toml` kunnen we nu het commando toe gaan voegen. Met de `scripts`-tool van Poetry kunnen we aangeven met welk commando een functie uit een script wordt uitgevoerd. Om een commando toe te voegen ga je naar {{file}}`pyproject.toml` en voeg je een extra kopje toe:
``` toml
[tool.poetry.scripts]
naam_commando = "package.module:naam_functie"
```
Om de wijzigingen aan {{file}}`pyproject.toml` door te voeren moet je de package opnieuw installeren.

!!! opdracht-basis "commando toevoegen"
    === "opdracht"
        Je voegt in de {{file}}`pyproject.toml` het kopje `[tool.poetry.scripts]` toe. Je voegt vervolgens het commando `square` toe. Deze verwijst naar de functie `#!py main()` welke in de module {{file}}`count_count.py` staat die ondergebracht is in de package {{folder}}`just_count`. Omdat je handmatig het toml-bestand hebt aangepast installeer je het package opnieuw met Poetry {{lightbulb}}.
    === "code"
        **Pseudo-code**
        ``` toml title="pyproject.toml"
        [tool.poetry.scripts]
        square = "just_count.count_count:main"
        ```
    === "check"
        **Checkpunten:**
    
        - [ ] De naam van het commando is `square`.
        - [ ] De verwijzing na het = teken begint met twee aanhalingstekens gevolgd door het package {{folder}}`just_count` gevolgt door een punt.
        - [ ] Na de punt staat de naam van de module {{file}}`count_count.py` zonder de extensie `.py` gevolgd door een dubbele punt.
        - [ ] Na de dubbele punt staat de naam van de functie `#!py main()` zonder haakjes `()`.
        - [ ] Achter de functie staan weer dubble aanhalingstekens om de verwijzing te sluiten. 
        - [ ] Na het opslaan van de {{file_lines}}`pyproject.toml` is het pakket opnieuw geïnstalleerd. 

        **Projecttraject**
    
        - [x] main functie toevoegen 
        - [x] commando toevoegen
        - [ ] commando testen


<div id="opd:Poetry_commando"></div>

!!! opdracht-basis "Commando testen"
    === "opdracht"
        Nu je het commando `square` hebt aangemaakt ga je deze testen in een terminal je ziet de tekst `The square of 5 is 25` verschijnen. Je vraagt je af of het commando ook werkt als de terminal in een andere map zit. Met het commando `cd..` ga je naar een bovenliggende map. Je test het commando `square` en ziet weer de tekst `The square of 5 is 25` verschijnen. Je concludeert dat het commando nu overal werkt zolang het juiste conda environment is geactiveerd. Dat test je uit door een ander conda environment te activeren {{lightbulb}} en het commando `square` nogmaal te proberen. Je krijgt een error en hebt daarmee je vermoeden bewezen. Tevreden ga je door naar de volgende opdracht. 
    === "code"
        **Pseudo-code**
        <pre><code>(ecpc) > square <button type="button" name="square_test" onclick="runScript('square_test')">{{ enter }}</button><button type="button" name="square_test" onclick="runScript('square_test')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="square_test">The square of 5 is 25</span>
        </code></pre>
    === "check"
        **Checkpunten:**
    
        - [ ] Het commando `square` werkt als het juiste conda environment is geactiveerd.
        - [ ] Het commando `square` werkt nog steeds nadat je met het commando `cd..` naar een bovenliggende map bent gegaan.
        - [ ] Het commando `square` werkt niet als een andere conda environment is geactiveerd.

        **Projecttraject**
    
        - [x] main functie toevoegen 
        - [x] commando toevoegen
        - [x] commando testen

???+ opdracht-meer "Error analysis"
    Als extra oefening gaan we met Poetry een commando maken om een ander script uit te laten voeren. De package is al aangemaakt, maar werkt nog niet naar behoren. Los in de volgende opdrachten de errors op om het script {{file}}`data_analysis.py` te laten runnen.

    1. Ga naar GitHub en clone {{github}}[`AnneliesVlaar/erroranalysis`](https://github.com/AnneliesVlaar/erroranalysis) in GitHub Desktop en open de repository daarna in Visual Studio Code.
    1. Natuurlijk maak je gelijk een nieuwe Conda environment aan {{lightbulb}}, voordat we dit package gaan testen.
    1. Snuffel door de bestanden en mappen, en open {{file}}`src/erroranalysis/data_analysis.py`. Dit is het script wat moet kunnen runnen.
    1. Run het script {{file}}`data_analysis.py` en los de errors één voor één op.
    
    Om erachter te komen of de problemen die we hierboven hadden écht zijn opgelost maak je een nieuwe Conda environment aan {{lightbulb}}, installeer je het package en run je het script. Werkt alles? Mooi! Dan gaan we nu een commando aanmaken om de functie `#!py table()` aan te roepen.

    1. Open {{file}}`pyproject.toml` en voeg een kopje toe voor scripts.
            ``` toml
            [tool.poetry.scripts]
            naam_commando = "package.module:naam_functie"
            ```
            pas de regel aan zodat jouw commando de functie `#!py table()` aanroept in {{file}}`src/erroranalysis/data_analysis.py`. Je mag de naam van het commando zelf kiezen.
    1. Ga naar de terminal en kijk of het werkt!
    <pre><code>(ecpc) > naam_commando <button type="button" name="naam_commando" onclick="runScript('naam_commando')">{{ enter }}</button><button type="button" name="naam_commando" onclick="runScript('naam_commando')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="naam_commando">Area of the kitchen table is: 1.8386 ± 0.0049 m</span>
    </code></pre>
    
!!! opdracht-inlever "Pythondaq: applicatie"
    === "opdracht"
        Je maakt een commando om het script {{file}}`view.py` uit de repository {{github}}`pythondaq` te starten {{lightbulb}}. Wanneer je het commando aanroept gaat het LED-lampje branden, en verschijnt er even later een IU-plot op het scherm. Je test of het commando ook buiten Visual Studio Code werkt door een `Anaconda prompt` te openen. Je activeert het juiste conda environment {{lightbulb}} en ziet dat ook dan het commando werkt. Wat een feest! {{feesttoeter}} Je hebt nu een applicatie geschreven die een Arduino aanstuurt om een ledje te laten branden. En je kunt je applicatie gewoon vanuit de terminal aanroepen! {{feesttoeter}}
    === "code"
        **Pseudo-code**
        ``` py title="view.py"
        # import statements

        # def function
            # code to start a measurement
        ```
        ``` toml title="pyproject.toml"
        [tool.poetry.scripts]
        naam_commando = "package.module:naam_functie"
        ```
    === "check"
        **Checkpunten:**
    
        - [ ] De functie in {{file}}`view.py` bevat alle code die uitgevoerd moet worden om een meting te starten.
        - [ ] Het commando in de {{file_lines}}`pyproject.toml` verwijst op de correcte manier naar de functie in {{file}}`view.py`.
        - [ ] Het aanroepen van het commando zorgt ervoor dat een meting gestart wordt. 
        - [ ] Het commando werkt ook in een `Anaconda prompt` zolang het juiste conda environment actief is.

        **Projecttraject**
    
        - [x] Pythondaq: Docstring
        - [x] Pythondaq: src-layout
        - [x] Pythondaq: poetry    
        - [x] Pythondaq: test imports
        - [x] Pythondaq: applicatie

???+ meer-leren "Versie 2.0.0"
    In de {{file}}`pyproject.toml` kan je ook de versie aangeven van je package. Maar wanneer hoog je nu welk cijfertje op? Wanneer wordt iets _versie 2.0.0_? Daar zijn conventies voor. Kleine wijzigingen gaan op het rechter cijfer, grotere wijzigingen en bugfixes gaan op het middelste cijfer. Wanneer de applicatie dusdanig verandert dat je bijvoorbeeld bestanden die je met oude versie hebt gemaakt niet met de nieuwe versie kunt openen, dan verander je het linker cijfer.