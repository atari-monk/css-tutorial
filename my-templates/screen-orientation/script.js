//https://stackoverflow.com/questions/1649086/detect-rotation-of-android-phone-in-the-browser-with-javascript
const testEl = document.querySelector('#test');

const supportsOrientationChange = 'onorientationchange' in window,
  orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';
console.log('support:', supportsOrientationChange);

window.addEventListener(
  orientationEvent,
  function () {
    testEl.innerHTML = `The orientation of the screen is: ${window.orientation}, width: ${screen.width}`;
  },
  false
);
