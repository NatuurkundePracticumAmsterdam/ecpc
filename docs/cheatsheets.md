??? conda "Conda"
    ??? conda1 "environment aanmaken"
        ```
        conda create --name NAME PACKAGES
        ```
    ??? conda1 "environment activeren"
        ```
        conda activate NAME
        ```
    ??? conda1 "pakket installeren"
        ```
        (NAME) > conda install PACKAGE
        ```

??? github "GitHub"
    ??? github1 "Lege repository aanmaken"
        1. GitHub Desktop: **File > New repository**
        1. Kies `NAME` en locatie (let op! de project map mag _niet_ in een andere repository staan!)
        1. Vink `Initialize this repository with a README` aan
        1. `Git ignore`: "Python"
        1. GitHub Desktop: **Repository > Open in Visual Studio Code**
    
    ??? github1 "Van bestaande map repository maken"
        1. GitHub Desktop: **File > Add repository**
        1. Kies locatie van {{folder}}`projectmap` (let op! de project map mag _niet_ in een andere repository staan!)
        1. Druk op de blauwe tekst `Create repository`.
        1. Vink `Initialize this repository with a README` aan.
        1. Kies bij `Git ignore` voor "Python".
        1. Bevestig met de blauwe knop `Create Repository`.
        1. Ga naar **Repository > Open in Visual Studio Code** (of druk op ++ctrl+shift+a++ ) en ga aan de slag.

??? poetry "Poetry"
    ??? poetry1 "Nieuw Poetry project aanmaken"
        ```
        poetry new --src NAME
        ```
    ??? poetry1 "Poetry toevoegen aan bestaand project"
        ```
        poetry init --no-interaction
        ```
    ??? poetry1 "Poetry project installeren"
        ```
        poetry install
        ```
    ??? poetry1 "Dependencies toevoegen"
        ```
        poetry add PACKAGE
        ```
    ??? poetry1 "Dependencies verwijderen"
        ```
        poetry remove PACKAGE
        ```
    ??? poetry1 "commando toevoegen"
        1.  Voeg in je {{file_lines}}`pyproject.toml` een extra kopje toe:
        ``` toml
        [tool.poetry.scripts]
        naam_commando = "package.module:naam_functie"
        ```