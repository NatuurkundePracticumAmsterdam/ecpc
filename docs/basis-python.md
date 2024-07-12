# Basiskennis Python

Bij de cursus inleiding programmeren heb je de basis van het programmeren in Python geleerd. Bij inleiding programmeren mocht je kiezen om je code in het Nederlands of Engels te schrijven. Omdat wij jullie voorbereiden om in een onderzoeksgroep je bachelor project te gaan doen waar je hoogstwaarschijnlijk internationale collega's gaat treffen vragen we jou om bij ECPC alles in het Engels te schrijven. In deze paragraaf nemen we de hoofdlijnen van inleiding programmeren met je door in een aantal opdrachten. 

## Visual Studio Code
!!! opdracht-basis "Open VSCode en maak de map ECPC"
    1. Open Visual Studio Code.
    1. Ga naar **File > Open folder**.
    1. Navigeer naar een geschikte map, bijvoorbeeld OneDrive.
    1. Klik op **Nieuwe map** en noem de map ECPC.
    1. Klik op **Map selecteren**.

## F-strings, variabelen en input()

!!! opdracht-basis "f-strings, variabelen en input"
    1. Maak een bestand {{file}}`diameter.py` in de map {{folder}}`ECPC`.
    1. Maak een bestand <span style="color: green;">{{file}}</span>`diameter.py` in de map <span style="color: green;">{{folder}}</span>`ECPC`.
    1. Maak een bestand <span style="color: green;">:fontawesome-solid-file-code:</span>`diameter.py` in de map <span style="color: green;">:fontawesome-solid-folder:</span>`ECPC`.
    1. Schrijf een stuk code waarin je de gebruiker vraagt wat de diameter van de bal is. 
    1. Bereken de radius van de bal.
    1. Print de diameter en radius in een zin en maak gebruik van f-string. Bijvoorbeeld: "A ball with a diameter of 2.8 m has a radius of 1.4 m."
    1. Test je script met het getal 2.8.
    
    ??? uitwerkingen
        ``` py
        --8<-- "uitwerkingen-on/f-strings-on.py"
        ```

## If-statement en operatoren


!!! opdracht-basis "if-statement en operatoren"
    Met een `#!py if`-statement kan je een conditie testen door operatoren te gebruiken. 

    1. Schrijf de operatoren op voor:
        * gelijk aan
        * ongelijk aan
        * groter dan
        * groter of gelijk aan
        * kleiner dan
        * kleiner dan of gelijk aan
    1. Vul op de `#!py ...` de juiste condities in door gebruik te maken van `#!py and`, `#!py not` en `#!py or`.
    ``` py
    import random

    rain = random.choice([True, False])
    umbrella = random.choice([True, False])

    print(f"{rain=}, {umbrella=}")

    if ... :
        print("Lucky you have your umbrella with you since it's raining.")

    if ... :
        if ... :
            print("You will get wet without an umbrella since it's raining.")
        if ... :
            print("you can use your umbrella as a walking stick since it doesn't rain")

    if ... :
        print("Without an umbrella there is no problem since it's not raining.")
    ```
    ??? uitwerkingen
        ``` py 
        --8<-- "uitwerkingen-on/if-statements-on.py"
        ```

## For-loop, while-loop en break

!!! opdracht-basis "For-loop, while-loop en break"
    1. Beschouw de volgende code:
    ``` py
    voltage = 0  # mV
    steps = 50  # mV
    while voltage < 3300:
        voltage += steps
    ```
    
    Bij het programmeren krijg je vaak errors. Bij het debuggen van een loop zijn twee dingen heel handig `#!py print` en `#!py break`.

    1. Gebruik `#!py print` om het voltage te printen in the while-loop, doe dit handig met f-strings zodat je weet wat je je print bijvoorbeeld: "The voltage is set to 0 mV."
    1. Gebruik dan `#!py break` om de loop maar een keer te laten lopen. 
    1. Schrijf de code om waarbij je gebruikt maakt van een `#!py for`-loop. 

    ??? uitwerkingen
        ``` py title="print and break"
        --8<-- "uitwerkingen-on/break-on.py"
        ```
        ``` py title="for-loop"
        --8<-- "uitwerkingen-on/for-loop-on.py"
        ```
        
