# Poetry
\label{ch:poetry}

In de vorige hoofdstukken heb je gewerkt met een eigen conda environment zodat je jouw pythonomgeving mooi gescheiden kan houden van andere studenten die op dezelfde computer werken. Dit is echt _de_ oplossing voor alle problemen waarbij volledige Pythoninstallaties onbruikbaar kunnen worden -- waarna je alles opnieuw moet installeren.

Opnieuw beginnen of nieuwe environments aanmaken heeft wel een nadeel: je moet alle packages die je nodig hebt opnieuw installeren. Welke waren dat ook alweer? Vast `numpy`, en `matplotlib`, en\ldots? Niet handig. Als je code gaat delen met elkaar krijg je regelmatig te maken met een `#!py ImportError` waarna je _weer_ één of ander package moet installeren.

Nu pythondaq netjes is uitgesplitst in een MVC-structuur en de wijzigingen met Git worden bijgehouden, ga je er een package van maken zodat je het ook met anderen kan delen.

Packages op PyPI geven altijd hun _dependencies_ op. Dat zijn de packages die verder nog nodig zijn om alles te laten werken. Installeer je `matplotlib`, dan krijg je er `six, python-dateutil, pyparsing, pillow, numpy, kiwisolver, cycler` automatisch bij. Maar dat is niet genoeg. Welke versies van `numpy` werken met de huidige versie van `matplotlib`? Allemaal zaken die je -- als je een package schrijft -- zelf moet bijhouden. Het voordeel is dat jouw gebruikers alleen maar _jouw_ pakket hoeven te installeren -- de rest gaat vanzelf.

En\ldots{} hoe test je je package zodat je zeker weet dat hij het bij een ander ook doet? Heel vaak werkt het bij jou wel, maar vergeet je een bestand mee te sturen dat wel echt nodig is.\footnote{Echt gebeurd: meerdere studenten leverden hun grafische applicatie in voor een beoordeling. We konden het niet draaien, want er misten bestanden. Bij de student werkte het wel, maar bij ons _echt_ niet.} Of: bij jou werkt `#!py import my_new_cool_app.gui` wel, maar bij een ander geeft hij een `#!py ImportError`. De bestanden zijn er wel, maar worden verkeerd geïmporteerd.

Hoe _krijg_ je eigenlijk je code bij iemand anders? Liefst als één bestand, of zelfs met \shellinline{pip install my_new_cool_app}; dat zou wel mooi zijn.

En daar is _Poetry_.

Er zijn meerdere tools ontwikkeld om dezelfde problemen op te lossen. Poetry is heel populair geworden. Het richt zich op het officiële ecosysteem: standaard Python packages, ofwel PyPI en \shellinline{pip}; niet \shellinline{conda}. Jammer, maar dit zorgt er wel voor dat iedereen mét of zónder Anaconda je package kan installeren. Dat is dan wel weer fijn. Wij gaan Anaconda gebruiken om een virtual environment met _alleen_ Python te maken. Vervolgens installeren we alles dat we nodig hebben met \shellinline{pip}. Dat werkt prima, want we mengen verder geen \shellinline{conda} met \shellinline{pip} packages. Het maken van conda packages valt daarmee buiten het bestek van deze cursus, al is dat een relatief kleine stap als je je standaard Python package af hebt.

We gaan Poetry bedienen door commando's te geven in de terminal van Visual Studio Code. We laten de terminal weten welk programma wij willen gaan besturen, door `poetry` in te typen. En daarachter wat we willen dat Poetry gaat doen. We kunnen informatie over Poetry opvragen met het commando `about`.

``` ps1con
poetry about
```

\begin{minopdracht}
    Open een terminal en vraag informatie over Poetry op met het commando \shellinline{poetry about}. Lees de tekst die Poetry aan je teruggeeft, waar kan je meer informatie vinden?
\end{minopdracht}

## Nieuw Poetry project
\begin{attention}
    We gaan werken met modules en packages. Ben je daar nog niet zo bekent mee, zorg dan dat je \secref{sec:modules} en \secref{sec:packages} gemaakt hebt.
\end{attention}
Stel je wilt een package schrijven met wat handige functies om veelgebruikte statistische berekeningen makkelijk uit te voeren. Je noemt het `easystat`. Het doel is eerst om het in al je eigen analyses makkelijk te kunnen gebruiken (`#!py import easystat`) maar je wilt het ook op GitHub zetten en wie weet vinden anderen het ook handig! Je wilt het dus ook _netjes_ doen. En niet later van anderen horen: <q>leuk, maar bij mij werkt het niet!</q>

