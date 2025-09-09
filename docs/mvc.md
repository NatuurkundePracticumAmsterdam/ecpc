# Model-View-Controller

## MVC en het gebruik van packages

MVC staat voor _Model-View-Controller_ en is een belangrijk, maar ook een wat diffuus concept in software engineering en is vooral van toepassing op gebruikersinterfaces. Het belangrijkste idee is dat een programma zoveel mogelijk wordt opgesplitst in onderdelen. Het _model_ bevat de onderliggende data en concepten van het programma (een database, meetgegevens, berekeningen, etc.); de _controller_ praat met de fysieke omgeving en reageert bijvoorbeeld op invoer van een gebruiker en past het model aan; de _view_ is een weergave van de data uit het model en vormt de gebruikersinterface zelf. Vaak praten alle onderdelen met elkaar, maar een gelaagd programma is makkelijker te overzien en dus eenvoudiger te programmeren. In het geval van een natuurkunde-experiment is een gelaagd programma vaak mogelijk. Daarmee krijgt MVC in deze cursus een andere betekenis dan bijvoorbeeld bij het bouwen van websites. Het gelaagde MVC-programma dat je gaat gebruiken is hieronder weergegeven:

<div id="fig:mvc-model"></div>
![Een gelaagd model-view-controller model](figures/mvc-model.svg){: style="width:50%", align=left}

De _controllers_ communiceren met de apparatuur, zij bevatten informatie en berekeningen die apparatuur afhankelijk zijn; het _model_ bevat de meetgegevens, berekeningen over - en de opzet van - het experiment; de _view_ zorgt voor een gebruikersinterface met weergave van de data.

Het scheiden van je programma in deze lagen kan enorm helpen om ervoor te zorgen dat je geen _spaghetticode_ schrijft &mdash; ongestructureerde en moeilijk te begrijpen code. Wanneer het drukken op een knop in de grafische omgeving maakt dat er direct commando's gestuurd worden naar de Arduino of dat de code voor het doen van een enkele meting meteen de $x$-as van een grafiek aanpast, dan sla je lagen over en knoop je delen van het programma aan elkaar die niet direct iets met elkaar te maken hebben. De knop moet een meting starten, ja, maar _hoe_ dat precies moet is niet de taak van de gebruikersinterface. En de meting zelf moet zich niet bemoeien met welke grafiek er precies getekend wordt. Je zult merken dat het heel lastig wordt om overzicht te houden en later aanpassingen te doen als je alles door elkaar laat lopen. Je zult dan je hele code moeten doorzoeken als je óf de aansturing van de Arduino, óf de grafische interface wilt aanpassen. Om dat te voorkomen ga je alles netjes structureren.

De verschillende onderdelen in het programma kun je als volgt beschrijven:

__View__
: Het <q>startpunt</q> van je applicatie. Geeft de opdracht om een meting te starten en geeft na afloop de resultaten van de meting weer op het scherm.

__Model__
: De code die het experiment uitvoert door verschillende metingen te doen en instellingen aan te passen, zoals de spanning over de LED. Het model weet hoe het experiment in elkaar zit en dat er bijvoorbeeld een weerstand van 220 &Omega; aanwezig is. Geeft opdrachten aan de controller.

__Controller__
: De code die via `pyvisa` praat met de Arduino. Opdrachten worden omgezet in firmwarecommando's en doorgestuurd naar het apparaat.

Het opsplitsen van je programma _hoeft niet in één keer!_ Dit kan stapsgewijs. Je kunt starten met een eenvoudig script &mdash; zoals je eerder gedaan hebt met {{file}}`diode_experiment.py` &mdash; en dat langzaam uitbreiden. ![Klik hier](assets/eastereggs/ECPC-purple.svg){: id="easterEggImage" style="width:1.5%" data-message="Pssst met 'CTRL' + '/?' kun je stukken geselecteerde code uitcommentariëren en weer decommentariëren. Probeer maar eens!"} Je begint klein, verdeelt je code in lagen en bouwt vervolgens verder.

## Implementeren van MVC
Het opsplitsen van het {{file}}`diode_experiment.py` in MVC ga je stapsgewijs doen. Je gaat eerst een class maken voor de aansturing van de Arduino, deze class valt in de categorie _controller_.

