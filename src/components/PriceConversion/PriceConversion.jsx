import { useMediaQueriesContext } from "../../context/MediaQueryContext";

const PriceConversion = () => {
  const { setConvertPrice, convertPrice } = useMediaQueriesContext();

  return (
    <select
      value={convertPrice}
      className="outline-none py-3 px-6 border border-gray-300 text-base"
      onChange={(e) => {
        setConvertPrice(e.target.value);
      }}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="NGN">NGN</option>
    </select>
  );
};

export default PriceConversion;
