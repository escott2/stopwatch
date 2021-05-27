// START VARIABLE DECLARATION ----------------------------------------//
const addStopwatchBtn = document.querySelector(".js-generate-stopwatch-btn");
const stopwatchSection = document.querySelector(".js-stopwatch-section");
const stopwatchArray = [];
const stopwatchName = document.querySelector(".js-stopwatch-name");
// END VARIABLE DECLARATION ----------------------------------------\\

// START STOPWATCH CLASS ----------------------------------------//
/**
 * Creates Stopwatch object using ES6 Class Syntax
 */

class Stopwatch {
  constructor(name, elapsedTime) {
    this.name = name;
    this._elapsedTime = elapsedTime;
  }

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

  get minute() {
    return this._minute;
  }

  set minute(minute) {
    this._minute = minute;
  }

  get second() {
    return this._second;
  }

  set second(second) {
    this._second = second;
  }

  // ****** Class Methods *******

  calcHour() {
    const elapsedTime = this._elapsedTime;
    const elapsedTimeInHours = this._elapsedTime / 3600000;
    const hour = Math.floor(elapsedTimeInHours);
    this._hour = hour.toString().padStart(2, "0");
  }

  calcMinute() {
    const elapsedTime = this._elapsedTime;
    const elapsedTimeInSeconds = Math.round(elapsedTime / 1000);
    const elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / 60);
    const minute = elapsedTimeInMinutes % 60;
    this._minute = minute.toString().padStart(2, "0");
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
  }
}

// END STOPWATCH CLASS --------------------------------------------\\

// START MUTATION OBSERVER --------------------------------------------//
/**
 * Observes changes in DOM, queries children, and adds event listeners.
 */

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
      const editButtons = document.querySelectorAll(".js-edit-btn");
      editButtons.forEach((button) => {
        button.addEventListener("click", editStopwatch);
      });
      const closeEditorButtons = document.querySelectorAll(
        ".js-close-edit-wrapper-btn"
      );
      closeEditorButtons.forEach((button) => {
        button.addEventListener("click", closeEditWrapper);
      });
      const deleteButtons = document.querySelectorAll(".js-delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteStopwatch);
      });
    }
  }
};

const observer = new MutationObserver(observerCallback);
observer.observe(stopwatchSection, config);
// END MUTATION OBSERVER --------------------------------------------//

// START FUNCTIONS ------------------------------------------------------//

/**
 * Creates stopwatch component.
 * Initalizes object and creates html elements.
 */
function createStopwatch(stopwatchName) {
  const stopwatch = new Stopwatch(stopwatchName, 0);
  stopwatchArray.push(stopwatch);

  //Create random ID for each component --- This could be better with a library such as UUID
  const randomID = Math.floor(Math.random() * 100000);
  const id = `id-${randomID}`;

  stopwatch.id = id;
  stopwatch.name = stopwatchName;

  buildStopwatchHTML(id, stopwatchName);
}

/**
 * Builds stopwatch HTML elements. Adds attributes, classes, and content.
 */
function buildStopwatchHTML(id, stopwatchName) {
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
  const stopwatchTitle = document.createElement("h2");
  stopwatchTitle.textContent = stopwatchName;
  stopwatchTitle.classList.add("stopwatch-title");
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn", "js-edit-btn");
  editBtn.ariaLabel = "Edit Stopwatch";
  const editBtnIcon = document.createElement("i");
  editBtnIcon.classList.add("fas", "fa-pen");
  editBtn.appendChild(editBtnIcon);

  const editWrapperActive = document.createElement("div");
  editWrapperActive.classList.add(
    "editor--open",
    "js-edit-wrapper--active",
    "display-none"
  );
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "js-delete-btn");
  const deleteBtnIcon = document.createElement("i");
  deleteBtn.ariaLabel = "Delete Stopwatch";

  deleteBtnIcon.classList.add("fas", "fa-trash");
  deleteBtn.appendChild(deleteBtnIcon);
  const closeEditWrapperBtn = document.createElement("button");
  closeEditWrapperBtn.classList.add(
    "close-edit-wrapper-btn",
    "js-close-edit-wrapper-btn"
  );
  closeEditWrapperBtn.ariaLabel = "Close Editor";
  const closeEditWrapperIcon = document.createElement("i");
  closeEditWrapperIcon.classList.add("fas", "fa-times-circle");
  closeEditWrapperBtn.appendChild(closeEditWrapperIcon);
  editWrapperActive.appendChild(deleteBtn);
  editWrapperActive.appendChild(closeEditWrapperBtn);
  buttonWrapper.appendChild(startBtn);
  buttonWrapper.appendChild(stopBtn);
  buttonWrapper.appendChild(resumeBtn);
  buttonWrapper.appendChild(resetBtn);
  wrapper.appendChild(timeWrapper);
  wrapper.appendChild(buttonWrapper);
  wrapper.appendChild(stopwatchTitle);
  wrapper.appendChild(editBtn);
  wrapper.appendChild(editWrapperActive);
  stopwatchSection.appendChild(wrapper);
}

/**
 * Accesses target stopwatch object.
 */
