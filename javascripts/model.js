function printOrbit() {
    const modelViewer = document.getElementById("model");
    const orbit = modelViewer.getCameraOrbit();
    console.log(orbit.toString());
}