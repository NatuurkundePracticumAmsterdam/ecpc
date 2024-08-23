# Communicatie met een meetinstrument

Het hart van ieder experiment wordt gevormd door de _metingen_ die worden uitgevoerd. Meetinstrumenten vervullen daarom een belangrijke rol bij het automatiseren van een experiment. De eerste stap die we zullen zetten tijdens het ontwikkelen van een applicatie is het communiceren met ons meetinstrument. We hebben gekozen voor een Arduino Nano 33 IoT,[@arduino_device] een zeer compact stukje elektronica rondom een ARM-microcontroller. Naast het uitvoeren van analoge spanningsmetingen kan dit model ook analoge spanningen afgeven dat voor ons heel nuttig gaat blijken. We hebben, speciaal voor dit vak, een stukje _firmware_[^firmware] ontwikkeld.[@arduino_visa_firmware]

[^firmware]: Firmware is software die in hardware is geprogrammeerd. Bijvoorbeeld het <q>computerprogramma</q> dat ervoor zorgt dat je magnetron reageert op de knoppen en je eten verwarmd.


## Microcontrollers

Computers &mdash; zoals de meesten van ons die kennen &mdash; zijn zeer krachtig en ontworpen om zo flexibel mogelijk te zijn. Ze draaien games, e-mail of rekenen klimaatmodellen door. Ze komen in veel vormen: desktops, laptops, tablets en <q>telefoons</q>. Ze bevatten daarom veel losse componenten: snelle processor (CPU), veel geheugen (RAM), veel permanente opslag (SSD), complexe interfaces (HDMI, USB) en een besturingssysteem waarmee je verschillende programma's kunt opstarten en de computer kunt beheren. Computers zijn behoorlijk prijzig.

Een microcontroller daarentegen is veel eenvoudiger. Ze zijn ontworpen voor een beperkte en specifieke taak. Ze hebben veel verschijningsvormen &mdash; de meeste onherkenbaar. Je vindt microcontrollers in de vaatwasser, de magnetron, een draadloos toetsenbord en auto's (letterlijk tientallen verspreid over de hele auto). Ze hebben dan een beperkte taak: ze reageren op de knopjes op je dashboard om het klimaat te regelen of een raam te openen en ze sturen de kleppen in een verbrandingsmotor aan. Microcontrollers bevatten CPU, RAM en <q>SSD</q> vaak in één chip en hebben beperkte interfaces (vaak letterlijk losse pinnetjes die je moet verbinden). De CPU is relatief gezien traag en de hoeveelheid geheugen klein. Voor de beperkte taak is dat niet erg. Een besturingssysteem is niet nodig: als je hem aanzet draait hij meteen het enige programma dat ooit ingeladen is (dit heet dan _firmware_). Microcontrollers zijn goedkoop en daarom ook uitermate geschikt voor hobbyprojecten.

Een Arduino is zo'n microcontroller. Vaak wordt een Arduino vergeleken met een Raspberry Pi &mdash; een andere goedkope computer. Maar een Raspberry Pi is écht een computer (en daarmee ook complex). Daarmee is een Raspberry Pi veel veelzijdiger, maar ook duurder en is het complexer om een eenvoudig programma te draaien. Apparatuur zoals frequentiegeneratoren en oscilloscopen hebben vaak een microcontroller ingebouwd, maar soms ook een microcomputer analoog aan een Raspberry Pi. Dat maakt voor ons weinig verschil zolang we maar weten hoe we het instrument kunnen aansturen.


## Communicatieprotocol

Hoe praat je eigenlijk met hardware? Voor fabrikanten zijn er een paar opties:

