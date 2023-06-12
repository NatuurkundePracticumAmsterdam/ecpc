\chapter{Introductie}

Welkom bij de cursus \emph{experimentautomatisering met Python}. Je zou ook kunnen spreken van \emph{data-acquisitie met Python}. Het doel van deze cursus is om jullie kennis te laten maken met het aansturen en uitlezen van een experiment.

Bij heel eenvoudige experimenten kun je metingen één voor één verrichten en noteren in je labjournaal, bijvoorbeeld bij de trillingstijd van een slinger bij verschillende lengtes. Maar al snel wordt dan ondoenlijk, bijvoorbeeld wanneer je de hele beweging van de slinger wilt volgen met een ultrasoon afstandsdetector. In een gemiddeld lab worden alle experimenten via de computer aangestuurd en uitgelezen. Voor `standaard' handelingen zoals het bekijken van een sample onder een elektronenmicroscoop of het opnemen van een spectrum van een radioactieve bron kun je de door de fabrikant meegeleverde software gebruiken. Vaak echter is die software óf heel duur terwijl je maar een klein deel van de functionaliteit nodig hebt, of ongeschikt voor jouw doeleinden. En heel vaak voer je géén standaardexperiment uit, maar ben je een nieuw experiment aan het opzetten. In dat laatste geval is er helemaal geen software voor handen. Je zult dus zelf aan de slag moeten.

We willen je in deze cursus niet alleen maar leren om een snelle meting uit te voeren, maar ook hoe je de code \emph{netjes} schrijft. Als je een bachelorproject doet, een masterstage, of een promotieonderzoek, dan wil je code schrijven die nog steeds bruikbaar is nadat je je stage hebt afgerond of je proefschrift hebt verdedigd. Ook zullen andere onderzoekers aan dezelfde code werken. Het is dus belangrijk om te zorgen voor een duidelijke structuur waarmee de code overzichtelijk blijft maar ook makkelijk is aan te passen of uit te breiden.

Jullie gaan aan de slag met een Arduino. De Arduino bevat firmware waarmee het zich gedraagd als een meetinstrument en kan communiceren met de computer volgens een standaardprotocol dat ook geïmplementeerd wordt door onder andere functiegeneratoren en oscilloscopen.


\section{Notatie}

We zullen in deze handleiding vaak Engelse termen gebruiken, ook als Nederlandse termen voorhanden zijn. Bijvoorbeeld: `list' in plaats van lijst, `class' in plaats van klasse. Dit omdat deze Engelse termen veel meer ingeburgerd zijn en omdat voor sommige van de Engelse termen geen goede vertalingen zijn. Liever wat consequenter Engelse termen gebruiken dan alles door elkaar!

In deze handleiding kom je twee verschillende dingen tegen. Pythoncode en systeemopdrachten. Voor pythoncode geldt dat je in Visual Studio Code een nieuw bestand moet aanmaken met de extensie \texttt{.py} en dat je daarin de code kunt typen. Vervolgens kun je het script runnen en geeft Visual Studio Code de uitvoer terug. In deze handleiding zal dat als volgt worden weergegeven:
\begin{pythoncode}
  # Ik ben een script. Ik sta in een gekleurd blok en de Pythoncode heeft gekleurde syntax. Lange regels krijgen een pijltje om aan te geven dat ze in de handleiding zijn afgebroken, maar in de editor moeten ze als één regel worden ingetypt.

  def my_func(x):
      return x ** 2

  print(my_func(2))
\end{pythoncode}

Ook zullen we soms systeemopdrachten moeten uitvoeren. We willen bijvoorbeeld de een nieuwe Pythonbibliotheken installeren of onze nieuw-gebouwde applicaties testen. Dit doen we vanuit de \emph{terminal}. De terminal biedt een zogeheten \emph{command-line interface} voor het systeem. Dit in tegenstelling tot een grafische interface.

De prompt ziet er in verschillende besturingssystemen (en \emph{shells}) anders uit. We gebruiken hier de op Windows gebaseerde conventie dat we de prompt weergegeven als \verb|PS>| Met deze notatie kun je als volgt \filepath{my-script.py} met python runnen:
\begin{ps1concode}
PS> python my-script.py
\end{ps1concode}

Let dus op de verschillende code blocks. Is het een Python script of zijn het commando's die je moet uitvoeren in een terminal?


\section{Opgaves}

In de handleiding staan verschillende opgaves. De meeste zijn bedoeld als oefening, maar sommige moet je inleveren voor feedback en een beoordeling.

\begin{info}
  In sommige programmeercursussen is het de bedoeling dat je een bepaald algoritme \emph{zelf} schrijft. Je moet bijvoorbeeld een loop schrijven om een reeks berekeningen uit te voeren en mag dan niet gebruik maken van de NumPy-bibliotheek om dat in één regel te doen. Je kunt je voorstellen dat als je straks in een lab werkt dat je \emph{juist} gebruik wilt maken van bibliotheken die het leven een stuk gemakkerlijker maken. Trek dus alles uit de kast. Kijk in de \citetitle{python-standard-library} \cite{python-standard-library}, op \citetitle{pypi} \cite{pypi} of \citetitle{awesome-python} \cite{awesome-python}.
\end{info}

\begin{warning}
  Er is één uitzondering op bovenstaande regel. Er zijn \emph{Python frameworks} beschikbaar die specifiek geschreven zijn om makkelijk interfaces voor experimenten te maken. Ze bevatten een groep drivers voor apparatuur van verschillende fabrikanten en beloven dat je met een paar regels code een heel experiment aan elkaar kunt knopen. Hoewel dat een mooie belofte is zijn het bijna alleen maar pakketten die geschreven zijn door een specifiek lab, vóór dat specifieke lab, in de hoop dat het breder toepasbaar wordt. Ze zijn daarmee eigenlijk te specifiek en je moet flink de documentatie induiken als je iets wilt doen dat nog niet bedacht is door de oorspronkelijke auteurs. Daarom worden ze weinig gebruikt en is de kans dat jullie daar later mee gaan werken klein. Liever leren we jullie hoe zo'n pakket in elkaar zit en daarmee ook een beetje hoe je zo'n pakket zelf schrijft. Doe vooral ideeën op, maar \textbf{gebruik ze niet}. Als je twijfelt of je een bibliotheek mag gebruiken, overleg dan met je begeleider.
\end{warning}

\begin{minopdracht}
    Deze opgaves helpen je om het niveau te behalen wat van je verwacht wordt. Ze worden niet beoordeeld.
\end{minopdracht}

\begin{inleveropdracht}
    Deze opgave moet worden ingeleverd voor feedback en een beoordeling. Je herkent ze aan de groene kleur. De opgaven bouwen voort op elkaar, dus er zijn meerdere opgaven. Je levert ze niet los in, maar als geheel. Kijk goed bij de assignments op canvas welke groene opdrachten je gemaakt moet hebben voordat je het inlevert. 
\end{inleveropdracht}

\begin{bonusopdracht}
    Dit zijn bonusopgaves. Het zijn verdiepende en verbredende opgaves om je te kunnen ontwikkelen tot een goed programmeur en een waardevolle aanwinst voor een onderzoeksgroep. Je kunt er geen extra punten mee verdienen wanneer je deze technieken toepast in je inleveropdrachten, maar het is wel een goede oefening. Doe deze opgaves \emph{alleen} als je klaar bent met de rest.
\end{bonusopdracht}