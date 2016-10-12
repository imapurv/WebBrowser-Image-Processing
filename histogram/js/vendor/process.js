function abs(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("contain").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("contain").style.marginLeft = "0";
}
var old=0;
function updateTextInput(val) {
    document.getElementById('textInput').value=val+"%";
    brightness(val-old);
    old=val;
}

//var width = img.naturalWidth; // this will be 300
//var height = img.naturalHeight; // this will be 400
function undo() {
    if(value-1>=0)
    ctx.putImageData(stack.pop(), 0, 0);
    value--;
}
function restore() {
    ctx.putImageData(original, 0, 0);
}
function runner(ctx) {
    stack.push(ctx.getImageData(0, 0, c.width, c.height));
    value++;
    original=ctx.getImageData(0, 0, c.width, c.height);
}
var value=0;
function newImage(url) {
    var img = new Image;
    img.crossOrigin = "";
    img.src = url;
    img.onload = function() {
        c.width = img.naturalWidth;  c.height =  img.naturalHeight;
        //ctx.canvas.width  = window.innerWidth;
       // ctx.canvas.height = window.innerHeight;
        if (c.width  > window.innerWidth)
        {
            c.width  = window.innerWidth;
        }

        if (c.height > window.innerHeight)
        {
            c.height = window.innerHeight;
        }
        ctx.drawImage(img, 0, 0);
        stack.push(ctx.getImageData(0, 0, c.width, c.height));
        value++;
        original=ctx.getImageData(0, 0, c.width, c.height);
    };

}
//var img = new Image();
//img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
function invert() {

    var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;

    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;
        dataTrg[i]     = 255 - dataSrc[i];     // red
        dataTrg[i + 1] = 255 - dataSrc[i + 1]; // green
        dataTrg[i + 2] = 255 - dataSrc[i + 2]; // blue
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    stack.push(idataTrg);
    value++;
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}
function threshold(){
    var srcc= ctx.getImageData(0, 0, c.width, c.height);
    var d =srcc.data;

    for (var i=0; i<d.length; i+=4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        var v = (0.2126*r + 0.7152*g + 0.0722*b >= 150) ? 255 : 0;
        d[i] = d[i+1] = d[i+2] = v
    }
    value++;
    stack.push(srcc);
    ctx.putImageData(srcc, 0, 0);
}
function brightness(val) {
    var tval=parseInt(val);
    var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;

    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;
        dataTrg[i]     +=dataSrc[i]+tval ;     // red
        dataTrg[i + 1] =tval +dataSrc[i + 1]; // green
        dataTrg[i + 2] = tval+ dataSrc[i + 2]; // blue
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    value++;
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    stack.push(idataTrg);
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}
function greyscale() {

    var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;

    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;

        // update target's RGB using the same luma value for all channels
        dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    stack.push(idataTrg);
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
    value++;
}

$( function() {
    $( "#c" ).draggable();
} );

function sharpen(){
    var pixels= ctx.getImageData(0, 0, c.width, c.height);
    //var pixels =srcc.data;


        var weights=[ 0, -1,  0, -1,  5, -1, 0, -1, 0];
        var opaque=0;
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = ctx.getImageData(0, 0, c.width, c.height);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
        for (var x=0; x<w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y*w+x)*4;

            var r=0, g=0, b=0, a=0;
            for (var cy=0; cy<side; cy++) {
                for (var cx=0; cx<side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy*sw+scx)*4;
                        var wt = weights[cy*side+cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff+1] * wt;
                        b += src[srcOff+2] * wt;
                        a += src[srcOff+3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
        }
    }

    ctx.putImageData(output, 0, 0);
}
