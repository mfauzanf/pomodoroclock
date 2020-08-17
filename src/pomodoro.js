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
    this.breakTimerCount=this.breakTimerCount.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.breakLengthSetUp = this.breakLengthSetUp.bind(this);
    this.breakLengthSetDown = this.breakLengthSetDown.bind(this);
    this.sessionLengthSetDown = this.sessionLengthSetDown.bind(this);
    this.sessionLengthSetUp = this.sessionLengthSetUp.bind(this);
    this.reset = this.reset.bind(this);
    this.audio=new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
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
    if (this.state.sessionLength === 60) {
      return;
    } else {
      var localSession=this.state.sessionLength
      var length = (localSession+1)*60
      var toMinutes = parseInt(length / 60, 10);
      var toSeconds=parseInt(length % 60, 10);
      toMinutes = toMinutes < 10 ? "0" + toMinutes : toMinutes;
      toSeconds = toSeconds < 10 ? "0" + toSeconds : toSeconds;
      this.setState({
        clock: toMinutes+":"+toSeconds,
        sessionLength: this.state.sessionLength + 1,
      });
    }
  }

  sessionLengthSetDown() {
    if (this.state.sessionLength === 1) {
      return;
    } else {
      var localSession=this.state.sessionLength
      var length = (localSession-1)*60
      var toMinutes = parseInt(length / 60, 10);
      var toSeconds=parseInt(length % 60, 10);
      toMinutes = toMinutes < 10 ? "0" + toMinutes : toMinutes;
      toSeconds = toSeconds < 10 ? "0" + toSeconds : toSeconds;
      this.setState({
        clock: toMinutes+":"+toSeconds,
        sessionLength: this.state.sessionLength - 1,
      });
    }
  }

  breakTimerCount(){
    let duration = this.state.breakLength * 60;
    
    var timer = duration,
      minutes,
      seconds;

    if(this.state.timerType==="Session" && this.state.timerState === "Running" ) {
      this.setState({
        timerLength: timer,
        timerType: "Break",
      });
       
       this.interval= setInterval(
        function () {
          minutes = parseInt(this.state.timerLength / 60, 10);
          seconds = parseInt(this.state.timerLength % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          console.log("BreakTimer "+this.state.timerLength);
          this.setState({
            timerLength: this.state.timerLength - 1,
            clock: minutes + ":" + seconds,
            timerState: "Running",
          });

          if (this.state.timerLength < 0) {
            this.audio.play()
            clearInterval(this.interval)
            this.timerCount()
          }
          // this.audio.pause()
        }.bind(this),
        1000
      );
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
            this.audio.play()
            clearInterval(this.interval)
          }
        }.bind(this),
        1000
      );
        
    } 
    
	else if (this.state.timerType==="Break"  && this.state.timerState === "Running") {
      this.setState({
        backupTimer:this.state.timerLength,
        timerState: "Paused",
      })
      
      // console.log("backupTimer"+this.state.backupTimer)
      clearInterval(this.interval);
    } 
  }

  timerCount() {
    let duration = this.state.sessionLength * 60;
    
    var timer = duration,
      minutes,
      seconds;

    if (this.state.timerType==="Session" && this.state.timerState === "Running") {
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
            this.audio.play()
            
            this.setState({
              timerType: "Session",
            });
            clearInterval(this.interval)
            this.breakTimerCount()
          }
        }.bind(this),
        1000
      );
        
    } 
    else if(this.state.timerState==="stopped" || (this.state.timerType==="Break" && this.state.timerState === "Running")) {
      this.setState({
        timerLength: timer,
        timerType: "Session",
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
            this.audio.play()
            clearInterval(this.interval)
            this.breakTimerCount()
          }
          // this.audio.pause()
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
            <span id="break-label" className="label">BREAK LENGTH</span>
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
            <span id="session-label" className="label">SESSION LENGTH</span>
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