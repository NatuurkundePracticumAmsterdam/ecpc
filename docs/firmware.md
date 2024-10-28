<div id="ch:firmware"></div>
# Firmware

De firmware bestaat uit een gedeeltelijke implementatie van het VISA-protocol.[@VISA] Het voornaamste verschil bestaat uit het feit dat VISA voor ieder commando zowel een korte als een lange versie heeft. Zo zou je in de documentatie van een instrument het commando `MEASure` kunnen vinden. Je kunt dan zowel `MEAS` als `MEASURE` gebruiken om het commando te geven. In deze implementatie is het slechts mogelijk om de korte vorm te gebruiken.

De nummering van de kanalen volgt de nummering van de Arduino hardware. Dus kanaal 0 is pin A0 op de Arduino, kanaal 1 is pin A1, enz. De digitale resolutie is ingesteld op 10 bits ($2^{10}$~stappen, ofwel waardes tussen 0 en 1023) en het analoge bereik is 0 V tot 3.3 V.

Bij het versturen van opdrachten naar het apparaat, moet je afsluiten met een linefeed ('\n'). Het apparaat sluit zijn antwoorden af met een carriage return gevolgd door een linefeed ('\r\n').

De code is terug te vinden in de repository {{github}}`/davidfokkema/arduino-visa-firmware`.[@arduino_visa_firmware] Deze documentatie is voor versie~1.0.0. De commando's die geaccepteerd worden door de firmware zijn weergegeven in de tabel hieronder.

<div id="tab:firmware"></div>
|  Commando            |  Beschrijving                                                                                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `*IDN?`              | Geeft de identificatiestring van de firmware.                                                                                                                                          |
| <div style="white-space: nowrap">`OUT:CH<ch> <value>`</div> | Zet een specifieke spanning `<value>` op uitvoerkanaal `<ch>`. Waardes mogen liggen tussen 0 (minimale spanning) en 1023 (maximale spanning). __Voorbeeld:__ `OUT:CH0 1023` |
| `OUT:CH<ch>?`        | Geef de huidige instelling voor de spanning terug op uitvoerkanaal `<ch>` in het bereik 0 tot 1023. __Voorbeeld:__ `OUT:CH0?`                                               |
| `MEAS:CH<ch>?`       | Meet de spanning op invoerkanaal `<ch>` in het bereik 0 tot 1023. __Voorbeeld:__ `MEAS:CH1?`                                                                                |
