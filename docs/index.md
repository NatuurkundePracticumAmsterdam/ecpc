# Introductie

Welkom bij de _Experiment Control with Python Course_. Dit vak wordt aangeboden aan studenten van de joint degree natuur- en sterrenkunde van de Vrije Universiteit en de Universiteit van Amsterdam, en wordt gegeven door Annelies Vlaar ([a.m.vlaar@vu.nl](mailto:a.m.vlaar@vu.nl)) en David Fokkema ([d.b.r.a.fokkema@vu.nl](mailto:d.b.r.a.fokkema@vu.nl)).

Het doel van deze cursus is om jullie kennis te laten maken met het aansturen en uitlezen van een experiment. Bij heel eenvoudige experimenten kun je metingen één voor één verrichten en noteren in je labjournaal, bijvoorbeeld bij de trillingstijd van een slinger bij verschillende lengtes. Maar al snel wordt dat ondoenlijk, bijvoorbeeld wanneer je de hele beweging van de slinger wilt volgen met een ultrasoon afstandsdetector. In een gemiddeld lab worden alle experimenten via de computer aangestuurd en uitgelezen. Voor <q>standaard</q> handelingen zoals het bekijken van een sample onder een elektronenmicroscoop of het opnemen van een spectrum van een radioactieve bron kun je de door de fabrikant meegeleverde software gebruiken. Vaak echter is die software óf heel duur terwijl je maar een klein deel van de functionaliteit nodig hebt, of ongeschikt voor jouw doeleinden. En heel vaak voer je géén standaardexperiment uit, maar ben je een nieuw experiment aan het opzetten. In dat laatste geval is er helemaal geen software voorhanden. Je zult dus zelf aan de slag moeten.

We willen je in deze cursus niet alleen maar leren om een snelle meting uit te voeren, maar ook hoe je de code _netjes_ schrijft. Als je een bachelorproject doet, een masterstage, of een promotieonderzoek, dan wil je code schrijven die nog steeds bruikbaar is nadat je je stage hebt afgerond of je proefschrift hebt verdedigd. Ook zullen andere onderzoekers aan dezelfde code werken. Het is dus belangrijk om te zorgen voor een duidelijke structuur waarmee de code overzichtelijk blijft maar ook makkelijk is aan te passen of uit te breiden.

Jullie gaan aan de slag met een Arduino. De Arduino bevat firmware waarmee het zich gedraagt als een meetinstrument en kan communiceren met de computer volgens een standaardprotocol dat ook geïmplementeerd wordt door onder andere functiegeneratoren en oscilloscopen.


## Werk van anderen

Over Python wordt veel geschreven en er zijn tal van (professionele) trainingen die je kunt volgen. Over de hele wereld zijn conferenties en er is vermoedelijk geen universiteit meer te vinden waar Python niet wordt gebruikt. Dit vak is niet in een vacuüm ontstaan. Voordat dit vak in studiejaar 2020-2021 voor het eerst gegeven werd is jarenlang het vak _Experimentautomatisering met LabVIEW_ gegeven aan de Vrije Universiteit door Jan Mulder en Gerrit Kuik. Dit vak is de spirituele opvolger van het LabVIEW-vak. Een website (en boek!) met eenzelfde soort insteek is _Python for the lab_ van Aquiles Carattino.[@python-for-the-lab] Op de website is veel informatie te vinden over hoe je Python gebruikt (slots, singletons, multiprocessing) en met verschillende soorten hardware communiceert (van o.a. National Instruments en Basler). In het boek leer je hoe je een eenvoudig experiment opzet en aanstuurt vanuit Python, heel vergelijkbaar met het eerste deel van deze cursus. Zowel in deze cursus als in het boek is gekozen voor het diode-experiment (project 1 uit het _Arduino Projects Book_ dat meegeleverd wordt met de _Arduino Starter Kit_). Een groot verschil is dat je in deze cursus leert over versiebeheer, command-line interfaces en project management met Poetry.

Voor het eindfeest automatiseren we een zonnecelexperiment. Het idee hiervoor is gebaseerd op het experiment dat we uitvoeren in het eerste jaar. Hoewel hetzelfde eerder gedaan is door o.a. Chenni et al.[@chenni_etal] en Hammoumi et al.[@Hammoumi_2018] met LabVIEW, is de schakeling die in deze cursus gebruikt wordt door ons ontworpen om de noodzaak van een relatief dure stroomsterktesensor te vermijden. Ook wordt de schakeling daardoor fysisch gezien wat interessanter.

