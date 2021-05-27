// START VARIABLE DECLARATION ----------------------------------------//
const addStopwatchBtn = document.querySelector(".js-add-stopwatch-btn");
const stopwatchSection = document.querySelector(".js-stopwatch-section");
const stopwatchArray = [];
const stopwatchName = document.querySelector(".js-stopwatch-name");
// END VARIABLE DECLARATION ----------------------------------------\\

// START STOPWATCH CLASS ----------------------------------------//
// ES6 Class Syntax

class Stopwatch {
  constructor(name, elapsedTime) {
    this.name = name;
    this._elapsedTime = elapsedTime;
  }

  //maybe this can be normal property
  get intervalId() {
    return this._intervalId;
  }

  set intervalId(id) {
    this._intervalId = id;
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(dateNow) {
    this._startTime = dateNow;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get hour() {
    return this._hour;
  }

  set hour(hour) {
    this._hour = hour;
  }

  calcHour() {
    const elapsedTime = this._elapsedTime;
    const elapsedTimeInSeconds = Math.round(elapsedTime / 1000);
    const elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / 60);
    const elapsedTimeInHours = Math.floor(elapsedTimeInMinutes / 60);
    const hour = elapsedTimeInHours % 60;
    this._hour = hour.toString().padStart(2, "0");
  }

  get minute() {
    return this._minute;
  }

  set minute(minute) {
    this._minute = minute;
  }

  calcMinute() {
    const elapsedTime = this._elapsedTime;
    const elapsedTimeInSeconds = Math.round(elapsedTime / 1000);
    const elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / 60);
    const minute = elapsedTimeInMinutes % 60;
    this._minute = minute.toString().padStart(2, "0");
  }

  get second() {
    return this._second;
  }

  set second(second) {
    this._second = second;
  }

  calcSecond() {
    const elapsedTime = this._elapsedTime;
    const elapsedTimeInSeconds = Math.round(elapsedTime / 1000);
    const second = elapsedTimeInSeconds % 60;
    this._second = second.toString().padStart(2, "0");
  }

  start() {
    this._startTime = Date.now();
    this.run();
  }

  resume() {
    this.startTime = Date.now();
    const savedElapsedTime = this._elapsedTime;
    this.run(savedElapsedTime);
  }

  run(savedElapsedTime = 0) {
    // setInterval --- every 1000 ms, add 1 second to time property.
    // this.calcHour();
    // this.calcMinute();
    // this.calcSecond();
    this._intervalId = setInterval(() => {
      this._elapsedTime = Date.now() - this._startTime + savedElapsedTime;
      this.calcHour();
      this.calcMinute();
      this.calcSecond();
    }, 1000);
  }

  pause() {
    //clear time --- clearInterval()
    clearInterval(this._intervalId);
  }

  reset() {
    //clear time --- clearInterval()
    clearInterval(this._intervalId);
    this._elapsedTime = 0;
    // this._time = 0;
  }
}

// END STOPWATCH CLASS --------------------------------------------\\

// START FUNCTIONS ------------------------------------------------------//

// Start Mutation Observer --------------------------------------------//
const config = { childList: true };

const observerCallback = (mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      const startButtons = document.querySelectorAll(".js-start-btn");
      startButtons.forEach((button) => {
        button.addEventListener("click", startCounting);
      });
      const pauseButtons = document.querySelectorAll(".js-pause-btn");
      pauseButtons.forEach((button) => {
        button.addEventListener("click", pauseCounting);
      });
      const resumeButtons = document.querySelectorAll(".js-resume-btn");
      resumeButtons.forEach((button) => {
        button.addEventListener("click", resumeCounting);
      });
      const resetButtons = document.querySelectorAll(".js-reset-btn");
      resetButtons.forEach((button) => {
        button.addEventListener("click", resetClock);
      });
    }
  }
};

const observer = new MutationObserver(observerCallback);
observer.observe(stopwatchSection, config);
// End Mutation Observer --------------------------------------------//