1. Je maakt gebruik van een al bestaand protocol (een bestaande _standaard_ en je schrijft vervolgens documentatie specifiek voor jouw instrument (bijvoorbeeld de VISA-standaard [@VISA], o.a. gebruikt door _Tektronix_ digitale oscilloscopen [@tektronix])
1. Je schrijft een _proprietary_[^proprietary] protocol en een bijbehorende bibliotheek die software-ontwikke\-laars moeten gebruiken.[^drivers] Voorbeelden zijn instrumenten van _National Instruments_ [@national_instruments] of de _PicoScope_ digitale oscilloscopen[^picoscope] [@picoscope].

[^proprietary]: _Proprietary_ betekent dat een bedrijf of individu exclusieve de rechten heeft over het protocol of de software en anderen geen toegang geeft tot de details.
[^drivers]: Niet zelden zijn dergelijke bibliotheken maar op een paar besturingssystemen beschikbaar als _driver_. Gebruik je MacOS in plaats van Windows en het wordt alleen op Windows ondersteund? Dan kun je je dure meetinstrument dus niet gebruiken totdat je overstapt.
[^picoscope]: Die overigens op vrijwel alle platforms en voor veel programmeertalen bibliotheken leveren.

De VISA-standaard is veelgebruikt, maar helaas komen _proprietary_ protocollen veel voor. Dat is jammer, want in het laatste geval moet je het doen met de software die geleverd wordt door de fabrikant. Als die jouw besturingssysteem of favoriete programmeertaal niet ondersteunt heb je simpelweg pech.

Wij gaan gebruik maken van de VISA-standaard. VISA staat voor _Virtual Instrument Software Architecture_ en is héél breed en definieert protocollen om te communiceren via allerlei verouderde computerpoorten en kabels. Hieronder zie je een voorbeeld van verschillende poorten zoals RS232 en GPIB aan de achterkant van een Tektronix TDS210 oscilloscoop.

![Poorten op oscilloscoop](figures/Digitaloszilloskop_Schnittstellen_IMGP1974_WP.jpg)
Bron: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Digitaloszilloskop_Schnittstellen_IMGP1974_WP.jpg).

Maar gelukkig ook via internet en USB, waarvan wij gebruik zullen maken. Onderdeel van VISA is de SCPI standaard [@SCPI], wat staat voor _Standard Commands for Programmable Instruments_. Dit onderdeel definieert een bepaald formaat voor commando's die we naar ons instrument zullen sturen. De lijst met commando's die door de firmware van onze Arduino worden ondersteund is gegeven in de [appendix](firmware.md).


## Eerste stappen

!!! waarschuwing
    Let op dat je de weerstand van 220 Ω gebruikt! Een te grote weerstand zorgt ervoor dat je nauwelijks iets kunt meten, maar een te kleine weerstand zorgt ervoor dat de stroomsterkte door de Arduino te groot wordt. In dat geval zul je de Arduino onherstelbaar beschadigen. De kleurcodes voor weerstanden vind je in de [appendix](kleurcodes.md).

<!-- !!! opdracht-basis "Schakeling bouwen"
    Als je geen kant-en-klare schakeling bij je werkplek hebt liggen, druk de Arduino in het breadboard en bouw een schakeling met een LED op de manier die is weergegeven in de figuur hieronder. De weerstand heeft een waarde van 220 &Omega;. De LED heeft aan één zijde een platte kant in de dikkere ring onderaan de plastic behuizing (goed kijken!); schakel die aan de kant van de aarde (de zwarte draad), dus aan de kant van de weerstand en _niet_ aan de kant van de rode draad naar de Arduino. Als de pootjes van de LED niet afgeknipt zijn, dan zit het korte pootje aan de platte zijde van de LED. Het heeft geen zin om naar het plaatje te kijken hoe het er ín de LED uitziet &mdash; dat verschilt per type LED.

    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
    <model-viewer id="model" style="width: 100%; height: 700px;" alt="Schakelschema LED" src="../assets/circuit/Breadboard_LED.glb" ar shadow-intensity="1" camera-controls touch-action="pan-y" poster="../assets/circuit/breadboard_led_top_view.png" camera-orbit="0rad 0.39269908169872414rad 4.718948223475571m" autoplay exposure="0.6"></model-viewer>

    Door linkermuisknop ingedrukt te houden en te slepen kan je de schakeling draaien, met rechtermuisknop kan je hem verplaatsen en door te scrollen kan je in- en uitzoomen.

    <button onclick="printOrbit()" type="button">print orbit</button> -->


