/*function calmean(pixel, n, m) {
    "use strict";
    var i, j, mean = 0;
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            mean += pixel[i][j];
        }
    }
    mean = mean / (n * m);
    return mean;
}

function calvariance(pixel, n, m) {
    "use strict";
    var i, j, variance, sum = 0, mean = calmean(pixel, n, m);
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            sum += Math.pow(mean - pixel[i][j]);
        }
    }
    variance = sum / ((n * m) - 1);
    return variance;
}

function calstddevi(pixel, n, m) {
    "use strict";
    var stddevi = Math.sqrt(calvariance(pixel, n, m));
    return stddevi;
}*/
