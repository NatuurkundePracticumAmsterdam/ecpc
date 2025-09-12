# Basiskennis Python

Bij de cursus Inleiding programmeren heb je de basis van het programmeren in Python geleerd. In dit hoofdstuk neem je de hoofdlijnen van deze cursus door aan de hand van een aantal opdrachten. 

## Visual Studio Code
!!! opdracht-basis-thuis "Map aanmaken en openen in Visual Studio Code"
    1. Open Visual Studio Code.
    1. Ga naar **File > Open folder**.
    2. Navigeer naar een geschikte map.
    3. Klik op **Nieuwe map** en geef de map de naam ECPC.
    4. Klik op **Map selecteren**.

## Variabelen, `#!py input()`-functie en f-strings

!!! opdracht-basis-thuis "Variabelen, `#!py input()`-functie en f-strings"
    1. Maak een bestand {{new_file}}`diameter-ball.py` in de map {{folder}}`ECPC`.  
    {{folder}} `ECPC`  
    {{L}} {{new_file}} `diameter-ball.py`  
    2. Schrijf een stuk code waarin je de gebruiker vraagt wat de diameter van de bal is. Maak hierbij gebruik van de `#!py input()`-functie. 
    3. Bereken daarna de straal van de bal.
    4. Print de diameter en straal van de bal in een zin. Maak hiervoor gebruik van f-strings. Bijvoorbeeld: "A ball with a diameter of 2.8 m has a radius of 1.4 m."
    5. Test je script met het getal 2.8.
    
    ??? uitwerkingen
        ``` py
        --8<-- "uitwerkingen-on/f-strings-on.py"
        ```

## If-statements en operatoren

!!! opdracht-basis-thuis "if-statements en operatoren"
    Met een if-statement kun je een conditie testen door operatoren te gebruiken. 

    1. Schrijf de operatoren op voor:
        * gelijk aan
        * ongelijk aan
        * groter dan
        * groter of gelijk aan
        * kleiner dan
        * kleiner dan of gelijk aan
    2. Vul in onderstaand script de juiste condities in op de `#!py ...`. Maak gebruik van de variabelen `#!py rain` en `#!py umbrella` én de operatoren `#!py and`, `#!py not` en `#!py or`.
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
            print("You can use your umbrella as a walking stick since it doesn't rain.")

    if ... :
        print("Without an umbrella there is no problem since it's not raining.")
    ```
    ??? uitwerkingen
        ``` py 
        --8<-- "uitwerkingen-on/if-statements-on.py"
        ```

## For-loop, while-loop en break

Bij het programmeren heb je vaak te maken met foutmeldingen. Bij het debuggen van een loop zijn twee dingen heel handig: `#!py print` en `#!py break`.

!!! opdracht-basis-thuis "For-loop, while-loop en break"
    Beschouw het volgende stuk code:
    ``` py
    voltage = 0  # mV
    steps = 50  # mV
    while voltage < 3300:
        voltage += steps
    ```
    
    1. Gebruik `#!py print` om het voltage te printen in de while-loop. Doe dit handig met f-strings, zodat je weet wat je print. Bijvoorbeeld: "The voltage is set to 0 mV."
    2. Gebruik daarna `#!py break` om de loop maar één keer te doorlopen. 
    3. Schrijf nu de code om. Vervang de `#!py while`-loop voor een `#!py for`-loop. 

    ??? uitwerkingen
        <div class="code-box"><button type="button" name="print_and_break.py" onclick="runScript('print_and_break.py')" class="run">{{ run }}</button><button type="button" name="print_and_break.py" onclick="runScript('print_and_break.py')" class="reload invisible">{{ reload }}</button> print_and_break.py
        ``` py
        --8<-- "uitwerkingen-on/break-on.py"
        ```
        <pre>
        <code>(ECPC) > python print_and_break.py
        <span class="invisible" name="print_and_break.py">The voltage is set to 50 mV.</span>
        </code></pre></div>

        <div class="code-box"><button type="button" name="for_loop.py" onclick="runScript('for_loop.py')" class="run">{{ run }}</button><button type="button" name="for_loop.py" onclick="runScript('for_loop.py')" class="reload invisible">{{ reload }}</button> for_loop.py
        ``` py
        --8<-- "uitwerkingen-on/for-loop-on.py"
        ```
        <pre>
        <code>(ECPC) > python for_loop.py
        <span class="invisible" name="for_loop.py">The voltage is set to 0 mV.
        The voltage is set to 50 mV.
        The voltage is set to 100 mV.
        The voltage is set to 150 mV.
        ...</span>
        </code></pre></div>
        
        
## Functies

!!! opdracht-basis-thuis "Functies"
    1. Zorg dat in onderstaande code de functie `exponentiation` gaat werken.
    ``` py
    def exponentiation():
        solution =
        ...


    number_1 = 2
    number_2 = 8

    answer = exponentiation(number_1, number_2)
    print(f"{number_1}^{number_2} = {answer}")
    ```

    2. In bovenstaande code zijn vier variabelen gedefinieerd: `#!py solution`, `#!py number_1`, `#!py number_2` en `#!py answer`. Welk van deze variabelen zijn globaal en welke zijn lokaal? Leg uit wat de consequentie is voor het gebruiken van globaal en lokaal gedefinieerde variabelen.
    ??? uitwerkingen
        1. 
        ``` py
        --8<-- "uitwerkingen-on/function-on.py"
        ```
        
        2. De globale variabelen zijn `#!py number_1`, `#!py number_2` en `#!py answer` en de lokale variabele is `#!py solution`. Het gevolg is dat `#!py number_1`, `#!py number_2` en `#!py answer` zowel buiten als binnen de functie `#!py exponentiation()` gebruikt kunnen worden, terwijl `#!py solution` alleen maar binnen de functie `#!py exponentiation()` gebruikt kan worden. 

