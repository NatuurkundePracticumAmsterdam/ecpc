# Versiebeheer met GitHub

## Versiebeheer

Zodra je scripts wat ingewikkelder worden, begin je tegen heel praktische problemen aan te lopen. Het werkt _nu_, maar je wilt een flinke aanpassing gaan doen. Werkt het dan straks nog wel? Hoe ingewikkelder het script, hoe ingewikkelder de wijzigingen en hoe minder het vertrouwen dat het in één keer gaat lukken. Misschien heb je wel eens de ervaring gehad dat een wijziging maar niet wilde werken en dat je niet goed meer wist wat je precies had veranderd ten opzichte van toen het nog _wel_ werkte. Veel mensen hebben daarom de neiging om naast een {{file}}`script.py` een {{file}}`script-v1.py`, {{file}}`script-v2.py`, enzovoorts aan te maken. Soms zelfs een {{file}}`script-eindversie.py` en met wat pech dan toch nog een {{file}}`script-eindversie-definitief.py`. Niet heel fijn. Je ziet dan nog steeds niet goed wat er veranderd is (dat blijft naast elkaar leggen en zoeken) en je map loopt vol met overbodige scripts. Dit kan beter&hellip;\ met versiebeheer!

Versiebeheer (Engels: _version control_) stelt je in staat om af en toe een momentopname te maken van al je bestanden in een bepaalde map, inclusief alle submappen. Dit doe je niet na iedere regel code, maar bijvoorbeeld wel als je een stukje code af hebt en na het testen weet dat het werkt. Zo'n momentopname heet een _commit_. Hoe vaak je commit is aan jou; maar wacht niet te lang &mdash; anders is het geen versiebeheer meer.

Je versiebeheersysteem geeft ondertussen duidelijk al je wijzigingen weer ten opzichte van de laatste commit. Ook kun je de wijzigingen tussen oudere versies bekijken. Alles is relatief: je kunt zien wat er veranderd is tussen twee weken terug en gisteren, of tussen gisteren en vandaag; iedere commit kun je vergelijken met willekeurig iedere andere commit. Heb je iets verprutst en wil je een oude versie terughalen? Prima! Commit die ook, dan kun je zelfs dat weer terugdraaien. Je verliest zo nooit meer je werk. En stukmaken mag![^stuk]

[^stuk]: Stukmaken mag, maar het terughalen van een oude versie is niet met één druk op de knop gebeurd. Vraag om hulp als je terug wilt naar een oude versie, wij helpen je graag!


### Git

Ruim tien jaar geleden werden er nog vele concurrerende systemen gebruikt. Die tijd is grotendeels voorbij. Eén van de nieuwste systemen, Git,[^git_footnote] wordt tegenwoordig door bijna iedereen gebruikt of ondersteund. Git is ontwikkeld door Linus Torvalds als alternatief voor het commerciële systeem dat gebruikt werd voor de ontwikkeling van de Linux kernel.[@git] Het begon als een zeer eenvoudig &mdash; en volkomen ongebruiksvriendelijk &mdash; programma. Later is het in een veel gebruiksvriendelijker jasje gestoken.

[^git_footnote]: <https://initialcommit.com/blog/How-Did-Git-Get-Its-Name>

Git werkt in principe via de command-line. Je geeft opdrachten in de map waar je broncode staat: toevoegen van wijzigingen aan de _staging area_, bekijken van de meest recente wijzigingen, committen van je code, teruggaan en werken met oudere versies, aanmaken van _branches_,[^branches] je wijzigingen uploaden naar internet, enzovoorts. Het geheel van de map met broncode en de versiegeschiedenis wordt een _repository_ genoemd.

[^branches]: Een branch is een splitsing in je versiegeschiedenis. Je kunt het gebruiken om over een langere tijd een grote wijziging uit te testen, terwijl je af en toe heen en weer springt tussen je main branch en de nieuwe branch. Commits in de verschillende branches blijven gescheiden. Later kun je ervoor kiezen om de wijzigingen in de nieuwe branch te _mergen_ met je main branch, maar dat hoeft niet.

In deze cursus zul je gebruik maken van een grafische applicatie die eenvoudiger werkt. Je kunt daarna &mdash; als je dat wilt &mdash; de stap maken naar de command-line, waarmee je veel meer mogelijkheden tot je beschikking krijgt. Zie het boek _Pro Git_[@gitpro] voor meer informatie over Git en het gebruik via de command-line.

