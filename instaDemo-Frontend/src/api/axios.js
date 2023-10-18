import axios from 'axios'
import React from 'react'
import useToken from '../hook/useToken'




const Clientaxios = () => {


    
    const {token} = useToken();
    const Client = axios.create({
        baseURL: `http://localhost:4500`,

        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
        }
    }) 

// export default Client;
//   return (
//     <div>axios</div>
//   )
}

export default Clientaxios;
   

  
