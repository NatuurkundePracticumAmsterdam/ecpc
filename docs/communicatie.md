# Communicatie met een meetinstrument

Het hart van ieder experiment wordt gevormd door de _metingen_ die worden uitgevoerd. Meetinstrumenten vervullen daarom een belangrijke rol bij het automatiseren van een experiment. De eerste stap die je zult zetten tijdens het ontwikkelen van een applicatie is het communiceren met het meetinstrument. We hebben gekozen voor een Arduino Nano 33 IoT,[@arduino_device] een zeer compact stukje elektronica rondom een ARM-microcontroller. Naast het uitvoeren van analoge spanningsmetingen kan dit model ook analoge spanningen afgeven dat voor het experiment heel nuttig gaat blijken te zijn. We hebben &mdash; speciaal voor deze cursus &mdash; een stukje _firmware_[^firmware] ontwikkeld.[@arduino_visa_firmware]

[^firmware]: Firmware is software die in hardware is geprogrammeerd. Bijvoorbeeld het <q>computerprogramma</q> dat ervoor zorgt dat je magnetron reageert op de knoppen en je eten verwarmd.

## Microcontrollers

Computers &mdash; zoals de meesten van ons die kennen &mdash; zijn zeer krachtig en ontworpen om zo flexibel mogelijk te zijn. Ze draaien games, e-mail of rekenen klimaatmodellen door. Ze komen in veel vormen: desktops, laptops, tablets en <q>telefoons</q>. Ze bevatten veel losse componenten: snelle processor (CPU), veel geheugen (RAM), veel permanente opslag (SSD), complexe interfaces (HDMI, USB) en een besturingssysteem waarmee je verschillende programma's kunt opstarten en de computer kunt beheren. Computers zijn behoorlijk prijzig.

Een microcontroller daarentegen is veel eenvoudiger. Ze zijn ontworpen voor een beperkte en specifieke taak. Ze hebben veel verschijningsvormen &mdash; de meeste onherkenbaar. Je vindt microcontrollers in de vaatwasser, de magnetron, een draadloos toetsenbord en auto's (letterlijk tientallen verspreid over de hele auto). Ze hebben dan een beperkte taak: ze reageren op de knopjes op je dashboard om het klimaat te regelen of een raam te openen en ze sturen de kleppen in een verbrandingsmotor aan. Microcontrollers bevatten CPU, RAM en <q>SSD</q> vaak in één chip en hebben beperkte interfaces (vaak letterlijk losse pinnetjes die je moet verbinden). De CPU is relatief gezien traag en de hoeveelheid geheugen klein. Voor de beperkte taak is dat niet erg. Een besturingssysteem is niet nodig: als je hem aanzet draait hij meteen het enige programma dat ooit ingeladen is (dit heet dan _firmware_). Microcontrollers zijn goedkoop en daarom ook uitermate geschikt voor hobbyprojecten.

Een Arduino is zo'n microcontroller. Vaak wordt een Arduino vergeleken met een Raspberry Pi &mdash; een andere goedkope computer. Maar een Raspberry Pi is écht een computer (en daarmee ook complex). Daarmee is een Raspberry Pi veel veelzijdiger, maar ook duurder en is het complexer om een eenvoudig programma te draaien. Apparatuur zoals frequentiegeneratoren en oscilloscopen hebben vaak een microcontroller ingebouwd, maar soms ook een microcomputer analoog aan een Raspberry Pi. Dat maakt voor ons weinig verschil zolang we maar weten hoe we het instrument kunnen aansturen.

## Communicatieprotocol

Hoe praat je eigenlijk met hardware? Voor fabrikanten zijn er een paar opties:

1. Je maakt gebruik van een al bestaand protocol (een bestaande _standaard_) en je schrijft vervolgens documentatie specifiek voor jouw instrument (bijvoorbeeld de VISA-standaard[@VISA], onder andere gebruikt door _Tektronix_ digitale oscilloscopen[@tektronix]).
1. Je schrijft een _proprietary_[^proprietary] protocol en een bijbehorende bibliotheek die softwareontwikkelaars moeten gebruiken.[^drivers] Voorbeelden zijn instrumenten van _National Instruments_[@national_instruments] of de _PicoScope_ digitale oscilloscopen[^picoscope_footnote] [@picoscope].

[^proprietary]: _Proprietary_ betekent dat een bedrijf of een individu exclusief de rechten heeft over het protocol of de software en anderen geen toegang geeft tot de details.
[^drivers]: Niet zelden zijn dergelijke bibliotheken maar op een paar besturingssystemen beschikbaar als _driver_. Wordt een driver alleen op Windows ondersteund en gebruik jij MacOS in plaats van Windows? Dan kun je je dure meetinstrument dus niet gebruiken totdat je overstapt.
[^picoscope_footnote]: Die overigens op vrijwel alle platforms en voor veel programmeertalen bibliotheken leveren.

De VISA-standaard is veelgebruikt, maar helaas komen _proprietary_ protocollen veel voor. Dat is jammer, want in het laatste geval moet je het doen met de software die geleverd wordt door de fabrikant. Als die jouw besturingssysteem of jouw favoriete programmeertaal niet ondersteunt, heb je simpelweg pech.

