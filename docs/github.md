# Versiebeheer met GitHub

## Versiebeheer

Zodra je scripts wat ingewikkelder worden begin je tegen hele praktische problemen aan te lopen. Het werkt _nu_, maar je wilt een flinke aanpassing gaan doen. Werkt het straks nog wel? Hoe ingewikkelder het script, hoe ingewikkelder de wijzigingen en hoe minder het vertrouwen dat het in één keer gaat lukken. Misschien heb je wel eens de ervaring gehad dat het maar niet wil werken en dat je niet goed weet wat je precies had veranderd ten opzichte van toen het nog _wel_ werkte. Veel mensen hebben de neiging om naast een {{file}}`script.py` een {{file}}`script-v1.py`, {{file}}`script-v2.py`, enz. aan te maken. Soms zelfs een {{file}}`script-eindversie.py` en met wat pech dan toch nog een {{file}}`script-eindversie-definitief.py`. Niet heel fijn. Je ziet dan nog steeds niet goed wat er veranderd is (dat blijft naast elkaar leggen en zoeken) en je map loopt vol met overbodige scripts. Dit kan beter&hellip;\ met versiebeheer!

Versiebeheer (Engels: _version control_) stelt je in staat om af en toe een momentopname te maken van al je bestanden in een bepaalde map, inclusief alle submappen. Dit doe je niet na iedere regel code, maar bijvoorbeeld wel als je een stukje code af hebt en getest hebt dat het werkt. Zo'n momentopname heet een _commit_. Hoe vaak je commit is aan jou; maar wacht niet te lang &mdash; dan is het geen versiebeheer meer.

Je versiebeheersysteem geeft ondertussen duidelijk al je wijzigingen weer ten opzichte van de laatste commit. Ook kun je de wijzigingen tussen oudere versies bekijken. Alles is relatief: je kunt zien wat er veranderd is tussen twee weken terug en gisteren, of gisteren en vandaag; iedere commit kun je vergelijken met willekeurig iedere andere commit. Heb je iets verprutst en wil je een oude versie terughalen? Prima! Commit die ook, dan kun je zelfs dat weer terugdraaien later. Je verliest nooit meer je werk. En stukmaken mag![^stuk]

[^stuk]: Stukmaken mag, maar het terughalen van een oude versie is niet met een druk op de knop gebeurt. Vraag om hulp als je terug wilt naar een oude versie, wij helpen je graag!


### Git

Ruim tien jaar geleden werden er nog vele concurrerende systemen gebruikt. Die tijd is grotendeels voorbij. Eén van de nieuwste systemen, Git,[^git] wordt tegenwoordig door bijna iedereen gebruikt of ondersteund. Git is ontwikkeld door Linus Torvalds als alternatief voor het commerciële systeem dat gebruikt werd voor de ontwikkeling van de Linux kernel.[@git] Het begon als een zeer eenvoudig &mdash; en volkomen ongebruiksvriendelijk &mdash; programma. Later is het in een veel gebruiksvriendelijker jasje gestoken.

[^git]: https://initialcommit.com/blog/How-Did-Git-Get-Its-Name

Git werkt in principe via de command-line. Je geeft opdrachten in de map waar je broncode staat: toevoegen van wijzigingen aan de _staging area_, bekijken van de meest recente wijzigingen, committen van je code, teruggaan en werken met oudere versies, aanmaken van _branches_,[^branches] je wijzigingen uploaden naar internet, enz. Het geheel van map met broncode en versiegeschiedenis wordt een _repository_ genoemd.

[^branches]: Een branch is een splitsing in je versiegeschiedenis. Je kunt het gebruiken om over een langere tijd een grote wijziging uit te testen terwijl je af en toe heen en weer springt tussen je main branch en de nieuwe branch. Commits in de nieuwe branch blijven gescheiden. Later kun je ervoor kiezen om de wijzigingen in de nieuwe branch te _mergen_ met je main branch, maar dat hoeft niet.

