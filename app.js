// START VARIABLE DECLARATION ----------------------------------------//
const addStopwatchBtn = document.querySelector(".js-add-stopwatch");
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

  // CREATE PROPERTIES - *Computed*
  // get hour & set hour
  // get minute & set minute
  // get second & set minute

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
  const time = document.createElement("p");
  time.classList.add("js-elapsed-time");
  time.textContent = stopwatch._elapsedTime;
  const startBtn = document.createElement("button");
  startBtn.textContent = "start";
  startBtn.classList.add("js-start-btn");
  const stopBtn = document.createElement("button");
  stopBtn.textContent = "pause";
  stopBtn.classList.add("js-pause-btn");
  const resumeBtn = document.createElement("button");
  resumeBtn.textContent = "resume";
  resumeBtn.classList.add("js-resume-btn");

  wrapper.appendChild(time);
  wrapper.appendChild(startBtn);
  wrapper.appendChild(stopBtn);
  wrapper.appendChild(resumeBtn);
  stopwatchSection.appendChild(wrapper);
}

function startCounting(event) {
  const targetDOMObject = event.target.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;
  //accessing specific object with ID and manipulating it...
  let selectedStopwatch;

  for (let i = 0; i < stopwatchArray.length; i++) {
    if (stopwatchArray[i]._id === targetDOMObjectID) {
      selectedStopwatch = stopwatchArray[i];
      break;
    }
  }

  const stopwatchElapsedTime =
    targetDOMObject.querySelector(".js-elapsed-time");

  selectedStopwatch.start();
  //save interval id, so it can be cleared later
  targetDOMObject.dataset.intervalID = setInterval(() => {
    (stopwatchElapsedTime.textContent = selectedStopwatch._elapsedTime), 1000;
  });
}

function pauseCounting(event) {
  //REPEATED CODE IN START AND PAUSE --- TURN INTO SEPERATE FUNCTION
  const targetDOMObject = event.target.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;

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
  const targetDOMObject = event.target.parentNode;
  const targetDOMObjectID = targetDOMObject.dataset.id;

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
  const stopwatchElapsedTime =
    targetDOMObject.querySelector(".js-elapsed-time");
  targetDOMObject.dataset.intervalID = setInterval(() => {
    (stopwatchElapsedTime.textContent = selectedStopwatch._elapsedTime), 1000;
  });
}

// END FUNCTIONS ------------------------------------------------------\\

// START EVENT LISTENERS --------------------------------------------------//

addStopwatchBtn.addEventListener("click", () => {
  createStopwatch(stopwatchName.value);
  stopwatchName.value = "";
});

// END EVENT LISTENERS --------------------------------------------------\\
