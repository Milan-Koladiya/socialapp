import React, { useEffect, useRef, useState } from "react";

import Button from "react-bootstrap/Button";

import useToken from "../../hook/useToken";
import { MenuBar } from "../Navbar";
import { useNavigate } from "react-router-dom";
import Clientaxios from "../../api/axios";
import axios from "axios";

const CreatePost = (e) => {
const {token} = useToken();
const navigate = useNavigate();


const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState(null);
const [file, setFile] = useState(null);
const axiosInstance = Clientaxios();
//  const ImgInputRef = useRef(null);

// useEffect(()=>{
//   handleImage();
// },[]);
console.log("image======> ",image);
  const handleImage = (e) => {
    const file = e.target.files[0];
      setImage(file);
      setFile(URL.createObjectURL(e.target.files[0]));
  };


  
  const handleCreatePost = async () => {
    console.log("create post")
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      // const newPostResponce = await fetch("http://localhost:4500/user/post", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: formData,
      // });
      // const Post = await newPostResponce.json();

 
      const newPostResponce = await axiosInstance.post('/user/post',
        formData,
       
      {
        headers: { 
        "Content-Type": "multipart/form-data",
    //     // 'Content-Type': 'application/json',
    //     // 'Authorization': `Bearer ${token?.token}`,

      },
    }
      )
           
      console.log("Responce ======after")

      const Post = await newPostResponce.data;
      
    //   const token  = JSON.parse(sessionStorage.getItem("token"))
    //   console.log("token=====>",token);

    //  const newPostResponce = await axios.post(`http://localhost:4500/user/post`,{

    //   data: formData,
    //   headers: { 
    //     "Content-Type": "multipart/form-data",
    //     // 'Content-Type': 'application/json',
    //     // 'Authorization': `Bearer ${token?.token}`,

    //   },
    //  })
    //   const Post = await newPostResponce.data;



      console.log("Post", Post);
      navigate('/allpost'); 
    } catch (error) {
      console.log("createPost Error", error);
    }
  };
  return (
    <>
      <div className="container">
        <MenuBar />
        <div className="text-center mt-5">
          <h2>Create new post</h2>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <br />

          <input
            type="text"
            placeholder="Enter Description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <br />

          <input
            className="ms-5"
            type="file"
            placeholder="Enter image"
            // value={image}
            // ref={ImgInputRef}
            onChange={(e)=>handleImage(e)}
          />
         
         <img src={file} alt="" />
          <br />
          <Button
            variant="outline-danger"
            className="text-center mt-4"
            onClick={handleCreatePost}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
