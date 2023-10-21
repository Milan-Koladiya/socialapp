import React, { useEffect, useState } from "react";
import Clientaxios from "../../api/axios";
import { useParams } from "react-router-dom";

const PostAllLikes = (e) => {
  const axiosInstance = Clientaxios();
  const { PostId } = useParams();

  const [data, setData] = useState([]);

  const handleAllLikes = async (e) => {
    // e.preventDefault();

    const AllLikesres = await axiosInstance.get(`/likes/${PostId}`);
    const Likes = await AllLikesres.data;

    console.log("Likes=========>", Likes);
    const LikeUserName = Likes?.likes?.map((name) => name?.user?.userName);
    // console.log("LikeUSerName=======>", LikeUserName);
    setData(LikeUserName);
  };
  
  console.log("data=======>", data);
  useEffect(() => {
    handleAllLikes();
  }, []);
  return (
    <>
      
      <ul>
        {data?.map((item) => {
          return (
            <>
              <li>{item}</li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default PostAllLikes;
