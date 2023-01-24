import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FooterList from "./components/footer/FooterList";
import Navbar from "./components/navbar/Navbar";
import { useMediaQueriesContext } from "./context/MediaQueryContext";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Home,
  AboutUs,
  BookWithUs,
  Reviews,
  Contact,
  TravelTeam,
  TravelTeam1,
  TravelTeam2,
  TravelTeam3,
} from "./pages";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";

function App() {
  const { setDropDownHeader, setOpenRoomOptions, setOpenDate } =
    useMediaQueriesContext();

  const closeModal = () => {
    setDropDownHeader(false);
    setOpenDate(false);
    setOpenRoomOptions(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <div onClick={closeModal}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about-us/:id" element={<BookWithUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/travel-team" element={<TravelTeam />} />
          <Route path="/travel-team/laeti-laura" element={<TravelTeam1 />} />
          <Route path="/travel-team/laura-laura" element={<TravelTeam2 />} />
          <Route path="/travel-team/prince-will" element={<TravelTeam3 />} />
        </Routes>
      </div>
      <div onClick={closeModal}>
        <FooterList />
      </div>
    </BrowserRouter>
  );
}

export default App;