Deze cursus is oorspronkelijk opgezet door David Fokkema maar in de jaren daarna door Annelies Vlaar aanzienlijk verbeterd. De cursus heeft nu een veel sterkere focus (minder belangrijke zaken zijn verwijderd) en de opbouw is flink aangepakt. In 2024 heeft Annelies ook een subsidie toegekend gekregen om verschillende studentassistenten zoals Olivier Swaak, Derk Niessink en anderen.


## Notatie

We zullen in deze handleiding vaak Engelse termen gebruiken, ook als Nederlandse termen voorhanden zijn. Bijvoorbeeld: <q>list</q> in plaats van lijst, <q>class</q> in plaats van klasse. Dit doen we omdat deze Engelse termen veel meer ingeburgerd zijn en omdat voor sommige van de Engelse termen geen goede vertalingen zijn. Liever wat consequenter Engelse termen gebruiken dan alles door elkaar!

In deze handleiding kom je twee verschillende dingen tegen. Pythoncode en systeemopdrachten. Voor pythoncode geldt dat je in Visual Studio Code een nieuw bestand moet aanmaken met de extensie `.py` en dat je daarin de code kunt typen. Vervolgens kun je het script runnen en geeft Visual Studio Code de uitvoer terug. In deze handleiding zal dat als volgt worden weergegeven:

<div class="code-box"><button type="button" name="python_code" onclick="runScript('python_code')" class="run">{{ run }}</button><button type="button" name="python_code" onclick="runScript('python_code')" class="reload invisible">{{ reload }}</button> python_code.py
``` py
# I am a script. I am in a colored block
# and the Python code has colored syntax.

def my_func(x):
    return x ** 2

print(my_func(2))
```
<pre>
<code>(ecpc) > python python_code.py
<span class="invisible" name="python_code">4</span>
</code></pre></div>

Linksboven kun je op de {{run}}-icoon klikken om de output van de python code te zien.

Rechtsboven in het blok staat een {{copy}}-icoon. Als je daar op klikt dan wordt de hele code gekopieerd naar het klembord en kun je het in Visual Studio Code weer plakken met ++ctrl+v++.

Ook zullen we soms systeemopdrachten moeten uitvoeren. We willen bijvoorbeeld nieuwe Pythonbibliotheken installeren of onze nieuw-gebouwde applicaties testen. Dit doen we vanuit de _terminal_. De terminal biedt een zogeheten _command-line interface_ voor het systeem. Dit in tegenstelling tot een grafische interface.[^prompts]

[^prompts]: Er bestaan verschillende _terminal emulators_, meestal afhankelijk van het besturingssysteem &mdash; al heeft Windows zelf al drie verschillende prompts: de _command prompt_, de _powershell prompt_ en tegenwoordig (voorkeur) de _Windows Terminal_. Een terminal ziet eruit als een tekstvenster. Hierbinnen verschijnt een prompt. Dit is een klein stukje tekst dat aangeeft waar je je opdrachten kunt intypen. In MacOS en Linux is de prompt vaak een `$`-teken. In Windows ziet het er vaak uit als `C:\>` of `PS>`. In veel documentatie op internet wordt de `$`-prompt gebruikt.

Met deze notatie laten we zien hoe je {{file}}`my-script.py` met python kunt runnen:
``` ps1 title="Terminal"
python my-script.py
```
Zoals je ziet hebben we de prompt (bijvoorbeeld `>`) weggelaten zodat je makkelijker commando's kunt kopiëren en plakken. Wanneer we ook de uitvoer van commando's laten zien is het handiger om onderscheid te maken tussen het commando en de uitvoer. Nu geven we _wel_ de prompt weer (`(ecpc) > `). Door op het {{enter}}-icoon te klikken wordt de uitvoer zichtbaar.
<pre><code>(ecpc) > python --version <button type="button" name="--version_index" onclick="runScript('--version_index')">{{ enter }}</button><button type="button" name="--version_index" onclick="runScript('--version_index')" class="invisible">{{ reload }}</button>
<span class="invisible" name="--version_index">Python 3.10.9</span>
</code></pre>

We maken veel gebruik van conda environments. Hierboven zie je de naam van de conda environment tussen ronde haakjes staan, in dit geval heet de conda environment `ecpc`. In de voorbeeldcode staat standaard de `ecpc` conda environment, maar welk conda environment je moet gebruiken hangt van de opdracht af.


