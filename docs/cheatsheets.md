!!! opdracht-basis "Repository toevoegen"
    Maak op de volgende manier een repository voor je Pythonscripts:

    1. Maak &mdash; bijvoorbeeld vanuit Visual Studio Code &mdash; in de map {{folder}}`ECPC` een map {{folder}}`Oefenopdrachten` en zet daarin alle python-bestandjes die je hebt gemaakt om te oefenen zoals de opdrachten [_Pyvisa in pythonscript_](communicatie.md#opd:test_arduino) en [_KnipperLED_](communicatie.md#opd:flashingLED). De mappenstructuur ziet er dan als volgt uit:  
    {{L}} {{folder}} ECPC  
    {{tab}} {{T}} {{folder}} oefenopdrachten  
    {{tab}} {{tab}} {{T}} {{file}} test_arduino.py  
    {{tab}} {{tab}} {{T}} {{file}} flashingLED.py  
    {{tab}} {{tab}} {{L}} &bull;&bull;&bull;  
    {{tab}} {{L}} &bull;&bull;&bull;  
    1. Open GitHub desktop en log in met je GitHub account.
    1. **File > Add Local Repository**. Kies de map {{folder}}`Oefenopdrachten`.
    1. Je kunt de repository niet toevoegen omdat de map weliswaar bestaat, maar nog geen bestaande repository is. Er verschijnt een waarschuwing met een stukje kleine blauwe tekst. Klik op `create a repository`.
    1. Vink `Initialize this repository with a README` aan.
    1. Kies bij `Git ignore` voor <q>Python</q>.[^gitignore]
    1. En bevestig dan met de blauwe knop `Create Repository`.
    1. Als je nu op de history klikt dan zie je dat er een `Initial commit` is met wat `git`-bestanden en de Pythonscripts die je in de map hebt gezet. Vanaf nu staat {{folder}}`Oefenopdrachten` in versiebeheer en houdt Git je wijzigingen bij.

    [^gitignore]: De Git Ignore zorgt ervoor dat allerlei hulpbestanden van Python niet bewaard worden als commit. Alleen je eigen code wordt dan bewaard

    Nu de map {{folder}}`oefenopdrachten` een repository is geworden duiden we het voortaan aan met het {{github}}-symbool. De mappenstructuur is nu dus:  

    {{L}} {{folder}} ECPC  
    {{tab}} {{T}} {{github}} oefenopdrachten  
    {{tab}} {{tab}} {{T}} {{file}} test_arduino.py  
    {{tab}} {{tab}} {{T}} {{file}} flashingLED.py  
    {{tab}} {{tab}} {{L}} &bull;&bull;&bull;  
    {{tab}} {{L}} &bull;&bull;&bull;  

    Het is ook mogelijk om een repository aan te maken via **File > New Repository**. Gebruik dit vóór de start van een project om een nieuwe map te maken met een lege Git repository.

``` py
# get available ports
print(list_devices())  
```