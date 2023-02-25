import { useSelector } from "react-redux";
import { useMediaQueriesContext } from "../context/MediaQueryContext";

const useDaysCalculate = () => {
  // we are using the searchQueryDates from our redux to determine the number of days a user has selected because on every time the user refreshes the the single hotel page, we stil want to get the days without it being cleared off.
  let { dateSearch } = useSelector((state) => state.searchState);
  const { date,  } = useMediaQueriesContext()
  // console.log(searchQueryDates);

  const Milliseconds_Per_Day = 1000 * 60 * 60 * 24;
  // subtract the starting date from the ending date and divide it by one whole day
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / Milliseconds_Per_Day);
    return diffDays === 0 ? 1 : diffDays;
  }

  const days = dayDifference(
    new Date(dateSearch[0]?.startDate),
    new Date(dateSearch[0]?.endDate)
  );
  return { days };
};

export default useDaysCalculate;
