import axios from "axios";
import { useSelector } from "react-redux";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useAuthContext } from "../context/AuthContext";
import { useBasketContext } from "../context/BasketItemsContext";

const useRoomsAvailabilityCheck = () => {
  let { dateSearch } = useSelector((state) => state.searchState);
  // let { basketItems } = useSelector((state) => state.basket);
  let { basketItems } = useBasketContext();
  let { user } = useAuthContext();

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

  const getDatesInRangesInBasket = (startDate, endDate) => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  // map through the roomNumbers in the database. if some of the date includes the
  const isAvailable = (roomsNumber) => {
    const isFound = roomsNumber.map((num) =>
      num.unavailableDates.some((date) =>
        allDates.includes(new Date(date).getTime())
      )
    );
    return !isFound[0];
  };

  // Within the inner Promise.all(), we are using the dateSearch property of the item to get the relevant dates for the roomObj. We are then calling the getDatesInRangesInBasket() function to generate an array of dates between the start and end dates for each date in the dateSearch array. These dates are stored in the dates array.
  const putBookedRoomsDate = async () => {
    try {
      // using a nested Promise.all() to map the roomNumbers array for each item in the basketItems array.
      await Promise.all(
        basketItems.map((item) => {
          return Promise.all(
            item.roomNumbers.map(async (roomObj) => {
              const dates = item.dateSearch.flatMap((date) => {
                const startDate = new Date(date.startDate);
                const endDate = new Date(date.endDate);
                return getDatesInRangesInBasket(startDate, endDate);
              });

              const res = await axios.put(
                `${WILL_TRIP_BASE_URL}/rooms/update/rooms-availability/${roomObj._id}`,
                { dates },
                {
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                }
              );
              return res.data;
            })
          );
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return { getDatesInRanges, isAvailable, putBookedRoomsDate };
};

export default useRoomsAvailabilityCheck;