function getTargetStopwatch(targetDOMObject) {
  const targetDOMObjectID = targetDOMObject.dataset.id;
  let selectedStopwatch;

  //accessing specific object with ID and saving in variable
  for (let i = 0; i < stopwatchArray.length; i++) {
    if (stopwatchArray[i]._id === targetDOMObjectID) {
      selectedStopwatch = stopwatchArray[i];
      break;
    }
  }

  return selectedStopwatch;
}

function displayElapsedTime(targetDOMObject, targetStopwatch) {
  const hourPlace = targetDOMObject.querySelector(".js-hour-place");
  const minutePlace = targetDOMObject.querySelector(".js-minute-place");
  const secondPlace = targetDOMObject.querySelector(".js-second-place");

  //save interval id, so it can be cleared later
  targetDOMObject.dataset.intervalID = setInterval(() => {
    hourPlace.textContent = targetStopwatch._hour;
    minutePlace.textContent = targetStopwatch._minute;
    secondPlace.textContent = targetStopwatch._second;
  }, 1000);
}

/**
 * Calls start method on Stopwatch object.
 * Updates button display.
 */
function startCounting(event) {
  const targetDOMObject = event.target.parentNode.parentNode;
  const selectedStopwatch = getTargetStopwatch(targetDOMObject);

  // Display appropraite buttons --- could be refactored into a function
  const startBtn = targetDOMObject.querySelector(".js-start-btn");
  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  const resetBtn = targetDOMObject.querySelector(".js-reset-btn");
  startBtn.classList.add("display-none");
  pauseBtn.classList.remove("display-none");
  resetBtn.classList.remove("display-none");

  selectedStopwatch.start();

  displayElapsedTime(targetDOMObject, selectedStopwatch);
}

/**
 * Calls pause method on Stopwatch object.
 * Updates button display.
 */
function pauseCounting(event) {
  const targetDOMObject = event.target.parentNode.parentNode;
  const selectedStopwatch = getTargetStopwatch(targetDOMObject);

  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  const resumeBtn = targetDOMObject.querySelector(".js-resume-btn");
  pauseBtn.classList.add("display-none");
  resumeBtn.classList.remove("display-none");

  selectedStopwatch.pause();
  clearInterval(targetDOMObject.dataset.intervalID);
}

/**
 * Calls resume method on Stopwatch object.
 * Updates button display.
 */
function resumeCounting(event) {
  const targetDOMObject = event.target.parentNode.parentNode;
  const selectedStopwatch = getTargetStopwatch(targetDOMObject);

  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  const resumeBtn = targetDOMObject.querySelector(".js-resume-btn");
  pauseBtn.classList.remove("display-none");
  resumeBtn.classList.add("display-none");

  selectedStopwatch.resume();

  displayElapsedTime(targetDOMObject, selectedStopwatch);
}

/**
 * Calls reset method on Stopwatch object.
 * Updates button display.
 * Clears time display.
 */
function resetClock(event) {
  const targetDOMObject = event.target.parentNode.parentNode;
  const selectedStopwatch = getTargetStopwatch(targetDOMObject);

  const startBtn = targetDOMObject.querySelector(".js-start-btn");
  const pauseBtn = targetDOMObject.querySelector(".js-pause-btn");
  const resumeBtn = targetDOMObject.querySelector(".js-resume-btn");
  const resetBtn = targetDOMObject.querySelector(".js-reset-btn");
  startBtn.classList.remove("display-none");
  pauseBtn.classList.add("display-none");
  resumeBtn.classList.add("display-none");
  resetBtn.classList.add("display-none");

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

/**
 * Opens editor wrapper on stopwatch component.
 */
function editStopwatch(event) {
  const targetDOMObject = event.target.parentNode.parentNode;

  const editWrapperActive = targetDOMObject.querySelector(
    ".js-edit-wrapper--active"
  );
  editWrapperActive.classList.remove("display-none");
  editWrapperActive.classList.add("display-flex");
}

/**
 * Closes editor wrapper on stopwatch component.
 */
function closeEditWrapper(event) {
  const targetDOMObject = event.target.parentNode.parentNode.parentNode;
  const editWrapperActive = targetDOMObject.querySelector(
    ".js-edit-wrapper--active"
  );
  editWrapperActive.classList.add("display-none");
  editWrapperActive.classList.remove("display-flex");
}

/**
 * Deletes stopwatch from Array and removes component from DOM
 */
function deleteStopwatch(event) {
  const targetDOMObject = event.target.parentNode.parentNode.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;

  for (let i = 0; i < stopwatchArray.length; i++) {
    if (stopwatchArray[i]._id === targetDOMObjectID) {
      stopwatchArray.splice(i, 1);
      break;
    }
  }

  targetDOMObject.remove();
}

// END FUNCTIONS ------------------------------------------------------\\

// START EVENT LISTENERS --------------------------------------------------//
//--- Note: Event listeners for generated content in mutation observer ---/

addStopwatchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createStopwatch(stopwatchName.value);
  stopwatchName.value = "";
});

// END EVENT LISTENERS --------------------------------------------------\\