### GitHub

Git is een _distributed version control system (DVCS)_, wat wil zeggen dat er geen centrale server hoeft te zijn. Je kunt volledig offline werken in je eigen repository en je wijzigingen af en toe committen. Als je daar zin in hebt kun je je wijzigingen naar een collega sturen (_pushen_) en je kunt een collega toestemming geven om de wijzigingen op te halen (_pullen_). Je bouwt dan aan één grote versiegeschiedenis met kopieën op meerdere computers. Je bent zo volledig onafhankelijk van bedrijven die servers in de lucht houden of bepalen wie er wel en niet toegang krijgt. Dat is fijn, maar een centrale plek om repositories neer te zetten heeft weer het grote voordeel dat je de wereld kunt laten zien wat voor moois je gemaakt hebt én het vermakkelijkt samenwerking. Daarnaast is iedereen uit je team up-to-date als iedereen regelmatig commits pusht naar een centrale server.

Er zijn tegenwoordig veel websites die een plek bieden voor Git repositories. De bekendste zijn GitHub, GitLab, Bitbucket en SourceForge. GitHub, aangekocht door Microsoft, is op dit moment het bekendste en grootste platform. Veel bekende softwareprojecten vinden daar hun thuis.

In deze cursus ga je werken met GitHub. Je moet hiervoor wel een (gratis) account aanmaken. Als student kom je ook nog in aanmerking voor een educatiekorting op een pro-account.[^pro-account] Je betaalt dan nog steeds niets.

