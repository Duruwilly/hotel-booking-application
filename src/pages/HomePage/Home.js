import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Ads from "../../components/ads/Ads";
import Gallery from "./component/gallery/Gallery";
import PopularSearch from "./component/popularSearch/PopularSearch";
import TopHotels from "./component/topHotels/TopHotels";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { setDestination } from "../../redux/searchStateSlice";
import Heroe from "./component/heroe/Heroe";

const Home = () => {
  const { setDropdownHeader, setFetchHotelStatus } = useMediaQueriesContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDestination(""));
  }, [dispatch]);

  // useEffect(() => {
  //   setFetchHotelStatus("idle");
  // }, []);

  return (
    <div className="" onClick={() => setDropdownHeader(false)}>
      <Heroe />
      <TopHotels />
      <PopularSearch />
      {/* <Ads /> */}
      <Gallery />
    </div>
  );
};

export default Home;
