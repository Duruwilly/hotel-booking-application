import React, { useEffect } from "react";
import { favouriteBg, map } from "../../BgImageStyles/styles";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchInputHeader from "../../components/PagesSearchHeaders/SearchInputHeader";
import ToggledSearchHeader from "../../components/PagesSearchHeaders/ToggledSearchHeader";
import usePriceConversion from "../../utils/usePriceConversion";
import FavouritesItem from "./component/FavouritesItem";
import { useFavouriteContext } from "../../context/FavouriteItemsContext";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Favourites = () => {
  const { matches, setDropdownHeader, convertPrice, fetchHotelStatus } =
    useMediaQueriesContext();
  let { favouriteItems, setFavouriteFetchStatus, getFavouriteItems } =
    useFavouriteContext();
  const [exchangedPrice, setExchangedPrice] = useState();
  const { convertPrices } = usePriceConversion();
  const { user } = useAuthContext();

  const deleteFavourite = async (id) => {
    let url = `${WILL_TRIP_BASE_URL}/favourites/${user?.id}/delete-favourite/${id}`;
    try {
      let response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.data.status === "success") {
        setFavouriteFetchStatus("idle");
        getFavouriteItems(user)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    convertPrices().then((data) => {
      setExchangedPrice(data);
    });
  }, [convertPrice, fetchHotelStatus]);

  return (
    <>
      {matches ? <SearchInputHeader /> : <ToggledSearchHeader />}
      <section style={favouriteBg} onClick={() => setDropdownHeader(false)}>
        <div className="heroe-overlay flex flex-col items-center justify-center">
          <h1 className="text-5xl mb-2 font-light">My favourites</h1>
          <p className="mt-4 font-light">
            The most stylish rooms you've slept in? Next summer's hotels
            shortlist? Browse our collection <br /> to create your own list of
            favourites, curate a dream trip, or plan future itineraries…
          </p>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-full max-w-screen-xl">
          {favouriteItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 wishlist-item gap-4 py-10 px-4">
              {favouriteItems.map((fav) => (
                <div key={fav._id}>
                  <FavouritesItem
                    fav={fav}
                    exchangedPrice={exchangedPrice}
                    convertPrice={convertPrice}
                    deleteFavourite={deleteFavourite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10 px-4">
              <div className="w-full max-w-screen-sm">
                <div className="bg-whit border border-gray-300">
                  <div style={{ flex: 3 }}>
                    <div className="map-overlay">
                      <div
                        style={map}
                        className="flex justify-center items-center text-gray-200 text-xl"
                      >
                        <p>
                          You don't have any <br /> favourite lists
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="" style={{ flex: 2 }}>
                    <h1 className="font-light text-xl text-gray-90 px-4 py-10">
                      For inspiration, try our{" "}
                      <Link to="/" className="text-red-800">
                        popular searches in the home page{" "}
                      </Link>
                      or add your keywords to the search bar above
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Favourites;
