import axios from "axios";
import { useSelector } from "react-redux";
import { useMediaQueriesContext } from "../context/MediaQueryContext";

const useRoomsAvailabilityCheck = () => {
  let { dateSearch, searchQueryDates } = useSelector(
    (state) => state.searchState
  );
  let { basketItems } = useSelector((state) => state.basket);
  let { date } = useMediaQueriesContext();

  // console.log(basketItems);

  const getDatesInRanges = (startDate, endDate) => {
    // we get the current date from the state
    const start = new Date(startDate);
    const end = new Date(endDate);

    // we get the time from the start date for better comparison
    const date = new Date(start.getTime());

    const dates = [];

    // while the start date is less then or equal to the end date in our state, we should push the start date to an array
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRanges(
    dateSearch[0]?.startDate,
    dateSearch[0]?.endDate
  );

  let datesInBasket = basketItems.map((getRoomId) => getRoomId.dateSearch[0]);
  // datesInBasket.map((date) => new Date(date.startDate));
  const getDatesInRangesInBasket = (startDate, endDate) => {
    // we get the current date from the state
    let start;
    const end = new Date(endDate);
    startDate.forEach((item, index) => {
      // console.log(new Date(item));
      // start += new Date(item).getTime();
      start = Number(item)
    });
    // console.log(start);
    console.log(new Date(start));

    // we get the time from the start date for better comparison
    const date = new Date(start).getTime();
    // console.log(date);

    const dates = [];

    // while the start date is less then or equal to the end date in our state, we should push the start date to an array
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDatesInBasket = getDatesInRangesInBasket(
    datesInBasket.map((date) => new Date(date.startDate)),
    datesInBasket.map((date) => new Date(date.endDate))
  );
  // console.log(allDatesInBasket);
  // map through the roomNumbers in the database. if some of the date includes the
  const isAvailable = (roomsNumber) => {
    const isFound = roomsNumber.map((num) =>
      num.unavailableDates.some((date) =>
        allDates.includes(new Date(date).getTime())
      )
    );
    return !isFound[0];
  };

  const handlePay = async () => {
    try {
      await Promise.all(
        basketItems.map((getRoomId) =>
          getRoomId[0].roomNumbers.map((id) => {
            const res = axios.put(
              `http://localhost:8800/api/v1/rooms/rooms-availability/${id._id}`,
              { dates: allDatesInBasket }
            );
            return res.data;
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { getDatesInRanges, isAvailable, handlePay };
};

export default useRoomsAvailabilityCheck;
