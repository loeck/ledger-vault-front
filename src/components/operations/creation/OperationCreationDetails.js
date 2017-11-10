// @flow

import * as React from "react";
import { Component } from "react";
import bitcoinAddress from "bitcoin-address";
import currencies from "../../../currencies";
import { PopBubble, TextField } from "../../../components";
import ArrowDown from "../../icons/ArrowDown";
import type { Currency, Unit } from "../../../datatypes";

import "./OperationCreationDetails.css";

type Props = {
  account: {
    currency: Currency,
    balance: number
  }
};

type State = {
  unit: Unit,
  unitMenuOpen: boolean,
  maxMenuOpen: boolean,
  amount: string,
  amountIsValid: boolean,
  address: string,
  addressIsValid: boolean
};

class OperationCreationDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { account } = this.props;
    this.currency = currencies.find(c => c.name === account.currency.name);

    this.state = {
      // $FlowFixMe
      unit: this.currency.units[0],
      unitMenuOpen: false,
      maxMenuOpen: false,
      amount: "",
      amountIsValid: true,
      address: "",
      addressIsValid: true
    };
  }

  currency: ?Currency;
  unitMenuAnchor: ?HTMLDivElement;
  maxMenuAnchor: ?HTMLDivElement;

  setAmount = (
    amount: string,
    magnitude: number = this.state.unit.magnitude
  ) => {
    const value = parseFloat(amount) || 0;
    const balance = this.props.account.balance;
    const max = balance / 10 ** magnitude;
    const decimals = amount.replace(/(.*\.|.*[^.])/, "").replace(/0+$/, "");

    this.setState({
      amount,
      amountIsValid: value <= max && decimals.length <= magnitude
    });
  };

  selectUnit = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target: HTMLDivElement = e.currentTarget;
    const unitNb: number = parseInt(target.dataset.unit);
    // $FlowFixMe
    const unit: Unit = this.currency.units[unitNb];

    this.setState({
      unit,
      unitMenuOpen: false
    });

    this.setAmount(this.state.amount, unit.magnitude);
  };

  updateAmount = (e: SyntheticEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const regex: regex = /^(\d*\.?\d*)?$/;

    if (regex.test(value)) {
      this.setAmount(value);
    }
  };

  setMax = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();

    const magnitude = this.state.unit.magnitude;
    const balance = this.props.account.balance;
    const amount = balance / 10 ** magnitude;

    this.setState({ maxMenuOpen: false });

    this.setAmount(`${amount}`);
  };

  updateAddress = (e: SyntheticEvent<HTMLInputElement>) => {
    const address: string = e.currentTarget.value.trim();
    const addressIsValid: boolean =
      address === "" || bitcoinAddress.validate(address);

    this.setState({
      address,
      addressIsValid
    });
  };

  render() {
    return (
      <div className="operation-creation-details wrapper">

        {/* Amount */}

        <div className="tab-title">Amount</div>
        <div className="amount-field-wrapper" style={{ position: "relative" }}>
          <TextField
            className="operation-creation-amount-field"
            id="operation-creation-amount-field"
            hintText="0"
            value={this.state.amount}
            hasError={!this.state.amountIsValid}
            onChange={this.updateAmount}
            style={{ textAlign: "right" }}
          />
          <div
            className="operation-creation-unit-selector"
            ref={e => {
              this.unitMenuAnchor = e;
            }}
            onClick={() => this.setState({ unitMenuOpen: true })}
            role="button"
            // tabIndex={0}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 0
            }}
          >
            <div className="operation-creation-unit" style={{ float: "left" }}>
              {this.state.unit.code}
            </div>
            <div
              className="operation-creation-arrow-down"
              style={{ float: "left", marginLeft: "9.5px" }}
            >
              <ArrowDown />
            </div>
          </div>
          <div
            className="operation-creation-arrow-down"
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 0,
              top: 0
            }}
            ref={e => {
              this.maxMenuAnchor = e;
            }}
            onClick={() => this.setState({ maxMenuOpen: true })}
          >
            <ArrowDown />
          </div>
        </div>
        <div className="operation-creation-countervalue">
          <div
            style={{
              float: "left"
            }}
          >
            EUR
          </div>
          <div
            style={{
              float: "right"
            }}
          >
            1,024.42
          </div>
        </div>
        <PopBubble
          open={this.state.unitMenuOpen}
          anchorEl={this.unitMenuAnchor}
          onRequestClose={() => this.setState({ unitMenuOpen: false })}
        >
          <ul className="operation-creation-unit-list">
            {// $FlowFixMe
            this.currency.units.map((unit, index) => (
              <li key={unit.name}>
                <a
                  href="unit"
                  onClick={this.selectUnit}
                  data-unit={index}
                  className={unit.name === this.state.unit.name ? "active" : ""}
                >
                  {unit.code}
                </a>
              </li>
            ))}
          </ul>
        </PopBubble>
        <PopBubble
          open={this.state.maxMenuOpen}
          anchorEl={this.maxMenuAnchor}
          onRequestClose={() => this.setState({ maxMenuOpen: false })}
          className="operation-creation-send-max"
        >
          <a href="setMax" onClick={this.setMax}>
            Send max
          </a>
        </PopBubble>

        {/* Address */}

        <div className="tab-title title-address">Address to credit</div>
        <TextField
          className="operation-creation-address"
          id="operation-creation-address"
          style={{ fontSize: "13px" }}
          onChange={this.updateAddress}
          hasError={!this.state.addressIsValid}
          value={this.state.address}
        />

        {/* Fees */}

        <div className="tab-title">Confirmation fees</div>
      </div>
    );
  }
}

export default OperationCreationDetails;