## Lijsten

!!! opdracht-basis-thuis "Lijsten"
    1. Schrijf een Python script waarin je een lijst definieert met de namen van de maanden.
    1. Print de negende maand.
    1. Voeg een dertiende maand toe aan de lijst. Controleer daarna of dit gelukt is.
    ??? uitwerkingen
        <div class="code-box"><button type="button" name="lijsten.py" onclick="runScript('lijsten.py')" class="run">{{ run }}</button><button type="button" name="lijsten.py" onclick="runScript('lijsten.py')" class="reload invisible">{{ reload }}</button> lijsten.py
        ``` py
        --8<-- "uitwerkingen-on/lists-on.py"
        ```
        <pre>
        <code>(ECPC) > python lijsten.py
        <span class="invisible" name="lijsten.py">The ninth month is called September.
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'trēdecimber']</span>
        </code></pre></div>

## Stijl

Bij inleiding programmeren heb je geleerd hoe je code netjes opschrijft, zodat de code leesbaar en begrijpelijk is. Hieronder vind je een samenvatting, die een beetje aangevuld is met ECPC-stijl.

- Schrijf code in het Engels.
- De naam van een variabele houd je kort en duidelijk. Gebruik alleen afkortingen wanneer deze bij veel mensen bekend is. Dus: `#!py korte_variabelenaam = 28`
- Namen van functies geven duidelijk weer wat de functie doet, deze namen mogen lang zijn. Dus: `#!py def functienamen_met_doel():`
- Je hoeft code niet met de hand over te schrijven. Leesbaarheid gaat daarom boven beknoptheid. Gebruik meerdere regels code als je meerdere stappen zet, in plaats van een heel lange regel code waar meer dan één ding gebeurt.
- Gebruik `#!py #commentaar`-kopjes om een stukje code samen te vatten, een waarschuwing te geven, uitleg van complexe algoritmen te doen, uitleg van een variabele te geven, voor bronvermelding, enzovoorts. Zet het commentaar altijd boven het stukje code waar het over gaat. 
- Zorg ook voor een nette opmaak. Spring in waar nodig, gebruik witregels en zet spaties rondom operatoren.[^formatter]

[^formatter]: Er zijn pakketten beschikbaar die je code automatisch aanpassen aan een standaard opmaak, je hoeft bijna niet meer na te denken over de vormgeving van de code. Ruff[^ruff] is zo'n formatter. Je kunt van Ruff gebruikmaken door in Visual Studio Code de _Ruff_-extensie van Astral Software te installeren. Ga daarna in Visual Studio Code naar **Settings** en type in het zoekvenster **format on save**. Vink de instelling _Editor: Format On Save_ aan. Type daarna in het zoekvenster **default formatter** en kies voor de formatter _Ruff_.

[^ruff]: Ruff. URL: <https://docs.astral.sh/ruff/>. 

## Modules

Ook heb je al geleerd om functies uit andere (Python) modules te importeren. Meer hierover vind je in de [paragraaf _Modules_](vervolg-python.md#modules). Maak uit deze paragraaf de bijbehorende opdrachten om te oefenen met het gebruik van modules.

## Plotten

!!! opdracht-basis-thuis "Grafieken"
    Gebruik `#!py matplotlib` om een scatterplot te maken van de twee lijsten die hieronder zijn weergegeven. Zet de grootheden en eenheden bij beide assen en sla het figuur op als PNG-bestand.
    ``` py 
    time = [0, 0.5, 1, 1.5, 2, 2.5, 3]  # seconds
    distance = [0, 15, 50, 100, 200, 300, 400]  # meters
    ```
    ??? uitwerkingen
        ``` py
        --8<-- "uitwerkingen-on/plot-on.py"
        ```

## Bestanden inlezen

!!! opdracht-basis-thuis "Tekstbestanden lezen"
    Hieronder vind je een kort verhaal. Kopieer de inhoud van dit verhaal naar een tekstbestand &mdash; een .txt-bestand &mdash; en sla dit bestand op in de map {{folder}}`ECPC`. Schrijf daarna een script om het tekstbestand te lezen en regel voor regel te printen.
    ```
    "Do you have a favourite
    saying?" asked the boy.
    "Yes" said the mole.
    "What is it?"
    "If at first you don't 
    succeed have some cake."
    "I see, does it work?"
    "Every time."
    From: The boy, the mole, the fox and the horse - Charlie Mackesy
    ```
    
    ??? uitwerkingen
        <div class="code-box"><button type="button" name="txt_bestanden_lezen.py" onclick="runScript('txt_bestanden_lezen.py')" class="run">{{ run }}</button><button type="button" name="txt_bestanden_lezen.py" onclick="runScript('txt_bestanden_lezen.py')" class="reload invisible">{{ reload }}</button> txt_bestanden_lezen.py
        ``` py
        --8<-- "uitwerkingen-on/read-txt-on.py"
        ```
        <pre>
        <code>(ECPC) > python txt_bestanden_lezen.py
        <span class="invisible" name="txt_bestanden_lezen.py">"Do you have a favourite
        saying?" asked the boy.
        "Yes" said the mole.
        "What is it?"
        "If at first you don't 
        succeed have some cake."
        "I see, does it work?"
        "Every time."
        From: The boy, the mole, the fox and the horse - Charlie Mackesy</span>
        </code></pre></div>