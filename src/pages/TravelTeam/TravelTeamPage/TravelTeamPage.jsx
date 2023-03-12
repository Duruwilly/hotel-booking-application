import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { teamBg, team1, team2, team3 } from "../../../BgImageStyles/styles";
import Team from "./Team";

const TravelTeam = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [error, setError] = useState(false);
  const getTeams = async () => {
    const url = `http://localhost:8800/api/v1/teams`;
    try {
      let response = await axios.get(url);
      // console.log(response.data.status);
      setTeamsData(response?.data?.data);
      // if (response.data.status === "success") {
      // }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);
  return (
    <>
      <div style={teamBg}>
        <div className="overlay">
          <h1 className="capitalize text-2xl mb-5">Travel Team homepage</h1>
          <p className="lowercase text-lg">
            our travel specialists are here for you
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg mt-10 px-4">
          <p>
            Our crack squad of travel specialists aren't just equipped to help
            you find 'the one' hotel or plan your adventure. Their extensive
            globetrotting and insider knowledge ensures they're well-equipped to
            advise and help in these unprecedented times and for future
            getaways. Call them on{" "}
            <a href="tel:+2349000000000" className="text-red-900 font-bold">
              +2349000000000
            </a>
            ,{" "}
            <a
              href="mailto:duruprincewilluzochukwu@gmail.com"
              className="text-red-900 font-bold"
            >
              email them
            </a>{" "}
            or check out their credentials below...
          </p>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 items-center justify-center mt-6 mb-4">
            {teamsData.map((team) => (
              <div key={team._id}>
                <Team team={team} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelTeam;
