# Docstrings
Documentatie is vaak een onderschoven kindje, maar is ontzettend belangrijk. Als je zelf informatie opzoekt over bijvoorbeeld een voor jou onbekende Pythonbibliotheek dan vind je het heel fijn als er een duidelijke tutorial is. Als je code schrijft die ook door andere mensen gebruikt moet worden dan is documentatie nodig. Als de code langer mee moet gaan dan zeg een paar weken, dan helemaal. Want over een paar weken ben jij _zelf_ een ander persoon. Hoe vervelend het ook is, code die je nota bene zelf geschreven hebt, is over een paar weken niet meer glashelder. Je zult dan moeten uitzoeken hoe je ook alweer iets hebt gedaan of wat de gedachte erachter was.

Tot nu toe heb je waarschijnlijk gebruikgemaakt van `#!py # stukjes commentaar` om duidelijk te maken wat je code doet. Maar als je de applicatie aan het gebruiken bent en je wilt weten wat een bepaalde functie eigenlijk doet, moet je de code induiken op zoek naar de betreffende functie. Met _docstrings_ &mdash; documentatiestrings &mdash; is dat verleden tijd. De documentatie over een functie kan automatisch gegenereerd worden vanuit je code met behulp van de docstring. 

Docstrings staan tussen drie dubbele aanhalingstekens en hebben doorgaans een vaste structuur:[^style-guide] de eerste regel van de docstring geeft een korte samenvatting, na de witregel komt een langere samenvatting. Je doet dit aan het begin van elke module (Pythonbestand), maar ook bij classes en bij functies.

Bij functies worden met `Args:` alle argumenten opgesomd die aan de functie worden meegegeven. Ook wordt het verwachte _type_ van het argument gegeven: `int`, `str`, `float`, `list`, enz. Dit is handig om te weten! Met `Returns:` geef je aan wat de functie teruggeeft. Je kunt de documentatie opvragen met de `#!py help()`-functie. Zo vraag je bijvoorbeeld de documentatie van onderstaande functie op met `#!py help(integers_up_to)`. Dat geeft het resultaat zoals gegeven (druk op {{ run }}).

[^style-guide]: Die vaste structuur wordt niet door Python afgedwongen, maar is een goed gebruik. Er worden verschillende stijlen gebruikt. Eén van de meest gebruikte stijlen is door programmeurs van Google bedacht.[@google_style_guide]

<div class="code-box"><button type="button" name="integers_up_to_help" onclick="runScript('integers_up_to_help')" class="run">{{ run }}</button><button type="button" name="integers_up_to_help" onclick="runScript('integers_up_to_help')" class="reload invisible">{{ reload }}</button> integers_up_to.py
``` py
"""Helper functions for listing numbers.

This module currently contains a single helper function for listing numbers
up to a given number. This is useful so you don't need to remember how
`range()` works and so you will always get back a list instead of an iterator
object. More functions may be included in the future.

Disclaimer: this is an example. This module is not really that useful and we
recommend to just use `range()` in your code.
"""

def integers_up_to(number):
    """List integers up to a given number.

    Return a list of integers starting from the number one and up to, but not
    including, the supplied number argument. If number is zero or negative, an
    empty list is returned.

    Args:
        number (int): list integers up to this number.

    Returns:
        list: containing the integers.
    """
    if number > 1:
        return list(range(1, number))
    else:
        return []


help(integers_up_to)
```
<pre>
<code>(ECPC) > python integers_up_to.py
<span class="invisible" name="integers_up_to_help">Help on function integers_up_to in module __main__:

integers_up_to(number)
    List integers up to a given number.

    Return a list of integers starting from the number one and up to, but not
    including, the supplied number argument. If number is zero or negative, an
    empty list is returned.

    Args:
        number (int): list integers up to this number.

    Returns:
        list: containing the integers.</span>
</code></pre></div>

Je zult misschien niet altijd de `#!py help()`-functie gebruiken, maar gebruik zoveel mogelijk docstrings &mdash; ze helpen ook enorm als je de code leest. Het is extra werk maar het verdient zich dubbel en dwars terug. Je hoeft geen proza te schrijven, maar wees duidelijk. Lees voor meer voorbeelden en handvaten bijvoorbeeld de _Google Python Style Guide_.[@google_style_guide]


### Docstring generator

Om het gemakkelijker te maken om docstrings ook écht te gaan schrijven, zijn er docstring generators ontwikkeld. Voor Visual Studio Code is er de extensie _autoDocstring - Python Docstring Generator_.[@AutoDocstring]

