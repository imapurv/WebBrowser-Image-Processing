function updateRGB(pixel, n, m, value1, value2) {
    "use strict";
    value2 = 255 - value2;
    var i, j, val = value2 - value1;
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if (pixel[i][j] + val <= 0) {
                pixel[i][j] = 0;
            } else if (pixel[i][j] + val >= 255) {
                pixel[i][j] = 255;
            }
        }
    }
    return pixel;
}