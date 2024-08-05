var end, start;

start = new Date();
hoverbool = false;
var targetindex = 0;

const target_list_function_class = ["function_keyword","function_name","function_args","function_instance","function_call","function_input"];
const target_list_function_class_body = ["ext_instancemu4","ext_outputmu4"];

const currentUrl = window.location.href;

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
    elem.classList.toggle('highlight_hover');
    
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
        if (currentUrl.includes('classes')) {
            hover_target = target_list_function_class[targetindex % 6];
            hoverFunction(hover_target);
            setTimeout(hoverFunction, 1000, hover_target);
            
            hover_target = target_list_function_class_body[targetindex % 2];
            hoverFunction(hover_target);
            setTimeout(hoverFunction, 1000, hover_target);

            targetindex += 1;
        }
    }
}

setInterval(comparisonIdleAnimation, 100);