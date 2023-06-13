# Gereedschap
\label{ch:gereedschap}

## Isolatie: virtual environments
\label{sec:virtual-envs}

Je hebt het vast al gemerkt: Anaconda is groot. Dat is gek, want Python is best klein. Anaconda bevat alleen veel meer dan Python. Anaconda is een Python_distributie_ en bevat een enorme verzameling aan packages. Je kunt zelf extra packages installeren met \shellinline{conda} of \shellinline{pip}. Je loopt dan mogelijk wel tegen problemen aan: packages hebben vaak zelf weer andere packages nodig. En regelmatig ook met een bepaalde versie. Dit kan een ingewikkeld netwerk worden waarbij het installeren van een nieuwe package óf heel lang duurt, óf niet kan vanwege een conflict,\footnote{Package A heeft B nodig met versie >= 1.1, maar package C heeft B nodig met versie 1.0. Nu kunnen package A en C dus niet tegelijkertijd geïnstalleerd worden.} óf <q>blind</q> gedaan wordt waarna sommige dingen niet meer willen werken. Alledrie is op te lossen door _virtual environments_ te gebruiken. Geïsoleerde omgevingen waarin (soms) een _eigen_ versie van Python draait met een _eigen_ -- veelal kleine -- collectie van packages. Je kunt environments aanmaken voor specifieke projecten bijvoorbeeld. Wellicht heb je bij NSP1 een environment aangemaakt om Jupyter Notebooks en een verzameling packages te installeren voor de data-analyse.


### Pip vs Conda

De package manager van Python is \shellinline{pip}. Je kunt hiermee alle Python packages installeren die bestaan uit _Python_ code. NumPy bijvoorbeeld bevat echter ook veel code geschreven in C. Die code moet eerst gecompileerd worden. Dat kan \shellinline{pip} óók doen, mits er een C compiler op je computer geïnstalleerd is. Via de Python package index kunnen gelukkig ook zogeheten _binary packages_ verspreid worden waarin de code al is gecompileerd. Er zijn dan losse packages voor Windows, MacOS en Linux. Meestal gaat dit goed, maar helaas niet altijd. Historisch waren NumPy maar vooral ook SciPy een flink probleem. Ook het gebruik van grafische bibliotheken ging vaak moeizaam. Dan was het package wel geïnstalleerd, maar riep hij dat hij systeembibliotheken niet kon vinden. Heel vervelend.

Een ander probleem van \shellinline{pip} is dat deze -- tot voor kort -- geen controle deed op de versies van al geïnstalleerde pakketten. Je kon dus packages installeren die nieuwe versies binnenhaalden van andere packages, waarna al _eerder_ geïnstalleerde packages soms stopten met werken.

Om die reden is \shellinline{conda} in het leven geroepen. Conda installeert alleen binary packages, kan naast Python packages ook systeembibliotheken installeren als dat nodig is én doet een uitgebreide controle op alle versies van te installeren en al eerder geïnstalleerde packages zodat alles altijd blijft werken. Nadeel is dat die controle nogal lang kan duren als je al veel geïnstalleerd hebt. Omdat je met \shellinline{conda} dus _wel_ heel makkelijk uitgebreide wetenschappelijke packages kon installeren met een mix van Python-, C-, of zelfs Fortrancode is \shellinline{conda} (en Anaconda, de distributie) heel populair geworden in de wetenschappelijke wereld. Om die reden gebruiken we in deze cursus ook Anaconda / \shellinline{conda}.


### Conda environments
\label{sec:conda-envs}

Er zijn verschillende tools voor het aanmaken van environments voor Python. Allemaal hebben ze hun voor- en nadelen. Langzamerhand blijven de populairste over. De <q>officiële</q> is `#!py venv`, maar op dit moment niet de meest populaire. Binnen een groot deel van de wetenschappelijke gemeenschap is \shellinline{conda} de standaardkeuze. Het voordeel van \shellinline{conda} ten opzichte van veel andere tools is dat je verschillende environments kunt maken met verschillende versies van Python. Ideaal om te testen of je code ook werkt met de allernieuwste Pythonversie of juist met wat oudere versies.

Je moet je realiseren dat het aanmaken (en weggooien) van een environment heel makkelijk is. Doe dat regelmatig zodat je scherp houdt welke packages je nu echt nodig hebt voor je analyse of voor de software die je schrijft. Hieronder geven we een overzicht van de meest gebruikte commando's om met conda environments te werken.

\begin{info}
    Conda installeert packages vanuit verschillende _channels_. De `defaults` channel bevat packages die af en toe door Anaconda worden getest en samengenomen tot een distributie (versie `2021.05` bijvoorbeeld). Er zijn weinig updates. De `conda-forge` channel bevat alle nieuwste versies van die packages en bevat ook software die (nog) niet in de `defaults` channel terecht is gekomen. De conda-forge channel is daarom erg populair.
\end{info}

