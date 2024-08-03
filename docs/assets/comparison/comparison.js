let end, start;

start = new Date();
hoverbool = false;
targetbool = false;

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
    } else if (id.includes("1b") || id.includes("4")) {
        elem.classList.toggle('highlight_hover');
    } else {
        elem.classList.toggle('highlight');
    }
    let target_elem = document.getElementById(target_id);
    target_elem.classList.toggle('highlight');
    
    start = new Date();
    hoverbool = !hoverbool;
}

function comparisonIdleAnimation() {
    if (hoverbool) {
        start = new Date(); 
    }
    end = new Date();
    if (end.getTime() - start.getTime() >= 3000) {
        if (targetbool) {
            hoverFunction('ext_instancemu4');
            setTimeout(hoverFunction, 1000, 'ext_instancemu4');
            targetbool = !targetbool;
        } else {
            hoverFunction('ext_outputmu4');
            setTimeout(hoverFunction, 1000, 'ext_outputmu4');
            targetbool = !targetbool;
        }
    }
}

setInterval(comparisonIdleAnimation, 100);