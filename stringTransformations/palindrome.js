// //**isPalindrome */
function isPalindrome(str) {
  splitString = str.split("").reverse().join("");
  if (splitString === str) {
    return true;
  }
  return false;
}
console.log(isPalindrome("ama"));
