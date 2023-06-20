# Eindopdracht

In het eerste jaar bepalen natuurkundestudenten een $I,U$-curve van een zonnepanneel. Zij variëren met de hand de weerstand en lezen de stroom en spanning af. Wij gaan het experiment automatiseren zodat met 1 druk op de knop een $I,U$-curve getoond wordt. 

Deze opdracht is vergelijkbaar is met wat we tot nu toe gedaan hebben. We gaan wederom een $I,U$-curve bepalen, maar niet van een diode maar van een zonnepaneel. Een zonnepaneel gedraagt zich, afhankelijk van de belastingsweerstand van het circuit, soms als een spanningsbron en soms als een stroombron. Het geleverde vermogen is ook zeer afhankelijk van deze belasting. Voor de werking van de zonnecel en een beschrijving van de $I,U$- en $P,R$-curves, zie \appref{ch:zonnecel}.


## De schakeling

De equivalente schakeling die we gaan bouwen is weergegeven in \figref{fig:pv-equivalente-schakeling}.
\begin{figure}
  \centering
  \includestandalone{figures/PV-vervang-schakeling}
  \caption{Het equivalente circuit van de schakeling om een zonnepaneel door te meten. $R_\text{var}$ is hier de variabele weerstand die in serie is geschakeld met een stroomsterktemeter. Parallel staat een spanningsmeter om de spanning van het zonnepaneel te meten.}
  \label{fig:pv-equivalente-schakeling}
\end{figure}
We gebruiken een variabele weerstand $R_\text{var}$ om de belasting van het zonnepaneel te variëren. Deze is in serie geschakeld met een stroomsterktemeter om de stroomsterkte door het circuit te meten. Parallel is een spanningsmeter geschakeld waarmee we de spanning die geleverd wordt door het zonnepaneel kunnen meten.

Merk op dat onze Arduino geen stroomsterktemeter heeft. We zullen dus de spanning over een kleine weerstand moeten meten om zo &mdash; met behulp van de wet van Ohm &mdash; de stroomsterkte te bepalen. Een ander probleem is dat de spanning die geleverd wordt door het zonnepaneel groter kan zijn dan de 3.3 V die maximaal op de pinnen mag staan. Hiervoor gaan we gebruik maken van een 3:1 spanningsdeler zodat de spanning altijd onder de 3.3 V zal blijven. Het laatste probleem is de variabele weerstand: er zijn variabele weerstanden te koop waarbij de weerstand zeer nauwkeurig kan worden gekozen. Helaas is de minimale weerstand, ten gevolge van de vrij ingewikkelde interne schakelingen, te groot om de maximale stroom van een zonnepaneel te meten. Daarom maken we gebruik van een type veldeffect transistor, de MOSFET. Een MOSFET is feitelijk een soort schakelaar. Afhankelijk van de spanning die op de _gate_ gezet wordt, is de weerstand tussen de _source_ (aarde, minpool) en de _drain_ (pluspool)\footnote{De namen _source_ en _drain_ verwijzen hier naar de elektronenstroom. Elektronen worden geleverd door de source (aard, minpool) en stromen dan naar de drain (pluspool).} te variëren tussen nul en oneindig. Er is maar een relatief klein gebied waarin de weerstand snel verandert van oneindig naar nul.

De schakeling voor onze Arduino is weergegeven in \figref{fig:arduino-PV-breadboard}. Hier belasten we het zonnepaneel met een MOSFET. In serie hiermee staat een kleine weerstand van 4.7 &Omega; waarover we de spanning meten ten behoeve van de bepaling van de stroomsterkte. De pin van de Arduino die verbonden is met de _gate_ van de MOSFET is beschermd met een weerstand van 1 \kilo&Omega;. Dit is belangrijk, want wanneer er een spanning gezet wordt op de gate kan er kortdurend een vrij grote stroom lopen. De gate gedraagt zich als een kleine capaciteit. Parallel aan de MOSFET + weerstand is een 3:1 spanningsdeler geschakeld met weerstanden van \qtylist{2;1}{\mega&Omega;}.

\begin{figure}
  \centering
  \includegraphics[scale=.75]{figures/PV-measurement_bb}
  \raisebox{0.5cm}{\includestandalone{figures/PV-schakeling}}
  \caption{In de linkerfiguur is een Arduino Nano 33 IoT op een 400-punt breadboard geschakeld. In de rechterfiguur is het schema weergegeven van dezelfde schakeling. Aan de linkerkant van het breadboard is de serieschakeling van de MOSFET met de kleine weerstand geplaatst. De rechterkant bevat de spanningsdeler. Het zonnepaneel zelf wordt aan de $+$ en $-$ power rails aan de rechterkant van het bord geschakeld (de twee pinnen rechtsboven, zonnepaneel niet weergegeven).}
  \label{fig:arduino-PV-breadboard}
\end{figure}