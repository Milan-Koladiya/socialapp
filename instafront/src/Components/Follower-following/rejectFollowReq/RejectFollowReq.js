import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useToken from "../../../hook/useToken";

// const RejectFollowReq = () => {
const RejectFollowReq = async ({ rejectFollowId }) => {
    const {token}= useToken();
    const [rejectReq , setRejectReq] = useState([]);
  try {
    const rejectFollowReq = await fetch(
      `http://localhost:4500/rejectFollow/${rejectFollowId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const RejectReq = await rejectFollowReq.json();
    console.log("rejectRequestStatus====>", RejectReq);
    if ({ status: "pending" }) {
        setRejectReq(
            rejectReq.filter(
          (request) => request.rejectFollowId !== rejectFollowId
        )
      );
    }
  } catch (error) {
    console.log("reject Follow Req Error:", error);
  }
  return (
    <>
      <Button
        onClick={() => {
          RejectFollowReq(rejectFollowId);
        }}
      ></Button>
    </>
  );
};

// }

export default RejectFollowReq;
