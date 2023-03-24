import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaTimes } from "react-icons/fa";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { VscClose } from "react-icons/vsc";
import axios from "axios";
mapboxgl.accessToken = process.env.REACT_APP_MAPACCESSTOKEN;

const Map = ({ setOpenMapModal, destination }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  // Function to get coordinates from search input
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Function to get coordinates from search input
    const geocode = async () => {
      const url = `${process.env.REACT_APP_GEOCODING_URL}/${encodeURIComponent(
        destination
      )}.json?access_token=${mapboxgl.accessToken}`;
      try {
        const response = await axios.get(url);
        const features = response.data.features;
        if (features.length > 0) {
          const coordinates = features[0].center;
          setLat(coordinates[1]);
          setLng(coordinates[0]);
          setZoom(12);
          map.current.setCenter(coordinates);
          if (marker.current) {
            marker.current.setLngLat(coordinates);
          } else {
            marker.current = new mapboxgl.Marker()
              .setLngLat(coordinates)
              .addTo(map.current);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    geocode();

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [destination]);
  return (
    <div className="">
      <div ref={mapContainer} className="map-container h-[400px]" />
      {/* <FaTimes
        onClick={() => setOpenMapModal(false)}
        className="text-whit absolute top-0 right-0 text-2xl cursor-pointer"
      /> */}
      <div className="absolute top-0 right-0">
        <button
          className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-2xl text-white opacity-70 hover:text-white hover:opacity-100`}
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <FaTimes className="" onClick={() => setOpenMapModal(false)} />
        </button>
      </div>
    </div>
  );
};

export default Map;
