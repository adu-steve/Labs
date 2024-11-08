/***double numbers in an array */
var numbers = [8, 12, 5, 2, 5, 7];
var doubledNumbers = [];

function doubled(arr) {
  for (var i = 0; i < arr.length; i++) {
    var dub = arr[i];
    var num = dub * 2;
    doubledNumbers.push(num);
  }
  return doubledNumbers;
}

var collectionNumbers = {
  originalNumbers: numbers,
  doubledNumbers: doubled(numbers),
};

console.log(collectionNumbers);
