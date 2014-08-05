/*$('.item').click(function(event) {
var bgColor = $(this).css('background-color');
var hsl = hexToHsl(bgColor);
});*/

$(function(){ //execute once the dom has been loaded
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

function Color(name, code) {
this.name = name;
this.code = code;
}

var colors = [
new Color('Cauli flower', 'F3EBE0'),
new Color('Chick Pea', 'D5B74E'),
new Color('Tomato', 'CE2107'),
];


colors.sort(function(color1, color2) {
  return rgbToHSL(color1.code).h - rgbToHSL(color2.code).h; 
});

$.each(colors, function(i, color) {
	var hsl = rgbToHSL(color.code);
	$('ul.grid').append('<li><div class="item" style="background-color:#'+ color.code + ' "><div class="info"><a href="#"><h3>' + color.name + ' (' + hsl.h + ')' + '</h3></a><p>#' + color.code + '</p></div></div></li>');
});

});