# Welcome to MkDocs

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
    Als je geen kant-en-klare schakeling bij je werkplek hebt liggen, druk de Arduino in het breadboard en bouw een schakeling met een LED op de manier die is weergegeven in \figref{fig:arduino-LED-breadboard}. De weerstand heeft een waarde van 220 \ohm. De LED heeft aan één zijde een platte kant in de dikkere ring onderaan de plastic behuizing (goed kijken!); schakel die aan de kant van de aarde. Als de pootjes van de LED niet afgeknipt zijn, dan zit het korte pootje aan de platte zijde van de LED. Het heeft geen zin om naar het plaatje te kijken hoe het er ín de LED uitziet &mdash; dat verschilt per type LED.

    ## Uitdaging: wheels

    !!! warning
        Let op dat dit ook kan.

    !!! note
        Of niet.

    En zo verder.

Bestand: :fontawesome-regular-file-lines:`docs/index.md` en ook :fontawesome-regular-file-code:`pythondaq/models/diode.py`. Die vind je ook in de repository :fontawesome-brands-github:`davidfokkema/tailor`.

Eenheden: 220 &Omega; m/s of ms^-1^ of $220\,ms^{-1}$ en $220\,\Omega$.

Voor menu's kan misschien `Code -> Add repository` en voor toetsen ++ctrl+f++.

Voor vergelijkingen:
\begin{equation}
f(x) \sin x,
\end{equation}
met $f(x)$ een functie van $x$.