const xs = [];
const ys = [];

function addPoint(e) {
    const click_box = document.getElementById("click_box");
    var rect = click_box.getBoundingClientRect();
    var x = (e.clientX - rect.left - 6) / rect.width * 100;
    var y = (e.clientY - rect.top - 6) / rect.width * 100;

    xs.push(x);
    ys.push(y);

    // console.log(x + ", " + y);

    const datapoint = document.createElement("span");
    datapoint.classList.add("datapoint");

    click_box.appendChild(datapoint);

    datapoint.style.left = x + "%";
    datapoint.style.top = y + "%";

    datapoint.style.zIndex = -1;

    updateCentre();
}

function updateCentre() {
    if (xs.length == 1) {
        const datapoint = document.createElement("span");
        datapoint.classList.add("datapoint");
        datapoint.id = "mean_point";

        const display_box = document.getElementById("display_box");
        display_box.appendChild(datapoint);
    }

    var x = 0;
    var y = 0;
    for (var i = 0; i < xs.length; i++) {
        x += xs[i]/xs.length;
        y += ys[i]/ys.length;
    }

    const meanpoint = document.getElementById("mean_point");
    meanpoint.style.left = x + "%";
    meanpoint.style.top = y + "%";

    console.log(y);
}