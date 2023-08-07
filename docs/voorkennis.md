# Python voorkennis; Batteries (not yet) included

Python is een \emph{batteries included} taal. Dat betekent dat als je `kaal' Python installeert er al heel veel functionaliteit standaard meegeleverd wordt. Allereerst omdat de taal zelf al behoorlijk krachtig is, maar ook omdat de \emph{standaardbibliotheek} zeer uitgebreid is. Met een eenvoudig \pythoninline{import}-statement haal je extra functionaliteit binnen, onder andere op het gebied van datatypes, wiskunde, toegang tot bestanden, een database, datacompressie, cryptografie, netwerktoegang, e-mail, multimedia, etc. Nog veel meer bibliotheken zijn beschikbaar via de \citetitle{pypi} \parencite{pypi}.

In dit hoofdstuk behandelen we de kennis die nuttig kan zijn voor de rest van deze cursus. We gaan ervan uit dat iedereen bekend is met recente versies van Python en we gaan niet in op de -- soms ingrijpende -- veranderingen die de taal heeft ondergaan.\footnote{Python 2 is dood. Leve Python 3!} Een deel van wat we hier behandelen kan al bekend zijn uit eerdere cursussen. Een ander deel is nieuw.\footnote{Tenzij je al veel zelf hebt geprogrammeerd in Python, buiten de cursussen om.}

In de cursus gaan we bibliotheken (\emph{modules, packages}) en een applicatie ontwikkelen. Dat betekent dat we verder gaan dan het schrijven van \emph{scripts} en dat we dus meer gaan doen dan functies schrijven. Uiteindelijk moet het mogelijk zijn de software te verspreiden op een wat meer professionele manier. Dus niet alleen via een zipje met wat Pythonbestanden waar uiteindelijk verschillende versies van rondslingeren en die lastig zijn te updaten. Wat er nodig is voor een goede distributie van software en om het mogelijk te maken met meerdere mensen software te (blijven) ontwikkelen zal in deze cursus aan bod komen.

Een punt wat vaak onderschoven blijft is \emph{documentatie}. Als je software schrijft die gebruikt (en doorontwikkeld) wordt in een onderzoeksgroep, dan is het heel belangrijk dat iedereen kan begrijpen wat je software doet en hoe die uitgebreid kan worden. Het is zonder hulp vaak heel moeilijk om de code van een iemand anders te begrijpen. En in de praktijk blijkt heel vaak dat als je code schrijft en daar een paar weken of maanden later op terugkijkt, jij zélf die ander bent. Wat toen blijkbaar heel logisch leek, is dat later toch niet meer. Dus documentatie schrijf je heel vaak ook gewoon voor jezelf.


## Zen of Python

Als je niet zo heel veel in Python geprogrammeerd hebt kan het helpen om het materiaal van de cursus \citetitle{inl_prog} nog eens door te nemen \parencite{inl_prog}. Een boek dat zeker bij natuurkundigen in de smaak kan vallen is \citetitle{eff_comp_physics}, maar deze is niet gratis verkrijgbaar \parencite{eff_comp_physics}. Een boek dat zowel op papier te bestellen is als in de vorm van een pdf of webpagina is te lezen is \citetitle{think_python} \parencite{think_python}.

Python is niet C (of iedere willekeurige andere programmeertaal). Er zit een gedachte achter die op een gegeven moment verwoord is door \textcite{zenofpython}.
% \begin{verse}
%   The Zen of Python, by Tim Peters

%   Beautiful is better than ugly.\\
%   Explicit is better than implicit.\\
%   Simple is better than complex.\\
%   Complex is better than complicated.\\
%   Flat is better than nested.\\
%   Sparse is better than dense.\\
%   Readability counts.\\
%   Special cases aren't special enough to break the rules.\\
%   Although practicality beats purity.\\
%   Errors should never pass silently.\\
%   Unless explicitly silenced.\\
%   In the face of ambiguity, refuse the temptation to guess.\\
%   There should be one-- and preferably only one --obvious way to do it.\\
%   Although that way may not be obvious at first unless you're Dutch.\\
%   Now is better than never.\\
%   Although never is often better than *right* now.\\
%   If the implementation is hard to explain, it's a bad idea.\\
%   If the implementation is easy to explain, it may be a good idea.\\
%   Namespaces are one honking great idea -- let's do more of those!
% \end{verse}
Je kunt het nalezen middels een \emph{easter egg} in Python zelf: \pythoninline{import this}.

\begin{minimaal}
  \begin{opdracht}[zen]
    Open een Python terminal en type in:
    \begin{pyconcode}
    >>> import this
  \end{pyconcode}
  \end{opdracht}
\end{minimaal}

Deze tekst kan nog behoorlijk cryptisch overkomen, maar een paar dingen worden snel duidelijk: code moet \emph{mooi} zijn (regel 1) en duidelijk (regels 2, 3 en 6). Er bestaan prachtige programmeertrucs in één of twee regels, maar onleesbaar is het wel. Een voorbeeld \cite{contemplating_zenofpython}:
\begin{pythoncode}
  print('\n'.join("%i bytes = %i bits which has %i possible values." %
        (j, j*8, 256**j) for  j in (1 << i for i in range(4))))
\end{pythoncode}
\label{code_bytes}
Kun je zien wat de uitvoer van dit programma moet zijn? Misschien als we het op deze manier uitschrijven:
\begin{pythoncode}
  for num_bytes in [1, 2, 4, 8]:
      num_bits = 8 * num_bytes
      num_possible_values = 2 ** num_bits
      print(
          f"{num_bytes} bytes = {num_bits} bits which has {num_possible_values} possible values."
      )
\end{pythoncode}
De code is langer, met duidelijkere namen van variabelen en zonder bitshifts of joins. De uitvoer vind je op \mypageref{fig:uitvoer_bytes}. Moraal van dit verhaal: we worden gelukkiger van code die leesbaar en begrijpelijk is, dan van code die wel heel slim in elkaar zit maar waar bijna niet uit te komen is. Overigens komt het regelmatig voor dat de programmeur zélf een paar weken later al niet zo goed meer weet hoe de code nou precies in elkaar zat.

Als je samenwerkt aan software kan het andere Pythonprogrammeurs erg helpen om dingen `op de Python-manier te doen'. Een C-programmeur herken je vaak aan het typische gebruik van lijsten of arrays in \pythoninline{for}-loops. Als je een lijst hebt: \pythoninline{names = ['Alice', 'Bob', 'Carol']}, doe dan niet:
\begin{pythoncode}
  i = 0
  while i < len(names):
      print("Hi,", names[i])
      i = i + 1
\end{pythoncode}
of:
\begin{pythoncode}
  for i in range(len(names)):
      print("Hi,", names[i])
\end{pythoncode}
waarbij je loopt over een index \verb|i|. Gebruik liever het feit dat een lijst al een \emph{iterator} is:
\begin{pythoncode}
  for name in names:
      print("Hi,", name)
\end{pythoncode}
Deze code is bovendien veel korter en gebruikt minder variabelen. Soms is het nodig om de index te hebben, bijvoorbeeld wanneer je een namenlijstje wilt nummeren:
\begin{textcode}
  1. Alice
  2. Bob
  3. Carol
\end{textcode}
Dit kan dan in Python-code het makkelijkst als volgt:
\begin{pythoncode}
  for idx, name in enumerate(names, 1):
      print(f"{idx}. {name}")
