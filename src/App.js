import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FooterList from "./components/footer/FooterList";
import Navbar from "./components/navbar/Navbar";
import { useMediaQueriesContext } from "./context/MediaQueryContext";
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
  SingleHotel,
  HotelsList,
  Register,
  Login,
  Basket,
  PaymentPage
} from "./pages";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";

function App() {
  const {
    setDropdownHeader,
  } = useMediaQueriesContext();

  const closeModal = () => {
    setDropdownHeader(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:hotelName/:location/:hotelId" element={<SingleHotel />} />
          <Route path="/destinations/:id/hotels" element={<HotelsList />} />
          <Route path="/destinations/hotels" element={<HotelsList />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about-us/:id" element={<BookWithUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/travel-team" element={<TravelTeam />} />
          <Route path="/travel-team/laeti-laura" element={<TravelTeam1 />} />
          <Route path="/travel-team/laura-laura" element={<TravelTeam2 />} />
          <Route path="/travel-team/prince-will" element={<TravelTeam3 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
     
      <div onClick={closeModal}>
        <FooterList />
      </div>
    </BrowserRouter>
  );
}

export default App;