In deze cursus zullen we gebruik maken van een grafische applicatie die eenvoudiger werkt. Je kunt daarna &mdash; als je dat wilt &mdash; de stap maken naar de command-line waarmee je nog veel meer mogelijkheden tot je beschikking krijgt. Voor meer informatie over Git en het gebruik via de command-line, zie het boek _Pro Git_.[@gitpro]


### GitHub

Git is een _distributed version control system (DVCS)_ wat wil zeggen dat er geen centrale server hoeft te zijn. Je kunt volledig offline werken in je eigen repository en je wijzigingen af en toe committen. Als je daar zin in hebt kun je je wijzigingen naar een collega sturen (_pushen_) of je kunt een collega toestemming geven om de wijzigingen op te halen (_pullen_). Je bouwt dan aan één grote versiegeschiedenis met kopieën op meerdere computers. Je bent zo volledig onafhankelijk van bedrijven die servers in de lucht houden of bepalen wie er wel en niet toegang krijgt. Dat is fijn, maar een centrale plek om repositories neer te zetten heeft weer het grote voordeel dat je de wereld kunt laten zien wat voor moois je gemaakt hebt én dat het samenwerking wel vermakkelijkt. Als iedereen uit je team regelmatig commits pusht naar een centrale server en daar vandaan ook ophaalt dan is iedereen altijd up-to-date.

Er zijn tegenwoordig veel websites die een plek bieden voor Git repositories. De bekendste zijn GitHub, GitLab, Bitbucket en SourceForge. GitHub, aangekocht door Microsoft, is op dit moment het bekendste en grootste platform. Veel bekende softwareprojecten vinden daar hun thuis.

Wij gaan werken met GitHub, je moet dan wel een (gratis) account aanmaken. Als student kom je ook nog in aanmerking voor een educatiekorting op een pro-account. Je betaalt dan nog steeds niets.

