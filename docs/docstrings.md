# Docstrings
Documentatie is vaak een onderschoven kindje, maar is ontzettend belangrijk. Als je zelf informatie opzoekt over bijvoorbeeld een voor jou onbekende Pythonbibliotheek dan vind je het heel fijn als er een duidelijke tutorial is. Als je code schrijft die ook door andere mensen gebruikt moet worden is documentatie nodig. Als de code langer mee moet gaan dan zeg een paar weken, dan helemaal. Want over een paar weken ben jij _zelf_ een ander persoon. Hoe vervelend het ook is, code die je nota bene zelf geschreven hebt is over een paar weken niet meer glashelder. Je zult dan moeten uitzoeken hoe je ook alweer iets hebt gedaan of wat de gedachte erachter was.

Tot nu toe heb je waarschijnlijk gebruik gemaakt van `#!py #stukjes commentaar` om duidelijk te maken wat je code doet. Maar als je de applicatie aan het gebruiken bent en je wilt weten wat een bepaalde functie eigenlijk doet, moet je dus de code induiken op zoek naar de betreffende functie. Met _docstrings_ &mdash; documentatiestrings &mdash; is dat verleden tijd. De documentatie over een functie kan automatisch gegenereerd worden vanuit je code met behulp van de docstring. Docstrings staat tussen 3 dubbele aanhalingstekens en hebben doorgaans een vaste structuur:[^style-guide]

[^style-guide]: Die vaste structuur wordt niet door Python afgedwongen, maar is een goed gebruik. Er worden verschillende stijlen gebruikt. Eén van de meest gebruikte stijlen is door programmeurs van Google bedacht.[@google_style_guide]


<div class="code-box"><button type="button" name="integers_up_to_help" onclick="runScript('integers_up_to_help')" class="run">{{ run }}</button><button type="button" name="integers_up_to_help" onclick="runScript('integers_up_to_help')" class="reload invisible">{{ reload }}</button> integers_up_to.py
``` py
def integers_up_to(number):
    """List integers up to a given number.

    Args:
        number (int): list integers up to this number

    Returns:
        list: containing the integers
    """
    if number > 1:
        return list(range(1, number))
    else:
        return []


help(integers_up_to)
```
<pre>
<code>(ecpc) > python integers_up_to.py
<span class="invisible" name="integers_up_to_help">Help on function integers_up_to in module __main__:
    
integers_up_to(number)
    List integers up to a given number.

    Args:
        number (int): list integers up to this number

    Returns:
        list: containing the integers</span>
</code></pre></div>

De eerste regel geeft een korte samenvatting weer, na de witregel komt een langere samenvatting. Met `Args:` worden alle argumenten opgesomd die aan de functie worden meegegeven en `Returns:` geeft aan wat de functie teruggeeft. We kunnen de documentatie van deze functie opvragen met: `#!py help(integers_up_to)`. Dat geeft resultaat zoals hierboven gegeven (druk op {{ run }}).

Je zult niet altijd de `#!py help()` functie gebruiken misschien, maar gebruik zoveel mogelijk docstrings &mdash; ze helpen ook enorm als je de code leest. Het is extra werk maar het verdient zich dubbel en dwars terug. Je hoeft geen proza te schrijven, maar wees duidelijk. Lees voor meer voorbeelden bijvoorbeeld de _Google Python Style Guide_.[@google_style_guide]


### Docstring generator

Om het gemakkelijker te maken om docstrings ook écht te gaan schrijven, zijn er docstring generators ontwikkeld. Voor Visual Studio Code is er de extensie _autoDocstring - Python Docstring Generator_.[@AutoDocstring]

!!! opdracht-basis "Autodocstring"
    Kijk in Visual Studio Code bij extensions hoe je AutoDocstring kunt gebruiken. Kies daarvoor in de linkerkantlijn het goede icoon voor _extensions_ en selecteer dan de `autoDocstring` extensie. Zoek in de documentatie naar hoe je automatisch (een deel van) de docstring genereert.


Wanneer we voor de functie `#!py integers_up_to()` de docstring generator gebruiken, krijgen we het volgende:
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

Zo kunnen we gemakkelijk alles gaan invullen. Zo lang je niet op ++escape++ drukt maar gewoon je tekst typt kun je met ++tab++ naar het volgende veld en zo de docstring snel invullen. Het is mooi als je daarna onder de _summary_ nog een uitgebreidere uitleg geeft van een paar zinnen. Vergeet ook niet om de docstring zonodig weer bij te werken als je een functie aanpast.

