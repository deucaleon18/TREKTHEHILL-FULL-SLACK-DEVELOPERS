import React,{useState,useEffect} from 'react'
import useBasicFetch from '../../hooks/useBasicFetch'


const Register = () => {


    const [web3,account,contract] = useBasicFetch();

    // const [image, setImage] = useState(undefined);
    // const [imageUrl, setImageUrl] = useState(undefined);
    // const [buffer, setBuffer] = useState(undefined);


    const [username,setUsername]=useState("")
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("")

    // const [paymentAccount,setPaymentAccount]=useState("")
    // const [imageHash,setImageHash]=useState("")
  


//   Register handler
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     await client
    //       .add(buffer)
    //       .then(async (res) => {
    //         console.log(res.path)
    //         setImageHash(res.path);
    //             await contract.methods
    //               .createUser(email, username, paymentAccount)
    //               .send({ from: account })
    //               .then(async(res) => {
    //                 console.log(res);
                    
    //                 // eslint-disable-next-line no-console
    //                 await axios
    //                   .post("http://localhost:5000/register/", {
    //                     username,
    //                     email,
    //                     password,
    //                     paymentAccount,
    //                     imageHash
    //                   })
    //                   .then((res) => {
    //                     console.log(res);
    //                     localStorage.setItem("token", res.data.token);
    //                     localStorage.setItem("username", res.data.user.username);
    //                     localStorage.setItem("email", res.data.user.email);
    //                     localStorage.setItem(
    //                       "paymentAccount",
    //                       res.data.user.paymentAccount
    //                     );
    //                   })
    //                   .then(() => {
    //                     window.location.href = "/app";
    //                   })
    //                   .catch((err) => {
    //                     console.log(err);
    //                   });
    //               })
    
    //               .catch((err) => {
    //                 console.log(err);
    //               });
    //             })
    //             .catch((err)=>{
    //               console.log(err)
    
    //             })
                
    //   };


      


  return (
    <div>Register</div>
  )
}

export default Register