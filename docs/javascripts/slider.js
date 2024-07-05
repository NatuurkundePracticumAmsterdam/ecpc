function syncSliders(slider_id) {
    let value = document.getElementById(slider_id).value;
    if (slider_id == "continuous_slider") {
        document.getElementById('discrete_slider').value = value * document.getElementById('discrete_slider').max/100;
    } else {
        document.getElementById('continuous_slider').value = value * 100/document.getElementById('discrete_slider').max;
    }
}

function updateMax() {
    document.getElementById('discrete_slider').max = document.getElementById('max_discrete').value;
    syncSliders('continuous_slider');
}

function syncSlidersBox(slider_id) {
    let value = document.getElementById(slider_id).value;
    if (slider_id == "continuous_slider_box") {
        document.getElementById('discrete_slider_box').value = value * document.getElementById('discrete_slider_box').max/100;
    } else {
        document.getElementById('continuous_slider_box').value = value * 100/document.getElementById('discrete_slider_box').max;
    }
}

function updateMaxBox() {
    document.getElementById('discrete_slider_box').max = document.getElementById('max_discrete_box').value;
    syncSlidersBox('continuous_slider_box');
}