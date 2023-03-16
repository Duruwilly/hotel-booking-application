import React from "react";
import { UserContextProvider } from "../../context/UserProfileContext";
import PersonalDetails from "./component/PersonalDetails";

const PersonalDetailsPage = () => {
  return (
    <div>
      <UserContextProvider>
        <PersonalDetails />
      </UserContextProvider>
    </div>
  );
};

export default PersonalDetailsPage;
