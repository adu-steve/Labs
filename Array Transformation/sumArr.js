var arr1 = [-200, -163, -26, -4, 0, 7, 76];
var sum = 0;
var evens = (x) => {
  for (let n of x) {
    sum = sum + n;
  }
  return sum;
};
console.log(evens(arr1));
