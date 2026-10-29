for file in *.tex; do
    pdflatex $file
done

for file in *.pdf; do
    pdf2svg $file ${file%.pdf}.svg
done

# compile figures on extra pages
pdf2svg adc-process.pdf adc-process_p2.svg 2
pdf2svg p-n-overgang.pdf p-n-overgang_p2.svg 2
pdf2svg layout-schematic.pdf layout-schematic_p2.svg 2
pdf2svg layout-schematic.pdf layout-schematic_p3.svg 3
pdf2svg layout-schematic.pdf layout-schematic_p4.svg 4
