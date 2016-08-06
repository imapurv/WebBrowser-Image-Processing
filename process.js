/**
 * Created by Dell on 04-08-2016.
 */
function draw() {
    var img = new Image();
    img.src = 'images.jpg';
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvasData = ctx.getImageData(0, 0, 800, 480);
    ctx.fillStyle = "#FF0000";
    //ctx.fillRect(0,0,150,75);
    //drawPixel(1, 1, 152, 154, 100, 1);
    ctx.fillRect(10,10,5,5);
    //updateCanvas();
    //img.onload = function () {
    //    ctx.drawImage(img, 0, 0);
    //    img.style.display = 'none';
    //};
    var color = document.getElementById('color');
    
    function drawPixel (x, y, r, g, b, a) {
        var index = (x + y * canvasWidth) * 4;

        canvasData.data[index + 0] = r;
        canvasData.data[index + 1] = g;
        canvasData.data[index + 2] = b;
        canvasData.data[index + 3] = a;
    }
    function pick(event) {
        var x = event.layerX;
        var y = event.layerY;
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ',' + data[1] +
            ',' + data[2] + ',' + data[3] + ')';
        color.style.background = rgba;
        color.textContent = rgba;
        drawPixel(x,y,data[0],data[1],data[2],data[3]);
        updateCanvas();
    }
    function updateCanvas() {
        ctx.putImageData(canvasData, 0, 0);
    }
    canvas.addEventListener('mousemove', pick);
}