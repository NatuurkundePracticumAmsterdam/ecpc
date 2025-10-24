# Installatie van benodigde software

## Introductie

We beschrijven hier de installatie van een ontwikkelomgeving voor Python. De instructies gaan er vanuit dat je een _schone_ omgeving hebt, dus zonder Python en Visual Studio Code bijvoorbeeld. Kijk dus zelf welke instructies je precies nodig hebt. Eerst volgen instructies die voor Windows en MacOS verschillend zijn. Daarna volgen nog algemene instructies. _Lees die ook!_


## Installatie &mdash; Windows

We gebruiken Visual Studio Code en GitHub Desktop. Je kunt die via de verschillende websites downloaden en installeren, maar het kan ook vanuit een terminal met Winget, een populaire package manager. Doe vooral wat je fijn vindt. Als je Winget wilt gebruiken: open een _command prompt_ (of _opdracht prompt_) of _powerconsole prompt_ en type in:
```
winget install microsoft.windowsterminal
winget install microsoft.visualstudiocode
winget install github.githubdesktop
winget install git.git
```


## Installatie &mdash; macOS

We gebruiken Visual Studio Code en GitHub Desktop. Je kunt die via de verschillende websites downloaden en installeren, maar het kan ook vanuit een terminal met Homebrew, een populaire package manager. Doe vooral wat je fijn vindt. Installeer de package manager _Homebrew_ als volgt. Open een _terminal_ en type in (of kopieer van \url{https://brew.sh}):
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Sluit de terminal af en open een _nieuwe_ terminal. We installeren de ontwikkelomgeving met:
```
brew install visual-studio-code
brew install github
```
Zie voor verdere instructies de volgende secties.


## Installatie &mdash; Linux
We gebruiken Visual Studio Code en GitHub Desktop. Je kunt VS Code via de website downloaden en installeren, maar het kan ook vanuit een terminal met de package manager van je systeem. Doe vooral wat je fijn vindt. Linux komt in veel smaken, maar je weet ongetwijfeld hoe je dit pakket kunt zoeken en installeren. Een aantal linuxdistributies heeft niet VS Code zelf, maar de volledig open source variant VSCodium beschikbaar. GitHub Desktop is helaas niet beschikbaar voor Linux via de officiële kanalen. Je kunt een onofficiële build downloaden of Git alleen via de commandline gebruiken, of via VS Code zelf.

Sommige Linuxdistributies geven je niet automatisch voldoende rechten om verbinding te maken met willekeurige USB-devices (zoals onze meetapparatuur). Je zult dan bijvoorbeeld toegevoegd moeten worden aan de `dialout` groep. Sommige devices worden nog niet herkend door het systeem en moeten handmatig worden toegevoegd in `/etc/udev/rules.d` voordat je ze kunt gebruiken. Houd hier rekening mee, zoek zelf naar informatie of vraag om hulp op de zaal.


## VS Code extensions &mdash; Alle OSes
Sluit de terminal of prompt af. Je kunt in Visual Studio Code zelf extensies zoeken en installeren door te klikken op het 'blokjes' icoon in de linkerbalk. De namen van de extenties staan hieronder. Je kunt ze ook in een terminal of prompt installeren. Open dan een _nieuwe_ terminal of prompt. We installeren de extensions voor Visual Studio Code in één keer met:
```
code --install-extension ms-python.python
code --install-extension charliermarsh.ruff
code --install-extension tamasfe.even-better-toml
code --install-extension njpwerner.autodocstring
```


## Instellingen VS Code &mdash; Alle OSes
Er zijn drie instellingen om je code automatisch wat op te schonen en import statements te sorteren. Op die manier hoef je je veel minder druk te maken over hoe netjes je code eruitziet. Elke keer als je je bestand opslaat gaat de tool _ruff_ aan het werk.

1. Kies **File>Preferences>Settings** of druk op ctrl-, (control-komma).
2. Type nu in het zoekvenster: `format on save` en vink de bovenste instelling aan.
3. Type nu in het zoekvenster: `@lang:python default formatter` en kies `Ruff`
4. Type nu in het zoekvenster: `@lang:python code actions on save` en kies `Edit in settings.json` en kies dan in het menuutje `source.organizeImports` en dan `explicit`. Sla dan het bestand op met **File>Save** of ctrl+s.
5. Sluit de settingstabbladen.

Zodra je een Pythonbestand hebt geopend kun je rechts onderin bij `Select interpreter` het juiste environment kiezen.
