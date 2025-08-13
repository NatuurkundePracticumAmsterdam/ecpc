# Python projects met uv

In de vorige hoofdstukken heb je gewerkt met een eigen virtual environment zodat je jouw pythonomgeving mooi gescheiden kan houden van andere projecten waar je aan werkt. Dit is echt _de_ oplossing voor alle problemen waarbij volledige Pythoninstallaties onbruikbaar kunnen worden &mdash; waarna je alles opnieuw moet installeren. Dit kan gebeuren als je &mdash; vanwege al je verschillende projecten &mdash; zoveel packages installeert dat die met elkaar in conflict komen.

Voor ieder project nieuwe environments aanmaken heeft wel een nadeel: je moet alle packages die je nodig hebt opnieuw installeren. Welke waren dat ook alweer? Vast `numpy`, en `matplotlib`, en&hellip;? Niet handig. Als je code gaat delen met elkaar krijg je regelmatig te maken met een `#!py ImportError` of `#!py ModuleNotFoundError` omdat je niet precies weet wat er nodig is, waarna je _weer_ één of ander package moet installeren.

Nu pythondaq netjes is uitgesplitst in een MVC-structuur en de wijzigingen met Git worden bijgehouden, ga je er een package van maken zodat je het ook met anderen kan delen. Daarin staan alle benodigdheden duidelijk omschreven zodat gebruikers daar verder niet over hoeven na te denken.

Packages op PyPI (de standaardplek waar Python packages gepubliceerd worden) geven altijd hun _dependencies_ op. Dat zijn de packages die verder nog nodig zijn om alles te laten werken. Installeer je `matplotlib`, dan krijg je er `six, python-dateutil, pyparsing, pillow, numpy, kiwisolver, cycler` automatisch bij. Maar alleen de namen van packages zijn niet genoeg. Welke versies van `numpy` werken met de huidige versie van `matplotlib`? Allemaal zaken die je &mdash; als je een package schrijft &mdash; zelf moet bijhouden. Het voordeel is dat jouw gebruikers alleen maar _jouw_ pakket hoeven te installeren &mdash; de rest gaat vanzelf.

En&hellip; hoe test je je package zodat je zeker weet dat hij het bij een ander ook doet? Heel vaak werkt het bij jou wel, maar vergeet je een bestand mee te sturen dat wel echt nodig is.[^missende bestanden] Of: bij jou werkt `#!py import my_new_cool_app.gui` wel, maar bij een ander geeft hij een `#!py ImportError` of `#!py ModuleNotFoundError`. De bestanden zijn er wel, maar worden verkeerd geïmporteerd.

[^missende bestanden]: Echt gebeurd: meerdere studenten leverden hun grafische applicatie in voor een beoordeling. We konden het niet draaien, want er misten bestanden. Bij de student werkte het wel, maar bij ons _echt_ niet.

Hoe _krijg_ je eigenlijk je code bij iemand anders? Liefst als één bestand, of zelfs met `pip install my_new_cool_app`; dat zou wel mooi zijn.

Ook daarvoor gebruiken we _uv_.

