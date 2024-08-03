function hoverFunction(id) {
    if (id.includes("python")) {
        target_id = "shell_" + id.split("_")[1];
    } else if (id.includes("shell")) {
        target_id = "python_" + id.split("_")[1];
    } else if (id.includes("class")) {
        target_id = "function_" + id.split("_")[1];
    } else if (id.includes("function")) {
        target_id = "class_" + id.split("_")[1];
    } else if (id.includes("int")) {
        target_id = "ext_" + id.split("_")[1];
    } else if (id.includes("ext")) {
        target_id = "int_" + id.split("_")[1];
    }
    let elem = document.getElementById(id);
    if (id.includes("1a")) {
        elem.classList.toggle('text_colour');
    } else if (id.includes("1b")) {
        elem.classList.toggle('highlight_hover');
    } else {
        elem.classList.toggle('highlight');
    }
    let target_elem = document.getElementById(target_id);
    target_elem.classList.toggle('highlight');
}