import axios from "axios";
import React, { useEffect } from "react";
import { useMediaQueriesContext } from "../context/MediaQueryContext";

const usePriceConversion = () => {
  const { convertPrice } =
    useMediaQueriesContext();

  const convertPrices = async () => {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_CURRENCY_ID}&symbols=${convertPrice}`;
    const res = await axios.get(url);
    const currencyValues = Object.values(res.data.rates);
    return currencyValues[0];
    // const currencyValues = res.data.rates
    // // console.log(currencyValues);
    // for (let x in currencyValues) {
    //   console.log(122 * currencyValues[x]);
    // }
  };
  return { convertPrices };
};

export default usePriceConversion;
