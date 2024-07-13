function addPoint(e) {
    const click_box = document.getElementById("click_box");
    var rect = click_box.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    console.log(x + ", " + y);

    const datapoint = document.createElement("span");
    datapoint.classList.add("datapoint");

    click_box.appendChild(datapoint);

    datapoint.style.left = x - 6 + 'px';
    datapoint.style.top = y - 6 + 'px';

    datapoint.style.zIndex = -1;
}