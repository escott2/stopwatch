// START VARIABLE DECLARATION
const addStopwatchBtn = document.querySelector(".js-add-stopwatch");
const stopwatchWrapper = document.querySelector("main");
// const stopwatchElapsedTime = document.querySelector(".js-elapsed-time");
const stopwatchArray = [];
const stopwatchName = document.querySelector(".js-stopwatch-name");
// const startButtons = document.querySelectorAll(".js-start-btn");
const stopButtons = document.querySelectorAll(".js-stop-btn");

// END VARIABLE DECLARATION

// START STOPWATCH CLASS
// ES6 Class Syntax

class Stopwatch {
  constructor(name, time, elapsedTime) {
    this.name = name;
    this._time = time;
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

  // get elapsedTime() {
  //   return this._elapsedTime;
  // }

  // set elapsedTime(elapsedTime) {
  //   this._elapsedTime = elapsedTime;
  // }

  start() {
    this._startTime = Date.now();
    this.run();
  }

  run() {
    // setInterval --- every 1000 ms, add 1 second to time property.
    this._intervalId = setInterval(() => {
      this._elapsedTime = Date.now() - this._startTime;
      // this._time = this._time + 1;
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

// END STOPWATCH CLASS

// EVENT LISTENERS
function createStopwatch(stopwatchName) {
  //create stopwatch object
  const stopwatch = new Stopwatch(stopwatchName, 0, 0);
  //push stopwatch object to array
  stopwatchArray.push(stopwatch);
  console.log(stopwatchArray);

  //create id for object -- improve this id later
  const id = `id-${stopwatchArray.length}`;
  stopwatch.id = id;
  console.log(stopwatchArray);
  stopwatch._time = 100;
  const wrapper = document.createElement("div");
  wrapper.classList.add("stopwatch", `${id}`);
  wrapper.dataset.id = id;
  const time = document.createElement("p");
  time.classList.add("js-elapsed-time");
  time.textContent = stopwatch._elapsedTime;
  const startBtn = document.createElement("button");
  const stopBtn = document.createElement("button");
  wrapper.appendChild(time);
  wrapper.appendChild(startBtn);
  wrapper.appendChild(stopBtn);
  startBtn.textContent = "start";
  stopBtn.textContent = "stop";
  startBtn.classList.add("js-start-btn");
  stopBtn.classList.add("js-stop-btn");
  stopwatchWrapper.appendChild(wrapper);
}

addStopwatchBtn.addEventListener("click", () => {
  createStopwatch(stopwatchName.value);
});

//Add querySelectors for new components/nodes
document.addEventListener("DOMNodeInserted", () => {
  const startButtons = document.querySelectorAll(".js-start-btn");
  startButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log(event.target);
      const targetDOMObject = event.target.parentNode;
      const targetDOMObjectID = targetDOMObject.dataset.id;
      console.log(targetDOMObjectID);

      //accessing specific object with ID and manipulating it...
      let selectedStopwatch;

      for (let i = 0; i < stopwatchArray.length; i++) {
        if (stopwatchArray[i]._id === targetDOMObjectID) {
          selectedStopwatch = stopwatchArray[i];
          break;
        }
      }

      selectedStopwatch._time = 200;
      console.log(selectedStopwatch);

      const stopwatchElapsedTime =
        targetDOMObject.querySelector(".js-elapsed-time");

      selectedStopwatch.start();
      setInterval(() => {
        (stopwatchElapsedTime.textContent = selectedStopwatch._elapsedTime),
          1000;
      });
    });
    // const startButtons = document.querySelectorAll(".js-start-btn");
  });
});

// let selectedStopwatch;

// for (let i = 0; i < stopwatchArray.length; i++) {
//   if (stopwatchArray[i].id === 2) {
//     selectedStopwatch = stopwatchArray[i];
//     break;
//   }
//   selectedStopwatch._time = 200;
// }

// startButtons.forEach((button) =>
//   button.addEventListener("click", () => {
//     console.log("test");
//     // console.log(event.target);
//   })
// );

// stopButtons.addEventListener("click", (event) => {
//   console.log(event.target);
// }) );
// .addEventListener("click", (event) => {
//   console.log(event.target);
// });

// stopButtons.addEventListener("click", (event) => {
//   console.log(event.target);
// });

//Testing
// const stopwatch = new Stopwatch("study", 0);
// console.log(stopwatch);

// stopwatch.start();
// // stopwatch.run();

// const interval = setInterval(() => {
//   console.log(stopwatch._elapsedTime);
// }, 1000);

// setTimeout(() => {
//   stopwatch.pause();
// }, 5000);

// setTimeout(() => {
//   stopwatch.run();
// }, 10000);

// setTimeout(() => {
//   stopwatch.pause();
// }, 15000);

// setTimeout(() => {
//   stopwatch.reset();
//   clearInterval(interval);
// }, 20000);
