import { useSelector } from "react-redux";

const useDaysCalculate = () => {
  let { dateSearch } = useSelector((state) => state.searchState);

  const Milliseconds_Per_Day = 1000 * 60 * 60 * 24;
  // subtract the starting date from the ending date and divide it by one whole day
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / Milliseconds_Per_Day);
    return diffDays;
  }

  const days = dayDifference(
    new Date(dateSearch[0]?.endDate),
    new Date(dateSearch[0]?.startDate)
  );

  return { days };
};

export default useDaysCalculate;