!!! opdracht-basis-thuis "autodocstring"
    === "opdracht" 
        Kijk in Visual Studio Code bij extensions hoe je de docstring generator _autoDocstring_ kunt gebruiken. Kies daarvoor in de linkerkantlijn het goede icoon voor extensions en selecteer dan de extensie _autoDocstring_. Zoek in de documentatie op hoe je automatisch (een deel van) de docstring kunt genereren.

    === "check"
        **Projecttraject**

        - [x] autodocstring


Wanneer je voor de functie `#!py integers_up_to()` de docstring generator gebruikt, krijg je het volgende:
``` py
def integers_up_to(number):
    """_summary_

    Args:
        number (_type_): _description_

    Returns:
        _type_: _description_
    """
    if number > 1:
        return list(range(1, number))
    else:
        return []
```

Zo kun je gemakkelijk de docstring invullen. Je kunt met ++tab++ naar het volgende veld om de docstring snel in te vullen, zolang je niet op ++escape++ drukt. Het is mooi als je daarna onder de _summary_ nog een uitgebreidere uitleg geeft van een paar zinnen. Vergeet ook niet om de docstring zonodig bij te werken als je een functie aanpast. ![Klik hier](assets/eastereggs/ECPC-silver.svg){: id="easterEggImage" style="width:1.5%" data-message="Pssst als je een variabele selecteert en op 'F2' drukt, kun je de naam van de variabele aanpassen en wordt dit automatisch toegepast op alle plekken waar de variabele voorkomt. Probeer maar eens!"}

!!! opdracht-inlever-thuis "Pythondaq: docstrings"
    === "opdracht"
         Alle code van je `pythondaq`-applicatie voorzie je van docstrings. Je hebt in de _Google Python Style Guide_[@google_style_guide] opgezocht waar je docstrings moet plaatsen. 
         
         Daarna test je het gemak van docstrings uit. Je bent aan het werk in je model (`diode_experiment.py`) en ziet dat er gebruik wordt gemaakt van een method `#!py get_input_voltage()` die in de controller (`arduino_device.py`) staat. Je vraagt je ineens af wat deze method ook al weer doet. Voorheen ging je dan naar de controller en scrolde je naar de method `#!py get_input_voltage()`. Maar tegenwoordig heb je overal docstrings geschreven. Je blijft daarom in het model, je houd je muis bij `#!py get_input_voltage()` en je ziet daar je fantastische omschrijving van de method die in de controller staat! 

    === "code"
        **Pseudo-code**
        ``` py
        # class ArduinoVISADevice
            """Summary of class

            Longer class information...
            Longer class information...
            """
        #   ...
        ```
        **Testcode:**
        <div class="code-box"><button type="button" name="arduino_device_help" onclick="runScript('arduino_device_help')" class="run">{{ run }}</button><button type="button" name="arduino_device_help" onclick="runScript('arduino_device_help')" class="reload invisible">{{ reload }}</button> arduino_device.py
        ``` py
        if __name__ == "__main__":
            help(ArduinoVISADevice)
        ```
        <pre>
        <code>(pythondaq) > python arduino_device.py
        <span class="invisible" name="arduino_device_help">Help on class ArduinoVISADevice in module __main__:
        class ArduinoVISADevice(builtins.object)
        |  Summary of class
        |
        |  Longer class information...
        |  Longer class information...
        |
        |  Data descriptors defined here:
        |
        -- More --</span>
        </code></pre></div>     
        
    === "check"
        **Checkpunten**

        - [ ] De controller, het model én de view zijn voorzien van docstrings.
        - [ ] Er staan docstrings bij onder andere functies, classes en methods.
        - [ ] De docstrings hebben een vaste structuur volgens de _Google Python Style Guide_.[@google_style_guide]
        - [ ] De docstrings zijn volledig.
        - [ ] De docstrings bevatten noodzakelijke en nuttige informatie.


        **Projecttraject**

        - [x] Pythondaq: docstrings
        - [ ] Pythondaq: uv project
        - [ ] Pythondaq: src-layout
        - [ ] Pythondaq: test imports
        - [ ] Pythondaq: applicatie

