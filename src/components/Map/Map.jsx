import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { FaTimes } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
mapboxgl.accessToken = process.env.REACT_APP_MAPACCESSTOKEN;

const Map = ({ setOpenMapModal }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
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
