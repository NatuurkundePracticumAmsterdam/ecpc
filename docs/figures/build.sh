for file in *.tex; do
    pdflatex $file
    pdf2svg ${file%.tex}.pdf ${file%.tex}.svg
done
