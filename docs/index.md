# Introductie

Welkom bij de _Experiment Control with Python Course_. Deze cursus wordt aangeboden aan studenten van de joint degree Natuur- en Sterrenkunde van de Universiteit van Amsterdam en de Vrije Universiteit Amsterdam, en wordt gegeven door Tabitha Dreef ([t.dreef@uva.nl](mailto:t.dreef@uva.nl)) en David Fokkema ([d.b.r.a.fokkema@vu.nl](mailto:d.b.r.a.fokkema@vu.nl)). De afgelopen jaren is het vak ook gegeven door Annelies Vlaar, en zij heeft de cursus enorm verbeterd.

Het doel van deze cursus is om je kennis te laten maken met het aansturen en uitlezen van een experiment. Bij heel eenvoudige experimenten kun je metingen één voor één verrichten en ruwe data noteren in je labjournaal, bijvoorbeeld bij het meten van de trillingstijd van een slinger bij verschillende lengtes. Maar al snel wordt dat ondoenlijk, bijvoorbeeld wanneer je de hele beweging van de slinger wilt volgen met een ultrasoon afstandsdetector. In een gemiddeld lab worden alle experimenten via de computer aangestuurd en uitgelezen. Voor <q>standaard</q> handelingen zoals het bekijken van een sample onder een elektronenmicroscoop of het opnemen van een spectrum van een radioactieve bron kun je de door de fabrikant meegeleverde software gebruiken. Maar vaak is die software óf heel duur terwijl je maar een klein deel van de functionaliteit nodig hebt, óf ongeschikt voor jouw doeleinden. En heel vaak voer je géén standaardexperiment uit, maar ben je een nieuw experiment aan het opzetten. In dat geval is er helemaal geen software voorhanden. Je zult dan zelf aan de slag moeten.

We willen je in deze cursus niet alleen maar leren om zelf een applicatie te schrijven voor het uitvoeren van een snelle meting, maar ook hoe je de code _netjes_ schrijft. Als je straks een bachelorproject doet, een masterstage of een promotieonderzoek, dan wil je code schrijven die ook na de afronding van je project of de verdedeging van je proefschrift nog bruikbaar is. Ook zullen andere onderzoekers aan dezelfde code werken. Het is dus belangrijk om te zorgen voor een duidelijke structuur waarmee de code overzichtelijk blijft maar ook makkelijk is aan te passen of uit te breiden.

Je gaat in deze cursus aan de slag met een Arduino. De Arduino bevat firmware[^firmware] waarmee het zich gedraagt als een meetinstrument en kan communiceren met de computer volgens een standaardprotocol dat ook geïmplementeerd wordt door onder andere functiegeneratoren en oscilloscopen.

[^firmware]: Firmware is software die in hardware is geprogrammeerd. Bijvoorbeeld het <q>computerprogramma</q> dat ervoor zorgt dat je magnetron reageert op de knoppen en je eten verwarmd.

## Werk van anderen

Over Python wordt veel geschreven en er zijn tal van (professionele) trainingen die je kunt volgen. Over de hele wereld zijn conferenties en er is vermoedelijk geen universiteit meer te vinden waar Python niet wordt gebruikt. Deze cursus is niet in een vacuüm ontstaan. Voordat deze cursus in studiejaar 2020-2021 voor het eerst gegeven werd is jarenlang de cursus _Experimentautomatisering met LabVIEW_ gegeven aan de Vrije Universiteit Amsterdam door Jan Mulder en Gerrit Kuik. Deze cursus is de spirituele opvolger van de LabVIEW-cursus. Een website (en boek!) met eenzelfde soort insteek is _Python for the lab_ van Aquiles Carattino.[@python-for-the-lab] Op de website is veel informatie te vinden over hoe je Python gebruikt (slots, singletons, multiprocessing) en met verschillende soorten hardware communiceert (van onder andere National Instruments en Basler). In het boek leer je hoe je een eenvoudig experiment opzet en aanstuurt vanuit Python, heel vergelijkbaar met het eerste deel van deze cursus. Zowel in deze cursus als in het boek is gekozen voor het diode-experiment (project 1 uit het _Arduino Projects Book_ dat meegeleverd wordt met de _Arduino Starter Kit_). Een groot verschil is dat je in deze cursus leert over versiebeheer, command-line interfaces en project management met Poetry.

Voor het eindfeest automatiseren we een zonnecelexperiment. Het idee hiervoor is gebaseerd op het experiment dat we uitvoeren in het eerste jaar. Hoewel hetzelfde eerder gedaan is door o.a. Chenni et al.[@chenni_etal] en Hammoumi et al.[@Hammoumi_2018] met LabVIEW, is de schakeling die in deze cursus gebruikt wordt door ons ontworpen om de noodzaak van een relatief dure stroomsterktesensor te vermijden. Ook wordt de schakeling daardoor fysisch gezien wat interessanter.

