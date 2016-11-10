function abs(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("contain").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("contain").style.marginLeft = "0";
}
var old=0;
var oldd=0;

function updateTextInput(val) {
  //  document.getElementById('textInput').value=val+"%";
    brightness(val);

}
function updateTextInputd(val) {
    //  document.getElementById('textInput').value=val+"%";
    brightnessd(val);

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

    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url

    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
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
    window.urlf=url;
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

    var idataSrc = original, // original
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
   // stack.push(idataTrg);
    //value++;
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}
function threshold(){
    var srcc= original;
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
    var idataSrc = original, // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;
    //alert(tval+" "+histType);
    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;
        if(histType.value=='red') {
            dataTrg[i] = dataSrc[i] + tval;
            red1=tval;
        }// red
        else
            dataTrg[i]=dataSrc[i];
        if(histType.value=='green') {
            dataTrg[i + 1] = dataSrc[i + 1]+tval;
            green1=tval;
        }// green
        else
            dataTrg[i + 1] = dataSrc[i + 1];
        if(histType.value=='blue') {
            dataTrg[i + 2] = dataSrc[i + 2] + tval;
            blue1=tval;
        }// blue
        else
            dataTrg[i + 2] = dataSrc[i + 2];
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    //value++;
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    //stack.push(idataTrg);
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}
function brightnessd(val) {

    var tval=parseInt(val);
    tval=255-tval;
    var idataSrc = original, // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;

    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;

        if(histType.value=='red') {
            dataTrg[i] = dataSrc[i] + tval;
            red2=255-tval;
        }// red
        else
            dataTrg[i]=dataSrc[i];
        if(histType.value=='green') {
            dataTrg[i + 1] = dataSrc[i + 1]+tval;
            green2=255-tval;
        }// green
        else
            dataTrg[i + 1] = dataSrc[i + 1];
        if(histType.value=='blue') {
            dataTrg[i + 2] = dataSrc[i + 2] + tval;
            blue2=255-tval;
        }// blue
        else
            dataTrg[i + 2] = dataSrc[i + 2];
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    //value++;
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    //stack.push(idataTrg);
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

function loadImage(){


    var a,b,cc;
    if($('#one').val()=="One"){
        a=0;
    }
    else if($('#one').val()=="Two"){
        a=1;
    }
    else if($('#one').val()=="Three"){
        a=2;
    }
    if($('#two').val()=="One"){
       b=0;
    }
    else if($('#two').val()=="Two"){
        b=1;
    }
    else if($('#two').val()=="Three"){
        b=2;
    }
    if($('#three').val()=="One"){
        cc=0;
    }
    else if($('#three').val()=="Two"){
        cc=1;
    }
    else if($('#three').val()=="Three"){
        cc=2;
    }
   // alert($('#one').val());
    //alert(a+" "+b+" "+cc);
    var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;

    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;

            dataTrg[i]     =dataSrc[i+a] ;     // red

            dataTrg[i+1]     =dataSrc[i + b] ;

            dataTrg[i+2]     =dataSrc[i + cc] ;

        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image

    ctx.putImageData(idataTrg, 0, 0);

    $('#bandmodal').modal('hide');
    calcHist("rgb");
    calcHist("red");


}
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
function linear_stretch() {

    //alert("sdfsdf");
    var idataSrc = original, // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;
    var inlo1 = 255,inlo2 = 255,inlo3 = 255;
    var inup1 = 0,inup2 = 0,inup3 = 0;

    for(; i < len; i += 4) {
        if(inlo1 > dataSrc[i] ){
            inlo1 = dataSrc[i];
        }
        if(inlo2 > dataSrc[i+1] ){
            inlo2 = dataSrc[i+1];
        }
        if(inlo3 > dataSrc[i+2] ){
            inlo3 = dataSrc[i+2];
        }
        if(inup1 < dataSrc[i] ){
            inup1 = dataSrc[i];
        }
        if(inup2 < dataSrc[i+1] ){
            inup2 = dataSrc[i+1];
        }
        if(inup3 < dataSrc[i+2] ){
            inup3 = dataSrc[i+2];
        }
    }
   // console.log(inlo1+" "+inlo2+" "+inlo3);
   // console.log(inup1+" "+inup2+" "+inup3);
    // convert by iterating over each pixel each representing RGBA
    i=0;
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;
        //console.log("here");
        dataTrg[i] = (dataSrc[i] - inlo1) * ((255)/(inup1 - inlo1)) + 0;// red
        dataTrg[i + 1] = (dataSrc[i + 1] - inlo2) * ((255)/(inup2 - inlo2)) + 0; // green
        dataTrg[i + 2] = (dataSrc[i + 2] - inlo3) * ((255)/(inup3 - inlo3)) + 0; // blue
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];

        //console.log(dataTrg[i]+" : ");
    }

    // put back luma data so we can save it as image
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    original=ctx.getImageData(0, 0, c.width, c.height);
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}

Math.log10 = Math.log10 || function(x) {
        return Math.log(x) * Math.LOG10E;
    };