Wij gaan gebruik maken van de VISA-standaard. VISA staat voor _Virtual Instrument Software Architecture_ en is héél breed en definieert ook protocollen om te communiceren via allerlei verouderde computerpoorten en kabels. Hieronder zie je een voorbeeld van verschillende poorten zoals RS232 en GPIB aan de achterkant van een Tektronix TDS210 oscilloscoop. De VISA-standaard communiceert gelukkig ook via internet en USB, waarvan wij gebruik zullen maken.

![Poorten op oscilloscoop](figures/Digitaloszilloskop_Schnittstellen_IMGP1974_WP.jpg)
Bron: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Digitaloszilloskop_Schnittstellen_IMGP1974_WP.jpg).

Onderdeel van VISA is de SCPI standaard [@SCPI], wat staat voor _Standard Commands for Programmable Instruments_. Dit onderdeel definieert een bepaald formaat voor commando's die we naar ons instrument zullen sturen. De lijst met commando's die door de firmware van onze Arduino worden ondersteund is gegeven in de [appendix](firmware.md).

## Eerste stappen

!!! waarschuwing
    Let op dat je de weerstand van 220 &Omega;  gebruikt! Een te grote weerstand zorgt ervoor dat je nauwelijks iets kunt meten, maar een te kleine weerstand zorgt ervoor dat de stroomsterkte door de Arduino te groot wordt. In dat geval zul je de Arduino onherstelbaar beschadigen. De kleurcodes voor weerstanden vind je in de [appendix](kleurcodes.md).

