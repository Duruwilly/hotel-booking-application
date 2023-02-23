import axios from "axios";
import { useSelector } from "react-redux";

const useRoomsAvailabilityCheck = () => {
  let { dateSearch } = useSelector((state) => state.searchState);
  let { basketItems } = useSelector((state) => state.basket);

  const getDatesInRanges = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRanges(
    dateSearch[0].startDate,
    dateSearch[0].endDate
  );

  const isAvailable = (roomsNumber) => {
      const isFound = roomsNumber.map((num) =>
        num.unavailableDates.some((dater) => 
          allDates.includes(new Date(dater).getTime())
        )
      )
    return !isFound[0]
    
  };

  const handlePay = async () => {
    try {
      await Promise.all(
        basketItems.map((getRoomId) =>
          getRoomId[0].roomNumbers.map((id) => {
            const res = axios.put(
              `http://localhost:8800/api/v1/rooms/rooms-availability/${id._id}`,
              { dates: allDates }
            );
            return res.data;
          })
        )
      );
    } catch (error) {}
  };

  return { getDatesInRanges, isAvailable, handlePay };
};

export default useRoomsAvailabilityCheck;
