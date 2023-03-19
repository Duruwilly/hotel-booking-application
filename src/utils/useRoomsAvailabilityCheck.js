import axios from "axios";
import { useSelector } from "react-redux";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
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
    // the same with the one at the top cuz it is not getting the time still getting the date
    const date = new Date(start.getTime());
    // console.log(date.setDate(date.getDate() + 1));
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
  // console.log(datesInBasket.map((date) => new Date(date.startDate)));
  // datesInBasket.map((date) => new Date(date.startDate));
  const getDatesInRangesInBasket = (startDate, endDate) => {
    // we get the current date from the state
    // let start = new Date(startDate);
    // const end = new Date(endDate);
    // let starts = "";
    // let end = "";
    // startDate.forEach((item, index) => {
    //   starts += new Date(item) + " ";
    // });

    // endDate.forEach((item, index) => {
    //   end += new Date(item) + " ";
    // });
    // console.log(starts, end);
    // for(let i = starts; i <= end; i++){
    //   console.log(i);
    // }
    // console.log(new Date(start));
    // console.log(startDate, endDate);
    // const data = []
    // we get the time from the start date for better comparison
    // const date = startDate.map((dates) => new Date(dates).getTime());
    // console.log(date);
    // data.push(...date)
    // console.log(data);
    // const setTheDate = startDate.map((dates) =>
    //   new Date(dates).setDate(new Date(dates).getDate() + 1)
    // );
    // const getTheDate = startDate.map((dates) => new Date(dates).getDate() + 1);
    // console.log(getTheDate);
    // const dater = new Date(startDate[0]);
    const dates = [];
    // console.log(dater, endDate[0]);
    // while (dater <= endDate[0]) {
    //   dates.push(new Date(dater).getTime());
    //   dater.setDate(dater.getDate() + 1);
    // }
    // console.log(dates);
    // while the start date is less then or equal to the end date in our state, we should push the start date to an array
    // for (let i = startDate[0]; i <= endDate[0]; i + 1) {
    //   console.log(i);
    //   // dates.push(...date);
    //   // startDate.map((dates) =>
    //   //   new Date(dates).setDate(new Date(dates).getDate() + 1)
    //   // );
    // }

    // for(let i = 0; i <= startDate.length; i++) {
    //   console.log(startDate[i]);
    // }
    // console.log(startDate[0], endDate[0]);
    //  for(let i = startDate[0]; i < endDate[0]; i++) {
    //   console.log(endDate[i]);
    //  }

    // while (startDate[0] <= endDate[0]) {
    //   dates.push(new Date(dater).getTime());
    //   dater.setDate(dater.getDate() + 1);
    // }
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

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
  // const allDatesInBasket = getDatesInRangesInBasket(
  //   datesInBasket[0].startDate,
  //   datesInBasket[0].endDate
  // );

  // console.log(allDatesInBasket);

  // console.log(allDatesInBasket[0]);
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

  const putBookedRoomsDate = async () => {
    try {
      await Promise.all(
        basketItems.map((getRoomId) =>
          getRoomId[0].roomNumbers.map((id) => {
            const res = axios.put(
              `${WILL_TRIP_BASE_URL}/rooms/rooms-availability/${id._id}`,
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

  return { getDatesInRanges, isAvailable, putBookedRoomsDate };
};

export default useRoomsAvailabilityCheck;