function log_stretch() {

    var cons1, cons2, cons3;
    var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;
    var inup1 = 0,inup2 = 0,inup3 = 0;

    for(; i < len; i += 4) {
        if(inup1 < dataSrc[i] ){
            inup1 = dataSrc[i];
        }
        if(inup2 < dataSrc[i+1] ){
            inup2 = dataSrc[i+1];
        }
        if(inup3 < dataSrc[i+2] ){
            inup3 = dataSrc[i+2];
        }
    }
    cons1 = 255/ (Math.log10(1 + inup1));
    cons2 = 255/ (Math.log10(1 + inup2));
    cons3 = 255/ (Math.log10(1 + inup3));
    console.log("Log constants : "+cons1 + " " +cons2+" "+cons3);
    // convert by iterating over each pixel each representing RGBA
    i=0;
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;
        dataTrg[i] = cons1 * Math.log10(dataSrc[i] + 1);// red
        dataTrg[i + 1] = cons2 * Math.log10(dataSrc[i + 1] + 1); // green
        dataTrg[i + 2] = cons3 * Math.log10(dataSrc[i + 2] + 1); // blue
        //console.log(dataTrg[i]+" : "+dataTrg[i+1]+" : "+dataTrg[i+2]+" : ");
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    original=ctx.getImageData(0, 0, c.width, c.height);
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}

function root_stretch() {

    var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;
    var inup1 = 0,inup2 = 0,inup3 = 0;
    var cons1, cons2, cons3;
    for(; i < len; i += 4) {
        if(inup1 < dataSrc[i] ){
            inup1 = dataSrc[i];
        }
        if(inup2 < dataSrc[i+1] ){
            inup2 = dataSrc[i+1];
        }
        if(inup3 < dataSrc[i+2] ){
            inup3 = dataSrc[i+2];
        }
    }
    cons1 = 255/ (Math.sqrt(inup1));
    cons2 = 255/ (Math.sqrt(inup2));
    cons3 = 255/ (Math.sqrt(inup3));
    console.log("Log constants : "+cons1 + " " +cons2+" "+cons3);
    // convert by iterating over each pixel each representing RGBA
    i=0;
    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;
        dataTrg[i] = cons1 * Math.sqrt(dataSrc[i]);// red
        dataTrg[i + 1] = cons2 * Math.sqrt(dataSrc[i + 1]); // green
        dataTrg[i + 2] = cons3 * Math.sqrt(dataSrc[i + 2]); // blue
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url

    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}

function histogram_equilization() {

    var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
        idataTrg = ctx.createImageData(c.width, c.height),    // empty data
        dataSrc = idataSrc.data,                              // reference the data itself
        dataTrg = idataTrg.data,
        len = dataSrc.length, i = 0, luma;
    //pmf
    var step=4; var val;
    var redc=[];
    var greenc=[];
    var bluec=[];
    i=0;

    for(; i < 255; i++) {

        redc[i]=0;
        greenc[i]=0;
        bluec[i]=0;
    }
    i=0;
    for (var i = 0, n = imgData.length; i < n; i+= step) {


        if(imgData[i] in redc){
            redc[imgData[i]]++;
        }
        else
            redc[imgData[i]]=1;
        if(imgData[i+1] in bluec){
            bluec[imgData[i+1]]++;
        }
        else
            bluec[imgData[i+1]]=1;
        if(imgData[i+2] in greenc){
            greenc[imgData[i+2]]++;
        }
        else
            greenc[imgData[i+2]]=1;

    }
    var cdf=[];
    var pmf=[];
    i=0;
    var total=len/4;
    for(; i < 255; i++) {

        //console.log(i+" : "+redc[i]+" "+bluec[i]+" "+greenc[i]);
        if(i==0){

            continue;
        }
        redc[i]+=redc[i-1];
        bluec[i]+=bluec[i-1];
        greenc[i]+=greenc[i-1];
        console.log(i+" : "+redc[i]+" "+bluec[i]+" "+greenc[i]);
    }
    i=0;
    total=total/4/255;
    console.log("total : "+total);
    for(; i < 255; i++) {

        redc[i]=redc[i]/total;
        bluec[i]=bluec[i]/total;
        greenc[i]=greenc[i]/total;
        console.log(i+" : "+redc[i]+" "+bluec[i]+" "+greenc[i]);
        //
    }

    //cdf

    i=0;
    // convert by iterating over each pixel each representing RGBA
    for(; i < len; i += 4) {
        // calculate luma, here using rec601
        //luma = dataSrc[i] * 0.299 + dataSrc[i+1] * 0.587 + dataSrc[i+2] * 0.114;
        dataTrg[i] = redc[i];// red
        dataTrg[i + 1] = bluec[i]; // green
        dataTrg[i + 2] =  greenc[i]; // blue
        // update target's RGB using the same luma value for all channels
        //dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
        dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
    }

    // put back luma data so we can save it as image
    ctx.putImageData(idataTrg, 0, 0);
    //demo.src = c.toDataURL();                                 // set demo result's src url
    //stack.push(idataTrg);
   // value++;
    // restore backup data
    //ctx.putImageData(idataSrc, 0, 0);
}
