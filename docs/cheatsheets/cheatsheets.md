??? info "Conda"
    ??? info "environment aanmaken"
        ```
        conda create -n NAME PACKAGES
        ```
    ??? info "environment activeren"
        ```
        conda activate NAME
        ```
    ??? info "pakket installeren"
        ```
        (NAME) > conda install PACKAGE
        ```

??? info "GitHub"
    ??? info "Lege repository aanmaken"
        1. GitHub Desktop: **File > New repository**
        1. Kies `NAME` en locatie (let op! de project map mag _niet_ in een andere repository staan!)
        1. Vink `Initialize this repository with a README` aan
        1. `Git ignore`: "Python"
        1. GitHub Desktop: **Repository > Open in Visual Studio Code**
    
    ??? info "Van bestaande map repository maken"
        1. GitHub Desktop: **File > Add repository**
        1. Kies locatie van {{folder}}`projectmap` (let op! de project map mag _niet_ in een andere repository staan!)
        1. Druk op de blauwe tekst `Create repository`.
        1. Vink `Initialize this repository with a README` aan.
        1. Kies bij `Git ignore` voor "Python".
        1. Bevestig met de blauwe knop `Create Repository`.
        1. Ga naar **Repository > Open in Visual Studio Code** (of druk op ++ctrl+shift+a++ ) en ga aan de slag.

??? info "Poetry"
    ??? info "Nieuw Poetry project aanmaken"
        ```
        poetry new --src NAME
        ```
    ??? info "Poetry toevoegen aan bestaand project"
        ```
        poetry init --no-interaction
        ```
    ??? info "Poetry project installeren"
        ```
        poetry install
        ```
    ??? info "Dependencies toevoegen"
        ```
        poetry add PACKAGE
        ```
    ??? info "Dependencies verwijderen"
        ```
        poetry remove PACKAGE
        ```
    ??? info "commando toevoegen"
        1.  Voeg in je {{file_lines}}`pyproject.toml` een extra kopje toe:
        ``` toml
        [tool.poetry.scripts]
        naam_commando = "package.module:naam_functie"
        ```