!!! opdracht-inlever "Pythondaq: open repository"
    === "opdracht"
        Open in GitHub Desktop de repository van {{github}}`pythondaq` en open deze repository in Visual Studio Code. In de volgende opdrachten ga je het {{file}}`diode_experiment.py` uitbreiden en opsplitsen in model-view-controller.

    === "check"
        **Projecttraject**

        - [x] Pythondaq: open repository
        - [ ] Pythondaq: controller bouwen
        - [ ] Pythondaq: controller implementeren
        - [ ] Pythondaq: controller afsplitsen
        - [ ] Pythondaq: model en view splitsen

<div id="opd:meting-class"></div>
!!! opdracht-inlever "Pythondaq: controller bouwen"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Je schrijft een script {{new_file}}`test_controller.py` waarmee je de Arduino aanstuurt. Een gebruiker test de door jou geschreven controller met de volgende handelingen: 
            <ul> 
                <li> De gebruiker vraagt een lijst met beschikbare poorten op met de functie `#!py list_resources()`.</li> 
                <li> De gebruiker weet daarna aan welke poort de Arduino hangt en gebruikt deze poortnaam om een instance aan te maken van de class `ArduinoVISADevice`. Met deze class kan de gebruiker met de Arduino communiceren.</li> 
                <li> Met de method `#!py get_identification()` vraagt de gebruiker de identificatiestring op. </li>
                <li> De gebruiker zet met de method `#!py set_output_value()` een waarde van 828 op uitvoerkanaal 0. De gebruiker ziet de LED branden en weet daardoor dat de method werkt.</li>
                <li> De gebruiker controleert met de method `#!py get_output_value()` de waarde op uitvoerkanaal 0, die nog steeds 828 zou moeten zijn. </li>
                <li> De gebruiker vraagt met de method `#!py get_input_value()` de spanning op kanaal 1 op. Dit herhaalt de gebruiker vervolgens voor kanaal 2.</li>
                <li> Met de method `#!py get_input_voltage()` vraagt de gebruiker de spanning van kanaal 1 op in volt. De gebruiker rekent de gegeven waarde van de method `#!py get_input_value()` op kanaal 1 om naar volt en ziet dat deze overeenkomt met de gegeven spanning door de method `#!py get_input_voltage()` op kanaal 1. </li>
            </ul>
            </div>
            <div>
            {{folder}} `ECPC`   
            {{T}} {{github}} `pythondaq`  
            {{tab}} {{T}} {{file}} `diode_experiment.py`  
            {{tab}} {{T}} {{new_file}} `test_controller.py`  
            {{tab}} {{L}} {{dots}}  
            {{L}} {{dots}}  
            </div>
        </div>

    === "code"
        **Pseudo-code**
        ``` py title='test_controller.py'
        # def list_resources
        #    return list of available ports
        #
        # class ArduinoVISADevice:
        #    def __init__ (ask port from user)
        #        open device
        #
        #    def get_identification
        #        return identification string of connected device
        #
        #   def set_output_value
        #        set a value on the output channel
        #
        #   def get_output_value
        #        return the value of the output channel
        #      
        #   def get_input_value
        #        return the value of the input channel
        #
        #   def get_input_voltage
        #        return voltage in volt of the input channel
                
        ```
        **Testcode**
        <div class="code-box"><button type="button" name="basisscript_controller" onclick="runScript('basisscript_controller')" class="run">{{ run }}</button><button type="button" name="basisscript_controller" onclick="runScript('basisscript_controller')" class="reload invisible">{{ reload }}</button> test_controller.py
        ``` py
        # get available ports
        print(list_resources())

        # create an instance for the Arduino on port "ASRL28::INSTR"
        device = ArduinoVISADevice(port="ASRL28::INSTR")

        # print identification string
        identification = device.get_identification()
        print(identification)

        # set OUTPUT voltage on channel 0 in ADC values (0 - 1023)
        device.set_output_value(value=828)

        # measure the voltage on INPUT channel 2 in ADC values (0 - 1023)
        ch2_value = device.get_input_value(channel=2)
        print(f"{ch2_value=}")

        # measure the voltage on INPUT channel 2 in volts (0 - 3.3 V)
        ch2_voltage = device.get_input_voltage(channel=2)
        print(f"{ch2_voltage=}")

        # get the previously set OUTPUT voltage on channel 0 in ADC values (0 - 1023)
        ch0_value = device.get_output_value()
        print(f"{ch0_value=}")
        ```
        <pre>
        <code>(ECPC) > python test_controller.py
        <span class="invisible" name="basisscript_controller">('ASRL28::INSTR') 
        Arduino VISA firmware v1.1.0
        ch2_value=224
        ch2_voltage=0.7774193548387097
        ch0_value=828</span>
        </code></pre></div>
        
    === "check"
        **Checkpunten**

        - [ ] `#!py list_resources()` is een functie die buiten de class staat.
        - [ ] Aan de `#!py __init__()`-method moet een poortnaam worden meegegeven.
        - [ ] De `#!py __init__()`-method opent de communicatie met de Arduino.
        - [ ] Er is een method `#!py get_identification()` die de identificatiestring teruggeeft.
        - [ ] Aan de method `set_output_value()` moet een ADC-waarde worden meegegeven.
        - [ ] De methods `set_output_value()` en `get_output_value()` communiceren standaard met kanaal 0.
        - [ ] Aan de methods `get_input_value()` en `get_input_voltage()` moet een kanaal worden meegegeven. 
        - [ ] De methods `get_output_value()`, `get_input_value()` en `get_input_voltage` geven een ADC-waarde dan wel een spanning in volt terug.


        **Projecttraject**

        - [x] Pythondaq: open repository
        - [x] Pythondaq: controller bouwen
        - [ ] Pythondaq: controller implementeren
        - [ ] Pythondaq: controller afsplitsen
        - [ ] Pythondaq: model en view splitsen

