import React from "react";


class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      clock: "25:00",
      timerState: "stopped",
      timerType: "Session",
      backupTimer:"",
      interval: "",
      timerLength: "",
    };

    this.timerCount = this.timerCount.bind(this);
    this.breakLengthSetUp = this.breakLengthSetUp.bind(this);
    this.breakLengthSetDown = this.breakLengthSetDown.bind(this);
    this.sessionLengthSetDown = this.sessionLengthSetDown.bind(this);
    this.sessionLengthSetUp = this.sessionLengthSetUp.bind(this);
    this.reset = this.reset.bind(this);
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
      this.setState({
        clock: this.state.sessionLength + 1 + ":00",
        sessionLength: this.state.sessionLength + 1,
      });
    }
  }

  sessionLengthSetDown() {
    if (this.state.sessionLength === 1) {
      return;
    } else {
      this.setState({
        clock: this.state.sessionLength - 1 + ":00",
        sessionLength: this.state.sessionLength - 1,
      });
    }
  }

  timerCount() {
    let duration = this.state.sessionLength * 60;
    
    var timer = duration,
      minutes,
      seconds;

    if (this.state.timerState === "Running") {
      this.setState({
        backupTimer:this.state.timerLength,
        timerState: "Paused",
      })
      
      // console.log("backupTimer"+this.state.backupTimer)
      clearInterval(this.interval);
    } 
    else if (this.state.timerState === "Paused") {
      
      // console.log("backupTimer"+this.state.backupTimer)
      duration = this.state.backupTimer ;
       var timer = duration,minutes,seconds;

      this.setState({
        timerLength: timer,
      });
     this.interval= setInterval(
        function () {
          minutes = parseInt(this.state.timerLength / 60, 10);
          seconds = parseInt(this.state.timerLength % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          console.log(this.state.timerLength);
          this.setState({
            timerLength: this.state.timerLength - 1,
            clock: minutes + ":" + seconds,
            timerState: "Running",
          });

          if (this.state.timerLength < 0) {
            timer = duration;
          }
        }.bind(this),
        1000
      );
        
       

    } 
    else {
      this.setState({
        timerLength: timer,
      });
       this.interval= setInterval(
        function () {
          minutes = parseInt(this.state.timerLength / 60, 10);
          seconds = parseInt(this.state.timerLength % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          console.log(this.state.timerLength);
          this.setState({
            timerLength: this.state.timerLength - 1,
            clock: minutes + ":" + seconds,
            timerState: "Running",
          });

          if (this.state.timerLength < 0) {
            timer = duration;
          }
        }.bind(this),
        1000
      );
       
    }
  }

  reset() {
    clearInterval(this.interval)
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerState: "stopped",
      timerType: "Session",
      clock: "25:00",
      interval: "",
    });

    // this.state.intervalID && this.state.intervalID.cancel();
    // this.audioBeep.pause();
    // this.audioBeep.currentTime = 0;
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
            <div id="session-length">{this.state.sessionLength}</div>
            <button
              onClick={this.sessionLengthSetUp}
              id="session-increment"
              className="fa fa-arrow-up fa-2x"
            ></button>
          </div>
        </div>

        <div id="label-session">
          <div id="timer-label">{this.state.timerType}</div>
          <div id="time-left">{this.state.clock}</div>
        </div>

        <div id="click-timer">
          <button id="start_stop" onClick={this.timerCount}>
            <span className="fa fa-play fa-2x"></span>
            <span className="fa fa-pause fa-2x"></span>
          </button>

          <button id="reset" onClick={this.reset}>
            <span className="fa fa-refresh fa-2x"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default Pomodoro;

/*
Reference :
https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

*/
