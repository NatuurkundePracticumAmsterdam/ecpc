# [Cheatsheets](../cheatsheets.md) > [Poetry](main.md) > Project handmatig aanmaken

1. Maak een nieuwe map voor je project aan in de map {{folder}}`ECPC` (voor dit stappenplan noemen we hem `[projectnaam]`).
1. Open de map met Visual Studio Code.
1. Maak een nieuw project aan met `poetry init --no-interaction`.
1.  Maak in je map de volgende mappenstructuur aan:  
    {{folder}}`[projectnaam]`    
    {{T}} {{new_folder}}`src`    
    {{tab}} {{L}} {{new_folder}}`[projectnaam]`      
    {{tab}} {{tab}} {{L}} {{new_file}}`\_\_init\_\_.py`      
    {{T}} {{new_folder}}`tests`      
    {{tab}} {{L}} {{new_file}}`\_\_init\_\_.py`      
    {{L}} {{file_lines}}`pyproject.toml`    
1. Installeer je poetry project met `poetry install`.
1. Voeg je dependencies toe met `poetry add [dependency]`.
1. Elke keer wanneer je een commando toevoegt of in een nieuwe conda environment zit, installeer je project opnieuw met `poetry install`.
