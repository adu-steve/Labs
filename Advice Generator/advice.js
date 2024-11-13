// Select elements
const adviceTextElement = document.getElementById("advice-text");
const adviceNumberElement = document.getElementById("advice-number");
const loadingIndicator = document.getElementById("loading-indicator");
const errorMessage = document.getElementById("error-message");
const retryButton = document.getElementById("retry-btn");
const fetchAdviceButton = document.getElementById("fetch-advice-btn");

// Fetch Advice API
async function fetchAdvice() {
  // Show loading indicator and hide other messages
  loadingIndicator.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  retryButton.classList.add("hidden");
  fetchAdviceButton.disabled = true;

  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) throw new Error("Failed to fetch advice from server");

    const data = await response.json();
    const advice = data.slip.advice;
    const adviceID = data.slip.id;

    adviceTextElement.textContent = `"${advice}"`;
    adviceNumberElement.textContent = adviceID;
  } catch (error) {
    console.error(error);
    handleError();
  } finally {
    loadingIndicator.classList.add("hidden");
    fetchAdviceButton.disabled = false;
  }
}

// Error handling
function handleError() {
  errorMessage.classList.remove("hidden");
  retryButton.classList.remove("hidden");
  fetchAdviceButton.classList.add("hidden");
}

fetchAdviceButton.addEventListener("click", fetchAdvice);
retryButton.addEventListener("click", fetchAdvice);
