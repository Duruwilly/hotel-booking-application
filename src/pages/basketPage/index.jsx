import React from "react";
import { BasketProvider } from "../../context/BasketItemsContext";
import Basket from "./BasketPage";

const BasketPage = () => {
  return (
    <BasketProvider>
      <Basket />
    </BasketProvider>
  );
};

export default BasketPage;
