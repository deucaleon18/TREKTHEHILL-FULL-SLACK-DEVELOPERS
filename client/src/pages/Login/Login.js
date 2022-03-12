import React,{useState,useEffect} from 'react'

const Login = () => {


    // Handler function
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
  
      // await axios
      //   .post("http://localhost:5000/login", {
      //     username: data.get("username"),
      //     password: data.get("password"),
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     localStorage.setItem("token", res.data.token);
      //     localStorage.setItem("username", res.data.user.username);
      //     localStorage.setItem("email", res.data.user.email);
      //     localStorage.setItem("paymentAccount", res.data.user.paymentAccount);
  
      //   })
      //   .then(()=>{
      //  window.location.href = "/app";
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

    };





  return (
    <div>Login</div>
  )
}

export default Login;