\end{pythoncode}
Hier maken we gebruik van de \pythoninline{enumerate(iterable, start=0)}-functie en de (relatief recent geïntroduceerde) f-strings. Er zijn dus veel manieren om programmeerproblemen op te lossen, maar het helpt om het op de `Pythonmanier' te doen. Andere programmeurs zijn dan veel minder tijd en energie kwijt om jouw code te begrijpen -- én andersom wanneer jij zelf op internet zoekt naar antwoorden op problemen. Immers, je herkent dan veel makkelijker en sneller hoe andermans code werkt. Dat brengt ons op het volgende punt: code lezen.


## Coding style

``Code wordt veel vaker gelezen dan geschreven,'' is een veel geciteerd gezegde onder programmeurs. Je schrijft je code en zit vervolgens uren te puzzelen om een fout te vinden of hoe je de code het beste kunt uitbreiden. Je zoekt op internet naar voorbeeldcode, je helpt een medestudent of vraagt die om hulp. Heel vaak dus lees je niet je eigen code, maar die \emph{van iemand anders}. Is dat relevant? Ja! Want die code ziet er anders uit. Iedereen programmeert toch op zijn eigen manier. Het scheelt enorm als de code er tenminste grotendeels hetzelfde uitziet. Het kost je dan minder energie om te lezen. Daarom ook dat de artikelen in wetenschappelijke tijdschriften bijvoorbeeld er allemaal hetzelfde uitzien en de auteur niet de vrijheid krijgt om zélf lettertypes te kiezen. Net zo goed hebben grote organisaties vaak hun eigen \emph{coding style} ontwikkeld waar alle werknemers zich zoveel mogelijk aan moeten houden.

Python heeft een eigen style guide die je vooral eens door moet lezen \cite{pep8}. Google heeft ook een hele mooie, met duidelijke voorbeelden \cite{google_style_guide}.

Fijn dat je code consistenter wordt, maar het moet nu ook weer niet zo zijn dat je uren kwijt bent met de style guides bestuderen of twijfelen waar je een regel code precies moet afbreken. Wel of niet een enter? Om daar vanaf te zijn zijn er verschillende pakketten die je code automatisch aanpassen aan de standaard. Standaard gebruikt \emph{Visual Studio Code} \texttt{autopep8}. Als je de instelling \menu{Editor: Format On Save} aan zet (staat standaard uit) dan wordt je code aangepast zodra je je bestand opslaat. De instelling \menu{Python > Formatting: Provider} kun je gebruiken om in plaats van \texttt{autopep8} bijvoorbeeld \verb|black| te kiezen \cite{black}. Black is een stuk strenger dan \texttt{autopep8} en heeft meer een `eigen mening'. Als je je daar bij neerlegt hoef je bijna niet meer na te denken over hoe je je code precies vormgeeft. De Black website zegt \cite{black}:
\begin{quotation}
  By using Black, you agree to cede control over minutiae of hand-formatting. In return, Black gives you speed, determinism, and freedom from pycodestyle nagging about formatting. You will save time and mental energy for more important matters.

  Black makes code review faster by producing the smallest diffs possible. Blackened code looks the same regardless of the project you’re reading. Formatting becomes transparent after a while and you can focus on the content instead.
\end{quotation}
%
De code in deze handleiding is geformat met \emph{Black}.

\begin{attention}
  Bij de volgende opdracht kun je, als je niet de nieuwste versie van Anaconda hebt, een pop krijgen dat black nog niet geïnstalleerd is:
  \begin{center}
    \includegraphics[scale=.5]{figures/screenshot-black-not-installed}
  \end{center}
  Kies \texttt{Yes} en dan krijg je bovenaan het scherm:
  \begin{center}
    \includegraphics[scale=.5]{figures/screenshot-install-black}
  \end{center}
  Kies voor \texttt{Install using Conda}.
\end{attention}

