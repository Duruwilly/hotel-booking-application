import React from "react";
import { Link } from "react-router-dom";
import { teamBg, team1, team2, team3 } from "../../BgImageStyles/styles";

const TravelTeam = () => {
  return (
    <>
      <div style={teamBg}>
        <div className="overlay">
          <h1 className="capitalize text-2xl mb-5">
            Travel Team homepage
          </h1>
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
            <div style={team1}>
              <div className="team-container">
                <div className="team-content">
                  <h1 className="uppercase font-semibold">laeti laura</h1>
                  <p className="font-thin text-sm">Ask me about</p>
                  <p className="mb-7">Portugal, France</p>
                  <Link
                    to="/travel-team/laeti-laura"
                    className="uppercase border border-white py-3 px-7 font-semibold"
                  >
                    see profile
                  </Link>
                </div>
              </div>
            </div>
            <div style={team2}>
              <div className="team-container">
                <div className="team-content">
                  <h1 className="uppercase font-semibold">laura laura</h1>
                  <p className="font-thin text-sm">Ask me about</p>
                  <p className="mb-7">Thailand, New York City</p>
                  <Link
                    to="/travel-team/laura-laura"
                    className="uppercase border border-white py-3 px-7 font-semibold"
                  >
                    see profile
                  </Link>
                </div>
              </div>
            </div>
            <div style={team3}>
              <div className="team-container">
                <div className="team-content">
                  <h1 className="uppercase font-semibold">prince will</h1>
                  <p className="font-thin text-sm">Ask me about</p>
                  <p className="mb-7">Portugal, Maldives</p>
                  <Link
                    to="/travel-team/prince-will"
                    className="uppercase border border-white py-3 px-7 font-semibold"
                  >
                    see profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelTeam;
