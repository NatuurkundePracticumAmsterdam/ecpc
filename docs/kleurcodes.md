# Kleurcodes voor weerstanden
\label{ch:kleurcodes}

\colorlet{Rred}{red!80!black}
\colorlet{Rbrown}{brown!80!black}

\newcommand{\drawband}[4][0pt]{
\draw[line width=7pt, color=#3] ({#2 * .9}, -1) -- +(0, 2);
\draw[thick, <-, >={Stealth[round]}] ({#2 * .9}, 1cm + 3pt) -- +(0, 1cm + #1) node[above, align=center] {#4};
}

\vspace{-.5cm}

\begin{center}
  \begin{tikzpicture}[scale=.6]
    \draw[line width=5pt] (0, 0) -- +(-2, 0) (6, 0) -- +(2, 0);
    \fill[LightSteelBlue] (0, -1) rectangle (6, 1);

    \drawband{1}{Rred}{1}
    \drawband{2}{Rred}{2}
    \drawband{3}{black}{3}
    \drawband[2em]{4}{black}{vermenigvuldigings-\\factor}
    \drawband{5.1 / .9}{Rbrown}{tolerantie}

    \draw[ultra thick] (0, -1) rectangle (6, 1);
  \end{tikzpicture}
\end{center}
\begin{center}
  \def\arraystretch{1.3}
  \begin{tabular}{lS[table-number-alignment=center]S[retain-zero-exponent]S[table-number-alignment=center]}
    \toprule
    {Kleur} & {Cijferwaarde} & {Vermenigvuldigingsfactor} & {Tolerantie [\unit{\percent}]} \\
    \midrule
    Zilver  & {---}          & e-2                        & 10                             \\
    Goud    & {---}          & e-1                        & 5                              \\
    Zwart   & 0              & e0                         & {---}                          \\
    Bruin   & 1              & e1                         & 1                              \\
    Rood    & 2              & e2                         & 2                              \\
    Oranje  & 3              & e3                         & 0.05                           \\
    Geel    & 4              & e4                         & 0.02                           \\
    Groen   & 5              & e5                         & 0.5                            \\
    Blauw   & 6              & e6                         & 0.25                           \\
    Paars   & 7              & e7                         & 0.1                            \\
    Grijs   & 8              & e8                         & 0.01                           \\
    Wit     & 9              & e9                         & {---}                          \\
    \bottomrule
  \end{tabular}
\end{center}

\noindent
Helaas is het niet altijd mogelijk om de linkerkant van de weerstand van de rechterkant te onderscheiden. In dat geval moet je de weerstand beide kanten oplezen en vergelijken met je materialenlijst of de overige weerstanden om zeker te weten dat je de goede hebt gevonden. Bovenstaande weerstand heeft de waarde $\qty[retain-zero-exponent]{220}{\ohm} \pm \qty{1}{\percent}$, en _niet_ de waarde $\qty{100e2}{\ohm} \pm \qty{2}{\percent}$.