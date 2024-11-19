const slider = document.getElementById("slider");
document.getElementById("lengthValue").textContent = slider.value;

function updateSliderBackground() {
  const max = slider.max;
  const value = slider.value;
  const percentage = (value / max) * 100;

  lengthValue.textContent = slider.value;

  slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
}
slider.addEventListener("input", updateSliderBackground);

// Get references to DOM elements
const lengthValue = document.getElementById("lengthValue");
const passwordDisplay = document.querySelector(".passwordDiv h4");
if (!passwordDisplay) {
  console.error("Password display element not found!");
}
const copyButton = document.getElementById("copy");
const strengthStatus = document.querySelector(".strength h2");
const strengthBoxes = document.querySelectorAll(".strength .box");
const generateButton = document.querySelector(".generateBtn");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

// Helper function to get a random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate a random password
function generatePassword() {
  const length = parseInt(slider.value);
  const useUppercase = uppercaseCheckbox.checked;
  const useLowercase = lowercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSymbols = symbolsCheckbox.checked;

  // Password character sets
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_-+=<>?/";

  let characters = "";
  if (useLowercase) characters += lowercase;
  if (useUppercase) characters += uppercase;
  if (useNumbers) characters += numbers;
  if (useSymbols) characters += symbols;

  // Generate the password based on selected character sets
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters[getRandomInt(0, characters.length - 1)];
  }

  // Update the password display with the generated password
  if (passwordDisplay) {
    passwordDisplay.textContent = password;
  } else {
    console.error(
      "Password display element not found, can't display password."
    );
  }

  // Update strength based on password length and content
  updateStrength(password);
}

// Function to update strength based on the password length
function updateStrength(password) {
  // Reset all strength boxes to default
  strengthBoxes.forEach((box) => (box.style.backgroundColor = "#ddd"));

  if (!password || password.length === 0) {
    passwordDisplay.style.color = "#24232c"; // Color when no password is generated
    strengthStatus.textContent = "";
    return;
  }

  const length = password.length;

  // Determine strength and update the UI
  if (length >= 1 && length <= 5) {
    strengthStatus.textContent = "TOO WEAK!";
    strengthBoxes[0].style.backgroundColor = "#F64A4A";
  } else if (length >= 6 && length <= 10) {
    strengthStatus.textContent = "WEAK";
    strengthBoxes[0].style.backgroundColor = "#FB7C58";
    strengthBoxes[1].style.backgroundColor = "#FB7C58";
  } else if (length >= 11 && length <= 15) {
    strengthStatus.textContent = "MEDIUM";
    strengthBoxes[0].style.backgroundColor = "#F8CD65";
    strengthBoxes[1].style.backgroundColor = "#F8CD65";
    strengthBoxes[2].style.backgroundColor = "#F8CD65";
  } else if (length >= 16 && length <= 20) {
    strengthStatus.textContent = "STRONG";
    strengthBoxes[0].style.backgroundColor = "#A4FFAF";
    strengthBoxes[1].style.backgroundColor = "#A4FFAF";
    strengthBoxes[2].style.backgroundColor = "#A4FFAF";
    strengthBoxes[3].style.backgroundColor = "#A4FFAF";
  }
}

// Function to display "Copied!" when the copy button is clicked
function showCopiedMessage() {
  if (passwordDisplay.textContent === "" || slider.value === 0) {
    // If no password is generated or slider is at 0, do nothing
    return;
  }

  // Change button text to "Copied!" with color #A4FFAF
  copyButton.innerHTML = "<h5>Copied!</h5>";
  copyButton.style.color = "#A4FFAF";

  // Reset the button text after 1.5 seconds
  setTimeout(() => {
    copyButton.innerHTML =
      '<img src="./assets/images/icon-copy.svg" alt="Copy Icon" class="icon-copy" />';
    copyButton.style.color = ""; // Reset color back to default
  }, 1500); // Reset after 1.5 seconds
}

// Event listeners
slider.addEventListener("input", () => {
  lengthValue.textContent = slider.value;
  if (slider.value === 0) {
    passwordDisplay.style.color = "#fff"; // Color when slider is 0
    strengthStatus.textContent = ""; // Hide strength status
  }
});

generateButton.addEventListener("click", () => {
  generatePassword(); // Generate password when the "Generate" button is clicked
});

copyButton.addEventListener("click", showCopiedMessage); // Show copied message on click
