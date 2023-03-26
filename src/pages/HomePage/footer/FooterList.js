import React from "react";
import NewsLetter from "../newsletter/NewsLetter";
import PhoneContact from "../phoneContact/PhoneContact";
import Footer from "./Footer";
import FooterLinks from "./FooterLinks";

const FooterList = () => {
  return (
    <>
      <PhoneContact />
      {/* <NewsLetter /> */}
      <FooterLinks />
      <Footer />
    </>
  );
};

export default FooterList;