\begin{minopdracht}[black]
  Om Black te installeren en te testen voer je de volgende opdrachten uit:
  \begin{enumerate}
    \item In Visual Studio Code, ga naar \menu{Code} onder MacOS of \menu{File} onder Windows en dan naar \menu{Preferences > Settings > Python Formatting: Provider} en kies \texttt{black}. Ga dan naar \menu{Preferences > Settings > Editor: Format On Save} en vink die \emph{aan}.
    \item Open een Pythonbestand en type:
          \begin{pythoncode}
            l = [1,
            2, 3, 4]
          \end{pythoncode}
          Sla het bestand op en controleer of \shellinline{black} werkt. Je zou dan \pythoninline{l = [1, 2, 3, 4]} moeten krijgen.
    \item Type in:
          \begin{pythoncode}
            fruit_bowl = {"apple": 1, 'banana': 2, "pear": 3, "lemon": 4, "strawberry": 5, 'raspberry': 6}
          \end{pythoncode}
          Let op! Allemaal één regel en wisselend gebruik van enkele (\pythoninline{'}) en dubbele (\pythoninline{"}) aanhalingstekens. Sla het bestand op en laat Black zijn werk doen. Welke dingen heeft Black aangepast?
    \item Gebruik voortaan Black en geef je er aan over.
  \end{enumerate}
\end{minopdracht}


## Datatypes

Gehele getallen, kommagetallen, strings: allemaal voorbeelden van \emph{datatypes}. Veel zullen jullie al wel bekend voorkomen, zoals strings, lists en NumPy arrays. Andere zijn misschien alweer wat weggezakt, zoals dictionaries of booleans. Weer andere zijn misschien wat minder bekend, zoals complexe getallen of sets. En als laatste voegt Python af en toe nieuwe datatypes toe, zoals \emph{f-strings} in Python 3.6 of \emph{data classes} sinds Python 3.7.
\begin{info}
  De \citetitle{python-standard-library} documentatie \parencite{python-standard-library} bevat een mooi overzicht van alle datatypes met een beschrijving van operaties en eigenschappen. Voor uitgebreidere tutorials kun je vaak terecht bij \citetitle{real-python} \parencite{real-python}. Het kan makkelijk zijn om in een zoekmachine bijvoorbeeld \texttt{real python dict} te typen als je een tutorial zoekt over Python dictionaires.
\end{info}

Om nog even te oefenen met de datatypes volgt er een aantal korte opdrachten.

\begin{minopdracht}[list]
  Schrijf een kort scriptje.
  \begin{enumerate}
    \item Maak een \pythoninline{list} van de wortels van de getallen 1 tot en met 10. Dus de rij $\left(\sqrt{1}, \sqrt{2}, \sqrt{3}, \ldots, \sqrt{10}\right)$.
    \item Print die rij onder elkaar (één getal per regel, met drie decimalen).
    \item Geef weer of het getal 3 voorkomt in die rij en geef weer of het getal 4 voorkomt in die rij.
  \end{enumerate}
\end{minopdracht}

\begin{minopdracht}[np.array]
  Doe hetzelfde als de vorige opdracht, maar nu met NumPy arrays.
\end{minopdracht}

\begin{minopdracht}[f-strings]
  Herschrijf het volgende script door f-strings te gebruiken:
  \begin{pythoncode}
    print("Enter your name and press return:")
    name = input()
    length_name = len(name)
    
    print(
        "Hi %s, your name has %d letters and the first letter is a %c."
        % (name, length_name, name[0])
    )
  \end{pythoncode}
\end{minopdracht}

\begin{minopdracht}[dict]
  Schrijf een kort scriptje:
  \begin{enumerate}
    \item Maak een dictionary \texttt{constants} met de waardes van de (natuur)constantes $\pi$, de valversnelling $g$, de lichtsnelheid $c$ en het elementaire ladingskwantum $e$.
    \item Print de namen -- niet de waardes -- van de constantes die zijn opgeslagen in \texttt{constants}.
    \item Bereken de zwaartekracht $F_\text{z} = mg$ voor een voorwerp met een massa van \qty{14}{\kilo\gram} door gebruik te maken van de waarde van $g$ uit de dictionary.
    \item Maak een dictionary \texttt{measurement} die de resultaten van een meting bevat: een spanning van \qty{1.5}{\volt} bij een stroomsterkte van \qty{75}{\milli\ampere}.
    \item Bereken de weerstand van de schakeling op basis van de voorgaande meting en bewaar het resultaat in dezelfde dictionary.
  \end{enumerate}
\end{minopdracht}

In Python zijn \pythoninline{tuple}'s een soort `alleen-lezen' \pythoninline{list}'s. Een tuple is een \emph{immutable\footnote{Letterlijk: onveranderbaar.} object}. Daarom worden ze vaak gebruikt wanneer lijstachtige objecten altijd dezelfde vorm moeten hebben. Bijvoorbeeld een lijst van $(x, y)$-coördinaten zou je zo kunnen definiëren:
\begin{pythoncode}
  coords = [(0, 0), (1, 0), (0, 1)]
\end{pythoncode}
Hier is \pythoninline{coords[0]} gelijk aan \pythoninline{(0, 0)}. Je kunt nu \emph{niet} dit coördinaat uitbreiden naar drie dimensies met \pythoninline{coords[0].append(1)} en dat is waarschijnlijk precies wat je wilt voor een lijst met tweedimensionale coördinaten. Ook is dit object veel compacter dan een \pythoninline{dict}:
\begin{pythoncode}
  coords = [{"x": 0, "y": 0}, {"x": 1, "y": 0}, {"x": 0, "y": 1}]
\end{pythoncode}
Hier zijn tuples dus best handig, al moet je dus wel onthouden in welke volgorde de elementen staan. Dat is voor $(x, y)$-coördinaten niet zo'n probleem maar kan in andere situaties lastiger zijn.\footnote{Daar is bijvoorbeeld de \pythoninline{collections.namedtuple()} dan weer handig voor.} Tuples ondersteunen \emph{tuple unpacking}. Je kunt het volgende doen:
\begin{pythoncode}
  (x, y, z) = (2, 3, 4)
\end{pythoncode}
Na deze operatie geldt $x = 2$, $y = 3$ en $z = 4$. Je mag zelfs de haakjes weglaten voor nog compactere notatie:
\begin{pythoncode}
  x, y, z = 2, 3, 4
\end{pythoncode}
Op deze manier kan een functie ook meerdere argumenten teruggeven die je vervolgens uit elkaar plukt:
\begin{pythoncode}
  def get_measurement():
      ...  # perform measurement
      return voltage, current


  voltage, current = get_measurement()
\end{pythoncode}
Het uit elkaar plukken van argumenten kan zelfs als je een functie aanroept:
\begin{pythoncode}
  def power(a, b):
      return a ** b


  # regular function call
  power(2, 7)

  # function call with tuple unpacking
  args = 2, 7
  power(*args)
\end{pythoncode}
Wat zelfs werkt is \emph{dictionary unpacking}. Je kunt aan functies ook argumenten bij naam meegeven -- de volgorde maakt dan niet uit en je maakt in je programma expliciet duidelijk welke argumenten je meegeeft. Dat werkt zo:
\begin{pythoncode}
  # regular function call
  power(b=7, a=2)
  
  # function call with dictionary unpacking
  kwargs = {"b": 7, "a": 2}
  power(**kwargs)
\end{pythoncode}

\begin{minopdracht}[odds]
  Gegeven de lijst \pythoninline{odds = [1, 3, 5, 7, 9]}, print de waardes uit deze lijst op één regel. Je mag er niet vanuit gaan dat de lijst altijd 5 elementen bevat.
\end{minopdracht}

Als laatste willen we nog de aandacht vestigen op \pythoninline{set}s: een unieke verzameling van objecten. Ieder element komt maar één keer voor in een set:
\begin{pythoncode}
  l = [1, 2, 2, 3, 5, 5]
  set(l)
  # {1, 2, 3, 5}
\end{pythoncode}
Je moet even oppassen: de \pythoninline{{}}-haakjes worden gebruikt voor zowel sets als dictionaries. Omdat een dictionary (key: value) paren heeft en een set losse elementen kan Python het verschil wel zien:
\begin{pythoncode}
  is_set = {1, 2, 3, 4}
  is_dict = {1: 1, 2: 4, 3: 9, 4: 16}
\end{pythoncode}
Dat gaat alleen mis als je een \emph{lege} set wilt maken. Daarvoor zul je expliciet de \pythoninline{set()}-constructor moeten gebruiken:
\begin{pythoncode}
  is_dict = {}
  is_set = set()
\end{pythoncode}
Je kunt elementen toevoegen aan een set met \pythoninline{.add()} en sets gebruiken om verzamelingen met elkaar te vergelijken. Komen er elementen wel of niet voor in een set? Is de ene set een subset van de andere set? Enzovoorts. Zie daarvoor verder de documentatie.


## Arrays en list comprehensions

NumPy arrays zijn vaak handiger dan lists. Als je een array hebt van 20 $x$-waardes in het domein $[0, \pi]$ kun je in één keer alle waardes van $\sin x$ uitrekenen. Bijvoorbeeld:
\begin{pythoncode}
  # from numpy import pi, linspace, sin
  x = linspace(0, pi, 20)
  y = sin(x)
\end{pythoncode}
NumPy voert de berekeningen uit binnen een C-bibliotheek\footnote{De programmertaal C ligt dichter bij machinetaal dan Python en is daarmee veel sneller maar ook veel minder geavanceerd.} en is daarmee veel sneller dan een berekening in Python zelf:
\begin{pythoncode}
  # x = [list of x-values]
  y = []
  for u in x:
      y.append(sin(u))
\end{pythoncode}
Niet alleen is NumPy zo'n honderd keer sneller,\footnote{Echt. De sinus van 2000 $x$-waardes berekenen kostte NumPy in een test \qty{11.6}{\micro\second} en de for-loop wel \qty{1357.7}{\micro\second}.} het is ook veel korter op te schrijven. Het nadeel van NumPy arrays is dat je geen elementen kunt toevoegen.\footnote{Strikt genomen is dit niet helemaal waar. Je kunt een nieuwe array creëren door meerdere arrays aan elkaar te plakken. Maar een eenvoudige \pythoninline{append()}-method bestaat niet voor arrays.} Python lijsten hebben dus voordelen, zeker als rekentijd geen probleem voor je is.

Door gebruik te maken van een \emph{list comprehension} kun je de for-loop in één regel opschrijven:
\begin{pythoncode}
  # x = [list of x-values]
  y = [sin(u) for u in x]
\end{pythoncode}
Er is in veel gevallen tegenwoordig geen groot verschil met een for-loop qua snelheid. In andere gevallen is de list comprehension net wat sneller. Als je lijsten niet te lang zijn is het makkelijker (en sneller) om een list comprehension te gebruiken in plaats van je lijst éérst naar een array te veranderen en er dan mee verder te rekenen. Als je lijst wél lang is of je weet al dat je meerdere berekeningen wilt uitvoeren kan dat wel:
\begin{pythoncode}
  # from numpy import sin, array
  # x = [list of x-values]
  x = array(x)
  y = sin(x)
\end{pythoncode}
Als je veel functies uit NumPy gebruikt is het handig -- en gebruikelijk -- om je import-statements kort te houden en duidelijk te maken dat je de \pythoninline{sin()}-functie uit NumPy gebruikt en niet uit de \pythoninline{math} module. Constantes worden wel vaak los geïmporteerd:
\begin{pythoncode}
  import numpy as np
  from numpy import pi

  x = np.linspace(0, pi, 100)
  y = np.sin(x)
\end{pythoncode}
Kortom: \emph{berekeningen} met arrays zijn sneller, maar for-loops (en list comprehensions) zijn veelzijdiger. Het is zelfs mogelijk om een \pythoninline{if}-statement op te nemen in je list comprehension. Bijvoorbeeld:
\begin{pythoncode}
  filenames = ["test.out", "text.pdf", "manual.pdf", "files.zip"]
  pdfs = [name for name in filenames if name.endswith(".pdf")]
  # pdfs=['text.pdf', 'manual.pdf']
\end{pythoncode}
In een for-loop heb je daar meer ruimte voor nodig. Naast list comprehensions heb je ook \emph{set comprehensions}\footnote{Notatie hetzelfde, maar gebruik nu \pythoninline{{}}-haakjes.} en \emph{dict comprehensions}.

\begin{minopdracht}[comprehensions]
  Voer, door een script te schrijven, de volgende opdrachten uit:
  \begin{enumerate}
    \item Genereer een lijst van 50 willekeurige \emph{unieke} én \emph{gehele} getallen tussen de 0 en de 100.
    \item Maak een set uit die getallen die deelbaar zijn door 3. Maak gebruik van een `gewone' \emph{for}-loop.
    \item Maak nogmaals een set van de getallen die deelbaar zijn door 3, maar gebruik daarvoor nu een set comprehension.
  \end{enumerate}
\end{minopdracht}


## Zip; De ritssluiting

In het rijtje van fantastische uitvindingen waar we niet vaak genoeg bij stilstaan heeft de ritssluiting zeker een plaats. Bij een ritssluiting worden twee lange rijen tandjes naast elkaar geduwd waarna die stevig in elkaar haken. Iets soortgelijks kan in Python met de \pythoninline{zip()}-functie.\footnote{\emph{Eng.: to zip} betekent \emph{ritsen}.} Stel je hebt twee lijsten A en B en je wilt loopen over de waardes. In de eerste iteratie wil je de eerste waarde uit A mét de eerste waarde van B, vervolgens de tweede waarde van A met de tweede waarde van B, enz. Dat werkt als volgt:
\begin{pythoncode}
  A = [1, 2, 3, 4]
  B = [1, 4, 9, 16]
  
  for a, b in zip(A, B):
      print(f"{a=} {b=}")
  # a=1 b=1 
  # a=2 b=4 
  # a=3 b=9 
  # a=4 b=16 
\end{pythoncode}
Dit is uiteenlopende situaties erg handig. Je kunt net zoveel lijsten in \pythoninline{zip()} gooien als je wilt: \pythoninline{for a, b, c, d, e in zip(A, B, C, D, E)} is geen probleem.

\begin{minopdracht}[zip]
  Gegeven de spanningen $U$ gelijk aan \qtylist{1.2; 1.8; 2.4; 2.7; 3.1}{\volt} en de bijbehorende stroomsterktes $I$ gelijk aan \qtylist{0.3; 0.4; 0.6; 0.8; 1.0}{\ampere}, loop over de lijsten met \pythoninline{zip()} en print voor iedere iteratie de spanning $U$, de stroomsterkte $I$ en de weerstand $R$.
\end{minopdracht}


## Lambda functions

In Python zijn functies ook objecten. Je kunt ze bewaren in een lijst of dictionary, of je kunt ze meegeven als parameter aan een andere functie. Dat kan heel handig zijn! Stel je hebt een lijst met verschillende soorten fruit die je wilt sorteren op alfabet:
\begin{pythoncode}
  a = ["kiwi", "banana", "apple"]
  sorted(a)
  # ['apple', 'banana', 'kiwi']
\end{pythoncode}
Dat gaat heel makkelijk met de ingebouwde \pythoninline{sorted()}-functie. Je kunt aan deze functie ook een \texttt{key}-parameter meegeven; een ándere functie die gebruikt wordt om te bepalen waarop gesorteerd moet worden. Zo kun je sorteren op de \emph{lengte} van de fruitnamen door simpelweg de \pythoninline{len()}-functie als parameter mee te geven:
\begin{pythoncode}
  len("apple")
  # 5
  sorted(a, key=len)
  # ['kiwi', 'apple', 'banana']
\end{pythoncode}
Als je wilt sorteren op de tweede letter van de naam -- waarom niet? -- dan kun je zelf een functie definiëren en gebruiken:
\begin{pythoncode}
  def second_letter(value):
      return value[1]

  second_letter("lemon")
  # e
  sorted(a, key=second_letter)
  # ['banana', 'kiwi', 'apple']
\end{pythoncode}
Lambdafuncties zijn bedacht om je een hoop typewerk te besparen. Je kunt korte functies in één regel opschrijven en gebruiken, zolang het maar een geldige \emph{expression} is. Géén if-then-else, maar de meeste andere dingen mogen wel. Bijvoorbeeld:
\begin{pythoncode}
  squared = lambda x: x ** 2
  squared(4)
  # 16

  second_letter = lambda x: x[1]
  sorted(a, key=second_letter)
  # ['banana', 'kiwi', 'apple']
\end{pythoncode}
Aangezien de definitie van een lambdafunctie zelf ook een expression is kun je het sorteren op de tweede letter zelfs in één regel doen:
\begin{pythoncode}
  sorted(a, key=lambda x: x[1])
  # ['banana', 'kiwi', 'apple']
\end{pythoncode}

Lambdafuncties kom je ook tegen als je wilt fitten aan een bepaald model. Je definiëert je model dan in één regel met een lambdafunctie:\footnote{Het is hierbij wel belangrijk dat \pythoninline{lmfit} er vanuit gaat dat de eerste variabele in de functiedefinitie de onafhankelijke variabele ($x$-as) is. Dit is verder geen Pythonlimitatie.}
\begin{pythoncode}
  # from lmfit import models
  f = lambda x, a, b: a * x + b
  model = models.Model(f)
  fit = model.fit(y, x=x)
\end{pythoncode}
Je kunt de functies ook bewaren in een dictionary voor later gebruik.

\begin{minopdracht}[lambda]
  Maak een dictionary \texttt{models} met functies voor een lineaire functie \texttt{linear} gegeven door $y = ax + b$, een kwadratische functie \texttt{quadratic} gegeven door $y = ax^2 + bx + c$ en een sinusfunctie \texttt{sine} gegeven door $a + b\sin(cx + d)$. Hierna moet de volgende code werken:
  \begin{pythoncode}
    f = models['linear']
    f(5, a=2, b=3)
    # 13
  \end{pythoncode}
  Maak een grafiek van de sinusfunctie op het domein $[0,\, 2\pi]$ met parameters $a=1$, $b=2$, $c=2$ en $d=\frac{\pi}{2}$.
\end{minopdracht}


## Generators

Als een functie een serie metingen verricht kan het lang duren voordat de functie de resultaten teruggeeft. Laten we die functie even \pythoninline{perform_measurements()} noemen. Het is soms lastig als de rest van het programma daarop moet wachten voordat een analyse kan worden gedaan, of een melding aan de gebruiker kan worden gegeven. Het kan dan gebeuren dat je je programma draait en je dan afvraagt: `doet hij het, of doet hij het niet?' Je kunt dit oplossen door \pythoninline{print()}-statements in je programma op te nemen, maar dit is niet zo netjes. Als je \pythoninline{perform_measurements()} inbouwt in een tekstinterface die ook `stil' moet kunnen zijn? Of als je de functie gaat gebruiken vanuit een grafisch programma waarin je geen tekst wilt printen, maar een grafiek wilt opbouwen? Je moet dan steeds \pythoninline{perform_measurements()} gaan aanpassen. Een ander probleem kan optreden wanneer je langdurige metingen doet die ook veel geheugen innemen. Wachten op de hele meetserie betekent dat het geheugen vol kan lopen. Lastig op te lossen!

Of\ldots je maakt gebruik van een \emph{generator function}: een functie die tussendoor resultaten teruggeeft. Dat kan door gebruik te maken van \pythoninline{yield} in plaats van \pythoninline{return}. De rest gaat automatisch. Maar: je moet wel even weten hoe je omgaat met de generator. Stel, we willen de kwadraten berekenen van een reeks getallen tot een bepaald maximum:
\begin{pythoncode}
  def calculate_squares_up_to(max_number):
      """Calculate squares of all integers up to a maximum number"""
      squares = []
      for number in range(max_number):
          squares.append(number ** 2)
      return squares

  calculate_squares_up_to(5)
  # [0, 1, 4, 9, 16]
\end{pythoncode}
De functie berekent eerst alle kwadraten, voegt ze toe aan een lijst en geeft vervolgens de lijst met uitkomsten terug. Een generator definieer je als volgt:
\begin{pythoncode}
  def calculate_squares_up_to(max_number):
      """Generate squares of all integers up to a maximum number"""
      for number in range(max_number):
          yield number ** 2
\end{pythoncode}
Lekker kort, want we hoeven geen lijst bij te houden! Als je de functie aanroept krijg je geen resultaat terug, maar een \emph{generator}. Als je de waardes wil zien dan gebruik je \pythoninline{next()}, als volgt:
\begin{pythoncode}
  square_generator = calculate_squares_up_to(5)
  next(square_generator)
  # 0
  next(square_generator)
  # 1
  ...
  next(square_generator)
  # 16
  next(square_generator)
  # StopIteration
\end{pythoncode}
Als de generator is uitgeput (de for-loop is afgelopen, de functie sluit af) dan geeft Python een \pythoninline{StopIteration} exception en crasht het programma -- tenzij je de exception afvangt. Het werkt, maar het is niet helemaal ideaal. Makkelijker is om de generator te gebruiken in een loop:
\begin{pythoncode}
  for square in calculate_squares_up_to(5):
      print("Still calculating...")
      print(square)

  # Still calculating...
  # 0
  # Still calculating...
  # 1
  # Still calculating...
  # 4
  # Still calculating...
  # 9
  # Still calculating...
  # 16
\end{pythoncode}
Dit kan ook in list comprehensions. En als je \emph{toch} wilt wachten op alle resultaten, dan kan dat eenvoudig met \pythoninline{squares = list(calculate_squares_up_to(5))}.

\begin{minopdracht}[generators]
  Schrijf een generator function die het \emph{vermoeden van Collatz} illustreert. Dat wil zeggen: beginnend bij een getal $n$, genereer het volgende getal als volgt: is het getal \emph{even}, deel het dan door twee; is het getal \emph{oneven}, vermenigvuldig het met 3 en tel er 1 bij op. Enzovoorts. Sluit de generator af als de uitkomst gelijk is aan 1. Dat is het vermoeden van Collatz: ongeacht met welk geheel getal je begint, je komt altijd op 1 uit. Als voorbeeld, beginnend bij het getal 3 krijg je de reeks 3, 10, 5, 16, 8, 4, 2, 1.
\end{minopdracht}


### Dunder methods

Hoe \emph{weet} Python eigenlijk wat de lengte is van een string? Of hoe je getallen optelt? Voor operatoren als \pythoninline{+ - * / **} wordt eigenlijk een \emph{method} aangeroepen. bijvoorbeeld \pythoninline{__add__()} voor \pythoninline{+}, en \pythoninline{__mul__()} voor \pythoninline{*}. Een ingebouwde functie als \pythoninline{len()} roept stiekem de \emph{method} \pythoninline{__len__()} aan en \pythoninline{print()} print de uitvoer van \pythoninline{__str__()}. Zulke methodes worden \emph{dunder methods}\footnote{Dunder staat voor \emph{double underscore}, de twee lage streepjes die om de naam heen staan.} of \emph{magic methods} genoemd. We kunnen zelf bijvoorbeeld een vector introduceren waarbij we de operatoren voor onze eigen doeleinden gebruiken \cite{operator_overloading}. We definiëren het optellen van vectoren en de absolute waarde (norm) van de vector:
\begin{pythoncode}
  class Vector:
      def __init__(self, x, y):
          self.x = x
          self.y = y

      def __add__(self, other):
          new_x = self.x + other.x
          new_y = self.y + other.y
          return Vector(new_x, new_y)

      def __abs__(self):
          return (self.x ** 2 + self.y ** 2) ** .5
\end{pythoncode}
De speciale \pythoninline{__init__()} methode zorgt voor de initialisatie van de klasse en de eerste parameter die alle methodes meekrijgen verwijst naar zichzelf en wordt dus gewoonlijk \pythoninline{self} genoemd.\footnote{Maar dat is niet verplicht, je mag in principe zelf een naam kiezen. Doe dat echter niet.} Met de regel \pythoninline{self.x = x} wordt de parameter \pythoninline{x} bewaard voor later gebruik. Je kunt de klasse gebruiken op de volgende manier:
\begin{pyconcode}
  >>> v1 = Vector(0, 1)
  >>> v2 = Vector(1, 0)
  >>> abs(v1)
  1.0
  >>> abs(v2)
  1.0
  >>> abs(v1 + v2)
  1.4142135623730951
  >>> (v1 + v2).x, (v1 + v2).y
  (1, 1)
  >>> v1 + v2
  <__main__.Vector object at 0x7fdf80b3ae10>
  >>> print(v1 + v2)
  <__main__.Vector object at 0x7fdf80b45450>
\end{pyconcode}
In de eerste regels maken we twee vectoren $\vb{v_1}$ en $\vb{v_2}$ en berekenen de lengtes\footnote{Absolute waarde of beter, \emph{norm}, van een vector is eenvoudig gezegd haar lengte.} $\norm{\vb{v_1}}$, $\norm{\vb{v_2}}$ en $\norm{\vb{v_1 + v_2}}$. Ook kunnen we de coördinaten van de som bekijken. Het gaat mis als we de somvector willen printen of willen kijken wat voor object het is. We krijgen technisch juiste, maar totaal onbruikbare informatie terug. Dit lossen we op met het definiëren van \pythoninline{__str__()}, gebruikt door \pythoninline{str()} en dus ook \pythoninline{print()}, en \pythoninline{__repr__()}, gebruikt door \pythoninline{repr()} en de Python interpreter.\footnote{Het verschil tussen de twee is subtiel. De Pythondocumentatie geeft aan dat de \pythoninline{__repr__} altijd ondubbelzinnig moet zijn, terwijl de \pythoninline{__str__} vooral leesbaar moet zijn. Voor eenvoudige objecten zijn ze veelal gelijk.}
\begin{pythoncode}
  class Vector:
      ...
      def __repr__(self):
          return f"Vector: ({self.x}, {self.y})"

      def __str__(self):
          # roept __repr__ aan
          return repr(self)
\end{pythoncode}
\begin{pyconcode}
  >>> v1 + v2
  Vector: (1, 1)
  >>> print(v1 + v2)
  Vector: (1, 1)
\end{pyconcode}
We raden je aan altijd een zinnige \pythoninline{__str__} en \pythoninline{__repr__} te definiëren.

Vaak hebben classes geen dunder methods nodig (behalve \pythoninline{__repr__} en \pythoninline{__str__}).

Je kunt behalve een class ook een \emph{subclass} aanmaken. Stel dat je een class \verb|Animal| hebt aangemaakt met handige methods en attributes maar je wilt een nieuwe, iets specifiekere class maken (bijvoorbeeld \verb|Cow|). Het is duidelijk dat een koe een dier is, maar een dier nog geen koe. Je kunt een subclass maken:
\begin{pythoncode}
  class Cow(Animal):
      pass
\end{pythoncode}
Het keyword \pythoninline{pass} doet niets overigens. Met alleen dit statement heeft de class \verb|Cow| precies alle functionaliteit van de class \verb|Animal|. Je kunt daarna zelf nog extra methods en attributes definiëren.


## Decorators
\label{sec:decorators}

Functies zijn ook objecten in Python. Je kunt ze, zoals we eerder gezien hebben, meegeven als argument of bewaren in een dictionary. Ook kun je functies in functies definiëren en functies definiëren die functies teruggeven. Vaag\footnote{Calmcode doet een goeie poging om dit rustig uit te leggen, kijk daarvoor op \url{https://calmcode.io/decorators/functions.html}}. Ik moet hier altijd weer even over nadenken en daarom mag je dit stukje overslaan. Om decorators te \emph{gebruiken}, hoef je niet per se te weten hoe ze \emph{werken}.
% Met decorators kan je functionaliteit aan een functie toevoegen. 
Decorators worden vaak gebruikt om het gedrag van een functie aan te passen.

% \begin{todo}
%   Ik vind dit voorbeeld best lastig, maar misschien komt dat dus omdat mijn hoofd zich de hele tijd afvraagd, maar WAAROM zou je dat willen of WAAROM zou je dat doen.
% \end{todo}

Stel je hebt een functie die eenvoudig twee getallen vermenigvuldigd. Je wilt deze functie, zonder hem van binnen te veranderen, aanpassen zodat hij altijd het kwadraat van de vermenigvuldiging geeft. Dus niet $a\cdot b$, maar $(a\cdot b)^2$. Dat kan als volgt:
% \begin{todo}
%   Het voorbeeld is al vrij abstract, misschien maakt 'f' het als functienaam nog abstracter. Misschien moeten we hem gewoon multiply noemen.
% \end{todo}
\begin{pythoncode}
  def f(a, b):
      return a * b


  def squared(func, a, b):
      return func(a, b) ** 2

  f(3, 4)
  # 12
  squared(f, 3, 4)
  # 144
\end{pythoncode}
Het werkt, maar we moeten er wel steeds aan denken om \pythoninline{squared()} aan te roepen en dan óók nog de functie \pythoninline{f()} als eerste argument mee te geven. Lastig. Maar omdat functies objecten zijn kan dit ook:
\begin{pythoncode*}{linenos}
  def squared_func(func):
      def inner_func(a, b):
          return func(a, b) ** 2

      return inner_func


  g = squared_func(f)
  g(3, 4)
  # 144
\end{pythoncode*}
Hier gebeurt iets geks\ldots Om te begrijpen wat hier gebeurt moeten we een beetje heen en weer springen. In regel 8 roepen we de functie \pythoninline{squared_func(f)} aan. In regel 5 zien we dat die functie een andere functie teruggeeft -- die \emph{niet} wordt aangeroepen! In regel 8 wordt die functie bewaard als \pythoninline{g} en pas in regel 9 roepen we hem aan. De functie \pythoninline{g()} is dus eigenlijk gelijk aan de functie \pythoninline{inner_func()} die in regels 2--3 gedefinieerd wordt. De aanroep in regel 9 zorgt er uiteindelijk voor dat in regel 3 de oorspronkelijke functie \pythoninline{f(a, b)} wordt aangeroepen en dat het antwoord gekwadrateerd wordt. Dit is echt wel even lastig.

% \begin{todo}
%   Als we studenten nog niet kwijt waren, dan raken we ze hier wel kwijt. De stap van a en b naar *args en **kwargs is best groot. Misschien kunnen we eerst @decorators uitleggen, dan een opdracht laten maken en dan nog een stapje verder met args en kwargs
% \end{todo}
In deze opzet moet de \pythoninline{inner_func(a, b)} nog weten dat de oorspronkelijke functie aangeroepen wordt met twee argumenten \pythoninline{a} en \pythoninline{b}. Maar ook dat hoeft niet. We hebben immers argument (un)packing met \pythoninline{*args}:
\begin{pythoncode}
  def squared_func(func):
      def inner_func(*args):
          return func(*args) ** 2

      return inner_func
\end{pythoncode}
En nu komt het: in Python kun je de \emph{decorator syntax} gebruiken om je functie te vervangen door een iets aangepaste functie. In plaats van:
\begin{pythoncode}
  f = squared_func(f)
\end{pythoncode}
op te nemen in je code kun je de functie meteen `decoraten' als volgt:
\begin{pythoncode}
  @squared_func
  def f(a, b):
      return a * b

  f(3, 4)
  # 144
\end{pythoncode}

Als je meer wilt weten over hoe decorators werken en hoe je je eigen decorators kunt maken, dan vind je een uitgebreide uitleg in \citetitle{decorators} \cite{decorators}. Deze tutorial heb je niet per se nodig voor de volgende opdracht.

% \begin{todo}
%   Deze opdracht vond ik best lastig, vooral omdat ik er volgens mij nog geen drol van begreep. Misschien is het goed om hier een opzetje te maken. Dus een scriptje met een functie die argumenten nodig heeft een een waarde teruggeeft.
%   \begin{pythoncode}
%     import datetime


%     def log(func):
%         def inner():

%             return func(a,b)

%         return inner


%     @log
%     def f(a, b):
%         return a * b


%     print(f(3, 4))
%     print(f(3, b=4))
%     \end{pythoncode}
%   En dan in een paar stappen. Zorg eerst dat de logfunctie het zonder poespas gaat doen (oftewel run die handel en los de error op) en dan functionaliteit toevoegen dat de datum enzo wordt geprint.
% \end{todo}

\begin{bonus}
  \begin{opdracht}[decorators]
    Schrijf en test een decorator die werkt als een soort logboek. Als je een functie aanroept die gedecoreerd is print dan een regel op het scherm met het tijdstip van de aanroep, de parameters die meegegeven werden én de return value van de functie.
  \end{opdracht}
\end{bonus}


## Modules
\label{sec:modules}

Als je een nieuw script begint te schrijven staat alle code in één bestand. Dat is lekker compact, maar heeft ook nadelen. Als je je experiment of programma gaat uitbreiden kan het erg onoverzichtelijk worden. Ook zul je al je wijzigingen steeds in dit bestand moeten doen terwijl je je code van eerdere experimenten misschien wel wilt bewaren. Mogelijk kopieer je steeds je script naar een nieuw bestand, maar dat is niet erg \emph{DRY}.\footnote{\emph{DRY} staat voor \emph{Don't Repeat Yourself}, een belangrijk principe in software engineering.} Als je dan bijvoorbeeld een functie of klasse wilt aanpassen, moet dat nog steeds op heel veel plekken. Daarom is het handig om gebruik te maken van \emph{modules}.

Eenvoudig gezegd is een module een stuk Python code dat je kunt importeren en gebruiken. Meestal worden er in een module handige functies en klasses gedefinieerd:
\begin{pyconcode}
  >>> import math
  >>> math.sqrt(2)
  1.4142135623730951
  >>> math.pi
  3.141592653589793
  >>> math.sin(.5 * math.pi)
  1.0
\end{pyconcode}
Door de \pythoninline{math} module te importeren hebben we opeens de beschikking over het getal $\pi$ en de sinus- en wortelfunties.

Je kunt je eigen code ook importeren, maar hier moet je wel even opletten. Stel, we hebben een bestand \filepath{square.py}:
\begin{pythoncode}
  # square.py
  def square(x):
      return x ** 2


  print(f"The square of 4 is {square(4)}")
\end{pythoncode}
Als je deze code runt is de uitvoer:
\begin{consolecode}
  The square of 4 is 16
\end{consolecode}
Zoals verwacht! Maar nu willen we in een nieuw script, \filepath{just\_count.py}, de functie importeren en gebruiken:
\begin{pythoncode}
  # just_count.py
  import square

  print(f"The square of 5 is {square.square(5)}")  
\end{pythoncode}
\begin{minopdracht}
  Waarom staat er in bovenstaande code nu opeens \pythoninline{square.square()} in plaats van gewoon \pythoninline{square()}?
\end{minopdracht}
Maar nu is er een probleem met de uitvoer van dit script:
\begin{consolecode}
  The square of 4 is 16
  The square of 5 is 25
\end{consolecode}
Tijdens het importeren wordt alle code die aanwezig is in \filepath{square.py} ook daadwerkelijk gerunt. Er zijn twee manieren om dit op te lossen:
\begin{enumerate}
  \item Alle `extra' code verwijderen uit de module (\filepath{square.py})
  \item De code in de module \emph{alleen} laten runnen als de module als script wordt aangeroepen, maar \emph{niet} wanneer de module wordt geïmporteerd
\end{enumerate}
De tweede oplossing kan van pas komen. Je past dan \filepath{square.py} als volgt aan:
\begin{pythoncode}
  # square.py
  def square(x):
      return x ** 2


  if __name__ == "__main__":
      print(f"The square of 4 is {square(4)}")
\end{pythoncode}
Wanneer je een python script runt is de speciale variabele \pythoninline{__name__} gelijk aan de string \verb|__main__|. Maar als je een module importeert is
\pythoninline{__name__} gelijk aan de \emph{naam} van de module; in dit geval \verb|square|. Met bovenstaande constructie wordt de code alleen uitgevoerd wanneer de module direct gerunt wordt:
\begin{ps1concode}
  PS> python square.py
  The square of 4 is 16
  PS> python just_count.py
  The square of 5 is 25
\end{ps1concode}
Het \pythoninline{if __name__ == '__main__'}-statement wordt heel veel gebruikt in Python modules.

\begin{minopdracht}[modules]
  \label{opd:importeer_module}
  Maak zelf de bestanden \path{square.py} en \path{just\_count.py} aan en probeer het importeren uit, met en zonder het \pythoninline{if __name__ == '__main__'}-statement.
\end{minopdracht}


## Packages
\label{sec:packages}

In Python zijn \emph{packages} collecties van modules. Ook krijg je automatisch \emph{namespaces}. Dat wil zeggen, wanneer je functies en modules uit een package importeert zitten ze niet in één grote vormeloze berg, maar in een soort boomstructuur. Dat betekent dat namen niet uniek hoeven te zijn. Er zijn duizenden bibliotheken beschikbaar voor python (\verb|numpy|, \verb|scipy|, \verb|matplotlib|, etc.) en die mogen allemaal een module \verb|test| bevatten. Namespaces zorgen ervoor dat je ze uniek kunt benaderen:
\begin{pythoncode}
  import numpy.test
  import scipy.test
\end{pythoncode}
In bovenstaande code zijn \pythoninline{numpy} en \pythoninline{scipy} afzonderlijke namespaces. Ook zijn \pythoninline{numpy.test} en \pythoninline{scipy.test} afzonderlijke namespaces. De namen van bijvoorbeeld variabelen en functies binnen die modules zullen nooit met elkaar in conflict komen.

Wij gaan in deze cursus onze code ook in packages stoppen. Op die manier kun je een softwarebibliotheek opbouwen voor je experiment en die code makkelijker delen met andere onderzoekers. Een pakket is opgebouwd zoals weergegeven in \figref{fig:packagetree}: iedere package bestaat uit een directory met een \filepath{\_\_init\_\_.py}-bestand.\footnote{Dat bestand is vaak leeg, maar kan code bevatten die gerunt wordt zodra het package wordt geïmporteerd.}
\begin{figure}
  % \centering
  \quad
  \begin{forest}
    for tree={grow'=0,folder,font=\ttfamily}
    [\githubrepo{my\_project\_folder}
      [\folderpath{my\_pkg}
        [\filepath{\_\_init\_\_.py}]
        [\folderpath{pkg1}
          [\filepath{\_\_init\_\_.py}]
          [\filepath{module1.py}]
          [\filepath{module2.py}]
        ]
        [\folderpath{pkg2}
          [\filepath{\_\_init\_\_.py}]
          [\filepath{module3.py}]
        ]
        [\filepath{module4.py}]
      ]
    ]
  \end{forest}
  \caption{Voorbeeld van een directorystructuur van een Python package.}
  \label{fig:packagetree}
\end{figure}
De verschillende modules uit \figref{fig:packagetree} kun je als volgt importeren en gebruiken (we gaan er even vanuit dat iedere module een functie \pythoninline{some_func()} bevat):
\begin{pythoncode}
  # module direct importeren
  import my_pkg.pkg1.module1
  my_pkg.pkg1.module1.some_func()

  # losse module vanuit een package importeren
  from my_pkg.pkg1 import module2
  module2.some_func()

  # module importeren onder een andere naam
  import my_pkg.module4 as m4
  m4.some_func()
\end{pythoncode}

In deze cursus gaan we ook packages maken. Feitelijk hoeven we een python script dus alleen maar in een map te stoppen en in diezelfde map een lege \filepath{\_\_init\_\_.py} aan te maken.

\begin{warning}
  Let op: als je de \filepath{\_\_init\_\_.py} vergeet dan lijkt alles het alsnog te doen. Maar je maakt nu een \emph{implicit namespace package} waarbij bepaalde directories toch weer op een grote hoop gegooid worden. Geloof me, echt niet handig.\footnote{En wat mij betreft: een fout dat zoiets überhaupt kan in Python. Zen of Python: \emph{explicit is better than implicit.}} Namespace packages kunnen handig zijn voor grote projecten, maar dat is het dan ook wel. Wij gaan hier niet verder op in. Kortom: let op en gebruik \emph{altijd} een \filepath{\_\_init\_\_.py}.
\end{warning}

% \begin{info}
%   Als je in een module een andere module wilt importeren dan zijn daarvoor twee opties: relatieve en absolute imports. Relatief wil zeggen: importeer module1 uit \emph{dezelfde} directory, of ten opzichte van deze directory (\texttt{..} betekent een directory hoger bijvoorbeeld). Bij een absolute import moet je de volledige locatie binnen het package opgeven. Als voorbeeld, stel dat \texttt{module1} uit \figref{fig:packagetree} de modules \texttt{module2} en \texttt{module3} wil importeren:
%   \begin{pythoncode}
%     # module1.py

%     # relative imports
%     from . import module2
%     from ..pkg2 import module 3

%     # absolute imports
%     from my_pkg.pkg1 import module2
%     from my_pkg.pkg2 import module3
%   \end{pythoncode}
%   Absolute imports zijn wat meer werk, maar je maakt wel heel duidelijk welke module je wilt importeren. Relative imports zorgen in de praktijk regelmatig voor -- soms lastig te vinden -- bugs. Als je tegen problemen aanloopt: gebruik dan absolute imports.
% \end{info}

\begin{minopdracht}[packages]
  \label{opd:test_package}
  In deze opdracht ga je oefenen met het aanmaken van packages, modules en het importeren en aanroepen daarvan.
  \begin{enumerate}
    \item Maak een package \pythoninline{models} met twee modules: \pythoninline{polynomials} en \pythoninline{tests}.
    \item In de \pythoninline{polynomials}-module maak je een functie \pythoninline{line(x, a, b)} die de de vergelijking voor een lijn voor ons berekent: $y = ax + b$.
    \item In de \pythoninline{tests}-module maak je een functie \pythoninline{test_line()} die het volgende doet:
          \begin{enumerate}
            \item gebruik de \pythoninline{line()}-functie uit de \pythoninline{polynomials}-module om de $y$-waarde uit te rekenen voor een bepaald punt bij een gegeven $a$ en $b$.
            \item Vergelijk die berekende waarde met de waarde die het volgens jij moet zijn (met de hand nagerekend).
            \item Print \texttt{TEST PASSED} als het klopt, en \texttt{TEST FAILED} als het niet klopt.
          \end{enumerate}
    \item Maak een script die:
          \begin{enumerate}
            \item Een grafiek maakt van jouw lijn. Bepaal zelf het domein en de waardes voor $a$ en $b$.
            \item De test uitvoert door de \pythoninline{test_line()}-functie aan te roepen.
            \item Pas je \pythoninline{line()}-functie eventjes aan om te kijken of je test ook echt werkt. Bijvoorbeeld: bij $y = ax$ zou je \texttt{TEST FAILED} moeten zien.
          \end{enumerate}
  \end{enumerate}
\end{minopdracht}


## De Standard Library en de Python Package Index

Voor Python zijn ontzettend veel bibliotheken beschikbaar die het leven een stuk aangenamer maken. Voor een gedeelte daarvan geldt dat ze altijd aanwezig zijn als je Python geïnstalleerd hebt. Deze set vormt de \emph{standard library} \cite{python-standard-library}. Om te voorkomen dat je zelf het wiel uitvindt is het goed om af en toe door de lijst te bladeren zodat je een idee krijgt wat er allemaal beschikbaar is. Ziet het er bruikbaar uit? Lees dan vooral de documentatie! Tip: vergeet de \emph{built-in functions} niet.

Verder zijn er nog eindeloos veel packages beschikbaar gesteld door programmeurs, van hobbyist tot multinational. Deze kunnen centraal gepubliceerd worden in de \emph{Python Package Index} \cite{pypi}. Je kunt daar vaak ook zien hoe populair een package is. Dit is een belangrijke indicatie voor de kwaliteit en bruikbaarheid van een package.


## Exceptions

Exceptions zijn de foutmeldingen van Python. Je krijgt ze als je bijvoorbeeld probeert te delen door nul of wanneer je een typefout maakt in de naam van een method of attribute:
\begin{pyconcode}
  >>> 1 / 0
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  ZeroDivisionError: division by zero
  >>> s = "particle"
  >>> s.upler()
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  AttributeError: 'str' object has no attribute 'upler'
\end{pyconcode}
Merk op dat je een exception met traceback meestal van onder naar boven leest. Onderaan staat de foutmelding (exception) en daar boven een \emph{traceback}: een kruimelpad van wáár in de code het probleem optrad; onderaan de regel waarin het echt fout ging, en naar boven toe alle tussenliggende functies en bibliotheken met bovenaan het hoofdprogramma.

Een exception kan vervelend zijn. Het is een beetje jammer als je bijvoorbeeld tijdens een langdurige meting telkens een weerstand aan het uitrekenen bent ($R = \frac{U}{I}$) en de stroomsterkte $I$ wordt na anderhalf uur heel eventjes nul. Je programma crasht en je metingen zijn weg. Zoek de fout (niet altijd makkelijk!) en probeer het nog eens.

Je kunt exceptions afvangen en afhandelen met een \pythoninline{try...except} blok:
\begin{pythoncode}
  def R(U, I):
      try:
          R = U / I
      except ZeroDivisionError:
          R = "Inf"
      return R
\end{pythoncode}
\begin{pyconcode}
  >>> R(10, 2)
  5.0
  >>> R(10, 0)
  'Inf'
\end{pyconcode}

Ook kun je zelf exceptions maken. Stel je schrijft een programma om een oscilloscoop uit te lezen dat twee kanalen heeft om de spanning te meten. Kanaal 0 en kanaal 1. Het programma moet gebruikt kunnen worden door andere studenten in de onderzoeksgroep dus het kan nu eenmaal gebeuren dat iemand niet op zit te letten -- niet jij, jij let altijd goed op. Een andere student die een programma schrijft en jouw code gebruikt wil een spanning meten op kanaal 2, het was immers een tweekanaals oscilloscoop. Maar kanaal 2 bestaat niet. Sommige oscilloscopen klagen dan niet maar geven een random getal terug. Dit kan leiden tot heel vervelende en lastig te achterhalen fouten in het experiment. Met dat idee in je achterhoofd kun je code schrijven die controleert op het kanaalnummer en een exception geeft:
\begin{pythoncode}
  # we maken een subclass van de 'standaard' Exception
  class InvalidChannelException(Exception):
      pass

  def get_voltage(channel):
      if channel not in [0, 1]:
          raise InvalidChannelException(f"Use channel 0 or 1, not {channel}")
      ...
      return voltage
\end{pythoncode}
Met deze uitvoer in het geval dat er iets mis gaat:
\begin{pyconcode}
  >>> get_voltage(1)
  1.0
  >>> get_voltage(2)
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
      get_voltage(2)
    File "exc_channel.py", line 6, in get_voltage
      raise InvalidChannelException(f"Use channel 0 or 1, not {channel}")
  InvalidChannelException: Use channel 0 or 1, not 2
\end{pyconcode}
Je kunt op deze manier voorkomen dat iemand dagen kwijt is aan het overdoen van achteraf verkeerd gebleken metingen. Ook kun je 'vage' foutmeldingen omzetten in duidelijkere foutmeldingen:
\begin{pythoncode}
  class NoCurrentError(Exception):
      pass


  def R(U, I):
      try:
          R = U / I
      except ZeroDivisionError:
          raise NoCurrentError("There is no current flowing through the resistor.")
      return R
\end{pythoncode}
In plaats van een \pythoninline{ZeroDivisionError} krijg je nu een \pythoninline{NoCurrentError}. Je programma crasht nog steeds (wellicht niet handig) maar de foutmelding is nu wel specifiek voor het probleem en kan in de rest van je programma wellicht beter afgevangen en opgelost worden. Misschien beter dan niet crashen en een mogelijk foute waarde doorgeven. Die afweging zul je zelf moeten maken.

\begin{minopdracht}[exceptions]
  De volgende code berekent een gemiddelde van een lijst getallen:
  \begin{pythoncode}
    def average(values):
        return sum(values) / len(values)    
  \end{pythoncode}
  Er is alleen geen foutafhandeling en dat kan leiden tot exceptions. De volgende aanroepen zorgen voor een crash (probeer ze allemaal uit!):
  \begin{pythoncode}
    average([])
    average(4)
    average("12345")
  \end{pythoncode}
  Pas de functie \pythoninline{average()} zodanig aan dat bij bovenstaande aanroepen slechts een waarschuwing wordt geprint. Vang daartoe de exceptions netjes af en geef de waarde \pythoninline{None} terug wanneer een gemiddelde niet berekend kan worden. Dus bovenstaande drie aanroepen krijgen \pythoninline{None} terug terwijl er een waarschuwing wordt geprint.
\end{minopdracht}


\begin{figure}[b]
  \begin{verbatim}
    1 bytes = 8 bits which has 256 possible values.
    2 bytes = 16 bits which has 65536 possible values.
    4 bytes = 32 bits which has 4294967296 possible values.
    8 bytes = 64 bits which has 18446744073709551616 possible values.
  \end{verbatim}
  \caption{De uitvoer van het in eerste instantie cryptische scriptje op \mypageref{code_bytes}.}
  \label{fig:uitvoer_bytes}
\end{figure}
