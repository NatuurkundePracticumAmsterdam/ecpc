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