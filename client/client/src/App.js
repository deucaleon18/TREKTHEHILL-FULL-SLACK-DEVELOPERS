import React from "react";
import Routing from "./Routing";
import Navbar from "./components /Navbar/Navbar";
import Footer from "./components /Footer/Footer";
import "./App.css"


const App = () => {


  return (
    <div className="app">

        <Navbar />
        <Routing />
        <Footer />
 
    </div>
  );
};

export default App;