!!! opdracht-basis "Account aanmaken"
    Ga naar [https://github.com/](https://github.com/) en klik rechtsboven op `Sign Up`. Maak een account aan onder je _privé-emailadres_. Op deze manier blijf je toegang houden tot je account ook nadat je afgestudeerd bent.



### GitHub Desktop
Om het programmeurs makkelijker te maken met GitHub te werken heeft GitHub een desktop applicatie ontwikkeld met de naam `GitHub Desktop`. We gaan GitHub Desktop gebruiken om een repository te maken van een map met oefenopdrachten.

<div id="opd:add_repository"></div>
!!! opdracht-basis "Van bestaande map repository maken"
    === "opdracht"
        <div class="grid-tree" markdown>
            <div>
            Je gaat een repository maken van een bestaande map. Als je van de {{folder}}`ECPC` een repository maakt, kun je daar geen andere repositories inzetten. Dus maak je in de map {{folder}}`ECPC` een nieuwe map {{new_folder}}`oefenopdrachten` aan en zet daarin alle Python-bestandjes die je hebt gemaakt om te oefenen zoals de opdrachten [_Pyvisa in pythonscript_](communicatie.md#opd:test_arduino) en [_KnipperLED_](communicatie.md#opd:flashingLED). 
            <br>
            Je gaat naar GitHub Desktop en logt in met je eigen account. Je ziet bij **File** drie opties staan, `New`, `Add local` en `Clone` repository. Hoewel `New repository` een goede optie lijkt, wordt daarmee een nieuwe map aangemaakt en dat is niet nodig. Dus kies je voor `Add local` repository. Je geeft de map {{folder}}`oefenopdrachten` op als locatie en krijgt in rode tekst een waarschuwing. De waarschuwing geeft aan dat de map wel bestaat maar dat het geen `Git repository` is, daarom klik je op de blauwe tekst `create a repository`. Je vinkt `Initialize this repository with a README` aan en kiest bij `Git ignore` voor <q>Python</q>. Je bevestigt dan met de blauwe knop `Create Repository`. 
            <br>
            Vanaf nu duiden we een repository aan met het {{github}}-symbool. 
            <br>
            De repository {{github}}`oefenopdrachten` is in GitHub Desktop geopend en als je op het tabblad 'History' klikt dan zie je dat er een `Initial commit` is met wat `git`-bestanden en de Pythonscripts die je in de map hebt gezet. Vanaf nu staat {{github}}`oefenopdrachten` in versiebeheer en houdt Git je wijzigingen bij, maar je moet wel zelf [committen](#commit)!
            </div>
            <div>
            {{folder}}`ECPC`  
            {{T}} {{new_folder}} `oefenopdrachten`  
            {{tab}} {{T}} {{file}} `test_arduino.py`  
            {{tab}} {{T}} {{file}} `flashingLED.py`  
            {{tab}} {{L}} {{dots}} 
            </div>
        </div>        
        !!! info "Git ignore Python"
            Waarom zou je bij Git ignore voor Python kiezen, we gaan toch juist Python bestanden maken? De Git Ignore zorgt ervoor dat allerlei _hulpbestanden_ van Python niet bewaard worden als commit. Maar de Python code wordt wel bewaard.
    === "check"
        **Checkpunten:**
    
        - [ ] De repository {{github}}`oefenopdrachten` zit in de map {{folder}}`ECPC`.
        - [ ] In de repository {{github}}`oefenopdrachten` is een bestand {{file}}`README.md`
        - [ ] In de repository {{github}}`oefenopdrachten` is een bestand {{file}}`.gitattributes`.
        - [ ] In de repository {{github}}`oefenopdrachten` is een bestand {{file}}`.gitignore`.

        **Projecttraject**
    
        - [x] Pyvisa in pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [x] Van bestaande map repository maken
        - [ ] Commit 
        - [ ] Push en pull

### Commit
Alle wijzigingen aan bestanden in de repository kun je vanaf nu bijhouden door regelmatig een commit te maken. Met een commit maak je als het ware een snapshot van alle bestanden en hang je daar een labeltje aan.
Dit kan in GitHub Desktop, maar ook direct vanuit Visual Studio Code. Elke commit geef je een begeleidend schrijven mee. Je hoopt dat jij, maar ook je collega, na het lezen van het berichtje snel begrijpt wat er veranderd is én waarom. Wanneer je bepaalde wijzigingen ongedaan wilt maken, kan je snel vinden bij welke commit je dan moet zijn. En als je dan je applicatie gaat uitbrengen op Github kun je de commit messages gebruiken om snel op te sommen wat de nieuwste versie van jou app kan!

!!! opdracht-basis "Commit"
    === "{{github}} GitHub Desktop"
        Voer de volgende opdrachten uit:

        1. Open GitHub Desktop, klik op *Current repository* (links onder de menubalk) en selecteer de repository die je in [opdracht _Repository toevoegen_](#opd:add_repository) hebt aangemaakt.
        1. Ga naar **Repository > Open in Visual Studio Code** (of druk op ++ctrl+shift+a++ ) en open de repository in Visual Studio Code.
        1. Open in Visual Studio Code één van je Pythonscripts.
        1. Type een stukje code erbij &mdash; bijvoorbeeld een print-statement &mdash; en haal ergens anders iets weg. Bewaar het bestand.
        1. Ga naar GitHub Desktop, controleer bij *Current repository* (links onder de menubalk) of de juiste repository is geopend.
        1. Klik daaronder op het tabblad *Changes*
        1. Als er meerdere bestanden gewijzigd zijn kan je met het blauwe vinkje aangeven voor welke bestanden je een commit schrijft. 
        1. Onder de lijst met gewijzigde bestanden vind je twee invulvulden. Een smal veld voor een titel en een groot veld voor een uitgebreide beschrijving (Description). 
        1. In het titelveld staat in lichtgrijs een nietzeggende commit (bijvoorbeeld: Update test.py). Schrijf daar een nuttige <q>commit message</q>. Dus niet: <q>opdracht: commit</q>, maar zoiets als: <q>feat: lookup port name for device</q>.
        1. Klik op *Commit to main*. Gefeliciteerd! {{feesttoeter}} Je hebt je eerste commit gepleegd!


    === "Visual Studio Code"

        1. Open GitHub Desktop, klik op *Current repository* (links onder de menubalk) en selecteer de repository die je in [opdracht _Repository toevoegen_](#opd:add_repository) hebt aangemaakt.
        1. Ga naar **Repository > Open in Visual Studio Code** (of druk op ++ctrl+shift+a++ ) en open de repository in Visual Studio Code.
        1. Open in Visual Studio Code één van je Pythonscripts.
        1. Type een stukje code erbij &mdash; bijvoorbeeld een print-statement &mdash; en haal ergens anders iets weg. Bewaar het bestand.
        1. Links verschijnt een blauw bolletje (Geen blauw bolletje? Bekijk het info blok hieronder.) bij `Source Control`{{branch}} die laat weten dat er wijzigingen zijn ten opzichte van de vorige commit. Klik op `Source Control`.
        1. Onder `Changes` staat een lijst met bestanden waar wijzigingen in aan zijn gebracht. Kies welke bestanden je wilt committen door rechts op het +je te klikken. Deze bestanden komen nu op het podium te staan onder `Staged Changes`. Je kunt ook alle bestanden in een keer op het podium zetten door naast het kopje `Changes` op het +je te klikken.
        1. Schrijf een nuttige <q>commit message</q>. Dus niet: <q>opdracht: commit</q>, maar zoiets als: <q>feat: lookup port name for device</q>.[^commit message]
        1. Klik op het vinkje om te committen. Gefeliciteerd! {{feesttoeter}} Je hebt je eerste commit gepleegd!

        !!! info "Geen blauw bolletje"
            Zie je geen bolletje verschijnen? Kijk of je het bestand zeker weten hebt opgeslagen. Nog steeds geen blauw bolletje? Ga naar [{{github}} GitHub Dekstop](#__tabbed_2_1) en ga verder met stap 5.

        [^commit message]: Je kunt je commit message opdelen in een titel (of summary) en een beschrijving. Dit doe je dit door een witregel toe te voegen tussen de titel en de beschrijving.
    
    === "check"
        **Checkpunten:**
    
        - [ ] In GitHub Desktop staat onder het `History` tabblad een nieuw commit message.
        - [ ] De commit bevat het bestand waarin je een aanpassing hebt gedaan.
        - [ ] De aanpassing is aangegeven met groen (toegevoegd) en rood (weggehaald).

        **Projecttraject**
    
        - [x] Pyvisa in pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [x] Van bestaande map repository maken
        - [x] Commit 
        - [ ] Push en pull

In GitHub Desktop zie je nu bij history de commit staan, met in een oogopslag alle wijzigingen.

!!! info
    Als je wilt opzoeken hoe iets werkt bij GitHub Desktop, kijk dan in de documentatie: [https://docs.github.com/en/desktop](https://docs.github.com/en/desktop).

Hieronder zie je een aantal voorbeelden van commit messages. De titels zijn kort en krachtig, in de description staat specifieke en uitgebreidere informatie. 

--8<-- "docs/html-snippets/commit.html"

!!! opdracht-basis "Push en pull"
    === "opdracht"
        De repository die je in [opdracht _Repository toevoegen_](#opd:add_repository) hebt aangemaakt bestaat alleen nog maar op de computer. Als de computerkabouters 's nachts langskomen kan het zijn dat de computer daarna is gewist en je alles kwijt bent. Daarom is het fijn om de repository ook in de cloud te hebben op GitHub.com. In GitHub desktop is een knop `Publish repository; Publish this repository to GitHub`, als je daar op drukt kun je nog een andere naam aan de repository geven (dat bepaalt de url op github.com), een description en of de code privé moet zijn. Daarna klik je op de blauwe knop `Publish repository`. Als je nu naar [GitHub.com](https://github.com) gaat zie je bij jouw repositories de zojuist gepubliceerde repository staan. 
    
        Om je wijzigen ook in de cloud op te slaan kun je commits `pushen` naar Github.com met de knop `Push origin`. Als je op een andere computer gaat werken kun je de repository vanuit de cloud naar de computer halen door op `Fetch origin` te klikken en daarna op `Pull origin`.
    === "check"
        **Checkpunten:**
    
        - [ ] De repository staat op github.com bij jouw repositories

        **Projecttraject**
    
        - [x] Pyvisa in pythonscript
        - [x] LED laten branden
        - [x] flashingLED
        - [x] Van bestaande map repository maken
        - [x] Commit 
        - [x] Push en pull


##  GitHub

Om makkelijk je Git repository te delen met vrienden, collega's en de rest van de wereld kan je er voor kiezen om deze op GitHub te zetten. Je kunt dan je commits <q>pushen</q> naar GitHub en wijzigingen die je vrienden hebben gemaakt <q>pullen</q> zodat jij er ook weer aan verder kan werken. Van alle repositories die op GitHub staan én openbaar zijn kun je de broncode clonen en zelf mee aan de slag! Laten we eens een kijkje nemen op GitHub.

!!! opdracht-basis "Tailor"
    Als je nog nooit op GitHub bent geweest dan kunnen de pagina's nogal intimiderend overkomen. De informatiedichtheid is nogal hoog. Na een paar bezoeken weet je meestal wel waar je dingen kunt vinden. David heeft een data-analyse app geschreven dat Tailor heet en dat gebruikt wordt bij natuurkundepractica voor studenten medische natuurwetenschappen (MNW) en science, business and innovation (SBI). Laten we eens kijken wat daar allemaal opstaat.

    1. Zoek de repository {{github}}`/davidfokkema/tailor` op [github.com](https://github.com) op.
    1. Je komt terecht op de hoofdpagina, hier zie je een mappenstructuur met een aantal bestanden. Rechts daarvan staat een korte beschrijving onder het kopje `About`. Een uitgebreidere beschrijving vind je als je naar beneden scrollt onder `Readme`.
    1. Linksboven zie je een aantal tabbladen (code, issues, pull requests, ...), het tabblad `code` is de hoofdpagina met de mappenstructuur. Navigeer door de mappen, wat staat er op regel 14 van {{file}}`plot_tab.py`?
    1. Ga terug naar de hoofdpagina, kijk onder het groen kopje met `code`. Hoeveel commits zijn er gemaakt? Klik op commits en daarna op een commit-message. Hoeveel regels zijn er weggehaald of bijgekomen?
    1. Je kan per bestand bekijken wanneer die is aangepast en wat er is aangepast met de history knop. Ga naar het bestand {{file}}`pyproject.toml` en klik rechtsboven op `History`. Wat is er aangepast in {{file}}`pyproject.toml` bij de commit <q>Release v2.0.0</q>? Je ziet ook welke bestanden nog meer zijn gewijzigd in deze commit, welk bestand is nog meer gewijzigd bij <q>Release v2.0.0</q>?
    1. Ga terug naar de hoofdpagina. Welke versie van Tailor is als laatste gereleased?
    1. Je kent het misschien wel, dat je een app gebruikt maar dat het niet helemaal goed werkt (bug), of je hebt een idee hoe het nog beter kan worden (enhancement). Daarvoor is op GitHub het tabblad `Issues`. Hoeveel bugs zijn er gerapporteerd? En hoeveel enhancements?
    1. Als het jou nu gelukt is om een bug te fixen, of je hebt een super handige feature ontworpen, dan kan je de eigenaren van de repository vragen om jouw code te implementeren door een pull request te sturen. Ga naar het tabblad `Pull requests`, klik op `Closed` en bekijk welke pull requests zijn geïmplementeerd.
    1. Het meest rechter tabblad `Insights` geeft je, tegen alle verwachtingen in, inzicht. Je kan zien door hoeveel mensen er aan gewerkt wordt. Kijk bij `Code frequency`, in welke periode is er het meest aan de code veranderd?
    1. Als je een repository goed/handig/slim/fijn vindt kun je dit aangeven met een ster. Klik daarvoor rechtsboven op star {{star}}.
    1. Dan tot slot die ene, meest in het oogspringende groene `code` knop. Met die knop kan je de repository als zip-bestand downloaden of openen met GitHub desktop.



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

