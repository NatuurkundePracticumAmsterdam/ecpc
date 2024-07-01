# Model-View-Controller

## MVC en het gebruik van packages

MVC staat voor _Model-View-Controller_ en is een belangrijk, maar wat diffuus concept in software engineering en is vooral van toepassing op gebruikersinterfaces. Het belangrijkste idee is dat een programma zoveel mogelijk wordt opgesplitst in onderdelen. Het _model_ bevat de onderliggende data en concepten van het programma (een database, meetgegevens, berekeningen, etc.); de _controller_ praat met de fysieke omgeving en reageert bijvoorbeeld op invoer van een gebruiker en past het model aan; de _view_ is een weergave van de data uit het model en vormt de gebruikersinterface zelf. Vaak praten alle onderdelen met elkaar, maar een gelaagd model is makkelijker te overzien en dus eenvoudiger te programmeren. In het geval van een natuurkunde-experiment is dit vaak mogelijk. Daarmee krijgt MVC bij ons een andere betekenis dan bijvoorbeeld bij het bouwen van websites. Het gelaagd MVC-model dat wij gaan gebruiken is hieronder weergegeven:

<div id="fig:mvc-model"></div>
![Een gelaagd model-view-controller model](figures/mvc-model.svg){: style="width:50%", align=left}

De _controllers_ communiceren met de apparatuur; het _model_ bevat de meetgegevens, berekeningen en de opzet van het experiment; de _view_ zorgt voor een gebruikersinterface met weergave van de data.

Het scheiden van je programma in deze lagen kan enorm helpen om ervoor te zorgen dat je geen _spaghetticode_ schrijft &mdash; ongestructureerde en moeilijk te begrijpen code. Wanneer het drukken op een knop in de code van de grafische omgeving direct commando's stuurt naar de Arduino of dat de code voor het doen van een enkele meting meteen de $x$-as van een grafiek aanpast, sla je lagen over in ons model en knoop je delen van het programma aan elkaar die niet direct iets met elkaar te maken hebben. De knop moet een meting starten, ja, maar _hoe_ dat precies moet is niet de taak van de gebruikersinterface. En de meting zelf moet zich niet bemoeien met welke grafiek er precies getekend wordt. Je zult merken dat het heel lastig wordt om overzicht te houden en later aanpassingen te doen als je alles door elkaar laat lopen. Je zult dan door je hele code moeten zoeken als je óf de aansturing van de Arduino, óf de grafische interface wilt aanpassen. En dus gaan we alles netjes structureren.

De verschillende onderdelen in het model kunnen we voor ons experiment als volgt beschrijven:

__View__
: Het <q>startpunt</q> van je applicatie. Geeft de opdracht om een meting te starten en geeft na afloop de resultaten van de meting weer op het scherm.

__Model__
: De code die het experiment uitvoert door verschillende metingen te doen en instellingen aan te passen, zoals de spanning over de LED. Het model weet hoe het experiment in elkaar zit en dat er bijvoorbeeld een weerstand van 220 &Omega; aanwezig is. Geeft opdrachten aan de controller.

__Controller__
: De code die via pyvisa praat met de Arduino. Opdrachten worden omgezet in firmwarecommando's en doorgestuurd naar het apparaat.

Het opsplitsen van je programma _hoeft niet in één keer!_ Dit kan stapsgewijs. Je kunt starten met een eenvoudig script &mdash; zoals we hierboven gedaan hebben &mdash; en dat langzaam uitbreiden. Je begint klein, verdeelt je code in lagen en bouwt vervolgens verder.

## Implementeren van MVC
Het opsplitsen van het programma in MVC gaan we stapsgewijs doen. We gaan een class maken voor de aansturing van de Arduino, deze class valt in de categorie _controller_.

