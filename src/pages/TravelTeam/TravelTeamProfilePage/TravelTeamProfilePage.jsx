import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ad,
  hotels,
  interi,
  parisTower,
  stay,
} from "../../../BgImageStyles/styles";
import team1 from "../../../assets/images/team1.jpeg";
import axios from "axios";

const TravelTeam1 = () => {
  const [singleTeam, setSingleTeam] = useState();
  const [error, setError] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const fetchTeamsProfile = async () => {
      const url = `http://localhost:8800/api/v1/teams/find/${id}`;
      try {
        const res = await axios.get(url);
        setSingleTeam(res.data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchTeamsProfile();
  }, []);

  return (
    <>
      <div style={parisTower}>
        <div className="overlay">
          <div className="flex justify-center">
            <img
              src={team1}
              alt="profil-pic"
              className="rounded-full w-44 h-44 object-cover absolute bottom-[-88px]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-32 px-4">
        <h1 className="capitalize font-bold text-4xl font-serif">
          {singleTeam?.name}
        </h1>
        <span className="uppercase text-sm font-semibold mt-2">
          travel specialist
        </span>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 px-4">
        <div className="w-full max-w-screen-lg">
          <p>{singleTeam?.intro}</p>
        </div>
      </div>
      <div className="bg-gray-100 mt-10 pt-7 pb-20">
        <div className="flex justify-center flex-col items-center text-4xl font-thin mb-6">
          <h1>{singleTeam?.name}'s</h1>
          <h2>top Will Trip stays</h2>
        </div>
        <div className="flex justify-center bg-white">
          <div className="w-full max-w-screen-lg">
            <div className="item">
              <div className="left">
                <div style={stay}>
                  <div className="overlay">
                    <p className="uppercase font-thin text-sm">
                      {singleTeam?.topStays?.top_stays1?.location}
                    </p>
                    <p className="text-4xl">
                      {singleTeam?.topStays?.top_stays1?.hotelName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>{singleTeam?.topStays?.top_stays1?.info}</i>
                  </q>
                </p>
                {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
              </div>
            </div>
            {singleTeam?.topStays?.top_stays2 ? (
              <div className="item">
                <div className="left">
                  <div style={interi}>
                    <div className="overlay">
                      <p className="uppercase font-thin text-sm">
                        {singleTeam?.topStays?.top_stays2?.location}
                      </p>
                      <p className="text-4xl">
                        {singleTeam?.topStays?.top_stays2?.hotelName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <p>
                    <q>
                      <i>{singleTeam?.topStays?.top_stays2?.info}</i>
                    </q>
                  </p>
                  {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
                </div>
              </div>
            ) : null}
            {singleTeam?.topStays?.top_stays3 ? (
              <div className="item">
                <div className="left">
                  <div style={hotels}>
                    <div className="overlay">
                      <p className="uppercase font-thin text-sm">
                        {singleTeam?.topStays?.top_stays3?.location}
                      </p>
                      <p className="text-4xl">
                        {singleTeam?.topStays?.top_stays3?.hotelName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <p>
                    <q>
                      <i>
                        <i>{singleTeam?.topStays?.top_stays3?.info}</i>
                      </i>
                    </q>
                  </p>
                  {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
                </div>
              </div>
            ) : null}
            {singleTeam?.topStays?.top_stays4 ? (
              <div className="item">
                <div className="left">
                  <div style={interi}>
                    <div className="overlay">
                      <p className="uppercase font-thin text-sm">
                        {singleTeam?.topStays?.top_stays4?.location}
                      </p>
                      <p className="text-4xl">
                        {singleTeam?.topStays?.top_stays4?.hotelName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <p>
                    <q>
                      <i>{singleTeam?.topStays?.top_stays4?.info}</i>
                    </q>
                  </p>
                  {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center flex-col items-center text-4xl font-thin my-6">
          <h1>{singleTeam?.name}'s</h1>
          <h2>dream destination</h2>
        </div>
        <div className="flex justify-center bg-white">
          <div className="w-full max-w-screen-lg">
            {singleTeam?.topDestinations?.top_destination1 ? (
              <div className="item">
                <div className="left">
                  <div style={stay}>
                    <div className="overlay">
                      <p className="capitalize text-4xl">
                        {
                          singleTeam?.topDestinations?.top_destination1
                            ?.location
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <p>
                    <q>
                      <i>
                        {singleTeam?.topDestinations?.top_destination1?.info}
                      </i>
                    </q>
                  </p>
                  {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
                </div>
              </div>
            ) : null}
            {singleTeam?.topDestinations?.top_destination2 ? (
              <div className="item">
                <div className="left">
                  <div style={interi}>
                    <div className="overlay">
                      <p className="capitalize text-4xl">
                        {
                          singleTeam?.topDestinations?.top_destination2
                            ?.location
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <p>
                    <q>
                      <i>
                        {singleTeam?.topDestinations?.top_destination2?.info}
                      </i>
                    </q>
                  </p>
                  {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
                </div>
              </div>
            ) : null}
            {singleTeam?.topDestinations?.top_destination3 ? (
              <div className="item">
                <div className="left">
                  <div style={hotels}>
                    <div className="overlay">
                      <p className="capitalize text-4xl">
                        {
                          singleTeam?.topDestinations?.top_destination3
                            ?.location
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <p>
                    <q>
                      <i>
                        {singleTeam?.topDestinations?.top_destination3?.info}
                      </i>
                    </q>
                  </p>
                  {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
                </div>
              </div>
            ) : null}
            {singleTeam?.topDestinations?.top_destination4 ? (
              <div className="item">
                <div className="left">
                  <div style={hotels}>
                    <div className="overlay">
                      <p className="capitalize text-4xl">
                        {
                          singleTeam?.topDestinations?.top_destination4
                            ?.location
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <p>
                    <q>
                      <i>
                        {singleTeam?.topDestinations?.top_destination4?.info}
                      </i>
                    </q>
                  </p>
                  {/* <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div> */}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div style={ad}>
        <div className="overl">
          <div className="flex justify-center">
            <div className="w-full max-w-screen-lg">
              <h1 className="text-3xl capitalize">travel tips</h1>
              <p className="text-lg">
                Staying hydrated is essential for that post-plane ‘I can't
                believe you've been on a 10-hour flight’ look; I spritz my face
                with Jurlique rosewater balancing-mist throughout the flight and
                moisturise with MAC's Studio Cream.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelTeam1;
