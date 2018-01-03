import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { genBalance } from "../data/mock-entities";
import { formatCurrencyUnit } from "../data/currency";

import "open-sans-fontface/open-sans.css";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

const data = {
  bitcoin: {
    balance: 10000,
    counterValueBalance: 14237308,
    account: {
      currency: {
        name: "bitcoin",
        family: "Bitcoin",
        color: "#0cb653",
        units: [{ name: "bitcoin", code: "BTC", symbol: "Ƀ", magnitude: 8 }]
      }
    }
  },
  dogecoin: {
    balance: 1000,
    counterValueBalance: 7238980,
    account: {
      currency: {
        name: "dogecoin",
        family: "Bitcoin",
        color: "#fcb653",
        units: [{ name: "dogecoin", code: "BTC", symbol: "Ƀ", magnitude: 8 }]
      }
    }
  }
};
const pieChartData = Object.keys(data).reduce((currenciesList, c) => {
  currenciesList.push(data[c]);
  return currenciesList;
}, []);

storiesOf("PieChart", module)
  .add("no captions, no tooltips, no interactions", () => (
    <PieChart data={pieChartData} width={140} height={140} />
  ))
  .add("with captions", () => (
    <PieChart data={pieChartData} showCaptions width={140} height={140} />
  ))
  .add("with tooltips", () => (
    <PieChart data={pieChartData} showTooltips width={140} height={140} />
  ))
  .add("with tooltips and caption interaction", () => (
    <PieChart
      data={pieChartData}
      showTooltips
      showCaptions
      highlightCaptionsOnHover
      width={140}
      height={140}
    />
  ))
  .add("with tooltips and caption, no interaction", () => (
    <PieChart
      data={pieChartData}
      showTooltips
      showCaptions
      width={140}
      height={140}
    />
  ));

const lineChartData = genBalance(0, "year");
const currencyUnit = {
  name: "bitcoin",
  code: "BTC",
  symbol: "Ƀ",
  magnitude: 8
};

storiesOf("LineChart", module).add("pure", () => (
  <LineChart
    data={lineChartData.balance.map(dataPoint => [
      dataPoint[0],
      parseFloat(formatCurrencyUnit(currencyUnit, dataPoint[1]))
    ])}
    color={"#000"}
    formatTooltip={amount => {
      return `${currencyUnit.code} ${amount} `;
    }}
  />
));
