import React, { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { format } from "date-fns";
import SearchButtonSpinner from "../../components/Spinner/SearchButtonSpinner";
import { useBasketContext } from "../../context/BasketItemsContext";
import useRoomsAvailabilityCheck from "../../utils/useRoomsAvailabilityCheck";
import { useSelector } from "react-redux";
import logo from "../../assets/logo/logo2.png";
import logder from "../../assets/images/lodger.jpg";
const pdf = new jsPDF();

const TransactionsPage = () => {
  const [transactionsDetails, setTransactionsDetails] = useState(null);
  const [loading, setLoadingState] = useState(false);
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState();
  const { getCartItems, setFetchStatus, clearAllCartItems } =
    useBasketContext();
  let { putBookedRoomsDate } = useRoomsAvailabilityCheck();
  let { bookingsData } = useSelector((state) => state.bookings);

  function finalPrint() {
    const input = document.getElementById("main");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    html2canvas(input, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [width, height],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      //   pdf.output("dataurlnewwindow");
      pdf.save(`WillTripBooking.pdf`);
    });
  }

  // const clearAllCartItems = async () => {
  //   let url = `${WILL_TRIP_BASE_URL}/cart/delete-all-items/${user?.id}`;
  //   try {
  //     let response = await axios.delete(url, {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     });
  //     if (response.data.status === "success") {
  //       setFetchStatus("idle");
  //       getCartItems(user);
  //       toast.success(response?.data?.msg);
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //   }
  // };

  const getTransactions = async () => {
    setLoadingState(true);
    try {
      const res = await axios.get(
        `${WILL_TRIP_BASE_URL}/transactions/payment-callback/${searchParams.get(
          "status"
        )}/${searchParams.get("tx_ref")}/${searchParams.get("transaction_id")}`
      );
      if (res?.data?.status === "success") {
        setLoadingState(false);
        setTransactionsDetails(res?.data);
        clearAllCartItems(user);
        putBookedRoomsDate();
      }
    } catch (error) {
      setLoadingState(false);
      // toast.error(error.response?.data?.message);
      // come here later to add the ref from the error
      // setError(error.response?.data);
      setError(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [
    searchParams.get("status"),
    searchParams.get("tx_ref"),
    searchParams.get("transaction_id"),
  ]);

  // CHECK IF HOTEL NAME IS REPEATED OR GREATER THAN ONE
  const isHotelNameKeyValueRepeated = (hotelName, keyName, value) => {
    const filteredArray = hotelName?.filter((item) => item[keyName] === value);
    return filteredArray?.length > 1;
  };

  // GET THE NAMES OF THE HOTEL IN THE BASKET
  const hotelName =
    transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
      (hotelName) => hotelName?.hotelName
    )[0];

  const isHotelNameRepeated = isHotelNameKeyValueRepeated(
    transactionsDetails?.transaction_data?.bookedRoomsOption,
    "hotelName",
    hotelName
  );

  // CHECK IF HOTEL ADDRESS IS REPEATED OR GREATER THAN ONE
  const isHotelAddressKeyValueRepeated = (hotelAddress, keyName, value) => {
    const filteredArray = hotelAddress?.filter(
      (item) => item[keyName] === value
    );
    return filteredArray?.length > 1;
  };

  // GET THE ADDRESS OF THE HOTEL IN THE BASKET
  const hotelAddress =
    transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
      (hotelAddress) => hotelAddress?.hotelAddress
    )[0];

  const isHotelAddressRepeated = isHotelAddressKeyValueRepeated(
    transactionsDetails?.transaction_data?.bookedRoomsOption,
    "hotelAddress",
    hotelAddress
  );

  // GET THE HOTEL BOOKING DATES
  const bookingDates =
    transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
      (bookingDates) =>
        `${format(
          new Date(bookingDates.bookingStartDate),
          "dd MMM yyyy"
        )} to ${format(new Date(bookingDates.bookingEndDate), "dd MMM yyyy")}`
    );

  // IF THERE ARE MORE THAN ONE CHECK-IN AND CHECK-OUT, ADD A WORD "AND" IN BETWEEN
  const formattedBookingDates =
    bookingDates?.slice(0, -1).join(", ") + " and " + bookingDates?.slice(-1);

  if (loading) return <SearchButtonSpinner />;
  return (
    <>
      <section className="flex justify-center items-center">
        <div className="w-full max-w-screen-md px-4 mt- py-5">
          <div
            className="flex justify-end items-center text-red-900 mb-3"
            onClick={finalPrint}
          >
            <h1 className="cursor-pointer">Dowload Receipt</h1>
            <IoMdDownload />
          </div>
          <div className="bg-white" id="main">
            <main className="border-t-8 border-t-red-800">
              <div className="bg-primary py-6 text-white text-center">
                {transactionsDetails !== null &&
                  (isHotelNameRepeated ? (
                    transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                      (hotelName) => (
                        <h2 className="capitalize">
                          {hotelName.hotelName} hotel
                        </h2>
                      )
                    )[0]
                  ) : (
                    <>
                      {transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                        (hotelName) => (
                          <h2 className="capitalize">
                            {hotelName.hotelName} hotel
                          </h2>
                        )
                      )}
                    </>
                  ))}
                <>
                  {isHotelAddressRepeated
                    ? transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                        (hotelAddress) => (
                          <p>{hotelAddress.hotelAddress.toUpperCase()}</p>
                        )
                      )[0]
                    : transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                        (hotelAddress) => (
                          <p>{hotelAddress.hotelAddress.toUpperCase()}</p>
                        )
                      )}
                </>
              </div>
              <div className="px-5 pt-9 space-y-4">
                {transactionsDetails !== null && (
                  <h3>
                    Dear {transactionsDetails?.transaction_data?.lastName}{" "}
                    {transactionsDetails?.transaction_data?.firstName}
                  </h3>
                )}
                {transactionsDetails !== null ? (
                  <>
                    {" "}
                    <p>
                      {isHotelNameRepeated ? (
                        <>
                          Your payment has been confirmed and the people at{" "}
                          {
                            transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                              (hotelName) =>
                                hotelName.hotelName.charAt(0).toUpperCase() +
                                hotelName.hotelName.slice(1)
                            )[0]
                          }
                        </>
                      ) : (
                        <>
                          Your payment has been confirmed and the people at{" "}
                          {transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                            (hotelName) =>
                              hotelName.hotelName.charAt(0).toUpperCase() +
                              hotelName.hotelName.slice(1)
                          )}
                        </>
                      )}{" "}
                      hotel will be delighted to have you from{" "}
                      {formattedBookingDates} Thank you for choosing us.
                    </p>
                    <p>
                      {isHotelNameRepeated ? (
                        <>
                          Enjoy and feel the difference with{" "}
                          {
                            transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                              (hotelName) =>
                                hotelName.hotelName.charAt(0).toUpperCase() +
                                hotelName.hotelName.slice(1)
                            )[0]
                          }
                        </>
                      ) : (
                        <>
                          Enjoy and feel the difference with{" "}
                          {transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                            (hotelName) =>
                              hotelName.hotelName.charAt(0).toUpperCase() +
                              hotelName.hotelName.slice(1)
                          )}
                        </>
                      )}{" "}
                      Hotel.
                    </p>{" "}
                  </>
                ) : (
                  <p>
                    Your payment could not be confirmed. Kindly try again! Thank
                    you for choosing us.
                  </p>
                )}
                <p>
                  Regards, <br /> The WillTrip Team
                </p>
              </div>
              <div className="px-5 py-9">
                <h1 className="text-gray-900 uppercase text-center font-semibold text-2xl pb-6">
                  reservation summary
                </h1>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    Reservation Number:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails?.transaction_data.bookingNumber}
                  </span>
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    First Name:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails?.transaction_data?.firstName}
                  </span>
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    Last Name:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails?.transaction_data?.lastName}
                  </span>
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    Phone:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails?.transaction_data?.mobileNumber}
                  </span>
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    Email:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails?.transaction_data?.email}
                  </span>
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    Arrival Date:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails?.transaction_data?.arrivalTime}
                  </span>
                </div>
                {/* map here */}
                {transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
                  (options, index) => (
                    <React.Fragment key={index}>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          hotel name:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.hotelName}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          hotel location:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.hotelLocation}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          room title:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.roomTitle}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          room feature:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.feature}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          room price:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {transactionsDetails.transaction_data
                            .convertedPrice === "USD"
                            ? "$"
                            : transactionsDetails.transaction_data
                                .convertedPrice === "EUR"
                            ? "£"
                            : "₦"}
                          {[options.roomPrice]
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          room number:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.roomNumber}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          Booking Dates:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {format(
                            new Date(options.bookingStartDate),
                            "dd MMM yyyy"
                          )}{" "}
                          to{" "}
                          {format(
                            new Date(options.bookingEndDate),
                            "dd MMM yyyy"
                          )}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          adult:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.adult}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          children:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.children}
                        </span>
                      </div>
                      <div className="flex pb-2">
                        <p
                          className="font-semibold text-base capitalize"
                          style={{ flex: 1 }}
                        >
                          days:
                        </p>
                        <span
                          className="capitalize text-sm"
                          style={{ flex: 4 }}
                        >
                          {options.days}
                        </span>
                      </div>
                    </React.Fragment>
                  )
                )}
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    Check Out Time:
                  </p>
                  {transactionsDetails !== null && (
                    <span className="capitalize text-sm" style={{ flex: 4 }}>
                      12:00:00
                    </span>
                  )}
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    Total Amount:
                  </p>
                  <span
                    className="capitalize font-light text-sm"
                    style={{ flex: 4 }}
                  >
                    {transactionsDetails?.transaction_data?.convertedPrice ===
                    "USD"
                      ? "$"
                      : transactionsDetails?.transaction_data
                          ?.convertedPrice === "EUR"
                      ? "£"
                      : transactionsDetails?.transaction_data
                          ?.convertedPrice === "NGN"
                      ? "₦"
                      : ""}
                    {[transactionsDetails?.transaction_data?.total]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    transaction id:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails?.transaction_data?.reference_id}
                  </span>
                </div>
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    transaction status:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {transactionsDetails !== null
                      ? transactionsDetails?.transaction_description
                      : error}
                  </span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* {transactionsDetails === null && (
        <section className="flex justify-center items-center">
          <div className="w-full max-w-screen-md px-4 mt- py-5">
            <div
              className="flex justify-end items-center text-red-900 mb-3"
              onClick={finalPrint}
            >
              <h1 className="cursor-pointer">Dowload Receipt</h1>
              <IoMdDownload />
            </div>
            <div className="bg-white" id="main">
              <main className="border-t-8 border-t-red-800">
                <div className="flex pb-2">
                  <p
                    className="font-semibold text-base capitalize"
                    style={{ flex: 1 }}
                  >
                    transaction status:
                  </p>
                  <span className="capitalize text-sm" style={{ flex: 4 }}>
                    {error}
                  </span>
                </div>
              </main>
            </div>
          </div>
        </section>
      )} */}
    </>
  );
};

export default TransactionsPage;
