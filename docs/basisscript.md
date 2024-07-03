# Basisscript voor het experiment

Het experiment wat we gaan uitvoeren is het bepalen van de $I,U$-karakteristiek van een LED. Omdat de Arduino alleen getallen tussen 0 en 1023 kan sturen en ontvangen moeten we nadenken over de Analoog-digitaalconversie voordat we een zinnige $I,U$-karakteristiek kunnen maken. 

## Analoog-digitaalconversie (ADC)

We hebben tot nu toe gewerkt met getallen van 0-1023 sturen en ontvangen. Wat is precies de betekenis van deze getallen? Daarvoor moeten we dieper ingaan op hoe de Arduino &mdash; en computers in het algemeen &mdash; getallen omzet in een spanning en hoe spanningen door de Arduino worden gemeten.

Een _analoog_ signaal is continu in zowel de tijd als de waardes die het signaal aan kan nemen. Een _digitaal_ signaal is echter discreet: op vaste tijdstippen is er een waarde bekend en het signaal kan maar een beperkt aantal verschillende waardes aannemen. Een vallende bal is een continu proces. De bal heeft op elk willekeurig moment een positie. Je zou de positie kunnen meten op het tijdstip $t$ = 2.0 s, maar ook op $t$ = 2.1, 2.01, 2.001 of 2.0001 s. Ook kun je de positie net zo nauwkeurig bepalen als je wilt.[^nauwkeurigheid] De natuur is analoog,[^analoog] maar moderne computers zijn digitaal en dus discreet. Als je een foto op je computer te ver inzoomt zie je blokjes. Je kunt verder inzoomen, maar je gaat niet meer detail zien. De hoeveelheid informatie is beperkt.

[^nauwkeurigheid]: Uiteraard afhankelijk van de nauwkeurigheid van je meetinstrument.
[^analoog]: Totdat je het domein van de kwantummechanica betreedt, dan blijkt de natuur ook een discrete kant te hebben.

_Bemonsteren_ of _sampling_ is het proces waarbij een analoog signaal wordt <q>uitgelezen</q> en wordt omgezet in een digitaal signaal. Zo wordt een audiosignaal al sinds eind jaren '70 van de vorige eeuw gewoonlijk bemonsterd met een frequentie van 44.1 kHz en een resolutie van 16 bits. Dus 44100 keer per seconde wordt er gekeken wat de waarde van het geluidssignaal is en dat wordt opgeslagen als een getal van 16 bits en kan dus $2^{16} = 65536$ verschillende waardes aannemen. Dit is nauwkeuriger dan het menselijk gehoor kan onderscheiden.

De conversie van een analoog signaal naar een digitaal signaal (en andersom!) is de reden dat de spanningen die we kiezen en de metingen die we doen niet alle mogelijke waardes kunnen aannemen, maar <q>stapjes</q> maken.

![Omzetting van analoog naar digitaal signaal](figures/adc-process.svg){: style="width:75%"}

De omzetting van een analoog signaal naar een digitaal signaal gebeurt als volgt. De ADC (_analog-to-digital converter_) _in dit voorbeeld_ ondersteunt 16 niveau's (4-bits) in een bereik van 0 V tot 3.3 V (groen gearceerd). Lagere of hogere spanningen kunnen niet gemeten worden (rood gearceerd). Op gezette tijden wordt een meting gedaan (rode punten) waarbij de uitkomst van de meting het discrete niveau is dat het dichtst bij de analoge waarde ligt. Als het signaal te groot wordt kan de ADC als het ware <q>vastlopen</q> op het hoogste niveau. In de rechterflank is waar te nemen dat als het analoge signaal langzaam verandert dat het digitale signaal duidelijk sprongsgewijs verandert. Hoe meer niveau's een ADC heeft en hoe vaker het signaal bemonsterd kan worden, hoe nauwkeuriger het digitale signaal het analoge signaal benadert.

![Het digitale signaal](figures/adc-process_p2.svg){: style="width:75%"}

De digitale metingen die je programma krijgt van de ADC is hierboven weergegeven. De onzekerheid is gelijk aan de halve afstand tot het volgende niveau. In lichtgrijs zie je het oorspronkelijke analoge signaal. De meting benadert het signaal dus maar gedeeltelijk. De Arduino die we gebruiken heeft een bereik van 0 V tot 3.3 V en &mdash; in tegenstelling tot het voorbeeld hierboven &mdash; een resolutie van 10 bits, dus $2^{10} = 1024$ stapjes. Als je een experiment ontwerpt is het dus van belang te weten dat je nooit kunt meten met een nauwkeurigheid kleiner dan de stapgrootte. Voor ons is deze resolutie prima.

