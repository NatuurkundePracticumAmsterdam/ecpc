for file in *.tex; do
    pdflatex $file
    pdf2svg ${file%.tex}.pdf ${file%.tex}.svg
done

# compile figure on pages
pdf2svg p-n-overgang.pdf p-n-overgang_p2.svg 2
pdf2svg layout-schematic.pdf layout-schematic_p2.svg 2
pdf2svg layout-schematic.pdf layout-schematic_p3.svg 3
pdf2svg layout-schematic.pdf layout-schematic_p4.svg 4