import React, { useState } from "react";

const useToken = () => {
    // -------if token alredy store in storage then getToken work-----
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");

    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
       
//   ------if not token in storage then saveToken----------
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    // console.log("userToken:"+userToken.token);
    setToken(userToken.token);

  };
  
  return {
    setToken: saveToken,
    token,
  };

  //   return (
  // <>

  // </>
  //   )
};

export default useToken;
