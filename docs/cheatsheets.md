??? github "GitHub"
    ??? github1 "Lege repository aanmaken"
        1. GitHub Desktop: **File > New repository**
        2. Kies `NAME` en locatie (let op! de project map mag _niet_ in een andere repository staan!)
        3. Vink `Initialize this repository with a README` aan
        4. `Git ignore`: "Python"
        5. GitHub Desktop: **Repository > Open in Visual Studio Code**
    
    ??? github1 "Van bestaande map repository maken"
        6. GitHub Desktop: **File > Add repository**
        7. Kies locatie van {{folder}}`projectmap` (let op! de project map mag _niet_ in een andere repository staan!)
        8. Druk op de blauwe tekst `Create repository`.
        9. Vink `Initialize this repository with a README` aan.
        10. Kies bij `Git ignore` voor "Python".
        11. Bevestig met de blauwe knop `Create Repository`.
        12. Ga naar **Repository > Open in Visual Studio Code** (of druk op ++ctrl+shift+a++ ) en ga aan de slag.

??? conda "Virtual environments"
    ??? conda1 "Environment aanmaken"
        ```
        uv venv --python PYTHONVERSION
        ```
    ??? conda1 "Environment activeren"
        ```
        .venv\Scripts\activate
        ```
    ??? conda1 "Environment deactiveren"
        ```
        deactivate
        ```
    ??? conda1 "Pakket installeren"
        ```
        uv pip install PACKAGE
        ```
    ??? conda1 "Commando runnen zonder activeren"
        ```
        uv run COMMAND
        ```
    ??? conda1 "Commando runnen zonder virtual environment en zonder installeren (ingekort)"
        ```
        uvx COMMAND
        ```
        NB: Dit werkt alleen als het Python package en het commando dezelfde naam hebben.
    ??? conda1 "Commando runnen zonder virtual environment en zonder installeren (volledig)"
        ```
        uvx --from PACKAGE --with EXTRAPACKAGE COMMAND
        ```


??? poetry "Projectbeheer"
    ??? poetry1 "Nieuw uv project aanmaken (in bestaande map)"
        ```
        uv init --package
        ```
    ??? poetry1 "Environment synchroniseren"
        ```
        uv sync
        ```
    ??? poetry1 "Dependencies toevoegen"
        ```
        uv add PACKAGE
        ```
    ??? poetry1 "Dependencies verwijderen"
        ```
        uv remove PACKAGE
        ```
    ??? poetry1 "Commando toevoegen"
        1. In je {{file_lines}}`pyproject.toml`:
        ``` toml
        [project.scripts]
        naam_commando = "package.module:naam_functie"
        ```
        2. Run
        ``` ps1
        uv sync
        ```
