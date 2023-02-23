import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Ads from "../../components/ads/Ads"
import Gallery from "../../components/gallery/Gallery"
import Header from "../../components/header/Header"
import Heroe from "../../components/heroe/Heroe"
import Navbar from "../../components/navbar/Navbar"
import PopularSearch from "../../components/popularSearch/PopularSearch"
import { useMediaQueriesContext } from "../../context/MediaQueryContext"
import { setDestination } from "../../redux/searchStateSlice"

const Home = () => {
  const { setDropdownHeader, setFetchHotelStatus } = useMediaQueriesContext()
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setDestination(""))
  }, [dispatch])

  // useEffect(() => {
  //   setFetchHotelStatus("idle");
  // }, []);

  return (
    <div className="" onClick={() =>  setDropdownHeader(false)}>
        <Heroe />
        <PopularSearch />
        <Ads />
        <Gallery />
    </div>
  )
}

export default Home