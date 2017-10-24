//@flow
import React, { PureComponent } from 'react';
import numeral from 'numeral';

// This is a "dumb" component that accepts a unit object and a value number
// this component is generic and not responsible of styles.
// N.B. we might consider use more <span> if we want to apply various style.

// TODO: we will have a CurrencyNameValue
// unit prop is annoying to provide as we don't always have it.
// also this will depend based on user pref (if you select mBTC vs BTC , etc..)
// so I suggest we have a redux store that context all user prefered unit per currencyName,
// and create a smarter component on top of this that would provide unit implicitely
// and would just accept that currencyName as prop.
class CurrencyUnitValue extends PureComponent {
  props: {
    unit: {
      // usually provided by server
      name: string,
      code: string,
      symbol: string,
      magnitude: number
    },
    value: number, // e.g. 10000 . for EUR it means €100.00
    alwaysShowSign?: boolean // do you want to show the + before the number (N.B. minus is always displayed)
  };
  render() {
    const { unit, value, alwaysShowSign } = this.props;
    let absValue = Math.abs(value);
    let format = '0,0.';
    let divider = 1;
    for (let i = 0; i < unit.magnitude; i++) {
      format += '0';
      divider *= 10;
    }
    return (
      <span>
        {(value < 0 ? '- ' : alwaysShowSign ? '+ ' : '') +
          unit.code +
          ' ' +
          numeral(absValue / divider).format(format)}
      </span>
    );
  }
}

export default CurrencyUnitValue;