!!! info
    Voorgaande jaren leerden we studenten om _Poetry_ te gebruiken. Heel populair, maar uv is de afgelopen anderhalf jaar nog [_veel populairder_](https://www.star-history.com/#python-poetry/poetry&astral-sh/uv&Date) geworden. En terecht.

Er zijn meerdere tools ontwikkeld om dezelfde problemen op te lossen. uv is in korte tijd heel populair geworden. Het richt zich op het officiële ecosysteem: standaard Python packages, ofwel PyPI en `pip`; niet `conda` (zie meer hierover in [paragraaf _pip vs conda_](virtual_environments.md#pip-vs-conda)). Dit zorgt er voor dat iedereen mét of zónder Anaconda je package kan installeren. Omdat uv ook in staat is zelf verschillende versies van Python te installeren hebben we Anaconda niet meer nodig. De installer van Anaconda is bijna 1 Gb groot en bevat heel veel Python packages die je nooit gebruikt. De installer van uv is nog geen 20 Mb en kun je gebruiken om precies te installeren wat je nodig hebt.

!!! opdracht-basis "Werken in een terminal"
    uv is een tool die je enkel en alleen in de terminal kunt gebruiken. Het heeft alleen een command-line interface (CLI). Ben je nog niet zo bekend met het navigeren in een terminal dan kun je als oefening de [Terminal Adventure Game](terminal-adventure-game.md) spelen.

We gaan uv bedienen door commando's te geven in de terminal van Visual Studio Code. We laten de terminal weten welk programma wij willen gaan besturen, door `uv` in te typen. En daarachter wat we willen dat uv gaat doen. We kunnen bijvoorbeeld kijken welke commando's allemaal beschikbaar zijn met `uv help`. Dat geeft een vrij lange lijst die je terug kunt scrollen in de terminal, maar je kunt ook `uv help | more` intypen om de tekst per pagina weer te geven.[^more]

[^more]: `more` is een programma die aangeleverde tekst per pagina laat zien, waar je met ++space++ een volgende pagina te zien krijgt. Met ++enter++ krijg je maar één regel extra en met ++q++ sluit je het programma meteen af. Het `|` karakter stuurt output door. Dus `uv help | more` stuurt de output van `uv help` door naar het programma `more`.

<pre><code>> uv help | more <button type="button" name="filename_suffix" onclick="runScript('filename_suffix')">{{ enter }}</button><button type="button" name="filename_suffix" onclick="runScript('filename_suffix')" class="invisible">{{ reload }}</button>
<span class="invisible" name="filename_suffix">An extremely fast Python package manager.

Usage: uv [OPTIONS] <COMMAND>

Commands:
  run                        Run a command or script
  init                       Create a new project
  add                        Add dependencies to the project
  remove                     Remove dependencies from the project
  version                    Read or update the project's version
  sync                       Update the project's environment
  lock                       Update the project's lockfile
  export                     Export the project's lockfile to an alternate format
  tree                       Display the project's dependency tree
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
                               duration of the operation [env: UV_NO_CACHE=]
      --cache-dir <CACHE_DIR>  Path to the cache directory [env: UV_CACHE_DIR=]
-- More  --</span>
</code></pre>

!!! opdracht-basis "uv help"
    Open een terminal en vraag informatie over uv op met het commando `uv`. Lees de tekst die uv aan je teruggeeft vluchtig door tot het eind; waar kan je meer informatie vinden?[^laatsteregel] We hebben het commando `uv pip` al eerder gebruikt (waarvoor ook alweer?). Vraag eens meer informatie over het commando `pip`. Hoe kun je een lijst krijgen van alle packages die geïnstalleerd staan in je virtual environment? Voer dat commando uit. Voer ook het commando uit om een 'dependency tree' te krijgen. Wat houdt dat in? Overleg met je buurmens zodat jullie het eens zijn over de antwoorden op deze vragen.

[^laatsteregel]: Hint: lees de laatste regel.

!!! info
    Zoals je gezien hebt heeft `uv` dus heel veel verschillende commando's. uv is een Zwitsers zakmes: het bevat heel veel tools voor wie dat nodig heeft. Wij hebben lang niet alles nodig dus laat je daardoor niet uit het veld slaan. In de rest van dit hoofdstuk vertellen we precies wat je _wel_ nodig hebt. Als je meer wilt weten kun je het beste [de documentatie](https://docs.astral.sh/uv/) lezen.


## Nieuw uv project
!!! info
    We gaan werken met modules en packages. Ben je daar nog niet zo bekend mee, zorg dan dat je [paragraaf _Modules_](vervolg-python.md#modules) en [paragraaf _packages_](vervolg-python.md#packages) gemaakt hebt.

Stel je wilt een package schrijven met wat handige functies om veelgebruikte statistische berekeningen makkelijk uit te voeren. Je noemt het `easystat`. Het doel is eerst om het in al je eigen analyses makkelijk te kunnen gebruiken (`#!py import easystat`) maar je wilt het ook op GitHub zetten en wie weet vinden anderen het ook handig! Je wilt het dus ook _netjes_ doen. En niet later van anderen horen: <q>leuk, maar bij mij werkt het niet!</q>

!!! opdracht-basis "Easystat uv project aanmaken"
    === "opdracht"
        1. Open Github Desktop en ga naar het dropdownmenu **File**. Kies hier voor `New repository ...`. Geef de repository de naam `easystat` en zet de repository in de map {{folder}}`ECPC`. Vink `Initialize this repository with a README` aan en kies bij `Git ignore` voor <q>Python</q>.
        2. Open de repository {{github}} `easystat` in Visual Studio Code.
        3. Open een Terminal in je Visual Studio Code-omgeving (**Menu > Terminal > New Terminal**). Maak het uv project aan met:
        ``` ps1 title="Terminal"
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

        !!! info "src-layout"
            Door het project in een source layout (src-layout) te bouwen (`easystat` zit in een mapje `src`) staat al je Pythoncode netjes bij elkaar weggestopt. Dit maakt het makkelijker om te testen of het installeren goed werkt zodat je zeker weet dat andere mensen met jouw code aan de slag kunnen.

    === "code"
        **Testcode**
        <pre><code>(ECPC) > uv init --package <button type="button" name="uv init --package" onclick="runScript('uv init --package')">{{ enter }}</button><button type="button" name="uv init --package" onclick="runScript('uv init --package')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="uv init --package">Initialized project \`easystat\`</span>
        </code></pre>
        
    === "check"
        **Checkpunten:**
    
        - [ ] De projectmap {{folder}}`easystat` staat in de map {{folder}}`ECPC`.
        - [ ] In de _projectmap_ {{folder}}`easystat` staat een map {{folder}}`src`.
        - [ ] In de map {{folder}}`src` staat een _package_ map {{folder}}`easystat`

        **Projecttraject**
    
        - [x] Easystat uv project aanmaken
        - [ ] Easystat virtual environment aanmaken
        - [ ] Easystat {{file}}`shortcuts.py`, {{file}}`measurements.py` en {{file}}`try_measurements.py` aanmaken
        - [ ] Easystat {{file}}`shortcuts.py` testen
        - [ ] Easystat dependencies toevoegen
        - [ ] Easystat package imports fixen


Laten we één voor één kijken welke mappen en bestanden uv heeft aangemaakt. We hadden al een {{file_lines}}`README.md` in de projectmap staan. Hierin komt een algemene beschrijving van ons project.[^README]

[^README]: Wanneer de repository op GitHub wordt geplaatst wordt deze README automatisch op de hoofdpagina van de repository getoond, onder de code.

Dan komt de {{folder}}`src`-map. Daarin komt ons nieuwe package {{folder}}`easystat`[^projectmap] te staan. Er is alvast voor ons een {{file}}`__init__.py` aangemaakt. Handig! De bestanden {{file}}`.gitattributes` en {{file}}`.gitignore` bewaren wat instellingen voor git, en {{file}}`.python-version` bewaart het versienummer van Python dat uv gebruikt. Vul je daar 3.12 in? Dan installeert uv Python 3.12 in je virtual environment.

[^projectmap]: Ja er is een map {{folder}}`easystat` met daarin een map {{folder}}`src` met daarin weer een map {{folder}}`easystat` &mdash; dat kan nog wel eens verwarrend zijn. Het is conventie om de projectmap dezelfde naam te geven als je package. Het pad is dus eigenlijk {{folder}}`project/src/package` en dat wordt dan, in ons geval, {{folder}}`easystat/src/easystat`.

En als laatste&hellip; een {{file_lines}}`pyproject.toml`[^setup.py] waarin alle informatie over je project wordt bijgehouden. Ook staat er in dit bestand informatie voor de verschillende tools die je kunt gebruiken. De inhoud van het bestand ziet er ongeveer zo uit:
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

[^setup.py]: Vroeger was er een `setup.py` maar Python schakelt nu langzaam over naar dit nieuwe bestand.

Het bestand is in het TOML-formaat.[@TOML] Tussen de vierkante haken staan de koppen van de verschillende secties in dit configuratiebestand. In de eerste sectie staat informatie over ons project. Je kunt daar bijvoorbeeld een beschrijving toevoegen of het versienummer aanpassen. Ook bevat die sectie de _dependencies_. Dit zijn alle Pythonpackages die ons project nodig heeft. Op dit moment is dat nog niets. Ook het versienummer van Python is belangrijk. Hier is dat groter of gelijk aan 3.13. Dit kan belangrijk zijn. Gebruikers met een iets oudere versie van Python &mdash; bijvoorbeeld versie 3.11 &mdash; kunnen nu het package niet installeren. Als je niet per se de nieuwste snufjes van Python 3.13 nodig hebt kun je aangeven dat een iets oudere versie van Python ook prima is. Op moment van schrijven &mdash; zomer 2025 &mdash; is Python 3.13 de nieuwste versie. Het is dus prima om minimaal 3.12 te vragen &mdash; die versie is inmiddels een jaar oud. Het is handig om als je hier invult 'minstens 3.12', dat je dan in {{file}}`.python-version` _ook_ 3.12 invult omdat je anders niet zeker weet dat je code ook echt werkt met 3.12.

De sectie `[project.scripts]` zorgt ervoor dat we ons script kunnen aanroepen door `easystat` in de terminal in te typen en de sectie `[build-system]` zorgt ervoor dat we een package kunnen maken en uploaden naar de Python Package Index (PyPI). Dat is nu nog niet belangrijk.

!!! opdracht-basis "Synchroniseren van virtual environments"
    1. Hoewel we hierboven beweerden dat je `easystat` kunt intypen in de terminal en dat er dan een scriptje draait, werkt dat (nog) niet. Probeer maar eens! Het werkt ook niet als je een nieuwe terminal opent. En... er staat niets tussen haakjes aan het begin van de opdrachtprompt. Blijkbaar is er nog geen virtual environment actief.
    2. Open {{file}}`src/eaystat/__init__.py`. Rechtsonderin zie je inderdaad {{warning}}`Select Interpreter`. Als je daarop klikt zie je alleen niet `Python 3.x.x (easystat)` in het rijtje staan... Druk op ++escape++ om het menu te verlaten.
    3. In een terminal in VS Code, type in:
    <pre><code>> uv sync <button type="button" name="uv_sync" onclick="runScript('uv_sync')">{{ enter }}</button><button type="button" name="uv_sync" onclick="runScript('uv_sync')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="uv_sync">Using CPython 3.13.5
    Creating virtual environment at: .venv
    Resolved 1 package in 5ms
    Installed 1 package in 47ms
    &nbsp;+ easystat==0.1.0 (from file:///C:/Users/David/Documents/ECPC/easystat)</span></code></pre>
    Wat dit gedaan heeft is het automatisch aanmaken van het virtual environment op basis van je projectinstellingen. Dus de Pythonversie die in {{file}}`.python-version` staat en eventuele dependencies die gedefinieerd zijn in je {{file_lines}}`pyproject.toml`.
    4. Kies het nieuwe virtual environment.
    5. Open een _nieuwe_ terminal en type `easystat`. Als het goed is werkt het nu wél!

!!! opdracht-basis "Easystat uv project committen"
    Commit in GitHub Desktop de wijzigingen die `uv init` heeft gedaan.


### Maken van de easystat-package
We starten met ons package. We gaan een aantal `#!py ModuleNotFoundError`s tegenkomen, maar dat lossen we ook weer op.  Stel, we berekenen vaak de standaarddeviatie van het gemiddelde en maken daarvoor een handige <q>shortcut</q> in {{file}}`shortcuts.py`. Nu willen we deze shortcut ook in een ander script {{file}}`measurements.py` gebruiken, die op basis van een aantal metingen het gemiddelde mét een onzekerheid geeft. Dit kunnen we doen door de module te importeren in het nieuwe script zodat we de functie `stdev_of_mean` daar ook kunnen gebruiken. We maken uiteindelijk een script {{file}}`try_measurements.py` om dit allemaal te testen, en die zetten we expres niet _in_ het package, maar in een nieuwe map {{folder}}`tests`. Het testscript hoort immers niet bij de code van het `easystat` package.

!!! opdracht-basis "Easystat shortcuts.py en try_shortcuts.py aanmaken"
    Maak zoals hieronder aangegeven de bestanden {{new_file}}`shortcuts.py`, {{new_file}}`measurements.py` en {{new_file}}`try_measurements.py` aan, waarbij je let op in welke map de bestanden moeten staan:
    <div class="grid-tree" markdown>
        <div>
        ``` py title="shortcuts.py"
        import numpy as np 
        
        
        def stdev_of_mean(values):
            """Calculate the standard deviation of the mean"""
            return np.std(values) / np.sqrt(len(values))    
        ```
        ``` py title="measurements.py"
        import numpy as np
        from shortcuts import stdev_of_mean


        def result_with_uncertainty(values):
            """Return result with uncertainty from list of measurements."""
            return np.mean(values), stdev_of_mean(values)

        ```
        ``` py title="try_measurements.py"
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
        {{T}} {{folder}} `tests`  
        {{tab}} {{T}} {{file}} `__init__.py`  
        {{tab}} {{L}} {{new_file}} `try_measurements.py`  
        {{T}} {{file_lines}} `pyproject.toml`  
        {{L}} {{file_lines}} `readme.md`  
        </div>
    </div>

    !!! info "`Import numpy could not be resolved`"
        Misschien is het je al opgevallen dat VS Code een oranje kringeltje onder `#!py numpy` zet in de eerste regels van twee scripts, en ook onder `shortcuts` en `measurements`. Als je daar je muiscursor op plaatst krijg je een popup met de melding `Import numpy could not be resolved`. Daar moeten we misschien wat mee en dat gaan we *straks* ook doen.

In de eerste regel van {{file}}`test_measurements.py` importeren we de functie uit het nieuwe package om uit te proberen. In de eerste `#!py print`-regel gebruiken we een handige functie van f-strings.[^f-string-=]

[^f-string-=]: In f-strings kunnen tussen de accolades variabelen of functieaanroepen staan. Voeg daar het `=`-teken aan toe en je krijgt niet alleen de _waarde_, maar ook de variabele of aanroep zelf te zien. Bijvoorbeeld: als je definieert `#!py name = "Alice"`, dan geeft `#!py print(f"{name}")` als uitkomst `#!py Alice`. Maar voeg je het `=`-teken toe zoals in `#!py print(f"{name=")}` wordt de uitvoer `#!py name='Alice'`. Je ziet dan dus ook meteen de naam van de variabele en dat kan handig zijn.

!!! opdracht-basis "Easystat shortcuts.py testen"
    === "opdracht"
        Je bent heel benieuwd of je package al werkt. Je runt als eerste het bestand {{file}}`shortcuts.py` en krijgt een foutmelding...
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
        **Checkpunten:**
    
        - [ ] Je hebt de juiste virtual environment geactiveerd.
        - [ ] Je runt het bestand {{file}}`shortcuts.py`.
        - [ ] Je krijgt een foutmelding `#!py ModuleNotFoundError: No module named 'NumPy'`
        
        **Projecttraject**

        - [x] Easystat uv project aanmaken
        - [x] Easystat virtual environment aanmaken
        - [x] Easystat {{file}}`shortcuts.py`, {{file}}`measurements.py` en {{file}}`try_measurements.py` aanmaken
        - [x] Easystat {{file}}`shortcuts.py` testen
        - [ ] Easystat dependencies toevoegen
        - [ ] Easystat package imports fixen

    
De beloofde `#!py ModuleNotFoundError`! Ons package heeft NumPy nodig en dat hebben we nog niet geïnstalleerd. Dat kunnen we handmatig doen maar dan hebben andere gebruikers een probleem. Veel beter is het om netjes aan te geven dat ons package NumPy nodig heeft &mdash; als _dependency_.


### Dependencies toevoegen

Om een dependency aan te geven vertellen we uv dat hij deze moet toevoegen met:
<pre><code>(easystat) > uv add numpy <button type="button" name="uv add numpy" onclick="runScript('uv add numpy')">{{ enter }}</button><button type="button" name="uv add numpy" onclick="runScript('uv add numpy')" class="invisible">{{ reload }}</button>
<span class="invisible" name="uv add numpy">Resolved 2 packages in 453ms
      Built easystat @ file:///C:/Users/David/Documents/ECPC/easystat
Prepared 1 package in 82ms
Uninstalled 1 package in 9ms
Installed 2 packages in 798ms
 ~ easystat==0.1.0 (from file:///C:/Users/David/Documents/ECPC/easystat)
 + numpy==2.3.2</span>
</code></pre>

!!! opdracht-basis "Easystat dependencies toevoegen"
    === "opdracht"
        Je voegt `numpy` als dependency toe aan het project `easystat` met het commando `uv add numpy`. Je kijkt in de {{file_lines}}`pyproject.toml` en warempel daar staat `numpy` nu bij de dependencies! Je vraagt je af of `numpy` nu ook in het virtual environment `easystat` is geïnstalleerd en controleert dit met `uv pip list` en waarachtig `numpy` staat in de lijst {{feesttoeter}}. Weer ga je {{file}}`shortcuts.py` draaien en ditmaal krijg geen foutmelding! Commit de wijzigingen.
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt de juiste virtual environment geacitveerd.
        - [ ] Je hebt `numpy` als dependency toegevoegd.
        - [ ] Je krijgt geen foutmelding als je het bestand {{file}}`shortcuts.py` runt.

        **Projecttraject**
    
        - [x] Easystat uv project aanmaken
        - [x] Easystat virtual environment aanmaken
        - [x] Easystat {{file}}`shortcuts.py`, {{file}}`measurements.py` en {{file}}`try_measurements.py` aanmaken
        - [x] Easystat {{file}}`shortcuts.py` testen
        - [x] Easystat dependencies toevoegen
        - [ ] Easystat package imports fixen


Fijn! Het verwijderen van dependency `PACKAGE` gaat met `uv remove PACKAGE`. uv heeft NumPy nu toegevoegd aan de environment `easystat`. Gewone package managers als Pip en Conda zullen geen packages toevoegen aan je uv project als je `pip/conda install package` aanroept. Gebruik daarom altijd `uv add package` als je met uv aan een package werkt. Sterker nog, als je met Pip handmatig packages extra installeert zal `uv sync` deze packages als overbodig herkennen en ze prompt weer verwijderen.

!!! info
    Als we de code in ons package aanpassen dan hoeven we het environment niet opnieuw te synchroniseren met `uv sync`, maar als we met de hand iets wijzigen in de {{file_lines}}`pyproject.toml` dan moet dat _wel_. Als je een `#!py ImportError` of `#!py ModuleNotFoundError` krijgt voor je eigen package &mdash; bijvoorbeeld als je nieuwe mappen of bestanden hebt aangemaakt &mdash; probeer dan _eerst_ voor de zekerheid `uv sync`.

???+ meer-leren "uv.lock"

    ### uv.lock

    Na het toevoegen van NumPy is er ook een grote wijziging in het bestand {{file_lines}}`uv.lock` bijgekomen. Hierin staan de exacte versies van alle geïnstalleerde packages. Vaak wordt dit bestand gecommit zodat collega-ontwikkelaars exact dezelfde versies installeren zodra ze `uv sync` aanroepen. Ook als er nieuwere versies van NumPy bijkomen blijven alle ontwikkelaars precies dezelfde NumPy-versie gebruiken totdat {{file_lines}}`uv.lock` geüpdatet wordt. Om dat te proberen maken we even een schone virtual environment:

    !!! opdracht-meer "Schone environment"

        1. Maak een schone virtual environment met `uv venv`
        2. Kies voor ja als uv een waarschuwing geeft dat deze environment al bestaat en vraagt of je het bestaande environment wilt verwijderen.
        3. Draai {{file}}`shortcuts.py` en bekijk de foutmelding.

    We krijgen meteen foutmeldingen. Immers, het virtual environment is nog leeg en we hebben geen dependencies geïnstalleerd.

    !!! opdracht-meer "uv.lock"

        4. Installeer de dependencies in één keer met `uv sync`.
        5. Waarvoor gebruikt uv de lock file ({{file_lines}}`uv.lock)`?
        6. Draai {{file}}`shortcuts.py` en bekijk de uitkomst.
        7. Als je nieuwere versies wilt gebruiken die passen bij wat er in de {{file_lines}}`pyproject.toml` staat, dan kun je de lockfile updaten met `uv lock --upgrade`. Als er nieuwere versies beschikbaar zijn van dependencies dan worden die geïnstalleerd en verwerkt in de lockfile. Je college-ontwikkelaars installeren die nu ook automatisch zodra ze `uv sync` gebruiken.

### Absolute imports

We hebben een uv project, dependencies toegevoegd maar nog niet alle code getest. Dat gaan we nu doen!

!!! opdracht-basis "Easystat package testen"
    === "opdracht"
        Je probeert nog een keer {{file}}`shortcuts.py` te runnen en ziet dat dat gewoon werkt. Daarna probeer je {{file}}`measurements.py`. Werkt ook, maar wel gek dat er golfjes onder `#!py from measurements import result_with_uncertainty` staan, hij doet het toch gewoon? Je kijkt even welke waarschuwing daarbij gegeven wordt door je muiscursor op de golfjes te schuiven. Daarna probeer je {{file}}`try_measurements.py`. Hier gaan dingen mis.
    === "code"
        **Testcode**
        <pre><code>(easystat) > python tests/try_measurements.py <button type="button" name="try_measurements" onclick="runScript('try_measurements')">{{ enter }}</button><button type="button" name="try_measurements" onclick="runScript('try_measurements')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="try_measurements">Traceback (most recent call last):
        File "c:\Users\David\Documents\ECPC\easystat\tests\try_measurements.py", line 1, in <module>
            from measurements import result_with_uncertainty
        ModuleNotFoundError: No module named 'measurements'</span>
        </code></pre>

We willen dus de module `measurements` importeren, maar Python kan hem niet vinden. Dat is ook wel een klein beetje logisch, want {{file}}`try_measurements.py` staat in de map {{folder}}`tests` maar {{file}}`measurements.py` staat in de map {{folder}}`src/easystat`. Dus we moeten Python vertellen wáár hij die module kan vinden, namelijk in ons nieuwe package `easystat`. Doordat we een package gemaakt hebben hoeven we dus niet precies te vertellen in welke _map_ alles te vinden is, maar hoeven we alleen de naam van het package te gebruiken. Dus _niet_ `map.op.computer.easystat.src.easystat` maar gewoon `easystat`. Wel zo makkelijk.

!!! opdracht-basis "Import aanpassen: easystat package gebruiken"
    === "opdracht"
        Je past `#!py from measurements ...` aan naar `#!py from easystat.measurements ...`. Je test de code opnieuw. Verdorie, weer een error. Overleg met elkaar wat deze error betekent. Waarom kregen wie error niet toen we {{file}}`measurements.py` testten?
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

Het probleem is dat wanneer je met Python een script runt en je importeert iets, dat Python eerst in de map kijkt waar het script staat (hier {{folder}}`tests`) en daarna zoekt in de lijst met geïnstalleerde packages. De module `shortcuts` staat _niet_ in {{folder}}`tests`. Toen we {{file}}`measurements.py` draaiden kon hij die wél vinden want {{file}}`measurements.py` en {{file}}`shortcuts.py` staan in _dezelfde_ map. Dus afhankelijk van welk script we draaien kan hij de modules soms wel vinden, soms niet. Dat is natuurlijk niet zo handig. De oplossing: _absolute imports_: geef bij alle imports _altijd_ de naam van je package op.

!!! opdracht-basis "Import aanpassen: absolute imports"
    === "opdracht"
        Je past `#!py from shortcuts ...` aan door de naam van het package toe te voegen. Je test de code opnieuw. Gelukt! {{feesttoeter}}
    === "code"
        **Testcode**
        <pre><code>(easystat) > python tests/try_measurements.py <button type="button" name="try_measurements3" onclick="runScript('try_measurements3')">{{ enter }}</button><button type="button" name="try_measurements3" onclick="runScript('try_measurements3')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="try_measurements3">measurements=[1, 2, 2, 2, 3]
        Result of measurements is: 2.00 +- 0.28.</span>
        </code></pre>
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt de import in {{file}}`try_measurements.py` aangepast.
        - [ ] Je hebt de import in {{file}}`measurements.py` aangepast.
        - [ ] Je krijgt geen foutmelding als je het bestand {{file}}`try_measurements.py` runt.

        **Projecttraject**
    
        - [x] Easystat uv project aanmaken
        - [x] Easystat virtual environment aanmaken
        - [x] Easystat {{file}}`shortcuts.py`, {{file}}`measurements.py` en {{file}}`try_measurements.py` aanmaken
        - [x] Easystat {{file}}`shortcuts.py` testen
        - [x] Easystat dependencies toevoegen
        - [x] Easystat package imports fixen

???+ meer-leren "Wheels"

    ### Wheels

    Wanneer we klaar zijn om ons package te delen met andere gebruikers gebruiken we het commando `build` om wheels te bouwen.

    !!! opdracht-meer "Bouw een wheel"
        
        1. Bouw het wheel van easystat met `uv build`.
        2. Bekijk de namen van de bestanden in de nieuwe map {{folder}}`easystat/dist`, welke extensie hebben ze?
        

    <pre><code>(easystat) > uv build <button type="button" name="uv build" onclick="runScript('uv build')">{{ enter }}</button><button type="button" name="uv build" onclick="runScript('uv build')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="uv build">Building source distribution (uv build backend)...
    Building wheel from source distribution (uv build backend)...
    Successfully built dist\easystat-0.1.0.tar.gz
    Successfully built dist\easystat-0.1.0-py3-none-any.whl</span>
    </code></pre>
    Een `.tar.gz`-bestand is een soort zipbestand met daarin de broncode van ons pakket (een _source distribution_). De tests worden daar niet in meegenomen. Een <q>wheel</q> is een soort bestand dat direct geïnstalleerd kan worden met `pip`. Zogenaamde _pure-python_ packages bevatten alleen Pythoncode &mdash; en geen C-code die gecompileerd moet worden voor verschillende besturingssystemen of hardwareplatforms. Je herkent ze aan `none-any` in de bestandsnaam. <q>None</q> voor <q>niet-OS-specifiek</q> en <q>any</q> voor <q>draait op elk hardwareplatform</q>. We kunnen dit bestand als download neerzetten op een website of aan anderen mailen. Zij kunnen het dan installeren met `pip install`.

    !!! opdracht-meer "Test wheel"
        Laten we het wheel uitproberen. We gaan straks een nieuwe conda environment aanmaken, installeren het wheel en proberen het testscript te runnen &mdash; één keer vóór het installeren van het wheel en één keer ná het installeren, als volgt:

        3. Maak een nieuw, leeg, virtual environment.
        4. Draai {{file}}`tests/try_measurements.py` en bekijk de foutmelding.
        5. Installeer het wheel met `uv pip install .\dist\easystat-0.1.0-py3-none-any.whl`.
        6. Draai {{file}}`tests/try_measurements.py` en bekijk de uitkomst.
        
    Het werkt! Je ziet dat `pip install` niet alleen ons package `easystat` installeert, maar _ook de dependency_ `numpy`. Dat is precies wat we willen.
    
    Het is belangrijk om de wheels _niet_ in je GitHub repository te committen. Je repository is voor _broncode_, waarmee wheels gebouwd kunnen worden. Als je de stappen voor het aanmaken van de repository netjes gevolgd hebt dan heb je een {{file_lines}}`.gitignore` toegevoegd met Python-specifieke bestandsnamen en directories die genegeerd worden door Git en GitHub.


## uv gebruiken voor een bestaand project: pythondaq
Natuurlijk willen we uv ook gaan gebruiken bij `pythondaq`. We maken nu alleen geen _nieuw_ project, maar gaan uv toevoegen aan een bestaand project. Daarvoor moeten we twee dingen doen. Als eerste gaan we uv initialiseren in de `pythondaq` repository en dan moeten we de code in de `src`-structuur plaatsen.

!!! opdracht-inlever "Pythondaq: uv"
    === "opdracht"
        1. Je project {{github}}`pythondaq` is zo tof aan het worden dat je het met uv gaat beheren zodat jij en anderen het gemakkelijk kunnen installeren en gebruiken. Als eerste open je de repository in GitHub Desktop en Visual Studio Code en open je een nieuwe terminal. Je test voor de zekerheid {{file}}`run_experiment.py` nog even uit zodat je zeker weet dat alles nu nog werkt. Vervolgens maak je een uv project {{lightbulb}}. Dan kies je op _twee plaatsen_ dat je Python 3.12 wilt gebruiken. Dan synchroniseer je je virtual environment en commit je je wijzigingen.
        2. Test {{file}}`run_experiment.py` en voeg alle benodigde dependencies toe {{lightbulb}} totdat alles werkt en je opnieuw het lampje ziet gaan branden en de resultaten van je experiment krijgt. Commit je wijzigingen.
    === "check"
        **Checkpunten:**
    
        - [ ] Je hebt uv geïnitialiseerd in de Pythondaq projectmap.
        - [ ] Na het initialiseren van uv is er een {{file_lines}}`pyproject.toml` en een {{file_lines}}`.python-version` in de projectmap aangemaakt.
        - [ ] Wanneer met `uv sync` een nieuwe virtual environment met Python 3.12 wordt aangemaakt werkt {{file}}`run_experiment.py` daarna in die nieuwe omgeving naar behoren. 

        **Projecttraject**
    
        - [x] Pythondaq: Docstring
        - [x] Pythondaq: src-layout
        - [ ] Pythondaq: uv
        - [ ] Pythondaq: test imports
        - [ ] Pythondaq: applicatie

!!! opdracht-inlever "Pythondaq: src-layout"
    <div class="grid-tree" markdown>
        <div>
        Nu de code in principe werkt, gaan we die in een src-layout zetten zoals hiernaast. Je test {{file}}`run_experiment.py` en die moet werken.
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
        **Checkpunten:**
    
        - [ ] Je 'oude' code staat nu allemaan in {{folder}}`src/pythondaq`.
        - [ ] {{file}}`run_experiment.py` draait zonder problemen.


        **Projecttraject**
    
        - [x] Pythondaq: Docstring
        - [x] Pythondaq: src-layout
        - [x] Pythondaq: uv
        - [ ] Pythondaq: test imports
        - [ ] Pythondaq: applicatie


???+ opdracht-meer "Model, view, controller packages"
    In grotere projecten is het gebruikelijk om model, view, controller niet alleen uit te splitsen in verschillende scripts, maar ook in aparte packages te zetten.

    1. Maak 3 extra packages in de {{folder}}`pythondaq` package. {{folder}}`models`, {{folder}}`views` en {{folder}}`controllers`.
    2. Zet de modules in de juiste packages.
    3. Test je code zodat alle imports weer werken.


## Van script naar applicatie
Om onze python code te testen heb je tot nu toe waarschijnlijk op de `run`-knop in Visual Studio Code gedrukt. Of je hebt in de terminal aan python gevraagd om het {{file}}`script.py` te runnen:
``` ps1 title="Terminal"
python script.py
```
Je moet dan wel in Visual Studio Code de juiste map geopend hebben zodat Python het bestand kan vinden. En als je de `run`-knop gebruikt moet wel het bestandje open staan dat je wilt runnen. Kortom, best een beetje gedoe. Maar als we programma's zoals uv, Conda of Python willen gebruiken hoeven we helemaal niet het juiste bestandje op te zoeken en te runnen. We hoeven alleen maar een commando in de terminal te geven &mdash; bijvoorbeeld `python` of `conda` &mdash; en de computer start automatisch het juiste programma op.

Dat willen wij ook voor onze programma's! En omdat we uv gebruiken kunnen we dat heel eenvoudig doen. We gaan even in een andere test-repository een commando toevoegen om de module uit te voeren waarvan je de code in [paragraaf _Modules_](vervolg-python.md#modules) kunt vinden. De twee bestanden {{file}}`square.py` en {{file}}`count_count.py` hebben we voor jullie netjes in een package geplaats in de repository {{github}}`AnneliesVlaar/just_count` met de volgende structuur:

    just_count/
        src/
            just_count/
                __init__.py
                square.py
                count_count.py
        .python-version
        pyproject.toml
        README.md
        uv.lock

De bestanden {{file}}`square.py` en {{file}}`count_count.py` zien er hetzelfde uit als in [paragraaf _Modules_](vervolg-python.md#modules):
=== "square.py"

    ``` py
    --8<-- "scripts/square.py"
    ```
=== "count_count.py"

    ``` py
    --8<-- "scripts/count_count.py"
    ```


We kunnen uv niet vragen om een script te runnen, maar wel om een functie in een module uit te voeren. Een nieuw uv project krijgt automatisch al een voorbeeldscript. Daar gaan we even naar kijken en daarna passen we het aan voor eigen gebruik.

!!! opdracht-basis "Voorbeeldscript"
    === "opdracht"
        Je [cloned de repository just_count in GitHub desktop](x-github-client://openRepo/https://github.com/AnneliesVlaar/just_count) en opent het daarna vanuit GitHub Desktop in Visual Studio Code. Je ziet een {{file_lines}}`pyproject.toml` en een {{file}}`uv.lock` in de repository staan, dus je maakt meteen een virtual environment aan {{lightbulb}}. Je opent een terminal en voert de opdracht `just-count` uit. De code hiervoor staat in {{file}}`src/just_count/__init__.py`. Dit is overigens niet de beste plek, maar werkt prima als eenvoudig voorbeeld. Je bekijkt de code en ziet dat de bewuste code in een functie `#!py main()` staat.
    === "code"
        **Testcode**
        <div class="code-box"><button type="button" name="uv voorbeeldscript" onclick="runScript('uv voorbeeldscript')" class="run">{{ run }}</button><button type="button" name="uv voorbeeldscript" onclick="runScript('uv voorbeeldscript')" class="reload invisible">{{ reload }}</button> \_\_init\_\_.py
        ``` py
        def main() -> None:
            print("Hello from just-count!")
        ```
        <pre>
        <code>(just_count) > just-count
        <span class="invisible" name="uv voorbeeldscript">Hello from just-count!</span>
        </code></pre></div>        

Als wij willen dat onze eigen code draait als we `just-count` intypen, dan moeten we zorgen dat onze code _ook_ in een functie gezet wordt.

!!! opdracht-basis "Main functie toevoegen"
    === "opdracht"
         Je opent het hoofdbestand {{file}}`count_count.py` en zet de <q>body</q> van de module in een functie `#!py main()`. Daarna pas je het bestand aan zodat de functie nog steeds wordt uitgevoerd wanneer je het bestand {{file}}`count_count.py` runt. 
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
        <code>(just_count) > python .\src\just_count\count_count.py
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
    

In {{file_lines}}`pyproject.toml` kunnen we nu het commando toe gaan voegen. In de `scripts`-sectie kunnen we aangeven met welk commando een functie uit een module wordt uitgevoerd. In {{file_lines}}`pyproject.toml` staat al zo'n kopje:
``` toml
[project.scripts]
just-count = "just_count:main"
```
De vorm van die laatste regel is als volgt:
``` toml
naam_commando = "package.module:naam_functie"
```
Hier is `naam_commando` het commando dat je in moet typen in de terminal, `package` is de naam van het Python package waar de code staat, `module` is de naam van de module waar de code staat, en `naam_functie` is de naam van de functie waarin de code staat. Als je `module` weglaat, dan kijkt uv in {{file}}`__init__.py`.

Om de wijzigingen aan {{file_lines}}`pyproject.toml` door te voeren moet je je virtual environment wel opnieuw synchroniseren. uv installeert dan jouw package ook opnieuw.

!!! opdracht-basis "commando toevoegen"
    === "opdracht"
        Je voegt in de {{file_lines}}`pyproject.toml` onder het kopje `[project.scripts]` een nieuw commando `square` toe. Deze verwijst naar de functie `#!py main()` welke in de module {{file}}`count_count.py` staat die ondergebracht is in de package {{folder}}`just_count`. Omdat je handmatig het toml-bestand hebt aangepast synchroniseer je je virtual environment opnieuw {{lightbulb}}.
    === "code"
        **Pseudo-code**
        ``` toml title="pyproject.toml"
        [project.scripts]
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


<div id="opd:uv_commando"></div>

!!! opdracht-basis "Commando testen"
    === "opdracht"
        Nu je het commando `square` hebt aangemaakt ga je deze testen in een terminal. Er verschijnt een error `ModuleNotFoundError: No module named 'square'`. Je leest het info-blokje hieronder.
        </br>
        </br>
        Je runt het commando `square` opnieuw en je ziet de tekst `The square of 5 is 25` verschijnen. Je vraagt je af of het commando ook werkt als de terminal in een andere map zit. Met het commando `cd..` ga je naar een bovenliggende map. Je test het commando `square` en ziet weer de tekst `The square of 5 is 25` verschijnen. Je concludeert dat het commando nu overal werkt zolang het juiste conda environment is geactiveerd. Dat test je uit door het virtual environment te deactiveren {{lightbulb}} en het commando `square` nogmaal te proberen. Je krijgt een error en hebt daarmee je vermoeden bewezen. Tevreden ga je door naar de volgende opdracht. 

        !!! info "ModuleNotFoundError: No module named 'square'"
            Als je de Traceback leest zie je dat het probleem ontstaat in de module {{file}}`count_count.py`. Zoiets hebben we al eerder gezien toen we werkten met het easystat package... Pas het import statement aan naar `#!py from just_count import square`.  
    === "code"
        **Pseudo-code**
        <pre><code>(just-count) > square <button type="button" name="square_test" onclick="runScript('square_test')">{{ enter }}</button><button type="button" name="square_test" onclick="runScript('square_test')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="square_test">Traceback (most recent call last):
        File "C:\Users\David\AppData\Roaming\uv\python\cpython-3.10.18-windows-x86_64-none\lib\runpy.py", line 196, in _run_module_as_main
            return _run_code(code, main_globals, None,
        File "C:\Users\David\AppData\Roaming\uv\python\cpython-3.10.18-windows-x86_64-none\lib\runpy.py", line 86, in _run_code
            exec(code, run_globals)
        File "C:\Users\David\Documents\ECPC\just_count\.venv\Scripts\square.exe\__main__.py", line 4, in <module>
        File "C:\Users\David\Documents\ECPC\just_count\src\just_count\count_count.py", line 1, in <module>
            import square
        ModuleNotFoundError: No module named 'square'</span>
        </code></pre>
    === "check"
        **Checkpunten:**
    
        - [ ] Het import statement in {{file}}`count_count.py` is genoteerd beginnend vanuit de map {{folder}}`src`.
        - [ ] Het commando `square` werkt als het juiste virtual environment is geactiveerd.
        - [ ] Het commando `square` werkt nog steeds nadat je met het commando `cd..` naar een bovenliggende map bent gegaan.
        - [ ] Het commando `square` werkt niet als het virtual environment is gedeactiveerd.

        **Projecttraject**
    
        - [x] main functie toevoegen 
        - [x] commando toevoegen
        - [x] commando testen

???+ opdracht-meer "Error analysis"
    Als extra oefening gaan we met uv een commando maken om een ander script uit te laten voeren. De package is al aangemaakt, maar werkt nog niet naar behoren. Los in de volgende opdrachten de errors op om het script {{file}}`data_analysis.py` te laten runnen.

    1. Ga naar GitHub en clone {{github}}[`AnneliesVlaar/erroranalysis`](https://github.com/AnneliesVlaar/erroranalysis) in GitHub Desktop en open de repository daarna in Visual Studio Code.
    2. Natuurlijk maak je gelijk een nieuw virtual environment aan {{lightbulb}}, voordat we dit package gaan testen.
    3. Snuffel door de bestanden en mappen, en open {{file}}`src/erroranalysis/data_analysis.py`. Dit is het script wat moet kunnen runnen.
    4. Run het script {{file}}`data_analysis.py` en los de errors één voor één op.
    
    Om erachter te komen of de problemen die we hierboven hadden écht zijn opgelost maak je een nieuw leeg virtual environment aan {{lightbulb}} en test je dat het script _niet werkt_. Dan installeer je het package en run je het script opnieuw. Werkt alles? Mooi! Dan gaan we nu een commando aanmaken om de functie `#!py table()` aan te roepen.

    5. Open {{file_lines}}`pyproject.toml` en zoek het kopje voor scripts. Het formaat was:
            ``` toml
            [project.scripts]
            naam_commando = "package.module:naam_functie"
            ```
            pas de regel aan zodat jouw commando de functie `#!py table()` aanroept in {{file}}`src/erroranalysis/data_analysis.py`. Je mag de naam van het commando zelf kiezen.
    6. Ga naar de terminal en kijk of het werkt!
    <pre><code>(erroranalysis) > naam_commando <button type="button" name="naam_commando" onclick="runScript('naam_commando')">{{ enter }}</button><button type="button" name="naam_commando" onclick="runScript('naam_commando')" class="invisible">{{ reload }}</button>
    <span class="invisible" name="naam_commando">Area of the kitchen table is: 1.8386 ± 0.0049 m</span>
    </code></pre>


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
            {{tab}}{{tab}}{{L}}{{file}}`run_experiment.py`  
            {{T}}{{new_folder}}`tests`  
            {{tab}}{{T}}{{new_file}}`__init__.py`  
            {{tab}}{{L}}{{new_file}}`test_imports.py`  
            {{T}}{{file_lines}}`pyproject.toml`  
            {{L}}{{file_lines}}`README.md`  
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
        import pythondaq.view
        ```
        <pre>
        <code>(ECPC) > python test_imports.py
        <span class="invisible" name="test_imports_pythondaq">Traceback (most recent call last):
            File "c:\pythondaq\tests\test_imports.py", line 1, in < module >
                import pythondaq.view
            File "C:\pythondaq\src\pythondaq\run_experiment.py", line 4, in < module >
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
    
!!! opdracht-inlever "Pythondaq: applicatie"
    === "opdracht"
        Je maakt een commando om het script {{file}}`run_experiment.py` uit de repository {{github}}`pythondaq` te starten {{lightbulb}}. Wanneer je het commando aanroept gaat het LED-lampje branden, en verschijnt er even later een IU-plot op het scherm. Je test of het commando ook buiten Visual Studio Code werkt door een `Anaconda prompt` te openen. Je activeert het juiste conda environment {{lightbulb}} en ziet dat ook dan het commando werkt. Wat een feest! {{feesttoeter}} Je hebt nu een applicatie geschreven die een Arduino aanstuurt om een ledje te laten branden. En je kunt je applicatie gewoon vanuit de terminal aanroepen! {{feesttoeter}}
    === "code"
        **Pseudo-code**
        ``` py title="run_experiment.py"
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
    
        - [ ] De functie in {{file}}`run_experiment.py` bevat alle code die uitgevoerd moet worden om een meting te starten.
        - [ ] Het commando in de {{file_lines}}`pyproject.toml` verwijst op de correcte manier naar de functie in {{file}}`run_experiment.py`.
        - [ ] Het aanroepen van het commando zorgt ervoor dat een meting gestart wordt. 
        - [ ] Het commando werkt ook in een `Anaconda prompt` zolang het juiste conda environment actief is.

        **Projecttraject**
    
        - [x] Pythondaq: Docstring
        - [x] Pythondaq: src-layout
        - [x] Pythondaq: poetry    
        - [x] Pythondaq: test imports
        - [x] Pythondaq: applicatie

???+ meer-leren "Versie 2.0.0"
    In de {{file_lines}}`pyproject.toml` kan je ook de versie aangeven van je package. Maar wanneer hoog je nu welk cijfertje op? Wanneer wordt iets _versie 2.0.0_? Daar zijn conventies voor. Bug fixes gaan op het laatste cijfer, wijzigingen en nieuwe features gaan op het middelste cijfer. Wanneer de applicatie dusdanig verandert dat je bijvoorbeeld bestanden die je met oude versie hebt gemaakt niet met de nieuwe versie kunt openen, dan verander je het eerste cijfer. Je start vaak met versie 0.1.0 en blijft tijdens het bouwen van je project ophogen naar 0.2.0 en soms zelfs 0.83.0. Wanneer je project min of meer klaar is voor eerste gebruik, dan kies je er vaak voor om versie 1.0.0 te releasen.