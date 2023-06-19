# Zonnecel
\label{ch:zonnecel}

De toenemende behoefte aan energie heeft het zoeken naar nieuwe energiebronnen belangrijk gemaakt. Zonne-energie is \'{e}\'{e}n van de veelbelovende, niet conventionele bronnen. Zonne-energie is echter niet meteen bruikbaar en moet eerst omgezet worden naar warmte of elektrische energie. De omzetting van zonne-energie naar een bruikbare vorm van energie kan gedaan worden door een zonneboiler of een zonnecel. In de komende sessies staat de zonnecel centraal. Je gaat allerlei eigenschappen van zonnecellen onderzoeken en proberen te verklaren.


## De fotovolta\"{ische zonnecel}
Stralingsenergie van de zon is een vorm van energie die niet erg nuttig is voor de meeste toepassingen. Om de energie van de zon nuttig te kunnen gebruiken, moet de straling omgezet worden. Een mogelijkheid daartoe is de fotovolta\"ische zonnecel. In de zonnecel maken fotonen uit het zonlicht geladen (elektrische) deeltjes vrij die via metaalcontacten op de zonnecel door een extern circuit kunnen stromen om daar hun elektrische energie af te geven. Zolang er licht valt op de zonnecel gaat het proces van vrijmaken van elektronen door en wordt er een elektrische stroom geproduceerd.

\subsubsection{Werking}

\begin{figure}[t]
  \center{\includegraphics[width=90mm]{figures/CEL_zonnecel.png}}
  \caption{Werking van een zonnecel. Een foton met voldoende energie kan een elektron-gat-paar maken. Door de grenslaag tussen het n-type silicium en het p-type-silicium kan het elektron alleen linksom stromen, door het externe circuit, en het gat alleen rechtsom.}
  \label{fig:cel}
\end{figure}

