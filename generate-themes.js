/* generate json with themes
 */

var themes = [];

var colors = [
  'black',
  'white',
  'blue',
  'dark-blue',
  'turquoise',
  'red',
  'orange',
  'green',
  'dark-green',
  'pink',
  'purple'
];

var themesWithColors = [
  'theme-topline',
  'theme-simple',
  'theme-corners',
  'theme-half',
  'theme-border',
  'theme-line',
  'theme-third'
];

themesWithColors.forEach(function(theme) {

  colors.forEach(function(color) {

    if(
      (theme === 'theme-half' ||
      theme === 'theme-border' ||
      theme === 'theme-third' ||
      theme === 'theme-line'||
      theme === 'theme-topline') &&
      color === 'white'
    ) {

    } else {
      themes.push({
        name: theme + '--' + color
      });
    }

  });

});

[].push.apply(themes, [
  {
    name: 'theme-diagonals'
  }
]);

// add the picture themes at the top
[].unshift.apply(themes, [
  { name: 'theme-picture--space-full' },
  { name: 'theme-picture--food-full' },
  { name: 'theme-picture--school-full' },
  { name: 'theme-picture--restaurant-full' },
  { name: 'theme-picture--stardust-full' },
  { name: 'theme-picture--space-half' },
  { name: 'theme-picture--space-half-black' },
  { name: 'theme-picture--space-top' },
  { name: 'theme-picture--space-top-black' },
  { name: 'theme-picture--city-half' },
  { name: 'theme-picture--city-half-black' },
  { name: 'theme-picture--city-top' },
  { name: 'theme-picture--city-top-black' }
]);

// write json file
var fs = require('fs');
fs.writeFile('./themes.json', JSON.stringify({ list: themes }), function(err) {
  if(err) {
    return console.log(err);
  }
});


