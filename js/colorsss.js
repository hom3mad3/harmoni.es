/*$('.item').click(function(event) {
var bgColor = $(this).css('background-color');
var hsl = hexToHsl(bgColor);
});*/

//This adds a click handler on all the colored items, in which you can retrieve the corresponding HSL values, because in your case you want to work with the hue on the color wheel (hexToHsl isn't native, you have to make it, see http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb and https://gist.github.com/mjijackson/5311256). When you have the hue, you can get the complementary hue (complementaryHue = (hue + 0.5) % 1), which you can transform back to an hex color code. You may also change the saturation or lightness to get dominant colors.

/*If you want that the generated colors are also vegetable colors, then you have to make a sort of dictionary, in order to look up inside. When you generate a color, you search for the "nearest" color of the dictionary.
*/

function Color(name, code) {
this.name = name;
this.code = code;
this.hsl = hexToHsl(code);
}

var colors = [
new Color('Cauli flower', 'F3EBE0'),
new Color('Chick Pea', 'D5B74E'),
];

//function nearestColor(hsl) {

function distance(color) {
var hueDiff = (hsl[0] - color.hsl[0]) % 1;
if (hueDiff > 0.5) // color wheel is periodic
--hueDiff; while (hueDiff < -0.5) ++hueDiff;
return Math.sqrt(Math.pow(hueDiff, 2) + Math.pow(hsl[1] - color.hsl[1], 2) + Math.pow(hsl[2] - color.hsl[2], 2));
}
// search for the nearest color
var nearest = colors[0];
var distanceMin = distance(nearestColor);
for (var i = 1, n = colors.length; i < n; ++i) {
var color = colors[i];
var d = distance(color);
if (d < distanceMin) {
distanceMin = d;
nearestColor = color;
}
}
return nearest;
}
//sort colors and then to add them to your list, so it's easier for you to add new colors later. Although I recommend you to keep the list above sorted by alphabetical order.

colors.sort(function(a, b) {
return a.hsl[0] - b.hsl[0]; // simply sort by hue
});

$.each(colors, function(i, color) {
var cls = color.name.replace(' ', '').toLowerCase();
$('ul.grid').append('<li><div class="item ' + cls + '"><div class="info"><a href="#"><h3>' + color.name + '</h3></a><p>#' + color.code + '</p></div></div></li>');
});

/*Regarding animations, jQuery may help you too, but it's a little bit more difficult. You can call $(element).animate({...}) to animate CSS properties. I see you've used CSS transition to animate colors, that is perfectly valid too. But you will anyway need jQuery to transform your HTML structure from http://micaelarava.com/projects/food/ to http://micaelarava.com/projects/food/grapefruit .

The problem with all of this is the visitor doesn't enable JavaScript, she can't interact with your site, and if you make the automatic ordering like I said above, she won't see anything. In particular, Google disables JavaScript when it indexes pages, so your page won't have a good ranking. Since your site runs under Apache, you should be able to use PHP, but that is more complicated. We'll that once you already managed to make it work with JavaScript.

By the way, I would recommend you this structure, which I find cleaner and leads to a cleaner CSS as well:
*/


//Once again, if you don't understand something, tell me. Good luck, have fun!