!!! opdracht-basis "Volt naar ADC"
    We kunnen alleen maar de getallen 0 t/m 1023 naar de Arduino sturen. Ook krijgen we alleen maar dat bereik terug.

    1. Schrijf de formule op waarmee je een spanning in V omrekent naar een ruwe ADC waarde, én omgekeerd.
    1. Wat is precies het kleinste spanningsverschil dat we nog kunnen meten in V? Een meting kan dus nooit nauwkeuriger gedaan worden dan deze waarde.
    1. Bereken welke spanning hoort bij een ruwe waarde van 700.
    1. Bereken welke waarde we naar de Arduino moeten sturen als we een spanning willen instellen van 2.0 V. En een spanning van 2.28 V?

???+ meer-leren "Binair Talstelsel"

    ### Binair Talstelsel

    Wij schrijven onze getallen op in een _decimaal_ (tientallig) talstelsel. We hebben tien verschillende cijfers (0 t/m 9) en plakken bij grotere getallen de tientallen, honderdtallen, etc. aan elkaar. Computers werken met _binaire_ getallen &mdash; een tweetallig talstelsel. Dat betekent dat computers het getal 0 en 1 zonder problemen kunnen opslaan, maar bij het getal 2 wordt het al lastig. Zij moeten dan al met <q>tientallen</q> werken en schrijven het getal 2 op als 10. Het getal 3 is dan 11. Voor 4 zijn de cijfers alweer op en moeten we overschakelen naar <q>honderdtallen</q>, dus 4 is 100, 5 is 101, enz. Zie onderstaande tabel voor nog een paar voorbeelden. De cijfers noem je _bits_ en het getal 5 (101 binair) bestaat dus uit 3 bits. Als je maar 3 bits tot je beschikking hebt kun je $2^3 = 8$ verschillende getallen opslaan, dus 0 t/m 7. Een groepje van 8 bits (256 mogelijkheden) bleek een handige hoeveelheid en kun je op computers individueel opslaan. Zo'n groepje noem je een _byte_. Bestanden bestaan uit bytes, kilobytes (duizend bytes), megabytes (miljoen bytes) of gigabytes (miljard bytes). Wanneer je een signaal nauwkeurig wilt verwerken met een computer dan is het belangrijk om zoveel mogelijk bits tot je beschikking te hebben. Hoe meer bits, hoe meer verschillende waardes je kunt opslaan en hoe nauwkeuriger je signaal wordt bewaard.

    Voorbeelden van het binair talstelsel:

    | decimaal getal | binair getal |
    |----------------|--------------|
    | 0              | 0            |
    | 1              | 1            |
    | 2              | 10           |
    | 3              | 11           |
    | 4              | 100          |
    | 5              | 101          |
    | 6              | 110          |
    | 7              | 111          |
    | 8              | 1000         |
    | 9              | 1001         |
    | &hellip;       | &hellip;     |
    | 205            | 11001101     |


## De I,U-karakteristiek van een LED

Je hebt op de middelbare school ongetwijfeld de $I,U$-karakteristiek van een ohmse weerstand onderzocht. Je neemt een <q>gewone</q> weerstand en zet daar een steeds hogere spanning op. Je meet de stroomsterkte en ook die neemt toe &mdash; rechtevenredig zelfs! Door $I$ tegen $U$ uit te zetten in een grafiek en de beste lijn door je metingen te trekken vind je met de richtingscoëfficiënt de inverse van de weerstand $R^{-1}$:

![I,U-curve van een weerstand](figures/I,U-curve-resistor.svg){: style="width:75%"}

Een LED is een lichtgevende diode &mdash; en een diode gedraagt zich _heel_ anders. Met de schakeling die we hebben gebouwd kunnen we de $I,U$-karakteristiek van een LED bepalen. Voor meer informatie over de fysica achter diodes, zie de [appendix Diodes](diodes.md).

!!! opdracht-inlever "Pythondaq: repository"
    Omdat we met een belangrijk project aan de slag gaan, namelijk een inleveropdracht, gaan we gelijk goed beginnen door een repository aan te maken. 

    1. Open Github Desktop en ga naar **File > New repository ...**. Geef de repository een naam (Pythondaq) en kies een locatie. Let er op dat je deze map _niet_ in een andere repository aanmaakt, maar daarbuiten. Overleg eventueel over een handige plek.
    1. Vink `Initialize this repository with a README` aan.
    1. Kies bij `Git ignore` voor <q>Python</q>.
    1. Ga naar **Repository > Open in Visual Studio Code** en ga aan de slag. Vergeet niet regelmatig te committen!

