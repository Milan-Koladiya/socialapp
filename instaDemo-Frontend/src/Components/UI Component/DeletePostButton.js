import React from "react";
import useToken from "../../hook/useToken";
import { Button } from "react-bootstrap";

const DeletePostButton = (deletePostId) => {
    console.log("deletePsot id====>",deletePostId);
  const { token } = useToken();

  const handleDelete = async () => {
    try {
        console.log("deletePsot id====>",deletePostId);
   
      const DeletePostRes = await fetch(
        `http://localhost:4500/post/delete/${deletePostId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const Deletepost = DeletePostRes.json();
      console.log("deletePost====>",Deletepost);

    } catch (error) {
      console.log("delete post error", error);
    }
  };
  return (
    <>
      <Button onClick={handleDelete}>Delete Post</Button>
    </>
  );
};

export default DeletePostButton;
