// ES6 Class Syntax

class Stopwatch {
  constructor(name, time) {
    this.name = name;
    this._time = time;
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

  get elapsedTime() {
    return this._elapsedTime;
  }

  set elapsedTime(elapsedTime) {
    this._elapsedTime = elapsedTime;
  }

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

//Testing
const stopwatch = new Stopwatch("study", 0);
console.log(stopwatch);

stopwatch.start();
// stopwatch.run();

const interval = setInterval(() => {
  console.log(stopwatch._elapsedTime);
}, 1000);

setTimeout(() => {
  stopwatch.pause();
}, 5000);

setTimeout(() => {
  stopwatch.run();
}, 10000);

setTimeout(() => {
  stopwatch.pause();
}, 15000);

setTimeout(() => {
  stopwatch.reset();
  clearInterval(interval);
}, 20000);
