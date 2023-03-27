import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalDetailsPage from ".";
import { profileBg } from "../../BgImageStyles/styles";
import SearchInputHeader from "../../components/PagesSearchHeaders/SearchInputHeader";
import ToggledSearchHeader from "../../components/PagesSearchHeaders/ToggledSearchHeader";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useUserProfileContext } from "../../context/UserProfileContext";
import { useTitle } from "../../hooks/useTitle";
import MerchantHome from "../MerchantPage/MerchantHomePage/MerchantHomePage";
import UpdatePassword from "./component/UpdatePassword";

const ProfilePage = () => {
  useTitle("My profile | Book the world best hotel | WillTrip");
  const { matches, setDropdownHeader } = useMediaQueriesContext();
  const [selectedTab, setSelectedTab] = useState("personal-details");
  const { userProfileDetails } = useUserProfileContext();
  const navigate = useNavigate();
  // const tabArr = [
  //   {
  //     value: "personal details",
  //     title: "personal-details",
  //     panel: <PersonalDetailsPage />,
  //   },
  //   {
  //     value: "update password",
  //     title: "update-password",
  //     panel: <UpdatePassword />,
  //   },

  // ];

  const tabArr =
    userProfileDetails?.role === "merchant"
      ? [
          {
            value: "personal details",
            title: "personal-details",
            panel: <PersonalDetailsPage />,
          },
          {
            value: "update password",
            title: "update-password",
            panel: <UpdatePassword />,
          },
          {
            value: (
              <span onClick={() => navigate("/merchant-home")}>Add Hotels</span>
            ),
            title: "add-hotels",
            panel: <MerchantHome />,
          },
          // {
          //   value: (
          //     <span onClick={() => navigate("/view-listings")}>View Listings</span>
          //   ),
          //   title: "view-listings",
          //   panel: <UpdatePassword />,
          // },
        ]
      : [
          {
            value: "personal details",
            title: "personal-details",
            panel: <PersonalDetailsPage />,
          },
          {
            value: "update password",
            title: "update-password",
            panel: <UpdatePassword />,
          },
        ];

  const tabShiftArr = () => {
    const findArr = tabArr.find((arr) => arr.title === selectedTab);
    if (findArr.title === selectedTab) {
      tabArr.unshift(findArr);
    }
    // iterate over the array and create a unique array
    // use the findIndex method to check if there is already an item with the same value and title properties in the self array (the original arr array).
    const uniqueArr = tabArr.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.value === item.value && t.title === item.title)
    );
    return uniqueArr;
  };

  const duplicateArr = tabShiftArr();

  const selectedTabPanel = useMemo(() => {
    return duplicateArr?.find((tab) => tab?.title === selectedTab)?.panel;
  }, [duplicateArr, selectedTab]);

  const [screenMatches, setScreenMatches] = useState(
    window.matchMedia("(min-width: 1023px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1023px)")
      .addEventListener("change", (e) => setScreenMatches(e.matches));

    return () => {
      window
        .matchMedia("(min-width: 1023px)")
        .removeEventListener("change", (e) => setScreenMatches(e.matches));
    };
  }, []);

  return (
    <>
      {matches ? <SearchInputHeader /> : <ToggledSearchHeader />}
      <section style={profileBg} onClick={() => setDropdownHeader(false)}>
        <div className="heroe-overlay flex flex-col items-center justify-center">
          <h1 className="text-5xl mb-2 font-light">Your profile</h1>
          <p className="mt-4 font-light">
            Keep your details up-to-date to receive news of the best new hotels,
            travel ideas and <br /> offers
          </p>
        </div>
      </section>
      <section className="fle justify-cente">
        <div className="w-full max-w-screen-x px-">
          <div className="flex justify-center">
            {screenMatches && (
              <div style={{ flex: 1 }} className="pl-4">
                <ul className=" space-y-4 mt-10">
                  {duplicateArr.map((tab, index) => (
                    <div
                      key={index}
                      style={{ display: "relative", color: "#A2A2A2" }}
                    >
                      <li
                        className={`${
                          selectedTab === tab.title
                            ? "text-red-900 border-l-2 border-red-900 cursor-pointer pl-2"
                            : "cursor-pointer pl-2"
                        } uppercase font-medium tracking-wider text-sm`}
                        onClick={() => {
                          setSelectedTab(tab?.title);
                        }}
                      >
                        {tab.value}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ flex: 4 }} className="bg-white shadow-xl">
              {!screenMatches && (
                <div className="bg-primary  w-full relative py-3">
                  <ul className="text-white text-center font-normal space-y-4 tracking-widest text-[.75rem] uppercase overflow-x-hidden overflow-y-hidden">
                    {duplicateArr.map((tab, index) => (
                      <div key={index} className="relative">
                        <li
                          onClick={() => {
                            setSelectedTab(tab?.title);
                          }}
                        >
                          {tab.value}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
              <div className=" pl-12 pt-5">{selectedTabPanel}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
