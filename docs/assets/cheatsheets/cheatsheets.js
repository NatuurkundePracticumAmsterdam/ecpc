const header = document.getElementsByClassName("md-header__ellipsis")[0]

// create new datapoint
const div = document.createElement("div")
div.classList.add('dropdown_container')

const img = document.createElement("img");
img.src = "../figures/ECPC_logo_simple.svg"
img.classList.add('dropdown_box');
div.appendChild(img);

// add datapoint to div
header.appendChild(div);