// setup timer
var end, start;
start = new Date();

hoverbool = false; // interaction flag
var targetindex = 0; // index for idle animation

// targets for idle animation
const target_list_function_class = ["function_keyword","function_name","function_args","function_instance","function_call","function_input"];
const target_list_function_class_body = ["ext_instancemu4","ext_outputmu4"];
const target_list_shell_script = ["shell_pyvisa","shell_backend","shell_list","shell_printlist","shell_open","shell_onlyopen","shell_opencommand","shell_openname","shell_termchar","shell_CRLF","shell_LF","shell_idn","shell_query","shell_*IDN?","shell_printidn"];

var currentUrl = window.location.href; // get url

// compare two elements by highlighting them
function hoverFunction(id, trigger_bool=true) {
    // find target element from hovered element
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

    // highlight compared elements
    let elem = document.getElementById(id);
    elem.classList.toggle('highlight_hover');
    
    if (currentUrl.includes('classes') & id.includes("ext_")) {
        let target_elem = document.getElementById(target_id);
        target_elem.classList.toggle('highlight');
    } else {
        let elem = document.getElementById(target_id);
        elem.classList.toggle('highlight_hover');
    }
    
    // reset idle animation timeout and disable animation on interaction
    start = new Date();
    if (trigger_bool) {
        hoverbool = !hoverbool;
    }
}

function comparisonIdleAnimation() {
    // disable animation on interaction
    if (hoverbool) {
        start = new Date(); 
    }

    // check if 2 s have passed since previous highlight to start new animation
    end = new Date();
    if (end.getTime() - start.getTime() >= 1000) {
        if (currentUrl.includes('classes')) {
            // highlight next compared elements in list for 2 s
            hover_target = target_list_function_class[targetindex % 6];
            hoverFunction(hover_target);
            setTimeout(hoverFunction, 2500, hover_target);
            
            hover_target = target_list_function_class_body[targetindex % 2];
            hoverFunction(hover_target, false);
            setTimeout(hoverFunction, 2000, hover_target, false);

            targetindex += 1;
        } else if (currentUrl.includes('communicatie')) {
            // highlight next compared elements in list for 2 s
            hover_target = target_list_shell_script[targetindex % 15];
            hoverFunction(hover_target);
            setTimeout(hoverFunction, 3000, hover_target);

            targetindex += 1;
        }
    }
}

// check if animation can play every 0.1 s
setInterval(comparisonIdleAnimation, 100);