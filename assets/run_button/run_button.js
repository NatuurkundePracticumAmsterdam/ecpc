function runScript(name) {
    let elements = document.getElementsByName(name)
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle("invisible")
    }
}