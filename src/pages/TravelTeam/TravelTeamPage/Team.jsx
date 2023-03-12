import React from "react";
import { Link } from "react-router-dom";
import { teamBg, team1, team2, team3 } from "../../../BgImageStyles/styles";

const Team = ({ team }) => {
  return (
    <div style={team2}>
      <div className="team-container">
        <div className="team-content">
          <h1 className="uppercase font-semibold">{team?.name}</h1>
          <p className="font-thin text-sm">Ask me about</p>
          <p className="mb-7 capitalize">{team?.destination}</p>
          <Link
            to={`/travel-team/${team?.name}/${team?._id}`}
            className="uppercase border border-white py-3 px-7 font-semibold"
          >
            see profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Team;
