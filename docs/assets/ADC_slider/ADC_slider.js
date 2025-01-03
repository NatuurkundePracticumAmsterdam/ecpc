function syncSliders(slider_id) {
    let value = document.getElementById(slider_id).value;
    if (slider_id == "continuous_slider") {
        document.getElementById('discrete_slider').value = value * document.getElementById('discrete_slider').max/100;
    } else {
        document.getElementById('continuous_slider').value = value * 100/document.getElementById('discrete_slider').max;
    }
    document.getElementById('discrete_slider').dispatchEvent(new Event('update_bubble', { bubbles: true }));
    document.getElementById('continuous_slider').dispatchEvent(new Event('update_bubble', { bubbles: true }));
}

function updateMax() {
    document.getElementById('discrete_slider').max = document.getElementById('max_discrete_slider').value;
    syncSliders('continuous_slider');
}

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
  
    if(bubble.classList.contains('bubble_below')) {
      bubble.innerHTML = val;
    } else {
      bubble.innerHTML = parseFloat(String(val * 3.3 / 100)).toFixed(3);
    }
  
    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal * 0.85}% + (${14.5 - newVal * 0.27 + 31.25}px)`;
    if(bubble.classList.contains('bubble_below')) {
      bubble.style.top = 2.3*range.offsetHeight + 'px';
    } else {
      bubble.style.top = -2.1*range.offsetHeight + 'px';
    }
  }


document.addEventListener('DOMContentLoaded', function() {
    updateMax();
    const allRanges = document.querySelectorAll(".range-wrap");
    allRanges.forEach(wrap => {
      const range = wrap.querySelector(".range");
      const bubble = wrap.querySelector(".bubble");

      range.addEventListener("update_bubble", () => {
        setBubble(range, bubble);
      });
      setBubble(range, bubble);
    });
}, false);