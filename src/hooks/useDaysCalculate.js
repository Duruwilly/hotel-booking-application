import { useSelector } from "react-redux";

const useDaysCalculate = () => {
  let { date } = useSelector((state) => state.searchState);

  const Milliseconds_Per_Day = 1000 * 60 * 60 * 24;
  // subtract the starting date from the ending date and divide it by one whole day
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / Milliseconds_Per_Day);
    return diffDays;
  }

  const days = dayDifference(date[0]?.endDate, date[0]?.startDate);

  return { days }
};

export default useDaysCalculate;
