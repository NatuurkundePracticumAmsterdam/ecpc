for file in *.tex; do
    pdflatex $file
    pdf2svg ${file%.tex}.pdf ${file%.tex}.svg
done

# compile figure on page 2
pdf2svg p-n-overgang.pdf p-n-overgang_p2.svg 2