Je hebt nu een werkende controller, maar je gebruikt deze nog niet in je experiment. 

!!! opdracht-inlever "Pythondaq: controller implementeren"
    === "opdracht"
        Kopieer de functie `list_resources()` en de class `ArduinoVISADevice` uit het bestand {{file}}`test_controller.py`. Voeg deze functie en class toe aan het bestand {{file}}`diode_experiment.py`. Pas de code daarna zo aan dat in het bestand {{file}}`diode_experiment.py` gebruikgemaakt wordt van de betreffende functie en de class met de bijhorende methods.
        
    === "code"
        **Pseudo-code**
        ``` py title='diode_experiment.py'
        # def list_resources
        #   ...
        #
        # class ArduinoVISADevice
        #   ...
        #
        # get list resources
        # connect to Arduino via class ArduinoVISADevice
        #
        # set output voltage from 0 to max
        #   set number of repeated measurements
        #       measure voltages
        #       calculate voltage LED
        #       calculate current LED
        #   calculate average voltage LED and uncertainty
        #   calculate average current LED and uncertainty
        #   print average voltage: average_voltage_LED +/- err_average_voltage_LED V  average current: average_current_LED +/- err_average_current_LED A
        #
        # turn LED off
        # create csv-file
        # plot average_current_LED vs average_voltage_LED
        ```        
    === "check"
        **Checkpunten**

        - [ ] In een script staan de functie `#!py list_resources()`, de class `#!py ArduinoVISADevice` en de code om de LED te laten branden, metingen te doen en het resultaat te laten zien.
        - [ ] Wanneer de class `#!py ArduinoVISADevice` uit het script wordt geknipt, werkt het bestand {{file}}`diode_experiment.py` niet meer.
        - [ ] Er wordt een lijst geprint met beschikbare poorten.
        - [ ] Er wordt een plot getoond van de gemiddelde spanning over en de gemiddelde stroomsterkte door de LED met de bijbehorende onzekerheden.
        - [ ] De gemiddelde spanning over en de gemiddelde stroomsterkte door de LED worden samen met de bijbehorende onzekerheden weggeschreven in een CSV-bestand.
        - [ ] De LED wordt uitgezet na de meting.


        **Projecttraject**

        - [x] Pythondaq: open repository
        - [x] Pythondaq: controller bouwen
        - [x] Pythondaq: controller implementeren
        - [ ] Pythondaq: controller afsplitsen
        - [ ] Pythondaq: model en view splitsen

Als je de vorige opdracht succesvol hebt afgerond maakt het niet meer uit wat de precieze commando's zijn die je naar de hardware moet sturen. Als je de Arduino in de opstelling vervangt voor een ander meetinstrument moet je de class aanpassen, maar kan alle code die met het experiment zelf te maken heeft hetzelfde blijven.

