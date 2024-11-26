class PasswordGenerator {
  constructor() {
    this.slider = document.getElementById("slider");
    this.lengthValue = document.getElementById("lengthValue");
    this.passwordDisplay = document.getElementById("passwordDisplay");
    this.copyButton = document.getElementById("copy");
    this.strengthStatus = document.querySelector(".strength h2");
    this.strengthBoxes = document.querySelectorAll(".strength .box");
    this.generateButton = document.querySelector(".generateBtn");
    this.uppercaseCheckbox = document.getElementById("uppercase");
    this.lowercaseCheckbox = document.getElementById("lowercase");
    this.numbersCheckbox = document.getElementById("numbers");
    this.symbolsCheckbox = document.getElementById("symbols");
    this.error = document.getElementById("error");
    this.copied = document.querySelector(".copied");
    this.copyIcon = document.querySelector(".icon-copy");
    this.initialize();
  }

  initialize() {
    this.slider.addEventListener("input", () => {
      this.lengthValue.textContent = this.slider.value;
      if (this.slider.value === 0) {
        this.passwordDisplay.style.color = "#E6E5EA"; // Color when slider is 0
        this.strengthStatus.textContent = "";
      }
      this.updateSliderBackground(); // Update slider background color based on the slider value
    });

    this.generateButton.addEventListener("click", () => {
      this.generatePassword(); // Generate password when the "Generate" button is clicked
    });

    this.copyButton.addEventListener("click", () => {
      this.copied.style.display = "inline-block";
      if (this.passwordDisplay.textContent === "P4$5W0rD!") {
        this.copied.style.display = "none";
      } else {
        navigator.clipboard
          .writeText(this.passwordDisplay.textContent)
          .then(() => this.showCopiedMessage())
          .catch((err) => console.error("Failed to copy: ", err))
          .finally(() => {
            setTimeout(() => {
              this.copied.style.display = "none";
            }, 1500);
          });
      }
    });

    this.copyButton.addEventListener("mouseenter", () => {
      if (this.passwordDisplay.textContent === "P4$5W0rD!") {
        this.copyIcon.style.cursor = "not-allowed";
      } else {
        this.copyIcon.style.cursor = "pointer";
      }
    });
  }
  updateSliderBackground() {
    const max = this.slider.max;
    const value = this.slider.value;
    const percentage = (value / max) * 100;

    this.slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
  }
  generatePassword() {
    // Clear any existing error messages
    this.error.style.display = "none";
    this.error.textContent = "";

    const length = parseInt(this.slider.value);
    const useUppercase = this.uppercaseCheckbox.checked;
    const useLowercase = this.lowercaseCheckbox.checked;
    const useNumbers = this.numbersCheckbox.checked;
    const useSymbols = this.symbolsCheckbox.checked;

    // Check if at least one character type is selected
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
      this.error.style.display = "block";
      this.error.textContent = "Please select at least one character type!";
      this.passwordDisplay.textContent = "P4$5W0rD!";
      this.passwordDisplay.style.color = "#817D92";
      return;
    }

    // Check if a valid length is selected
    if (length === 0) {
      this.error.style.display = "inline-block";
      this.error.textContent = "Please select a valid character length!";
      this.passwordDisplay.textContent = "P4$5W0rD!";
      this.passwordDisplay.style.color = "#817D92";
      return;
    }

    // Password character sets
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_-+=<>?";

    let characters = "";
    if (useLowercase) characters += lowercase;
    if (useUppercase) characters += uppercase;
    if (useNumbers) characters += numbers;
    if (useSymbols) characters += symbols;

    // Generate the password based on selected character sets
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters[this.getRandomInt(0, characters.length - 1)];
    }

    this.passwordDisplay.textContent = password;
    this.passwordDisplay.style.color = "#E6E5EA";

    this.updateStrength(password);
  }

  updateStrength(password) {
    // Reset all strength boxes to default
    this.strengthBoxes.forEach(
      (box) => (box.style.backgroundColor = "#18171F")
    );

    if (!password || password.length === 0) {
      this.strengthStatus.textContent = "";
      return;
    }

    const length = password.length;
    let characterTypes = 0;

    // Check for different character types
    if (/[a-z]/.test(password)) characterTypes++;
    if (/[A-Z]/.test(password)) characterTypes++;
    if (/[0-9]/.test(password)) characterTypes++;
    if (/[^a-zA-Z0-9]/.test(password)) characterTypes++;

    // Determine strength based on the rubric
    if (length < 8) {
      this.strengthStatus.textContent = "TOO WEAK!";
      this.strengthBoxes[0].style.backgroundColor = "#F64A4A";
      this.strengthBoxes[0].style.border = "none";
    } else if (length >= 8 && characterTypes === 1) {
      this.strengthStatus.textContent = "WEAK";
      this.strengthBoxes[0].style.backgroundColor = "#FB7C58";
      this.strengthBoxes[1].style.backgroundColor = "#FB7C58";
      this.strengthBoxes[0].style.border = "none";
      this.strengthBoxes[1].style.border = "none";
    } else if (length >= 8 && characterTypes >= 2) {
      this.strengthStatus.textContent = "MEDIUM";
      this.strengthBoxes[0].style.backgroundColor = "#F8CD65";
      this.strengthBoxes[1].style.backgroundColor = "#F8CD65";
      this.strengthBoxes[2].style.backgroundColor = "#F8CD65";
      this.strengthBoxes[0].style.border = "none";
      this.strengthBoxes[1].style.border = "none";
      this.strengthBoxes[2].style.border = "none";
    }
    if (length >= 12 && characterTypes >= 3) {
      this.strengthStatus.textContent = "STRONG";
      this.strengthBoxes[0].style.backgroundColor = "#A4FFAF";
      this.strengthBoxes[1].style.backgroundColor = "#A4FFAF";
      this.strengthBoxes[2].style.backgroundColor = "#A4FFAF";
      this.strengthBoxes[3].style.backgroundColor = "#A4FFAF";
      this.strengthBoxes[0].style.border = "none";
      this.strengthBoxes[1].style.border = "none";
      this.strengthBoxes[2].style.border = "none";
      this.strengthBoxes[3].style.border = "none";
    }
  }

  showCopiedMessage() {
    if (this.passwordDisplay.textContent === "" || this.slider.value === 0) {
      return;
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Create an instance of the PasswordGenerator class
const passwordGenerator = new PasswordGenerator();
