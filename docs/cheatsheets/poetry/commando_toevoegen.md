# [Cheatsheets](../cheatsheets.md) > [Poetry](main.md) > Commando toevoegen

1.  Voeg in je {{file_lines}}`pyproject.toml` een extra kopje toe:
    ``` toml
    [tool.poetry.scripts]
    naam_commando = "package.module:naam_functie"
    ```
1.  Gebruik `poetry install` om de wijzigingen aan {{file_lines}}`pyproject.toml` door te voeren.