!!! opdracht-inlever "Pythondaq: controller afsplitsen"
    === "opdracht"

        <div class="grid-tree" markdown>
            <div>
            In latere opdrachten ga je een command-line interface en een grafische user interface maken voor het experiment. Daarom is het handig om alvast overzicht te creëren door de verschillende onderdelen van de MVC in aparte scripts te zetten en om ze handige namen te geven die duidelijk maken wat wat is.
            <br>
            <br>
            Je hebt eerder de code voor de controller gekopieerd van {{file}}`test_controller.py` naar {{file}}`diode_experiment.py` en dat is dus eigenlijk niet zo handig. Je hernoemt {{file}}`test_controller.py` naar {{new_file}}`arduino_device.py`. Het bestand {{file}}`#!py arduino_device.py` bevat de functie `#!py list_resources()` en de class `#!py ArduinoVISADevice`. Deze functie en class importeer je in het bestand {{file}}`diode_experiment.py` (in plaats van dat je de code kopieert). De functie `list_resources()` en de class `ArduinoVISADevice` kun je in het bestand {{file}}`diode_experiment.py` dan weer verwijderen.
            </div>
            <div>
            {{folder}} `ECPC`   
            {{T}} {{github}} `pythondaq`  
            {{tab}} {{T}} {{new_file}} `arduino_device.py`  
            {{tab}} {{T}} {{file}} `diode_experiment.py`  
            {{tab}} {{L}} {{dots}}  
            {{L}} {{dots}}  
            </div>
        </div>

        !!! info "Error"
            Waarschijnlijk krijg je één of meerdere errors als je {{file}}`diode_experiment.py` runt. Lees het bericht bij de error goed door. Kijk om welk bestand het gaat: {{file}}`arduino_device.py` of {{file}}`diode_experiment.py`? Wat is er volgens het error bericht niet goed? Misschien helpt het als je de (inmiddels onnodige) testcode verwijdert uit {{file}}`arduino_device.py`. Als dat inderdaad helpt, wat was dan het probleem?
    === "code"
        **Pseudo-code**
        ``` py title="arduino_device.py"
        # def list_resources
        #   ...
        #
        # class ArduinoVISADevice
        #   ...
        ```
        ``` py title="diode_experiment.py"
        from arduino_device import ArduinoVISADevice, list_resources
        
        # get list resources
        # connect to Arduino via class ArduinoVISADevice
        #
        # set output voltage from 0 to max
        #   set number of repeated measurements
        #       measure voltages
        #       calculate voltage LED
        #       calculate current LED
        #   calculate average voltage LED and uncertainty
        #   calculate average current LED and uncertainty
        #   print average voltage: average_voltage_LED +/- err_average_voltage_LED V  average current: average_current_LED +/- err_average_current_LED A
        #
        # turn LED off
        # create csv-file
        # plot average_current_LED vs average_voltage_LED
        ```        
    === "check"
        **Checkpunten**

        - [ ] Alle directe communicatie met de Arduino, firmware-commando's en PyVISA-commando's staan in het bestand {{file}}`arduino_device.py`, de controller.
        - [ ] Runnen van {{file}}`diode_experiment.py` zorgt ervoor dat een meting start.
        - [ ] Er wordt een lijst geprint met beschikbare poorten.
        - [ ] Er wordt een plot getoond van de gemiddelde spanning over en de gemiddelde stroomsterkte door de LED met de bijbehorende onzekerheden.
        - [ ] De gemiddelde spanning over en de gemiddelde stroomsterkte door de LED worden samen met de bijbehorende onzekerheden weggeschreven in een CSV-bestand.
        - [ ] De LED wordt uitgezet na de meting.


        **Projecttraject**

        - [x] Pythondaq: open repository
        - [x] Pythondaq: controller bouwen
        - [x] Pythondaq: controller implementeren
        - [x] Pythondaq: controller afsplitsen
        - [ ] Pythondaq: model en view splitsen

