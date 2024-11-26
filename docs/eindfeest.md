# Eindfeest

Jullie hebben tijdens deze cursus heel veel geleerd. Nu wordt het tijd om dat toe te passen op een nieuw project! Jullie worden hiervoor _niet beoordeeld_. Dat geeft jullie de vrijheid om in een ontspannen sfeer dingen uit te proberen. Jullie hebben al een hele structuur opgebouwd en misschien hoef je alleen maar je model en view te kopiëren en wat dingen aan te passen; misschien heb je hele wilde plannen en begin je met een nieuw project. Het mag allemaal, zolang jullie wel een plan hebben en het te maken heeft met het aansturen van een experiment vanuit Python.

Hebben jullie een eigen plan? Overleg met de staf! Als we het plan goedkeuren kunnen jullie meteen aan de slag; anders kunnen we bespreken wat er allemaal wél kan. We hebben een paar projecten ter suggestie. De meeste zijn behoorlijk open en we geven geen garantie dat je het werkend krijgt in twee dagdelen, maar dat kan ook juist een leuke uitdaging zijn! De meest 'veilige' optie die het meest lijkt op het experiment dat we tot nu toe gedaan hebben staat onderaan (de zonnecel).

## Michelson interferometer

Eén van de experimenten uit het eerste jaar is de Michelsoninterferometer. We hebben die in het klein als bouwpakket aangeschaft bij het [Nikhef](https://outreach.web.nikhef.nl/michelson-interferometer-bouwpakket/). Hij moet nog in elkaar worden gezet (niet heel moeilijk) maar het zou leuk zijn als de metingen (kies je eigen onderzoeksvraag!) geautomatiseerd kunnen worden. Daarvoor moet dan nog wel de opstelling uitgedacht worden en zijn er ongetwijfeld onderdelen nodig (motortje, sensor, ...?). Dus als dit je leuk lijkt, begin dan _snel_ met ideeën bedenken zodat we _voor_ het eindfeest onderdelen kunnen bestellen.

## Morse code communicatie

Type op je computer een tekst, druk op 'verzend', en zie de tekst verschijnen bij je buurmens. We kennen dit allemaal van e-mail, Discord, Whatsapp, etc. Dat kan via communicatie over het internet, maar het kan ook met Morse. Schrijf een chat-applicatie waarmee je tekst kunt verzenden van de ene computer en kunt ontvangen op de andere computer. Gebruik daarvoor een LED om te verzenden en een _light-dependent resistor (LDR)_ om te ontvangen. Hiervoor moet je nog een eenvoudige schakeling bouwen. Als het werkt kun je het ook uitbreiden naar bidirectionele communicatie: heen en weer chatten.

## Ocean Optics

Tijdens het eerste jaar heb je misschien het spectroscopie-experiment uitgevoerd. Hierbij heb je een spectroscoop gebouwd om gasontladingslampen te onderzoeken. Handmatig heb je spectraallijnen opgezocht, hoeken genoteerd en omgerekend naar golflengtes. Dat was een tijdrovende klus. Het bedrijf _Ocean Optics_ brengt digitale spectroscopen op de markt. Je richt die op een lichtbron en krijgt een dataset van de lichtsterkte bij verschillende golflengtes. De modellen die wij hebben worden niet meer ondersteund en er is geen software meer voor beschikbaar. Maar: we hebben wel documentatie gevonden over hoe we ze aan kunnen sturen. Je kunt dus zelf een applicatie schrijven om een spectrum te meten! Binnen een seconde heb je dan een volledig spectrum gemeten; heel anders dan vorig jaar!

## Functiegenerator / Oscilloscoop

Functiegeneratoren en oscilloscopen behoren tot de standaarduitrusting van een natuurkundig laboratorium. Dat je ze met de hand kunt bedienen kan heel fijn zijn om snel dingen uit te proberen, maar is lastiger als je uitgebreidere experimenten wilt uitvoeren die deels met de computer bediend worden. Daarom zijn veel modellen met de computer aan te sturen en uit te lezen. Ontwikkel daarvoor een applicatie naar keuze.

## PicoScope

Omdat oscilloscopen nog vaak gebruikt worden voor experimenten komen er ook steeds meer modellen op de markt die je _alleen_ met de computer aan kunt sturen. We gebruiken de PicoScope 5000 Series in ons eigen lab bijvoorbeeld voor het uitlezen van de scintillatordetectoren voor deeltjesdetectie. In hun eentje vervangen die een batterij aan oude apparatuur. De manier van aansturen gaat wel wat anders dan bij de Arduino. Als je dat leuk vindt kun je zelf een interface maken om de PicoScope aan te sturen en uit te lezen. Je kunt hiervoor een functiegenerator gebruiken om het signaal aan te leveren, maar als je wilt mag je bij voldoende toezicht ook op de zaal met radioactieve bronnen werken.

## Arduino Nano 33 IoT

De Arduino die wij gebruiken heeft ook nog ingebouwde sensoren. De leukste is een versnellingsmeter / gyroscoop. Hiermee kun je de snelheid van rotaties meten of de stand van de Arduino ten opzichte van de lokale gravitatierichting. Door de firmware aan te passen met nieuwe firmwarecommando's kun je die ook uitlezen met een Pythonapplicatie. Je zou de stand van de Arduino kunnen gebruiken als een soort muiscursor of een joystick. Eén student heeft een keer een 3D-model op het scherm getoond die meedraaide met de echte Arduino.

## De $I,U$-karakteristiek van een zonnecel

In het eerste jaar bepalen natuurkundestudenten een $I,U$-curve van een zonnepanneel. Zij variëren met de hand de weerstand en lezen de stroom en spanning af. Wij gaan het experiment automatiseren zodat met één druk op de knop een $I,U$-curve getoond wordt. 

Deze opdracht is vergelijkbaar met wat we tot nu toe hebben gedaan. We gaan wederom een $I,U$-curve bepalen, maar niet van een diode maar van een zonnepaneel. Een zonnepaneel gedraagt zich &mdash; afhankelijk van de belastingsweerstand van het circuit &mdash; soms als een spanningsbron en soms als een stroombron. Het geleverde vermogen is ook zeer afhankelijk van deze belasting. Voor de werking van de zonnecel en een beschrijving van de $I,U$- en $P,R$-curves, zie [_hoofdstuk Zonnecel_](zonnecel.md).

### De schakeling

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