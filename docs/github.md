# Versiebeheer met GitHub

## Versiebeheer

Zodra je scripts wat ingewikkelder worden begin je tegen hele praktische problemen aan te lopen. Het werkt _nu_, maar je wilt een flinke aanpassing gaan doen. Werkt het straks nog wel? Hoe ingewikkelder het script, hoe ingewikkelder de wijzigingen en hoe minder het vertrouwen dat het in één keer gaat lukken. Misschien heb je wel eens de ervaring gehad dat het maar niet wil werken en dat je niet goed weet wat je precies had veranderd ten opzichte van toen het nog _wel_ werkte. Veel mensen hebben de neiging om naast een :fontawesome-regular-file-code:`script.py` een :fontawesome-regular-file-code:`script-v1.py`, :fontawesome-regular-file-code:`script-v2.py`, enz. aan te maken. Soms zelfs een :fontawesome-regular-file-code:`script-eindversie.py` en met wat pech dan toch nog een :fontawesome-regular-file-code:`script-eindversie-definitief.py`. Niet heel fijn. Je ziet dan nog steeds niet goed wat er veranderd is (dat blijft naast elkaar leggen en zoeken) en je map loopt vol met overbodige scripts. Dit kan beter\ldots\ met versiebeheer!

Versiebeheer (Engels: _version control_) stelt je in staat om af en toe een momentopname te maken van al je bestanden in een bepaalde map, inclusief alle submappen. Dit doe je niet na iedere regel code, maar bijvoorbeeld wel als je een stukje code af hebt en getest hebt dat het werkt. Zo'n momentopname heet een _commit_. Hoe vaak je commit is aan jou; maar wacht niet te lang -- dan is het geen versiebeheer meer.

Je versiebeheersysteem geeft ondertussen duidelijk al je wijzigingen weer ten opzichte van de laatste commit. Ook kun je de wijzigingen tussen oudere versies bekijken. Alles is relatief: je kunt zien wat er veranderd is tussen twee weken terug en gisteren, of gisteren en vandaag; iedere commit kun je vergelijken met willekeurig iedere andere commit. Heb je iets verprutst en wil je een oude versie terughalen? Prima! Commit die ook, dan kun je zelfs dat weer terugdraaien later. Je verliest nooit meer je werk. En stukmaken mag!


### Git

