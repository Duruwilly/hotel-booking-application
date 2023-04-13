import React from "react";
import Spinner from "../../../../../components/Spinner/Spinner";
import { useAddHotelContext } from "../../context/AddhotelContext";
import ListingsItem from "./ListingsItem";

const Listings = () => {
  const { fetchUserListing } = useAddHotelContext();

  return (
    <>
      <section className="my-16 flex-1">
        {fetchUserListing.fetching ? (
          <Spinner />
        ) : fetchUserListing.responseData &&
          fetchUserListing.responseData.length > 0 ? (
          fetchUserListing.responseData.map((data) => (
            <div key={data._id}>
              <ListingsItem data={data} />
            </div>
          ))
        ) : (
          <p className="text-center font-medium tracking-wider text-xl">
            You have no listings
          </p>
        )}
      </section>
      {/* <ListingsItem /> */}
    </>
  );
};

export default Listings;
