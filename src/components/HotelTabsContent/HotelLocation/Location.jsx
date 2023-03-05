import React from "react";

const Location = () => {
  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-screen-lg space-y-3 px-4">
          <p className="leading-relaxed font-light italic">
            The hotel is located next to the Provençal village of La
            Garde-Freinet in the Var département of southeastern France, which
            includes a stretch of the Côte d'Azur.
          </p>
          <h1 className="text-cente text-2xl font-light">Automobile</h1>
          <p className="font-light text-sm leading-relaxed mt-1">
            Your own set of wheels is a must if you're planning to explore this
            corner of rural France or the glitzy Côte d'Azur. You'll find a
            cluster of car-hire options in Saint Tropez, a 45-minute drive away,
            or just pick one up at the airport. Parking at the hotel is free.
          </p>
          <h1 className="text-cente text-2xl font-light">Local restaurants</h1>
          <p className="font-light text-sm leading-relaxed mt-1">
            Ask at reception for off-site dining options, and they'll likely
            direct you towards La Table at Château Saint-Roux, a 10-minute drive
            away. It's set in an utterly charming 15th-century country estate
            with farm-to-table dining in a rustic-chic Provençal setting. Their
            prix fixe lunch is especially good value. Alternatively, you'll find
            a cluster of quaint eateries in nearby La Garde-Freinet. Le
            Carnotzet has seating that spills out into the pretty central square
            and a menu of simple rustic fare. Just around the corner, the
            family-run Restaurant La Petite Fontaine offers more cosmopolitan
            cuisine with entrecôte and moules as their two standouts.
          </p>
          <h1 className="text-cente text-2xl font-light">Local bars</h1>
          <p className="font-light text-sm leading-relaxed mt-1">
            With its excellent bar, regular live music and low-key DJ sets, you
            won't find anywhere nearby with better nightlife outside the hotel.
          </p>
        </div>
      </section>
    </>
  );
};

export default Location;
