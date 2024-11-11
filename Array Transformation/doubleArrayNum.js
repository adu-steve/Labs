/***double numbers in an array */
let numbers = [8, 12, 5, 2, 5, 7];
let doubledNumbers = [];

function doubled(arr) {
  for (var i = 0; i < arr.length; i++) {
    let numToDouble = arr[i];
    let num = numToDouble * 2;
    doubledNumbers.push(num);
  }
  return doubledNumbers;
}

let collectionNumbers = {
  originalNumbers: numbers,
  doubledNumbers: doubled(numbers),
};

console.log(collectionNumbers);
