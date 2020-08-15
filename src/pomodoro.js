import React from "react";

(function () {
  window.accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function () {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel,
    };
  };
}.call(this));

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: "",
    };
    this.timerDecrement = this.timerDecrement.bind(this);
    this.timerIncrement = this.timerIncrement.bind(this);
    this.toClock = this.toClock.bind(this);
    this.breakLengthSetUp = this.breakLengthSetUp.bind(this);
    this.breakLengthSetDown = this.breakLengthSetDown.bind(this);
    this.sessionLengthSetDown = this.sessionLengthSetDown.bind(this);
    this.sessionLengthSetUp = this.sessionLengthSetUp.bind(this);
  }

  breakLengthSetUp() {
    if (this.state.breakLength === 60) {
      return;
    } else {
      this.setState({ breakLength: this.state.breakLength + 1 });
    }
  }

  breakLengthSetDown() {
    if (this.state.breakLength === 1) {
      return;
    } else {
      this.setState({ breakLength: this.state.breakLength - 1 });
    }
  }

  sessionLengthSetUp() {
    if (this.state.sessionLength === 1) {
      return;
    } else {
      this.setState({ sessionLength: this.state.sessionLength + 1 });
    }
  }

  sessionLengthSetDown() {
    if (this.state.sessionLength === 1) {
      return;
    } else {
      this.setState({ sessionLength: this.state.sessionLength - 1 });
    }
  }

  timerDecrement() {
    this.setState({ timer: this.state.timer - 1 });
  }
  timerIncrement() {
    this.setState({ timer: this.state.timer + 1 });
  }

  

  toClock() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }
  render() {
    return (
      <div>
        <nav className="navbar ">
          <span id="header">POMODORO CLOCK</span>
        </nav>
        <div id="timer-control">
          <div className="break-ctrl">
            <span className="label">BREAK LENGTH</span>
            <button
              onClick={this.breakLengthSetDown}
              id="break-decrement"
              className="fa fa-arrow-down fa-2x"
            ></button>{" "}
            <div id="break-length">{this.state.breakLength}</div>
            <button
              onClick={this.breakLengthSetUp}
              id="break-increment"
              className="fa fa-arrow-up fa-2x"
            ></button>
          </div>

          <div className="session-ctrl">
            <span className="label">SESSION LENGTH</span>
            <button
            onClick={this.sessionLengthSetDown}
              id="session-decrement"
              className="fa fa-arrow-down fa-2x"
            ></button>{" "}
            <div id="session-length">{this.state.sessionLength}</div>{" "}
            <button
            onClick={this.sessionLengthSetUp}
              id="session-increment"
              className="fa fa-arrow-up fa-2x"
            ></button>
          </div>
        </div>

        <div id="label-session">
          <div id="timer-label">{this.state.timerType}</div>
          <div id="time-left">{this.toClock()}</div>
        </div>

        <div id="click-timer">
          <button id="start_stop" onClick>
            <span className="fa fa-play fa-2x"></span>
            <span className="fa fa-pause fa-2x"></span>
          </button>

          <button id="reset" onClick>
            <span className="fa fa-refresh fa-2x"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
