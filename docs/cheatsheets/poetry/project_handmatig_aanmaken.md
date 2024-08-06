# [Cheatsheets](../cheatsheets.md) > [Poetry](main.md) > Poetry toevoegen aan bestaand project

1. Open de {{github}}`projectmap` in GitHub Desktop.
1. Ga naar **Repository > Open in Visual Studio Code** (of druk op ++ctrl+shift+a++ ).
1. Maak een nieuw project aan met `poetry init --no-interaction`.
1.  Maak in {{github}}`projectmap` de volgende mappenstructuur aan:  
    {{github}}`projectmap`    
    {{T}} {{new_folder}}`src`    
    {{tab}} {{L}} {{new_folder}}`projectmap`      
    {{tab}} {{tab}} {{L}} {{new_file}}`__init__.py`      
    {{T}} {{new_folder}}`tests`      
    {{tab}} {{L}} {{new_file}}`__init__.py`      
    {{L}} {{file_lines}}`pyproject.toml`
1. Maak een nieuwe [conda environment](../anaconda/environment_aanmaken.md) aan.
1. Installeer je poetry project met `poetry install`.
1. Voeg je dependencies toe met `poetry add [dependency]`.
1. Elke keer wanneer je een commando toevoegt of in een nieuwe conda environment zit, installeer je project opnieuw met `poetry install`.
