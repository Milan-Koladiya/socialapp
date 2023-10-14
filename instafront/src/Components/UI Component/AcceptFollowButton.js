import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import useToken from '../../hook/useToken';

const AcceptFollowButton = async({AcceptReqId}) => {
const {token} = useToken();
const [acceptReq , setAcceptReq] = useState([]);

    try {
        console.log("receiverId====>", AcceptReqId);
     
        const resAcceptFollowReq = await fetch(
          `http://localhost:4500/acceptFollow/${AcceptReqId}`,
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
            setAcceptReq(
                acceptReq.filter((request) => request.AcceptReqId !== AcceptReqId)
          );
        }
      } catch (error) {
        console.log("AcceptFollowReq error", error);
      }
  return (
  <>
  <Button onClick={()=>AcceptFollowButton(AcceptReqId)}></Button>
  </>
  )
}

export default AcceptFollowButton