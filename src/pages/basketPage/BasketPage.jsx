import React, { useEffect, useRef, useState } from "react";
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
import SearchButtonSpinner from "../../components/Spinner/SearchButtonSpinner";
import useRoomsAvailabilityCheck from "../../utils/useRoomsAvailabilityCheck";

const Basket = () => {
  useTitle("Book the world best hotel");
  const [countries, setCountries] = useState([]);
  const inputStyles =
    "w-full focus:outline-none border border-gray-300 p-3 placeholder:text-sm block rounded-md";
  const { steps, setSteps, list, matches, convertPrice, fetchHotelStatus } =
    useMediaQueriesContext();
  const { basketItems, total, setDatesCheck, datesCheck, loading } =
    useBasketContext();
  const [openModal, setOpenModal] = useState(false);

  let { checkRoomsAvailability } = useRoomsAvailabilityCheck();

  const [fetchingStatus, setFetchingStatus] = useState("idle");

  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(true);
    }, 120000);
  }, []);

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    if (basketItems.length > 0) {
      let roomId = basketItems.map((item) => item.itemId);
      const apiCallsFunc = async () => {
        try {
          const newVal = await roomId.map(async (item) => {
            const room = await checkRoomsAvailability(item);

            return room;
          });

          Promise.allSettled(newVal).then(async (data) => {
            await setDatesCheck(() => [...data?.map((item) => item?.value)]);
            if (datesCheck?.length === basketItems?.length) {
              setLoadingState(false);
            }
          });
        } catch (error) {
          console.log({ error });
        }
      };

      apiCallsFunc();
    }
    return () => {
      setLoadingState(false);
    };
  }, [basketItems]);
  console.log(basketItems);
  if (loading) return <SearchButtonSpinner />;
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
      <section className="flex justify-center relative flex-1">
        <div className="w-full max-w-screen-sm px-4">
          <Confirmation
            setSteps={setSteps}
            convertPrice={convertPrice}
            fetchHotelStatus={fetchHotelStatus}
            basketItems={basketItems}
            total={total}
            datesCheck={datesCheck}
            setFetchingStatus={setFetchingStatus}
            fetchingStatus={fetchingStatus}
          />
        </div>
        {basketItems.length > 0 && openModal && (
          <Modal countries={countries} setOpenModal={setOpenModal} />
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
  setFetchingStatus,
  fetchingStatus,
}) => {
  const navigate = useNavigate();
  const [exchangedPrice, setExchangedPrice] = useState(1);
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

  // CHECK THE MAX PEOPLE IN EACH BASKET ITEM
  let maxPeopleCheck = basketItems?.map((maxPeople) => maxPeople?.maxPeople)[0];

  // CHECK THE GUEST TO BE LODGED IN A ROOM
  let guestCheck = basketItems?.map((guest) => guest?.roomOptions)[0];

  // CHECK IF HOTEL NAME IS REPEATED OR GREATER THAN ONE
  function isHotelKeyValueRepeated(basketItems, keyName, value) {
    const filteredArray = basketItems.filter((item) => item[keyName] === value);
    return filteredArray.length > 1;
  }

  // GET THE NAMES OF THE HOTEL IN THE BASKET
  const hotelName = basketItems?.map((hotelName) => hotelName?.hotelName)[0];

  const isHotelNameRepeated = isHotelKeyValueRepeated(
    basketItems,
    "hotelName",
    hotelName
  );

  return (
    <section className="py-12">
      {basketItems?.length > 0 ? (
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-center text-4xl font-light pb-5 lg:pb-0">
            Confirm booking
          </h1>
          <PriceConversion />
        </div>
      ) : null}
      {basketItems && basketItems.length > 0 && (
        <div>
          {basketItems?.map((basket) => (
            <div key={basket._id}>
              <BasketItem
                {...basket}
                exchangedPrice={exchangedPrice}
                convertPrice={convertPrice}
                basketItems={basketItems}
                setFetchingStatus={setFetchingStatus}
                fetchingStatus={fetchingStatus}
              />
            </div>
          ))}
          {(guestCheck?.adult + guestCheck?.children > maxPeopleCheck &&
            basketItems?.length === 1) ||
          (guestCheck?.adult + guestCheck?.children > maxPeopleCheck &&
            !isHotelNameRepeated) ? (
            <p className="text-red-800 font-light text-sm">
              guest exceed the maximum people in this room. Kindly select more
              than one room before you can proceed.
            </p>
          ) : null}
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
              } ${[(total * exchangedPrice).toFixed(2)]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </p>
          </div>
          <div className="mt-4">
            <button
              disabled={
                (guestCheck?.adult + guestCheck?.children > maxPeopleCheck &&
                  basketItems?.length === 1) ||
                (guestCheck?.adult + guestCheck?.children > maxPeopleCheck &&
                  !isHotelNameRepeated)
              }
              className="bg-green-700 disabled:bg-opacity-80 text-white relative w-full  py-4 font-medium rounded-sm focus:outline-none uppercase tracking-widest text-xs"
              onClick={buttonNavigate}
            >
              confirm booking
            </button>
          </div>
        </div>
      )}
      {basketItems.length === 0 && (
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

const Modal = ({ countries, setOpenModal }) => {
  return (
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
              If you're still thinking it over, just fill in the below and we'll
              email you the details.
            </p>
            <form>
              <div className=" space-y-6 px-8">
                <div className="flex modalInputs gap-5">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="First name"
                    id="firstName"
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Last name"
                    id="lastName"
                  />
                </div>
                <div className="flex modalInputs gap-5">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Phone number"
                    id="mobileNumber"
                  />
                  <select
                    name="country"
                    id="country"
                    className="form-input text-sm"
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
  );
};
