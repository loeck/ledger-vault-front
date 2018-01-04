//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { PopBubble, DialogButton } from "../../";
import EnableForm from "components/EnableForm";
import InfoModal from "../../InfoModal";
import InputTextWithUnity from "components/InputTextWithUnity";
import ArrowDown from "../../icons/full/ArrowDown";
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
  setRatelimiter: Function,
  switchInternalModal: string => void,
  rate_limiter: Object,
  classes: { [_: $Keys<typeof styles>]: string },
  onAddMessage: (t: string, m: string, ty: string) => void
};

type State = {
  rate_limiter: Object,
  popover: boolean,
  anchor?: Object
};

class AccountCreationRateLimiter extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      rate_limiter: props.rate_limiter,
      popover: false,
      anchor: document.getElementsByClassName("count")[0]
    };
  }

  submit = () => {
    const { setRatelimiter, switchInternalModal, onAddMessage } = this.props;
    const { rate_limiter } = this.state;
    if (rate_limiter.enabled && rate_limiter.value === 0) {
      onAddMessage("Error", "Rate limiter value cannot be 0", "error");
      return false;
    } else {
      setRatelimiter(this.state.rate_limiter);
      switchInternalModal("main");
    }
  };

  onChangeValue = val => {
    const isNumber = /^[0-9\b]+$/;

    if (val === "" || isNumber.test(val)) {
      this.setState({
        ...this.state,
        rate_limiter: {
          ...this.state.rate_limiter,
          value: parseInt(val, 10) || 0
        }
      });
    }
  };

  onToggle = () => {
    this.setState({
      ...this.state,
      rate_limiter: {
        ...this.state.rate_limiter,
        enabled: !this.state.rate_limiter.enabled
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
      rate_limiter: {
        ...this.state.rate_limiter,
        frequency: val
      },
      popover: false
    });
  };

  cancel = () => {
    this.props.switchInternalModal("main");
  };
  render() {
    const { rate_limiter, popover } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.base}>
        <header>
          <h2>Rate Limiter</h2>
        </header>
        <div className="content">
          <EnableForm checked={rate_limiter.enabled} toggle={this.onToggle}>
            <InputTextWithUnity
              label="Rate"
              hasError={rate_limiter.value === 0 && rate_limiter.enabled}
              field={
                <input
                  type="text"
                  id="text-duration"
                  value={rate_limiter.value}
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
                <strong>operations</strong> per {rate_limiter.frequency.label}
                <ArrowDown className="arrow-down" />
              </span>
              <PopBubble
                open={popover}
                onClose={this.openFrequency}
                anchorEl={this.state.anchor}
              >
                <div className="frequency-bubble">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      this.changeFrequency({
                        value: 60,
                        label: "minute"
                      })
                    }
                    className={`frequency-bubble-row ${
                      rate_limiter.frequency.value === 60 ? "active" : ""
                    }`}
                  >
                    minute
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      this.changeFrequency({
                        value: 3600,
                        label: "hour"
                      })
                    }
                    className={`frequency-bubble-row ${
                      rate_limiter.frequency.value === 3600 ? "active" : ""
                    }`}
                  >
                    hour
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      this.changeFrequency({
                        value: 84600,
                        label: "day"
                      })
                    }
                    className={`frequency-bubble-row ${
                      rate_limiter.frequency.value === 84600 ? "active" : ""
                    }`}
                  >
                    day
                  </div>
                </div>
              </PopBubble>
            </InputTextWithUnity>
            <InfoModal>
              Rate-limiter enforces that your team does not exceed a pre-defined
              number of outgoing transaction per interval of time.
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
  withStyles(styles)(AccountCreationRateLimiter)
);
