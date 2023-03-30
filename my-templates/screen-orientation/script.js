screen.addEventListener('orientationchange', () => {
  console.log(`The orientation of the screen is: ${screen.orientation}`);
  const testEl = document.querySelector('#test');
  testEl.innerHTML = `The orientation of the screen is: ${screen.orientation}`;
});

//document.addEventListener('load')
const testEl = document.querySelector('#test');
testEl.innerHTML = `The orientation of the screen is: ${screen.orientation}`;