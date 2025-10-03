# Pythonprojecten met uv

In de vorige hoofdstukken heb je gewerkt met een eigen virtual environment per project, zodat je jouw pythonomgeving mooi gescheiden kan houden van andere projecten waar je aan werkt. Dit is echt _de_ oplossing voor alle problemen waarbij volledige Pythoninstallaties onbruikbaar kunnen worden &mdash; waarna je alles opnieuw moet installeren. Dit kan gebeuren als je &mdash; vanwege al je verschillende projecten &mdash; zoveel packages installeert dat die met elkaar in conflict komen.

Voor ieder project nieuwe environments aanmaken heeft wel een nadeel: je moet alle packages die je nodig hebt opnieuw installeren. Welke waren dat ook alweer? Vast `numpy`, en `matplotlib`, en&hellip;? Niet handig. Als je code gaat delen met elkaar krijg je regelmatig te maken met een `#!py ImportError` of `#!py ModuleNotFoundError` omdat je niet precies weet wat er nodig is, waarna je _weer_ één of ander package moet installeren.

Nu pythondaq netjes is uitgesplitst in een MVC-structuur en de wijzigingen met Git worden bijgehouden, ga je er een package van maken zodat je het ook met anderen kunt delen. In deze package staan alle benodigdheden duidelijk omschreven, zodat gebruikers daar verder niet over hoeven na te denken.

Packages op PyPI &mdash; de standaardplek waar Python packages gepubliceerd worden &mdash; geven altijd hun _dependencies_ op. Dat zijn de packages die verder nog nodig zijn om alles te laten werken. Installeer je `matplotlib`, dan krijg je er `six, python-dateutil, pyparsing, pillow, numpy, kiwisolver, cycler` automatisch bij. Maar alleen de namen van de packages als dependencies opgeven is niet genoeg. Welke versies van `numpy` werken met de huidige versie van `matplotlib`? Allemaal zaken die je &mdash; als je een package schrijft &mdash; zelf moet bijhouden. Als je dat netjes doet, dan hoeven jouw gebruikers alleen maar _jouw_ package te installeren &mdash; de rest gaat vanzelf.

En&hellip; hoe test je je package, zodat je zeker weet dat je package het bij een ander ook doet? Heel vaak werkt het bij jou wel, maar vergeet je een bestand mee te sturen dat wel echt nodig is.[^missende bestanden] Of: bij jou werkt `#!py import my_new_cool_app.gui` wel, maar bij een ander geeft dat een `#!py ImportError` of `#!py ModuleNotFoundError`. De bestanden zijn er wel, maar worden verkeerd geïmporteerd.

[^missende bestanden]: Echt gebeurd: meerdere studenten leverden hun grafische applicatie in voor een beoordeling. We konden het niet draaien, want er misten bestanden. Bij de studenten werkte het wel, maar bij ons _echt_ niet.

Hoe _krijg_ je eigenlijk je code bij iemand anders? Liefst als één bestand, of zelfs met `uv pip install my_new_cool_app`; dat zou wel mooi zijn.

_uv_ helpt je ook hier om al deze problemen op te lossen. 

