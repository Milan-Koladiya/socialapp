import React, { useEffect } from "react";
import useToken from "../../hook/useToken";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from "react-router-dom";
import Clientaxios from "../../api/axios";

const DeletePostButton = () => {
  const {deletePostId} = useParams();
 const navigate = useNavigate();
 
 console.log("deletePsot id====>", deletePostId);
 const { token } = useToken();
 
 const handleDelete = async (e) => {
    const axiosInstance = Clientaxios();
    // e.preventDefault();
    try {

      console.log("deletePsot id====>", deletePostId);

      // const DeletePostRes = await fetch(
      //   `http://localhost:4500/post/delete/${deletePostId}`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // const Deletepost = await DeletePostRes.json();

      //   console.log("axiosInstance========>",axiosInstance);
      // console.log("deletepost Res")

      
      const DeletePostRes = await axiosInstance.delete(`/post/delete/${deletePostId}`);
      const Deletepost = await DeletePostRes.data;

      

      console.log("deletePost====>", Deletepost);
      navigate('/allpost');
    } catch (error) {
      console.log("delete post error======>", error);
    }

  };



  const FetchAllPost = async (e) => {
    // e.preventDefault();
    try {

      const allPostRes = await fetch(`http://localhost:4500/user/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const AllPost = await allPostRes.json();

      console.log("all post after delete post========>", AllPost);

      // useEffect(() => {
      //   FetchAllPost();
      // },[]);
    } catch (error) {
      console.log("on delete all post error=======>", error);
    }
  };
  // useEffect(()=>{
  //     FetchAllPost();
  //     handleDelete();
  // },[])
  return (
    <>
       <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>confirm Delete this Post..?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button onClick={()=>{ handleDelete()}} >Delete Post</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    
    </>
  );
};

export default DeletePostButton;