<div id="opd:schakeling"></div>
!!! opdracht-basis "Schakeling bouwen"
    === "opdracht"
        Je maakt een schakeling om de spanning over en de stroom door een LED te meten. Hiervoor maak je gebruik van een Arduino en een breadboard. Om de stroomsterkte te beperken zet je de LED in serie met een weerstand van 220 &Omega;. Je sluit twee spanningsmeters aan. Spanningsmeter 1 staat over de LED en de weerstand samen. Spanningsmeter 2 staat alleen over de weerstand.

    === "bouwtekening"
        **Theoretische schakeling**

        Het circuit zoals je dat zou bouwen met twee losse voltmeters is hieronder weergegeven. De subscripts 0, 1 en 2 bij $U_0$, $U_1$ en $U_2$ verwijzen naar de _kanalen_ waarmee de Arduino spanningen kan sturen of uitlezen. Deze kanalen worden in de volgende opgaves belangrijk.

        <div id="fig:LED-schakeling"></div>
        ![LED schakelschema](figures/LED-schakeling.svg){: style="width:75%"}

        **Praktische schakeling**

        In het 3D-model[^bronLED] hieronder is een Arduino Nano 33 IoT op een 400-punt breadboard geschakeld met een LED en een weerstand van 220 &Omega;. In een breadboard zijn in iedere rij alle kolommen A t/m E met elkaar verbonden (zo ook kolommen F t/m J). Draadjes en/of componenten die naast elkaar zijn geprikt zijn dus met elkaar verbonden. De Arduino is geprikt in kolom D t/m H en van rij 1 t/m 15. De pin van de Arduino in rij 4 is verbonden middels het rode draadje met het pootje van de LED (de kleur van de draden is niet belangrijk, kies daarom altijd draden met een handige lengte). De platte zijde in de onderste ring van de LED wordt richting aarde geschakeld. Het ander pootje van de LED is verbonden met de weerstand. De kleurcodes voor weerstanden vind je in de [appendix](kleurcodes.md). Van de weerstand loopt een draadje naar de aarde van de Arduino (rij 12, kolom H). Met dit deel van de schakeling kan de Arduino een variabele spanning zetten over de LED en de weerstand. 
        
        De pin van de Arduino in rij 5 is verbonden met de LED en meet de spanning over de LED en de weerstand. De pin van de Arduino in rij 6 is verbonden met de weerstand en meet alleen de spanning over weerstand.

        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
        <model-viewer id="model" style="width: 100%; height: 700px;" alt="Schakelschema LED" src="../assets/circuit/Breadboard_LED.glb" ar shadow-intensity="1" camera-controls touch-action="pan-y" poster="../assets/circuit/breadboard_led_top_view.png" camera-orbit="0rad 0.39269908169872414rad 4.718948223475571m" autoplay exposure="0.6"></model-viewer>

        [^bronLED]: Dit model bevat twee 3D modellen die zijn gecreëerd door Lara Sophie Schütt en AppliedSBC en zijn gedeeld onder respectievelijk een CC-BY en CC-BY-SA licentie. De originele modellen zijn te vinden via [[CC0] Set of Electronic Components](https://sketchfab.com/3d-models/cc0-set-of-electronic-components-f4cb777b4ea3490587008e24b61bcf75) en [Arduino Nano 33 IoT](https://sketchfab.com/3d-models/arduino-nano-33-iot-f57fd7f5485a47a8b71f8604872fd78c). De modellen zijn samengevoegd en voorzien van een Arduino texture een aangepaste LED texture en draden. Dit 3D model heeft een CC-BY-SA licentie.

        !!! info "Besturing 3D-model"
            Door de linkermuisknop ingedrukt te houden en te slepen kan je het 3D-model draaien. Met de rechtermuisknop kan je het model verplaatsen en door te scrollen kan je in- en uitzoomen.

    === "check"
        **Checkpunten**

        - [ ] Je hebt een weerstand van 220 &Omega; gebruikt.
        - [ ] De platte kant in de dikkere ring onderaan de plastic behuizing van de LED staat richting de aarde geschakeld. Als de pootjes van de LED niet afgeknipt zijn, dan zit het korte pootje aan de platte zijde van de LED.
        - [ ] De andere kant van de LED is met een draadje verbonden met rij 4.
        - [ ] Er loopt een draadje van rij 5 naar de LED.
        - [ ] Er loopt een draadje van rij 6 naar de weerstand.
        - [ ] Er loopt een draadje van de andere kant van de weerstand naar rij 12 (naar het pinnetje met bovenop een wit vlakje).

        **Projecttraject**

        - [x] Schakeling bouwen
        - [ ] PyVISA in terminal
        - [ ] PyVISA commando's `list` en `open`
        - [ ] PyVISA commando `query`
        - [ ] Terminator characters demo
        - [ ] PyVISA regeleindes
        - [ ] PyVISA LED laten branden

!!! info
    Om met Python via het VISA-protocol te kunnen communiceren met apparaten heb je specifieke packages nodig. Die gaan we later installeren in een _virtual environment_. Voor meer informatie over virtual environments zie de [Appendix _Virtual Environments_](virtual_environments.md). Tijdens testen is het vaak niet nodig om packages te installeren, maar je moet dan wel steeds opnieuw intypen wat je nodig hebt.

<div id="opd:pyvisaterminal"></div>
!!! opdracht-basis "PyVISA in terminal"
    === "opdracht"
        Je sluit de Arduino met een USB-kabel aan op de computer. In een `Terminal` open je een `pyvisa-shell` met een python _backend_. Om erachter te komen hoe de `pyvisa-shell` werkt type je het commando `help`. Je ziet een reeks aan commando's en bekijkt de helptekst van de commando's waarmee je denkt de `pyvisa-shell` te kunnen afsluiten. Wanneer je dit commando hebt gevonden sluit je daarmee de `pyvisa-shell` af. 
    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # open pyvisa-shell with python backend
        # check help of pyvisa-shell
        # check help of exit command
        # shut down the pyvisa-shell

        ```
        **Testcode**
        <pre><code>(ecpc) > uvx --from pyvisa --with pyvisa-py --with pyserial pyvisa-shell --backend py <button type="button" name="pyvisa-shell" onclick="runScript('pyvisa-shell')">{{ enter }}</button><button type="button" name="pyvisa-shell" onclick="runScript('pyvisa-shell')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="pyvisa-shell">
        Welcome to the VISA shell. Type help or ? to list commands.    
        (visa)
        </span>
        </code></pre>

        <pre><code>(visa) help <button type="button" name="help" onclick="runScript('help')">{{ enter }}</button><button type="button" name="help" onclick="runScript('help')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="help">
        Documented commands (type help `<topic>`):
        ========================================
        EOF  attr  close  exit  help  list  open  query  read  termchar  timeout  write
        </span>
        </code></pre>   
    === "check"
        **Checkpunten**

        - [ ] Na het openen van een `pyvisa-shell` staat er op een nieuwe regel `(visa)`.
        - [ ] Als je `help` intypt verschijnt er een heel rijtje met commando's.
        - [ ] Als je `help exit` intypt krijg je de hulpvaardige tekst: `Exit the shell session.`
        - [ ] Als je de `pyvisa-shell` met een commando afsluit staat daarna de naam van de conda environment weer tussen haakjes op een nieuwe regel (en niet `(visa)`).
       
        **Projecttraject**

        - [x] Schakeling bouwen
        - [x] PyVISA in terminal
        - [ ] PyVISA commando's `list` en `open`
        - [ ] PyVISA commando `query`
        - [ ] Terminator characters demo
        - [ ] PyVISA regeleindes
        - [ ] PyVISA LED laten branden

!!! info
    We gebruiken `uvx` om Python packages te draaien zonder ze te installeren. We starten `pyvisa-shell`, die afkomstig is uit het package `pyvisa` (`--from pyvisa`). We maken hier gebruik van de optie `--backend py`, wat staat voor _gebruik backend: python_. Het kan namelijk dat er naast `pyvisa-py` ook andere _backends_, of _drivers_, geïnstalleerd staan op het systeem die de VISA-communicatie kunnen verzorgen. Als je bijvoorbeeld LabVIEW geïnstalleerd hebt, dan heb je de drivers van National Instruments. De verschillende backends geven de aangesloten apparaten andere namen. Ook ondersteunen niet alle drivers alle type apparaten en moet je ze apart downloaden en installeren. Daarom maken we liever gebruik van de beschikbare Python drivers. We moeten dan wel meegeven dat we dat package ook nodig hebben (`--with pyvisa-py`) en omdat de Arduino is aangesloten op een seriële kabel[^USB] hebben we ook de PySerial package nodig (`--with pyserial`). Voluit wordt dan dus:
    ```shell
    uvx --from pyvisa --with pyvisa-py --with pyserial pyvisa-shell --backend py
    ```
    Dat dit aardig vervelend kan worden met intypen is waarschijnlijk wel duidelijk. Daarom gaan we straks gebruik maken van _virtual environments_.

    [^USB]: USB staat voor _Universal Serial Bus_, oftewel een universele standaard voor seriële communicatie. Dat mag je vergeten.


!!! opdracht-basis "PyVISA commando's `list` en `open`"
    === "opdracht"
        Je bekijkt het lijstje met aangesloten apparaten door in de `pyvisa-shell` het commando `list` te typen. Je haalt de USB-kabel waarmee de Arduino aan de computer is aangesloten uit de computer en vraagt nogmaals de lijst met aangesloten apparaten op. Nu weet je welke poort de Arduino is. Je bekijkt daarna de helptekst van het commando `open`, waarna je de communicatie met de Arduino opent.
    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # open pyvisa-shell with python backend
        # check list of connected devices
        # check help of open command
        # open Arduino

        ```
        **Testcode**
        <pre><code>(visa) list <button type="button" name="list" onclick="runScript('list')">{{ enter }}</button><button type="button" name="list" onclick="runScript('list')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="list">( 0) ASRL3::INSTR
        ( 1) ASRL5::INSTR
        ( 2) ASRL28::INSTR</span>
        </code></pre>

        <pre><code>(visa) help open <button type="button" name="help open" onclick="runScript('help open')">{{ enter }}</button><button type="button" name="help open" onclick="runScript('help open')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="help open">Open resource by number, resource name or alias: open 3</span>
        </code></pre>    
    === "check"
        **Checkpunten**

        - [ ] Na het commando `list` verschijnt er een lijst met een of meerdere apparaten.
        - [ ] Als de Arduino niet op de computer is aangesloten is er een apparaat uit het lijstje verdwenen. 
        - [ ] Als je de Arduino opent verschijnt de tekst: 
        
        ``` consolecode
        ASRL?::INSTR has been opened.
        You can talk to the device using "write", "read" or "query".
        The default end of message is added to each message.
        ```

        **Projecttraject**

        - [x] Schakeling bouwen
        - [x] PyVISA in terminal
        - [x] PyVISA commando's `list` en `open`
        - [ ] PyVISA commando `query`
        - [ ] Terminator characters demo
        - [ ] PyVISA regeleindes
        - [ ] PyVISA LED laten branden

<div id="opd:pyvisa_query"></div>
!!! opdracht-basis "PyVISA commando `query`"
    === "opdracht"
        Je stuurt een commando naar de Arduino met `query COMMANDO`. In de [documentatie van de firmware](firmware.md) heb je het commando opgezocht om de identificatiestring uit te lezen. Nadat je dit commando naar de Arduino stuurt krijg je een error. Je leest rustig verder in het hoofdstuk om erachter te komen hoe je dit moet oplossen.
    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # send query to get identification string 
        ```
        **Testcode**
        <pre><code>(open) query gappie <button type="button" name="query gappie" onclick="runScript('query gappie')">{{ enter }}</button><button type="button" name="query gappie" onclick="runScript('query gappie')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="query gappie">Response: ERROR: UNKNOWN COMMAND gappie</span>
        </code></pre>        
    === "check"
        **Checkpunten**

        - [ ] Je hebt het woord `query` goed geschreven en met kleine letters.
        - [ ] Na het commando `query` volgt een spatie.
        - [ ] Na de spatie staat het volledige commando om de identificatiestring uit te lezen, in hoofdletters (dus met `*` en `?`, want deze horen er ook bij!).
        - [ ] Als je het commando verstuurt, verschijnt er de error:
        ``` consolecode
        Response: ERROR: UNKNOWN COMMAND .....
        ```

        **Projecttraject**

        - [x] Schakeling bouwen
        - [x] PyVISA in terminal
        - [x] PyVISA commando's `list` en `open`
        - [x] PyVISA commando `query`
        - [ ] Terminator characters demo
        - [ ] PyVISA regeleindes
        - [ ] PyVISA LED laten branden

Een error, niet helemaal wat je had gehoopt! Als je goed kijkt in de [documentatie van de firmware](firmware.md) dan zie je dat er bepaalde _terminator characters_ (regeleindes) nodig zijn. Dit zijn karakters die gebruikt worden om het einde van een commando te markeren. Het is, zogezegd, een <q>enter</q> aan het eind van een zin. Dit mag je heel letterlijk nemen. Oude printers voor computeruitvoer gebruikten een _carriage return_ (CR) om de wagen met papier (typemachine) of de printerkop weer aan het begin van een regel te plaatsen en een _line feed_ (LF) om het papier een regel verder te schuiven. Nog steeds is het zo dat in tekstbestanden deze karakters gebruikt worden om een nieuwe regel aan te geven. 

!!! info "Carriage return line feed: typewriter demonstration"
    <iframe title="Carriage Return Line Feed: Typewriter Demonstration" src="https://drive.google.com/file/d/16jcQcI2o8i3dh3z7TLnK1Qb9OLnF5g20/preview" width="540" height="304" style="border:none;"></iframe>

Jammer maar helaas, verschillende besturingssystemen hebben verschillende conventies. Windows gebruikt nog steeds allebei: een combinatie van _carriage return + line feed_ (CRLF). Maar MacOS/Linux/Unix gebruiken enkel een _line feed_ (LF), want hoeveel meer heb je nodig? Af en toe is dat lastig, vooral wanneer er elektronica in het spel is want dan willen de regeleindes voor schrijven en lezen nog wel eens verschillend zijn.[^regeleindes]

[^regeleindes]: De regeleindes voor de Arduino firmware zijn verschillend voor lezen en schrijven. Dit heeft een oninteressante reden: bij het ontvangen van commando's is het makkelijk om alles te lezen totdat je één bepaald karakter (LF) tegenkomt. Bij het schrijven gebruikt de standaard `println`-functie een Windows-stijl regeleinde (CRLF).

!!! opdracht-basis "Terminator characters demo"
    === "opdracht"
        Je vraagt je misschien af wat het betekent dat er bij het schrijven en lezen regeleindes gebruikt worden. Daarom open je de _Termination Character Demo_ door een Terminal te starten en in te typen:
        ```shell
        uvx termchar-demo
        ```
        Je gaat naar de _Basic_ tab, daar zie je twee inputvelden voor de client (dat ben jij) en de server (dat is de Arduino).
        
        Je schrijft een commando `measure_voltage` naar de Arduino (druk op _Write_). In het _Input_ veld van de Arduino verschijnt jouw commando maar het staat nog niet in de _Application Log_, het is dus nog niet door de Arduino verwerkt. Want de _Read Termination Characters_ van de Arduino zijn `\n`(LF), die gaat dus pas lezen als die tekens zijn verstuurd. Je verstuurt `\n` en ziet dat het commando wordt verwerkt en jij een antwoord krijgt. 

        Steeds `\n` handmatig versturen is onhandig daarom voer je bij de Client als _Write Termination Characters_ `\n` in. Je verstuurt nog een commando `measure_current`, drukt op _Write_ en ziet dat het bericht direct door de Arduino wordt verwerkt en een antwoord terugstuurt. 

        In het _Input_ veld van de Client staan twee antwoorden van de Arduino, als je nu op _Read_ drukt blijven de termination characters in de antwoorden staan en moet je ze handmatig uit elkaar gaan halen. Dat is niet handig, daarom vul je bij de _Read Termination Characters_ van de Client `\r\n`(CRLF) in. Daarna druk je op _Read_ en merk je dat de twee antwoorden apart uitgelezen worden, super handig!
    === "check"
        **Checkpunten**
    
        - [ ] De Client _Write Termination Characters_ is ingesteld op `\n`.
        - [ ] De Client _Read Termination Characters_ is ingesteld op `\r\n`.
        - [ ] Bij het versturen van een bericht naar de server wordt deze verwerkt en krijgt de client een antwoord terug.
        - [ ] Bij het lezen van het antwoord door de client komen geen termination characters in de _Application Log_ te staan.

        **Projecttraject**
    
        - [x] Schakeling bouwen
        - [x] PyVISA in terminal
        - [x] PyVISA commando's `list` en `open`
        - [x] PyVISA commando `query`
        - [x] Terminator characters demo
        - [ ] PyVISA regeleindes
        - [ ] PyVISA LED laten branden

???+ opdracht-meer "Terminator characters demo: input buffer en timeout"
    Ga opnieuw naar de Termination Character Demo en lees de laatste stappen van de _Introduction_ tab. Open de _Advanced_ tab en voer de stappen uit. 


![Klik hier](assets/eastereggs/ECPC-silver.svg){: id="easterEggImage" style="width:1.5%" data-message="Pssst met '↑' (pijltje omhoog) kun je in een terminal de vorige commando's terughalen. Probeer maar eens!"} Je gaat nu de regeleindes instellen in PyVISA:

!!! opdracht-basis "PyVISA regeleindes"
    === "opdracht"
        Je gaat weer terug naar de Terminal, en opent een pyvisa-shell. Je gebruikt het commando `termchar` om de regeleindes in te stellen. Om erachter te komen hoe je deze moet instellen vraag je de helptekst op met `help termchar`. Je vraagt eerst de huidige instellingen van de regeleindes op en ziet dat deze niet goed staan. Daarna stel je de read in op CRLF en de write op LF. Je bekijkt nog een keer de instellingen om te controleren of de regeleindes nu wel goed staan. Je gaat terug naar de [opdracht PyVISA commando `query`](#opd:pyvisa_query) en krijgt een response in plaats van een error. 

        !!! info "\r\n en CRLF"
            Bij de _Termination characters demo_ maakte je gebruik van `\r\n`, dat is de programmeertaal equivalent van `CRLF`.

    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # get help of termchar command
        # check current termchar settings
        # adjust termchar settings in read = CRLF and write = LF
        # check new termchar settings
        # send query to get identification string
        ```
        **Testcode**
        <pre><code>(open) help termchar <button type="button" name="help termchar" onclick="runScript('help termchar')">{{ enter }}</button><button type="button" name="help termchar" onclick="runScript('help termchar')" class="invisible">{{ reload }}</button>
        <span class="invisible" name="help termchar">Get or set termination character for resource in use.
        `<termchar>` can be one of: CR, LF, CRLF, NUL or None.
        None is used to disable termination character
        Get termination character:
            termchar
        Set termination character read or read+write:
            termchar `<termchar>` [`<termchar>`]</span>
        </code></pre>
    === "check"
        **Checkpunten**

        - [ ] De regeleindes zijn ingesteld met het commando `termchar`. Na dit commando volgt een spatie. Daarachter volgen de karakters voor de read termchar, opnieuw gevolgd door een spatie met daarachter de karakters voor de write termchar. 
        - [ ] De _read_ regeleinde staat ingesteld op CRLF.
        - [ ] De _write_ regeleind staat ingesteld op LF.
        - [ ] Als je met het commando `termchar` de instellingen van de regeleindes opvraagt, staat er:
        ``` consolecode
        Termchar read: CRLF write: LF
        use CR, LF, CRLF, NUL or None to set termchar
        ```
        - [ ] Als je het commando `query` verstuurt om de identificatiestring uit te lezen, verschijnt er:  
        ``` consolecode
        Response: Arduino VISA firmware v1.1.0
        ```

        **Projecttraject**

        - [x] Schakeling bouwen
        - [x] PyVISA in terminal
        - [x] PyVISA commando's `list` en `open`
        - [x] PyVISA commando `query`
        - [x] Terminator characters demo
        - [x] PyVISA regeleindes
        - [ ] PyVISA LED laten branden

!!! info "Onzichtbare regeleindes"
    Omdat de Arduino nu weet wanneer het commando voorbij is (door de LF aan het eind van de <q>zin</q>), krijg je antwoord! Dat antwoord heeft dan juist weer een CRLF aan het einde, dus `pyvisa-shell` weet wanneer het kan stoppen met luisteren en print het antwoord op het scherm. De karakters CRLF en LF _zelf_ blijven onzichtbaar voor ons.

!!! opdracht-basis "PyVISA LED laten branden"
    === "opdracht"
        Je zoekt in de [documentatie van de firmware](firmware.md) op hoe je een spanning op het uitvoerkanaal zet. Je leest dat er een maximale waarde is voor de spanning en zet deze waarde op het uitvoerkanaal. Je ziet dat de LED brandt en er verschijnt een glimlach op je gezicht. 
        
        Je bent benieuwd naar wat er gebeurt als je over de maximale spanning heen gaat en zet de maximale waarde + 1 op het uitvoerkanaal. Je denkt na over een verklaring voor wat je ziet gebeuren. 
        
        Je weet dat een LED een drempelspanning nodig heeft om te branden. Je vult een paar waardes in tussen de minimale en maximale waarde om erachter te komen wat deze drempelspanning is. 
    === "code"
        **Pseudo-code**
        ``` ps1 title="Terminal"
        # set maximum voltage
        # set maximum voltage + 1
        # set threshold voltage
        ```
        **Testcode**      
        Zie [documentatie van de firmware](firmware.md).  
        
    === "check"
        **Checkpunten**

        - [ ] Je stuurt een commando naar de Arduino met behulp van het commando `query`.
        - [ ] Je hebt woord `query` goed geschreven en met kleine letters.
        - [ ] Je hebt het commando om een spanning op het uitvoerkanaal te zetten geschreven met hoofdletters.
        - [ ] Je zet een spanning op uitvoerkanaal `0`.
        - [ ] Achter het kanaalnummer staat een spatie.
        - [ ] Na de spatie staat een geheel getal tussen 0 en 1023.
        - [ ] Als je de waarde 828 naar uitvoerkanaal 0 stuurt gaat de LED branden.

        **Projecttraject**

        - [x] Schakeling bouwen
        - [x] PyVISA in terminal
        - [x] PyVISA commando's `list` en `open`
        - [x] PyVISA commando `query`
        - [x] Terminator characters demo
        - [x] PyVISA regeleindes
        - [x] PyVISA LED laten branden

## Een eenvoudig script

Je hebt via de shell contact gelegd met de hardware. Nu wordt het tijd om, met de documentatie[@pyvisa] in de aanslag, hetzelfde vanuit Python te doen. Als je met een nieuw project begint is het helemaal geen gek idee om een kort script te schrijven waarin je wat dingen uitprobeert. Als alles lijkt te werken kun je het netjes gaan maken en gaan uitbreiden. We beginnen hier met een eenvoudig script en zullen dat daarna gaan verfijnen.

We lopen het voorbeeldscript eerst regel voor regel door en geven het volledige script aan het eind. Allereerst importeer je de `pyvisa`-bibliotheek met:
``` py
import pyvisa
```
Binnen PyVISA wordt alles geregeld met behulp van een _Resource Manager_. Die krijg je met:
``` py
rm = pyvisa.ResourceManager("@py")
```
Die kun je bijvoorbeeld gebruiken om een lijst van alle beschikbare poorten te krijgen:
``` py
ports = rm.list_resources()

# Bijvoorbeeld: ("ASRL28::INSTR",)
```
Om nu daadwerkelijk verbinding te gaan maken met de Arduino moet je die _openen_. Daarvoor geef je de poortnaam op en vertel je meteen wat de instellingen moeten zijn voor de regeleindes bij het lezen (CRLF, `#!py "\r\n"`) en bij het schrijven (LF, `#!py "\n"`):
``` py
device = rm.open_resource(
    "ASRL28::INSTR", read_termination="\r\n", write_termination="\n"
)
```
Tenslotte stuur je een query naar de Arduino:
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
    "ASRL28::INSTR", read_termination="\r\n", write_termination="\n"
)
identification = device.query("*IDN?")
print(identification)
```
<pre>
<code>(ecpc) > python test_arduino.py
<span class="invisible" name="test_arduino">('ASRL28::INSTR',)
Arduino VISA firmware v1.0.0</span>
</code></pre></div>

De output van het script is afhankelijk van het systeem en het aantal apparaten dat verbonden is.

!!! opdracht-basis "Vergelijk script met `pyvisa-shell`"
    === "opdracht"
        Met bovenstaande code heb je precies hetzelfde gedaan in Python als in de `pyvisa-shell`. Vergelijk de verschillende stappen hieronder met elkaar door met de muis over de tekst heen te gaan.
    
    === "check"
        **Projecttraject**

        - [x] Vergelijk script met `pyvisa-shell`
        - [ ] PyVISA in Pythonscript
        - [ ] LED laten branden
        - [ ] flashingLED
        - [ ] Account aanmaken
        - [ ] Van bestaande map repository maken
        - [ ] Commit 
        - [ ] Push en pull

--8<-- "docs/assets/comparison/compare_shell_script.html"

<div id="opd:condaenv"></div>
!!! opdracht-basis "Environment aanmaken"
    === "opdracht"
        Open een `Anaconda Prompt`, die je kunt vinden via de zoekbalk van Windows. Maak de conda environment `pythondaq` aan en installeer de benodigde packages. Gebruik hiervoor het volgende commando:

        ``` ps1 title="Terminal"
        conda create --name pythondaq --channel conda-forge python pyvisa-py
        ```
        Om een conda environment daadwerkelijk te gebruiken moet je die altijd eerst _activeren_. Voor het activeren van de environment `pythondaq` gebruik je het volgende commando:
        ``` ps1 title="Terminal"
        conda activate pythondaq
        ```
    === "check"
        **Checkpunten**

        - [ ] Je hebt een conda environment met de naam `pythondaq` aangemaakt.
        - [ ] De environment bevat de packages `python` en `pyvisa-py`. 
        - [ ] De environment is geactiveerd.

        **Projecttraject**

        - [x] Schakeling bouwen
        - [x] Environment aanmaken
        - [ ] PyVISA in terminal
        - [ ] PyVISA commando's `list` en `open`
        - [ ] PyVISA commando `query`
        - [ ] Terminator characters demo
        - [ ] PyVISA regeleindes
        - [ ] PyVISA LED laten branden

<div id="opd:test_arduino"></div>
!!! opdracht-basis "PyVISA in Pythonscript"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Je gaat de gegeven Pythoncode testen. Hiervoor open je in Visual Studio Code de map {{folder}}`ECPC` en maak je een bestand {{new_file}}`test_arduino.py` aan. Je kopieert de gegeven Pythoncode in dit bestand. Je ziet dat de code gebruik maakt van de package `pyvisa` daarom selecteer je de environment die je bij [opdracht Environment aanmaken](#opd:condaenv) hebt gemaakt. Je slaat het bestand op en runt het bestand.
            </div>
            <div>
            {{folder}}`ECPC`  
            {{T}}{{new_file}}`test_arduino.py`  
            {{L}}{{dots}}  
            </div>
        </div>

        !!! info "could not open port 'COM28': FileNotFoundError"
            Krijg je een `#!py FileNotFoundError`? Dan kan het zijn dat het script een poort probeert te openen die bij jou een andere naam heeft. Probeer met het lijstje instrumenten te raden welke poort de Arduino is en pas het script aan totdat het werkt.[^tip-aansluiten]

        [^tip-aansluiten]: Tip: als je de Arduino loshaalt en weer aansluit is het de nieuwe regel in het lijstje.

        !!! info "could not open port 'COM3': PermissionError"
            Krijg je een `#!py PermissionError`? Dan heb je vast nog een terminal openstaan waarin `pyvisa-shell` actief is. Sluit deze eerste af.
    === "code"
        **Pseudo-code**
        ``` py
        # import pyvisa package
        # create resource manager
        # get list resources
        # open device
        # send query to get identification string
        ```
        **Testcode**      
        <div class="code-box"><button type="button" name="test_arduino_test_code" onclick="runScript('test_arduino_test_code')" class="run">{{ run }}</button><button type="button" name="test_arduino_test_code" onclick="runScript('test_arduino_test_code')" class="reload invisible">{{ reload }}</button> test_arduino.py
        ``` py
        ...

        print(ports)
        print(identification)
        ```
        <pre>
        <code>(ecpc) > python test_arduino.py
        <span class="invisible" name="test_arduino_test_code">('ASRL28::INSTR',)
        Arduino VISA firmware v1.0.0</span>
        </code></pre></div>
    === "check"
        **Checkpunten**

        - [ ] Je hebt het juiste conda environment geselecteerd (zie ook [paragraaf _Conda environments_](virtual_environments.md#activeren-en-deactiveren)).
        - [ ] Je opent de poort met de naam van jouw Arduino (in het geval dat jouw Arduino niet 'ASRL28::INSTR' heet). 
        - [ ] Je hebt alle terminals (ook de `Anaconda Prompt`) gesloten waarin communicatie met de Arduino openstond. 
        - [ ] Je krijgt een lijst met poorten en de identificatiestring terug als je het script runt.

        **Projecttraject**

        - [x] Vergelijk script met `pyvisa-shell`
        - [x] PyVISA in Pythonscript
        - [ ] LED laten branden
        - [ ] flashingLED
        - [ ] Account aanmaken
        - [ ] Van bestaande map repository maken
        - [ ] Commit 
        - [ ] Push en pull

!!! opdracht-basis "LED laten branden"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Om straks de $I,U$-karakteristiek van een LED te kunnen bepalen, ga je nu eerst een reeks spanningen naar de LED sturen. Hierdoor gaat de LED branden. Je maakt hiervoor een bestand {{new_file}}`test_LED.py` aan in de map {{folder}}`ECPC`. Je schrijft eerst een regel code waarmee je een commando naar de Arduino stuurt waardoor de LED gaat branden. Daarna schrijf je de code om zodat de spanning oploopt van de minimale waarde tot aan de maximale waarde.
            </div>
            <div>
            {{folder}}`ECPC`  
            {{T}}{{file}}`test_arduino.py`  
            {{T}}{{new_file}}`test_LED.py`  
            {{L}}{{dots}}  
            </div>
        </div>
 
        !!! info "f-strings"
            Het sturen van commando's naar de Arduino waar een variabele spanning in staat gaat gemakkelijk met f-strings. Voor meer informatie zie de [paragraaf f-strings](basis-python.md#f-strings-variabelen-en-input).
    === "code"
        **Pseudo-code**
        ``` py
        # import pyvisa package
        # create resource manager
        # get list resources
        # open device
        # send query to get identifaction string
        #
        # for value in min to max
        #   send query to set output channel to value
        ```
        **Testcode**      
        <div class="code-box"><button type="button" name="test_LED" onclick="runScript('test_LED')" class="run">{{ run }}</button><button type="button" name="test_LED" onclick="runScript('test_LED')" class="reload invisible">{{ reload }}</button> test_LED.py
        ``` py
        ...
        final_value = device.query("OUT:CH0?")
        print(final_value)
        ```
        <pre>
        <code>(ecpc) > python test_LED.py
        <span class="invisible" name="test_LED">1023</span>
        </code></pre></div>        
    === "check"
        **Checkpunten**

        - [ ] Je hebt het juiste conda environment geselecteerd (zie ook [paragraaf _Conda environments_](virtual_environments.md#activeren-en-deactiveren)).
        - [ ] Je opent de poort met de naam van jouw Arduino (in het geval dat jouw Arduino niet 'ASRL28::INSTR' heet). 
        - [ ] Je hebt alle terminals (ook de `Anaconda Prompt`) gesloten waarin communicatie met de Arduino openstond. 
        - [ ] Je krijgt een lijst met poorten en de identificatiestring terug als je het script runt.
        - [ ] Je laat de spanning oplopen van de minimale tot de maximale waarde. 
        - [ ] Als je goed kijkt zie je de LED vertraagd oplichten.
        - [ ] Als je de waarde op kanaal 0 opvraagt aan het eind van de reeks met `OUT:CH0?` krijg je `1023` terug.

        **Projecttraject**

        - [x] Vergelijk script met `pyvisa-shell`
        - [x] PyVISA in Pythonscript
        - [x] LED laten branden
        - [ ] flashingLED
        - [ ] Account aanmaken
        - [ ] Van bestaande map repository maken
        - [ ] Commit 
        - [ ] Push en pull


<div id="opd:flashingLED"></div>
!!! opdracht-basis "flashingLED"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Om bekend te raken met de code maak je een nieuw bestand {{new_file}}`flashingLED.py` aan in de map {{folder}}`ECPC`. Hierin schrijf je code om de LED in een regelmatig tempo te laten knipperen.
            </div>
            <div>
            {{folder}}`ECPC`  
            {{T}}{{file}}`test_arduino.py`  
            {{T}}{{file}}`test_LED.py`  
            {{T}}{{new_file}}`flashingLED.py`  
            {{L}}{{dots}}  
            </div>
        </div>
        
        !!! info
            Je kan hiervoor gebruik maken van de module _time_ die standaard met Python meekomt.[^standard-library] Met de functie `#! sleep()` kun je de executie van de volgende regel in het script met een aantal seconden uitstellen.

            ``` py
            import time
            # wait 28 second
            time.sleep(28)
            ```

            [^standard-library]: Zie ook: [The Python Standard Library](vervolg-python.md#de-standard-library-en-de-python-package-index)
    === "code"
        **Pseudo-code**
        ``` py
        # import pyvisa package
        # create resource manager
        # get list resources
        # open device
        # send query to get identification string
        #
        # repeat:
        #   send query set output channel to max
        #   wait
        #   send query set output channel to min
        #   wait
        ```
        **Testvoorbeeld**

        <iframe src="https://drive.google.com/file/d/1GdP3-9LTCSW_UGF708GlX0rKdhoNS5_G/preview" width="500" height="281" style="border:none;" align="left"></iframe>
    === "check"
        **Checkpunten**

        - [ ] De LED staat een tijd aan en een tijd uit.
        - [ ] Het aan- en uitgaan van de LED herhaald zich enkele keren.

        **Projecttraject**

        - [x] Vergelijk script met `pyvisa-shell`
        - [x] PyVISA in Pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [ ] Account aanmaken
        - [ ] Van bestaande map repository maken
        - [ ] Commit 
        - [ ] Push en pull

!!! opdracht-meer "Meer knipperritmes"
    Breid het bestand {{file}}`flashingLED.py` uit met meer knipperritmes. Bijvoorbeeld:

    * Maak een _SOS light_ &mdash; een lamp die in morsecode het signaal SOS uitzendt.
    * Maak een _breathing light_ &mdash; een lamp die langzaam aan- en uitgaat gevolgd door een pauze in het tempo dat iemand in- en uitademt.
    * Maak een _heartbeat light_ &mdash; een lamp die twee keer kort na elkaar flitst gevolgd door een pauze in het tempo van een hartslag.
    * Bedenk je eigen knipperritme.