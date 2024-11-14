class Clock {
  constructor(format = 24) {
    this.format = format;
    this.alarmTime = null;
  }

  getTime() {
    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
  }

  getFormattedTime() {
    const hours = this.format === 12 ? this.hours % 12 || 12 : this.hours;
    const amPm = this.format === 12 ? (this.hours >= 12 ? " PM" : " AM") : "";
    return `${String(hours).padStart(2, "0")}:${String(this.minutes).padStart(
      2,
      "0"
    )}:${String(this.seconds).padStart(2, "0")}${amPm}`;
  }

  setAlarm(hour, minute) {
    this.alarmTime = { hour, minute };
    alert(`Alarm set for ${hour}:${minute}`);
  }

  checkAlarm() {
    if (this.alarmTime) {
      const now = new Date();
      if (
        now.getHours() === this.alarmTime.hour &&
        now.getMinutes() === this.alarmTime.minute
      ) {
        alert("Alarm ringing!");
        this.alarmTime = null; // Reset alarm after it rings
      }
    }
  }

  toggleFormat() {
    this.format = this.format === 24 ? 12 : 24;
  }

  startClock() {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    this.getTime();
    document.getElementById("clock").innerText = this.getFormattedTime();
    this.checkAlarm();
  }
}

// Initialize Clock
const myClock = new Clock();
myClock.startClock();

// Event Listeners
document.getElementById("format-toggle").addEventListener("change", () => {
  myClock.toggleFormat();
  myClock.updateClock();
});

document.getElementById("set-alarm").addEventListener("click", () => {
  const hour = parseInt(document.getElementById("alarm-hour").value, 10);
  const minute = parseInt(document.getElementById("alarm-minute").value, 10);

  if (!isNaN(hour) && !isNaN(minute)) {
    myClock.setAlarm(hour, minute);
  } else {
    alert("Please enter a valid hour and minute for the alarm.");
  }
});
