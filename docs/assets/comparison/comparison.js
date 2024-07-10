function hoverFunction(id) {
    if (id.includes("python")) {
        target_id = "shell_" + id.split("_")[1];
    } else if (id.includes("class")) {
        target_id = "function_" + id.split("_")[1];
    } else if (id.includes("function")) {
        target_id = "class_" + id.split("_")[1];
    } else {
        target_id = "python_" + id.split("_")[1];
    }
    let elem = document.getElementById(target_id);
    elem.classList.toggle('highlight');
}