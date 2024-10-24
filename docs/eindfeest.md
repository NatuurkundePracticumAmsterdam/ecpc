# Eindopdracht

In het eerste jaar bepalen natuurkundestudenten een $I,U$-curve van een zonnepanneel. Zij variëren met de hand de weerstand en lezen de stroom en spanning af. Wij gaan het experiment automatiseren zodat met één druk op de knop een $I,U$-curve getoond wordt. 

Deze opdracht is vergelijkbaar met wat we tot nu toe hebben gedaan. We gaan wederom een $I,U$-curve bepalen, maar niet van een diode maar van een zonnepaneel. Een zonnepaneel gedraagt zich &mdash; afhankelijk van de belastingsweerstand van het circuit &mdash; soms als een spanningsbron en soms als een stroombron. Het geleverde vermogen is ook zeer afhankelijk van deze belasting. Voor de werking van de zonnecel en een beschrijving van de $I,U$- en $P,R$-curves, zie [_hoofdstuk Zonnecel_](zonnecel.md).


## De schakeling

In de figuur hieronder is de equivalente schakeling die we gaan bouwen weergegeven.

<div id="fig:pv-equivalente-schakeling"></div>
![Equivalente schakeling zonnepaneel](figures/PV-vervang-schakeling.svg){: style="width:60%"}

We gebruiken een variabele weerstand $R_\text{var}$ om de belasting van het zonnepaneel te variëren. Deze is in serie geschakeld met een stroomsterktemeter om de stroomsterkte door het circuit te meten. Parallel is een spanningsmeter geschakeld waarmee we de spanning die geleverd wordt door het zonnepaneel kunnen meten.

Merk op dat onze Arduino geen stroomsterktemeter heeft. We zullen dus de spanning over een kleine weerstand moeten meten om zo &mdash; met behulp van de wet van Ohm &mdash; de stroomsterkte te bepalen. Een ander probleem is dat de spanning die geleverd wordt door het zonnepaneel groter kan zijn dan de 3.3 V die maximaal op de pinnen mag staan. Hiervoor gaan we gebruik maken van een 3:1 spanningsdeler zodat de spanning altijd onder de 3.3 V zal blijven &mdash; volgens de specificaties komt de maximale spanning van het zonnepaneel in de meest ideale omstandigheden uit op 10 V.[@solar-panel] Het laatste probleem is de variabele weerstand: er zijn variabele weerstanden te koop waarbij de weerstand zeer nauwkeurig kan worden gekozen. Helaas is de minimale weerstand, ten gevolge van de vrij ingewikkelde interne schakelingen, te groot om de maximale stroom van een zonnepaneel te meten. Daarom maken we gebruik van een type veldeffect transistor, de MOSFET. Een MOSFET is feitelijk een soort schakelaar. Afhankelijk van de spanning die op de _gate_ gezet wordt, is de weerstand tussen de _source_ (aarde, minpool) en de _drain_ (pluspool)[^source_drain] te variëren tussen nul en oneindig. Er is maar een relatief klein gebied waarin de weerstand snel verandert van oneindig naar nul.

[^source_drain]: De namen _source_ en _drain_ verwijzen hier naar de elektronenstroom. Elektronen worden geleverd door de source (aard, minpool) en stromen dan naar de drain (pluspool). 


De schakeling voor onze Arduino is weergegeven in de figuur hieronder. Hier belasten we het zonnepaneel met een MOSFET. In serie hiermee staat een kleine weerstand van 4.7 &Omega; waarover we de spanning meten ten behoeve van de bepaling van de stroomsterkte. De pin van de Arduino die verbonden is met de _gate_ van de MOSFET is beschermd met een weerstand van 1 k&Omega;. Dit is belangrijk, want wanneer er een spanning gezet wordt op de gate kan er kortdurend een vrij grote stroom lopen. De gate gedraagt zich als een kleine capaciteit. Parallel aan de MOSFET + weerstand is een 3:1 spanningsdeler geschakeld met weerstanden van 2 M&Omega; en 1 M&Omega;. 

![Schakeling zonnepaneel](figures/PV-schakeling.svg){: style="width:75%"}

In de 3D-model[^bronpv] hieronder is een Arduino Nano 33 IoT op een 400-punt breadboard geschakeld. Aan de linkerkant van het breadboard is de serieschakeling van de MOSFET met de kleine weerstand geplaatst. De pinnen van de MOSFET zijn van boven naar beneden de gate, de drain (+) en de source (-). De rechterkant bevat de spanningsdeler. Het zonnepaneel zelf wordt aan de $+$ en $-$ power rails aan de rechterkant van het bord geschakeld. 

<div id="fig:arduino-PV-breadboard"></div>
<!-- ![Arduinoschakeling zonnepaneel](figures/PV-measurement_bb.svg){: style="width:50%"} -->

<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
<model-viewer id="model" style="width: 100%; height: 700px;" alt="Schakelschema PV" src="../assets/circuit/Breadboard_PV.glb" ar shadow-intensity="1" camera-controls touch-action="pan-y" poster="../assets/circuit/breadboard_pv_top_view.png" camera-orbit="0rad 0.39269908169872414rad 4.718948223475571m" autoplay exposure="0.6"></model-viewer>

[^bronpv]: Dit model bevat twee 3D modellen die zijn gecreëerd door Lara Sophie Schütt en AppliedSBC en zijn gedeeld onder respectievelijk een CC-BY en CC-BY-SA licentie. De originele modellen zijn te vinden via [[CC0] Set of Electronic Components](https://sketchfab.com/3d-models/cc0-set-of-electronic-components-f4cb777b4ea3490587008e24b61bcf75) en [Arduino Nano 33 IoT](https://sketchfab.com/3d-models/arduino-nano-33-iot-f57fd7f5485a47a8b71f8604872fd78c). De modellen zijn samengevoegd en Voorzien van een Arduino texture, mosfet, zonnecel en draden. Dit 3D model heeft een CC-BY-SA licentie.