Deze cursus is oorspronkelijk opgezet door David Fokkema maar in de jaren daarna door Annelies Vlaar aanzienlijk verbeterd. De cursus heeft nu een veel sterkere focus (minder belangrijke zaken zijn verwijderd) en de opbouw is flink aangepakt. In 2024 heeft Annelies Vlaar ook een subsidie toegekend gekregen om de cursus verder te verbeteren door een aantal studentassistenten in te huren. We zijn veel dank verschuldigd aan Olivier Swaak, Derk Niessink, Amin Rouan Serik, Thijs de Zeeuw en Fijke Oei. Sinds 2025 is Tabitha Dreef betrokken bij de cursus en zij heeft al flinke wijzigingen doorgevoerd.


## Notatie

We zullen in deze handleiding vaak Engelse termen gebruiken, ook als Nederlandse termen voorhanden zijn. Bijvoorbeeld: <q>list</q> in plaats van lijst, <q>class</q> in plaats van klasse. Dit doen we omdat deze Engelse termen veel meer ingeburgerd zijn en omdat voor sommige van de Engelse termen geen goede vertalingen zijn. Liever wat consequenter Engelse termen gebruiken dan alles door elkaar!

In deze handleiding kom je twee verschillende opdrachten tegen: Pythoncode en systeemopdrachten. Voor Pythoncode geldt dat je in Visual Studio Code een nieuw bestand moet aanmaken met de extensie `.py` en dat je daarin de code kunt typen. Vervolgens kun je het script runnen en geeft Visual Studio Code de uitvoer terug. In deze handleiding zal dat als volgt worden weergegeven:

<div class="code-box"><button type="button" name="python_code" onclick="runScript('python_code')" class="run">{{ run }}</button><button type="button" name="python_code" onclick="runScript('python_code')" class="reload invisible">{{ reload }}</button> python_code.py
``` py
# I am a script. I am in a colored block
# and the Python code has colored syntax.

def my_func(x):
    return x ** 2

print(my_func(2))
```
<pre>
<code>(ECPC) > python python_code.py
<span class="invisible" name="python_code">4</span>
</code></pre></div>

Linksboven kun je op de {{run}}-icoon klikken om de output van de code te zien. Rechtsboven in het blok staat een {{copy}}-icoon. Als je daar op klikt dan wordt de hele code gekopieerd naar het klembord en kun je het in Visual Studio Code weer plakken met ++ctrl+v++.

Ook zul je soms systeemopdrachten moeten uitvoeren. Je wilt bijvoorbeeld nieuwe Pythonbibliotheken installeren of je nieuw-gebouwde applicaties testen. Dit doen we vanuit de _terminal_. De terminal biedt een zogeheten _command-line interface_ voor het systeem. Dit in tegenstelling tot een grafische interface.[^prompts] Met deze notatie laten we zien hoe je {{file}}`my-script.py` met python kunt runnen:
``` ps1con title="Terminal"
python my-script.py
```
Zoals je ziet hebben we de prompt (bijvoorbeeld `>`) weggelaten zodat je makkelijker commando's kunt kopiëren en plakken. Wanneer we ook de uitvoer van commando's laten zien is het handiger om onderscheid te maken tussen het commando en de uitvoer. Nu geven we _wel_ de prompt weer (`(ECPC) > `). Door op het {{enter}}-icoon te klikken wordt de uitvoer zichtbaar.
<pre><code>(ECPC) > python --version <button type="button" name="--version_index" onclick="runScript('--version_index')">{{ enter }}</button><button type="button" name="--version_index" onclick="runScript('--version_index')" class="invisible">{{ reload }}</button>
<span class="invisible" name="--version_index">Python 3.10.9</span>
</code></pre>

[^prompts]: Er bestaan verschillende _terminal emulators_, meestal afhankelijk van het besturingssysteem &mdash; al heeft Windows zelf al drie verschillende prompts: de _command prompt_, de _powershell prompt_ en tegenwoordig (voorkeur) de _Windows Terminal_. Een terminal ziet eruit als een tekstvenster. Hierbinnen verschijnt een prompt. Dit is een klein stukje tekst dat aangeeft waar je je opdrachten kunt intypen. In MacOS en Linux is de prompt vaak een `$`-teken. In Windows ziet het er vaak uit als `C:\>` of `PS>`. In veel documentatie op internet wordt de `$`-prompt gebruikt.