\begin{minopdracht}
    Maak een nieuw Poetry project met de naam `easystat`, als volgt:
    \begin{enumerate}
        \item Open in Visual Studio Code een geschikte map\footnote{Bijvoorbeeld \folderpath{Documents/NSP2/Experimentautomatisering}} en open een terminal.
        \item Dan maken we met Poetry als volgt een nieuw project\footnote{We gaan het package opbouwen in de zogenaamde src-layout \cite{srclayout}. We maken het daarmee _expres_ iets moeilijker om vanuit een script je package te importeren. Je kunt dat dan alleen nog maar doen door het package zelf ook te _installeren_ (zoals andere gebruikers ook moeten doen) en daardoor loop je zelf tegen eventuele problemen aan. Werkt het uiteindelijk bij jou? Dan werkt het _ook_ bij andere mensen.} `easystat` aan:
        ``` ps1con
        PS> poetry new --src easystat
        Created package easystat in easystat
        ```
    \end{enumerate}
\end{minopdracht}

Er is nu de volgende structuur aangemaakt:

\begin{forest}
    for tree={grow'=0,folder,font=\ttfamily}
    [\githubrepo{easystat}
        [\filepath{README.md}]
        [\folderpath{tests}
            [\filepath{\_\_init\_\_.py}]
            [\filepath{test\_easystat.py}]
        ]
        [\folderpath{src}
            [\folderpath{easystat}
                [\filepath{\_\_init\_\_.py}]
            ]
        ]
        [\filepath{pyproject.toml}]
    ]
\end{forest}

Allereerst is er een projectmap `easystat` aangemaakt. Je kunt nu in GitHub Desktop deze map toevoegen als nieuwe repository, zoals we gedaan hebben in \opdref{opd:add_repository}.

Laten we één voor één kijken welke mappen en bestanden Poetry heeft aangemaakt. We zien een \filepath{README.md} in de projectmap staan. Hierin komt een algemene beschrijving van ons project.\footnote{Wanneer de repository op GitHub wordt geplaatst wordt deze README automatisch op de hoofdpagina van de repository getoond, onder de code.}

Daarna is er een map \folderpath{tests}. Goede software wordt getest. In deze map komen bestanden te staan die delen van de code runnen en resultaten vergelijken met verwachte resultaten -- zoals je kunt doen in \opdref{opd:test_package}.\footnote{Python heeft een ingebouwde module `#!py unittest` die deze tests kan vinden, kan runnen en daarna een handige weergave geeft van welke tests geslaagd zijn en welke faalden. Ook het package `#!py pytest` is erg bekend. Op deze manier weet je altijd zeker dat wanneer je aanpassingen doet in je code, dat de rest van de code nog steeds is blijven werken -- zónder dat je zelf uitvoerig alles hebt hoeven uitproberen. Je draait gewoon even snel alle tests. Helaas, helaas -- in deze cursus is te weinig tijd om het schrijven van tests te behandelen.}

Dan komt de \folderpath{src}-map. Daarin komt ons nieuwe package \folderpath{easystat}\footnote{Ja er is een map \folderpath{easystat} met daarin een map \folderpath{src} met daarin weer een map \folderpath{easystat} -- dat kan nog wel eens verwarrend zijn. Het is conventie om de projectmap dezelfde naam te geven als je package. Het pad is dus eigenlijk \folderpath{project/src/package} en dat wordt dan, in ons geval, \folderpath{easystat/src/easystat}.} te staan. Er is alvast voor ons een \filepath{\_\_init\_\_.py} aangemaakt. Handig!

En als laatste\ldots{} een \filepath{pyproject.toml}\footnote{Vroeger was er een `setup.py` maar Python schakelt nu langzaam over naar dit nieuwe bestand.} waarin alle informatie over je project wordt bijgehouden. Ook staat er in dit bestand informatie voor de verschillende tools die je kunt gebruiken. De inhoud van het bestand ziet er ongeveer zo uit:
\begin{textcode}
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
\end{textcode}

Het bestand is in het TOML-formaat \cite{TOML}. Tussen de vierkante haken staan de koppen van de verschillende secties in dit configuratiebestand. Overal zie je `poetry` terugkomen, want dat is de tool die wij gebruiken. In de eerste sectie staat informatie over ons project. Je kunt daar bijvoorbeeld een beschrijving toevoegen of het versienummer aanpassen. De tweede sectie bevat de _dependencies_. Dit zijn alle Pythonpackages die ons project nodig heeft. Op dit moment is dat alleen maar Python. Ook het versienummer van Python is belangrijk. Hier is dat 3.10 en het dakje geeft aan dat 3.11, 3.12, enz. ook prima zijn, maar 3.9 (te oud) 4.0 (te nieuw) _niet_. Dit kan belangrijk zijn. Gebruikers met een iets oudere versie van Python -- bijvoorbeeld versie 3.9 -- kunnen nu het package niet installeren. Als je niet per se de nieuwste snufjes van Python 3.10 nodig hebt kun je aangeven dat een iets oudere versie van Python ook prima is.

\begin{minopdracht}
    \begin{enumerate}
        \item Open het bestand \filepath{pyproject.toml}
        \item Verander bij de dependencies voor python `^3.10` in `^3.9`.
    \end{enumerate}

\end{minopdracht}


### Environment aanmaken

Bij het schrijven van een nieuw package is het zéker belangrijk om een environment te gebruiken. Anders loop je het risico dat je package _lijkt_ te werken maar bij iemand anders crasht. Immers, het kan best zijn dat jij NumPy gebruikt en al eerder geïnstalleerd had. Bij iemand die NumPy nog _niet_ geïnstalleerd had gaat het dan mis.

\begin{minopdracht}
    We maken -- speciaal voor `easystat` -- een environment.
    \begin{enumerate}
        \item Open in Visual Studio Code de _project_map \githubrepo{easystat}
        \item Open een terminal en maak een IK-easystat conda environment aan:
              ``` ps1con
              conda create -n IK-easystat python=3.9
              ```
        \item Selecteer dit nieuwe conda environment in Visual Studio Code.
    \end{enumerate}
\end{minopdracht}

### Maken van de easystat-package

We starten met ons package. Stel, we berekenen vaak de standaarddeviatie van het gemiddelde en maken daarvoor een handige <q>shortcut</q>.
\begin{minopdracht}
    Maak het bestand \filepath{src/easystat/shortcuts.py}:\footnote{Misschien is het je al opgevallen dat VS Code een oranje kringeltje onder `#!py numpy` zet in de eerste regel. Als je daar je muiscursor op plaatst krijg je een popup met de melding `Import <q>numpy</q> could not be resolved`. Daar moeten we misschien wat mee.}
    ``` py
    # src/easystat/shortcuts.py
    import numpy as np
    
    
    def stdev_of_mean(values):
        # Calculate the standard deviation of the mean
        return np.std(values) / np.sqrt(len(values))    
    ```
\end{minopdracht}


Nu willen we de package `easystat` importeren in een ander script zodat we de functie `stdev\_of\_mean` daar kunnen gebruiken. We maken een script om onze nieuwe code te testen.\footnote{Niet formeel. Dus hoewel we een script gaan plaatsen in de \folderpath{tests}-folder is het hier niet een test die automatisch gerunt kan worden.}

\begin{minopdracht}
    Maak het bestand \filepath{tests/try\_shortcuts.py}:
    ``` py
    # tests/try_shortcuts.py
    from easystat.shortcuts import stdev_of_mean

    print(f"{stdev_of_mean([1, 2, 2, 2, 3])=}")    
    ```
\end{minopdracht}

In de eerste regel importeren we de functie uit het nieuwe package om uit te proberen. In de laatste regel gebruiken we een handige functie van f-strings.\footnote{In f-strings kunnen tussen de accolades variabelen of functieaanroepen staan. Voeg daar het `=`-teken aan toe en je krijgt niet alleen de _waarde_, maar ook de variabele of aanroep zelf te zien. Bijvoorbeeld: als je definieert `#!py name = "Alice"`, dan geeft `#!py print(f"{name`")} als uitkomst `#!py Alice`. Maar voeg je het `=`-teken toe `#!py print(f"{name=`")} wordt de uitvoer `#!py name='Alice'`.}

\begin{minopdracht}
    Run \filepath{tests/try\_shortcuts.py} en kijk of het script het doet.
\end{minopdracht}

We krijgen de foutmelding:
``` py
ModuleNotFoundError: No module named 'easystat'
```
Dit konden we verwachten. We hebben ons package immers nog niet geïnstaleerd. Als we ons package gaan delen met andere mensen verwachten wij dat zij ons package ook gaan installeren, door dezelfde stappen te doorlopen als andere gebruikers komen we erachter of alles wel goed werkt.

### Installeren van een package
Het installeren van de package kan makkelijk met Poetry:
``` ps1con
PS> poetry install
Updating dependencies
Resolving dependencies... (0.1s)

Writing lock file

Installing the current project: easystat (0.1.0)
```

Poetry is even bezig en ons package is geïnstalleerd.

\begin{minopdracht}
    We draaien opnieuw de test, als volgt:
    \begin{enumerate}
        \item Installeer de easystat package met \shellinline{poetry install}.
        \item Draai \filepath{tests/try\_shortcuts.py} en controleer of het nu wel werkt.
    \end{enumerate}
\end{minopdracht}

Als we het testscript nu draaien krijgen we wéér een foutmelding:
``` py
ModuleNotFoundError: No module named 'numpy'
```
Ons package heeft NumPy nodig en dat hebben we nog niet geïnstalleerd. Dat kunnen we handmatig doen maar dan hebben andere gebruikers een probleem. Veel beter is het om netjes aan te geven dat ons package NumPy nodig heeft -- als _dependency_.


### Dependencies toevoegen

Om een dependency aan te geven vertellen we Poetry dat hij deze moet toevoegen met:
``` ps1con
PS> poetry add numpy
Using version ^1.23.2 for numpy

Updating dependencies
Resolving dependencies...

Writing lock file

Package operations: 1 install, 0 updates, 0 removals

  • Installing numpy (1.23.2)
```

\begin{minopdracht}
    We voegen de dependency toe en runnen opnieuw de test, als volgt:
    \begin{enumerate}
        \item Voeg numpy als dependency toe met \shellinline{poetry add numpy}.
        \item Draai \filepath{tests/try\_shortcuts.py} en bekijk de uitkomst.
    \end{enumerate}
\end{minopdracht}

Ditmaal krijgen we:
\begin{textcode}
    stdev_of_mean([1, 2, 2, 2, 3])=0.282842712474619
\end{textcode}
Fijn! Als je nu de \filepath{pyproject.toml} nog eens bekijkt zie je dat NumPy daar als dependency is toegevoegd. Het verwijderen van dependency `PACKAGE` gaat met \shellinline{poetry remove PACKAGE}. Poetry heeft Numpy nu toegevoegd aan de environment `IK-easystat`.\footnote{De lijst met packages in de active Conda enviornment vraag je in de terminal op met het \shellinline{conda list}, kijk maar of numpy daar tussen staat.} Andersom zal Conda geen packages toevoegen aan je Poetry project als je \shellinline{conda install package} aanroept. Gebruik daarom altijd \shellinline{poetry add package} als je met Poetry aan een package werkt.

\begin{info}
    Als we de code in ons package aanpassen dan hoeven we het niet opnieuw te installeren met Poetry, maar als we met de hand iets wijzigen in de \filepath{pyproject.toml} dan moet dat _wel_. Als je een `#!py ImportError` krijgt voor je eigen package -- bijvoorbeeld als je nieuwe mappen of bestanden hebt aangemaakt -- probeer dan _eerst_ voor de zekerheid \shellinline{poetry install}.
\end{info}

### Uitdaging: Poetry.lock
Na het toevoegen van Numpy is er ook een bestand \filepath{poetry.lock} bijgekomen. Hierin staan de exacte versies van alle geïnstalleerde packages. Vaak wordt dit bestand gecommit zodat collega-ontwikkelaars exact dezelfde versies installeren zodra ze \shellinline{poetry install} aanroepen. Om dat te proberen maken we even een schone conda environment:

\begin{bonusopdracht}
    \begin{enumerate}
        \item Maak een schone conda environment met \shellinline{PS> conda create -n IK-easystat python=3.9}
        \item Kies voor ja als Conda een waarschuwing geeft dat deze environment al bestaat en vraagt of je het bestaande environment wilt verwijderen.
        \item Draai \filepath{tests/try\_shortcuts.py} en bekijk de foutmelding.
    \end{enumerate}
\end{bonusopdracht}

We krijgen meteen foutmeldingen. Immers, we hebben nog niets geïnstalleerd.

\begin{bonusopdracht}
    \begin{enumerate}
        \item Installeer de `easystat` package.
        \item Waarvoor gebruikt Poetry de lock file (\filepath{poetry.lock)}?
        \item Draai \filepath{tests/try\_shortcuts.py} en bekijk de uitkomst.
    \end{enumerate}

\end{bonusopdracht}

% Installeren we nu de packages met Poetry dan zien we:
% ``` ps1con
%poetry install  
%     Installing dependencies from lock file

%     Package operations: 1 install, 0 updates, 0 removals

%       • Installing numpy (1.21.4)

%     Installing the current project: easystat (0.1.0)
% ```
% In de tweede regel geeft Poetry aan dat hij informatie uit de lock file gaat halen. Vervolgens wordt eerst Numpy geïnstalleerd en vervolgens ons package. Daarna werkt het testscript weer als vanouds.


### Uitdaging: Wheels
Wanneer we klaar zijn om ons package te delen met andere gebruikers gebruiken we het commando `build` om wheels te bouwen.

\begin{bonusopdracht}
    \begin{enumerate}
        \item Bouw het wheel van easystat met \shellinline{poetry build}.
        \item Bekijk de namen van de bestanden in de nieuwe map \folderpath{easystat/dist}, welke extensie hebben ze?
    \end{enumerate}
\end{bonusopdracht}

``` ps1con
PS> poetry build  
Building easystat (0.1.0)
    - Building sdist
    - Built easystat-0.1.0.tar.gz
    - Building wheel
    - Built easystat-0.1.0-py3-none-any.whl
```
Een <q>sdist</q> is een _source distribution_. Een `.tar.gz`-bestand is een soort zipbestand met daarin de broncode van ons pakket. De tests worden daar niet in meegenomen. Een <q>wheel</q> is een soort bestand dat direct geïnstalleerd kan worden met \shellinline{pip}. Zogenaamde _pure-python_ packages bevatten alleen Pythoncode -- en geen C-code die gecompileerd moet worden voor verschillende besturingssystemen of hardwareplatforms. Je herkent ze aan `none-any` in de bestandsnaam. <q>None</q> voor <q>niet-OS-specifiek</q> en <q>any</q> voor <q>draait op elk hardwareplatform</q>. We kunnen dit bestand als download neerzetten op een website of aan anderen mailen.

\begin{bonusopdracht}
    Laten we het wheel uitproberen. Maak een nieuwe conda environment aan, installeer het wheel en probeer het testscript te runnen -- één keer vóór het installeren van het wheel en één keer ná het installeren.
    \begin{enumerate}
        \item Maak een nieuwe conda environment aan met de naam `IK-test-wheel` en activeer deze.
              ``` ps1con
              PS> conda create -n IK-test-wheel python=3.9
              ...
              PS> conda activate IK-test-wheel
              ```
        \item Draai \filepath{tests/try\_shortcuts.py} en bekijk de foutmelding.
        \item installeer het wheel met \shellinline{pip install dist/easystat-0.1.0-py3-none-any.whl}.
        \item Draai \filepath{tests/try\_shortcuts.py} en bekijk de uitkomst.
    \end{enumerate}
\end{bonusopdracht}


% ``` ps1con
%conda create -n test-wheel python=3.9
%     ...
%conda activate test-wheel
%python tests/try_shortcuts.py
%     Traceback (most recent call last):
%       File "/Users/david/tmp/test-poetry/easystat/tests/try_shortcuts.py", line 1, in <module>
%         from easystat.shortcuts import stdev_of_mean
%     ModuleNotFoundError: No module named 'easystat'
%pip install dist/easystat-0.1.0-py3-none-any.whl
%     Processing ./dist/easystat-0.1.0-py3-none-any.whl
%     Collecting numpy<2.0.0,>=1.21.4
%       Using cached numpy-1.21.4-cp39-cp39-macosx_10_9_x86_64.whl (17.0 MB)
%     Installing collected packages: numpy, easystat
%     Successfully installed easystat-0.1.0 numpy-1.21.4
%python tests/try_shortcuts.py
%     stdev_of_mean([1, 2, 2, 2, 3])=0.282842712474619
% ```
Het werkt! Je ziet dat \shellinline{pip install} niet alleen ons package `easystat` installeert, maar _ook de dependency_ `numpy`. Dat is precies wat we willen.


## Poetry gebruiken voor een bestaand project

Met \shellinline{poetry new} start je een _nieuw_ project en maakt Poetry voor jou bestanden en mappen aan waarmee je aan de slag kunt. Maar vaak ben je al bezig met een project en wil je dat niet overschrijven. Ook is het een gedoe om een nieuw project te maken en daar je bestaande code in te kopieëren. Gelukkig kun je Poetry ook vertellen dat je al bezig bent en dat Poetry _alleen_ een \filepath{pyproject.toml}-bestand moet aanmaken. Dat doe je met:
``` ps1con
poetry init --no-interaction
```
Je geeft met \shellinline{poetry init} de opdracht om Poetry alleen te initialiseren en \shellinline{--no-interaction} voorkomt je dat je eerst honderd vragen krijgt over je project. Meestal kies je toch de standaardantwoorden.\footnote{Het is eenvoudig om zelf de \filepath{pyproject.toml} te openen en daar wat in aan te passen voor zover nodig.}

\begin{attention}
    Als je al bezig bent met een project dan werk je als het goed is al in een conda environment. Daar heb je dan met \shellinline{conda install} al packages geïnstalleerd die je nodig hebt. Het gebeurt dan makkelijk dat je vergeet om dat aan te geven met \shellinline{poetry add}. Dat betekent alleen dat als iemand anders je package installeert dat er dependencies missen en dat jouw code dus _niet_ werkt! Dit is makkelijk op te lossen. Zodra je Poetry gaat gebruiken _wis dan je environment en maak een nieuwe aan met alleen Python._ Dat gaat het makkelijkst als volgt. Stel dat je bezig bent in het environment `IK-pythondaq`. We maken dan een nieuw environment met dezelfde naam:
    ``` ps1con
    conda create -n IK-pythondaq python=3.9
    WARNING: A conda environment already exists at '/Users/david/opt/anaconda3/envs/IK-pythondaq'
    Remove existing environment (y/[n])? y

    ...
    ```
    Je overschrijft dus je huidige environment met een nieuwe, lege. Je kunt daarna met \shellinline{poetry add} packages toevoegen net zo lang tot je geen `#!py ImportError` meer krijgt.

    Merk op dat we nu niet gebruik hoeven te maken van de `conda-forge` channel. Python zelf staat in _alle_ kanalen en we gaan verder geen software installeren met conda, dus ook niet uit `conda-forge`.
\end{attention}

\begin{minopdracht}
    We gaan nu poetry gebruiken om van de scripts met de knipperende lichtjes uit \opdref{opd:knipperled} een package te maken én om ons environment te beheren. Voer de volgende stappen uit:
    \begin{enumerate}
        \item Maak in GitHub Desktop een _nieuwe_ repository \githubrepo{flasher}.
        \item Maak een map \folderpath{src} met daarin een map \folderpath{flasher}.
        \item Kopieer uit de \githubrepo{Oefenopdrachten} die je bij \opdref{opd:add_repository} hebt aangemaakt de drie scriptjes uit \opdref{opd:knipperled} naar \folderpath{src/flasher}.
        \item Open \githubrepo{flasher} in Visual Studio Code.
        \item Commit alles dat je tot nu toe gedaan hebt.
        \item Open een terminal. Maak een nieuwe conda environment met alleen python 3.9:
              ``` ps1con
              conda create -n IK-flasher python=3.9
              ```
              en maak dat actief in Visual Studio Code.
        \item Voer dan het volgende commando uit:
              ``` ps1con
              poetry init --no-interaction
              ```
              om een \filepath{pyproject.toml} aan te maken.
        \item Gebruik \shellinline{poetry add} om de dependencies van je script toe te voegen (welke Pythonpackages gebruik je?).\footnote{In ieder geval pyvisa-py, maar wat nog meer?}\footnote{Waarschijnlijk krijg je een foutmelding: No module named 'serial'. Met de vraag om Pyserial te installeren. Het conda package van pyvisa gaf zelf al pyserial op als dependency om te communiceren over USB. Nu we conda niet gebruiken moeten we dat handmatig doen.}
        \item Installeer je `flasher` package met \shellinline{poetry install}.
        \item Test de 3 scriptjes, werken ze allemaal nog?
    \end{enumerate}
\end{minopdracht}

## Poetry gebruiken voor pythondaq
Natuurlijk willen we Poetry ook gaan gebruiken bij `pythondaq`. Daarvoor moeten we twee dingen doen. Als eerste gaan we de `pythondaq` repository in een `src`-structuur zetten en daarna gaan we Poetry initialiseren.

\begin{attention}
    Vergeet niet -- waar nodig -- de \filepath{\_\_init\_\_.py} bestanden toe te voegen aan de packages.
\end{attention}

\begin{inleveropdracht}[Pythondaq: package]
    Zet \githubrepo{pythondaq} om in een src-structuur, als volgt, en vergeet niet na elke stap te committen:
    \begin{enumerate}
        \item Maak in \githubrepo{pythondaq} een map \folderpath{src} met daarin een map \folderpath{pythondaq}.
        \item Zet de model, view, controller scripts in de \folderpath{pythondaq} package zodat je onderstaande structuur krijgt:\\
              \begin{forest}
                for tree={grow'=0,folder,font=\ttfamily}
                [\githubrepo{pythondaq}
                    [\folderpath{src}
                        [\folderpath{pythondaq}
                            [\filepath{\_\_init\_\_.py}]
                            [\filepath{arduino\_device.py}]
                            [\filepath{diode\_experiment.py}]
                            [\filepath{view.py}]
                        ]
                    ]
                    [\filepath{README.md}]
                ]
              \end{forest}
        \item Test je \filepath{view.py} script.
    \end{enumerate}
\end{inleveropdracht}

\begin{bonusopdracht}
    In grotere projecten is het gebruikelijk om model, view, controller niet alleen uit te splitsen in verschillende scripts, maar ook in aparte packages te zetten.
    \begin{enumerate}
        \item Maak 3 extra packages in de \folderpath{pythondaq} package. \folderpath{models}, \folderpath{views} en \folderpath{controllers}.
        \item Zet de modules in de juiste packages.
        \item Test \filepath{view.py}. Waarschijnlijk krijg je import errors, los deze op totdat het werkt.
    \end{enumerate}
\end{bonusopdracht}

\begin{inleveropdracht}[Pythondaq: poetry]
    Gebruik Poetry om `pythondaq` als package te installeren, als volgt:
    \begin{enumerate}
        \item Ga in Visual Studio Code naar \githubrepo{pythondaq}. Open een terminal.
        \item Overschrijf je conda environment zodat hij weer leeg is (met alleen `python=3.9`).
        \item Initialiseer Poetry, zodat een \filepath{pyproject.toml} wordt aangemaakt.
        \item Installeer je package.
        \item Test je \filepath{view.py} script, terwijl je dependencies toevoegt die je in je scripts nodig hebt.
        \item Vergelijkbaar met \opdref{opd:test_package} is het verstandig om het importeren van onderdelen van het package te testen voordat we het verder gaan uitbouwen. Maak een \folderpath{tests}-map met \filepath{\_\_init\_\_.py} aan in hoofdmap van de repository zodat je onderstaande structuur krijgt:
              \begin{forest}
                for tree={grow'=0,folder,font=\ttfamily}
                [\githubrepo{pythondaq}
                    [\folderpath{src}
                        [\ldots]
                    ]
                    [\folderpath{tests}
                        [\filepath{\_\_init\_\_.py}]
                    ]
                    [\filepath{README.md}]
                ]
              \end{forest}
        \item Maak een script \filepath{tests/test\_imports.py} met de regel:
              ``` py
              import pythondaq.view
              ```
              en run het script. Overleg met elkaar hoe je de import-errors op moet lossen zodat alles werkt. Als dat gelukt is dan werkt je package ook als je het aanroept van buiten de map met broncode.
    \end{enumerate}
    Je \githubrepo{pythondaq}-repository is nu een volledig project dat je met andere gebruikers van Python kunt delen, bijvoorbeeld via een _wheel_. We gaan pythondaq in de komende hoofdstukken steeds verder uitbouwen.
\end{inleveropdracht}

## Van script naar applicatie
Om onze python code te testen heb je tot nu toe waarschijnlijk op de `run`-knop in Visual Studio Code gedrukt. Of je hebt in de terminal aan python gevraagd om het \filepath{script.py} te runnen:
``` ps1con
python script.py
```
Je moet dan wel de juiste map geopend hebben zodat python het bestand kan vinden. En als je de `run`-knop gebruikt moet wel het bestandje open hebben staan dat je wilt runnen. Kortom, best een beetje gedoe. Maar als we programma's zoals Poetry, Conda of Python willen gebruiken hoeven we helemaal niet het juiste bestandje op te zoeken en te runnen. We hoeven alleen maar een commando in de terminal te geven -- bijvoorbeeld \shellinline{python} of \shellinline{conda} -- en de computer start automatisch het juiste programma op.

Dat willen wij ook voor onze programma's! En omdat we Poetry gebruiken kunnen we dat heel eenvoudig doen. We gaan een commando toevoegen om de module uit te voeren die je in \secref{sec:modules} kunt vinden. De twee bestanden \filepath{square.py} en \filepath{just\_count.py} zijn netjes in een package geplaats in de nieuwe repository \githubrepo{just\_count}:

\begin{forest}
    for tree={grow'=0,folder,font=\ttfamily}
    [\githubrepo{just\_count}
        [\folderpath{src}
            [\folderpath{just\_count}
                [\filepath{\_\_init\_\_.py}]
                [\filepath{square.py}]
                [\filepath{just\_count.py}]
            ]
            [\folderpath{tests}
                [\filepath{\_\_init\_\_.py}]
            ]
        ]
        [\filepath{pyproject.toml}]
        [\filepath{README.md}]
    ]
\end{forest}

De bestanden \filepath{square.py} en \filepath{just\_count.py} zien er hetzelfde uit als in \secref{sec:modules}:
``` py
# square.py
def square(x):
    return x ** 2

if __name__ == "__main__":
    print(f"The square of 4 is {square(4)}")


# just_count.py
import square

print(f"The square of 5 is {square.square(5)}")  
```

We kunnen Poetry niet vragen om een script te runnen, maar wel om een functie uit te voeren.

\begin{minopdracht}
    \begin{enumerate}
        \item Ga naar \githubrepo{AnneliesVlaar/just\_count} en open de repository in GitHub desktop en daarna in Visual Studio Code.
        \item Maak een nieuwe conda environment met python 3.9, activeer deze en installeer de `just\_count` package.
        \item Open \filepath{src/just\_count/just\_count.py} en voeg een functie `#!py def main()` toe die de wortel van 5 print.
        ``` py
        # just_count.py
        from count_count.model import square
        
        def main():
            print(f"The square of 5 is {square.square(5)}")  
        ```
    We zetten daarmee de <q>body</q> van de module in een functie. Als je het script nu runt doet hij niets meer, want hij roept de functie `#!py main()` niet aan. Voeg een `#!py if __name__ == '__main__'`-statement toe waarin je de functie `#!py main()` aanroept. Als je het script runt, doet hij het weer.
    \end{enumerate}
\end{minopdracht}

In \filepath{pyproject.toml} kunnen we nu het commando toe gaan voegen. Met de `scripts`-tool van Poetry kunnen we aangeven met welk commando een functie uit een script wordt uitgevoerd. Om een commando toe te voegen ga je naar \filepath{pyproject.toml} en voeg je een extra kopje toe:
\begin{tomlcode}
    [tool.poetry.scripts]
    naam_commando = "package.module:naam_functie"
\end{tomlcode}
Om de wijzigingen aan \filepath{pyproject.toml} door te voeren moet je de package opnieuw installeren.

\begin{minopdracht}
    \begin{enumerate}
        \item Open \filepath{pyproject.toml} en voeg het kopje `[tool.poetry.scripts]` toe.
        \item Als naam voor het commando kiezen we `count`.
        \item Voor het gemak vullen we de rechterkant van het =-teken van rechts naar links in. Achter de dubbele punt komt de naam van de functie die uitgevoerd moet worden, dat is in ons geval `main`.
        \item De functie `main` staat in module \filepath{just\_count.py}. De module hebben we ondergebracht in de package \folderpath{just\_count}.
              \begin{tomlcode}
                  [tool.poetry.scripts]
                  count = "just_count.just_count:main"
              \end{tomlcode}
        \item Omdat we handmatig de toml-file hebben aangepast installeren we de package `just\_count` opnieuw met \shellinline{poetry install}.
    \end{enumerate}
\end{minopdracht}

\begin{minopdracht}
    \begin{enumerate}
        \item Type in de terminal het commando \shellinline{count}.
        \item Je krijgt nu een \shellinline{ModuleNotFoundError} voor de module square. Poetry zoekt vanuit de \folderpath{src}-map naar de packages en modules. Pas het importstatement in \filepath{just\_count.py} aan zodat het count commando werkt.   
        \item Activeer een andere conda environment en probeer het commando opnieuw; waarom werkt dit niet?
        \item Navigeer naar een andere map met python-scripts. Activeer de conda environment waar je `count\_count` hebt geïnstalleerd en test het commando.
    \end{enumerate}
\end{minopdracht}

\begin{minopdracht}
    \label{opd:Poetry_commando}
    Als extra oefening gaan we met Poetry een commando maken om een ander script uit te laten voeren. De package is al aangemaakt, maar werkt nog niet naar behoren. Los in de volgende opdrachten de errors op om het script \filepath{data\_analysis.py} te laten runnen.
    \begin{enumerate}
        \item Ga naar GitHub en open \githubrepo{AnneliesVlaar/Pr-erroranalysis} in GitHub Desktop en Visual Studio Code.
        \item Natuurlijk maak je gelijk een nieuwe Conda environment aan, voordat we dit package gaan testen.
        \item Snuffel door de bestanden en mappen, en open \filepath{src/erroranalysis/data\_analysis.py}. Dit is het script wat moet kunnen runnen.
        \item Run het script \filepath{data\_analysis.py} en los de errors één voor één op.
    \end{enumerate}
    Om erachter te komen of de problemen die we hierboven hadden écht zijn opgelost maak je een nieuwe Conda environment aan, installeer je het package en run je het script. Werkt alles? Mooi! Dan gaan we nu een commando aanmaken om de functie `#!py table()` aan te roepen.
    \begin{enumerate}
        \item Open \filepath{pyproject.toml} en voeg een kopje toe voor scripts.
              \begin{tomlcode}
                  [tool.poetry.scripts]
                  naam_commando = "package.module:naam_functie"
              \end{tomlcode}
              pas de regel aan zodat jouw commando de functie `#!py table()` aanroept in \filepath{src/erroranalysis/data\_analysis.py}. Je mag de naam van het commando zelf kiezen.
              %\item Typ onder het kopje een naam voor het commando.
              %\item Tussen aanhalingstekens type je de naam van het package (Oef, wat was dat ook al weer? In ieder geval de naam van een \folderpath{} mapje), gevolgd door een punt. Dan komt de naam van de module (Tsja, dat is altijd een \filepath{.py}-bestandje). Zet hier een :-dubbele punt. Daarachter de naam van de functie die moet worden uitgevoerd.
        \item Omdat we handmatig iets aan \filepath{pyproject.toml} hebben veranderd, gaan we de package opnieuw installeren.
        \item Ga naar de terminal en kijk of het werkt!
              ``` ps1con
              PS> naam_commando
              Area of the kitchen table is: 1.8386 ± 0.0049 m
              ```
    \end{enumerate}
\end{minopdracht}

\begin{inleveropdracht}[Pythondaq: applicatie]
    We gaan nu een commando maken voor \githubrepo{}{pythondaq}:
    \begin{enumerate}
        \item Schrijf een functie in \filepath{view.py} die je wilt uitvoeren als je het commando gaat aanroepen. Je kunt hierin de hele body van je script plaatsen.
        \item Voeg een commando aan \filepath{pyproject.toml} toe.
        \item Installeer het Poetry project en test het commando. Los eventuele errors op totdat het werkt.
        \item Open -- buiten Visual Studio Code -- een `Anaconda prompt` en test of jouw commando dan nog steeds werkt.\footnote{Activeer wel eerst de juiste conda environment.}.
    \end{enumerate}
\end{inleveropdracht}

Wat een feest! Je hebt nu een applicatie geschreven die een arduino aanstuurt om een ledje te laten branden. En je kunt je applicatie gewoon vanuit de terminal aanroepen.