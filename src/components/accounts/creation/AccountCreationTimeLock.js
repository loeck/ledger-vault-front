// @flow
import InfoModal from "../../InfoModal";
import React, { Component } from "react";
import { PopBubble, DialogButton } from "../../";
import EnableForm from "components/EnableForm";
import ArrowDown from "../../icons/full/ArrowDown";
import { connect } from "react-redux";
import InputTextWithUnity from "components/InputTextWithUnity";
import { addMessage } from "redux/modules/alerts";
import { withStyles } from "material-ui/styles";
import modals from "shared/modals";

const mapDispatchToProps = dispatch => ({
  onAddMessage: (title, content, type) =>
    dispatch(addMessage(title, content, type))
});

const styles = {
  base: {
    ...modals.base
  }
};

type Props = {
  switchInternalModal: Function,
  timelock: Object,
  setTimelock: Function,
  classes: { [_: $Keys<typeof styles>]: string },
  onAddMessage: (t: string, m: string, ty: string) => void
};

type State = {
  timelock: Object,
  popover: boolean,
  anchor?: Object
};

class AccountCreationTimeLock extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      timelock: props.timelock,
      popover: false,
      anchor: document.getElementsByClassName("count")[0]
    };
  }
  submit = () => {
    const { setTimelock, switchInternalModal, onAddMessage } = this.props;
    const { timelock } = this.state;
    if (timelock.enabled && timelock.value === 0) {
      onAddMessage("Error", "Timelock value cannot be 0", "error");
      return false;
    } 
      setTimelock(this.state.timelock);
      switchInternalModal("main");
    
  };

  onChangeValue = val => {
    const isNumber = /^[0-9\b]+$/;

    if (val === "" || isNumber.test(val)) {
      this.setState({
        ...this.state,
        timelock: { ...this.state.timelock, value: parseInt(val, 10) || 0 }
      });
    }
  };

  onToggle = () => {
    this.setState({
      ...this.state,
      timelock: {
        ...this.state.timelock,
        enabled: !this.state.timelock.enabled
      }
    });
  };

  openFrequency = () => {
    this.setState({
      ...this.state,
      popover: !this.state.popover,
      anchor: document.getElementsByClassName("arrow-down")[0]
    });
  };

  changeFrequency = val => {
    this.setState({
      ...this.state,
      timelock: {
        ...this.state.timelock,
        frequency: val
      },
      popover: false
    });
  };

  cancel = () => {
    this.props.switchInternalModal("main");
  };

  render() {
    const { timelock, popover } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.base}>
        <header>
          <h2>Time-lock</h2>
        </header>
        <div className="content">
          <EnableForm checked={timelock.enabled} toggle={this.onToggle}>
            <InputTextWithUnity
              hasError={timelock.value === 0 && timelock.enabled}
              label="Duration"
              field={
                <input
                  type="text"
                  id="text-duration"
                  value={timelock.value}
                  onChange={e => this.onChangeValue(e.target.value)}
                />
              }
            >
              <span
                className="count dropdown"
                role="button"
                tabIndex={0}
                onClick={this.openFrequency}
              >
                {timelock.frequency.label}
                <ArrowDown className="arrow-down" />
              </span>
              <PopBubble
                open={popover}
                onClose={this.openFrequency}
                anchorEl={this.state.anchor}
                style={{
                  marginTop: "11px"
                }}
              >
                <div className="frequency-bubble">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      this.changeFrequency({
                        label: "minutes",
                        value: 60
                      })
                    }
                    className={`frequency-bubble-row ${
                      timelock.frequency.label === "minutes" ? "active" : ""
                    }`}
                  >
                    minutes
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      this.changeFrequency({
                        label: "hours",
                        value: 3600
                      })
                    }
                    className={`frequency-bubble-row ${
                      timelock.frequency.label === "hours" ? "active" : ""
                    }`}
                  >
                    hours
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      this.changeFrequency({
                        label: "days",
                        value: 84600
                      })
                    }
                    className={`frequency-bubble-row ${
                      timelock.frequency.label === "days" ? "active" : ""
                    }`}
                  >
                    days
                  </div>
                </div>
              </PopBubble>
            </InputTextWithUnity>
            <InfoModal>
              Time-lock delays each outgoing operation by a configurable length,
              after all the required members have given their approvals.
            </InfoModal>
          </EnableForm>
        </div>

        <div className="footer">
          <DialogButton className="cancel" highlight onTouchTap={this.cancel}>
            Cancel
          </DialogButton>
          <DialogButton right highlight onTouchTap={this.submit}>
            Done
          </DialogButton>
        </div>
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(
  withStyles(styles)(AccountCreationTimeLock)
);
