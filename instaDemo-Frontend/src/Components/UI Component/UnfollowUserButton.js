import React, { useState } from "react";

import { Button } from "react-bootstrap";
import useToken from "../../hook/useToken";

const UnfollowUserButton = ({ unfollwingId }) => {
  const unfollowingID = unfollwingId._id;
  console.log("unfolwing id======>", unfollowingID);
  const { token } = useToken();
  const [allFollowing, setAllFollowing] = useState([]);

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
      
      if (unfollowUser.success) {
        // If unfollow was successful, update the list of following users.
        const updatedFollowing = allFollowing.filter(
          (user) => user.following !== unfollowingID
        );
        setAllFollowing(updatedFollowing);
      }

      console.log("unFollowuser====>", unfollowUser);
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
      // console.log("get All FollowingID====>", GetFollowing?.Following?.following);

      let confirmFollowing = GetFollowing?.Following.filter(
        (follow) => follow.status == "accepted"
      );

      console.log("confirmFollowing=========>", confirmFollowing);

      if (confirmFollowing.length > 0) {
        setAllFollowing(confirmFollowing);
      } else {
        alert("you have not any follower");
      }

      // setAllFollowing(GetFollowing?.Following);
    } catch (error) {
      console.log("get All Following error", error);
    }
  };

  return (
    <Button
      onClick={() => {
        handleUnFollow(unfollwingId);
      }}
    >
      Unfollow
    </Button>
  );
};

export default UnfollowUserButton;
