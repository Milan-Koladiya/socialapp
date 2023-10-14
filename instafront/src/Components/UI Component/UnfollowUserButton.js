import React from 'react'
import { Button } from 'react-bootstrap'
import useToken from '../../hook/useToken';

const UnfollowUserButton = ({unfollwingId}) => {
    const {token} =useToken();
    const handleUnFollow = async (unfollwingId) => {
        console.log("unfollowingId====>",unfollwingId);
    
        try {
          const UnFollowResponce = await fetch(`http://localhost:4500/unfollow/${unfollwingId}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const unfollowUser = await UnFollowResponce.json();
          console.log("unFollowuser====>",unfollowUser);
        } catch (error) {
          console.log("unfollowUser====>", error);
        }
      };

    return (
   <Button onClick={()=>{handleUnFollow(unfollwingId)}}>Unfollow</Button>
  )
}

export default UnfollowUserButton;
