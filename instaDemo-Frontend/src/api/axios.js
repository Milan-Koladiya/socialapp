// import axios from 'axios'

// import useToken from '../hook/useToken'


// const Clientaxios = () => {

//     const {token} = useToken();
//     const Client = axios.create({
//         baseURL: `http://localhost:4500`,

//         headers: {
//             "Content-Type":"application/json",
//             "Authorization": `Bearer ${token}`,
//         }
//     }) 

// // export default Client;
// //   return (
// //     <div>axios</div>
// //   )
// }

// export default Clientaxios;
   

import axios from 'axios';
import useToken from '../hook/useToken';

const Clientaxios = () => {

  const token  = JSON.parse(sessionStorage.getItem("token"))

  const client = axios.create({
    baseURL: 'http://localhost:4500',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.token}`,
    },
  });
  return client;
};


export default Clientaxios;


  