!!! opdracht-basis "Schakeling bouwen"
    === "opdracht"
        Je maakt een schakeling om de spanning over en de stroom door een LED te meten. Hiervoor maak je gebruik van een Arduino en een breadboard. Om de stroomsterkte te beperken zet je de LED in serie met een weerstand van 220 Ω. Je sluit twee spanningsmeters aan, spanningsmeter 1 staat over de LED en de weerstand samen. Spanningsmeter 2 staat over de weerstand.

    === "bouwtekening"
        **Theoretische schakeling**

        Het circuit zoals je dat zou bouwen met twee losse voltmeters is hieronder weergegeven. De cijfers 0, 1 en 2 bij $U_0$, $U_1$ en $U_2$ zijn de _kanalen_ waarmee de Arduino spanningen kan sturen of uitlezen. Dat wordt zometeen belangrijk.

        <div id="fig:LED-schakeling"></div>
        ![LED schakelschema](figures/LED-schakeling.svg){: style="width:75%"}

        **Praktische schakeling**

        In het model hieronder is een Arduino Nano 33 IoT op een 400-punt breadboard geschakeld met een LED en een weerstand van 220 &Omega;. In een breadboard zijn in iedere rij alle kolommen A t/m E met elkaar verbonden (zo ook kolommen F t/m J). Draadjes die naast elkaar zijn geprikt zijn dus met elkaar verbonden. Zo zie je in de figuur &mdash; als je inzoomt &mdash; dat het rode draadje een verbinding maakt tussen pin A0 van de Arduino en de bovenste pin van de LED. De onderste pin van de LED is verbonden met de weerstand. De kleurcodes voor weerstanden vind je in de [appendix](kleurcodes.md). De kleur van de draden is niet belangrijk. Kies altijd draden met een handige lengte. De platte zijde in de ring van de LED wordt richting aarde geschakeld. De Arduino kan met deze schakeling een variabele spanning aanbrengen over de LED met weerstand, en de spanning meten over alleen de weerstand. 

        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
        <model-viewer id="model" style="width: 100%; height: 700px;" alt="Schakelschema LED" src="../assets/circuit/Breadboard_LED.glb" ar shadow-intensity="1" camera-controls touch-action="pan-y" poster="../assets/circuit/breadboard_led_top_view.png" camera-orbit="0rad 0.39269908169872414rad 4.718948223475571m" autoplay exposure="0.6"></model-viewer>

        !!! info "3D besturing"
            Door de linkermuisknop ingedrukt te houden en te slepen kan je de het 3D model draaien, met rechtermuisknop kan je hem verplaatsen en door te scrollen kan je in- en uitzoomen.

    === "check"
        **Checkpunten:**

        - [ ] Je hebt een weerstand van 220 Ω gebruikt.
        - [ ] De platte kant in de dikkere ring onderaan de plastic behuizing van de LED staat richting de aarde geschakeld. (Als de pootjes van de LED niet afgeknipt zijn, dan zit het korte pootje aan de platte zijde van de LED)
        - [ ] De andere kant van de LED is met een draadje verbonden aan de A0 pin van de Arduino (4de pin van boven)

        **Projecttraject:**

        - [x] Schakeling bouwen
        - [ ] Pyvisa in terminal
        - [ ] Pyvisa `list` en `open`
        - [ ] Pyvisa `query`
        - [ ] Pyvisa regeleindes
        - [ ] Pyvisa LED laten branden





<!-- <div id="fig:LED-schakeling"></div>
![LED schakelschema](figures/LED-schakeling.svg){: style="width:75%"} -->

