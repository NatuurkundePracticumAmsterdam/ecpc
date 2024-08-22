# Docstrings
Documentatie is vaak een onderschoven kindje, maar is ontzettend belangrijk. Als je zelf informatie opzoekt over bijvoorbeeld een voor jou onbekende Pythonbibliotheek dan vind je het heel fijn als er een duidelijke tutorial is. Als je code schrijft die ook door andere mensen gebruikt moet worden is documentatie nodig. Als de code langer mee moet gaan dan zeg een paar weken, dan helemaal. Want over een paar weken ben jij _zelf_ een ander persoon. Hoe vervelend het ook is, code die je nota bene zelf geschreven hebt is over een paar weken niet meer glashelder. Je zult dan moeten uitzoeken hoe je ook alweer iets hebt gedaan of wat de gedachte erachter was.

Tot nu toe heb je waarschijnlijk gebruik gemaakt van `#!py #stukjes commentaar` om duidelijk te maken wat je code doet. Maar als je de applicatie aan het gebruiken bent en je wilt weten wat een bepaalde functie eigenlijk doet, moet je dus de code induiken op zoek naar de betreffende functie. Met _docstrings_ &mdash; documentatiestrings &mdash; is dat verleden tijd. De documentatie over een functie kan automatisch gegenereerd worden vanuit je code met behulp van de docstring. Docstrings staat tussen 3 dubbele aanhalingstekens en hebben doorgaans een vaste structuur:[^style-guide]

[^style-guide]: Die vaste structuur wordt niet door Python afgedwongen, maar is een goed gebruik. Er worden verschillende stijlen gebruikt. Eén van de meest gebruikte stijlen is door programmeurs van Google bedacht.[@google_style_guide]

``` py title="integers_up_to.py"
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
De eerste regel geeft een korte samenvatting weer, na de witregel komt een langere samenvatting. Met `Args:` worden alle argumenten opgesomd die aan de functie worden meegegeven en `Returns:` geeft aan wat de functie teruggeeft. We kunnen de documentatie van deze functie opvragen met: `#!py help(integers_up_to)`. Dat geeft het volgende resultaat:
``` ps1con title="Terminal"
PS> python integers_up_to.py 
    Help on function integers_up_to in module __main__:
    
    integers_up_to(number)
        List integers up to a given number.
    
        Args:
            number (int): list integers up to this number
    
        Returns:
            list: containing the integers
```
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

    1. Pak de `pythondaq` applicatie erbij. Zet bij _alle_ functies een nuttige docstring.
    1. Schrijf ook docstrings voor de classes die je gemaakt hebt.
    1. Ga naar je _model_ en houd je muis bij `#!py set_output_voltage()` en zie daar verschijnt jouw fantastische omschrijving van de method die in de _controller_ staat!


???+ meer-leren "Material for MkDocs"

    ### Documentatie met _Material for MkDocs_

    Een bijkomend voordeel van docstrings is dat ze gebruikt kunnen worden om automatisch documentatie te genereren voor een heel project met behulp van bijvoorbeeld MkDocs of Sphinx.[^sphinx] _MkDocs_ is een documentatie generator en _Material for MkDocs_ is daar de meestgebruikte uitbreiding op. Het wordt veel gebruikt om documentatie te schrijven voor software projecten. Een paar voorbeelden zijn bijvoorbeeld de website van de _Accelerators and Beam Physics Computing_ groep op CERN[@abp-computing] of de nieuwe _Textual_ bibliotheek[@textual] om zogenaamde _terminal user interfaces_ te maken, een tegenhanger van grafische interfaces. Behalve dat je vrij eenvoudig uitgebreide documentatie kunt schrijven kan MkDocs alle docstrings gebruiken om een referentie op te bouwen. De website voor de [ECPC cursus](https://natuurkundepracticumamsterdam.github.io/ecpc/) is ook gebouwd met Material for MkDocs.

    Het voert tijdens deze cursus te ver om veel aandacht te besteden aan MkDocs. Maar aangezien documentatie zo belangrijk is wilden we het toch noemen! Voor een uitgebreide tutorial, zie _Build Your Python Project Documentation With MkDocs_.[@mkdocs-tutorial]

    [^sphinx]: Sphinx is van oudsher de standaard documentatiegenerator voor Pythonprojecten. Maar Sphinx is al redelijk op leeftijd en gebruikt als tekstformaat niet het bekende en zeer populaire _Markdown_ maar het steeds minder populaire _Restructured Text_. MkDocs wordt steeds meer gebruikt en Sphinx steeds minder. Toch zul je Sphinx nog veel tegenkomen bij projecten omdat het na al die jaren zeer veel features heeft en zeer stabiel is.