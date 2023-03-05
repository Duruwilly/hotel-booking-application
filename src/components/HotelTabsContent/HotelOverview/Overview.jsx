import React from "react";
import {
  overviewFacilitiesBg,
  overviewFoodsBg,
} from "../../../BgImageStyles/styles";

const Overview = ({ feature, hotelName }) => {
  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-screen-lg px-4">
          <p className="leading-relaxed font-light italic">
            Seemingly at odds with its full-on-rural Provençal setting, the{" "}
            <span className="font-semibold capitalize text-lg">
              {hotelName}
            </span>{" "}
            hotel rather curiously identifies itself as an 'urban wine estate'.
            Step inside, however, and it soon becomes clear. The 'urban' is in
            the attitude and the aesthetics. With its dapper young staff, swish
            mid-century styling, and low-key clubby feel, this is as far as you
            can get from a musty rustic winery. But wine still sits very much at
            the centre of the experience. Whether flopped by the chic swimming
            pool, swooning over the top-notch cuisine or bopping to a DJ set,
            you're likely doing it with a chilled glass of vin de maison to
            hand.
          </p>
          <div className="bg-white py-4 text-center my-5">
            <h4 className="text-red-900 font-semibold capitalize mb-3">
              free includes
            </h4>
            <span className="font-semibold">
              Get this when you book through us:
            </span>
            <p className="font-light text-sm">{feature}</p>
          </div>
        </div>
      </section>
      <section className="">
        <div style={overviewFacilitiesBg}>
          <div className="heroe-overlay">
            <div
              className="py-4 px- absolute bottom-0 left-0 w-full max-w-screen-md uppercase text-white text-center text-2xl tracking-widest font-light"
              style={{ background: "rgba(0,0,0,0.4)" }}
            >
              <p>facilities</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg mt-3 space-y-3 px-4">
            <h1 className="text-cente text-2xl font-light">At the hotel</h1>
            <p className="font-light text-sm leading-relaxed mt-1">
              Swimming pool, spa, fitness centre, bike rental, 24-hour check-in,
              gift shop, daily laundry service (9am–5pm). In rooms: TV, free
              WiFi, welcome tray, minibar, coffee machine and tea-making kit,
              air-conditioning
            </p>
            <h1 className="text-cente text-2xl font-light">Poolside</h1>
            <p className="font-light text-sm leading-relaxed mt-1">
              At around 18 metres, the enclosed pool is long enough for your
              morning laps and is heated on chillier days. You’ll find pool
              towels already on sunbeds when you arrive, and food-and-drink
              service at the push of a button.
            </p>
            <h1 className="text-cente text-2xl font-light">Spa</h1>
            <p className="font-light text-sm leading-relaxed mt-1">
              The wellness area is located in a separate building and draws
              largely from traditional Indian and Japanese healing practices,
              from Ayurveda to Reiki. Fully organic essential oils are used for
              their acupressure and massage treatments. For the full
              walking-on-air cleanse, try the three-day Panchakarma detox
              (although it does involve fasting).
            </p>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div style={overviewFoodsBg}>
          <div className="heroe-overlay">
            <div
              className="py-4 px- absolute bottom-0 left-0 w-full max-w-screen-md uppercase text-white text-center text-2xl tracking-widest font-light"
              style={{ background: "rgba(0,0,0,0.4)" }}
            >
              <p>food and drink</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg mt-3 space-y-3 px-4">
            <h1 className="text-cente text-2xl font-light">Hotel restaurant</h1>
            <p className="font-light text-sm leading-relaxed mt-1">
              With little else less than a drive away, Ultimate Provence has
              ensured that its onsite dining is an experience you’ll happily
              keep returning to during your stay. It’s mostly centred around the
              rooftop UP Restaurant, with live gypsy music cranking up the
              festive atmosphere as the weekend approaches. Resident chef Romain
              Franceschi mixes traditional French cuisine with the odd
              Mediterranean flourish, with produce sourced from the surrounding
              countryside and coast. There’s a treat for truffle-lovers, too,
              with each stage of the three-course dinner infused with the
              gourmet fungi. For an even more exclusive experience, book
              yourself in (with 48 hours notice) for La Table du Chef, an
              eight-course odyssey showcasing Romain’s latest creations on a
              private kitchen terrace – with wine pairings, of course. Waterside
              dining is provided by UP Pool, where brunch and light lunches are
              served either on the sunbeds or the pool deck.
            </p>
            <h1 className="text-cente text-2xl font-light">Hotel bar</h1>
            <p className="font-light text-sm leading-relaxed mt-1">
              Forged from a shipping container set on the rooftop, the UP Bar
              comes alive by night with flickering candles and chilled-out
              tunes. A marquee-meets-tipi also provides a groovy spot under
              canvas for drinks and mingling. As well as a handful of the
              classics, also in the mix are a selection of signature cocktails
              featuring UP wine.
            </p>
            <h1 className="text-cente text-2xl font-light">Last orders</h1>
            <p className="font-light text-sm leading-relaxed mt-1">11:30pm</p>
            <h1 className="text-cente text-2xl font-light">Room service</h1>
            <p className="font-light text-sm leading-relaxed mt-1">
              You can order up from a decent selection of lighter bites during
              kitchen opening hours (7.30am to 11.30pm)
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
