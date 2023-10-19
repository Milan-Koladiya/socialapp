import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import useToken from "../../hook/useToken";
import { useNavigate, useParams } from "react-router-dom";
import Clientaxios from "../../api/axios";

const UpdatePost = (e) => {
  // e.preventDefault();
  const {id} = useParams();
  const navigate = useNavigate();
  console.log("postId=====>",id);
    const {token} = useToken();

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

  console.log("postId======>", id);
  const handleUpdate = async () => {
    try {
  console.log("postId======>", id);

      // const UpdatePostRes = await fetch(
      //   `http://localhost:4500/update/${id}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       title: title,
      //       description: description,
      //     }),
      //   }
      // );
 
      // const updateP = await UpdatePostRes.json();


      const UpdatePostRes = await Clientaxios.put(`/update/${id}`,{
        title:title,
        description:description
      });
      const updateP = await UpdatePostRes.data;
      
      console.log("updateP=====>", updateP);
      navigate('/allpost')
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


  
      {/* <Form onSubmit={handleUpdate}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title : </Form.Label>
        <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description :</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e)=>{setDescription(e.target.description)}} />
      </Form.Group>
   
      <Button variant="primary" type="submit" >
        Confirm Update
      </Button>
    </Form> */}
    </>
  );
};

export default UpdatePost;
