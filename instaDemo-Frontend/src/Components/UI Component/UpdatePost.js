import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useToken from "../../hook/useToken";

const UpdatePost = (postId) => {
    const {token} = useToken();

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

  console.log("postId======>", postId);
  const handleUpdate = async () => {
    try {
      const UpdatePostRes = await fetch(
        `http://localhost:4500/update/post${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title,
            description: description,
          }),
        }
      );
      const updateP = await UpdatePostRes.json();
      console.log("updateP=====>", updateP);

    } catch (error) {

      console.log("update post error======>", error);

    }
  };

  return (
    <>
    <h3>Update post</h3>
    <div>
        <label>Title:</label>
      <input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
      <label>Description:</label>
      <input type="text" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
   
    </div>
      <Button onClick={handleUpdate}>confirm update post</Button>
    </>
  );
};

export default UpdatePost;
