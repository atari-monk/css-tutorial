//https://stackoverflow.com/questions/1649086/detect-rotation-of-android-phone-in-the-browser-with-javascript
const testEl = document.querySelector('#test');

screen.orientation.onchange = function () {
  // logs 'portrait' or 'landscape'
  console.log(screen.orientation.type.match(/\w+/)[0]);
  testEl.innerHTML = `The orientation of the screen is: ${screen.orientation.angle}, width: ${screen.width}`;
};