## Functie

!!! opdracht-basis "functies"
    1. Maak uit de onderstaande code de functie _exponentiation_ werkend. 
    ``` py
    def exponentiation():
        solution =
        ...


    number_1 = 2
    number_2 = 8

    answer = exponentiation(number_1, number_2)
    print(f"{number_1}^{number_2} = {answer}")
    ```

    1. In deze opdracht zijn 4 variabele `#!py solution`, `#!py number_1`, `#!py number_2` en `#!py answer`. Welk van deze variabele zijn globaal en welke zijn lokaal?
    1. Leg uit wat daarvan de consequentie is voor het gebruiken van deze variabelen.
    ??? uitwerkingen
        1. 
        ``` py
        --8<-- "uitwerkingen-on/function-on.py"
        ```
        
        2. De globale variabelen zijn `#!py number_1`, `#!py number_2` en `#!py answer` en de lokale variabele is `#!py solution`.
        
        3. Het gevolg is dat `#!py number_1`, `#!py number_2` en `#!py answer` wel binnen de functie `#!py exponentiation()` gebruikt kunnen worden, maar `#!py solution` niet buiten de functie `#!py exponentiation()` gebruikt kan worden. 

## List

!!! opdracht-basis "lijsten"
    1. Schrijf een python script waarin je een lijst definieerd met de namen van de maanden.
    1. Print de negende maand.
    1. Voeg een dertiende maand toe aan de lijst.
    ??? uitwerkingen
        ``` py
        --8<-- "uitwerkingen-on/lists-on.py"
        ```

## Stijl

Bij inleiding programmeren heb je ook geleerd hoe je code netjes opschrijft zodat het leesbaar en begrijpelijk is. Hieronder vind je een samenvatting, die een beetje aangevuld is met ECPC stijl.

- Schrijf code in het Engels.
- `#!py def functie_namen_met_doel():` Namen van functies mogen lang zijn, maar geven duidelijk weer wat de functie doet.
- `#!py korte_variabele = 28` de namen van variabele houd je kort en duidelijk. Gebruik alleen afkortingen waarneer deze door veel mensen gekend zijn.
- Je hoeft de code niet met de hand over te schrijven dus gebruik liever meer regels dan een hele lange regel waar meer dan 1 ding gebeurd.
- Gebruik `#!py #commentaar-kopjes` om een stukje code samen te vatten, een waarschuwing te geven, uitleg van complexe algoritmen te doen, voor bronvermelding, uitleg van een variabele te geven en zet dit altijd boven het stukje code waar het omgaat. 
- Spring in waar nodig, gebruik witregels, zet spaties rondom operatoren.

## Modules

Ook heb je geleerd om functies uit andere (python) modules te importeren, meer hierover vind je in de [paragraaf _Modules_](vervolg-python.md#modules). 

## Plotten

!!! opdracht-basis "Grafieken"
    Gebruik matplotlib om een scatterplot te maken van twee lijsten die hieronder zijn weergegeven. Zet de grootheden en eenheden bij beide assen en sla het figuur op als .png-bestand.
    ``` py 
    time = [0, 0.5, 1, 1.5, 2, 2.5, 3] #seconds
    distance = [0, 15, 50, 100, 200, 300, 400] #meters
    ```
    ??? uitwerkingen
        ``` py
        --8<-- "uitwerkingen-on/plot-on.py"
        ```

## Bestanden inlezen

!!! opdracht-basis "txt-bestanden lezen"
    Hieronder vind je een verhaal, kopieer de inhoud naar een .txt-bestand en sla deze op een handige plek op.
    ```
    "Do you have a favourite
    saying?" asked the boy.
    "Yes" said the mole
    "What is it?"
    "If at first you don't 
    succeed have some cake."
    "I see, does it work?"
    "Every time."
    From: The Boy, the mole, the fox and the Horse - Charlie Mackesy
    ```

    Schrijf een script om het .txt-bestand te lezen en regel voor regel te printen.
    ??? uitwerkingen
        ``` py
        --8<-- "uitwerkingen-on/read-txt-on.py"
        ```