<div id="opd:meting-class"></div>
!!! opdracht-inlever "Pythondaq: controller bouwen"
    Pak je script van [opdracht _Pythondaq: CSV_](basisscript.md#opd:quickndirty-csv) erbij en schrijf bovenaan &mdash; maar _onder_ de `#!py import`-statements &mdash; een class `#!py ArduinoVISADevice`.
    We gaan de class stap voor stap opbouwen. Je kunt de class testen met de python-code onder elke opdracht. 
    
    1. Maak een `#!py __init__()` method die het device opent. 
        ``` py
        # de poort moet je mogelijk zelf aanpassen
        port = "ASRL3::INSTR"
        
        # maak een instance van je class aan
        device = ArduinoVISADevice(port=port)
        ```
    1. Schrijf een method die de identificatiestring terug geeft. 
        ``` py
        # print identification string
        print(device.get_identification())
        ```
    
    1. Met de controller class willen we de arduino gaan aansturen en uitlezen. Maak een aantal methods zodat alle firmwarecommando's ondergebracht zijn in de class.
        ``` py
        # set OUTPUT voltage on channel 0, using ADC values (0 - 1023)
        device.set_output_value(value=512)

        # get the previously set OUTPUT voltage in ADC values (0 - 1023)
        ch0_value = device.get_output_value()

        # measure the voltage on INPUT channel 2 in ADC values (0 - 1023)
        ch2_value = device.get_input_value(channel=2)

        # measure the voltage on INPUT channel 2 in volts (0 - 3.3 V)
        ch2_voltage = device.get_input_voltage(channel=2)
        ```
    
    1. Wat is het verschil tussen `#!py set_output_value()` en `#!py get_output_value()`?

    1. Als je een instance van ArduinoVISADevice wilt maken, dan moet je nu de poort meegeven. Daarom is het handig om _buiten_ de klas een functie te hebben waarmee je een lijst krijgt van alle beschikbare poorten. 
        ``` py
        # get available ports
        print(list_devices())  
        ```

Je hebt nu een werkende controller, maar je gebruikt het nog niet in je experiment. 

!!! opdracht-inlever "Pythondaq: Controller implementeren"
    Pas je script &mdash; en vooral ook de class! &mdash;aan zodat in je <q>experiment</q>-code alleen maar aanroepen naar de class zitten.
    Controleer dat het schript precies hetzelfde doet als bij [opdracht _quick 'n dirty_ meting](basisscript.md#opd:quickndirty-meting).

Als je de vorige opdracht succesvol hebt afgerond maakt het niet meer uit wat de precieze commando's zijn die je naar de hardware moet sturen. Als je de Arduino in de opstelling vervangt voor een ander meetinstrument moet je de class aanpassen, maar kan alle code die met het experiment zelf te maken heeft hetzelfde blijven.

Nu we de _controller_ hebben gemaakt die de Arduino aanstuurt, blijft er nog een stukje code over. Het laatste stuk waar de plot gemaakt kunnen we beschouwen als een _view_ en de rest van de code &mdash; waar de metingen worden uitgevoerd en de stroomsterkte $I$ wordt berekend &mdash; is een _model_. We gaan de code nog wat verder opsplitsen om dat duidelijk te maken én onderbrengen in verschillende bestanden &mdash; dat is uiteindelijk beter voor het overzicht.

!!! opdracht-inlever "Pythondaq: Controller afsplitsen"
    Pas het script aan uit [opdracht _Pythondaq: ArduinoVISADevice_](#opd:meting-class). Knip de class uit het bestand en plak die in een nieuw bestand `#!py arduino_device.py`. Knip en plak _ook_ de functie `#!py list_devices()`, zodat alle `#!py pyvisa`-code netjes in één bestand zit. Je vervangt de functie en de class in het oorspronkelijke script door dit import statement:
    ``` py
    from arduino_device import ArduinoVISADevice, list_devices
    ```
    Controleer dat je code nog steeds hetzelfde werkt &mdash; dat het een meting uitvoert en de resultaten in een grafiek weergeeft. Waarschijnlijk moet je daarvoor nog wat bugs aanpakken (een vergeten import bijvoorbeeld).


!!! opdracht-inlever "Pythondaq: Model afsplitsen"
    We gaan nu met ongeveer dezelfde stappen het model afsplitsen van de rest van de code.

    1. Bespreek met elkaar en met de assistent welk deel van het script het model is. Kijk daarvoor nog eens goed naar [figuur MVC-model](#fig:mvc-model).
    1. Maak een class met (bijvoorbeeld) de naam `#!py DiodeExperiment` en een method `#!py scan()` die de meting met de for-loop uitvoert. Controleer dat het werkt.
    1. Volgens het schema praat alleen het model met de controller. De class `#!py DiodeExperiment` &mdash; het model &mdash; is dus degene die de class `#!py ArduinoVISADevice` &mdash; de controller &mdash; moet aanroepen en bewaren. Hoe doe je dat netjes? Overleg met elkaar.
    1. Het kan (later) handig zijn om niet altijd te scannen tussen 0 en 1023 maar een ander bereik te kiezen. Pas de `#!py scan()` method aan zodat deze `start`- en `stop`-parameters accepteert.
    1. Knip de class eruit en plaats die in het bestand `#!py diode_experiment.py` en gebruik weer een import-statement. Haal import-statements die je niet meer nodig hebt weg.
    1. Hernoem het overgebleven script naar {{file}}`view.py`.
    


Het oorspronkelijke script dat je gebruikte voor je meting is steeds leger geworden. Als het goed is gaat nu (vrijwel) het volledige script alleen maar over het starten van een meting en het weergeven en bewaren van de meetgegevens. In het <q>view</q> script komen verder geen berekeningen voor of details over welk kanaal van de Arduino op welke elektronische component is aangesloten. Ook staat hier niets over welke commando's de Arduino firmware begrijpt. Dit maakt het veel makkelijker om in de vervolghoofdstukken een gebruiksvriendelijke applicatie te ontwikkelen waarmee je snel en eenvoudig metingen kunt doen.

!!! opdracht-inlever "Pythondaq: Onzekerheid"
    We zijn al een eind op weg. We pakken nog één ding aan: onzekerheid. Er staan in onze grafiek nog geen foutenvlaggen. Als je de meting een paar keer herhaalt zie je dat de grafiek steeds iets anders is &mdash; er zit ruis op de metingen. We kunnen die op voorhand schatten, maar met een computergestuurde meting is het makkelijk om een meting een aantal keer te herhalen en op een nauwkeuriger resultaat uit te komen én de onzekerheid daarbij te bepalen.
    
    1. Overleg met je groepje en maak een plan hoe jullie de code gaan aanpassen om onzekerheid in te bouwen. Schrijf nog geen code op je computer maar schrijf de stappen uit met papier en pen. Het is dan veel makkelijker om te overleggen en na te denken. Welke delen van het programma moeten worden aangepast?
    1. Gebruik het plan om je eigen code aan te passen en test dat het werkt.
    

