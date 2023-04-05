import React, { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { useSelector } from "react-redux";
import { format } from "date-fns";
const pdf = new jsPDF();

const TransactionsPage = () => {
  const { id } = useParams();
  const [transactionsDetails, setTransactionsDetails] = useState({});
  const [loading, setLoadingState] = useState(false);
  const [fetchingState, setFetchingState] = useState("idle");
  const { user } = useAuthContext();
  const { bookingsData } = useSelector((state) => state.bookings);

  console.log(bookingsData);

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

  const getTransactions = async () => {
    setLoadingState(true);
    setFetchingState("pending");
    try {
      const res = await axios.get(
        `${WILL_TRIP_BASE_URL}/transactions/single-transaction/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res?.data?.status === "success") {
        setLoadingState(false);
        setTransactionsDetails(res?.data?.data);
      }
    } catch (error) {
      setLoadingState(false);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [fetchingState]);

  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-screen-sm h-scree px-4 mt- py-5">
        <div
          className="flex justify-end items-center text-red-900"
          onClick={finalPrint}
        >
          <h1 className="cursor-pointer">Dowload Receipt</h1>
          <IoMdDownload />
        </div>
        <div id="main">
          <h1 className="font-bold text-xl py-2">Transaction Details</h1>
          <table>
            <tbody>
              <tr>
                <td>First Name</td>
                <td className=" capitalize">
                  {bookingsData?.transaction_data?.firstName}
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td className=" capitalize">
                  {bookingsData?.transaction_data.lastName}
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{bookingsData?.transaction_data.mobileNumber}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{bookingsData?.transaction_data.email}</td>
              </tr>
              <tr>
                <td>Arrival Time</td>
                <td>{bookingsData?.transaction_data?.arrivalTime}</td>
              </tr>

              {bookingsData?.transaction_data?.bookedRoomsOption.map(
                (options) => (
                  <>
                    <tr>
                      <td>Hotel Name</td>
                      <td>{options.hotelName}</td>
                    </tr>
                    <tr>
                      <td>Hotel Location</td>
                      <td className="capitalize">{options.hotelLocation}</td>
                    </tr>
                    <tr>
                      <td>Room Title</td>
                      <td className="capitalize">{options.roomTitle}</td>
                    </tr>
                    <tr>
                      <td>Room Price</td>
                      <td>
                        {bookingsData.transaction_data.convertedPrice === "USD"
                          ? "$"
                          : bookingsData.transaction_data.convertedPrice ===
                            "EUR"
                          ? "£"
                          : "₦"}
                        {[options.roomPrice]
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                    </tr>
                    <tr>
                      <td>Room Number</td>
                      <td>{options.roomNumber}</td>
                    </tr>
                    <tr>
                      <td>Booking Dates</td>
                      <td>{`${format(
                        new Date(options.bookingStartDate),
                        "dd MMMM yyyy"
                      )} - ${format(
                        new Date(options.bookingEndDate),
                        "dd MMMM yyyy"
                      )}`}</td>
                    </tr>
                    <tr>
                      <td>Adult</td>
                      <td>{options.adult}</td>
                    </tr>
                    <tr>
                      <td>Children</td>
                      <td>{options.children}</td>
                    </tr>
                    <tr>
                      <td>Days</td>
                      <td>{options.days}</td>
                    </tr>
                  </>
                )
              )}
              <tr>
                <td>Transaction Date</td>
                <td>{`${format(
                  new Date(bookingsData?.transaction_date),
                  "dd-MM-yyyy"
                )}`}</td>
              </tr>
              <tr>
                <td>Transaction ID</td>
                <td className="text-red-700 text-xl">
                  {bookingsData?.transaction_data?.transaction_id}
                </td>
              </tr>
              <tr>
                <td>Transaction Status</td>
                <td>{bookingsData?.status}</td>
              </tr>
              <tr>
                <td>Transaction Description</td>
                <td>{bookingsData?.transaction_description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransactionsPage;
