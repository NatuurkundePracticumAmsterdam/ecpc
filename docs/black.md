# Black / Ruff

<q>Code wordt veel vaker gelezen dan geschreven,</q> is een veel geciteerd gezegde onder programmeurs. Je schrijft je code en zit vervolgens uren te puzzelen om een fout te vinden of hoe je de code het beste kunt uitbreiden. Je zoekt op internet naar voorbeeldcode, je helpt een medestudent of vraagt die om hulp. Heel vaak dus lees je niet je eigen code, maar die _van iemand anders_. Is dat relevant? Ja! Want die code ziet er anders uit. Iedereen programmeert toch op zijn eigen manier. Het scheelt enorm als de code er tenminste grotendeels hetzelfde uitziet. Het kost je dan minder energie om te lezen. Daarom ook dat de artikelen in wetenschappelijke tijdschriften bijvoorbeeld er allemaal hetzelfde uitzien en de auteur niet de vrijheid krijgt om zélf lettertypes te kiezen. Net zo goed hebben grote organisaties vaak hun eigen _coding style_ ontwikkeld waar alle werknemers zich zoveel mogelijk aan moeten houden.

Python heeft een eigen style guide die je vooral eens door moet lezen.[@pep8] Google heeft ook een hele mooie, met duidelijke voorbeelden.[@google_style_guide]

Fijn dat je code consistenter wordt, maar het moet nu ook weer niet zo zijn dat je uren kwijt bent met de style guides bestuderen of twijfelen waar je een regel code precies moet afbreken. Wel of niet een enter? Om daar vanaf te zijn zijn er verschillende pakketten die je code automatisch aanpassen aan de standaard. Als je de instelling **Editor: Format On Save** aan zet (staat standaard uit) dan wordt je code aangepast zodra je je bestand opslaat. Black is zo'n formatter en heeft een `eigen mening'. Als je je daar bij neerlegt hoef je bijna niet meer na te denken over hoe je je code precies vormgeeft. De Black website zegt[@black]:

<q>
  By using Black, you agree to cede control over minutiae of hand-formatting. In return, Black gives you speed, determinism, and freedom from pycodestyle nagging about formatting. You will save time and mental energy for more important matters.
</q>

Black en de veel snellere variant Ruff zijn tegenwoordig immens populair en in Visual Studio Code kun je ze automatisch gebruiken door de juiste extensie te installeren. De code in deze handleiding is geformat met Black/Ruff. In Visual Studio Code, ga naar **File** en dan naar **Preferences > Settings > Editor: Format On Save** en vink die _aan_. Je code wordt dan altijd netjes gemaakt zodra je je Pythonbestand bewaart.

De volgende code:

``` py
s1 = 'Hello'
s2 = "World"
values = [1,2,3,4,5]

f = a * x ** 2 + b * x + c
g = a*x +b
h = A*np.sin(2*pi*f*t+phi) + A2*np.sin(2*pi*f2*t+phi2) + A3*np.sin(2*pi*f3*t+phi3)
```

wordt door Black of Ruff omgezet in:

``` py
s1 = "Hello"
s2 = "World"
values = [1, 2, 3, 4, 5]

f = a * x**2 + b * x + c
g = a * x + b
h = (
    A * np.sin(2 * pi * f * t + phi)
    + A2 * np.sin(2 * pi * f2 * t + phi2)
    + A3 * np.sin(2 * pi * f3 * t + phi3)
)
```

