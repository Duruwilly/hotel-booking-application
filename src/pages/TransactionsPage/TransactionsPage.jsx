import React, { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
const pdf = new jsPDF();

const TransactionsPage = () => {
  const { id } = useParams();
  const [transactionsDetails, setTransactionsDetails] = useState({});
  const [loading, setLoadingState] = useState(false);
  const [fetchingState, setFetchingState] = useState("idle");
  const { user } = useAuthContext();
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
        `${WILL_TRIP_BASE_URL}/${id}/transactions/single-transaction/${user?.id}`,
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

  // useEffect(() => {
  //  getTransactions();
  // }, [fetchingState]);

  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-screen-sm h-screen px-4 mt-7">
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
                <td className=" capitalize">princewill</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td className=" capitalize">duru</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>08034031589</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>10Ten10@gmail.com</td>
              </tr>
              <tr>
                <td>Arrival Time</td>
                <td>02:00</td>
              </tr>
              <tr>
                <td>Hotel Name</td>
                <td>del-rel</td>
              </tr>
              <tr>
                <td>Hotel Location</td>
                <td className="capitalize">lagos, nigeria</td>
              </tr>
              <tr>
                <td>Room Title</td>
                <td className="capitalize">executive</td>
              </tr>
              <tr>
                <td>Room Price</td>
                <td>
                  ₦ ({[1000].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
                </td>
              </tr>
              <tr>
                <td>Room Number</td>
                <td>201</td>
              </tr>
              <tr>
                <td>Booking Dates</td>
                <td>2023-02-15 - 2023-02-17</td>
              </tr>
              <tr>
                <td>Adult</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Children</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Days</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Transaction Date</td>
                <td>date here</td>
              </tr>
              <tr>
                <td>Transaction ID</td>
                <td className="text-red-700 text-xl">id here</td>
              </tr>
              <tr>
                <td>Transaction Status</td>
                <td>success</td>
              </tr>
              <tr>
                <td>Transaction Description</td>
                <td>TRANSACTION SUCCESSFUL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransactionsPage;
