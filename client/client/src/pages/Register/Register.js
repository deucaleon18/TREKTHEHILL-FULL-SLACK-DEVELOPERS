import React,{useState,useEffect} from 'react'
import useBasicFetch from '../../hooks/useBasicFetch'
import './Register.css'
import axios from 'axios'

const Register = () => {

    const [web3,account,contract] = useBasicFetch();
    const [username,setUsername]=useState("")
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("")

    // const [image, setImage] = useState(undefined);
    // const [imageUrl, setImageUrl] = useState(undefined);
    // const [buffer, setBuffer] = useState(undefined);
    // const [imageHash,setImageHash]=useState("")

//   Register handler

    const handleSubmit = async (event) => {
        event.preventDefault();
        // await client
        //   .add(buffer)
        //   .then(async (res) => {
        //     console.log(res.path)
        //     setImageHash(res.path);

              await contract.methods
                  .addUser( username,email)
                  .send({ from: account })
                  .then(async(res) => {
                    console.log(res);
                    
                    // eslint-disable-next-line no-console
                    await axios
                      .post("http://localhost:5000/register/", {
                        username,
                        email,
                        password,
                        // paymentAccount,
                        // imageHash
                      })
                      .then((res) => {
                        console.log(res);
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("username", res.data.user.username);
                        localStorage.setItem("email", res.data.user.email);
                      
                      })
                      .then(() => {
                        window.location.href = "/bid";
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
    
                  .catch((err) => {
                    console.log(err);
                  });

                }


  return (
    <div className='container-main'>
    <div className='header'>Register</div>
    <div className='register-page'>
   
    <input type="text" placeholder="Username"className='input-field'
    value={username}
    onChange={(e) => {
      setUsername(e.target.value);
    }}
    />
    
    <br/>
    
    <input type="text" placeholder="Email address" className='input-field'
     value={email}
     onChange={(e) => {
       setEmail(e.target.value);
     }}
    />
  

    <br/>

    <input type="text"  placeholder="Password" className='input-field'
     value={password}
     onChange={(e) => {
       setPassword(e.target.value);
     }}
     />
   

    <button type="submit" onClick={handleSubmit} className="general-button">REGISTER</button>
    </div>
    </div>

    
  )
}

export default Register