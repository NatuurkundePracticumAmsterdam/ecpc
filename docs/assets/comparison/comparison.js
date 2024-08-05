function hoverFunction(id) {
    if (id.includes("python")) {
        target_id = "shell_" + id.split("_")[1];
    } else {
        target_id = "python_" + id.split("_")[1];
    }
    let elem = document.getElementById(id);
    elem.classList.toggle('highlight');
    let target_elem = document.getElementById(target_id);
    target_elem.classList.toggle('highlight');
}