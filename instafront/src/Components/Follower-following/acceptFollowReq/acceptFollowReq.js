import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useToken from "../../../hook/useToken";
import ListGroup from "react-bootstrap/ListGroup";
import { MenuBar } from "../../Navbar";
import RejectFollowReq from "../rejectFollowReq/RejectFollowReq";
import AcceptFollowButton from "../../UI Component/AcceptFollowButton";

const AcceptFollowReq = () => {
  const { token } = useToken();

  //   =======display all Follower Request=======
  const [allFollowerReq, setAllFollowerReq] = useState([]);

  const handleAllFollowerReq = async (e) => {
    e.preventDefault();

    try {
      const resAllfollowerReq = await fetch(
        "http://localhost:4500/getFollower",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const GetFollowerReq = await resAllfollowerReq.json();
      console.log("GetFollowerRew====>", GetFollowerReq.followers);
      setAllFollowerReq(GetFollowerReq?.followers);
    } catch (error) {
      console.log("allFollowReq error", error);
    }
  };

  //   =========accept follow req=====================
  const handleAcceptFollowReq = async (followerId) => {
    //   e.preventDefault();
    try {
      console.log("receiverId====>", followerId);
      const resAcceptFollowReq = await fetch(
        `http://localhost:4500/acceptFollow/${followerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const AcceptedReq = await resAcceptFollowReq.json();
      //   -----if below status find then it work-------
      console.log("acceptedReqStatus====>", AcceptedReq);
      if ({ status: "accepted" }) {
        setAllFollowerReq(
          allFollowerReq.filter((request) => request.followerId !== followerId)
        );
      }
    } catch (error) {
      console.log("AcceptFollowReq error", error);
    }
  };

  // =========reject follow request=============
  const handleRejectFollowReq = async (followerId) => {
    try {
      const rejectFollowReq = await fetch(
        `http://localhost:4500/rejectFollow/${followerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const RejectReq = await rejectFollowReq.json();
      console.log("rejectRequestStatus====>",RejectReq);
      if({status:"pending"}){
        setAllFollowerReq(
            allFollowerReq.filter((request)=>request.followerId !== followerId)
        )
      }
    } catch (error) {
      console.log("reject Follow Req Error:", error);
    }
  };
  return (
    <>
      <MenuBar></MenuBar>
      <div className="text-center mt-4">
        <Button onClick={handleAllFollowerReq} className="">
          Show Follow Req
        </Button>
        
      </div>
      {/* {allFollowerReq?.map((followerReq,id) => {
        return <li key={id}>{followerReq.followers}</li>;
      })} */}

      <ListGroup as="ol" numbered>
        {(allFollowerReq || [])?.map((user, id) => {
        //   console.log("follower====>", user.follower);
          return (
            <>
              <h3> Want to Follow you</h3>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{user.follower}</div>
                  <Button
                    variant="outline-danger"
                    className="me-3"
                    onClick={() => handleRejectFollowReq(user.follower)}
                  >
                    Reject
                  </Button>
                  {/* <RejectFollowReq rejectFollowId={user.follower}></RejectFollowReq> */}
                  {/* <AcceptFollowButton AcceptReqId={user.follower}></AcceptFollowButton> */}
                  <Button
                    variant="outline-success"
                    onClick={() => handleAcceptFollowReq(user.follower)}
                  >
                    Accept
                  </Button>
                </div>
              </ListGroup.Item>
            </>
          );
        })}
      </ListGroup>
    </>
  );
};

export default AcceptFollowReq;
