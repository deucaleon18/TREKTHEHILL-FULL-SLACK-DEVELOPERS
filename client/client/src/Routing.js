import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ContractsDisplayGov from "./pages/ContractsDisplayGov/ContractsDisplayGov";
import ContractsDisplayBid from "./pages/ContractsDisplayBid/ContractsDisplayBid";

// import NewPost from "./pages/NewPost/NewPost";
import ContractGov from './pages/ContractGov/ContractGov';
import ContractBid from './pages/ContractBid/ContractBid';




const Routing = () => {
    return (
      <>
        <BrowserRouter>
          <Routes>
             <Route exact path="/" element={<HomePage/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>

            {/* {localStorage.getItem("token") ? (
              <Route exact path="/new" element={<NewContract />}></Route>
            ) : (
              <Route exact path="/new" element={<Login/>}></Route>
            )} */}


            <Route exact path="/register" element={<Register/>}></Route>

            {localStorage.getItem("admin")?( <Route
              exact
              path="/gov/contracts/:id"
              element={<ContractGov/>}
            ></Route>):(
              <Route exact path="/gov/contracts/:id" element={<Login/>}></Route>
            )}
           

           {localStorage.getItem("token")?( <Route
              exact
              path="/bid/contracts/:id"
              element={<ContractBid/>}
            ></Route>):(
              <Route exact path="/bid/contracts/:id" element={<Login/>}></Route>
            )}


           {localStorage.getItem("admin") ? (
              <Route exact path="/gov" element={<ContractsDisplayGov/>}></Route>
            ) : (
              <Route exact path="/gov" element={<Login/>}></Route>
            )}

              {localStorage.getItem("token") ? (
              <Route exact path="/bid" element={<ContractsDisplayBid/>}></Route>
            ) : (
              <Route exact path="/bid" element={<Login/>}></Route>
            )}


          </Routes>
        </BrowserRouter>
      </>
    );
}

export default Routing
