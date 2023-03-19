import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PriceConversion from "../../components/PriceConversion/PriceConversion";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import BasketItem from "./component/BasketItem";
import { paymentBg } from "../../BgImageStyles/styles";
import { useTitle } from "../../hooks/useTitle";
import { FaTimes } from "react-icons/fa";
import { getCountries } from "../../utils/getCountries";
import SearchInputHeader from "../../components/PagesSearchHeaders/SearchInputHeader";
import ToggledSearchHeader from "../../components/PagesSearchHeaders/ToggledSearchHeader";
import usePriceConversion from "../../utils/usePriceConversion";
import { useBasketContext } from "../../context/BasketItemsContext";

const Basket = () => {
  useTitle("Book the world best hotel");
  const [countries, setCountries] = useState([]);
  const inputStyles =
    "w-full focus:outline-none border border-gray-300 p-3 placeholder:text-sm block rounded-md";
  const { steps, setSteps, list, matches, convertPrice, fetchHotelStatus } =
    useMediaQueriesContext();
  const { basketItems, total, fetchStatus, setFetchStatus } =
    useBasketContext();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(true);
    }, 10000);
  }, []);

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    setFetchStatus("idle");
  }, []);

  useEffect(() => {
    window.onpopstate = () => {
      setFetchStatus("idle");
    };
  }, []);

  return (
    <>
      {basketItems.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg">
            <ProgressBar step={steps} list={list} />
          </div>
        </div>
      ) : matches ? (
        <SearchInputHeader />
      ) : (
        <ToggledSearchHeader />
      )}
      <section className="flex justify-center relative">
        <div className="w-full max-w-screen-sm px-4">
          <Confirmation
            setSteps={setSteps}
            convertPrice={convertPrice}
            fetchHotelStatus={fetchHotelStatus}
            basketItems={basketItems}
            total={total}
            setFetchStatus={setFetchStatus}
          />
        </div>
        {basketItems.length > 0 && openModal && (
          <div
            className=" w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[100] px-2"
            style={{ background: "rgba(255, 255, 255, 0.6)" }}
          >
            <div className="bg-white relative w-full max-w-screen-sm shadow-md">
              <div style={paymentBg}></div>
              <FaTimes
                onClick={() => setOpenModal(false)}
                className="text-white absolute top-4 right-4 text-3xl cursor-pointer"
              />
              <div>
                <div className="py-8">
                  <h1 className="text-3xl text-center uppercase font-normal">
                    need some time?
                  </h1>
                  <p
                    className="text-center text-base pt-6 pb-4"
                    style={{ color: "#4e4e4e" }}
                  >
                    If you're still thinking it over, just fill in the below and
                    we'll email you the details.
                  </p>
                  <form>
                    <div className=" space-y-6 px-8">
                      <div className="flex modalInputs gap-5">
                        <input
                          type="text"
                          className={inputStyles}
                          placeholder="First name"
                          id="firstName"
                        />
                        <input
                          type="text"
                          className={inputStyles}
                          placeholder="Last name"
                          id="lastName"
                        />
                      </div>
                      <div className="flex modalInputs gap-5">
                        <input
                          type="text"
                          className={inputStyles}
                          placeholder="Phone number"
                          id="mobileNumber"
                        />
                        <select
                          name="country"
                          id="country"
                          className={`${inputStyles} text-sm`}
                        >
                          <option value="">Select Country</option>
                          {countries?.map((country, index) => (
                            <option value={country?.name} key={index}>
                              {country?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-center">
                        <button className="bg-red-900 py-4 px-9 uppercase text-white text-xs font-light cursor-pointer w-full">
                          submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Basket;

const Confirmation = ({
  setSteps,
  convertPrice,
  fetchHotelStatus,
  basketItems,
  total,
  setFetchStatus,
}) => {
  // let { basketItems } = useSelector((state) => state.basket);
  const navigate = useNavigate();
  const [exchangedPrice, setExchangedPrice] = useState();
  const { convertPrices } = usePriceConversion();

  useEffect(() => {
    setSteps(() => 1);
  }, []);

  const buttonNavigate = () => {
    setSteps(() => 2);
    navigate("/payment");
  };

  useEffect(() => {
    convertPrices().then((data) => {
      setExchangedPrice(data);
    });
  }, [convertPrice, fetchHotelStatus]);

  return (
    <section className="py-12">
      {basketItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-center text-4xl font-light pb-5 lg:pb-0">
            Your basket
          </h1>
          <PriceConversion />
        </div>
      ) : null}
      {basketItems && basketItems.length > 0 && (
        <div>
          {basketItems.map((basket) => (
            <div key={basket._id}>
              <BasketItem
                {...basket}
                exchangedPrice={exchangedPrice}
                convertPrice={convertPrice}
                setFetchStatus={setFetchStatus}
              />
            </div>
          ))}
          <div
            className="pt- py-3 flex justify-between items-center"
            style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
          >
            <span className="text-xl font-light capitalize">total price</span>
            <p className="text-3xl font-light">
              {`${
                convertPrice === "USD"
                  ? "$"
                  : convertPrice === "EUR"
                  ? "£"
                  : "₦"
              } ${[total * exchangedPrice]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </p>
          </div>
          <div className="mt-4">
            <button
              className="bg-green-700 text-white relative w-full  py-4 font-medium rounded-sm focus:outline-none uppercase tracking-widest text-xs"
              onClick={buttonNavigate}
            >
              confirm booking
            </button>
          </div>
        </div>
      )}
      {basketItems.length < 0 && (
        <div className="flex justify-center flex-col items-center pt-10">
          <h1 className="font-light text-xl mb- text-gray-90  py-">
            Your basket is currently empty. For inspiration, try our{" "}
            <Link to="/" className="text-red-800">
              popular searches in the home page{" "}
            </Link>
            or add your keywords to the search bar above
          </h1>
        </div>
      )}
    </section>
  );
};
