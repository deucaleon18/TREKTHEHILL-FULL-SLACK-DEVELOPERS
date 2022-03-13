import React from 'react'
import "./HomePage.css"


const HomePage = () => {
  return (
    <div className='container-main'>


        <div style={{display:"flex",alignItems:"top",justifyContent:"space-between"}}>
        <div style={{padding:"100px"}}>
          
          <h1 className='home-header1'>A single platform for all the government contracts</h1>
          
          <h3 className='home-header2'>No need to worry about any underlying corrupt practices</h3>

          <h3 className='home-header3'>Easily <span color="#0047DF">bid</span> on government tenders in a transparent and safe way</h3>
          <h3 className='home-header3'>Easily <span color="#0047DF">bid</span> add new government contracts after approval to the blockchain network</h3>
        </div>
        
        <img style={{padding:"100px"}}src="/assets/contract4.svg" alt="contractio"/>
        </div>


    </div>

  )
}

export default HomePage