[^pro-account]: [https://github.com/education/students](https://github.com/education/students)

!!! opdracht-basis-thuis "Account aanmaken"
    === "opdracht"
        Ga naar [https://github.com/](https://github.com/) en klik op `Sign up for GitHub`. Maak een account aan onder je _privé-emailadres_. Op deze manier blijf je toegang houden tot je account ook nadat je afgestudeerd bent.

        !!! info
            Mogelijk heb je eerder al eens een account aangemaakt bij GitHub, bijvoorbeeld bij de cursus Project natuurkunde/sterrenkunde 1. Maak voor ECPC dan ook gebruik van dit account. Controleer wel nog even of je voor dit account je _privé-emailadres_ gebruikt.

    === "check"
        **Checkpunten:**

        - [ ] Je hebt een account aangemaakt op [https://github.com/](https://github.com/). 
        - [ ] Je hebt dit account aangemaakt onder je privé-emailadres. 

        **Projecttraject:**

        - [x] Vergelijk script met `pyvisa-shell`
        - [x] PyVISA in Pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [x] Account aanmaken
        - [ ] Van bestaande map repository maken
        - [ ] Commit 
        - [ ] Push en pull        



### GitHub Desktop
Om het programmeurs makkelijker te maken met GitHub te werken heeft GitHub een desktopapplicatie ontwikkeld met de naam GitHub Desktop. Je gaat GitHub Desktop gebruiken om een repository te maken van de map met de oefenopdrachten.

<div id="opd:add_repository"></div>
!!! opdracht-basis "Van bestaande map repository maken"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Je gaat een repository maken van een bestaande map. Als je van de map {{folder}}`ECPC` een repository maakt, kun je daar geen andere repositories meer in zetten. Dat is onhandig! Daarom maak je in de map {{folder}}`ECPC` een nieuwe map {{new_folder}}`oefenopdrachten` aan. Hierin zet je alle Python-bestanden die je tot nu toe hebt gemaakt, zoals de opdrachten [_PyVISA in Pythonscript_](communicatie.md#opd:test_arduino) en [_flashingLED_](communicatie.md#opd:flashingLED). 
            <br>
            <br>
            Je gaat naar GitHub Desktop en logt in met je eigen account. Je vindt onder het dropdownmenu **File** drie opties:  `New repository...`, `Add local repository...` en `Clone repository...`. Hoewel `New repository...` een goede optie lijkt, is dit niet wat je zoekt. Op het moment dat je een nieuwe repository maakt, wordt er ook een nieuwe map aangemaakt en dat is niet wat je wilt. Daarom kies je voor `Add local repository...`. Je geeft de map {{folder}}`oefenopdrachten` op als locatie en krijgt in rode tekst een waarschuwing. De waarschuwing geeft aan dat de map wel bestaat maar dat het geen `Git repository` is, daarom klik je op de blauwe tekst `create a repository`. Je vinkt `Initialize this repository with a README` aan en kiest bij `Git ignore` voor <q>Python</q>. Daarna klik je op de blauwe knop `Create Repository`. 
            <br>
            <br>
            De repository {{github}}`oefenopdrachten` is in GitHub Desktop geopend en als je op het tabblad 'History' klikt dan zie je dat er een `Initial commit` is met wat `git`-bestanden en de Pythonscripts die je in de map hebt gezet. Vanaf nu staat {{github}}`oefenopdrachten` in versiebeheer en houdt Git je wijzigingen bij. Het is wel belangrijk dat je met regelmaat zelf [commit](#commit)!
            </div>
            <div>
            {{folder}}`ECPC`  
            {{T}} {{new_folder}} `oefenopdrachten`  
            {{tab}} {{T}} {{file}} `test_arduino.py`  
            {{tab}} {{T}} {{file}} `flashingLED.py`  
            {{tab}} {{L}} {{dots}} 
            </div>
        </div>        
        !!! info "{{github}}-symbool"
            Vanaf nu duiden we een repository aan met het {{github}}-symbool. 
        
        !!! info "Git ignore Python"
            Waarom zou je bij `Git ignore` voor Python kiezen, je gaat toch juist Python bestanden maken? De `Git ignore` zorgt ervoor dat allerlei _hulpbestanden_ van Python niet bewaard worden als commit. Maar de Pythoncode zelf wordt wel bewaard.
    === "check"
        **Checkpunten:**
    
        - [ ] De repository {{github}}`oefenopdrachten` zit in de map {{folder}}`ECPC`.
        - [ ] In de repository {{github}}`oefenopdrachten` bevinden zich de Python-bestanden die je tot nu toe hebt gemaakt.
        - [ ] In de repository {{github}}`oefenopdrachten` bevindt zich een bestand {{file}}`README.md`.
        - [ ] In de repository {{github}}`oefenopdrachten` bevindt zich een bestand {{file}}`.gitattributes`.
        - [ ] In de repository {{github}}`oefenopdrachten` bevindt zich een bestand {{file}}`.gitignore`.
        - [ ] In GitHub Desktop zie je onder 'History' een `Initial commit` staan.

        **Projecttraject**
    
        - [x] Vergelijk script met `pyvisa-shell`
        - [x] PyVISA in Pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [x] Account aanmaken
        - [x] Van bestaande map repository maken
        - [ ] Commit 
        - [ ] Push en pull

### Commit
Alle wijzigingen aan bestanden in de repository kun je vanaf nu bijhouden door regelmatig een commit te maken. Met een commit maak je als het ware een snapshot van alle bestanden en hang je daar een labeltje aan.
Dit kan in GitHub Desktop, maar ook direct vanuit Visual Studio Code. Elke commit geef je een begeleidend schrijven mee, een _commit message_. Je hoopt dat jij &mdash; maar ook je collega &mdash; na het lezen van de commit message snel begrijpt wat er veranderd is én waarom. Wanneer je bepaalde wijzigingen ongedaan wilt maken, kan je door het lezen van de commit messages snel vinden bij welke commit je dan moet zijn. En wanneer je je applicatie gaat uitbrengen op GitHub, kun je de commit messages gebruiken om snel op te sommen wat de nieuwste versie van jouw app kan!

Hieronder zie je een aantal voorbeelden van commit messages. De titel (_summary_) is kort en krachtig. In de beschrijving (*description*) staat specifieke en uitgebreidere informatie. 

--8<-- "docs/html-snippets/commit.html"

!!! opdracht-basis "Commit"
    === "{{github}} GitHub Desktop"
        Voer de volgende opdrachten uit:

        1. Open GitHub Desktop, klik op *Current repository* (links onder de menubalk) en selecteer de repository {{github}}`oefenopdrachten`.
        2. Ga naar het dropdownmenu **Repository** en kies voor `Open in Visual Studio Code` (of druk op ++ctrl+shift+a++ ) en open de repository {{github}}`oefenopdrachten` in Visual Studio Code.
        3. Open in Visual Studio Code één van je Pythonscripts.
        4. Type een stukje code erbij &mdash; bijvoorbeeld een `#!py print`-statement &mdash; en haal ergens anders iets weg. Sla het bestand op.
        5. Ga terug naar GitHub Desktop. Controleer bij *Current repository* (links onder de menubalk) of de repository {{github}}`oefenopdrachten` nog steeds is geopend.
        6. Klik daaronder op het tabblad *Changes*.
        7. Als er meerdere bestanden gewijzigd zijn, kun je met een blauwe vinkje aangeven voor welke bestanden je een commit schrijft. 
        8. Onder de lijst met gewijzigde bestanden vind je twee invulvelden. Een smal veld voor een titel en een groot veld voor een uitgebreide beschrijving (*Description*). In het veld voor een titel staat in lichtgrijs een nietzeggende commit, bijvoorbeeld *Update test.py*. Schrijf daar een nuttige commit message. Dus niet: <q>opdracht: commit</q>. Maar meer zoiets als: <q>feat: lookup port name for device</q>. Houd de titel in de commit message kort en krachtig. Een uitgebreidere beschrijving kun je kwijt in het grote veld.
        9.  Klik op *Commit to main*. Gefeliciteerd! {{feesttoeter}} Je hebt je eerste commit gedaan!

    === "Visual Studio Code"
        Voer de volgende opdrachten uit:

        1. Open GitHub Desktop, klik op *Current repository* (links onder de menubalk) en selecteer de repository {{github}}`oefenopdrachten`.
        2. Ga naar het dropdownmenu **Repository** en kies voor `Open in Visual Studio Code` (of druk op ++ctrl+shift+a++ ) en open de repository {{github}}`oefenopdrachten` in Visual Studio Code.
        3. Open in Visual Studio Code één van je Pythonscripts.
        4. Type een stukje code erbij &mdash; bijvoorbeeld een `#!py print`-statement &mdash; en haal ergens anders iets weg. Sla het bestand op.
        5. In Visual Studio Code verschijnt links een blauw bolletje bij *Source Control* {{branch}}. (Geen blauw bolletje? Bekijk het info-blok hieronder.) Dit bolletje laat weten dat er wijzigingen zijn ten opzichte van de vorige commit. Klik op *Source Control*. 
        6. Onder *Changes* staat een lijst met bestanden waar wijzigingen in aangebracht zijn. Kies welke bestanden je wilt committen door achter de bestandsnamen op `+` te klikken. Deze bestanden komen nu op het "podium" te staan onder *Staged Changes*. Je kunt ook alle bestanden in een keer op het "podium" zetten door naast het kopje *Changes* op `+` te klikken.
        7. Schrijf een nuttige commit message. Dus niet: <q>opdracht: commit</q>. Maar meer zoiets als: <q>feat: lookup port name for device</q>. Je kunt je commit message opdelen in een titel (of *summary*) en een beschrijving. Dit doe je door een witregel toe te voegen tussen de titel en de beschrijving. Houd de titel in de commit message kort en krachtig. De beschrijving mag uitgebreider zijn.
        8. Klik op het vinkje *Commit* om te committen. Gefeliciteerd! {{feesttoeter}} Je hebt je eerste commit gedaan!

        !!! info "Geen blauw bolletje"
            Zie je geen bolletje verschijnen? Kijk of je het bestand zeker weten hebt opgeslagen. Nog steeds geen blauw bolletje? Ga naar [{{github}} GitHub Dekstop](#__tabbed_3_1) en ga verder met stap 5.
    
    === "check"
        **Checkpunten:**
    
        - [ ] In GitHub Desktop is aan het tabblad *History* een nieuw commit message toegevoegd, de commit message die jij zojuist geschreven hebt.
        - [ ] De commit message bevat in ieder geval een kort en krachtige titel.
        - [ ] De commit message is gekoppeld aan het bestand waarin je aanpassingen hebt gedaan. 
        - [ ] De toevoegde code is in het overzicht aangegeven in het groen en de verwijderde code is aangegeven in het rood. 

        **Projecttraject**
    
        - [x] Vergelijk script met `pyvisa-shell`
        - [x] PyVISA in Pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [x] Account aanmaken
        - [x] Van bestaande map repository maken
        - [x] Commit 
        - [ ] Push en pull

In GitHub Desktop zie je nu bij _History_ de commit staan, met in één oogopslag alle wijzigingen.

!!! info
    Als je wilt opzoeken hoe iets werkt bij GitHub Desktop, kijk dan in de documentatie: [https://docs.github.com/en/desktop](https://docs.github.com/en/desktop).

!!! opdracht-basis "Push en pull"
    === "opdracht"
        De repository {{github}}`oefenopdrachten` bestaat alleen nog maar op de computer. Als de computerkabouters 's nachts langskomen kan het zijn dat de computer daarna is gewist en je alles kwijt bent. Daarom is het fijn om de repository ook in de cloud te hebben op [github.com](https://github.com/). 
        
        In GitHub Desktop vind je een knop `Publish repository; Publish this repository to GitHub`. Als je daar op drukt kun je nog een andere naam aan de repository geven (deze naam bepaalt de url op [github.com](https://github.com/)), een beschrijving toevoegen en aangeven of de code privé moet zijn. Daarna klik je op de blauwe knop `Publish repository`. Als je nu naar [github.com](https://github.com) gaat zie je bij jouw repositories de zojuist gepubliceerde repository staan. 
    
        Om je wijzigen ook in de cloud op te slaan kun je commits `pushen` naar [github.com](https://github.com/) met de knop `Push origin`. Als je op een andere computer gaat werken kun je de repository vanuit de cloud naar de computer halen door op `Fetch origin` te klikken en daarna op `Pull origin`.
    === "check"
        **Checkpunten:**
    
        - [ ] De repository {{github}}`oefenopdrachten` is één van jouw repositories op [github.com](https://github.com/). 
        - [ ] Alle bijbehorende commit messages zijn ook te vinden op [github.com](https://github.com/).

        **Projecttraject**
    
        - [x] Vergelijk script met `pyvisa-shell`
        - [x] PyVISA in Pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [x] Account aanmaken
        - [x] Van bestaande map repository maken
        - [x] Commit 
        - [x] Push en pull


##  GitHub

Om makkelijk je Git repository te delen met vrienden, collega's en de rest van de wereld kun je er voor kiezen om deze op GitHub te zetten. Je kunt dan je commits pushen naar GitHub en wijzigingen die je vrienden hebben gemaakt pullen, zodat jij er ook weer aan verder kan werken. Van alle repositories die op GitHub staan én openbaar zijn kun je de broncode clonen en er zelf mee aan de slag! Laten we eens een kijkje nemen op GitHub.

!!! opdracht-basis "Tailor"
    Als je nog nooit op GitHub bent geweest dan kunnen de pagina's nogal intimiderend overkomen. De informatiedichtheid is nogal hoog. Na een paar bezoeken weet je meestal wel waar je dingen kunt vinden. David heeft een data-analyse app geschreven dat Tailor heet en dat gebruikt wordt bij natuurkundepractica voor studenten Medische natuurwetenschappen en Science, business and innovation. Interessant om eens te kijken wat je hierover kunt vinden op GitHub.

    1. Zoek de repository {{github}}`/davidfokkema/tailor` op [github.com](https://github.com) op.
    2. Je komt nu terecht op de hoofdpagina. Hier zie je een mappenstructuur met een aantal bestanden. Rechts daarvan staat een korte beschrijving onder het kopje _About_. Een uitgebreidere beschrijving vind je als je naar beneden scrolt onder _README_.
    3. Linksboven zie je een aantal tabbladen (_Code_, _Issues_, _Pull requests_, enzovoorts). Het tabblad _Code_ is de hoofdpagina met de mappenstructuur. Navigeer door de mappen, wat staat er op regel 14 van {{file}}`plot_tab.py`?
    4. Ga terug naar de hoofdpagina, kijk onder het groen kopje met `code`. Hoeveel commits zijn er gemaakt? Klik op commits en daarna op een commit-message. Hoeveel regels zijn er weggehaald of bijgekomen?
    5. Je kan per bestand bekijken wanneer die is aangepast en wat er is aangepast met de history knop. Ga naar het bestand {{file}}`pyproject.toml` en klik rechtsboven op `History`. Wat is er aangepast in {{file}}`pyproject.toml` bij de commit <q>Release v2.0.0</q>? Je ziet ook welke bestanden nog meer zijn gewijzigd in deze commit, welk bestand is nog meer gewijzigd bij <q>Release v2.0.0</q>?
    6. Ga terug naar de hoofdpagina. Welke versie van Tailor is als laatste gereleased?
    7. Je kent het misschien wel, dat je een app gebruikt maar dat het niet helemaal goed werkt (bug), of je hebt een idee hoe het nog beter kan worden (enhancement). Daarvoor is op GitHub het tabblad `Issues`. Hoeveel bugs zijn er gerapporteerd? En hoeveel enhancements?
    8. Als het jou nu gelukt is om een bug te fixen, of je hebt een super handige feature ontworpen, dan kan je de eigenaren van de repository vragen om jouw code te implementeren door een pull request te sturen. Ga naar het tabblad `Pull requests`, klik op `Closed` en bekijk welke pull requests zijn geïmplementeerd.
    9. Het meest rechter tabblad `Insights` geeft je, tegen alle verwachtingen in, inzicht. Je kan zien door hoeveel mensen er aan gewerkt wordt. Kijk bij `Code frequency`, in welke periode is er het meest aan de code veranderd?
    10. Als je een repository goed/handig/slim/fijn vindt kun je dit aangeven met een ster. Klik daarvoor rechtsboven op star {{star}}.
    11. Dan tot slot die ene, meest in het oogspringende groene `code` knop. Met die knop kan je de repository als zip-bestand downloaden of openen met GitHub desktop.



???+ opdracht-meer "Clone repository"
    Clone de LMfit-py repository op GitHub:

    1. Zoek de repository op GitHub op (`lmfit/lmfit-py`)
    1. Kies **Code > Open with GitHub Desktop**
    1. Kies zelf een map op je harde schijf om de repository te bewaren.
    1. Open Visual Studio Code en open de repository met **File > Open Folder**.[^open folder] Als GitHub Desktop de geïnstalleerde VS Code herkent kan dat direct vanuit GitHub Desktop met **Repository > Open in Visual Studio Code**.
    1. Open {{folder}}`examples` {{file_lines}}`README.txt`. Verander in de eerste paragraaf `Below are examples` in `Below are different examples` en sla het bestand op.
    1. Schakel naar de GitHub Desktop applicatie en bekijk de wijziging.
    1. Linksonder kun je een korte beschrijving van je wijziging intypen en druk dan op de blauwe `Commit`-knop.
    1. Schakel, rechtsboven, naar `History`. Bovenaan staat jouw wijziging. Daaronder kun je alle wijzigingen van anderen bekijken.

    [^open folder]: Als je vergeten bent waar je de repository ook alweer bewaard had kun je met **Repository > Show in Finder** de folder openen.

    Aangezien je geen schrijfrechten hebt voor LMfit kun je niet kiezen voor `Push origin` &mdash; de knop die rechtsboven verschijnt. Met die knop <q>duw</q> je je wijzigingen naar GitHub zodat iedereen ze kan zien. Dat is mooi, maar je mag niet zomaar de repository van iemand anders wijzigen.

    


???+ opdracht-meer "Git in de terminal"
    Tot nu toe heb je Visual Studio Code of GitHub Desktop gebruikt om te committen. Maar je kan Git ook bedienen via de terminal. De mogelijkheden van Git zijn in de terminal ook veel groter dan in de grafische applicaties die we gebruikt hebben.

    1. Open een repository in Visual Studio Code
    1. Gebruik de terminal in Visual Studio Code en bekijk de commit geschiedenis met het commando `git log`. Scroll door de commit messages met spatie.
    1. Zoek via [https://initialcommit.com/blog/Git-Cheat-Sheet-Beginner](https://initialcommit.com/blog/Git-Cheat-Sheet-Beginner) het commando om een commit toe te voegen. Wijzig iets in je code en commit via de terminal.
    1. Dit waren twee dingen wat met GitHub Desktop ook kon, snuffel op het internet om te zien wat je met Git nog meer kunt.



???+ meer-leren "Branches"

    ## Branches

    Soms wil je je code flink onder handen nemen of iets heel nieuws eraan toevoegen. Terwijl je bezig bent ga je natuurlijk eerst van alles stuk maken voordat je het weer werkend hebt gekregen. Maar ondertussen kan je oude functionaliteit van je code niet gebruiken. Of je bent samen met een vriend aan een package bezig en om de haverklap werkt jouw stukje code niet meer omdat ergens anders de code verbouwd wordt. Dan is het handig dat je vanaf het punt dat je code werkt een zijweg kan inslaan. Daarom zijn branches uitgevonden. Je kunt vanuit Github Desktop, vanuit Visual Studio Code en natuurlijk via de terminal een branch aanmaken.
    !!! opdracht-meer "Branches"

        * Open een repository naar keuze en maak een nieuwe branch aan.
        * Maak een aantal wijzigingen en commit.
        * Ga terug naar de main branch.
        * Merge de nieuwe branch in de main branch.

