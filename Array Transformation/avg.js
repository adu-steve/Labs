let arr1 = [-200, -163, -26, -4, 0, 7, 76, 10];
let sum = 0;
let evens = (x) => {
  for (let n of x) {
    sum = sum + n;
  }
  average = sum / arr1.length;
  return average;
};
console.log(evens(arr1));