De werking van de zonnecel is schematisch weergegeven in figuur \ref{fig:cel}. Een zonnecel bestaat uit twee soorten siliciumkristallen, een bovenlaag van het n-type silicium en een tweede, dikkere laag van het p-type silicium. In het n-type silicium kunnen elektronen gemakkelijk bewegen, terwijl in het p-type silicium de gaten (positieve lading) makkelijk kunnen bewegen. Tussen het p- en n-type silicium ontstaat een grenslaag, welke een barri\`{e}re vormt voor zowel de elektronen als de gaten. Deze zogenoemde pn-junctie is de basis van de huidige elektronica en heeft vele toepassingen, zo ook in de zonnecel.

In een zonnecel is de n-laag zo dun dat het zonlicht de grenslaag kan bereiken. Als er nu een foton op de grenslaag valt, en het foton heeft voldoende energie, dan maakt dat foton een elektron-gat-paar. Kijkend naar figuur \ref{fig:cel} kunnen de elektronen door de grenslaag niet rechtsom bewegen en de gaten niet linksom.  Het elektron gaat nu linksom stromen en het gat rechtsom. Er ontstaat dus een elektrische stroom. Na doorlopen van het externe circuit recombineert het elektron weer met het gat in het p-type silicium. De maximale stroom die gaat lopen wordt bepaald door het aantal elektron-gat-paren dat gevormd wordt. De maximale spanning die over de zonnecel komt te staan wordt bepaald door de energie die daarvoor nodig is (bedenk dat [U] = J/C!).

Om een elektron-gat-paar in een silicium zonnecel te maken is een energie nodig van 1.12 eV (elektronvolt). De energie van een foton ($E_f$) is gelijk aan
\begin{equation}
  E_f = \frac{hc}{\lambda}
\end{equation}
waar $h$ staat voor de constante van Planck ($h \approx 4.136 \cdot 10^{-15} \text{ eV} \cdot \text{s}$), $c$ staat voor de snelheid waarmee licht zich voortplant ($c \approx 2.998 \cdot 10^8$ ms$^{-1}$) en $\lambda$ staat voor de golflengte van het licht. Dit betekent dat een foton met een golflengte van ongeveer
\[
  \lambda = \frac{(4.136 \cdot 10^{-15} \text{ eV} \cdot \text{s}) \cdot (2.998 \cdot 10^8 \text{ ms}^{-1})}{1.12 \text{ eV}}\approx 1100 \  {\rm nm}
\]
in staat is om een elektron-gat-paar te maken. Fotonen met een golflengte groter dan 1100 nm hebben een lagere energie dan 1.12 eV en daarvoor is de zonnecel niet gevoelig. Fotonen met een kortere golflengte dan 1100 nm hebben een hogere energie dan nodig is. Zij maken wel een elektron-gat-paar, maar het overschot aan energie wordt niet omgezet in elektrische energie, deze energie gaat verloren als warmte.

Op YouTube staat de volgende video met uitleg over de werking van de zonnecel: \href{https://www.youtube.com/watch?v=L_q6LRgKpTw}{video} <q>How do solar cells work?</q>.


\subsubsection{Vereenvoudigde modelbeschrijving}
De werking van een zonnecel hangt sterk samen met de werking van een diode. Een diode heeft de bijzondere eigenschap dat afhankelijk van de polariteit over de diode het \'{o}f geen stroom door laat en dus een oneindige hoge weerstand heeft, \'{o}f alle stroom doorlaat en bij benadering een weerstand van 0 heeft. Preciezer gezegd: voor een diode geldt dat de stroom die doorgelaten wordt, afhangt van de spanning over de diode. De stroom door een diode, $I_d$, wordt (bij benadering) gegeven door
\begin{equation}
  I_d = I_0 \left( {\rm e}^{\frac{eU}{kT}} - 1 \right),
  \label{eqn:diode}
\end{equation}
waarbij $e$ de elektronlading is ($e \approx 1.602 \cdot 10^{-19}$ C), $U$ de spanning over de diode, $k$ de Boltzmannconstante ($k \approx {1.381} \cdot 10^{-23}$ JK$^{-1}$) en $T$ de temperatuur. $I_0$ is de lekstroom van de diode. Als de spanning over de diode negatief is, geldt dat $\exp \left( \frac{eU}{kT} \right) \ll 1$ en is $I_d \approx - I_0 \approx 5-7 \; \mu$A en dus bij benadering 0.  Als de spanning over de diode positief is groeit de stroom exponentieel en is de weerstand van de diode bij benadering 0. Dit gedrag wordt ge\"{i}llustreerd in figuur \ref{fig:diode}.

\begin{figure}[t]
  \center{\includegraphics[width=70mm]{figures/diode.png}}
  \caption{Links het symbool waarmee een diode weergegeven wordt in een schakeling en rechts een $IU$-karakteristiek van een diode.}
  \label{fig:diode}
\end{figure}

\begin{figure}[b!]
  \center{\includegraphics[width=70mm]{figures/zc.png}}
  \caption{Een vereenvoudigde voorstelling van een zonnecel met daarop aangesloten een belastingsweerstand $R_b$. $I_L$ is de stroom opgewekt door elektron-gat-paren, $I_d$ is de stroom die door de diode loopt en $I$ is de stroom die door belastingsweerstand $R_b$ loopt, die aangesloten is op de zonnecel.}
  \label{fig:zc}
\end{figure}

Voor een eerste benadering kun je een zonnecel voorstellen als een speciale stroombron, zoals weergegeven is in figuur \ref{fig:zc}. In deze schakeling is ook de belastingsweerstand $R_b$ over de zonnecel getekend. De stroom die geleverd wordt door de zonnecel, $I$, hangt af van de stroom ten gevolge van het aantal elektron-gat-paren dat gemaakt wordt door het zonlicht, $I_{L}$, en de stroom door de diode, $I_d$. Dus:
\begin{equation}
  I = I_L - I_d.
\end{equation}
Met behulp van vergelijking \ref{eqn:diode} kun je bovenstaande vergelijking verder uitschrijven. In de exponent voor de diode komt er echter nog een factor $n$ bij die samenhangt met de materiaaleigenschappen van de zonnecel. Waarden van $n$ liggen typisch tussen 1 en 5, afhankelijk van het type zonnecel. Voor het type zonnecel waarmee je in dit experiment zult werken is $n$ ongeveer 10-15. De stroom die de zonnecel levert wordt nu bij benadering gegeven door
\begin{equation}
  \label{eq:zc}
  I = I_{L} - I_d = I_{L} - I_0 \left( {\rm e}^{ \frac{e U}{nkT}} - 1 \right).
\end{equation}

### \texorpdfstring{$I,U${I,U}-karakteristiek}

In de praktijk zul je altijd metingen doen aan zonnepanelen, waarbij zonnecellen in het paneel samengebracht zijn. De spanning die over een zonnepaneel staat hangt onder andere af van het aantal zonnecellen dat in serie geschakeld is. De stroom dat een zonnepaneel kan leveren wordt bepaald door het aantal elektron-gat-paren dat gemaakt wordt of, anders gezegd, door het aantal fotonen dat geabsorbeerd wordt. Het is echter niet zo dat je zonder meer kunt stellen dat wanneer er zonlicht op een zonnepaneel valt er een maximale spanning over het paneel staat en dat de stroom toeneemt als de lichtintensiteit toeneemt.
%Een zonnepaneel heeft namelijk een interne weerstand die afhankelijk is van het aantal elektron-gat-paren dat aanwezig is en, niet onbelangrijk, waar de elektron-gat-paren gevormd worden in het zonnepaneel (dit hangt o.a. samen met de eerder genoemde $n$ factor voor ons vereenvoudigde model voor een zonnecel). 
Het is daarom zinvol om, voordat je aan een experiment begint, het gedrag van een zonnepaneel te onderzoeken. In eerste instantie doe je dit door te kijken naar de $IU$-karakteristiek van het zonnepaneel. Zo'n karakteristiek is weergegeven in \figref{fig:I,U-zonnecel}.
% en het elektrisch vermogen $P$ dat het zonnepaneel kan leveren.
Als je naar de $IU$-karakteristiek kijkt, zie je dat het zonnepaneel bij lage spanningen zich gedraagt als een niet-ideale stroombron. Als je rond de maximale spanning kijkt, zie je dat het zonnepaneel zich daar vrijwel gedraagt als een niet-ideale spanningsbron.

\begin{figure}
  \centering
  \begin{tikzpicture}
    \clip (-1em, -1.2em) rectangle (8, 5.5);
    \begin{scope}
      \clip (0, 0) rectangle (8, 5);
      \draw[very thick, domain=0:7] plot (\x, {4 - 1e-2 * (exp(\x) - 1)});
    \end{scope}
    \draw[->, thick] (0, 0) &mdash; (7, 0) node[right] {$U_\text{PV}$};
    \draw[->, thick] (0, 0) &mdash; (0, 5) node[above] {$I$};
    \node[below left] at (0, 0) {0};
  \end{tikzpicture}
  \caption{De stroom die geleverd kan worden door een zonnecel uitgezet tegen de spanning $U_\text{PV}$ geleverd door de zonnecel. Hier staat PV voor _PhotoVoltaic cell_.}
  \label{fig:I,U-zonnecel}
\end{figure}


### \texorpdfstring{$P,R_b${P,Rb}-karakteristiek}

Het is bij zonnepanelen natuurlijk interessant om naar het elektrisch vermogen te kijken dat een zonnepaneel kan leveren. Het geleverd vermogen door een zonnepaneel hangt af van de materiaaleigenschappen van het paneel. Om een zo hoog mogelijk vermogen te kunnen leveren moet het zonnepaneel een zo hoog mogelijke stroom en spanning leveren. Belangrijk ook is dat het vermogen afhangt van de belasting door het circuit. Met andere woorden: bij verschillende weerstandswaardes wordt een ander vermogen geleverd. Ook is er een optimale weerstand waarbij het vermogen maximaal is (\figref{fig:P,R-zonnecel}).

\begin{figure}
  \centering
  \begin{tikzpicture}
    % \clip (-1em, -1.2em) rectangle (8, 5.5);
    \draw[very thick] (0, 0) .. controls (1, 4) and (1.5, 4.5) .. (2, 4.5) .. controls (2.5, 4.5) and (4, 3) .. (6.75, 2);
    \draw[->, thick] (0, 0) &mdash; (7, 0) node[right] {$R$};
    \draw[->, thick] (0, 0) &mdash; (0, 5) node[above] {$P$};
    \node[below left] at (0, 0) {0};
  \end{tikzpicture}
  \caption{Het vermogen dat geleverd kan worden door een zonnecel uitgezet tegen de belasting (weerstand) van het circuit. Er is duidelijk een maximum in het vermogen bij een optimale weerstand.}
  \label{fig:P,R-zonnecel}
\end{figure}


% \subsubsection{Verdieping (extra)}

%### Uitgebreidere modelbeschrijving
%Als je naar de $IU$-karakteristiek kijkt, zie je dat het zonnepaneel bij lage spanningen zich gedraagt als een niet-ideale stroombron. Als je rond de maximale spanning kijkt, zie je dat het zonnepaneel zich daar vrijwel gedraagt als een niet-ideale spanningsbron. Met deze kennis is het mogelijk om het vereenvoudigde model van de zonnecel (zie figuur \ref{fig:zc} en vergelijking \ref{eq:zc}) iets uit te breiden. Voor een niet-ideale stroombron heb je eerder gezien dat er parallel aan de stroombron een interne weerstand, een shuntweerstand $R_{sh}$, staat. Voor een niet-ideale spanningsbron is er een interne weerstand in serie aanwezig, een serieweerstand $R_s$. Als we hier rekening mee houden, kunnen we het model voor de zonnecel uitbreiden zoals weergegeven is in figuur \ref{fig:zc2}. 

%Door rekening te houden met beide interne weerstanden wordt vergelijking \ref{eq:zc} gegeven als
%\begin{equation}
%\label{eq:zc2}
%I = I_{L} - I_d - I_{R_{sh}} = I_{L} - I_0 \left( {\rm e}^{ \frac{e (U+I R_s)}{nkT}} - 1 \right) - \frac{U+I R_s}{R_{sh}}.
%\end{equation}
%Deze vergelijking ziet er indrukwekkend uit, maar eigenlijk zijn er ten opzichte van vergelijking \ref{eq:zc} maar twee dingen toegevoegd. Zo staat in vergelijking \ref{eq:zc} de spanning $U$ voor de spanning over de diode, welke in het vereenvoudigde model gelijk is aan de spanning gemeten over de belastingsweerstand $R_b$. De totale spanning die over de stroombron staat, wordt in het uitgebreidere model verdeeld over de serieweerstand $R_s$ en de belastingsweerstand $R_b$. Daarmee wordt de spanning over de diode $U+I R_s$, waarbij $U$ gelijk staat aan de spanning over de belastingsweerstand $R_b$. Verder heb je in het uitgebreidere model stroom lopen door de diode, de shuntweerstand $R_{sh}$ en door het externe circuit. Om te weten hoeveel stroom er door het externe circuit loopt, moet je in vergelijking \ref{eq:zc} nog de stroom $I_{R_{sh}}$ die door de shuntweerstand loopt meenemen en aftrekken van de stroom $I_L$ opgewekt door elektron-gat-paren. En deze twee toevoegingen geven vergelijking \ref{eq:zc2}.

%\begin{figure}					
%\center{\includegraphics[width=70mm]{Figures/zc2.png}}	    
%\caption{Een voorstelling van een zonnecel waarbij rekening gehouden wordt met interne weerstanden met daarop aangesloten een belastingsweerstand. $I_L$ is de stroom opgewekt door elektron-gat-paren, $I_d$ is de stroom die door de diode loopt en $I$ is de stroom die door belastingsweerstand $R_b$ loopt die aangesloten is op de zonnecel. $R_{sh}$ en $R_s$ zijn interne weerstanden die toegevoegd zijn aan het vereenvoudigde model.}			
%\label{fig:zc2}											   
%\end{figure}

%\begin{opdracht}
%\begin{deelvraag}
%1. Leg uit waaraan je kunt zien dat het zonnepaneel zich bij lage spanningen gedraagt als een niet-ideale stroombron.
%1. Leg uit waaraan je kunt zien dat het zonnepaneel zich rond de maximale spanning gedraagt als een niet-ideale spanningsbron.
%1. Leg uit hoe de $IU$-karakteristiek verandert wanneer de waarde van $R_{sh}$ kleiner wordt.
%1. Leg uit hoe de $IU$-karakteristiek verandert wanneer de waarde van $R_{s}$ groter wordt.
%\end{deelvraag}
%\end{opdracht}

### Fill factor
De kwaliteit van een zonnecel/-paneel wordt experimenteel vaak aangeduid met de fill factor $FF$. De fill factor wordt gegeven door
\begin{equation}
  FF = \frac{P_{max}}{P_{T_{max}}} = \frac{I_{max} \cdot U_{max}}{I_{sc} \cdot U_{oc}},
\end{equation}
waarbij $P_{max}$ het maximaal vermogen is wat een zonnecel/-paneel levert en $P_{T_{max}}$ het theoretisch maximaal vermogen is. $I_{sc}$ is de kortsluitstroom (bij een belastingsweerstand $R_b$ gelijk aan 0) en $U_{oc}$ de open klemspanning (wanneer het zonnepaneel niet belast wordt). $I_{max}$ en $U_{max}$ zijn de waarden voor respectievelijk de stroom en spanning waarbij het geleverd vermogen maximaal is.


### Maximum power point tracking

De optimale weerstand waarbij het vermogen dat geleverd wordt door een zonnecel maximaal is, is helaas geen constante. Deze weerstandswaarde is afhankelijk van verschillende condities waarbij de belangrijkste de lichtintensiteit op de zonnecel is. Dat betekent dat, zonder aanpassingen, het vermogen dat geleverd wordt door de zonnecel meestal veel lager is dan je zou wensen.

Voor zonnepanelen die elektriciteit leveren aan het lichtnet is dit een groot probleem. Allereerst wil je je investering zo snel mogelijk terugverdienen en ook daarna wil je dat de opbrengst maximaal is. Ten tweede is het zo dat de weerstand van het lichtnet bijzonder klein is. Het vermogen dat daardoor geleverd wordt is ook heel klein. Dit wordt opgelost door &mdash; envoudig gezegd &mdash; de verbinding tussen het zonnepaneel en het lichtnet vele malen per seconde aan en uit te schakelen. Hierdoor <q>voelt</q> het zonnepaneel als het ware een weerstand. Deze weerstand is afhankelijk van de hoeveelheid tijd dat het paneel niet aan het lichtnet is geschakeld. Door slim te schakelen kan de weerstand zó gekozen worden dat het geleverde vermogen maximaal is. Als de lichtintensiteit wijzigt kan ook de weerstand worden aangepast. Dit heet _maximum power point tracking_.