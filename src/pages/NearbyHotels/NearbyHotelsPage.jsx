import axios from "axios";
import React, { useEffect, useState } from "react";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import NearbyHotelsItems from "./component/NearbyHotelsItems";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NearbyHotelsPage = ({
  location,
  convertPrice,
  exchangedPrice,
  currentHotelId,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    loop: false,
    margin: 12,
    nav: true,
    smartSpeed: 500,
    autoplay: false,
    dots: false,
    autoplayTimeout: 6000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      750: {
        items: 3,
      },
      1100: {
        items: 3,
      },
    },
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchNearByHotels = async () => {
      setLoading(true);
      let url = `${WILL_TRIP_BASE_URL}/hotels?destination=${location}`;
      let res = await axios.get(url);
      if (res?.data?.status === "success") {
        const filteredData = res?.data?.data.filter(
          (hotel) => hotel._id !== currentHotelId
        );
        setLoading(false);
        setData(filteredData);
      }
    };
    fetchNearByHotels();
    return () => {
      controller.abort();
    };
  }, [location, currentHotelId]);

  return (
    <>
      {data && data.length > 0 ? (
        <section>
          <div className="bg-primary py-4 w-full uppercase text-gray-200 text-sm font-medium text-center">
            hotels nearby
          </div>
          <main style={{ background: "rgba(31, 41, 55, 1)" }}>
            <div className="flex justify-center items-center">
              <div className="w-full max-w-screen-xl py-10 px-4">
                <OwlCarousel className="owl-carousel owl-theme" {...options}>
                  {data.map((data) => (
                    <div key={data._id}>
                      <NearbyHotelsItems
                        data={data}
                        convertPrice={convertPrice}
                        exchangedPrice={exchangedPrice}
                      />
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </main>
        </section>
      ) : null}
    </>
  );
};

export default NearbyHotelsPage;
