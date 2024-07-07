filenames = ["test.out", "text.pdf", "manual.pdf", "files.zip"]
pdfs = [name for name in filenames if name.endswith(".pdf")]
print(f"{pdfs=}")