import React, { useState } from "react";
import useToken from "../../../hook/useToken";
import Button from "react-bootstrap/Button";
import { MenuBar } from "../../Navbar";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import UnfollowUserButton from "../../UI Component/UnfollowUserButton";

const Following = () => {
  const { token } = useToken();
  const [allFollowing, setAllFollowing] = useState([]);

  const handleFollowing = async (e) => {
    e.preventDefault();

    

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

      setAllFollowing(GetFollowing?.Following);
    } catch (error) {
      console.log("get All Following error", error);
    }
  };
  // const handleUnFollow = async (unfollwingId) => {
  //   console.log("unfollowingId====>",unfollwingId);

  //   try {
  //     const UnFollowResponce = await fetch(`http://localhost:4500/unfollow/${unfollwingId}`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const unfollowUser = await UnFollowResponce.json();
  //     console.log("unFollowuser====>",unfollowUser);
  //   } catch (error) {
  //     console.log("unfollowUser====>", error);
  //   }
  // };
  return (
    <>
      {/* <h3>Following</h3> */}
      <div className="container">
        <MenuBar />
        <div className="text-center mt-5">
          <Button
            variant="outline-danger"
            className="text-center"
            onClick={handleFollowing}
          >
            get All Following
          </Button>
        </div>

        <ListGroup as="ol" numbered>
          {(allFollowing || [])?.map((user, id) => {
            return (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{user.following}</div>
                </div>
                {/* <Button onClick={()=>handleUnFollow(user.following)} >Unfollow</Button> */}
                <UnfollowUserButton unfollwingId={user.following} ></UnfollowUserButton>
                {/* <Badge bg="primary" pill>
              14
            </Badge> */}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      {/* {(allFollowing || [])?.map((user, id) => {
        return <li key={id}>{user.following}</li>;
      })} */}
    </>
  );
};

export default Following;
