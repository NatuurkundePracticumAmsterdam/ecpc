function addPoint(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    console.log(x + ", " + y);
}