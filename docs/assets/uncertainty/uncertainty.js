function addPoint(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    console.log(x + ", " + y);

    const datapoint = document.createElement("span");
    datapoint.classList.add("datapoint");

    const parent = document.getElementById("click_box");
    parent.appendChild(datapoint);
    
    datapoint.style.left = x + 'px';
    datapoint.style.top = y + 'px';
}