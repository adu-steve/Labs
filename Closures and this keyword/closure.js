function createTimer(duration, elementId) {
  let remainingTime = duration;

  const element = document.getElementById(elementId);

  const updateTimer = () => {
    if (remainingTime > 0) {
      element.textContent = `The time remaining is: ${remainingTime} seconds`;
      remainingTime--;
    } else {
      element.textContent = "Time is up!";
      console.log("Timer has reached zero.");
      clearInterval(timerInterval);
    }
  };
  const divElement = document.getElementById("timerId");
  const bindDivElement = updateTimer.bind(divElement);

  const timerInterval = setInterval(bindDivElement, 1000);
}

createTimer(10, "timerId");
