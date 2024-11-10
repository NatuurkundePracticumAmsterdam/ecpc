# FAQ: lijst conventies

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

## Ideeën

??? question "Schakeling bouwen"
    Als je geen kant-en-klare schakeling bij je werkplek hebt liggen, druk de Arduino in het breadboard en bouw een schakeling met een LED op de manier die is weergegeven in [fig:arduino-LED-breadboard](fig:arduino-LED-breadboard). De weerstand heeft een waarde van 220 &Omega;. De LED heeft aan één zijde een platte kant in de dikkere ring onderaan de plastic behuizing (goed kijken!); schakel die aan de kant van de aarde. Als de pootjes van de LED niet afgeknipt zijn, dan zit het korte pootje aan de platte zijde van de LED. Het heeft geen zin om naar het plaatje te kijken hoe het er ín de LED uitziet &mdash; dat verschilt per type LED.

    ## Uitdaging: wheels

    !!! waarschuwing
        Let op dat dit ook kan.

    !!! info
        Of niet.

    En zo verder.

Bestand: {{file_lines}}`docs/index.md` en ook {{file}}`pythondaq/models/diode.py`. Die vind je[^voetnoot] ook in de repository {{github}}`davidfokkema/tailor`. Folder: {{folder}}`oefenopdrachten`.

[^voetnoot]: en dit is dus een voetnoot

Eenheden: 220 &Omega; m/s of ms^-1^ of $220\,ms^{-1}$ en $220\,\Omega$. **We doen het eerste!!**

<!-- Voor menu's kan misschien `Code -> Add repository` en voor toetsen ++ctrl+f++.
Of werkt dit? ++context-menu++ -> ++"Code"++ ++"Add repository"++ -->
Voor menu's gaan we het zo doen: **Menu > Code > Add repository** en voor toetsen ++ctrl+f++.

Een referentie naar een opdracht of figuur maak je aan door `<div id="label"></div>` blokje als label neer te zetten. Verwijzen gaat dan met `[opdracht _label_](bronbestand.md#label)` waarbij je dus ook het bestand moet weten waarin het label gedefinieerd wordt.

Voor vergelijkingen:
\begin{equation}
f(x) \sin x,
\end{equation}
met $f(x)$ een functie van $x$.

Voor code: hier een `#!py print`-statement, maar meer code met:
``` py title="Titel"
print("Hello, world!")
```

!!! opdracht-basis "oefenopdracht"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
    euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
    purus auctor massa, nec semper lorem quam in massa

!!! opdracht-inlever "Inlever opdracht"

    Deze opdracht lever je in. 

!!! opdracht-meer "Meer leren"

    Met deze opdracht kan je meer leren