function createStopwatch(stopwatchName) {
  //create stopwatch object
  const stopwatch = new Stopwatch(stopwatchName, 0);

  //push stopwatch object to array
  stopwatchArray.push(stopwatch);

  //create id for object -- improve this id later -- make unique
  const id = `id-${stopwatchArray.length}`;

  //add id property to object
  stopwatch.id = id;

  //create DOM elements and add attributes --- create function for this
  const wrapper = document.createElement("div");
  wrapper.classList.add("stopwatch", `${id}`);
  wrapper.dataset.id = id;
  const timeWrapper = document.createElement("div");
  timeWrapper.classList.add("elapsed-time-wrapper", "js-elapsed-time-wrapper");
  const hourSpan = document.createElement("span");
  hourSpan.classList.add("js-hour-place", "time-span");
  hourSpan.textContent = "00";
  const firstColon = document.createElement("p");
  firstColon.textContent = ":";
  const secondColon = document.createElement("p");
  secondColon.textContent = ":";
  const minuteSpan = document.createElement("span");
  minuteSpan.classList.add("js-minute-place", "time-span");
  minuteSpan.textContent = "00";
  const secondSpan = document.createElement("span");
  secondSpan.classList.add("js-second-place", "time-span");
  secondSpan.textContent = "00";
  timeWrapper.appendChild(hourSpan);
  timeWrapper.appendChild(firstColon);
  timeWrapper.appendChild(minuteSpan);
  timeWrapper.appendChild(secondColon);
  timeWrapper.appendChild(secondSpan);

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("stopwatch-btn-wrapper");
  const startBtn = document.createElement("button");
  startBtn.textContent = "start";
  startBtn.classList.add("js-start-btn", "stopwatch-btn", "start-btn");
  const stopBtn = document.createElement("button");
  stopBtn.textContent = "pause";
  stopBtn.classList.add(
    "js-pause-btn",
    "stopwatch-btn",
    "display-none",
    "pause-btn"
  );
  const resumeBtn = document.createElement("button");
  resumeBtn.textContent = "resume";
  resumeBtn.classList.add(
    "js-resume-btn",
    "stopwatch-btn",
    "display-none",
    "resume-btn"
  );
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "reset";
  resetBtn.classList.add(
    "js-reset-btn",
    "stopwatch-btn",
    "display-none",
    "reset-btn"
  );

  buttonWrapper.appendChild(startBtn);
  buttonWrapper.appendChild(stopBtn);
  buttonWrapper.appendChild(resumeBtn);
  buttonWrapper.appendChild(resetBtn);
  wrapper.appendChild(timeWrapper);
  wrapper.appendChild(buttonWrapper);
  stopwatchSection.appendChild(wrapper);
}

function startCounting(event) {
  const targetDOMObject = event.target.parentNode.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;
  const startBtn = targetDOMObject.querySelector(".js-start-btn");
  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  // const resumeBtn = targetDOMObject.querySelector(".js-resume-btn");
  const resetBtn = targetDOMObject.querySelector(".js-reset-btn");
  startBtn.classList.add("display-none");
  pauseBtn.classList.remove("display-none");
  // resumeBtn.classList.remove("display-none");
  resetBtn.classList.remove("display-none");
  //accessing specific object with ID and manipulating it...
  let selectedStopwatch;

  for (let i = 0; i < stopwatchArray.length; i++) {
    if (stopwatchArray[i]._id === targetDOMObjectID) {
      selectedStopwatch = stopwatchArray[i];
      break;
    }
  }

  selectedStopwatch.start();

  const hourPlace = targetDOMObject.querySelector(".js-hour-place");
  const minutePlace = targetDOMObject.querySelector(".js-minute-place");
  const secondPlace = targetDOMObject.querySelector(".js-second-place");

  //save interval id, so it can be cleared later
  targetDOMObject.dataset.intervalID = setInterval(() => {
    hourPlace.textContent = selectedStopwatch._hour;
    minutePlace.textContent = selectedStopwatch._minute;
    secondPlace.textContent = selectedStopwatch._second;
  }, 1000);
}

