import React from "react";

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
  }

  render() {
    return (
      <div>
        <nav className="navbar ">
          <span id="header">POMODORO CLOCK</span>
        </nav>
        <div className="timer-control">
            <div className="break-ctrl">
            <div>BREAK LENGTH</div>
             <button className="fa fa-arrow-down fa-2x"></button> {this.state.breakLength}<button className="fa fa-arrow-up fa-2x"></button>
            </div>

            <div className="session-ctrl">
            <div>SESSION LENGTH</div>
             <button className="fa fa-arrow-down fa-2x"></button> {this.state.sessionLength}<button className="fa fa-arrow-up fa-2x"></button>
            </div>
        </div>
         

      </div>
    );
  }
}

export default Pomodoro;
