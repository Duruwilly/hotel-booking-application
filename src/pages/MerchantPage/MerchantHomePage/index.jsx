import React from "react";
import { AddHotelProvider } from "./context/AddhotelContext";
import MerchantHomePage from "./MerchantHomePage";

const MerchantHome = () => {
  return (
    <AddHotelProvider>
      <MerchantHomePage />
    </AddHotelProvider>
  );
};

export default MerchantHome;