function pauseCounting(event) {
  //REPEATED CODE IN START AND PAUSE --- TURN INTO SEPERATE FUNCTION
  const targetDOMObject = event.target.parentNode.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;
  // const startBtn = targetDOMObject.querySelector(".js-start-btn");
  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  const resumeBtn = targetDOMObject.querySelector(".js-resume-btn");
  // const resetBtn = targetDOMObject.querySelector(".js-reset-btn");
  // startBtn.classList.add("display-none");
  pauseBtn.classList.add("display-none");
  resumeBtn.classList.remove("display-none");
  // resumeBtn.classList.remove("display-none");
  // resetBtn.classList.remove("display-none");

  //accessing specific object with ID and manipulating it...
  let selectedStopwatch;

  for (let i = 0; i < stopwatchArray.length; i++) {
    if (stopwatchArray[i]._id === targetDOMObjectID) {
      selectedStopwatch = stopwatchArray[i];
      break;
    }
  }
  //END REPEATED CODE

  selectedStopwatch.pause();
  clearInterval(targetDOMObject.dataset.intervalID);
}

function resumeCounting(event) {
  //REPEATED CODE IN START AND PAUSE --- TURN INTO SEPERATE FUNCTION
  const targetDOMObject = event.target.parentNode.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;
  // const startBtn = targetDOMObject.querySelector(".js-start-btn");
  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  const resumeBtn = targetDOMObject.querySelector(".js-resume-btn");
  // const resetBtn = targetDOMObject.querySelector(".js-reset-btn");
  // startBtn.classList.add("display-none");
  pauseBtn.classList.remove("display-none");
  resumeBtn.classList.add("display-none");
  // resumeBtn.classList.remove("display-none");
  // resetBtn.classList.remove("display-none");

  //accessing specific object with ID and manipulating it...
  let selectedStopwatch;

  for (let i = 0; i < stopwatchArray.length; i++) {
    if (stopwatchArray[i]._id === targetDOMObjectID) {
      selectedStopwatch = stopwatchArray[i];
      break;
    }
  }
  //END REPEATED CODE

  selectedStopwatch.resume();
  //REPEATED IN startCounting();

  const hourPlace = targetDOMObject.querySelector(".js-hour-place");
  const minutePlace = targetDOMObject.querySelector(".js-minute-place");
  const secondPlace = targetDOMObject.querySelector(".js-second-place");

  //save interval id, so it can be cleared later
  targetDOMObject.dataset.intervalID = setInterval(() => {
    hourPlace.textContent = selectedStopwatch._hour;
    minutePlace.textContent = selectedStopwatch._minute;
    secondPlace.textContent = selectedStopwatch._second;
  }, 1000);
}

function resetClock(event) {
  //REPEATED CODE IN START AND PAUSE --- TURN INTO SEPERATE FUNCTION
  const targetDOMObject = event.target.parentNode.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;
  const startBtn = targetDOMObject.querySelector(".js-start-btn");
  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  const resumeBtn = targetDOMObject.querySelector(".js-resume-btn");
  const resetBtn = targetDOMObject.querySelector(".js-reset-btn");
  startBtn.classList.remove("display-none");
  pauseBtn.classList.add("display-none");
  resumeBtn.classList.add("display-none");
  resetBtn.classList.add("display-none");

  //accessing specific object with ID and manipulating it...
  let selectedStopwatch;

  for (let i = 0; i < stopwatchArray.length; i++) {
    if (stopwatchArray[i]._id === targetDOMObjectID) {
      selectedStopwatch = stopwatchArray[i];
      break;
    }
  }
  //END REPEATED CODE

  selectedStopwatch.reset();

  const hourPlace = targetDOMObject.querySelector(".js-hour-place");
  const minutePlace = targetDOMObject.querySelector(".js-minute-place");
  const secondPlace = targetDOMObject.querySelector(".js-second-place");

  //Probably better to access object property values
  hourPlace.textContent = "00";
  minutePlace.textContent = "00";
  secondPlace.textContent = "00";

  clearInterval(targetDOMObject.dataset.intervalID);
}

// END FUNCTIONS ------------------------------------------------------\\

// START EVENT LISTENERS --------------------------------------------------//

addStopwatchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createStopwatch(stopwatchName.value);
  stopwatchName.value = "";
});

// END EVENT LISTENERS --------------------------------------------------\\
