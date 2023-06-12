\chapter{Command-line interface}
\section{Gebruikersomgevingen}

Vanaf de jaren '60 van de vorige eeuw werden computers \emph{interactief}. Het was mogelijk om via een \emph{terminal} commando's aan de computer te geven en te wachten op een antwoord. In tegenstelling tot moderne gebruikersomgevingen waren deze volledig op tekst gebaseerd. Hoewel moderne besturingssystemen -- of het nu computers, tablets of mobiele telefoons betreft -- volledig grafisch zijn ingericht, is de tekstuele interface nooit verdwenen. Opdrachten geven door te typen is gewoon best wel handig en snel. Ook is het veel eenvoudiger om applicaties te ontwikkelen zonder grafische interface.

Op ieder besturingssysteem -- Linux, MacOS, Windows -- is een \emph{shell}, \emph{terminal} of \emph{command prompt} te vinden. Als je die opstart kun je op de zogeheten \emph{command line} opdrachten intypen. Veelal zijn dit commando's om het bestandssysteem te navigeren en programma's op te starten.

Wanneer je in Visual Studio Code een Python script start dan opent het een terminal onderin het scherm.

\subsection{Commando's}

Je hebt tot nu toe al heel wat commando's in de terminal getypt. Laten we een paar voorbeelden bestuderen:
\begin{ps1concode}
    PS> python script.py
\end{ps1concode}
Als eerste vertel je welke applicatie je wilt gaan starten; in dit geval: \texttt{python}. Daarna geef je met het \emph{argument} \texttt{script.py} aan welk Pythonscript je wilt uitvoeren. Vaak kun je ook \emph{opties} meegeven zoals in:
\begin{ps1concode}
    PS> python -V
    Python 3.9.13
\end{ps1concode}
Hiermee vraag je Python om het versienummer weer te geven. Soms kunnen \emph{opties} zelf weer een \emph{argument} meekrijgen. Bijvoorbeeld:
\begin{ps1concode}
    PS> python -m antigravity
\end{ps1concode}
Met deze regel geef je Python de optie \texttt{-m} en die importeert een module (hier \texttt{antigravity}) en voert die uit. Probeer maar eens zelf wat er gebeurt als je dat commando uitvoert.

Als applicaties veel verschillende functionaliteit hebben dan krijg je regelmatig te maken met een lange regel met een combinatie van argumenten en opties:
\begin{ps1concode}
    PS> conda create -n IK-pythondaq -c conda-forge python pyvisa-py
\end{ps1concode}
Uitgesplitst in \textit{argumenten} en \textbf{opties}, met vierkante haken [] om aan te geven welke onderdelen bij elkaar horen, is dat:
\begin{quote}
    conda \textit{create} [\textbf{-n} \textit{IK-pythondaq}] [\textbf{-c} \textit{conda-forge}] [\textit{python pyvisa-py}]
\end{quote}


\begin{minopdracht}
    \begin{enumerate}
        \item Naast \shellinline{conda create} heb je ook met andere argumenten gewerkt zoals \texttt{activate} en \texttt{install}. Welke argumenten ken je al van de applicatie \texttt{poetry}?
        \item Vraag de lijst met argumenten (commando's) op van Poetry met \shellinline{poetry list}, hoeveel kende je nog niet?
    \end{enumerate}


\end{minopdracht}

\subsection{Click}
Als we gebruik willen maken van commando's in onze eigen applicatie moeten we weten wat de gebruiker in de terminal typt. Dit is mogelijk met \texttt{sys.argv}.\footnote{argv staat voor: argument vector, een lijst met argumenten}

\begin{pythoncode}
# cli.py

import sys

print(sys.argv)
\end{pythoncode}

Alles wat we in de terminal typen wordt aan input meegegeven:
\begin{ps1concode}
    PS> python  cli.py test 123   
    ['cli.py', 'test', '123']
\end{ps1concode}

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

Als je meerdere opties en argumenten meegeeft dan wordt het veel werk om die in je script uit elkaar te plukken en ze goed te interpreteren. Om dat makkelijker te maken zijn er verschillende bibliotheken beschikbaar -- waaronder een paar in de \emph{standard library}. Een hele handige -- die níet in de \emph{standard library} zit maar wél meegeleverd is met Anaconda -- is Click \cite{click}.

\begin{info}
    Click maakt gebruik van \emph{decorators} (\pythoninline{@decorator}). Om decorators te \emph{gebruiken}, hoef je niet per se te weten hoe ze \emph{werken}. Als je meer wilt weten over de werking ervan lees dan \secref{sec:decorators}.
\end{info}

Als kort voorbeeld -- geïnspireerd op de documentatie van Click -- nemen we het volgende script:
\begin{pythoncode}
# hello.py

def hello():
    print("Hello physicist!")

if __name__ == "__main__":
    hello()
\end{pythoncode}

Dit script print de uitdrukking "Hello physicist!". We gaan dit aanpassen en maken het mogelijk om de naam en het aantal begroetingen te kiezen. Hiervoor gebruiken we Click. Allereerst moeten we \pythoninline{click} importeren en aangeven dat we de \pythoninline{hello()}-functie willen gebruiken als \emph{commando}:

\begin{pythoncode*}{highlightlines={5}}
# hello.py

import click

@click.command()
def hello():
    print("Hello physicist!")

if __name__ == "__main__":
    hello()
\end{pythoncode*}

Dit levert ons nog niet zoveel op, maar op de achtergrond is click wel degelijk aan het werk. De \pythoninline{@click.command()} houdt in de gaten wat er in de command line wordt ingetypt. Zo kunnen we de helpfunctie aanroepen door \shellinline{--help} achter de naam van het script te zetten.

\begin{ps1concode}
    PS> python hello.py --help
\end{ps1concode}

\begin{minopdracht}
    \label{opd:hello-help}
    Neem het script \filepath{hello.py} over en vraag de helpfunctie op. Test dit met én zonder \pythoninline{@click.command()}.
\end{minopdracht}

\begin{minopdracht}
    Laten we zorgen dat we een naam als argument mee kunnen geven.
    \begin{enumerate}
        \item In de code hieronder geven we met de regel \pythoninline{@click.argument("name")} aan dat we van de gebruiker een argument verwachten. Zorg dat het argument ook gebruikt wordt in de functie \texttt{hello}:
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
        \item Draai \filepath{hello.py} eerst zonder een argument \shellinline{python hello.py} en bekijk de foutmelding.
        \item Draai \filepath{hello.py} nu met een argument: \shellinline{python hello.py Alice}.
    \end{enumerate}
\end{minopdracht}

\begin{warning}
    Let er op dat je bij \pythoninline{@click.argument} de naam meegeeft die overeen komt met de namen van de parameters van je functie. In ons geval hebben we een argument \pythoninline{"name"}. Dit moet overeenkomen met de functiedefinitie \pythoninline{def hello(name)}.
\end{warning}

% Als we dit script nu runnen \emph{zonder} argument krijgen we een foutmelding:
% \begin{ps1concode}
% PS> python hello.py
% Usage: hello.py [OPTIONS] NAME
% Try 'hello.py --help' for help.

% Error: Missing argument 'NAME'.
% \end{ps1concode}
% maar \emph{met} argument krijgen we dit:

% \begin{ps1concode}
% PS> python hello.py Alice
% Hello Alice!
% \end{ps1concode}


Argumenten zijn altijd verplicht en moeten in een vaste volgorde staan. Bij \emph{opties} is dat anders. Je geeft met mintekens aan dat je een optie meegeeft. Veel opties hebben een lange naam en een afkorting (bijvoorbeeld \shellinline{--count} en \shellinline{-c}). Opties kunnen zelf weer een argument hebben (bijvoorbeeld \shellinline{--count 3}). Opties zonder argument werken als vlag -- een soort aan/uitknop.\footnote{Gebruik forward slash om een vlaggetje te maken: \pythoninline{@click.option("-f", "--flag/--no-flag}} Het is handig om een standaardwaarde te definiëren. In dat geval mag de gebruiker de optie weglaten. We voegen een for-loop\footnote{Merk op in de code hieronder: \pythoninline{_} is de weggooivariabele in Python. Het gaat ons erom dat de lus een aantal keer doorlopen wordt en we hoeven niets te doen met de loop index.} toe om de begroeting te herhalen.

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

\begin{minopdracht}
    Neem bovenstaande pythoncode over en test \filepath{hello.py}. Kun je 5 keer een begroeting printen met de naam van je assistent?
\end{minopdracht}

\begin{warning}
    Let er op dat je bij \pythoninline{@click.option} de afkorting met 1 minteken meegeeft en de lange naam met 2 mintekens. De lange naam moet overeenkomen met de paramater van je functie. In ons geval hebben we een optie \pythoninline{"--count"} -- de lange naam telt. Dit moet overeenkomen met de functiedefinitie \pythoninline{def hello(name, count)}.
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

\begin{minopdracht}
    Voeg de helptekst toe en vraag de helptekst op zoals in \opdref{opd:hello-help}.
\end{minopdracht}

Als je dit script gebruikt ziet dat er zo uit:

\begin{ps1concode}
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
\end{ps1concode}


\begin{minopdracht}
    \label{opd:hello-pauze}
    Breid het bovenstaande script \texttt{hello.py} uit met een optie om een korte pauze in te lassen na het printen van ieder \pythoninline{print()}-statement. Een pauze kun je inlassen met \pythoninline{time.sleep()}. Zorg er voor dat er zonder die optie géén pauze is en dat je met de optie kunt kiezen hoe lang er gewacht moet worden.
\end{minopdracht}

\begin{bonusopdracht}
    Gebruik een optie als vlag om de gebruiker te laten kiezen tussen `hello' of `goodbye'. Zorg dat er standaard `hello' wordt geprint.
\end{bonusopdracht}

\begin{minopdracht}
    Bij \opdref{opd:Poetry_commando} heb je een applicatie gemaakt om de oppervlakte van een tafel te berekenen met de bijbehorende onzekerheid. In deze opdracht gaan we het script uitbreiden om de lengte en de breedte én de onzekerheid daarop als argument of optie mee te geven op de command line. Voer de volgende stappen uit:
    \begin{enumerate}
        \item Maak een schone environment aan en installeer de applicatie (doet alles het nog?)
        \item Voeg click toe en pas het script aan zodat je de lengte zelf kan kiezen.\footnote{Click maakt van alle argumenten een string, tenzij je een default waarde of een type definieerd. Gebruik \pythoninline{type=int}, \pythoninline{type=float} enzovoorts om aan te geven wat voor type object het argument moet worden}
        \item Test de applicatie.
        \item Voeg ook opties of argumenten toe om de breedte en de onzekerheden mee te geven. Wanneer kies je in het script voor een optie en wanneer voor een argument?
        \item Maak de applicatie compleet met helpteksten en default waardes.
    \end{enumerate}
\end{minopdracht}

\subsection{Click subcommando's}
Tot nu toe konden we maar één functie uitvoeren in onze applicatie. Maar het is ook mogelijk om subcommando's aan te maken zodat je met één programma meerdere `taken' kunt uitvoeren. Denk bijvoorbeeld aan \shellinline{conda}. Je installeert packages met \shellinline{conda install}, verwijdert ze met \shellinline{conda remove}, maakt een environment met \shellinline{conda create} en activeert het met \shellinline{conda activate}.

\begin{minopdracht}
    \label{opd:subcommandos}
    Je gaat de \texttt{pythondaq} applicatie straks verder uitbreiden zodat er veel meer mogelijk is dan nu. Wat zou je willen dat de applicatie allemaal kan? Welke subcommando's wil je gaan aanmaken? Overleg met elkaar om goede ideeën uit te wisselen.
\end{minopdracht}


Een eenvoudig voorbeeldscript waarin de conda commando's \texttt{install} en \texttt{remove} worden nagebootst leggen we hieronder uit. Eerst de code:

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
In (de laatste) regel 20 roepen we de hoofdfunctie aan die we enigszins willekeurig \pythoninline{cmd_group()} genoemd hebben en die we bovenaan definiëren. In tegenstelling tot het \filepath{hello.py}-script doet deze functie helemaal niets (\pythoninline{pass}). We vertellen aan click dat we een groep van commando's aan gaan maken met de \pythoninline{@click.group()}-decorator in regel 5. Vervolgens gaan we commando's binnen deze groep hangen door \emph{niet} de decorator \pythoninline{@click.command()} te gebruiken, maar \pythoninline{@cmd_group.command()} -- zie regels 9 en 14. De namen van de commando's die worden aangemaakt zijn de namen van de functies. Dus regel 9 en 11 maken samen het commando \texttt{install}. Verder werkt alles hetzelfde. Dus een argument toevoegen -- zoals in regel 10 -- is gewoon met \pythoninline{@click.argument()}. Hier hoef je geen \pythoninline{cmd_group} te gebruiken.

\begin{warning}
    \label{warn:cmd_name}
    Omdat de naam van een subcommando gelijk is aan de functienaam kan dat voor problemen zorgen wanneer je gereserveerde namen van python wilt gebruiken zoals: \pythoninline{import}, \pythoninline{return}, \pythoninline{lambda}. Of wanneer je de naam van het subcommando graag hetzelfde wilt hebben als een ander pythonfunctie zoals \pythoninline{sin} of \pythoninline{list}.
    Een oplossing is om de functienaam aan te passen en de subcommando naam expliciet aan click mee te geven bij \texttt{command}:
    \begin{pythoncode}
        @cmd_group.command("import")
        @click.argument("package")
        def import_package(package):
            print(f"import {package}...")
    \end{pythoncode}
    We hebben nu een commando \texttt{import} aangemaakt -- \emph{niet} een commando \texttt{import\_package}.
\end{warning}

\begin{minopdracht}
    Hieronder zie je \filepath{pyproject.toml} van fake-conda:
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
    \begin{ps1concode}
        PS> fake_conda install scipy
        Installing scipy...
    \end{ps1concode}
\end{minopdracht}

\begin{bonusopdracht}[Smallangle (uitdaging)]
    Met deze opdracht kun je testen hoe goed je het Python-jargon onder de knie hebt. Je zult het woord `smallangle' zó vaak tegenkomen dat het je duizelt -- maar jij weet precies over welk onderdeel we het hebben.
    \begin{enumerate}
        \item Maak een nieuw poetry project (met een \texttt{src} indeling) aan met de naam \githubrepo{smallangle}.
        \item Maak een nieuw environment die \texttt{IK-smallangle} heet met daarin alleen Python.
        \item Zet in de package \folderpath{smallangle} een module \filepath{smallangle.py}.
        \item Plak de onderstaande code in \filepath{smallangle.py}:
              \begin{pythoncode}
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
        \end{pythoncode}
        \item Ga door naar \opdref{opd:smallangle} stap 2. Je mag stap 1 overslaan -- dat werk heb je nu zelf al gedaan.
    \end{enumerate}
\end{bonusopdracht}

\begin{inleveropdracht}[smallangle]
    \label{opd:smallangle}
    Het project \githubrepo{smallangle} wordt met Poetry beheerd. Je gaat click aan de module \filepath{smallangle.py} toevoegen zodat je met subcommando's, argumenten en/of opties kunt werken. Tot slot maak je van smallangle een applicatie die je in de terminal kunt aanroepen.
    \begin{enumerate}
        \item Ga naar GitHub en open \githubrepo{AnneliesVlaar / smallangle} in GitHub Desktop en Visual Studio Code.
        \item Installeer de package in een nieuw environment.
        \item Run het script \filepath{smallangle.py} en los de errors op totdat het werkt.
        \item Voeg click toe zodat je de subcommando's \verb|sin| en \verb|tan| hebt. Het aantal stappen (het aantal $x$-waardes tussen 0 en $2\pi$) moet gekozen kunnen worden met een optie (geef een standaardwaarde mee, zodat de gebruiker de optie kan weglaten).
        \item Zorg dat smallangle een applicatie wordt die je aan kunt roepen met bijvoorbeeld \shellinline{smallangle sin -n 9}.
    \end{enumerate}
\end{inleveropdracht}

\begin{bonusopdracht}[Smallangle (uitdaging)]
    Met het commando \verb|approx| en een argument $\epsilon$ moet het script de grootste hoek geven waarvoor nog geldt dat $\abs{x - \sin(x)} \leq \epsilon$, ofwel de grootste hoek waarvoor de kleine-hoekbenadering nog geldt met de opgegeven nauwkeurigheid. Doe dit op drie cijfers nauwkeurig (loop over \numlist{.000;.001;.002}, etc. totdat de vergelijking niet meer geldt). N.B. besteed geen tijd aan het analytisch oplossen van de vergelijking. Een voorbeeld van de uitvoer:
    \begin{ps1concode}
        PS> smallangle approx .1
        For an accuracy of 0.1, the small-angle approximation holds
        up to x = 0.854.
    \end{ps1concode}
\end{bonusopdracht}

\section{Docstrings}
Documentatie is vaak een onderschoven kindje, maar is ontzettend belangrijk. Als je zelf informatie opzoekt over bijvoorbeeld een voor jou onbekende Pythonbibliotheek dan vind je het heel fijn als er een duidelijke tutorial is. Als je code schrijft die ook door andere mensen gebruikt moet worden is documentatie nodig. Als de code langer mee moet gaan dan zeg een paar weken, dan helemaal. Want over een paar weken ben jij \emph{zelf} een ander persoon. Hoe vervelend het ook is, code die je nota bene zelf geschreven hebt is over een paar weken niet meer glashelder. Je zult dan moeten uitzoeken hoe je ook alweer iets hebt gedaan of wat de gedachte erachter was.

Tot nu toe heb je waarschijnlijk gebruik gemaakt van \pythoninline{#stukjes commentaar} om duidelijk te maken wat je code doet. Maar als je de applicatie aan het gebruiken bent en je wilt weten wat een bepaalde functie eigenlijk doet, moet je dus de code induiken op zoek naar de betreffende functie. Met \emph{docstrings} -- documentatiestrings -- is dat verleden tijd. De documentatie over een functie kan automatisch gegenereerd worden vanuit je code met behulp van de docstring. Docstrings staat tussen 3 dubbele aanhalingstekens en hebben doorgaans een vaste structuur:\footnote{Die vaste structuur wordt niet door Python afgedwongen, maar is een goed gebruik. Er worden verschillende stijlen gebruikt. Eén van de meest gebruikte stijlen is door programmeurs van Google bedacht \parencite{google_style_guide}.}

\begin{pythoncode}
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
\end{pythoncode}
De eerste regel geeft een korte samenvatting weer, na de witregel komt een langere samenvatting. Met \texttt{Args:} worden alle argumenten opgesomd die aan de functie worden meegegeven en \texttt{Returns:} geeft aan wat de functie teruggeeft. We kunnen de documentatie van deze functie opvragen met: \pythoninline{help(integers_up_to}. Dat geeft het volgende resultaat:
\begin{ps1concode}
    PS> python integers_up_to.py 
        Help on function integers_up_to in module __main__:
        
        integers_up_to(number)
            List integers up to a given number.
        
            Args:
                number (int): list integers up to this number
        
            Returns:
                list: containing the integers
\end{ps1concode}
Je zult niet altijd de \pythoninline{help()} functie gebruiken misschien, maar gebruik zoveel mogelijk docstrings -- ze helpen ook enorm als je de code leest. Het is extra werk maar het verdient zich dubbel en dwars terug. Je hoeft geen proza te schrijven, maar wees duidelijk. Lees voor meer voorbeelden bijvoorbeeld de \citetitle{google_style_guide} \parencite{google_style_guide}.


\subsection{Docstring generator}

Om het gemakkelijker te maken om docstrings ook écht te gaan schrijven, zijn er docstring generators ontwikkeld. Voor Visual Studio Code is er de extensie \citetitle{AutoDocstring} \parencite{AutoDocstring}.

\begin{minopdracht}
    Kijk in Visual Studio Code bij extensions hoe je AutoDocstring kunt gebruiken. Kies daarvoor in de linkerkantlijn het goede icoon voor \emph{extensions} en selecteer dan de \texttt{autoDocstring} extensie. Zoek in de documentatie naar hoe je automatisch (een deel van) de docstring genereert.
\end{minopdracht}

Wanneer we voor de functie \pythoninline{integers_up_to()} de docstring generator gebruiken, krijgen we het volgende:
\begin{pythoncode}
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
\end{pythoncode}

Zo kunnen we gemakkelijk alles gaan invullen. Vergeet niet om de docstring aan te vullen als je een functie aanpast.


\subsection{Docstrings en Click \texttt{-{}-help}}

Docstrings werken ook heel handig samen met Click want ze worden gebruikt als we de helpfunctie aanroepen. We voegen docstrings toe aan fake-conda:

\begin{pythoncode}
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
\end{pythoncode}
Als we vervolgens de help functie aanroepen zien we de eerste regel van de docstrings verschijnen voor alle subcommando's:
\begin{ps1concode}
    PS> fake_conda --help
    Usage: fake_conda [OPTIONS] COMMAND [ARGS]...
    
    Options:
      --help  Show this message and exit.
    
    Commands:
      install  Install a conda package.
      remove   Remove a conda package.
\end{ps1concode}
Daarna kun je uitleg vragen voor de subcommando's waarbij je de hele docstring te zien krijgt:
\begin{ps1concode}
    PS> fake_conda install --help
    Usage: fakeconda.py install [OPTIONS] PACKAGE

      Install a conda package.

      Args:     package (string): name of the package

    Options:
      --help  Show this message and exit.
\end{ps1concode}

\begin{inleveropdracht}[Smallangle: docstring]
    Voorzie de functies in \filepath{smallangle.py} die je gemaakt hebt bij \opdref{opd:smallangle} volledig van docstrings, zodat \shellinline{smallangle --help} zinvolle informatie geeft.\footnote{Als de docstring zeer uitgebreid wordt met meerdere argumenten dan wordt de helptekst van click onoverzichtelijk. Als je wilt dat alleen de korte samenvatting in de help verschijnt, zet dan na de korte samenvatting: \pythoninline{\f}.}
\end{inleveropdracht}

\begin{inleveropdracht}[Pythondaq: docstring]
    \begin{enumerate}
        \item Pak de \texttt{pythondaq} applicatie erbij. Zet bij \emph{alle} functies een nuttige docstring.
        \item Schrijf ook docstrings voor de classes die je gemaakt hebt.
    \end{enumerate}
\end{inleveropdracht}

\subsection{Uitdaging: Documentatie met \emph{Sphinx}}
Een bijkomend voordeel van docstrings is dat ze gebruikt kunnen worden om automatisch documentatie te genereren voor een heel project met behulp van Sphinx.
\emph{Sphinx} is een Python documentatie generator. Het is de meestgebruikte manier om documentatie te schrijven voor Python projecten. Een paar voorbeelden zijn bijvoorbeeld het web framework \emph{Django} \cite{django_docs} (\citeurl{django_docs}) of de populaire HTTP bibliotheek \emph{Requests} \cite{requests_docs} (\citeurl{requests_docs}). Behalve dat je vrij eenvoudig uitgebreide documentatie kunt schrijven kan Sphinx alle docstrings gebruiken om een referentie op te bouwen.

Het voert tijdens deze cursus te ver om veel aandacht te besteden aan Sphinx. Maar aangezien documentatie zo belangrijk is wilden we het toch noemen met pointers naar de Sphinx documentatie \cite{sphinx}. Klik daar, als je geïnteresseerd bent, op \emph{First steps with Sphinx}.


\section{Command-line interface voor ons experiment}

In \chref{ch:mvc} heb je \texttt{pythondaq} uitgesplitst in model, view en controller. Wanneer we een command-line interface gaan bouwen dan is dat de softwarelaag tussen de gebruiker en de rest van de code. De command-line interface is dus een \emph{view}. Het is helemaal niet gek om meerdere views te hebben, bijvoorbeeld een eenvoudig script zoals \filepath{view.py}, een command-line interface en een grafische interface. Hier gaan we ons richten op een command-line interface. We gaan een nieuw bestand \filepath{cli.py} aanmaken en dat langzaam opbouwen.

\begin{inleveropdracht}[Pythondaq: commando's]
    \begin{enumerate}
        \item Maak een nieuw bestand \filepath{src/pythondaq/cli.py}.
        \item Maak een \pythoninline{@click.group()} aan en voeg de subcommando's \texttt{list} en \texttt{scan} daaraan toe. Laat de commando's voorlopig alleen tekst printen. Merk op dat \pythoninline{list()} een Pythonfunctie is.\footnote{Zie ook de waarschuwing op \mypageref{warn:cmd_name}.}
        \item Zorg dat je de command-line applicatie met een commando in de terminal kunt aanroepen, inclusief de subcommando's \texttt{list} en \texttt{scan}.
    \end{enumerate}
\end{inleveropdracht}


\subsection{Het uitvoeren van een meetserie}

We gaan ons eerst richten op het uitvoeren van een volledige meetserie en het tonen van de resultaten daarvan aan de gebruiker.

\begin{info}
    Bij het opgeven van argumenten en opties voor de spanning kan het belangrijk zijn om te controleren of de spanning überhaupt wel een getal is tussen \qtylist{0;3.3}{\volt}. Je kunt dit doen door de \pythoninline{type}-parameter in \pythoninline{@click.argument()} en \pythoninline{@click.option()}. Je kunt een Pythontype opgeven (bijvoorbeeld: \pythoninline{type=int} of \pythoninline{type=float}) en Click heeft speciale types zoals \pythoninline{type=click.FloatRange(0, 3.3)} voor een kommagetal tussen 0 en 3.3. Bekijken alle speciale types op \url{https://click.palletsprojects.com/en/8.1.x/parameters/#parameter-types}. Als je hiervan gebruik maakt hoef je niet \emph{zelf} te controleren of de parameters kloppen. Click doet dat voor je.
\end{info}

\begin{inleveropdracht}[Pythondaq: \texttt{scan}]
    Met het commando \texttt{scan} wil je een meetserie uitvoeren over een spanningsbereik. De uitvoer is een lijst van metingen van de stroomsterkte door en de spanning over de LED. De gebruiker moet het spanningsbereik (in volt) zelf kunnen kiezen. Geef ook de mogelijkheid de metingen op te slaan als CSV-bestand. Gebruik daarvoor een optie \texttt{{-}{-}output FILENAME}. Wanneer met die optie een bestandsnaam wordt meegegeven sla je de metingen op en anders niet. Als een meting lang duurt is het niet erg als de resultaten pas ná de meting worden weergegeven.
\end{inleveropdracht}

\begin{inleveropdracht}[Pythondaq: Onzekerheid]
    Het is wel fijn om de onzekerheid op de metingen te weten. Bouw een optie in waarmee het aantal herhaalmetingen bij iedere spanning in de meetserie gekozen kan worden. Bereken op basis van de herhaalmetingen de beste schatting van de stoomsterkte en de onzekerheid daarop, en ook voor de spanning over de LED.
\end{inleveropdracht}

\subsection{Het meetinstrument kiezen}

We kunnen de Arduino benaderen als we de naam weten die de VISA driver er aan heeft toegekend. Helaas kan -- ook afhankelijk van het besturingssysteem -- die naam veranderen als we de Arduino in een andere poort van onze computer steken of soms zelfs als we een andere Arduino op dezelfde poort koppelen. Met het commando \verb|list| laten we alle apparaten zien die gevonden worden door de VISA drivers.

\begin{inleveropdracht}[Pythondaq: \texttt{list}]
    Schrijf het commando \verb|list| zodat het een lijst geeft van de aangesloten instrumenten -- zoals we in het vorige hoofdstuk al eens gedaan hebben.
\end{inleveropdracht}

\begin{inleveropdracht}[Pythondaq: choose device]
    Pas het commando \texttt{scan} aan zodat je de naam van een device moet meegeven.
    Zorg dat het gekozen device ook daadwerkelijk wordt gebruikt in het model en de controller.
\end{inleveropdracht}

\begin{inleveropdracht}[Pythondaq: \texttt{info}]
    Maak een commando \verb|info| waarmee je de identificatiestring van een opgegeven instrument opvraagt en weergeeft. Je kunt het instrument met een optie of argument meegeven.
\end{inleveropdracht}

\begin{inleveropdracht}[Pythondaq: Helpteksten]
    Loop al je commando's nog eens na en zorg ervoor dat er duidelijke helpteksten aanwezig zijn. Een nieuwe gebruiker moet met deze informatie met jouw command-line interface uit de voeten kunnen.
\end{inleveropdracht}

\begin{inleveropdracht}[Pythondaq: Grafiek]
    Breid je \texttt{scan} opdracht uit met een optie om een grafiek te tekenen. Dat kan het makkelijkst met een \emph{boolean flag}. Bijvoorbeeld: \texttt{{-}{-}graph} om een grafiek te tekenen en \texttt{{-}{-}no-graph} om dat niet te doen. De standaardkeuze kan zijn om dat niet te doen. Lees meer over boolean flags voor Click op \url{https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags}.
\end{inleveropdracht}

\begin{bonusopdracht}[Pythondaq: \texttt{list {-}{-}search}]
    Breid het commando \texttt{list} uit met een optie \verb|--search| waarmee je niet een lijst van \emph{alle} instrumenten krijgt, maar alleen de instrumenten die de zoekterm bevatten. Dus bijvoorbeeld:
    \begin{ps1concode}
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
  \end{ps1concode}
    De lijst met instrumenten kan er op Windows heel anders uitzien. Pas daarna \texttt{scan} en \texttt{info} aan zodat het niet nodig is om de volledige devicenaam mee te geven, maar alleen een zoekterm.
\end{bonusopdracht}

Op dit punt hebben we de functionaliteit van ons snelle script van het vorige hoofdstuk bereikt. Dit was veel meer werk, maar het is veel flexibeler. Als je wilt meten met een andere Arduino, een ander bereik, of een andere stapgrootte dan type je gewoon een iets ander commando in de terminal. Je hoeft geen scripts meer aan te passen. Als je na een tijdje niet meer precies weet hoe het ook alweer werkte allemaal kun je dat snel weer oppakken door \verb|--help| aan te roepen.

\begin{minopdracht}
    Kijk nog eens terug naar het lijstje subcommando's die je in \opdref{opd:subcommandos} hebt opgeschreven. Heb je alles geïmplementeerd? Wat zou je willen dat je nog meer kan instellen? Als er tijd over is, kijk dan of dit lukt.
\end{minopdracht}

\section{Uitdaging: Een interface met stijl}

Ook command-line interfaces gaan met hun tijd mee. Vroeger waren ze per definitie zwart/wit en statisch, maar tegenwoordig worden interfaces vaak opgeleukt met kleur, emoji's en bewegende progressbars. \emph{Rich}~\cite{rich} is een project dat in recordtijd heel populair is geworden. Het bestaat pas sinds november 2019 en heeft precies twee jaar later meer dan \num{31000}\,\raisebox{-1.5pt}{\FiveStar} verzameld. Dat is \emph{veel} -- en de populariteit is sindsdien nog verder toegenomen.

Rich is ontzettend uitgebreid en heeft heel veel mogelijkheden. Voor ons project kan het handig zijn om een progressbar te gebruiken of met Rich een tabel weer te geven. De documentatie~\cite{rich-docs} van Rich is best goed, maar kan lastig zijn om een mooi overzicht te krijgen. Een serie van korte video tutorials kun je vinden bij \url{https://calmcode.io/rich/introduction.html}. Iedere video duurt maar één tot twee minuten en laat mooi de mogelijkheden zien. Voor de functies die je wilt gebruiken kun je dan meer informatie opzoeken in de documentatie van Rich zelf.

\begin{bonusopdracht}
    Verrijk je interface met Rich. Doe dit naar eigen wens en inzicht.
\end{bonusopdracht}

\section{Uitdaging: Data-analyse}

Door de $I,U$-karakteristiek van de (lichtgevende) diode te analyseren is het mogelijk om de constante van Boltzmann te bepalen. De stoomsterkte door een diode wordt gegeven door de Shockley diodevergelijking \eqref{eq:Shockley}. Zie ook \appref{ch:diode}.

Lukt het, om binnen de te bepalen onzekerheid, overeenkomst te vinden met de literatuurwaarde? Een LED is helaas geen ideale diode dus dit kan lastig zijn.

\begin{bonus}
    \begin{opdracht}
        Fit het model van Shockley aan je $I,U$-karakteristiek. Welke parameters kun je bepalen? Overleg met je begeleider!
    \end{opdracht}
\end{bonus}