!!! opdracht-inlever "Pythondaq: start script"
    Voer de volgende opdrachten uit:

    1. Schrijf een script waarin je de spanning over de LED laat oplopen van nul tot de maximale waarde. Kijk wat er gebeurt met de LED.
    1. Commit.
    1. Hoe bepaal je de spanning over de weerstand? Overleg met elkaar welke spanningen je precies meet met de verschillende kanalen (_channels_) die op de Arduino zijn aangesloten. Kijk nog eens goed naar de [figuur van de schakeling](communicatie.md#fig:LED-schakeling).
    1. Lees &mdash; tijdens het laten oplopen van de spanning over de LED &mdash; de spanning over de _weerstand_ uit. Je zult daarvoor het antwoord van de Arduino (een _string_) om moeten zetten naar een _integer_ en print steeds een regel met: ruwe waarde spanning op LED, voltage op LED, ruwe waarde spanning over weerstand, voltage weerstand. Voorbeeld van uitvoer:
    ``` consolecode
    On LED:  750 (2.4 V)    Over resistor:  189 (0.6 V)
    ```
    Je hebt nu feitelijk je eerste metingen verricht!
    1. Commit! {{feesttoeter}}


Je kunt de meetgegevens kopiëren en plakken naar een tekstbestand, spreadsheetprogramma of Python notebook o.i.d. Maar dat is wel veel werk, zeker als je metingen wilt herhalen. Op dit moment hebben we ook alleen nog maar _ruwe_ metingen. We gaan hier voorbij aan het feit dat we graag de stroomsterkte door de LED $I$ zouden willen uitzetten tegen de spanning over de LED $U_\mathrm{LED}$.

!!! info
    In de volgende opdracht gaan we een grafiek maken. Installeer Matplotlib in je conda environment (zorg dat die geactiveerd is!):
    ``` ps1 title="Terminal"
    conda install -c conda-forge matplotlib
    ```

<div id="opd:quickndirty-meting"></div>
!!! opdracht-inlever "Pythondaq: Quick 'n dirty meting"
    Bereken in je script de spanning _over_ en de stroomsterkte _door_ de LED en bewaar deze metingen in een lijst met spanningen en een lijst met stroomsterktes. Sluit je meting netjes af (zorg dat de LED niet blijft branden) en maak dan een grafiek van je metingen. Bekijk elkaars resultaten &mdash; ook van andere groepjes &mdash; en denk na of je meting fysisch helemaal correct is.



## Bewaren van meetgegevens

Het is fijn dat je script de meetgegevens op het scherm kan printen en een grafiek maakt, maar als je echt bezig bent met een onderzoek is een grafiek niet genoeg. Je wilt dat de data bewaard blijft zodat je die later nog kunt gebruiken voor nieuwe analyses. Ook is het zo dat data steeds vaker beschikbaar moet zijn voor andere wetenschappers die jouw onderzoek willen controleren. Steeds meer wetenschappelijke tijdschriften vragen auteurs niet alleen hun grafieken, maar ook hun onderliggende data beschikbaar te maken en te publiceren. Op die manier is het veel moeilijker om fraude te plegen; iets dat in de wetenschap helaas soms nog voor komt.

Er zijn ontzettend veel verschillende bestandsformaten waarin je data kunt bewaren. Er zijn grofweg twee categoriën: tekstbestanden en binaire bestanden. De eerste zijn te lezen met ieder willekeurig programma. Sommige zijn heel eenvoudig (b.v. CSV), andere kunnen complexe datastructuren en extra informatie opslaan (b.v. JSON, XML). Binaire bestanden bevatten alle mogelijke karakters &mdash; niet alleen letters, cijfers, leestekens, maar ook _stuurcodes_ zoals _carriage return_ en de _line feed_, oorspronkelijk opdrachten voor bijvoorbeeld printers. Ze hebben vaak een strak formaat: zoveel bytes voor dit stukje informatie, zoveel bytes voor dat stukje, enzovoort. Met binaire karakters hoef je je dus niet te beperken tot letters, cijfers en leestekens en kunnen de bestanden wat kleiner zijn. Ook zorgen de vaste afspraken ervoor dat de lees- en schrijfroutines eenvoudiger kunnen zijn. Getallen worden in het interne geheugen van de computers ook binair opgeslagen dus het is vaak copy/paste vanuit of naar het bestand. Wel leiden kleine fouten vaak tot onbruikbare bestanden. Voor grote databestanden wordt vrijwel altijd gekozen voor een binair formaat, of het nou gaat om audio/video, databases of klimaatmodellen. Het uitwisselen van kleinere bestanden gebeurt echter vaak in een tekstformaat.


### Comma-separated values (CSV)

Het CSV-bestand is het werkpaard van de wetenschap. Als je data van het ene in het andere programma moet krijgen of je download wetenschappelijke gegevens van een website dan is het CSV-bestand vaak de beste keuze. Het formaat bestaat uit kolommen met getallen, gescheiden door een komma. De eerste regels kunnen commentaar bevatten (uitleg over de kolommen, bijvoorbeeld) en de namen van de kolommen bevatten. Een voorbeeld voor de afstand die een vallend voorwerp aflegt in 10 s, gegeven door $s = \frac{1}{2} g t^2$, is hieronder weergegeven:

```
t,s
0.0,0.0
1.0,4.9
2.0,19.6
3.0,44.1
4.0,78.4
5.0,122.50000000000001
6.0,176.4
7.0,240.10000000000002
8.0,313.6
9.0,396.90000000000003
10.0,490.00000000000006
```

Het CSV-bestand heeft kolommen $t$ en $s$. De getallen hebben een punt als decimaal scheidingsteken en de komma wordt gebruikt om de kolommen te scheiden. Je kunt CSV-bestanden schrijven en lezen met de modules `#!py csv`, `#!py numpy` of `#!py pandas`. De eerste is altijd meegeleverd met Python en is speciaal geschreven voor het bestandsformaat,[@csv-module] maar NumPy[@numpy;@numpy-paper] en Pandas[@pandas;@pandas-paper] bevatten veel meer functionaliteit op het gebied van wiskunde en data-analyse. Als je die modules toch al gebruikt hoef je niet te kiezen voor de <q>kale</q> csv module.

#### De functie `#!py zip()`

Het viel je misschien op dat in bovenstaand CSV-bestand iedere regel een $t$-waarde en een $s$-waarde heeft. Als je een lijst met $t$'s en een lijst met $s$'en hebt dan bevat de eerste regel het eerste element uit beide lijsten, de tweede regel het tweede element, etc. Je kunt dan een for-loop schrijven die Python's indexnotatie gebruikt: `#!py t[i]`, `#!py s[i]`, etc. Het kan óók, makkelijker, met de `#!py zip()`-functie. Beide methodes kun je als volgt gebruiken in het geval van twee[^meer-dan-twee] lijsten A en B:

=== "with_zip.py"
    ``` py hl_lines="4 5"
    --8<-- "scripts/with_zip.py"
    ```
=== "with_indexing.py"
    ``` py hl_lines="4 5"
    --8<-- "scripts/with_indexing.py"
    ```

[^meer-dan-twee]: Je kunt net zoveel lijsten in `#!py zip()` gooien als je wilt: `#!py for a, b, c, d, e in zip(A, B, C, D, E)` is geen probleem.

Vergelijk beide methodes goed. In het geval van `#!py zip()` hoef je niet de lengte van de lijst op te zoeken en krijg je meteen de losse elementen zonder dat je ze zelf uit de lijst moet plukken met indexnotatie.

!!! opdracht-basis "oefenen met zip"
    Gegeven de spanningen $U$ en de bijbehorende stroomsterktes $I$: 
    ```py
    U = [1.2, 1.8, 2.4, 2.7, 3.1] # V
    I = [0.3, 0.4, 0.6, 0.8, 1.0] # A
    ```
    loop over de lijsten met `#!py zip()` en print voor iedere iteratie de spanning $U$, de stroomsterkte $I$ en de weerstand $R$.


#### Het gebruik van de `#!py csv`-module

Wanneer je de `#!py csv`-module wilt gebruiken moet je éérst een bestand openen om in te schrijven, daarna een <q>writer</q> object aanmaken, en dat object gebruiken om regels te schrijven. Daarna moet het bestand netjes afgesloten worden zodat het ook echt naar schijf weggeschreven wordt. Het openen en sluiten van een bestand kun je Python het beste laten doen met het `#!py with`-statement:[^context-manager]

``` py hl_lines="1"
with open('metingen.csv', 'w', newline='') as csvfile:
    # csvfile is nu een bestandsobject
    ...
    # na dit blok sluit Python automatisch het bestand
```

Bij `#!py open()` geef je eerst de naam van een bestand, dan `#!py 'w'` om aan te geven dat het bestand <q>writeable</q> moet zijn (gebruik `#!py 'r'` om te lezen) en `#!py newline=''` om Python niet zelf regeleindes te laten schrijven; dat doet de `#!py csv`-module. Op de volgende manier schrijven we dan de CSV-data weg:

``` py hl_lines="1 4-8"
import csv

with open('metingen.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['t', 's'])
    writer.writerow([0.0, 0.0])
    writer.writerow([1.0, 4.9])
    writer.writerow([2.0, 19.6])
    ...
```
Je kunt het wegschrijven van de regels vervangen door een for-loop.

[^context-manager]: hier is `#!py open()` een zogeheten <q>context manager</q>, een functie die je kunt gebruiken met een `#!py with`-statement en dat bij de start iets doet &mdash; hier een bestand openen &mdash; en bij het eind iets doet &mdash; hier het bestand weer netjes afsluiten. Je kunt zelf ook context managers schrijven, als je wilt.

<div id="opd:quickndirty-csv"></div>
!!! opdracht-inlever "Pythondaq: CSV"
    Breid je script uit zodat de data niet alleen maar weergegeven wordt in een grafiek maar ook wordt weggeschreven als CSV-bestand. Gebruik de `#!py zip()`-functie en de `#!py csv`-module.


???+ opdracht-meer "CSV bestandsnaam"
    Pas de code zodanig aan dat een CSV-bestand nooit wordt overschreven. Je kunt bijvoorbeeld controleren of het bestand al bestaat en aan de bestandsnaam een oplopend getal toevoegen (`data-001.csv`, `data-002.csv`, etc.) totdat je uitkomt bij een bestandsnaam die nog niet bestaat. Controleer dat je programma ook echt geen data overschrijft.



???+ meer-leren "HDF5, PyTables"
    
    ### HDF5, PyTables

    Een populair binair formaat in de wetenschappelijke wereld is HDF5.[^HDF5] [@hdf5] Je kunt hiermee verschillende datasets bewaren in één bestand. Je kunt een soort boomstructuur aanbrengen en zo verschillende datasets groeperen en er ook nog extra informatie (metadata) aanhangen zoals datum van de meting, beschrijving van de condities, etc. Je kunt een meetserie opslaan als reeks die in één keer in en uit het bestand wordt geladen maar ook als tabel. Die laatste biedt de mogelijkheid om &mdash; net als in een database &mdash; data te selecteren en alleen die data in te laden uit het bestand. Op die manier is het mogelijk om met datasets te werken die groter zijn dan het geheugen van je computer.[^HDF-blog] Meer informatie lees je in de [tutorial](http://www.pytables.org/usersguide/tutorials.html) van PyTables[@pytables].

    [^HDF5]: Hierarchical Data Format Version 5, in gebruik bij bijvoorbeeld de LOFAR radiotelescoop, het IceCube neutrino-observatorium en de LIGO zwaartekrachtsgolvendetector.

    [^HDF-blog]: Lees bijvoorbeeld [deze korte blog post](https://www.hdfgroup.org/2015/03/hdf5-as-a-zero-configuration-ad-hoc-scientific-database-for-python/) over het gebruik van HDF5.

    PyTables[@pytables] is een Python bibliotheek die het werken met HDF5-bestanden makkelijker maakt. Er zijn uiteraard functies om de bestanden aan te maken en uit te lezen maar ook om _queries_ uit te voeren. Pandas kan &mdash; via PyTables &mdash; ook werken met HDF5-bestanden. 

    !!! opdracht-meer "HDF5 tutorial"
        Download de <a href="hdf5_tutorial.ipynb">HDF5 tutorial</a>. Open de tutorial in Visual Studio Code en bestudeer de stappen die daar staan beschreven nauwkeurig.

    !!! opdracht-meer "PyTables"
         Pas je script aan zodat de meetserie van de LED wordt opgeslagen in een HDF5-bestand. Vraag hulp als je uitleg wilt over wat een `UInt16` voor een ding is. Gebruik één bestand en maak daarin een nieuwe dataset voor iedere meetserie. Bewaar ook wat metadata (bijvoorbeeld tijdstip van de meting). Iedere keer dat je je script runt wordt er aan _hetzelfde_ databestand een nieuwe dataset toegevoegd.
