import React, { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { format } from "date-fns";
import SearchButtonSpinner from "../../components/Spinner/SearchButtonSpinner";
import { useBasketContext } from "../../context/BasketItemsContext";
import useRoomsAvailabilityCheck from "../../utils/useRoomsAvailabilityCheck";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { io } from "socket.io-client";
const pdf = new jsPDF();

const TransactionsPage = () => {
  const [socket, setSocket] = useState(null);

  const [transactionsDetails, setTransactionsDetails] = useState(null);
  const [loading, setLoadingState] = useState(false);
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState();
  const { getCartItems, setFetchStatus, clearAllCartItems } =
    useBasketContext();

  const navigate = useNavigate();

  let { putBookedRoomsDate } = useRoomsAvailabilityCheck();

  let { bookingsData } = useSelector((state) => state.bookings);

  const [cancelledMsg, setCancelledMsg] = useState("");

  const [transactionDetailsFetched, setTransactionDetailsFetched] =
    useState("idle");

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

  // // when we click on the button, we send an event and out socket send the event to the user
  // const handleNotification = () => {
  //   const bookingOptions = transactionsDetails?.transaction_data;
  //   // this send an event to the server when the user carry out an notification functionality
  //   socket.emit("sendNotification", {
  //     senderID: user?.id,
  //     receiverName: "dashboard",
  //     roomNumber: transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
  //       (option) => option.roomNumber
  //     ),
  //     roomTitle: transactionsDetails?.transaction_data?.bookedRoomsOption?.map(
  //       (option) => option.roomTitle
  //     ),
  //     firstName: bookingOptions?.firstName,
  //     lastName: bookingOptions?.lastName,
  //     bookingID: bookingOptions?._id,
  //     bookedAt: new Date(),
  //   });
  // };

  const handleNotification = () => {
    const { transaction_data: bookingOptions } = transactionsDetails || {};

    const roomNumbers =
      bookingOptions?.bookedRoomsOption?.map((option) => option.roomNumber) ||
      [];
    const roomTitles =
      bookingOptions?.bookedRoomsOption?.map((option) => option.roomTitle) ||
      [];

    const notificationData = {
      senderID: user?.id,
      receiverName: "dashboard",
      roomNumbers,
      roomTitles,
      firstName: bookingOptions?.firstName,
      lastName: bookingOptions?.lastName,
      bookingID: bookingOptions?._id,
      bookedAt: new Date(),
    };

    socket.emit("sendNotification", notificationData);
  };

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
        // handleNotification();
        setTransactionDetailsFetched("pending");
      }
    } catch (error) {
      setLoadingState(false);
      // toast.error(error.response?.data?.message);
      setError(error.response?.data);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [
    searchParams.get("status"),
    searchParams.get("tx_ref"),
    searchParams.get("transaction_id"),
  ]);

  useEffect(() => {
    const socketInstance = io("http://localhost:8200");
    setSocket(socketInstance);
    return () => {
      // Clean up the socket connection when the component unmounts
      socketInstance.disconnect();
    };
  }, []);

  // this send event to the server when a user logs in
  useEffect(() => {
    socket?.emit("newUser", user?.id);
  }, [socket, user?.id]);

  const cancelBookings = async () => {
    try {
      const res = await axios.put(
        `${WILL_TRIP_BASE_URL}/transactions/cancel-transaction/${searchParams.get(
          "tx_ref"
        )}`
      );
      if (res?.data?.status === "success") {
        setCancelledMsg(res?.data?.msg);
        // setSearchParams()
        // toast.success(res?.data?.msg);
        // getTransactions();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

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
          {/* <span>
              <FaCheck className="text-4xl font-extrabold text-green-600" />
            </span> */}
          {transactionsDetails?.transaction_description ===
            "TRANSACTION SUCCESSFUL" && cancelledMsg === "" ? (
            <div className="flex flex-col justify-center items-center my-4">
              <span>
                <FaCheck className="text-4xl font-extrabold text-green-600" />
              </span>
              <h4 className="font-bold text-xl text-[#434b52] mb-4">
                Your stay is booked!
              </h4>
              <p className="text-sm font-light mb-4">
                We have sent a confirmation mail to{" "}
                {transactionsDetails?.transaction_data?.email}
              </p>
            </div>
          ) : (
            ""
          )}
          {/* {cancelledMsg !== "" && (
            <div className="flex flex-col justify-center items-center my-4">
              <span>
                <FaCheck className="text-4xl font-extrabold text-green-600" />
              </span>
              <h4 className="font-bold text-xl text-[#434b52] mb-4">
                {cancelledMsg}
              </h4>
              <p className="text-sm font-light mb-4">
                We have sent a cancelled confirmation mail to{" "}
                {transactionsDetails?.transaction_data?.email}
              </p>
            </div>
          )} */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <div
              className="border rounded py-1 px-4 border-red-700 flex justify-end items-center text-red-700 hover:bg-red-700 hover:text-white duration-500 cursor-pointer text-sm"
              onClick={() => handleNotification()}
            >
              <h1 className="">Download this receipt</h1>
              <IoMdDownload />
            </div>
            {/* {transactionsDetails?.transaction_description ===
              "TRANSACTION SUCCESSFUL" && (
              <div
                className="border rounded py-1 px-4 border-red-700 flex justify-end items-center text-red-700 hover:bg-red-700 hover:text-white duration-500 cursor-pointer text-sm"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel this reservation?"
                    )
                  ) {
                    // function here
                    cancelBookings();
                    navigate(
                      `/transactions?status=cancelled&tx_ref=${searchParams.get(
                        "tx_ref"
                      )}&transaction_id=${searchParams.get("transaction_id")}`
                    );
                  }
                }}
              >
                <h1 className="">Cancel my reservation</h1>
              </div>
            )} */}
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
                  <h3 className="capitalize">
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
                    {transactionsDetails?.transaction_data?.reference_id
                      ? transactionsDetails?.transaction_data?.reference_id
                      : error?.ref}
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
                      : error?.message}
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
