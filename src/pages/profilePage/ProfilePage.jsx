import React, { useMemo, useState } from "react";
import PersonalDetailsPage from ".";
import { profileBg } from "../../BgImageStyles/styles";
import SearchInputHeader from "../../components/PagesSearchHeaders/SearchInputHeader";
import ToggledSearchHeader from "../../components/PagesSearchHeaders/ToggledSearchHeader";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import PersonalDetails from "./component/PersonalDetails";
import UpdatePassword from "./component/UpdatePassword";

const ProfilePage = () => {
  const { matches, setDropdownHeader } = useMediaQueriesContext();
  const [selectedTab, setSelectedTab] = useState("personal-details");
  const tabArr = [
    {
      value: "personal details",
      title: "personal-details",
      panel: <PersonalDetailsPage />
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
            <div style={{ flex: 4 }} className="bg-white shadow-xl pl-12 pt-5">
              {selectedTabPanel}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