## Opgaves

In de handleiding staan verschillende opgaves. De meeste zijn bedoeld als oefening, maar sommige moet je inleveren voor feedback en een beoordeling. Schrijf je code in het Engels, zo ben je voorbereid op het werken in een internationale onderzoeksgroep.

!!! info
    In sommige programmeercursussen is het de bedoeling dat je een bepaald algoritme _zelf_ schrijft. Je moet bijvoorbeeld een loop schrijven om een reeks berekeningen uit te voeren en mag dan niet gebruik maken van de NumPy-bibliotheek om dat in één regel te doen. Je kunt je voorstellen dat als je straks in een lab werkt dat je _juist_ gebruik wilt maken van bibliotheken die het leven een stuk gemakkerlijker maken. Trek dus alles uit de kast. Kijk eens in de _Python Standard Library_,[@python-standard-library] de _Python Package Index_[@pypi] of _Awesome Python_[@awesome-python].

!!! opdracht-basis "Basisopdracht"
    === "opdracht"
        Deze opgaves helpen je om het niveau te behalen wat van je verwacht wordt. Ze worden niet beoordeeld.
        Hierboven zie je 3 tabbladen **opdracht**, **code** en **check**. Klik op **code** om naar het volgende tabblad te gaan.
    === "code"
        **Pseudo-code**
        ```
        # hierin staat code om je verder op weg te helpen.
        ```
        **Testcode**
        <div class="code-box"><button type="button" name="Testcode_uitleg" onclick="runScript('Testcode_uitleg')" class="run">{{ run }}</button><button type="button" name="Testcode_uitleg" onclick="runScript('Testcode_uitleg')" class="reload invisible">{{ reload }}</button> Testcode.py
        ``` py
        # gebruik (delen van) deze code om je opdracht te testen.
        # Bekijk de output van deze code
        # Ga daarna naar het tabblad "check"
        ```
        <pre>
        <code>(ecpc) > python Testcode.py
        <span class="invisible" name="Testcode_uitleg">Krijg je (ongeveer) dezelfde output?</span>
        </code></pre></div>
    === "check"
        **Checkpunten:**
    
        - [ ] De checkpunten in deze lijst helpen je om te zien of je op de goede weg bent. 
        - [ ] Je kunt ze zelfs afvinken. Klik daarvoor op het grijze vinkje links van deze zin.

        **Projecttraject**
    
        - [x] We bouwen voort op oude opdrachten
        - [x] Opdrachten die een vinkje hebben, heb je al gemaakt
        - [x] Of het is de opdracht waar je nu mee bezig bent
        - [ ] Opdrachten zonder vinkje maak je later in het huidige hoofdstuk
        - [ ] of in een volgend hoofdstuk
    

!!! opdracht-inlever "Inleveropdracht"
    Deze opgave moet worden ingeleverd voor feedback en een beoordeling. Je herkent ze aan de groene kleur. De opgaven bouwen voort op elkaar, dus er zijn meerdere opgaven. Je levert ze niet los in, maar als geheel. Kijk goed bij het projecttraject in het tabblad **check** welke groene opdrachten je gemaakt moet hebben voordat je het inlevert. 

    Vaak heb je kennis en/of vaardigheden nodig die je eerder heb geleerd. Zie je een {{lightbulb}} lampje staan? Klik dan bovenin de blauwe balk (rechtsboven, naast de zoekbalk) op het lampje om de spiekbriefjes te openen.


!!! opdracht-meer "Meer leren"
    Dit zijn verdiepende en verbredende opgaves om je te kunnen ontwikkelen tot een goed programmeur en een waardevolle aanwinst voor een onderzoeksgroep. Je kunt er geen extra punten mee verdienen wanneer je deze technieken toepast in je inleveropdrachten, maar het is wel een goede oefening. Doe deze opgaves _alleen_ als je klaar bent met de rest.


Een basiskennis van Python is nodig om de opdrachten te kunnen maken. In de [paragraaf Basiskennis Python](basis-python.md#basiskennis-python) vind je opdrachten om je kennis te testen. Het is handig om een uitgebreidere Python kennis te hebben, meer informatie vind je in de [paragraaf Uitgebreidere Python kennis](vervolg-python.md#uitgebreidere-python-kennis).