???+ opdracht-meer "`#!py if __name__ == '__main__'`"
    === "opdracht"
        Later wil je de functie `#!py list_resources()` netjes in het hele model-view-controller systeem vlechten zodat je als gebruiker de lijst kunt opvragen, maar voor nu wil je af en toe even zien aan welke poort de Arduino hangt. Wanneer je het script {{file}}`arduino_device.py` runt wordt er een lijst geprint met poorten. Dit gebeurt niet wanneer het bestand {{file}}`diode_experiment.py` wordt gerund. 

        !!! info "Statement onbekend"
            Nog niet bekend met het statement `#!py if __name__ == '__main__'`? Kijk dan voor meer informatie in de [paragraaf modules](vervolg-python.md#modules).

    === "code"
        **Pseudo-code**
        ``` py title="arduino_device.py"
        # def list_resources
        #   ...
        #
        # class ArduinoVISADevice
        #   ...
        #
        # get list resources when arduino_device.py is the main script 
        # doesnot get list resources when arduino_device.py is imported as a module in another script

        ```
        ``` py title="diode_experiment.py"
        from arduino_device import ArduinoVISADevice
        
        # connect to Arduino via class ArduinoVISADevice
        #
        # set output voltage from 0 to max
        #   set number of repeated measurements
        #       measure voltages
        #       calculate voltage LED
        #       calculate current LED
        #   calculate average voltage LED and uncertainty
        #   calculate average current LED and uncertainty
        #   print average voltage: average_voltage_LED +/- err_average_voltage_LED V  average current: average_current_LED +/- err_average_current_LED A
        #
        # turn LED off
        # create csv-file
        # plot average_current_LED vs average_voltage_LED
        ```     
    === "check"
        **Checkpunten**

        - [ ] Er wordt een lijst met beschikbare poorten geprint wanneer {{file}}`arduino_device.py` wordt gerund.
        - [ ] De lijst met beschikbare poorten wordt _niet_ geprint wanneer {{file}}`diode_experiment.py` wordt gerund.

Nu je de _controller_ die de Arduino aanstuurt, hebt gemaakt en afgesplitst, blijft er nog een stuk code over. Het stuk code waar de plot en het CSV-bestand gemaakt worden kun je beschouwen als een _view_ en de rest van de code &mdash; waar de metingen worden uitgevoerd en de spanning $U$ en stroomsterkte $I$ worden berekend &mdash; is een _model_. Je gaat de code nog wat verder opsplitsen om dit duidelijk te maken én de onderdelen van model en view onderbrengen in verschillende bestanden &mdash; dat is uiteindelijk beter voor het overzicht.

!!! opdracht-inlever "Pythondaq: model en view splitsen"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Maak een bestand {{new_file}}`run_experiment.py` aan. Dit bestand fungeert als _view_. In de view staat de code voor het maken van de plot en het genereren van het CSV-bestand. Daarnaast kan de gebruiker in de view een aantal dingen aanpassen, zoals het bereik en het aantal herhaalmetingen. De view importeert wat het nodig heeft uit het _model_, {{file}}`diode_experiment.py`. Het is de bedoeling dat in het model de code voor het uitvoeren van de metingen netjes in een class `#!py DiodeExperiment` zit, dit betekent dat je {{file}}`diode_experiment.py` zult moeten aanpassen. Het kan makkelijk zijn om {{file}}`diode_experiment.py` te kopiëren naar {{file}}`run_experiment.py` en dan in beide bestanden weg te halen wat daar niet hoort. Dat scheelt copy/pasten.
            <br><br> 
            **Bij deze opdracht ga je dingen aanpassen, maar de meeste code heb je al geschreven. Schrijf dus _niet_ allerlei code opnieuw!**
            </br></br>
            Om gegevens naar de Arduino te sturen maakt het model gebruik van de controller. De gegevens die het model terugkrijgt van de Arduino worden volgens de fysische relaties verwerkt tot de benodigde spanningen en stroomsterktes en doorgestuurd naar de view. De resultaten worden in een plot getoond en naar een CSV-bestand weggeschreven. De gebruiker test de door jou geschreven applicatie (view, model, controller) met de volgende handelingen:
            <ul> 
                <li> Het runnen van het bestand {{file}}`run_experiment.py` geeft een lijst van aangesloten instrumenten.</li>
                <li> De gebruiker past in het bestand {{file}}`run_experiment.py` de poortnaam aan naar een poort waarop een Arduino is aangesloten. De instance van de class `#!py DiodeExperiment`, die uit het model wordt geïmporteerd, gebruikt deze poortnaam om de communicatie met de Arduino te openen. </li> 
                <li> De gebruiker roept de method `#!py scan()` aan van de class `#!py DiodeExperiment`, waarna een meting wordt gestart. </li>
                <li> De gebruiker past het bereik van de meting aan door de start- en stopparameters, die aan de method `#!py scan()` worden meegegeven, aan te passen. </li>
                <li> De gebruiker past het aantal herhaalmetingen aan, die ook aan de method `#!py scan()` wordt meegegeven.
            </ul>
            </div>
            <div>
            {{folder}} `ECPC`   
            {{T}} {{github}} `pythondaq`  
            {{tab}} {{T}} {{file}} `arduino_device.py`  
            {{tab}} {{T}} {{file}} `diode_experiment.py`  
            {{tab}} {{T}} {{new_file}} `run_experiment.py`  
            {{tab}} {{L}} {{dots}}  
            {{L}} {{dots}}  
            </div>
        </div>
    
    === "code"
        **Pseudo-code**
        ``` py title="arduino_device.py"
        # def list_resources
        #   ...
        #
        # class ArduinoVISADevice
        #   ...
        ```
        ``` py title="diode_experiment.py"
        from arduino_device import ArduinoVISADevice, list_resources
        
        # class DiodeExperiment
        #   ...
        #   connect to Arduino via class ArduinoVISADevice
        #   ...
        #   def scan with start, stop and repeat
        #       set output voltage from start to stop
        #           set number of repeated measurements
        #               measure voltages
        #               calculate voltage LED
        #               calculate current LED
        #           calculate average voltage LED and uncertainty
        #           calculate average current LED and uncertainty
        #           print average voltage: average_voltage_LED +/- err_average_voltage_LED V  average current: average_current_LED +/- err_average_current_LED A
        #       turn LED off
        #       return average voltage LED, average current LED, error average voltage LED and error average current LED
        ```     
        ``` py title="run_experiment.py"
        from diode_experiment import DiodeExperiment, list_resources
        
        # get list resources
        # connect to Arduino via class DiodeExperiment
        #
        # get average voltage, average current, error average voltage and error average current from method scan(start, stop, repeat)
        #
        # create csv-file
        # plot average_current_LED vs average_voltage_LED
        ```      

    === "check"
        **Checkpunten**

        - [ ] Alle directe communicatie met de Arduino, firmware-commando's en PyVISA-commando's staan in het bestand {{file}}`arduino_device.py`, de controller.
        - [ ] Het model, {{file}}`diode_experiment.py`, communiceert met de controller.
        - [ ] Het model bevat een class `DiodeExperiment`, deze class heeft onder andere een method `scan()`.
        - [ ] De view, {{file}}`run_experiment.py`, communiceert alleen met het model. 
        - [ ] Runnen van {{file}}`run_experiment.py` zorgt ervoor dat een lijst met beschikbare poorten wordt gegeven en een meting wordt gestart.
        - [ ] Er wordt een plot getoond van de gemiddelde spanning over en de gemiddelde stroomsterkte door de LED met de bijbehorende onzekerheden.
        - [ ] De gemiddelde spanning over en de gemiddelde stroomsterkte door de LED worden samen met de bijbehorende onzekerheden weggeschreven in een CSV-bestand.
        - [ ] De LED wordt uitgezet na de meting.
        - [ ] De bestanden bevatten alleen code die echt noodzakelijk is en niet meer dan dat. Dit betekent dat allerlei testcode is verwijderd.


        **Projecttraject**

        - [x] Pythondaq: open repository
        - [x] Pythondaq: controller bouwen
        - [x] Pythondaq: controller implementeren
        - [x] Pythondaq: controller afsplitsen
        - [x] Pythondaq: model en view splitsen

Doordat je de verschillende onderdelen van de MVC in aparte scripts hebt gezet, is het oorspronkelijke script dat je gebruikte voor je meting steeds leger geworden. Als het goed is gaat de view (bijna) alleen maar over het starten van een meting en het weergeven en bewaren van de meetgegevens. In dit script komen verder geen berekeningen voor, deze staan immers beschreven in het model. Ook vind je in de view niets over welke commando's de Arduino firmware begrijpt, want dat staat beschreven in de controller. De splitsing van de code in de MVC-structuur maakt het veel makkelijker om in de vervolghoofdstukken een gebruiksvriendelijke applicatie te ontwikkelen waarmee je snel en eenvoudig metingen kunt doen.

???+ opdracht-meer "User input"
    De gebruiker moet in de view het script aanpassen om bijvoorbeeld een meting met een ander bereik te doen. Maak gebruik van `#!py input()` om bij de gebruiker de start, stop en het aantal herhaalmetingen op te vragen.

???+ opdracht-meer "Error!"
    Als de gebruiker in de {{file}}`run_experiment.py` per ongeluk een negatieve startwaarde of een negatief aantal metingen invult, gaat het niet goed. Gebruik [exceptions](vervolg-python.md#exceptions) om dergelijke gevallen af te vangen en een duidelijke error af te geven. 
