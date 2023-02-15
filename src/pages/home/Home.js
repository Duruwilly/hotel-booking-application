import Ads from "../../components/ads/Ads"
import Gallery from "../../components/gallery/Gallery"
import Header from "../../components/header/Header"
import Heroe from "../../components/heroe/Heroe"
import Navbar from "../../components/navbar/Navbar"
import PopularSearch from "../../components/popularSearch/PopularSearch"
import { useMediaQueriesContext } from "../../context/MediaQueryContext"

const Home = () => {
  const { setDropdownHeader } = useMediaQueriesContext()
  return (
    <div className="" onClick={() =>  setDropdownHeader(false)}>
        {/* <Header /> */}
        <Heroe />
        <PopularSearch />
        <Ads />
        <Gallery />
    </div>
  )
}

export default Home