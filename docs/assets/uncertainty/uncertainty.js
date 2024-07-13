function addPoint(e) {
    const click_box = document.getElementById("click_box");
    var rect = click_box.getBoundingClientRect();
    var x = (e.clientX - rect.left - 6) / rect.width * 100;
    var y = (e.clientY - rect.top - 6) / rect.width * 100;
    console.log(x + ", " + y);

    const datapoint = document.createElement("span");
    datapoint.classList.add("datapoint");

    click_box.appendChild(datapoint);

    datapoint.style.left = x + "%";
    datapoint.style.top = y + "%";

    datapoint.style.zIndex = -1;
}