const array = [1,2,3]; 

function notPure(a, num) {
   a.push(num);
  return a;
}

function pure(a, num) {
  return [...a, num];
}

console.log('not pure:', notPure(array, 4));
console.log('array:', array);
console.log('pure:',pure(array, 5));
console.log('array:', array);