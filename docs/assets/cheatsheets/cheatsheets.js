const header = document.getElementsByClassName("md-header__ellipsis")[0];

const wrapper_div = document.createElement("div");
wrapper_div.classList.add('dropdown_wrapper');

const icon_div = document.createElement("div");
icon_div.classList.add('dropdown_container');
icon_div.innerHTML = '<svg class="dropdown_box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"/></svg>';
icon_div.setAttribute("onclick","showCheatsheet();");

wrapper_div.appendChild(icon_div);

cheatsheet_div = document.createElement("div");
cheatsheet_div.classList.add("cheatsheet");
cheatsheet_div.classList.add("invisible");
cheatsheet_div.id = "cheatsheet_div";

// const img = document.createElement("img");
// img.src = "../assets/cheatsheets/placeholder.png";
// img.style.width = "100%";
// // img.style.left = "-60rem";
// cheatsheet_div.appendChild(img);

cheatsheet_div.innerHTML = '<iframe width="100%" height="100%" id="myHtml" src="http://127.0.0.1:8000/cheatsheets/"></iframe>'

wrapper_div.appendChild(cheatsheet_div);

header.appendChild(wrapper_div);

function showCheatsheet() {
    elem = document.getElementById("cheatsheet_div");
    elem.classList.toggle("invisible");
}