Hieronder volgen enkele voorbeelden van het gebruik van conda:
``` ps1con
Leeg environment aanmaken met naam 'daq'
PS> conda create -n daq

Nieuw environment aanmaken met Python versie 3.9
PS> conda create -n daq python=3.9

Packages installeren vanuit de 'conda-forge' channel en nieuwste Python
Als het environment al bestaat vraagt hij of hij die moet overschrijven met een nieuwe schone versie
PS> conda create -n daq -c conda-forge python

Environment activeren
PS> conda activate daq

Environment deactiveren
PS> conda deactivate

Environment wissen
PS> conda env remove -n daq

Lijst van environments bekijken
PS> conda env list

Nieuw pakket installeren vanuit de conda-forge channel in het ACTIEVE environment
PS> conda install -c conda-forge lmfit

Nieuw environment voor NSP2 met notebooks voor analyse en fits
PS> conda create -n nsp2 -c conda-forge notebook pandas matplotlib lmfit

Package pandas updaten naar nieuwe versie in het ACTIEVE environment
PS> conda update -c conda-forge pandas

Alle packages updaten naar nieuwe versie in het ACTIEVE environment
PS> conda update -c conda-forge --all
```

Als je scripts schrijft in Visual Studio Code wil je dat ze ook runnen in de omgevingen die je net hebt aangemaakt. Als je in Visual Studio Code een python script opent dan geeft het linksonder, in de blauwe statusbalk, de huidige Pythonomgeving aan:
\begin{center}
    \includegraphics[scale=.75]{figures/screenshot-vscode-python-env}
\end{center}
Als je daarop klikt\footnote{Of: \menu{View > Command Palette > Python: Select Interpreter}.} kun je door de lijst met Pythonomgevingen scrollen. Kies de omgeving die je wilt gebruiken. _Let op:_ als je het environment net hebt aangemaakt dan staat hij er nog niet tussen. Klik dan rechtsbovenin eerst op het \menu{\faRedo\ Refresh Interpeter list}-knopje. Bijvoorbeeld:
\begin{center}
    \includegraphics[scale=.75]{figures/screenshot-vscode-python-env-daq}
\end{center}
Sluit alle <q>oude</q> terminals met het \faTrash*-icoon als je je muis aan de rechterkant over de namen van de terminals beweegt of in één keer met \menu{View > Command Palette > Terminal: Kill All Terminals}. Alle nieuwe terminals die je opent zullen de nieuw geselecteerde conda environment actief maken. Wanneer je nu je Pythoncode draait dan is dat binnen deze omgeving. Het kan wel zijn dat hij opeens klaagt over packages die niet geïnstalleerd zijn omdat je dat -- in _die_ omgeving -- nog niet had gedaan. Geen probleem: installeer ze dan.


### Pipx

Pythonapplicaties, zoals \shellinline{conda}, worden geïnstalleerd als commando dat je kunt aanroepen vanaf de command-line. Maar het _is_ een Pythonapplicatie. En dat betekent dat als je van omgeving wisselt, dat de applicatie niet meer beschikbaar is. Ook kan het gebeuren dat je packages update of verwijdert waardoor de applicatie niet meer werkt. Met \shellinline{pipx} is het mogelijk om dit soort applicaties in een _eigen_ virtual environment te installeren. Je loopt geen risico dat je ze stukmaakt _en_ ze zijn beschikbaar vanuit andere virtual environments. In plaats van:
``` ps1con
pip install PACKAGE
```
doe je straks
``` ps1con
pipx install PACKAGE
```
Met \shellinline{pipx list} bekijk je dan een lijst van geïnstalleerde pakketten.
Je installeert \shellinline{pipx} met:
``` ps1con
python -m pip install --user pipx
python -m pipx ensurepath
```
Herstart je terminal en test of het commando \shellinline{pipx} werkt. Zo niet, dan zul je volledig uit moeten loggen en weer in moeten loggen om de shellomgeving opnieuw te laden.


\subsubsection{Black}

Eén van de tools die problemen kunnen geven wanneer je van environment wisselt is \shellinline{black}. Misschien heb je bij het aanmaken van de environment voor deze cursus in \opdref{opd:condaenv} gemerkt dat Visual Studio Code soms klaagt dat \shellinline{black} niet geïnstalleerd is. Het is lastig als je black in ieder environment moet installeren én het is lastig dat je schone environment al snel <q>vervuild</q> raakt met een tool en alle bijbehorende dependencies die niets te maken hebben met jouw project. Daarom installeren we \shellinline{black} graag via \shellinline{pipx}.

\begin{minopdracht}
    Voer het volgende uit:
    \begin{enumerate}
        \item Installeer \shellinline{black} via \shellinline{pipx}
        \item Run \shellinline{pipx list} en let op de directory die genoemd is na: `apps are exposed on your \$PATH at`. Bijvoorbeeld: `/Users/david/.local/bin`.
        \item In Visual Studio Code, ga naar \menu{Code} onder MacOS of \menu{File} onder Windows en dan naar \menu{Preferences > Settings > Python Formatting: Black Path}. Vul de directorynaam in gevolgd door `black`. Bijvoorbeeld: `/Users/david/.local/bin/black`.
        \item Open een Pythonbestand en type:
              ``` py
              l = [1,
              2, 3, 4]
              ```
              Sla het bestand op en controleer of \shellinline{black} werkt. Je zou dan `#!py l = [1, 2, 3, 4]` moeten krijgen.
    \end{enumerate}
\end{minopdracht}