???+ meer-leren "Type hints"

    Je hebt in bovenstaande voorbeelden gezien dat je het verwachte type van het argument meegeeft in de docstring. Handig: dan weet je dat je in je functie geen `int(number)` hoeft te doen omdat number al een int is, en dan weet je ook dat je dus _niet_ `#!py integers_up_to("10")` kunt doen want `#!py "10"` is een string, geen integer. Maar. Omdat je vrij bent om je docstring te schrijven op de manier zoals je wilt weet je editor dat _niet_. Je hebt vast al gemerkt dat als je aan het typen bent dat Visual Studio Code suggesties doet voor autocompletion. Let op: dit is wat anders dan AI; autocompletion geeft geen hele regels code, maar geeft je een lijstje van mogelijkheden uit je eigen code; zelf denken, maar het scheelt wel typewerk. Als je begint te typen `#!py integ` dan doet Visual Studio Code de suggestie om daar `#!py integers_up_to` van te maken; immers, er is een functie die zo heet. Hetzelfde doet het met methods. Als je een variabele `#!py fruits = ["apple", "pear"]` hebt en je typt `#!py fruits.` dan doet Visual Studio Code al zelf suggesties zoals `#!py .append`, `#!py .copy`, `#!py .count`, etc. Allemaal methods van _list_, omdat Visual Studio Code wéét dat het een list is. Maar dat gaat mis als je argumenten meegeeft aan een functie. Visual Studio Code weet dat de functie een parameter heeft, maar niet wat het type is van de argumenten die je daaraan meegeeft. Maar daar kun je iets aan doen: met _type hints_. Bij type hints geef je het type niet expliciet in de docstring, maar direct bij de parameters. Return values geef je aan met een pijltje. Ons voorbeeld wordt (uitleg volgt):
    ```py
    def integers_up_to(number: int) -> list[int]:
    """List integers up to a given number.

    Return a list of integers starting from the number one and up to, but not
    including, the supplied number argument. If number is zero or negative, an
    empty list is returned.

    Args:
        number: list integers up to this number.

    Returns:
        A list containing the integers.
    """
    if number > 1:
        return list(range(1, number))
    else:
        return []
    ```
    Hier is `number` dus een integer en de return value van de functie is altijd een list van integers. Voordelen: autocomplete, maar ook direct waarschuwingen als je probeert een string en een integer op te tellen bijvoorbeeld. Want Visual Studio Code weet dan al dat dat niet gaat werken, nog voordat je je code runt en een error krijgt. En die errors heb je vast zelf ook al gehad in je code! Type hints worden tegenwoordig veel gebruikt omdat het typewerk scheelt en omdat je waarschuwingen krijgt meteen terwijl je je code intypt en niet pas na een tijdje als je de code uitvoert.

    !!! opdracht-meer "Type hints voor pythondaq"

        1. Lees een [korte tutorial over type hints](https://fastapi.tiangolo.com/python-types/) (van FastAPI, maar de tutorial is algemeen).
        1. Kies **File > Preferences > Settings** of druk op ctrl-, (control-komma).
        1. Type in het zoekvenster: `auto docstring: docstring format` en kies `google-notypes`. Dit zorgt ervoor dat autodocstring niet meteen types in je docstring plaatst; deze komen immers in je functiedefinitie.
        1. Voorzie de code van je pythondaq-project van type hints en haal die weg uit je docstring; daar zijn ze niet meer nodig. Maak je geen zorgen als je in tijdnood komt: je kunt altijd met type hints beginnen en het later uitbreiden en afmaken. Het hoeft niet in één keer af. Begin bij de 'onderste' laag: de controller, en werk dan verder 'omhoog'.

???+ meer-leren "Material for MkDocs"

    ### Documentatie met _Material for MkDocs_

    Een bijkomend voordeel van docstrings is dat ze gebruikt kunnen worden om automatisch documentatie te genereren voor een heel project met behulp van bijvoorbeeld MkDocs of Sphinx.[^sphinx] _MkDocs_ is een documentatiegenerator en _Material for MkDocs_ is daar de meestgebruikte uitbreiding op. Het wordt veel gebruikt om documentatie te schrijven voor softwareprojecten. Een paar voorbeelden zijn de website van de _Accelerators and Beam Physics Computing_ groep op CERN[@abp-computing] en de nieuwe _Textual_-bibliotheek[@textual] om zogenaamde _text-based user interfaces_ te maken, een tegenhanger van grafische interfaces. Behalve dat je vrij eenvoudig uitgebreide documentatie kunt schrijven, kan MkDocs alle docstrings gebruiken om een referentie op te bouwen. De website voor de [ECPC cursus](https://natuurkundepracticumamsterdam.github.io/ecpc/) is ook gebouwd met _Material for MkDocs_.

    Het voert tijdens deze cursus te ver om veel aandacht te besteden aan MkDocs. Maar aangezien documentatie zo belangrijk is, wilden we het toch noemen! Voor een uitgebreide tutorial zie _Build Your Python Project Documentation With MkDocs_.[@mkdocs-tutorial]

    [^sphinx]: Sphinx is van oudsher de standaard documentatiegenerator voor Pythonprojecten. Maar Sphinx is al redelijk op leeftijd en gebruikt als tekstformaat niet het bekende en zeer populaire _Markdown_ maar het steeds minder populaire _Restructured Text_. MkDocs wordt steeds meer gebruikt en Sphinx steeds minder. Toch zul je Sphinx nog veel tegenkomen bij projecten omdat het na al die jaren zeer veel features heeft en zeer stabiel is.