Ruim tien jaar geleden werden er nog vele concurrerende systemen gebruikt. Die tijd is grotendeels voorbij. Eén van de nieuwste systemen, Git,\footnote{https://initialcommit.com/blog/How-Did-Git-Get-Its-Name} wordt tegenwoordig door bijna iedereen gebruikt of ondersteund. Git is ontwikkeld door Linus Torvalds als alternatief voor het commerciële systeem dat gebruikt werd voor de ontwikkeling van de Linux kernel \cite{git}. Het begon als een zeer eenvoudig -- en volkomen ongebruiksvriendelijk -- programma. Later is het in een veel gebruiksvriendelijker jasje gestoken.

Git werkt in principe via de command-line. Je geeft opdrachten in de map waar je broncode staat: toevoegen van wijzigingen aan de _staging area_, bekijken van de meest recente wijzigingen, committen van je code, teruggaan en werken met oudere versies, aanmaken van _branches_,\footnote{Een branch is een splitsing in je versiegeschiedenis. Je kunt het gebruiken om over een langere tijd een grote wijziging uit te testen terwijl je af en toe heen en weer springt tussen je main branch en de nieuwe branch. Commits in de nieuwe branch blijven gescheiden. Later kun je ervoor kiezen om de wijzigingen in de nieuwe branch te _mergen_ met je main branch, maar dat hoeft niet.} je wijzigingen uploaden naar internet, enz. Het geheel van map met broncode en versiegeschiedenis wordt een _repository_ genoemd.

In deze cursus zullen we gebruik maken van een grafische applicatie die eenvoudiger werkt. Je kunt daarna -- als je dat wilt -- de stap maken naar de command-line waarmee je nog veel meer mogelijkheden tot je beschikking krijgt. Voor meer informatie over Git en het gebruik via de command-line, zie \textcite{gitpro}.


### GitHub

Git is een _distributed version control system (DVCS)_ wat wil zeggen dat er geen centrale server hoeft te zijn. Je kunt volledig offline werken in je eigen repository en je wijzigingen af en toe committen. Als je daar zin in hebt kun je je wijzigingen naar een collega sturen (_pushen_) of je kunt een collega toestemming geven om de wijzigingen op te halen (_pullen_). Je bouwt dan aan één grote versiegeschiedenis met kopieën op meerdere computers. Je bent zo volledig onafhankelijk van bedrijven die servers in de lucht houden of bepalen wie er wel en niet toegang krijgt. Dat is fijn, maar een centrale plek om repositories neer te zetten heeft weer het grote voordeel dat je de wereld kunt laten zien wat voor moois je gemaakt hebt én dat het samenwerking wel vermakkelijkt. Als iedereen uit je team regelmatig commits pusht naar een centrale server en daar vandaan ook ophaalt dan is iedereen altijd up-to-date.

Er zijn tegenwoordig veel websites die een plek bieden voor Git repositories. De bekendste zijn GitHub, GitLab, Bitbucket en SourceForge. GitHub, aangekocht door Microsoft, is op dit moment het bekendste en grootste platform. Veel bekende softwareprojecten vinden daar hun thuis.

Wij gaan werken met GitHub, je moet dan wel een (gratis) account aanmaken. Als student kom je ook nog in aanmerking voor een educatiekorting op een pro-account. Je betaalt dan nog steeds niets.

\begin{minopdracht}
    Ga naar \url{https://github.com/} en klik rechtsboven op `Sign Up`. Maak een account aan onder je _privé-emailadres_. Op deze manier blijf je toegang houden tot je account ook nadat je afgestudeerd bent.
\end{minopdracht}


### GitHub Desktop
Om het programmeurs makkelijker te maken met GitHub te werken heeft GitHub een desktop applicatie ontwikkeld.

\begin{minopdracht}
    \label{opd:add_repository}
    Maak op de volgende manier een repository voor je Pythonscripts:
    \begin{enumerate}
        \item Maak -- bijvoorbeeld vanuit Visual Studio Code -- een map \folderpath{Oefenopdrachten} en zet daarin alle python-bestandjes die je hebt gemaakt om te oefenen in \chref{ch:gesprek} en \chref{ch:mvc}.
        \item Open GitHub desktop en log in met je GitHub account.
        \item \menu{File > Add Local Repository}. Kies de map \folderpath{Oefenopdrachten}.
        \item Je kunt de repository niet toevoegen omdat de map weliswaar bestaat, maar nog geen bestaande repository is. Er verschijnt een waarschuwing met een stukje kleine blauwe tekst. Klik op `create a repository`.
        \item Vink `Initialize this repository with a README` aan.
        \item Kies bij `Git ignore` voor <q>Python</q>.\footnote{De Git Ignore zorgt ervoor dat allerlei hulpbestanden van Python niet bewaard
                  worden als commit. Alleen je eigen code wordt dan bewaard}
        \item En bevestig dan met de blauwe knop `Create Repository`.
        \item Als je nu op de history klikt dan zie je dat er een `Initial commit` is met wat `git`-bestanden en de Pythonscripts die je in de map hebt gezet. Vanaf nu staat \folderpath{Oefenopdrachten} in versiebeheer en houdt Git je wijzigingen bij.
    \end{enumerate}
    Het is ook mogelijk om een repository aan te maken via \menu{File > New Repository}. Gebruik dit vóór de start van een project om een nieuwe map te maken met een lege Git repository.
\end{minopdracht}

### Commit
Alle wijzigingen aan bestanden in de repository kun je vanaf nu bijhouden door regelmatig een commit te maken. Met een commit maak je als het ware een snapshot van alle bestanden en hang je daar een labeltje aan.
Dit kan in GitHub Desktop, maar ook direct vanuit Visual Studio Code. Elke commit geef je een begeleidend schrijven mee. Je hoopt dat jij, maar ook je collega, na het lezen van het berichtje snel begrijpt wat er veranderd is én waarom. Wanneer je bepaalde wijzigingen ongedaan wilt maken, kan je snel vinden bij welke commit je dan moet zijn. En als je dan je applicatie gaat uitbrengen op Github kun je de commit messages gebruiken om snel op te sommen wat de nieuwste versie van jou app kan!

\begin{minopdracht}
    \label{opd:commit}
    Voer de volgende opdrachten uit:
    \begin{enumerate}
        \item In Visual Studio Code, ga naar \menu{File > Open Folder} en kies de map waar je in \opdref{opd:add_repository} een repository hebt aangemaakt.
        \item Open één van je Pythonscripts.
        \item Type een stukje code erbij -- bijvoorbeeld een print-statement -- en haal ergens anders iets weg. Bewaar het bestand.
        \item Links verschijnt een blauw bolletje bij `Source Control` \faCodeBranch\ die laat weten dat er wijzigingen zijn ten opzichte van de vorige commit. Klik op `Source Control`.
        \item Onder `Changes` staat een lijst met bestanden waar wijzigingen in aan zijn gebracht. Kies welke bestanden je wilt committen door rechts op het +je te klikken. Deze bestanden komen nu op het podium te staan onder `Staged Changes`. Je kunt ook alle bestanden in een keer op het podium zetten door naast het kopje `Changes` op het +je te klikken.
        \item Schrijf een nuttige <q>commit message</q>. Dus niet: <q>\opdref{opd:commit}</q>, maar: <q>feat: search for port name to open communication with device</q>.\footnote{Je kunt je commit message opdelen in een titel (of summary) en een beschrijving. In Visual Studio Code, doe je dit door een witregel toe te voegen tussen de titel en de beschrijving.}
        \item Klik op het vinkje om te committen. Gefeliciteerd! Je hebt je eerste commit gepleegd, vanaf nu kun je zonder angst dingen stuk maken want je kan altijd terug naar hoe het was
    \end{enumerate}
\end{minopdracht}

In GitHub Desktop zie je nu bij history de commit staan, met in een oogopslag alle wijzigingen.

\begin{info}
    Als je wilt opzoeken hoe iets werkt bij GitHub Desktop, kijk dan in de documentatie: \url{https://docs.github.com/en/desktop}.
\end{info}

\begin{inleveropdracht}[Pythondaq: github]
    Dan is het nu tijd om de bestanden die je hebt gemaakt voor pythondaq in \chref{ch:mvc} met Git in versiebeheer te gaan houden.
    \begin{enumerate}
        \item Maak een map \folderpath{pythondaq} en kopieer daarin alle python-bestanden die je gemaakt hebt voor het diode-experiment. Let er op dat je deze map _niet_ in een andere repository aanmaakt, maar daarbuiten. Overleg eventueel over een handige plek.
        \item Maak van de map \folderpath{pythondaq} een repository.
        \item Gooi oude bestanden weg en zorg dat je 3 bestanden over houdt: een model :fontawesome-regular-file-code:`diode\_experiment.py`, een view :fontawesome-regular-file-code:`view.py` en een controller :fontawesome-regular-file-code:`arduino\_device.py`.
        \item Commit!
        \item Ruim, indien nodig, je code op. Functies die je al 3 keer hebt herschreven en daarvoor steeds gekopieerd heb, maar wel als comment hebt laten staan, die kunnen nu ook weg. Verwijder stukjes commentaar die niet meer van toepassing zijn, enz.
        \item Commit!
    \end{enumerate}
\end{inleveropdracht}

## Uitdaging: GitHub
Om makkelijk je Git repository te delen met vrienden, collega's en de rest van de wereld kan je er voor kiezen om deze op GitHub te zetten. Je kunt dan je commits <q>pushen</q> naar GitHub en wijzigingen die je vrienden hebben gemaakt <q>pullen</q> zodat jij er ook weer aan verder kan werken. Van alle repositories die op GitHub staan én openbaar zijn kun je de broncode clonen en zelf mee aan de slag! Laten we eens een kijkje nemen op GitHub.

\begin{bonusopdracht}
    Als je nog nooit op GitHub bent geweest dan kunnen de pagina's nogal intimiderend overkomen. De informatiedichtheid is nogal hoog. Na een paar bezoeken weet je meestal wel waar je dingen kunt vinden. David heeft een data-analyse app geschreven dat Tailor heet en dat gebruikt wordt bij natuurkundepractica voor studenten medische natuurwetenschappen (MNW) en science, business and innovation (SBI). Laten we eens kijken wat daar allemaal opstaat.
    \begin{enumerate}
        \item Zoek de repository \githubrepo{/davidfokkema/tailor} op GitHub op.
        \item Je komt terecht op de hoofdpagina, hier zie je een mappenstructuur met een aantal bestanden. Rechts daarvan staat een korte beschrijving onder het kopje `About`. Een uitgebreidere beschrijving vind je als je naar beneden scrollt onder `Readme`.
        \item Linksboven zie je een aantal tabbladen (code, issues, pull requests, ...), het tabblad `code` is de hoofdpagina met de mappenstructuur. Navigeer door de mappen, wat staat er op regel 15 van :fontawesome-regular-file-code:`plot\_tab.py`?
        \item Ga terug naar de hoofdpagina, kijk onder het groen kopje met `code`. Hoeveel commits zijn er gemaakt? Klik op commits en daarna op een commit-message. Hoeveel regels zijn er weggehaald of bijgekomen?
        \item Je kan per bestand bekijken wanneer die is aangepast en wat er is aangepast met de history knop. Ga naar het bestand :fontawesome-regular-file-code:`pyproject.toml` en klik rechtsboven op `History`. Wat is er aangepast in :fontawesome-regular-file-code:`pyproject.toml` bij de commit <q>Release v1.5.1</q>? Je ziet ook welke bestanden nog meer zijn gewijzigd in deze commit, welk bestand is nog meer gewijzigd bij <q>Release v1.5.1</q>?
        \item Ga terug naar de hoofdpagina. Welke versie van Tailor is als laatste gereleased?
        \item Je kent het misschien wel, dat je een app gebruikt maar dat het niet helemaal goed werkt (bug), of je hebt een idee hoe het nog beter kan worden (enhancement). Daarvoor is op GitHub het tabblad `Issues`. Hoeveel bugs zijn er gerapporteerd? En hoeveel enhancements?
        \item Als het jou nu gelukt is om een bug te fixen, of je hebt een super handige feature ontworpen, dan kan je de eigenaren van de repository vragen om jouw code te implementeren door een pull request te sturen. Ga naar het tabblad `Pull requests`, klik op `Closed` en bekijk welke pull requests zijn geïmplementeerd.
        \item Het meest rechter tabblad `Insights` geeft je, tegen alle verwachtingen in, inzicht. Je kan zien door hoeveel mensen er aan gewerkt wordt. Kijk bij `Code frequency`, in welke periode is er het meest aan de code veranderd?
        \item Als je een repository goed/handig/slim/fijn vindt kun je dit aangeven met een ster. Klik daarvoor rechtsboven op star \faStar.
        \item Dan tot slot die ene, meest in het oogspringende groene `code` knop. Met die knop kan je de repository als zip-bestand downloaden of openen met GitHub desktop.
    \end{enumerate}
\end{bonusopdracht}

\begin{bonusopdracht}
    \label{opd:clone_repository}
    Clone de LMfit-py repository op GitHub:
    \begin{enumerate}
        \item Zoek de repository op GitHub op (`lmfit/lmfit-py`)
        \item Kies \menu{Code > Open with GitHub Desktop}
        \item Kies zelf een map op je harde schijf om de repository te bewaren.
        \item Open Visual Studio Code en open de repository met \menu{File > Open Folder}.\footnote{Als je vergeten bent waar je de repository ook alweer bewaard had kun je met \menu{Repository > Show in Finder} de folder openen.} Als GitHub Desktop de geïnstalleerde VS Code herkent kan dat direct vanuit GitHub Desktop met \menu{Repository > Open in Visual Studio Code}.
        \item Open \path{examples/README.txt}. Verander in de eerste paragraaf `Below are examples` in `Below are different examples` en sla het bestand op.
        \item Schakel naar de GitHub Desktop applicatie en bekijk de wijziging.
        \item Linksonder kun je een korte beschrijving van je wijziging intypen en druk dan op de blauwe `Commit`-knop.
        \item Schakel, rechtsboven, naar `History`. Bovenaan staat jouw wijziging. Daaronder kun je alle wijzigingen van anderen bekijken.
    \end{enumerate}
\end{bonusopdracht}

Aangezien je geen schrijfrechten hebt voor LMfit kun je niet kiezen voor `Push origin` -- de knop die rechtsboven verschijnt. Met die knop <q>duw</q> je je wijzigingen naar GitHub zodat iedereen ze kan zien. Dat is mooi, maar je mag niet zomaar de repository van iemand anders wijzigen.

\begin{bonusopdracht}
    In eerdere opdrachten heb je repositories op de computer aangemaakt. Vanuit GitHub Desktop kan je een repository publiceren op GitHub. Commits kun je vervolgens pullen en pushen van en naar Github.
    \begin{enumerate}
        \item Publiceer een repository op Github -- bijvoorbeeld je oefenopdrachten of je `pythondaq`-repository. Verander iets in je code, commit en kijk hoe je dat naar GitHub kunt Pushen.
        \item Ga naar Github.com en verander daar iets in de code, commit en kijk hoe je dat naar de computer kan Pullen.
    \end{enumerate}
\end{bonusopdracht}

\begin{bonusopdracht}
    Tot nu toe heb je Visual Studio Code of GitHub Desktop gebruikt om te committen. Maar je kan Git ook bedienen via de terminal. De mogelijkheden van Git zijn in de terminal ook veel groter dan in de grafische applicaties die we gebruikt hebben.
    \begin{enumerate}
        \item Open een repository in Visual Studio Code
        \item Gebruik de terminal in Visual Studio Code en bekijk de commit geschiedenis met het commando `git log`. Scroll door de commit messages met spatie.
        \item Zoek via \url{https://initialcommit.com/blog/Git-Cheat-Sheet-Beginner} het commando om een commit toe te voegen. Wijzig iets in je code en commit via de terminal.
        \item Dit waren twee dingen wat met GitHub Desktop ook kon, snuffel op het internet om te zien wat je met Git nog meer kunt.
    \end{enumerate}
\end{bonusopdracht}

## Uitdaging: Branches
Soms wil je je code flink onder handen nemen of iets heel nieuws eraan toevoegen. Terwijl je bezig bent ga je natuurlijk eerst van alles stuk maken voordat je het weer werkend hebt gekregen. Maar ondertussen kan je oude functionaliteit van je code niet gebruiken. Of je bent samen met een vriend aan een package bezig en om de haverklap werkt jouw stukje code niet meer omdat ergens anders de code verbouwd wordt. Dan is het handig dat je vanaf het punt dat je code werkt een zijweg kan inslaan. Daarom zijn branches uitgevonden. Je kunt vanuit Github Desktop, vanuit Visual Studio Code en natuurlijk via de terminal een branch aanmaken.
\begin{bonusopdracht}
    \begin{itemize}
        \item Open een repository naar keuze en maak een nieuwe branch aan.
        \item Maak een aantal wijzigingen en commit.
        \item Ga terug naar de main branch.
        \item Merch de nieuwe branch in de main branch.
    \end{itemize}
\end{bonusopdracht}