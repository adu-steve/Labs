// ***Capitalize string***

function capitalizeString(str) {
  firstLetter = str.slice(0, 1);
  words = str.slice(1);
  return firstLetter.toUpperCase() + words;
}
console.log(capitalizeString("stephen"));
