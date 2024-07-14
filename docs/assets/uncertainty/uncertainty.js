const xs = [];
const ys = [];

function addPoint(e) {
    // get coordinates of mouseclick
    const click_box = document.getElementById("click_box");
    var rect = click_box.getBoundingClientRect();
    var x = (e.clientX - rect.left - 5) / rect.width * 100;
    var y = (e.clientY - rect.top - 5) / rect.width * 100;

    // save coordinates
    xs.push(x);
    ys.push(y);

    // create new datapoint
    const datapoint = document.createElement("span");
    datapoint.classList.add("datapoint");

    // add datapoint to div
    click_box.appendChild(datapoint);

    // place datapoint at correct coordinates
    datapoint.style.left = x + "%";
    datapoint.style.top = y + "%";

    // let datapoint be behind border to prevent clipping edge
    datapoint.style.zIndex = -1;

    // update mean and errorbars view box
    updateCentre();
}

function updateCentre() {
    // create and append mean point to view box if it does not exist yet
    if (xs.length == 1) {
        const datapoint = document.createElement("span");
        datapoint.classList.add("datapoint");
        datapoint.id = "mean_point";

        const display_box = document.getElementById("display_box");
        display_box.appendChild(datapoint);
    }

    // calculate mean
    var x = 0;
    var y = 0;
    for (var i = 0; i < xs.length; i++) {
        x += xs[i]/xs.length;
        y += ys[i]/ys.length;
    }

    // calculate standard error
    var x_square_sum = 0;
    var y_square_sum = 0;

    for (var i = 0; i < xs.length; i++) {
        x_square_sum += Math.pow((xs[i] - x), 2);
        y_square_sum += Math.pow((ys[i] - y), 2);
    }

    var dx = Math.pow(x_square_sum, 0.5) / xs.length
    var dy = Math.pow(y_square_sum, 0.5) / ys.length

    // get dimensions of view box
    const display_box = document.getElementById("display_box");
    var rect = display_box.getBoundingClientRect();

    // set errorbars
    const xbar = document.getElementById("xbar");
    const ybar = document.getElementById("ybar");

    xbar.x1.baseVal.value = x - dx + 5 / rect.width * 100;
    xbar.x2.baseVal.value = x + dx + 5 / rect.width * 100;
    xbar.y1.baseVal.value = y + 5 / rect.width * 100;
    xbar.y2.baseVal.value = y + 5 / rect.width * 100;

    ybar.x1.baseVal.value = x + 5 / rect.width * 100;
    ybar.x2.baseVal.value = x + 5 / rect.width * 100;
    ybar.y1.baseVal.value = y - dy + 5 / rect.width * 100;
    ybar.y2.baseVal.value = y + dy + 5 / rect.width * 100;

    // set mean point
    const meanpoint = document.getElementById("mean_point");
    meanpoint.style.left = x + "%";
    meanpoint.style.top = y + "%";
}