We maken veel gebruik van virtual environments. Hierboven zie je de naam van de virtual environment tussen ronde haakjes staan, in dit geval heet de virtual environment `ecpc`. In de voorbeeldcode staat vaak de `ecpc` virtual environment, maar de naam hangt af van het project waar je in werkt.

## Opgaves

In de handleiding staan verschillende opgaves. Sommige opgaves zijn bedoeld als oefening en andere opgaves moet je inleveren voor feedback en een beoordeling. Schrijf je code in het Engels, zo ben je voorbereid op het werken in een internationale onderzoeksgroep.

!!! info
    In sommige programmeercursussen is het de bedoeling dat je een bepaald algoritme _zelf_ schrijft. Je moet bijvoorbeeld een loop schrijven om een reeks berekeningen uit te voeren en mag dan niet gebruik maken van de NumPy-bibliotheek om dat in één regel te doen. Je kunt je voorstellen dat als je straks in een lab werkt dat je _juist_ gebruik wilt maken van bibliotheken die het leven een stuk gemakkerlijker maken. Trek dus alles uit de kast. Kijk eens in de _Python Standard Library_,[@python-standard-library] de _Python Package Index_[@pypi] of _Awesome Python_[@awesome-python].

!!! opdracht-basis-thuis "Voorbereidende opdrachten"
    Sommige opgaves hebben een icoontje met een huis en een laptop voor de titel. Deze opgaves zijn voorbereidende opdrachten die je voorafgaand aan een sessie maakt. Deze opgaves bereiden je voor op de stof van de betreffende sessie. Vragen over deze opgaves kun je in de les stellen. 

!!! opdracht-basis "Basisopdracht"
    === "opdracht"
        Deze opgaves helpen je om het niveau te behalen wat van je verwacht wordt. Ze worden niet beoordeeld.
        Hierboven zie je drie tabbladen **opdracht**, **code** en **check**. Klik op **code** om naar het volgende tabblad te gaan.
    === "code"
        **Pseudo-code**
        ```
        # in de pseudo-code vind je code 
        # om je verder op weg te helpen
        ```
        **Testcode**
        <div class="code-box"><button type="button" name="Testcode_uitleg" onclick="runScript('Testcode_uitleg')" class="run">{{ run }}</button><button type="button" name="Testcode_uitleg" onclick="runScript('Testcode_uitleg')" class="reload invisible">{{ reload }}</button> Testcode.py
        ``` py
        # gebruik (delen van) deze code om je opdracht te testen
        # bekijk de output van deze code
        # ga daarna naar het tabblad "check"
        ```
        <pre>
        <code>(ECPC) > python Testcode.py
        <span class="invisible" name="Testcode_uitleg">Krijg je (ongeveer) dezelfde output?</span>
        </code></pre></div>
    === "check"
        **Checkpunten:**
    
        - [ ] De checkpunten in deze lijst helpen je om te zien of je op de goede weg bent. 
        - [ ] Je kunt de checkpunten zelf afvinken. Klik daarvoor op het grijze vinkje links van deze zin.

        **Projecttraject**
    
        - [x] Je bouwt voort op oude opgaves.
        - [x] Opgaves waarvoor een groen vinkje staat, heb je al gemaakt...
        - [x] ... of het is de opgave waar je nu mee bezig bent.
        - [ ] Opgaves zonder vinkje volgen nog.
        - [ ] Zo kun je altijd zien waar je in het projecttraject bent.

!!! opdracht-inlever "Inleveropdracht"
    Deze opgaves moet worden ingeleverd voor feedback en een beoordeling. Je herkent ze aan de groene kleur. De opgaves bouwen op elkaar voort. Je levert alle opgaves van een projecttraject als geheel in. Kijk daarom goed bij het projecttraject in het tabblad **check** welke groene opgaves je gemaakt moet hebben voordat je het inlevert. 

    Vaak heb je kennis en/of vaardigheden nodig die je eerder hebt geleerd. Zie je een {{lightbulb}} lampje staan? Klik dan bovenin de blauwe balk (rechtsboven, naast de zoekbalk) op het lampje om de spiekbriefjes te openen.

!!! opdracht-meer "Meer leren"
    Dit zijn verdiepende en verbredende opgaves om je te kunnen ontwikkelen tot een goed programmeur en een waardevolle aanwinst voor een onderzoeksgroep. Doe deze opgaves _alleen_ als je klaar bent met álle opgaves van het projecttraject.

Een basiskennis van Python is nodig om de opgaves te kunnen maken. In de [paragraaf Basiskennis Python](basis-python.md#basiskennis-python) vind je opdrachten om je kennis te testen. Het is handig om ook een uitgebreidere Python kennis te hebben, meer informatie vind je in de [paragraaf Uitgebreidere Python kennis](vervolg-python.md#uitgebreidere-python-kennis).
