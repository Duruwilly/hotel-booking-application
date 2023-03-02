import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { favouriteBg, map } from "../../BgImageStyles/styles";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import SearchInputHeader from "../HotelsList/SearchInputHeader";
import ToggledSearchHeader from "../HotelsList/ToggledSearchHeader";
import image1 from "../../assets/images/heroe.jpg";
import mapBg from "../../assets/images/map.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { removeItem } from "../../redux/Favourites";

const Favourites = () => {
  const { matches, setDropdownHeader } = useMediaQueriesContext();
  let { wishlistsItems } = useSelector((state) => state.favourite);
  const [activeItem, setActiveItem] = useState("");
  const dispatch = useDispatch();
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
      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl">
          {wishlistsItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 wishlist-item gap-4 py-10 px-4">
              {wishlistsItems.map((fav) => (
                <div key={fav._id}>
                  <div className="bg-whit border border-gray-300">
                    <div style={{ flex: 3 }}>
                      <Link to={`/hotel/${fav.name}/${fav.country}/${fav._id}`}>
                        <div>
                          <img src={image1} alt="" />
                        </div>
                      </Link>
                    </div>
                    <div className="" style={{ flex: 2 }}>
                      {fav._id !== activeItem ? (
                        <>
                          <div
                            className=" py-3 text-center font-light"
                            style={{ background: "rgba(0,0,0,0.1)" }}
                          >
                            Price per night from{" "}
                            <span className="font-semibold">
                              $
                              {[fav.price]
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            </span>
                          </div>
                          <h1 className="text-center py-2 text-xs font-semibold uppercase">
                            {fav.country + "," + " " + fav.state}
                          </h1>
                          <h2 className="text-center pb-4 text-2xl font-light capitalize">
                            {fav.name}
                          </h2>
                          <p className="text-cente px-4 pb-6">
                            <span className="text-red-900 font-semibold capitalize">
                              Free includes
                            </span>{" "}
                            <span className="font-light">{fav.feature}</span>
                          </p>
                          <div className="flex justify-center items-cente gap-2">
                            <Link
                              to={`/hotel/${fav.name}/${fav.country}/${fav._id}`}
                              className="bg-primary text-xs text-white uppercase py-3 w-full text-center"
                            >
                              view hotel
                            </Link>
                            <button
                              className="bg- border text-xs border-gray-900 hover:bg-primary hover:text-white uppercase py-3 w-full"
                              onClick={() => {
                                fav._id === activeItem
                                  ? setActiveItem("")
                                  : setActiveItem(fav._id);
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pt-9 pb-[72px]">
                            <h1 className="px-4 font-medium p-">
                              Delete favourites list
                            </h1>
                            <p className="px-4 font-light pt-5">
                              Are you sure you want to delete this list of
                              favourites?
                            </p>
                          </div>
                          <div className="flex justify-center items-cente gap-2">
                            <button
                              className="bg-primary text-xs text-white uppercase py-3 w-full"
                              onClick={() => dispatch(removeItem(fav._id))}
                            >
                              delete
                            </button>
                            <button
                              className="bg- border text-xs border-gray-900 hover:bg-primary hover:text-white uppercase py-3 w-full"
                              onClick={() => {
                                setActiveItem("");
                              }}
                            >
                              cancel
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              <div className=" w-1/3">
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
      </div>
    </>
  );
};

export default Favourites;