!!! info
    Voorgaande jaren leerden we studenten om _Poetry_ te gebruiken. Heel populair, maar uv is de afgelopen anderhalf jaar nog [_veel populairder_](https://www.star-history.com/#python-poetry/poetry&astral-sh/uv&Date) geworden. En terecht.

Er zijn meerdere tools ontwikkeld om dezelfde problemen op te lossen. uv is in korte tijd heel populair geworden. Het richt zich op het officiële ecosysteem: standaard Python packages, ofwel PyPI en `pip`; niet `conda` (zie meer hierover in [paragraaf _pip vs conda_](virtual_environments.md#pip-vs-conda)). Dit zorgt er voor dat iedereen mét of zónder Anaconda je package kan installeren. Omdat uv ook in staat is zelf verschillende versies van Python te installeren hebben we Anaconda niet meer nodig. De installer van Anaconda is bijna 1 Gb groot en bevat heel veel Python packages die je nooit gebruikt. De installer van uv is nog geen 20 Mb en kun je gebruiken om precies te installeren wat je nodig hebt.

!!! opdracht-basis-thuis "Werken in een terminal"
    === "opdracht"
        uv is een tool die je enkel en alleen in de terminal kunt gebruiken. Het heeft alleen een command-line interface (CLI). De [Terminal Adventure Game](terminal-adventure-game.md) helpt je om met meer gemak te navigeren in een terminal.

    === "check"
        **Projecttraject**

        - [x] Werken in een terminal

Je gaat uv bedienen door commando's te geven in de terminal van Visual Studio Code. Je laat de terminal weten welk programma je wilt gaan besturen door `uv` in te typen. En daarachter wat je wilt dat uv gaat doen. Je kunt bijvoorbeeld kijken welke commando's allemaal beschikbaar zijn met `uv help`. Dat geeft een vrij lange lijst die je terug kunt scrollen in de terminal, maar je kunt ook `uv help | more` intypen om de tekst per pagina weer te geven.[^more]

[^more]: `more` is een programma die aangeleverde tekst per pagina laat zien, waar je met ++space++ een volgende pagina te zien krijgt. Met ++enter++ krijg je maar één regel extra en met ++q++ sluit je het programma meteen af. Het `|` karakter stuurt output door. Dus `uv help | more` stuurt de output van `uv help` door naar het programma `more`.

<pre><code>> uv help | more <button type="button" name="filename_suffix" onclick="runScript('filename_suffix')">{{ enter }}</button><button type="button" name="filename_suffix" onclick="runScript('filename_suffix')" class="invisible">{{ reload }}</button>
<span class="invisible" name="filename_suffix">An extremely fast Python package manager.

Usage: uv [OPTIONS] &lt;COMMAND&gt;

Commands:
  auth                       Manage authentication
  run                        Run a command or script
  init                       Create a new project
  add                        Add dependencies to the project
  remove                     Remove dependencies from the project
  version                    Read or update the project's version
  sync                       Update the project's environment
  lock                       Update the project's lockfile
  export                     Export the project's lockfile to an alternate format
  tree                       Display the project's dependency tree
  format                     Format Python code in the project
  tool                       Run and install commands provided by Python packages
  python                     Manage Python versions and installations
  pip                        Manage Python packages with a pip-compatible interface
  venv                       Create a virtual environment
  build                      Build Python packages into source distributions and wheels
  publish                    Upload distributions to an index
  cache                      Manage uv's cache
  self                       Manage the uv executable
  generate-shell-completion  Generate shell completion
  help                       Display documentation for a command

Cache options:
  -n, --no-cache               Avoid reading from or writing to the cache, instead using a temporary directory for the
-- More  --</span>
</code></pre>

!!! info
    Zoals je ziet heeft `uv` heel veel verschillende commando's. uv is een Zwitsers zakmes: het bevat heel veel tools voor wie dat nodig heeft. Jij hebt voor nu lang niet alles nodig, dus laat je niet uit het veld slaan door deze lange lijst. In de rest van dit hoofdstuk vertellen we je precies wat je _wel_ nodig hebt. Als je meer wilt weten kun je het beste de [documentatie](https://docs.astral.sh/uv/) lezen.


## Nieuw uv project
!!! info
    Je gaat werken met modules en packages. Ben je daar nog niet zo bekend mee, zorg dan dat je [paragraaf _Modules_](vervolg-python.md#modules) en [paragraaf _Packages_](vervolg-python.md#packages) gemaakt hebt.

Stel je wilt een package schrijven met wat handige functies om veelgebruikte statistische berekeningen makkelijk uit te voeren. Je noemt het package `easystat`. Het doel is eerst om het in al je eigen analyses makkelijk te kunnen gebruiken (`#!py import easystat`), maar je wilt het ook op GitHub zetten en wie weet vinden anderen het ook handig! Je wilt het dus ook _netjes_ doen. En niet later van anderen horen: <q>leuk, maar bij mij werkt het niet!</q>

!!! opdracht-basis "Easystat: uv project aanmaken"
    === "opdracht"
        1. Open Github Desktop en ga naar **Menu > File**. Kies hier voor `New repository ...`. Geef de repository de naam `easystat` en zet de repository in de map {{folder}}`ECPC`. Vink `Initialize this repository with a README` aan en kies bij `Git ignore` voor Python.
        2. Open de repository {{github}} `easystat` in Visual Studio Code (**Menu > Repository > Open in Visual Studio Code**).
        3. Open een terminal in je Visual Studio Code-omgeving (**Menu > Terminal > New Terminal**). Maak het uv project aan met:
        ``` ps1con title="Terminal"
        uv init --package
        ```
        4. Je bekijkt de nieuw gemaakte mappenstructuur en ziet dat het overeenkomt met de mappenstructuur zoals hieronder weergegeven:

            {{folder}} `ECPC`  
            {{T}} {{github}} `oefenopdrachten`  
            {{T}} {{github}} `pythondaq`  
            {{T}} {{github}} `easystat`  
            {{tab}} {{T}} {{new_folder}} `src`  
            {{tab}} {{tab}} {{L}} {{new_folder}} `easystat`  
            {{tab}} {{tab}} {{tab}} {{L}} {{new_file}} `__init__.py`  
            {{tab}} {{T}} {{new_file_lines}} `.gitattributes`  
            {{tab}} {{T}} {{new_file_lines}} `.gitignore`  
            {{tab}} {{T}} {{new_file_lines}} `.python-version`  
            {{tab}} {{T}} {{new_file_lines}} `pyproject.toml`  
            {{tab}} {{L}} {{new_file_lines}} `README.md`  
            {{L}} {{folder}} {{dots}}  
        5. Commit in GitHub Desktop de wijzigingen die `uv init` heeft gedaan.

        !!! info "src-layout"
            Door het project in een source layout (src-layout) te bouwen &mdash; `easystat` zit in een map `src` &mdash; staat al je Pythoncode netjes bij elkaar weggestopt. Dit maakt het makkelijker om te testen of het installeren goed werkt, zodat je zeker weet dat andere mensen met jouw code aan de slag kunnen.

    === "code"
        **Testcode**
        <pre><code>(ECPC) > uv init --package <button type="button" name="uv init --package" onclick="runScript('uv init --package')">{{ enter }}</button><button type="button" name="uv init --package" onclick="runScript('uv init --package')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="uv init --package">Initialized project \`easystat\`</span>
        </code></pre>
        
    === "check"
        **Checkpunten**
    
        - [ ] De _projectmap_ {{folder}}`easystat` staat in de map {{folder}}`ECPC`.
        - [ ] In de _projectmap_ {{folder}}`easystat` staat een map {{folder}}`src`.
        - [ ] In de map {{folder}}`src` staat een _package map_ {{folder}}`easystat`

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [ ] Easystat: virtual environment synchroniseren
        - [ ] Easystat: benodigde scripts aanmaken
        - [ ] Easystat: testen
        - [ ] Easystat: dependency toevoegen
        - [ ] Easystat: opnieuw testen 
        - [ ] Easystat: imports aanpassen
        - [ ] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

Laten we één voor één kijken welke mappen en bestanden uv heeft aangemaakt. Je had al een {{file_lines}}`README.md` in de projectmap staan. Hierin komt een algemene beschrijving van het project.[^README]

[^README]: Wanneer de repository op GitHub wordt geplaatst, wordt deze README automatisch op de hoofdpagina van de repository getoond, onder de code.

Dan komt de {{folder}}`src`-map. Daarin komt het nieuwe package {{folder}}`easystat`[^projectmap] te staan. Er is alvast een {{file}}`__init__.py` aangemaakt. Handig! De bestanden {{file}}`.gitattributes` en {{file}}`.gitignore` bewaren wat instellingen voor Git. En {{file}}`.python-version` bewaart het versienummer van Python dat uv gebruikt. Vul je daar 3.12 in? Dan installeert uv Python 3.12 in je virtual environment.

[^projectmap]: Ja, er is een map {{folder}}`easystat` met daarin een map {{folder}}`src` met daarin weer een map {{folder}}`easystat` &mdash; dat kan nog wel eens verwarrend zijn. Het is conventie om de projectmap dezelfde naam te geven als je package. Het pad is dus eigenlijk {{folder}}`project/src/package` en dat wordt dan, in dit geval, {{folder}}`easystat/src/easystat`.

En als laatste&hellip; een {{file_lines}}`pyproject.toml`[^setup.py] waarin alle informatie over je project wordt bijgehouden. Ook staat er in dit bestand informatie over de verschillende tools die je kunt gebruiken. De inhoud van het bestand ziet er ongeveer zo uit:
``` toml
[project]
name = "easystat"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
authors = [
    { name = "David Fokkema", email = "davidfokkema@icloud.com" }
]
requires-python = ">=3.13"
dependencies = []

[project.scripts]
easystat = "easystat:main"

[build-system]
requires = ["uv_build>=0.8.4,<0.9.0"]
build-backend = "uv_build"
```

[^setup.py]: Vroeger was er een `setup.py`, maar Python schakelt nu langzaam over naar dit nieuwe bestand.

Het bestand is in het TOML-formaat.[@TOML] Tussen de vierkante haken staan de koppen van de verschillende secties in dit configuratiebestand. In de eerste sectie staat informatie over het project. Je kunt daar bijvoorbeeld een beschrijving toevoegen of het versienummer aanpassen. Ook bevat die sectie de _dependencies_. Dit zijn alle Pythonpackages die het project nodig heeft. Op dit moment is dat nog niets. Ook het versienummer van Python is belangrijk. Hier is dat groter of gelijk aan 3.13. Dit kan belangrijk zijn. Gebruikers met een iets oudere versie van Python &mdash; bijvoorbeeld versie 3.11 &mdash; kunnen nu de package niet installeren. Als je niet per se de nieuwste snufjes van Python 3.13 nodig hebt, kun je aangeven dat een iets oudere versie van Python ook prima is. Op moment van schrijven &mdash; zomer 2025 &mdash; is Python 3.13 de nieuwste versie. Het is dus prima om minimaal 3.12 te vragen &mdash; deze versie is inmiddels bijna twee jaar oud.

!!! info "Pythonversie in het project"

    Het is _heel handig_ om, als je `#!toml requires-python = ">=3.12"` invult, ofwel 'minstens 3.12', dat je dan in {{file}}`.python-version` _ook_ 3.12 invult. Omdat je anders niet zeker weet of je code ook echt werkt met 3.12 (omdat jijzelf dan bijvoorbeeld met 3.13 werkt en je de code dus nooit getest hebt met 3.12).

De sectie `[project.scripts]` zorgt ervoor dat je het script kunt aanroepen door `easystat` in de terminal in te typen. De sectie `[build-system]` zorgt ervoor dat je een package kunt maken en uploaden naar de Python Package Index (PyPI). De sectie `[build-system]` is voor nu nog niet belangrijk.

!!! opdracht-basis "Easystat: virtual environment synchroniseren"
    === "opdracht"
        1. Hoewel we hierboven beweerden dat je `easystat` kunt intypen in de terminal en dat er dan een script draait, werkt dat hier (nog) niet. Probeer maar eens! Het werkt ook niet als je een nieuwe terminal opent. En... er staat niets tussen haakjes aan het begin van de opdrachtprompt. Blijkbaar is er nog geen virtual environment actief.
        2. Open het bestand {{file}}`src/eaystat/__init__.py`. Rechtsonderin zie je inderdaad {{warning}}`Select Interpreter`. Als je daar op klikt, zie je alleen niet `Python 3.x.x (easystat)` in het rijtje staan... Druk op ++escape++ om het menu te verlaten.
        3. Type in de terminal van Visual Studio Code: 
        <pre><code>> uv sync <button type="button" name="uv_sync" onclick="runScript('uv_sync')">{{ enter }}</button><button type="button" name="uv_sync" onclick="runScript('uv_sync')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="uv_sync">Using CPython 3.13.5
        Creating virtual environment at: .venv
        Resolved 1 package in 5ms
        Installed 1 package in 47ms
        &nbsp;+ easystat==0.1.0 (from file:///C:/Users/David/Documents/ECPC/easystat)</span></code></pre>
        Wat dit gedaan heeft is het automatisch aanmaken van het virtual environment op basis van je projectinstellingen. Dus de Pythonversie die in {{file}}`.python-version` staat en eventuele dependencies die gedefinieerd zijn in je {{file_lines}}`pyproject.toml`.
        4. Kies de nieuwe virtual environment.
        5. Open een _nieuwe_ terminal en type `easystat`. Als het goed is werkt het nu wél!
        6. Commit in GitHub Desktop de wijzigingen die `uv sync` heeft gedaan (een `uv.lock` file, zie [later](#opd:uv.lock)).

    === "check"
        **Checkpunten**
    
        - [ ] In Visual Studio Code staat rechtsonderin je Python environment geselecteerd (3.12.x (easystat)).
        - [ ] In de terminal staat (easystat) vooraan de opdrachtprompt.
        - [ ] Het commando `easystat` runt zonder problemen.

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [ ] Easystat: benodigde scripts aanmaken
        - [ ] Easystat: testen
        - [ ] Easystat: dependency toevoegen
        - [ ] Easystat: opnieuw testen 
        - [ ] Easystat: imports aanpassen
        - [ ] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

### Maken van de package
Nu ga je starten met de package. Je gaat een aantal keer de foutmelding `#!py ModuleNotFoundError` tegenkomen, maar dit los je stap voor stap ook weer op. Stel, je berekent vaak de standaarddeviatie van het gemiddelde en je maakt daarvoor een handige <q>shortcut</q> in {{file}}`shortcuts.py`. Nu wil je deze shortcut ook in een ander script, {{file}}`measurements.py`, gebruiken, die op basis van een aantal metingen het gemiddelde mét een onzekerheid geeft. Dit kun je doen door de oorspronkelijke module te importeren in het nieuwe script, zodat je de functie `stdev_of_mean` ook daar kunt gebruiken. Je maakt een script {{file}}`try_measurements.py` om dit allemaal te testen, en dit script zet je expres niet _in_ het package, maar in een nieuwe map {{folder}}`tests`. Het testscript hoort immers niet bij de code van de `easystat` package.

!!! opdracht-basis "Easystat: benodigde scripts aanmaken"
    === "opdracht"
        Maak de bestanden {{new_file}}`shortcuts.py`, {{new_file}}`measurements.py` en {{new_file}}`try_measurements.py` aan. Kopieer onderstaande code in de betreffende bestanden. In welke map moet elk bestand staan? Je moet in ieder geval nog één map zelf aanmaken.
       
        <div class="grid-tree" markdown>
            <div>
            ``` py title="shortcuts.py"
            """Easy shortcut functions for statistical calculations.

            Currently only provides the `stdev_of_mean()` function which calculates the
            standard deviation of the mean.
            """

            import numpy as np 
            
            
            def stdev_of_mean(values):
                """Calculate the standard deviation of the mean"""
                return np.std(values) / np.sqrt(len(values))    
            ```
            ``` py title="measurements.py"
            """Statistical functions related to measurements."""

            import numpy as np
            from shortcuts import stdev_of_mean


            def result_with_uncertainty(values):
                """Return result with uncertainty from list of measurements."""
                return np.mean(values), stdev_of_mean(values)

            ```
            ``` py title="try_measurements.py"
            """Test the easystat package."""

            from measurements import result_with_uncertainty


            measurements = [1, 2, 2, 2, 3]
            result, uncertainty = result_with_uncertainty(measurements)

            print(f"{measurements=}")
            print(f"Result of measurements is: {result:.2f} +- {uncertainty:.2f}.")
            ```
            </div>
            <div>
            {{github}} `easystat`  
            {{T}} {{folder}} `src`  
            {{tab}} {{T}} {{folder}} `easystat`  
            {{tab}} {{tab}} {{T}} {{file}} `__init__.py`  
            {{tab}} {{tab}} {{T}} {{new_file}} `measurements.py`  
            {{tab}} {{tab}} {{L}} {{new_file}} `shortcuts.py`  
            {{T}} {{new_folder}} `tests`  
            {{tab}} {{L}} {{new_file}} `try_measurements.py`  
            {{T}} {{file_lines}} `pyproject.toml`  
            {{L}} {{file_lines}} `readme.md`  
            </div>
        </div>

        !!! info "`Import numpy could not be resolved`"
            Misschien valt het je op dat Visual Studio Code een oranje kringeltje onder `#!py numpy` zet in de eerste regels van twee scripts. En dit gebeurt ook onder `shortcuts` en `measurements`. Als je hier je muiscursor op plaatst, krijg je een popup met de melding `Import numpy could not be resolved`. Daar moet je misschien wat mee... In de volgende opdrachten ga je deze problemen één voor één oplossen.

    === "check"
        **Checkpunten**
    
        - [ ] De map {{folder}}`easystat/src/easystat` bevat het bestand {{new_file}}`measurements.py`.
        - [ ] De map {{folder}}`easystat/src/easystat` bevat het bestand {{new_file}}`shortcuts.py`.
        - [ ] In de _projectmap_ {{folder}}`easystat` staat een map {{new_folder}}`tests`.
        - [ ] De map {{folder}}`easystat/tests` bevat het bestand {{new_file}}`try_measurements.py`.

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [ ] Easystat: testen
        - [ ] Easystat: dependency toevoegen
        - [ ] Easystat: opnieuw testen 
        - [ ] Easystat: imports aanpassen
        - [ ] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

In de eerste regel van {{file}}`try_measurements.py` importeer je de functie uit het nieuwe package om deze uit te proberen. In de eerste `#!py print`-regel gebruik je een handige functie van f-strings.[^f-string-=]

[^f-string-=]: In f-strings kunnen tussen de accolades variabelen of functieaanroepen staan. Voeg daar het `=`-teken aan toe en je krijgt niet alleen de _waarde_, maar ook de variabele of aanroep zelf te zien. Bijvoorbeeld: als je definieert `#!py name = "Alice"`, dan geeft `#!py print(f"{name}")` als uitkomst `#!py Alice`. Maar voeg je het `=`-teken toe, zoals in `#!py print(f"{name=")}`, dan wordt de uitvoer `#!py name='Alice'`. Je ziet dan dus ook meteen de naam van de variabele en dat kan handig zijn.

!!! opdracht-basis "Easystat: testen"
    === "opdracht"
        Je bent heel benieuwd of je package al werkt. Je runt als eerste het bestand {{file}}`shortcuts.py` en... je krijgt een foutmelding.
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="shortcuts_error" onclick="runScript('shortcuts_error')" class="run">{{ run }}</button><button type="button" name="shortcuts_error" onclick="runScript('shortcuts_error')" class="reload invisible">{{ reload }}</button> shortcuts.py
        ``` py
        import numpy as np


        def stdev_of_mean(values):
            """Calculate the standard deviation of the mean"""
            return np.std(values) / np.sqrt(len(values))
        ```
        <pre>
        <code>(easystat) > python .\src\easystat\shortcuts.py
        <span class="invisible" name="shortcuts_error">Traceback (most recent call last):
        File "C:\Users\David\Documents\ECPC\easystat\src\easystat\shortcuts.py", line 1, in <module>
            import numpy as np
        ModuleNotFoundError: No module named 'numpy'
        </code></pre></div>
        
    === "check"
        **Checkpunten**
    
        - [ ] Je hebt de juiste virtual environment geactiveerd.
        - [ ] Je krijgt een foutmelding `ModuleNotFoundError: No module named 'numpy'` als je het bestand {{file}}`shortcuts.py` runt.
        
        **Projecttraject**

        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [ ] Easystat: dependency toevoegen
        - [ ] Easystat: opnieuw testen 
        - [ ] Easystat: imports aanpassen
        - [ ] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal
    
De beloofde `#!py ModuleNotFoundError`! Het package heeft `numpy` nodig en dat heb je nog niet geïnstalleerd in de virtual environment. Dat is ook de reden voor de kringeltjes onder `#!py numpy` in het bestand `shortcuts.py`. Het installeren van `#!py numpy` kun je handmatig doen, maar dan hebben straks andere gebruikers een probleem. Veel beter is het om netjes aan te geven dat het package `numpy` nodig heeft &mdash; als _dependency_.


### Dependencies toevoegen

Om een dependency aan te geven vertel je uv dat hij deze moet toevoegen met:
<pre><code>(easystat) > uv add numpy <button type="button" name="uv add numpy" onclick="runScript('uv add numpy')">{{ enter }}</button><button type="button" name="uv add numpy" onclick="runScript('uv add numpy')" class="invisible">{{ reload }}</button>
<span class="invisible" name="uv add numpy">Resolved 2 packages in 453ms
      Built easystat @ file:///C:/Users/David/Documents/ECPC/easystat
Prepared 1 package in 82ms
Uninstalled 1 package in 9ms
Installed 2 packages in 798ms
 ~ easystat==0.1.0 (from file:///C:/Users/David/Documents/ECPC/easystat)
 + numpy==2.3.2</span>
</code></pre>

!!! opdracht-basis "Easystat: dependency toevoegen"
    === "opdracht"
        Je voegt `numpy` als dependency toe aan het project `easystat` met het commando `uv add numpy`. Je kijkt in de {{file_lines}}`pyproject.toml` en warempel daar staat `numpy` nu bij de dependencies! Je vraagt je af of `numpy` nu ook in het virtual environment `easystat` is geïnstalleerd en controleert dit met `uv pip list`. En waarachtig `numpy` staat in de lijst {{feesttoeter}}. Weer ga je {{file}}`shortcuts.py` draaien en ditmaal krijg geen foutmelding! Commit de wijzigingen.
    === "check"
        **Checkpunten**
    
        - [ ] Je hebt de juiste virtual environment geacitveerd.
        - [ ] Je hebt `numpy` als dependency toegevoegd.
        - [ ] Je krijgt geen foutmelding meer als je het bestand {{file}}`shortcuts.py` runt.

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [ ] Easystat: opnieuw testen 
        - [ ] Easystat: imports aanpassen
        - [ ] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

Fijn! uv heeft `numpy` nu toegevoegd aan de virtual environment `easystat`. Gewone package managers als Pip en Conda zullen geen packages toevoegen aan je uv project als je `pip/conda install PACKAGE` aanroept. Gebruik daarom altijd `uv add PACKAGE` als je met uv aan een project werkt. Sterker nog, als je met Pip handmatig packages extra installeert zal `uv sync` deze packages als overbodig herkennen en ze prompt weer verwijderen. Heb je iets verkeerds toegevoegd? Het verwijderen van een dependency gaat met `uv remove PACKAGE`.

!!! info
    Als je de code in het package aanpast, dan hoef je het virtual environment niet opnieuw te synchroniseren met `uv sync`. Maar als je met de hand iets wijzigt in de {{file_lines}}`pyproject.toml`, dan moet dat _wel_. Als je een `#!py ImportError` of `#!py ModuleNotFoundError` krijgt voor je eigen package &mdash; bijvoorbeeld als je nieuwe mappen of bestanden hebt aangemaakt &mdash; probeer dan _eerst_ voor de zekerheid `uv sync`.

<div id="opd:uv.lock"></div>
???+ meer-leren "uv.lock"

    ### uv.lock

    Na het toevoegen van NumPy is er ook een grote wijziging in het bestand {{file_lines}}`uv.lock` bijgekomen. In dit bestand staan de exacte versies van alle geïnstalleerde packages. Vaak wordt dit bestand gecommit zodat collega-ontwikkelaars van hetzelfde project exact dezelfde versies installeren zodra ze `uv sync` aanroepen. Ook als er nieuwere versies van NumPy bijkomen, blijven alle ontwikkelaars precies dezelfde NumPy-versie gebruiken totdat {{file_lines}}`uv.lock` geüpdatet wordt. Niets is zo vervelend als "oh, bij mij werkt het wel". Dus hoe meer dingen precies hetzelfde zijn, hoe minder problemen je tegenkomt. Updaten naar nieuwere versies kan natuurlijk wel, maar alleen op het moment dat je er klaar voor bent om te testen of dan alles nog netjes werkt.

    !!! opdracht-meer "Upgrade `uv.lock`"

        1. Clone de repository {{github}}[`NatuurkundePracticumAmsterdam/upgrade-uv-lock`](https://github.com/NatuurkundePracticumAmsterdam/upgrade-uv-lock).
        2. Open de repository in Visual Studio Code en open een nieuwe terminal.
        3. Maak in één keer een virtual environment aan  en installeer de dependencies met `uv sync`.
        4. Waarvoor gebruikt uv de lockfile ({{file_lines}}`uv.lock)`? Welke versies van NumPy en matplotlib worden geïnstalleerd?
        5. Sinds het maken van de repository zijn er nieuwere versies van NumPy en matplotlib uitgekomen. Die worden nu nog niet geïnstalleerd, hoewel er in {{file_lines}}`pyproject.toml` staat: `dependencies = ["matplotlib>=3.10.3", "numpy>=2.2.6"]` (het mag dus wel!). Controleer dat in {{file_lines}}`pyproject.toml`.
        6. Nu wil je toch de nieuwe versies hebben. Je kunt de lockfile updaten met `uv lock --upgrade`. De nieuwere versies worden genoemd en verwerkt in de lockfile. Controleer in GitHub Desktop dat {{file_lines}}`uv.lock` gewijzigd is.
        7. Update je virtual environment met `uv sync` en controleer dat de nieuwere versies inderdaad geïnstalleerd worden.

    !!! tip "Upgrade dependencies"

        De stappen `uv lock --upgrade` en `uv sync` kunnen in één keer uitgevoerd worden met `uv sync --upgrade`. Grote kans dat je die vaker zult gebruiken.


### Absolute imports

Je hebt nu een uv project en dependencies toegevoegd, maar je hebt nog niet alle code getest. Dat ga je nu doen!

<div id="opd:easystat-package-testen"></div>
!!! opdracht-basis "Easystat: opnieuw testen"
    === "opdracht"
        Je probeert nog een keer het bestand {{file}}`shortcuts.py` te runnen en ziet dat dat gewoon werkt. Daarna probeer je het bestand {{file}}`measurements.py` te runnen. Dat werkt ook. Maar wel gek dat er kringeltjes onder `#!py from shortcuts import stdev_of_mean` staan, hij doet het toch gewoon? Je kijkt even welke waarschuwing gegeven wordt door je muiscursor op de kringeltjes te plaatsen. Daarna probeer je het bestand {{file}}`try_measurements.py`. Hier gaan dingen mis: daarom zette Visual Studio Code kringeltjes onder `measurements` (en onder `shortcuts` vanwege een vergelijkbare reden).
    === "code"
        **Testcode**
        <pre><code>(easystat) > python tests/try_measurements.py <button type="button" name="try_measurements" onclick="runScript('try_measurements')">{{ enter }}</button><button type="button" name="try_measurements" onclick="runScript('try_measurements')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="try_measurements">Traceback (most recent call last):
        File "c:\Users\David\Documents\ECPC\easystat\tests\try_measurements.py", line 1, in <module>
            from measurements import result_with_uncertainty
        ModuleNotFoundError: No module named 'measurements'</span>
        </code></pre>

    === "check"
        **Checkpunten**

        - [ ] Je kunt zonder problemen het bestand {{file}}`shortcuts.py` runnen.
        - [ ] Je kunt het bestand {{file}}`measurements.py` runnen.
        - [ ] Je krijgt de foutmelding `#!py ModuleNotFoundError` als je het bestand {{file}}`try_measurements.py` runt.
        
        **Projecttraject**

        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen     
        - [ ] Easystat: imports aanpassen
        - [ ] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

Je wilt dus de module `measurements` importeren, maar Python kan deze module niet vinden. Dat is ook wel een klein beetje logisch, want {{file}}`try_measurements.py` staat in de map {{folder}}`tests` terwijl {{file}}`measurements.py` in de map {{folder}}`src/easystat` staat. Je moet Python daarom vertellen wáár hij die module kan vinden, namelijk in jouw nieuwe package `easystat`. Doordat je een package gemaakt hebt, hoef je niet precies te vertellen in welke _map_ alles te vinden is, je gebruikt alleen de naam van het package. Dus _niet_ `map.op.computer.easystat.src.easystat`, maar gewoon `easystat`. Wel zo makkelijk.

!!! opdracht-basis "Easystat: imports aanpassen"
    === "opdracht"
        Je past `#!py from measurements ...` aan naar `#!py from easystat.measurements ...`. Je test de code opnieuw. Verdorie, weer een error. Overleg met je buurmens wat deze error betekent. Waarom kreeg je die error niet toen je het bestand {{file}}`measurements.py` testte?
    === "code"
        **Testcode**
        <pre><code>(easystat) > python tests/try_measurements.py <button type="button" name="try_measurements2" onclick="runScript('try_measurements2')">{{ enter }}</button><button type="button" name="try_measurements2" onclick="runScript('try_measurements2')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="try_measurements2">Traceback (most recent call last):
        File "c:\Users\David\Documents\ECPC\easystat\tests\try_measurements.py", line 1, in <module>
            from easystat.measurements import result_with_uncertainty
        File "C:\Users\David\Documents\ECPC\easystat\src\easystat\measurements.py", line 2, in <module>
            from shortcuts import stdev_of_mean
        ModuleNotFoundError: No module named 'shortcuts'</span>
        </code></pre>

    === "check" 
        **Checkpunten**

        - [ ] Je kunt nog steeds zonder problemen het bestand {{file}}`shortcuts.py` runnen.
        - [ ] Je kunt ook nog steeds het bestand {{file}}`measurements.py` runnen.
        - [ ] Bij het runnen van het bestand {{file}}`try_measurements.py` krijg je geen foutmelding meer voor de module `measurements`. 
        - [ ] Bij het runnen van het bestand {{file}}`try_measurements.py` krijg je wel een nieuwe foutmelding.
        
        **Projecttraject**

        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen
        - [x] Easystat: imports aanpassen
        - [ ] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

Het probleem is dat wanneer je met Python een script runt en je importeert iets, dat Python eerst in de map kijkt waar het script staat (in dit geval {{folder}}`tests`) en daarna pas zoekt in de lijst met geïnstalleerde packages. De module `shortcuts` staat _niet_ in {{folder}}`tests`. Toen je {{file}}`measurements.py` draaide kon Python de module `shortcuts` wél vinden, want {{file}}`measurements.py` en {{file}}`shortcuts.py` staan in _dezelfde_ map. Dus afhankelijk van welk script je draait kan Python de modules soms wel vinden en soms niet. Dat is natuurlijk niet zo handig. De oplossing: _absolute imports_. Geef bij alle imports van je eigen package _altijd_ de _naam_ van je package op.

!!! opdracht-basis "Easystat: absolute imports"
    === "opdracht"
        Je past in het bestand {{file}}`measurements.py` de regel `#!py from shortcuts ...` aan door de naam van het package toe te voegen en ziet dat de oranje kringeltjes ook verdwijnen. Je test de code in {{file}}`try_measurements.py` opnieuw. Gelukt! {{feesttoeter}}
    === "code"
        **Testcode**
        <pre><code>(easystat) > python tests/try_measurements.py <button type="button" name="try_measurements3" onclick="runScript('try_measurements3')">{{ enter }}</button><button type="button" name="try_measurements3" onclick="runScript('try_measurements3')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="try_measurements3">measurements=[1, 2, 2, 2, 3]
        Result of measurements is: 2.00 +- 0.28.</span>
        </code></pre>
    === "check"
        **Checkpunten**
    
        - [ ] Je hebt de import in het bestand {{file}}`try_measurements.py` aangepast.
        - [ ] Je hebt de import in het bestand {{file}}`measurements.py` aangepast.
        - [ ] Je krijgt geen foutmelding meer als je het bestand {{file}}`try_measurements.py` runt.

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen
        - [x] Easystat: imports aanpassen
        - [x] Easystat: absolute imports
        - [ ] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

<div id="info:wheels"></div>
???+ meer-leren "Wheels"

    ### Wheels

    Wanneer je klaar bent om jouw package te delen met andere gebruikers gebruik je het commando `build` om zogeheten _wheels_ te bouwen. Wheels zijn de bestanden die uv en pip downloaden en installeren wanneer je zegt `pip install PACKAGE`. Het is een soort ingepakte installer met alles wat er nodig is om het package te gebruiken.

    !!! opdracht-meer "Easystat: wheel"
        === "opdracht"
            1. Bouw het wheel van `easystat` met `uv build`.
            2. Bekijk de namen van de bestanden in de nieuwe map {{folder}}`easystat/dist`. Welke extensie hebben ze?
   
        === "code" 
            
            <pre><code>(easystat) > uv build <button type="button" name="uv build" onclick="runScript('uv build')">{{ enter }}</button><button type="button" name="uv build" onclick="runScript('uv build')" class="invisible">{{ reload }}</button>
            <span class="invisible" name="uv build">Building source distribution (uv build backend)...
            Building wheel from source distribution (uv build backend)...
            Successfully built dist\easystat-0.1.0.tar.gz
            Successfully built dist\easystat-0.1.0-py3-none-any.whl</span>
            </code></pre>
    
    Een `.tar.gz`-bestand is een soort zipbestand met daarin de broncode van het package (een _source distribution_). De tests worden daar niet in meegenomen. Zogenaamde _pure-python_ wheels bevatten alleen Pythoncode &mdash; en geen C-code die gecompileerd moet worden voor verschillende besturingssystemen of hardwareplatforms. Je herkent ze aan `none-any` in de bestandsnaam. <q>None</q> voor <q>niet-OS-specifiek</q> en <q>any</q> voor <q>draait op elk hardwareplatform</q>. Je kunt dit bestand als download neerzetten op een website of aan anderen mailen. Zij kunnen het dan installeren met `pip install`.

    !!! opdracht-meer "Easystat: test wheel"
        Tijd om het wheel uit te proberen. Je gaat straks een nieuw virtual environment aanmaken, installeert het wheel en probeert het testscript te runnen &mdash; één keer vóór het installeren van het wheel en één keer ná het installeren. Volg hiervoor de volgende stappen:

        1. Maak een nieuw &mdash; leeg &mdash; virtual environment aan.
        2. Run het bestand {{file}}`test/try_measurements.py` en bekijk de foutmelding.
        3. Installeer het wheel met `uv pip install .\dist\easystat-0.1.0-py3-none-any.whl`.
        4. Run het bestand {{file}}`test/try_measurements.py` opnieuw en bekijk de uitkomst.
        
    Het werkt! Je ziet dat `pip install` niet alleen jouw package `easystat` installeert, maar _ook de dependency_ `numpy`. Dat is precies wat je wilt.
    
    Het is belangrijk om de wheels _niet_ in je GitHub repository te committen. Je repository is voor _broncode_, waarmee wheels gebouwd kunnen worden. Als je de stappen voor het aanmaken van de repository netjes gevolgd hebt, dan heb je een {{file_lines}}`.gitignore` toegevoegd met Python-specifieke bestandsnamen en directories die genegeerd worden door Git en GitHub.


## uv gebruiken voor een bestaand project
Natuurlijk willen we uv ook gaan gebruiken bij `pythondaq`. Je maakt nu alleen geen _nieuw_ project, maar je gaat uv toevoegen aan een bestaand project. Daarvoor moet je twee dingen doen: als eerste ga je uv initialiseren in de repository {{github}}`pythondaq` en daarna moet je de code in de `src`-structuur plaatsen.

!!! opdracht-inlever "Pythondaq: uv project"
    === "opdracht"
        1. Je project {{github}}`pythondaq` is zo tof aan het worden dat je het met uv gaat beheren, zodat jij en anderen het gemakkelijk kunnen installeren en gebruiken. Als eerste open je de repository in GitHub Desktop en daarna in Visual Studio Code. Open nu een nieuwe terminal. Je test voor de zekerheid {{file}}`run_experiment.py` nog even uit, zodat je zeker weet dat alles nu nog werkt. Vervolgens maak je een uv project aan {{lightbulb}}. Dan geef je op _twee plaatsen_ aan dat je Python 3.12 wilt gebruiken (in welke bestanden moet je dit aangeven?). Daarna synchroniseer je je virtual environment {{lightbulb}} en commit je je wijzigingen.
        2. Test nu {{file}}`run_experiment.py` opnieuw. Voeg alle benodigde dependencies toe {{lightbulb}}, net zolang totdat alles werkt en je opnieuw de LED ziet branden en de resultaten van je experiment krijgt. Commit je wijzigingen.
    === "check"
        **Checkpunten**
    
        - [ ] Je hebt uv geïnitialiseerd in de projectmap `pythondaq`.
        - [ ] Na het initialiseren van uv zijn de bestanden {{file_lines}}`pyproject.toml` en {{file_lines}}`.python-version` in de projectmap aangemaakt.
        - [ ] Wanneer je met `uv sync` een nieuw virtual environment aanmaakt, staat hier Python 3.12 in. 
        - [ ] Je hebt alle dependencies toegevoegd, zodat {{file}}`run_experiment.py` in de nieuwe environment naar behoren werkt. 

        **Projecttraject**
    
        - [x] Pythondaq: docstrings
        - [x] Pythondaq: uv project
        - [ ] Pythondaq: src-layout
        - [ ] Pythondaq: test imports
        - [ ] Pythondaq: applicatie

!!! opdracht-inlever "Pythondaq: src-layout"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Nu de code weer werkt, ga je de bestanden in een src-layout zetten, zie de weergegeven structuur voor het voorbeeld. Je test {{file}}`run_experiment.py` opnieuw en je zorgt er voor dat je ook nu de LED ziet branden en de resultaten van je experiment krijgt.
            </div>
            <div>
            {{github}}`pythondaq`  
            {{T}}{{folder}}`src`  
            {{tab}}{{L}}{{folder}}`pythondaq`  
            {{tab}}{{tab}}{{T}}{{file}}`__init__.py`  
            {{tab}}{{tab}}{{T}}{{new_file}}`arduino_device.py`  
            {{tab}}{{tab}}{{T}}{{new_file}}`diode_experiment.py`  
            {{tab}}{{tab}}{{L}}{{new_file}}`run_experiment.py`  
            {{T}}{{file_lines}}`.gitattributes`  
            {{T}}{{file_lines}}`.gitignore`  
            {{T}}{{file_lines}}`.python-version`  
            {{T}}{{file_lines}}`pyproject.toml`  
            {{T}}{{file_lines}}`README.md`  
            {{L}}{{file_lines}}`uv.lock`  
            </div>
        </div>
    === "check"
        **Checkpunten**
    
        - [ ] Al je 'oude' code staat nu in {{folder}}`src/pythondaq`.
        - [ ] {{file}}`run_experiment.py` runt zonder problemen.


        **Projecttraject**
    
        - [x] Pythondaq: docstrings
        - [x] Pythondaq: uv project
        - [x] Pythondaq: src-layout
        - [ ] Pythondaq: test imports
        - [ ] Pythondaq: applicatie


???+ opdracht-meer "Model, view en controller packages"
    In grotere projecten is het gebruikelijk om model, view en controller niet alleen uit te splitsen in verschillende scripts, maar ook in aparte packages te zetten.

    1. Maak drie extra packages in de package {{folder}}`pythondaq` aan: {{folder}}`models`, {{folder}}`views` en {{folder}}`controllers`.
    2. Zet de modules in de juiste packages.
    3. Test je code zodat alle imports weer werken.


## Van script naar applicatie
Om code te testen heb je tot nu toe waarschijnlijk op de `run`-knop in Visual Studio Code gedrukt. Of je hebt in de terminal aan `python` gevraagd om het {{file}}`script.py` te runnen:
``` ps1con title="Terminal"
python script.py
```
Je moet dan wel in Visual Studio Code de juiste map geopend hebben zodat Python het bestand kan vinden. En als je de `run`-knop gebruikt, moet wel het bestand dat je wilt runnen openstaan. Kortom, best een beetje gedoe. Maar als je programma's zoals uv, Conda of Python wilt gebruiken hoef je helemaal niet het juiste bestand op te zoeken en te runnen. Je hoeft alleen maar een commando in de terminal te geven &mdash; bijvoorbeeld `python` of `uv` &mdash; en de computer start automatisch het juiste programma op.

Dat willen wij ook voor onze programma's! En met uv kun je dat heel eenvoudig doen. Voordat je doorgaat met jouw package `pythondaq` ga je dit eerst een keer testen. Je gaat daarvoor terug naar je {{github}}`easystat` repository.

Je kunt uv niet vragen om een script te runnen, maar wel om een functie in een module uit te voeren. Een nieuw uv project krijgt automatisch al een voorbeeldscript. 

!!! opdracht-basis "Easystat: voorbeeldscript bekijken"
    === "opdracht"
        Je opent je {{github}}`easystat` repository in Visual Studio Code. Je opent een terminal en voert de opdracht `easystat` uit. De code die nu gerund wordt staat in het bestand {{file}}`src/easystat/__init__.py`. Dit is overigens niet de beste plek, maar werkt prima als eenvoudig voorbeeld en is daarom automatisch aangemaakt door uv. Je bekijkt de code en ziet dat de bewuste code in een functie `#!py main()` staat.
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="uv voorbeeldscript" onclick="runScript('uv voorbeeldscript')" class="run">{{ run }}</button><button type="button" name="uv voorbeeldscript" onclick="runScript('uv voorbeeldscript')" class="reload invisible">{{ reload }}</button>
        <pre>
        <code>(easystat) > easystat
        <span class="invisible" name="uv voorbeeldscript">Hello from easystat!</span>
        </code></pre></div>      

    === "check"
        **Projecttraject**

        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen
        - [x] Easystat: imports aanpassen
        - [x] Easystat: absolute imports
        - [x] Easystat: voorbeeldscript bekijken
        - [ ] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

Als je wilt dat er andere code gerund wordt als de opdracht `easystat` gegeven wordt, dan moet je er voor zorgen dat je naar een functie in het betreffende bestand verwijst. Dit doe je net zoals dat gedaan is in het bestand {{file}}`src/easystat/__init__.py`.

!!! opdracht-basis "Easystat: functie `#!py main()` toevoegen"
    === "opdracht"
        Voor het vervolg heb je wat voorbeeldcode nodig. Dat kan van alles zijn dus je kopieert de code in het bestand {{file}}`tests/try_measurements.py` naar `src/easystat/app.py` en zet de <q>body</q> van de module in een functie `#!py main()`. Ook voeg je aan het eind toe:
        ``` py
        if __name__ == '__main__':
            main()
        ```
        Dit zorgt er voor dat als je het script direct runt de functie `#!py main()` wordt aangeroepen, terwijl als je code importeert dat niet direct gebeurt. Zie de [sectie _Modules_](http://127.0.0.1:8000/vervolg-python/#modules) voor meer informatie. Als je beide regels weglaat gebeurt er helemaal niets als je het script runt. Er wordt dan wel een functie gedefinieerd maar hij wordt niet uitgevoerd.
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="easystat_main function" onclick="runScript('easystat_main function')" class="run">{{ run }}</button><button type="button" name="easystat_main function" onclick="runScript('easystat_main function')" class="reload invisible">{{ reload }}</button> src/easystat/app.py
        <pre>
        <code>(easystat) > python src/easystat/app.py
        <span class="invisible" name="easystat_main function">measurements=[1, 2, 2, 2, 3]
        Result of measurements is: 2.00 +- 0.28.</span>
        </code></pre></div>
        
    === "check"
        **Checkpunten**
    
        - [ ] Er staat een functie `#!py main()` in het bestand {{file}}`app.py`.
        - [ ] In het bestand {{file}}`app.py` is een statement `#!py if __name__ == '__main__'` toegevoegd.
        - [ ] Het runnen van het bestand {{file}}`app.py` geeft als laatste regel `Result of measurements is: 2.00 +- 0.28.`

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen
        - [x] Easystat: imports aanpassen
        - [x] Easystat: absolute imports
        - [x] Easystat: voorbeeldscript bekijken
        - [x] Easystat: functie `main()` toevoegen
        - [ ] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal
    

In {{file_lines}}`pyproject.toml` kun je nu het commando toevoegen om een specifieke functie te runnen. In de sectie `[project.scripts]` kun je aangeven met welk commando een functie uit een module wordt uitgevoerd. In {{file_lines}}`pyproject.toml` staat deze sectie al:
``` toml
[project.scripts]
easystat = "easystat:main"
```
De vorm van die laatste regel is als volgt:
``` toml
naam_commando = "package.module:naam_functie"
```
Hier is `naam_commando` het commando dat je in moet typen in de terminal. `package` is de naam van het Python package waar de code staat en `module` is de naam van de module waar de code staat. `naam_functie` is de naam van de functie waarin de code staat. Als je `module` weglaat, dan kijkt uv in {{file}}`__init__.py`. Vandaar dat uv met het commando `easystat` op het moment de functie `#!py main()` in {{file}}`__init__.py` draait. Maar dit kun je natuurlijk aanpassen!

Om de wijzigingen aan {{file_lines}}`pyproject.toml` door te voeren, moet je je virtual environment wel opnieuw synchroniseren. uv installeert dan jouw package ook opnieuw.

!!! opdracht-basis "Easystat: commando toevoegen"
    === "opdracht"
        Je past in de {{file_lines}}`pyproject.toml` in de sectie `[project.scripts]` het commando `easystat` aan. Deze verwijst naar de functie `#!py main()` welke in de module {{file}}`app.py` staat, die ondergebracht is in de package {{folder}}`easystat`. Omdat je handmatig de {{file_lines}}`pyproject.toml` hebt aangepast, synchroniseer je je virtual environment opnieuw {{lightbulb}}.
    === "check"
        **Checkpunten**
    
        - [ ] De naam van het commando is `easystat`.
        - [ ] De verwijzing na het = teken begint met twee aanhalingstekens gevolgd door het package {{folder}}`easystat` gevolgd door een punt.
        - [ ] Na de punt staat de naam van de module {{file}}`app.py` zonder de extensie `.py` gevolgd door een dubbele punt.
        - [ ] Na de dubbele punt staat de naam van de functie `#!py main()` zonder haakjes `()`.
        - [ ] Achter de functie staan weer dubble aanhalingstekens om de verwijzing te sluiten. 
        - [ ] Na het opslaan van de {{file_lines}}`pyproject.toml` is de virtual environment gesynchroniseerd. 

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen
        - [x] Easystat: imports aanpassen
        - [x] Easystat: absolute imports
        - [x] Easystat: voorbeeldscript bekijken
        - [x] Easystat: functie `main()` toevoegen
        - [x] Easystat: commando toevoegen
        - [ ] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal


<div id="opd:uv_commando"></div>

!!! opdracht-basis "Easystat: commando testen"
    === "opdracht"
        Nu je het commando `easystat` hebt aangemaakt ga je deze testen in een terminal. Je ziet de verwachte uitvoer verschijnen, met als laatste regel `Result of measurements is: 2.00 +- 0.28.`
        <br><br>
        Je vraagt je af of het commando ook werkt als de terminal in een andere map zit. Met het commando `cd..` ga je naar een bovenliggende map. Je test het commando `easystat` en ziet weer de tekst `Result of measurements is: 2.00 +- 0.28.` verschijnen. Je concludeert dat het commando nu overal werkt zolang het juiste virtual environment is geactiveerd. Dat test je uit door het virtual environment te deactiveren {{lightbulb}} en het commando `easystat` nogmaal te proberen. Je krijgt een error en hebt daarmee je vermoeden bewezen. Tevreden ga je door naar de volgende opdracht. 
    === "code"
        **Pseudo-code**
        <pre><code>(easystat) > easystat <button type="button" name="easystat_test" onclick="runScript('easystat_test')">{{ enter }}</button><button type="button" name="easystat_test" onclick="runScript('easystat_test')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="easystat_test">measurements=[1, 2, 2, 2, 3]
        Result of measurements is: 2.00 +- 0.28.</span>
        </code></pre>
    === "check"
        **Checkpunten**
    
        - [ ] Het commando `easystat` werkt als het juiste virtual environment is geactiveerd.
        - [ ] Het commando `easystat` werkt nog steeds nadat je met het commando `cd..` naar een bovenliggende map bent gegaan.
        - [ ] Het commando `easystat` werkt niet als het virtual environment is gedeactiveerd.

        **Projecttraject**
    
        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen
        - [x] Easystat: imports aanpassen
        - [x] Easystat: absolute imports
        - [x] Easystat: voorbeeldscript bekijken
        - [x] Easystat: functie `main()` toevoegen
        - [x] Easystat: commando toevoegen
        - [x] Easystat: commando testen
        - [ ] Easystat: applicatie runnen in terminal

???+ opdracht-basis "Error analysis"
    Maak deze opdracht alleen als je extra wilt oefenen. Je gaat met uv een commando maken om een ander script uit te laten voeren. De package is al aangemaakt, maar werkt nog niet naar behoren. Los in de volgende opdrachten de errors op om het script {{file}}`data_analysis.py` te laten runnen met een commando.

    1. Ga naar GitHub en clone {{github}}[`NatuurkundepracticumAmsterdam/erroranalysis`](https://github.com/NatuurkundepracticumAmsterdam/erroranalysis) in GitHub Desktop en open de repository daarna in Visual Studio Code.
    2. Natuurlijk synchroniseer je meteen een virtual environment {{lightbulb}}, voordat je dit package gaat testen.
    3. Snuffel door de bestanden en mappen. Open {{file}}`src/erroranalysis/data_analysis.py`. Dit is het script wat moet kunnen runnen.
    4. Run het script {{file}}`data_analysis.py` en los de errors één voor één op.
    5. Om erachter te komen of de problemen die je eerder had écht zijn opgelost, maak je een nieuw &mdash; leeg(!) &mdash; virtual environment aan {{lightbulb}} en test je dat het script _niet werkt_. Daarna synchroniseer je het environment en run je het script opnieuw. Werkt alles? Mooi! 
    6. Dan ga je nu een commando aanmaken om de functie `#!py table()` aan te roepen. Open {{file_lines}}`pyproject.toml` en zoek de sectie `scripts`. Maak een commando die de functie `#!py table()` aanroept in {{file}}`src/erroranalysis/data_analysis.py`. Je mag de naam van het commando zelf kiezen. Het formaat voor een commando is:
            ``` toml
            [project.scripts]
            naam_commando = "package.module:naam_functie"
            ```
    7. Ga naar de terminal en kijk of het commando werkt. Als je onderstaande output krijgt, dan is het gelukt!
    <pre><code>(erroranalysis) > naam_commando <button type="button" name="naam_commando" onclick="runScript('naam_commando')">{{ enter }}</button><button type="button" name="naam_commando" onclick="runScript('naam_commando')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="naam_commando">Area of the kitchen table is: 1.8386 ± 0.0049 m</span>
    </code></pre>


!!! opdracht-inlever "Pythondaq: test imports"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Bij het uitbouwen van de applicatie ga je mogelijk onderdelen uit de Python-package importeren. Daarom is het verstandig om, net als in de [opdracht _Easystat: opnieuw testen_](#opd:easystat-package-testen), het importeren uit de package te testen.
            Maak daarvoor een {{folder}}`tests`-map met {{file}}`test_imports.py` in de repository {{github}}`pythondaq`. Voeg aan {{file}}`test_imports.py` onderstaande code toe:
            ```py title="test_imports.py"
            import pythondaq.run_experiment
            ```
            Run het bestand {{file}}`test_imports.py` en los de errors op. Nu werkt je package ook als je het aanroept van buiten de map met broncode. Je repository {{github}}`pythondaq` is nu een volledig project dat je met andere gebruikers van Python kunt delen, bijvoorbeeld via een [_wheel_](#info:wheels).
            </div>
            <div>
            {{github}}`pythondaq`  
            {{T}}{{folder}}`src`  
            {{tab}}{{L}}{{folder}}`pythondaq`  
            {{tab}}{{tab}}{{T}}{{file}}`__init__.py`  
            {{tab}}{{tab}}{{T}}{{file}}`arduino_device.py`  
            {{tab}}{{tab}}{{T}}{{file}}`diode_experiment.py`  
            {{tab}}{{tab}}{{L}}{{file}}`run_experiment.py`  
            {{T}}{{new_folder}}`tests`  
            {{tab}}{{L}}{{new_file}}`test_imports.py`  
            {{T}}{{file_lines}}`.python-version`  
            {{T}}{{file_lines}}`pyproject.toml`  
            {{T}}{{file_lines}}`README.md`  
            {{L}}{{file_lines}}`uv.lock`  
            </div>
        </div>
        
    === "code"
        **Pseudocode**
        ```py title="run_experiment.py"
        # define from which package the module diode_experiment should be imported
        ...

        ```
        **Testcode**
        <div class="code-box"><button type="button" name="test_imports_pythondaq" onclick="runScript('test_imports_pythondaq')" class="run">{{ run }}</button><button type="button" name="test_imports_pythondaq" onclick="runScript('test_imports_pythondaq')" class="reload invisible">{{ reload }}</button> test_imports.py
        ``` py
        import pythondaq.run_experiment
        ```
        <pre>
        <code>(ECPC) > python test_imports.py
        <span class="invisible" name="test_imports_pythondaq">Traceback (most recent call last):
        File "c:\Users\David\Documents\ECPC\pythondaq\tests\test_imports.py", line 1, in <module>
            import pythondaq.run_experiment
        File "C:\Users\David\Documents\ECPC\pythondaq\src\pythondaq\run_experiment.py", line 5, in <module>
            from diode_experiment import DiodeExperiment, list_resources
        ModuleNotFoundError: No module named 'diode_experiment'</span>
        </code></pre></div>
        
    === "check"
        **Checkpunten**
    
        - [ ] Er staat een map {{new_folder}}`tests` in de repository {{github}}`pythondaq`.
        - [ ] De import-statements in de modules in het package {{folder}}`pythondaq` zijn aangepast, zodat het bestand {{new_file}}`test_imports.py` runt zonder problemen.

        **Projecttraject**

        - [x] Pythondaq: docstrings
        - [x] Pythondaq: uv project
        - [x] Pythondaq: src-layout
        - [x] Pythondaq: test imports
        - [ ] Pythondaq: applicatie
    

!!! opdracht-basis "Easystat: applicatie runnen in terminal"
    === "opdracht"
        Inmiddels ben je misschien gewend dat je virtual environments altijd moet activeren voordat je applicaties kunt runnen die daarin geïnstalleerd zijn. In Visual Studio Code gaat dat automatisch als je het environment goed geselecteerd hebt. Maar... hoe moet dat zonder Visual Studio Code? Omdat uv virtual environments in je projectmap neerzet &mdash; de map {{folder}}`.venv` &mdash; moet je met je terminal wel in de goede map zitten. Daarna kun je ervoor kiezen om het commando te runnen met uv, dan is activeren van het virtual environment niet nodig, of zonder uv, dan is activeren van het virtual environment _wel_ nodig. Voer de volgende opdrachten uit om dit te proberen.

        1. Open in GitHub Desktop nogmaals je repository {{github}}`easystat`.
        2. Klik op **Menu > Repository > Open in Command Prompt** om een nieuwe terminal te openen, in je projectmap.
        3. Run het commando `easystat`. Dit werkt niet.
        4. Run het commando `uv run easystat`. Dit werkt _wel_.
        5. Activeer het environment door het volgende commando te runnen: `.venv\Scripts\activate`.
        6. Controleer dat `(easystat)` aan het begin van de opdrachtprompt staat.
        7. Run het commando `easystat`. Dit werkt nu _wel_.

        Je mag zelf kiezen welke methode je fijn vindt.

    === "check"
        **Projecttraject**

        - [x] Easystat: uv project aanmaken
        - [x] Easystat: virtual environment synchroniseren
        - [x] Easystat: benodigde scripts aanmaken
        - [x] Easystat: testen
        - [x] Easystat: dependency toevoegen
        - [x] Easystat: opnieuw testen
        - [x] Easystat: imports aanpassen
        - [x] Easystat: absolute imports
        - [x] Easystat: voorbeeldscript bekijken
        - [x] Easystat: functie `main()` toevoegen
        - [x] Easystat: commando toevoegen
        - [x] Easystat: commando testen
        - [x] Easystat: applicatie runnen in terminal

!!! opdracht-inlever "Pythondaq: applicatie"
    === "opdracht"
        Je maakt een commando om het script {{file}}`run_experiment.py` uit de repository {{github}}`pythondaq` te starten {{lightbulb}}. Wanneer je het commando aanroept gaat de LED branden en verschijnt er even later een $IU$-plot op het scherm. Je test of het commando ook buiten Visual Studio Code werkt door vanuit GitHub een nieuwe terminal te openen (**Menu > Repository > Open in Command Prompt**). Je test het commando met `uv run COMMAND` en ook door het juiste virtual environment te activeren {{lightbulb}}. Je ziet dat in beide gevallen het commando werkt. Wat een feest! {{feesttoeter}} Je hebt nu een applicatie geschreven die een Arduino aanstuurt om een LED te laten branden. En je kunt je applicatie gewoon vanuit de terminal aanroepen! {{feesttoeter}}
    === "code"
        **Pseudo-code**
        ``` py title="run_experiment.py"
        # import statements

        # def function
            # code to start a measurement
        ```
        ``` toml title="pyproject.toml"
        [project.scripts]
        naam_commando = "package.module:naam_functie"
        ```
    === "check"
        **Checkpunten**
    
        - [ ] De functie in {{file}}`run_experiment.py` bevat alle code die uitgevoerd moet worden om een meting te starten.
        - [ ] Het commando in de {{file_lines}}`pyproject.toml` verwijst op de correcte manier naar de functie in {{file}}`run_experiment.py`.
        - [ ] Het aanroepen van het commando zorgt ervoor dat een meting gestart wordt. 
        - [ ] Het commando werkt ook in een terminal buiten Visual Studio Code, zolang het juiste virtual environment actief is óf `uv run` wordt gebruikt.

        **Projecttraject**
    
        - [x] Pythondaq: docstrings
        - [x] Pythondaq: uv project
        - [x] Pythondaq: src-layout
        - [x] Pythondaq: test imports
        - [x] Pythondaq: applicatie

???+ meer-leren "Versie 2.0.0"
    In de {{file_lines}}`pyproject.toml` kan je ook de versie aangeven van je package. Maar wanneer hoog je nu welk cijfer op? Wanneer wordt iets _versie 2.0.0_? Daar zijn conventies voor. Bug fixes gaan op het laatste cijfer, wijzigingen en nieuwe features gaan op het middelste cijfer. Wanneer de applicatie dusdanig verandert dat bijvoorbeeld bestanden die je met de oude versie hebt gemaakt niet met de nieuwe versie geopend kunnen worden, dan verander je het eerste cijfer. Je start vaak met versie 0.1.0 en blijft tijdens het bouwen van je project ophogen naar 0.2.0 en soms zelfs 0.83.0. Wanneer je project min of meer klaar is voor het gebruik, dan kies je er vaak voor om versie 1.0.0 te releasen.