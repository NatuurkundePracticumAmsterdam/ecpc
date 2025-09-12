document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll("img[data-message]");

    images.forEach(image => {
        let message = document.createElement("div");
        message.innerText = image.getAttribute("data-message");
        message.style.display = "none";
        message.style.position = "absolute";
        message.style.backgroundColor = "white";
        message.style.padding = "10px";
        message.style.border = "2px solid rgb(0, 173, 220)";
        message.style.borderRadius = "5px";
        message.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)";
        message.style.zIndex = "1000";
        message.style.whiteSpace = "normal";  // Zorgt ervoor dat de tekst wrapt
        message.style.overflowWrap = "break-word"; // Moderne manier om woorden af te breken
        message.style.maxWidth = "200px";  // Limiteer de breedte van de box zodat het wrapt


        document.body.appendChild(message);

        image.addEventListener("click", function (event) {
            if (message.style.display === "none") {
                message.style.left = event.pageX + "px";
                message.style.top = event.pageY + "px";
                message.style.display = "block";
            } else {
                message.style.display = "none";
            }
        });
    });
});