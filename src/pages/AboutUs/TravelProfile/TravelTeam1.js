import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ad,
  hotels,
  interi,
  parisTower,
  stay,
} from "../../../BgImageStyles/styles";
import team1 from "../../../assets/images/team1.jpeg"

const TravelTeam1 = () => {
    const { travelteam1 } = useParams()
    console.log(travelteam1);
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
          laeti laura
        </h1>
        <span className="uppercase text-sm font-semibold mt-2">
          travel specialist
        </span>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 px-4">
        <div className="w-full max-w-screen-lg">
          <p>
            Before joining Mr & Will Trip more than three years ago, my work
            involved interviewing musicians, but I have always been interested
            in travel. I think it's intriguing how where you holiday can shape a
            particular mindset, build character and influence your attitude to
            others; this is all part of why I love working at Mr & Mrs Smith. A
            complete romantic, I love crafting sexy getaways, from minimoons in
            the Cotswolds to blow-out Maldives honeymoons, and hopefully helping
            Trip members discover even more reasons to fall in love.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 mt-10 pt-7 pb-20">
        <div className="flex justify-center flex-col items-center text-4xl font-thin mb-6">
          <h1>LaetiLaura's</h1>
          <h2>top Will Trip stays</h2>
        </div>
        <div className="flex justify-center bg-white">
          <div className="w-full max-w-screen-lg">
            <div className="item">
              <div className="left">
                <div style={stay}>
                  <div className="overlay">
                    <p className="uppercase font-thin text-sm">
                      Bangkok, thailand
                    </p>
                    <p className="text-4xl">the siam</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>
                      This Bangkok stay is wonderfully museum-like, thanks to
                      the collection of art and antiques. I stayed in the
                      spacious Siam Suite, which has beautiful dark woods and
                      high ceilings, and I completely fangirled over the
                      original Josephine Baker poster hanging in the Saim’s Deco
                      Bar & Bistro.
                    </i>
                  </q>
                </p>
                <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="left">
                <div style={interi}>
                  <div className="overlay">
                    <p className="uppercase font-thin text-sm">rome, italy</p>
                    <p className="text-4xl">residenza napoleone III</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>
                      It’s right in the heart of Rome’s fashionable shopping
                      district, and absolutely drenched in history. I loved the
                      grand marble staircase, which was lined with antique busts
                      of Roman Emperors, and the surprise of the hidden rooms
                      concealed behind picture frames.
                    </i>
                  </q>
                </p>
                <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="left">
                <div style={hotels}>
                  <div className="overlay">
                    <p className="uppercase font-thin text-sm">
                      sorrento, italy
                    </p>
                    <p className="text-4xl">maison la minervetta</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>
                      I engaged in some seriously indulgent behaviour in the
                      spa, where the range of wellness offerings left me feeling
                      like royalty. If I could have moved into my open-plan
                      mountain-view villa, I would have.
                    </i>
                  </q>
                </p>
                <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="left">
                <div style={interi}>
                  <div className="overlay">
                    <p className="uppercase font-thin text-sm">new, thailand</p>
                    <p className="text-4xl">the siam</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>
                      I’ve visited Thailand nearly 20 times, and feel completely
                      at home there; like London, it’s a melting-pot of
                      cultures, and I love that I can get my live music fix
                      there at the likes of SOB's, Smoke Jazz Club and the
                      Village Underground.
                    </i>
                  </q>
                </p>
                <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center text-4xl font-thin my-6">
          <h1>LaetiLaura's</h1>
          <h2>dream destination</h2>
        </div>
        <div className="flex justify-center bg-white">
          <div className="w-full max-w-screen-lg">
            <div className="item">
              <div className="left">
                <div style={stay}>
                  <div className="overlay">
                    <p className="capitalize text-4xl">dubai</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>
                      I’m always left in awe of the way the traditional and the
                      ultra-modern mixes in Dubai. I’m also fairly certain
                      there’s nowhere else in the world where Lamborghini and
                      Bugatti police cars will speed by you.
                    </i>
                  </q>
                </p>
                <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="left">
                <div style={interi}>
                  <div className="overlay">
                    <p className="capitalize text-4xl">new, york</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>
                      I’ve visited New York nearly 20 times, and feel completely
                      at home there; like London, it’s a melting-pot of
                      cultures, and I love that I can get my live music fix
                      there at the likes of SOB's, Smoke Jazz Club and the
                      Village Underground.
                    </i>
                  </q>
                </p>
                <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="left">
                <div style={hotels}>
                  <div className="overlay">
                    <p className="capitalize text-4xl">kerala</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <p>
                  <q>
                    <i>
                      I engaged in some seriously indulgent behaviour in the
                      spa, where the range of wellness offerings left me feeling
                      like royalty. If I could have moved into my open-plan
                      mountain-view villa, I would have.
                    </i>
                  </q>
                </p>
                <div className="flex justify-center mt-7">
                  <Link
                    to="/hotels"
                    className="border bg-red-900 text-white py-2 px-7 capitalize"
                  >
                    view hotel
                  </Link>
                </div>
              </div>
            </div>
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
