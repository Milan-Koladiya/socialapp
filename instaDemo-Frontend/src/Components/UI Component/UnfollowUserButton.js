import React, { useState } from "react";

import { Button } from "react-bootstrap";
import useToken from "../../hook/useToken";
import { useNavigate } from "react-router-dom";

const UnfollowUserButton = ({ unfollwingId }) => {
  const unfollowingID = unfollwingId._id;
  console.log("unfolwing id======>", unfollowingID);
  const { token } = useToken();
  const [allFollowing, setAllFollowing] = useState([]);

  const navigate = useNavigate();

  const handleUnFollow = async (unfollowingID) => {
    console.log("unfollowingId====>", unfollowingID);

    try {
      const UnFollowResponce = await fetch(
        `http://localhost:4500/unfollow/${unfollowingID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const unfollowUser = await UnFollowResponce.json();
      
      // if (unfollowUser.success) {
      //   // If unfollow was successful, update the list of following users.
      //   const updatedFollowing = allFollowing.filter(
      //     (user) => user.following !== unfollowingID
      //   );
      //   setAllFollowing(updatedFollowing);
      // }

      console.log("unFollowuser====>", unfollowUser);
    
      navigate(-1);

    } catch (error) {
      console.log("unfollowUser====>", error);

    }
  };

  const handleFollowing = async (e) => {
    // e.preventDefault();

    try {
      const FollowingResponce = await fetch(
        "http://localhost:4500/getFollowing",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const GetFollowing = await FollowingResponce.json();
      console.log("get All Following====>", GetFollowing);
      console.log("get All FollowingID====>", GetFollowing?.Following);

      // let confirmFollowing = GetFollowing?.Following.filter(
      //   (follow) => follow.status == "accepted"
      // );

      // console.log("confirmFollowing=========>", confirmFollowing);
      
      setAllFollowing(GetFollowing)
   console.log("state update after unfollowing=======>",allFollowing);
      // if (confirmFollowing.length > 0) {
      //   setAllFollowing(confirmFollowing);
      // } else {
      //   alert("you have not any follower");
      // }

      // setAllFollowing(GetFollowing?.Following);
    } catch (error) {
      console.log("get All Following error", error);
    }
  };

  return (
    <Button
      onClick={() => {
        handleUnFollow(unfollowingID);
        // handleFollowing();
      }}
    >
      Unfollow
    </Button>
  );
};

export default UnfollowUserButton;