!!! opdracht-inlever "Pythondaq: docstring"
    === "opdracht"
         Alle code van je `pythondaq`applicatie zijn voorzien van docstrings. Je bent aan het werk in je _model_ script en ziet dat er gebruikt wordt gemaakt van een method `#!py get_input_voltage()` die in de _controller_ staat. Je vraagt je ineens af wat deze method ook al weer doet. Voorheen ging je dan naar de controller en scrollde je naar`#!py get_input_voltage()`. Maar tegenwoordig heb je overal docstrings geschreven, je blijft in het model-script, houd je muis bij `#!py get_input_voltage()` en ziet daar je  fantastische omschrijving van de method die in de _controller_ staat! 

    === "code"
        **Pseudo-code**
        ``` py
        # class ArduinoVisaDevice
            """Summary of class here.

            Longer class information...
            Longer class information...
            """
            ...
        ```
        **Testcode:**
        <div class="code-box"><button type="button" name="arduino_device_help" onclick="runScript('arduino_device_help')" class="run">{{ run }}</button><button type="button" name="arduino_device_help" onclick="runScript('arduino_device_help')" class="reload invisible">{{ reload }}</button> arduino_device.py
        ``` py
        if __name__ == "__main__":
            help(ArduinoVisaDevice)
        ```
        <pre>
        <code>(ecpc) > python arduino_device.py
        <span class="invisible" name="arduino_device_help">Help on class ArduinoVisaDevice in module __main__:
        class ArduinoVisaDevice(builtins.object)
        |  Summary of class here.
        |
        |  Longer class information...
        |  Longer class information...
        |
        |  Data descriptors defined here:
        |
        -- More  --</span>
        </code></pre></div>     
        
    === "check"
        **Checkpunten:**

        - [ ] De controller, de model én de view zijn voorzien van docstrings.
        - [ ] Er staan docstrings bij onder andere alle functies, methods en classes.
        - [ ] De docstrings hebben een vaste structuur volgens de _Google Python Style Guide_.[@google_style_guide].
        - [ ] De docstrings zijn volledig.
        - [ ] De docstrings bevat noodzakelijke en nuttige informatie.


        **Projecttraject:**

        - [x] Pythondaq: Docstring


???+ meer-leren "Material for MkDocs"

    ### Documentatie met _Material for MkDocs_

    Een bijkomend voordeel van docstrings is dat ze gebruikt kunnen worden om automatisch documentatie te genereren voor een heel project met behulp van bijvoorbeeld MkDocs of Sphinx.[^sphinx] _MkDocs_ is een documentatie generator en _Material for MkDocs_ is daar de meestgebruikte uitbreiding op. Het wordt veel gebruikt om documentatie te schrijven voor software projecten. Een paar voorbeelden zijn bijvoorbeeld de website van de _Accelerators and Beam Physics Computing_ groep op CERN[@abp-computing] of de nieuwe _Textual_ bibliotheek[@textual] om zogenaamde _terminal user interfaces_ te maken, een tegenhanger van grafische interfaces. Behalve dat je vrij eenvoudig uitgebreide documentatie kunt schrijven kan MkDocs alle docstrings gebruiken om een referentie op te bouwen. De website voor de [ECPC cursus](https://natuurkundepracticumamsterdam.github.io/ecpc/) is ook gebouwd met Material for MkDocs.

    Het voert tijdens deze cursus te ver om veel aandacht te besteden aan MkDocs. Maar aangezien documentatie zo belangrijk is wilden we het toch noemen! Voor een uitgebreide tutorial, zie _Build Your Python Project Documentation With MkDocs_.[@mkdocs-tutorial]

    [^sphinx]: Sphinx is van oudsher de standaard documentatiegenerator voor Pythonprojecten. Maar Sphinx is al redelijk op leeftijd en gebruikt als tekstformaat niet het bekende en zeer populaire _Markdown_ maar het steeds minder populaire _Restructured Text_. MkDocs wordt steeds meer gebruikt en Sphinx steeds minder. Toch zul je Sphinx nog veel tegenkomen bij projecten omdat het na al die jaren zeer veel features heeft en zeer stabiel is.