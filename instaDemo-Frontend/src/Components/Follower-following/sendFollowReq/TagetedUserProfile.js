import React from "react";
import FollowUserProfile from "./FollowUserProfile";
import { MenuBar } from "../../Navbar";

const TagetedUserProfile = () => {
  const user = {
    id: "651e7b68553663742b05b853",
  };

  return (
    <>
  
      <div>
        <FollowUserProfile user={user} />
      </div>
    </>
  );
};

export default TagetedUserProfile;
