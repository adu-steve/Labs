function countWords(str) {
  const wordsArray = str.trim().split(/\s+/);

  return wordsArray.length;
}

const exampleString = "This is an example string.";
console.log(countWords(exampleString));