!!! info
    Om met Python via het VISA-protocol te kunnen communiceren met apparaten hebben we specifieke packages nodig. Die gaan we installeren in een _conda environment_. Voor meer informatie over conda environments zie [paragraaf _Conda environments_](software-tools.md#conda-environments).

<div id="opd:condaenv"></div>
!!! opdracht-basis "Environment aanmaken"
    Open een `Anaconda Prompt` die je kunt vinden via de zoekbalk van Windows. Maak de environment en installeer de juiste packages door in te typen:

    ``` ps1 title="Terminal"
    conda create -n pythondaq -c conda-forge python pyvisa-py
    ```
    Om de conda environment daadwerkelijk te gebruiken moet je die altijd eerst _activeren_ met:
    ``` ps1 title="Terminal"
    conda activate pythondaq
    ```

!!! opdracht-basis "Pyvisa in terminal"
    === "opdracht"
        Je sluit de Arduino met een USB-kabel aan op de computer. In een `Anaconda Prompt` open je het goede conda environment en open je een `pyvisa-shell` met een python _backend_. Om erachter te komen hoe de `pyvisa-shell` werkt type je het commando `help`. Je ziet een reeks aan commando's en bekijkt de helptekst van de commando's waarmee je denkt de `pyvisa-shell` te kunnen afsluiten. Wanneer je het afsluit commando hebt gevonden sluit je daarmee de `pyvisa-shell` af. 
    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # open pyvisa-shell
        # pyvisa-hell help
        # commando help
        # close pyvis-shell

        ```
        **Testcode**
        <pre><code>(ecpc) > pyvisa-shell -b py <button type="button" name="pyvisa-shell" onclick="runScript('pyvisa-shell')">{{ enter }}</button><button type="button" name="pyvisa-shell" onclick="runScript('pyvisa-shell')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="pyvisa-shell">
        Welcome to the VISA shell. Type help or ? to list commands.    
        (visa)
        </span>
        </code></pre>

        <pre><code>(visa) > help <button type="button" name="help" onclick="runScript('help')">{{ enter }}</button><button type="button" name="help" onclick="runScript('help')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="help">
        Documented commands (type help `<topic>`):
        ========================================
        EOF  attr  close  exit  help  list  open  query  read  termchar  timeout  write
        </span>
        </code></pre>
    === "check"
        **Checkpunten:**

        - [ ] Na het openen van een `pyvisa-shell` staat er (visa) tussen haakjes.
        - [ ] Als je `help` intypt verschijnt een heel rijtje met commando's.
        - [ ] Als je `help EOF` intypt krijg je de hulpvaardige tekst (ahum): `Handle an EOF.`
        - [ ] Als je de pyvisa-shell met een commando afsluit staat de naam van het conda environment weer tussen haakjes (en niet visa).
       

        **Projecttraject:**

        - [x] Schakeling bouwen
        - [x] Pyvisa in terminal
        - [ ] Pyvisa `list` en `open`
        - [ ] Pyvisa `query`
        - [ ] Pyvisa regeleindes
        - [ ] Pyvisa LED laten branden

!!! info
    We maken hier gebruik van de optie `-b py`, wat staat voor _gebruik backend: python_. Het kan namelijk dat er, naast `pyvisa-py`, ook andere _backends_, of _drivers_, geïnstalleerd staan op het systeem die de VISA-communicatie kunnen verzorgen. Als je bijvoorbeeld LabVIEW geïnstalleerd hebt, dan heb je de drivers van National Instruments. Maar de verschillende backends geven de aangesloten apparaten andere namen. Ook ondersteunen niet alle drivers alle types apparaten en moet je ze apart downloaden en installeren. Daarom maken we liever gebruik van de beschikbare Python drivers.


<!-- !!! opdracht-basis "Pyvisa `list` en `open`"

    Om verbinding te maken met onze Arduino gebruik je eerst `list` om te kijken welke apparaten aangesloten zijn en vervolgens `open` om de verbinding te openen. Je kunt makkelijk zien welk apparaat de Arduino is door éérst `list` te gebruiken zónder de Arduino aangesloten en vervolgens nog een keer mét de Arduino aangesloten &mdash; het kan een paar seconden duren voor de Arduino wordt herkend. Het laatst bijgekomen apparaat is dan de Arduino
 -->

!!! opdracht-basis "Pyvisa `list` en `open`"
    === "opdracht"
        Je bekijkt het lijstje met aangesloten aparaten door in de `pyvisa-shell` het commando `list` te typen. Je haalt de USB-kabel waarmee de Arduino aan de computer is aangesloten uit de computer en vraagt nogmaals de lijt met aangesloten aparaten op. Nu weet je welke poort de Arduino is. Je bekijkt de help tekst van het commando `open`, daarna open je de communicatie met de Arduino.


    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # open pyvisa-shell
        # list
        # help open
        # open Arduino

        ```
        **Testcode**
        <pre><code>(visa) > list <button type="button" name="list" onclick="runScript('list')">{{ enter }}</button><button type="button" name="list" onclick="runScript('list')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="list">( 0) ASRL3::INSTR
        ( 1) ASRL5::INSTR
        ( 2) ASRL28::INSTR</span>
        </code></pre>

        <pre><code>(visa) > help open <button type="button" name="help open" onclick="runScript('help open')">{{ enter }}</button><button type="button" name="help open" onclick="runScript('help open')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="help open">Open resource by number, resource name or alias: open 3</span>
        </code></pre>
        
        
    === "check"
        **Checkpunten:**

        - [ ] Na het commando `list` verschijnt er een lijst met een of meerdere apparaten.
        - [ ] Als de Arduino niet op de computer is aangesloten is er een apparaat uit het lijstje verdwenen. 
        - [ ] Als je de Arduino opent verschijnt de tekst: 
        
        ``` consolecode
        ASRL?::INSTR has been opened.
        You can talk to the device using "write", "read" or "query".
        The default end of message is added to each message.
        ```
       

        **Projecttraject:**

        - [x] Schakeling bouwen
        - [x] Pyvisa in terminal
        - [x] Pyvisa `list` en `open`
        - [ ] Pyvisa `query`
        - [ ] Pyvisa regeleindes
        - [ ] Pyvisa LED laten branden

<!-- !!! opdracht-basis "Pyvisa `query`"
    Een commando sturen en wachten op een antwoord doe je met `query`. Kijk in de [documentatie van de firmware](firmware.md) met welk commando je de identificatiestring kunt uitlezen. Welke error krijg je als je dit commando naar de Arduino stuurt?

    ```
    (open) query *IDN?
    Response: ERROR: UNKNOWN COMMAND *IDN?

    (open) exit
    ``` -->
<div id="opd:pyvisa_query"></div>
!!! opdracht-basis "Pyvisa `query`"
    === "opdracht"
        Je stuurt een commando naar de Arduino met `query`. In de [documentatie van de firmware](firmware.md) heb je het commando opgezocht om de identificatiestring uit te lezen. Nadat je dit commando naar de Arduino stuurt krijg je een error. Je leest de handleiding rustig verder om erachter te komen hoe je dit moet oplossen.


    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # query identificationstring

        ```
        **Testcode**
        <pre><code>(open) > query gappie <button type="button" name="query gappie" onclick="runScript('query gappie')">{{ enter }}</button><button type="button" name="query gappie" onclick="runScript('query gappie')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="query gappie">Response: ERROR: UNKNOWN COMMAND gappie</span>
        </code></pre>
        
        
        
    === "check"
        **Checkpunten:**

        - [ ] Je hebt het woord `query` goed geschreven en met kleine letters.
        - [ ] Na het commando `query` volgt een spatie.
        - [ ] Na de spatie staat het commando om de identificatiestring uit te lezen, met hoofdletters (en dat `*` en dat `?` horen er ook bij!).
        - [ ] Als je het commando verstuurt hebt verschijnt er een error `Response: ERROR: UNKNOWN COMMAND .....`


        **Projecttraject:**

        - [x] Schakeling bouwen
        - [x] Pyvisa in terminal
        - [x] Pyvisa `list` en `open`
        - [x] Pyvisa `query`
        - [ ] Pyvisa regeleindes
        - [ ] Pyvisa LED laten branden

Niet helemaal wat we hadden gehoopt! Als je goed kijkt in de [documentatie van de firmware](firmware.md) dan zie je dat er bepaalde _terminator characters_ nodig zijn. Dit zijn karakters die gebruikt worden om het einde van een commando te markeren. Het is, zogezegd, een <q>enter</q> aan het eind van een zin. Dit mag je heel letterlijk nemen. Oude printers voor computeruitvoer gebruikten een _carriage return_ (CR) om de wagen met papier (typemachine) of de printerkop weer aan het begin van een regel te plaatsen en een _line feed_ (LF) om het papier een regel verder te schuiven. Nog steeds is het zo dat in tekstbestanden deze karakters gebruikt worden om een nieuwe regel aan te geven. Jammer maar helaas, verschillende besturingssystemen hebben verschillende conventies. Windows gebruikt nog steeds allebei: een combinatie van _carriage return + line feed_ (CRLF). 

!!! info "Carriage Return Line Feed: Typewriter Demonstration"
    <div style="display: flex; justify-content: left;"> 
    <iframe src="https://vu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=746ea616-4958-4b9c-9bea-b17300e6b754&autoplay=true&offerviewer=false&showtitle=true&showbrand=false&captions=false&interactivity=none" height="304" width="540" style="border: none;" allowfullscreen allow="autoplay" aria-label="Panopto ingesloten videospeler" aria-description="Carriage Return Line Feed: Typewriter Demonstration" ></iframe>
    </div>

Maar MacOS/Linux/Unix gebruiken enkel een _line feed_ (LF), want hoeveel meer heb je nodig? Af en toe is dat lastig, vooral wanneer er elektronica in het spel is want dan willen de regeleindes voor schrijven en lezen nog wel eens verschillend zijn.[^regeleindes] We gaan nu het gebruik van de karakters instellen:

[^regeleindes]: De regeleindes voor de Arduinofirmware zijn verschillend voor lezen en schrijven. Dit heeft een oninteressante reden: bij het ontvangen van commando's is het makkelijk om alles te lezen totdat je één bepaald karakter (LF) tegenkomt. Bij het schrijven gebruikt de standaard `println`-functie een Windows-stijl regeleinde (CRLF).


<!-- !!! opdracht-basis "Pyvisa regeleindes"
    Om de _terminator characters_ in te stellen maken we gebruik van het commando `termchar`. Open de Arduino. Gebruik `help termchar` om uit te zoeken hoe je de terminator character instellingen kunt opvragen en kunt aanpassen. Zet dan read op CRLF en de write op LF. 

    ??? uitwerkingen
        ``` consolecode
        (open) termchar
        Termchar read: None write: CRLF
        (open) termchar CRLF LF
        Done
        (open) termchar
        Termchar read: CRLF write: LF
        (open) query *IDN?
        Response: Arduino VISA firmware v1.0.0
        ``` -->

!!! opdracht-basis "Pyvisa regeleindes"
    === "opdracht"
        Je gebruikt het commando `termchar` om de regeleindes in te stellen. Om erachter te komen hoe je dit moet instellen vraag je de helptekst op met `help termchar`. Je vraagt eerst de huidige regeleinde instellingen op en ziet dat deze niet goed staan. Daarna stel je de read in op CRLF en de write op LF. Je bekijkt nog een keer de regeleinde instellingen om te controlleren of ze nu wel goed staan. Je gaat terug naar de [opdracht Pyvisa    `query`](#opd:pyvisa_query) en krijgt een response in plaats van een error. 

    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # help termchar
        # termchar settings?
        # read = CRLF and write = LF
        # termchar settings?
        # query identificationstring

        ```
        **Testcode**
        <pre><code>(open) > help termchar <button type="button" name="help termchar" onclick="runScript('help termchar')">{{ enter }}</button><button type="button" name="help termchar" onclick="runScript('help termchar')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="help termchar">Get or set termination character for resource in use.
        `<termchar>` can be one of: CR, LF, CRLF, NUL or None.
        None is used to disable termination character
        Get termination character:
            termchar
        Set termination character read or read+write:
            termchar `<termchar>` [`<termchar>`]</span>
        </code></pre>        
        
    === "check"
        **Checkpunten:**

        - [ ] De _read_ regeleindes staan ingesteld op CRLF.
        - [ ] De _write_ regeleinds staan ingesteld op LF.
        - [ ] Als je met het commando `termchar` de instellingen van de regeleindes opvraag staat er:

        ``` consolecode
        Termchar read: CRLF write: LF
        use CR, LF, CRLF, NUL or None to set termchar
        ```

        - [ ] Als je met behulp van `query` het commando om de identificatiestring uit te lezen naar de Arduino verstuurt verschijnt de tekst:

        ``` consolecode
        Response: Arduino VISA firmware v1.0.0
        ```

        **Projecttraject:**

        - [x] Schakeling bouwen
        - [x] Pyvisa in terminal
        - [x] Pyvisa `list` en `open`
        - [x] Pyvisa `query`
        - [x] Pyvisa regeleindes
        - [ ] Pyvisa LED laten branden

!!! info "Onzichtbare regeleindes"
    Omdat de Arduino nu weet wanneer het commando voorbij is (door de LF aan het eind van de <q>zin</q>) krijgen we antwoord! Dat antwoord heeft dan juist weer een CRLF aan het eind dus `pyvisa-shell` weet wanneer het kan stoppen met luisteren en print het antwoord op het scherm. De karakters CRLF en LF _zelf_ blijven onzichtbaar voor ons.

<!-- !!! opdracht-basis "Pyvisa LED laten branden"
    Kijk in de [documentatie van de firmware](firmware.md) hoe je een spanning op het uitvoerkanaal kan zetten en zet de spanning hoog genoeg zodat het LED gaat branden. 
    * Wat is de _minimale waarde_ waarbij de LED _net_ licht geeft? 
    * Laat de spanning steeds verder oplopen; op een gegeven moment gebeurt er iets raars. 
    * Wat is de _maximale waarde_ waarbij de LED zonder problemen kan branden? -->

!!! opdracht-basis "Pyvisa LED laten branden"
    === "opdracht"
        Je zoekt in de [documentatie van de firmware](firmware.md) op hoe je een spanning op het uitvoerkanaal zet. Je leest dat er een maximale waarde is voor de spanning en zet deze waarde op het uitvoerkanaal. Je ziet dat het LEDje brandt en er verschijnt een glimlach op je gezicht. Je bent benieuwd naar wat er gebeurt als je over de maximale spanning heen gaat en zet de maximale waarde + 1 op het uitvoerkanaal. Je denkt na over een verklaring voor wat je ziet gebeuren. Je weet dat een LED een drempelspanning nodig heeft om te branden, je vult een paar waardes in tussen de minimale en maximale waarde om erachter te komen wat deze drempelspanning is. 

    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # set max voltage
        # set max voltage + 1
        # set threshold voltage
        ```
        **Testcode**      
        Zie [documentatie van de firmware](firmware.md).  
        
    === "check"
        **Checkpunten:**

        - [ ] Je stuurt een commando naar 

        ``` consolecode
        Termchar read: CRLF write: LF
        use CR, LF, CRLF, NUL or None to set termchar
        ```


        **Projecttraject:**

        - [x] Schakeling bouwen
        - [x] Pyvisa in terminal
        - [x] Pyvisa `list` en `open`
        - [x] Pyvisa `query`
        - [x] Pyvisa regeleindes
        - [x] Pyvisa LED laten branden

## Een eenvoudig script


We hebben via de shell contact gelegd met de hardware. Nu wordt het tijd om, met de documentatie[@pyvisa] in de aanslag, hetzelfde vanuit Python te doen. Als je met een nieuw project begint is het helemaal geen gek idee om een kort script te schrijven waarin je wat dingen uitprobeert. Als alles lijkt te werken kun je het netjes gaan maken en gaan uitbreiden. We beginnen hier met een eenvoudig script en zullen dat daarna gaan verfijnen.

We lopen het voorbeeldscript eerst regel voor regel door en geven het volledige script aan het eind. Allereerst importeren we de `pyvisa`-bibliotheek met
``` py
import pyvisa
```
Binnen pyvisa wordt alles geregeld met behulp van een _Resource Manager_. Die krijgen we met
``` py
rm = pyvisa.ResourceManager("@py")
```
Die kunnen we bijvoorbeeld gebruiken om een lijst van alle beschikbare poorten te krijgen:
``` py
ports = rm.list_resources()

# Bijvoorbeeld: ("ASRL3::INSTR",)
```
Om nu daadwerkelijk verbinding te gaan maken met de Arduino moeten we die _openen_. Daarvoor geven we de poortnaam op en vertellen we meteen wat de instellingen moeten zijn voor de regeleindes bij het lezen (CRLF, `#!py "\r\n"`) en het schrijven (LF, `#!py "\n"`):
``` py
device = rm.open_resource(
    "ASRL3::INSTR", read_termination="\r\n", write_termination="\n"
)
```
Ten slotte sturen we een query naar de Arduino:
``` py
device.query("*IDN?")
```
Het volledige script &mdash; met een paar `#!py print`-statements &mdash; ziet er dan als volgt uit:

<div class="code-box"><button type="button" name="test_arduino" onclick="runScript('test_arduino')" class="run">{{ run }}</button><button type="button" name="test_arduino" onclick="runScript('test_arduino')" class="reload invisible">{{ reload }}</button> test_arduino.py
``` py
import pyvisa

rm = pyvisa.ResourceManager("@py")
ports = rm.list_resources()
print(ports)

device = rm.open_resource(
    "ASRL3::INSTR", read_termination="\r\n", write_termination="\n"
)
identification = device.query("*IDN?")
print(identification)
```
<pre>
<code>(ecpc) > python test_arduino.py
<span class="invisible" name="test_arduino">('ASRL3::INSTR',)
Arduino VISA firmware v1.0.0</span>
</code></pre></div>

De output van het script is afhankelijk van het systeem en het aantal apparaten dat verbonden is.

Je hebt nu precies hetzelfde gedaan in Python als in de pyvisa shell. Hieronder kun je de verschillende stappen met elkaar vergelijken door met de muis over de tekst heen te gaan. 

--8<-- "docs/assets/comparison/compare_shell_script.html"

<div id="opd:test_arduino"></div>
!!! opdracht-basis "Pyvisa in pythonscript"
    Maak in een geschikte map een bestand {{file}}`test_arduino.py` en kopieer daarin de Python code. Selecteer vervolgens in Visual Studio Code je conda environment zodat je het script ook daadwerkelijk kunt runnen. Hoe je dat doet lees je aan het eind van de [paragraaf _Conda environments_](software-tools.md#conda-environments). Sluit alle terminals.

Het kan zijn dat het script bij jullie crasht met een foutmelding. Krijg je een `#!py PermissionError`? Dan heb je vast nog een terminal openstaan waarin `pyvisa-shell` actief is. Een andere reden kan zijn dat het script probeert een poort te openen die bij jullie een andere naam heeft. Probeer met het lijstje instrumenten te raden welke de Arduino is en pas het script aan totdat het werkt.[^tip-aansluiten]

[^tip-aansluiten]: Tip: als je de Arduino loshaalt en weer aansluit is het de nieuwe regel in het lijstje.


!!! opdracht-basis "LED laten branden"
    Schrijf een script dat de spanning over de LED laat oplopen van nul tot de maximale waarde. Wat gebeurt er als je de spanning laat oplopen tot twee keer die maximale waarde?

    !!! info "f-strings"
        Het sturen van commando's naar de Arduino waar een variabele spanning in staat gaat gemakkelijk met f-strings. Voor meer informatie zie de [paragraaf f-strings](basis-python.md#f-strings-variabelen-en-input).


<div id="opd:flashingLED"></div>
!!! opdracht-basis "flashingLED"
    <iframe src="https://vu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8d7b4743-eaa5-4221-a135-b1b600f1cf3f&autoplay=true&offerviewer=false&showtitle=false&showbrand=false&captions=false&interactivity=none" height="281" width="500" style="margin-left: 1em; "frameBorder="0" allowfullscreen allow="autoplay" aria-label="Panopto Embedded Video Player" aria-description="Blinking LED" align="right"></iframe>
    
    Maak een bestand {{file}}`flashingLED.py` en laat de LED in een regelmatig tempo knipperen. 

    !!! info
        Je kan hiervoor gebruik maken van de module _time_ die standaard met Python meekomt[^standard-library]. Met de functie `#! sleep()` kun je de executie van de volgende regel in het script met een aantal seconden uitstellen.

        ``` py
        import time
        # wait 28 second
        time.sleep(28)
        ```

        [^standard-library]: Zie ook: [The Python Standard Library](vervolg-python.md#de-standard-library-en-de-python-package-index)

!!! opdracht-meer "Meer knipperritmes"
    Breid het bestand {{file}}`flashingLED.py` uit met meer knipperritmes, bijvoorbeeld:

    * Maak een _SOS light_ &mdash; een lamp die in morsecode het signaal SOS uitzendt.
    * Maak een _breathing light_ &mdash; een lamp die langzaam aan en uit gaat gevolgd door een pauze in het tempo dat iemand in- en uitademt.
    * Maak een _heartbeat light_ &mdash; een lamp die twee keer kort na elkaar flitst gevolgd door een pauze in het tempo van een hartslag.
    * Bedenk je eigen knipperritme.