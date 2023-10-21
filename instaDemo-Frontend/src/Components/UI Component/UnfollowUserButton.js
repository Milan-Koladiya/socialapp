import React, { useState } from "react";

import { Button } from "react-bootstrap";
import useToken from "../../hook/useToken";
import { useNavigate } from "react-router-dom";
import Clientaxios from "../../api/axios";

const UnfollowUserButton = ({ unfollwingId }) => {
  const unfollowingID = unfollwingId._id;
  console.log("unfolwing id======>", unfollowingID);
  const { token } = useToken();
  const [allFollowing, setAllFollowing] = useState([]);
  const axiosInstance = Clientaxios();

  const navigate = useNavigate();

  const handleUnFollow = async (unfollowingID) => {
    console.log("unfollowingId====>", unfollowingID);


    try {

      // const UnFollowResponce = await fetch(
      //   `http://localhost:4500/unfollow/${unfollowingID}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // const unfollowUser = await UnFollowResponce.json();

      const UnFollowResponce = await axiosInstance.post(`/unfollow/${unfollowingID}`);

      const unfollowUser = await UnFollowResponce.data;

      
      // if (unfollowUser.success) {
      //   // If unfollow was successful, update the list of following users.
      //   const updatedFollowing = allFollowing.filter(
      //     (user) => user.following !== unfollowingID
      //   );
      //   setAllFollowing(updatedFollowing);
      // }

      console.log("unFollowuser====>", unfollowUser);
    
      navigate(-1);


      // const userId = GetFollowing?.Following.map((getID)=>getID.following._id);
      // console.log("userId from getAllFollowing=========>",userId);

      // UpdateFollowing(unfollowingID);


    } catch (error) {
      console.log("unfollowUser====>", error);

    }
  };

   const UpdateFollowing = (unfollowingID)=>{
    console.log("userID in UpdateFollowing========>",unfollowingID);

    setAllFollowing((previouseFollowing)=>{
          previouseFollowing.filter((requestId)=>requestId.following._id !== unfollowingID)
     })
  }






  const handleFollowing = async (e) => {
    // e.preventDefault();

    try {
      // const FollowingResponce = await fetch(
      //   "http://localhost:4500/getFollowing",
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // const GetFollowing = await FollowingResponce.json();
      const FollowingResponce = await axiosInstance.get(`/getFollowing`);
      const GetFollowing = await FollowingResponce.data;
      
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
console.log("state updated after UpdationFunction========>",allFollowing);

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
