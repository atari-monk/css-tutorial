//https://www.w3schools.com/css/css3_variables_javascript.asp
var r = document.querySelector(':root');

function myFunction_get() {
  var rs = getComputedStyle(r);
  console.log(
    'The value of --font-color is: ' + rs.getPropertyValue('--font-color')
  );
}

function myFunction_set() {
  r.style.setProperty('--font-color', 'lightblue');
}
myFunction_get();
myFunction_set();
myFunction_get();
