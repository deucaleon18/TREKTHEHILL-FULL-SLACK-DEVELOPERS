import React,{useState,useEffect} from 'react'
import './ContractBid.css'
import { useParams } from "react-router-dom";
import useBasicFetch from '../../hooks/useBasicFetch'
import Modal from 'react-modal';




const ContractBid = () => {

  

  const [name,setName]=useState(undefined)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [createdDate,setCreatedDate]=useState(undefined)
  const [loading,setLoading]=useState(true)
  const [baseAmount,setBaseAmount]=useState(undefined)
  const [sector, setSector] = useState("");
  const [desc, setDesc] = useState("");
  const [allocation, setAllocation] = useState("");
  


  //For a new bid addition
  const[newBidAmt,setNewBidAmt]=useState("")
  const[newBidDesc,setNewBidDesc]=useState("")
 

  // //Use the same variable predefined after " :"
  const { id } = useParams();
  const [web3,account,contract,contractAddress]=useBasicFetch()

  

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  function openModal() {
    console.log("hello")
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  




  const addNewBid=async(e)=>{

    e.preventDefault();
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {

      
      await contract.methods
        .addBid(newBidDesc,newBidAmt,name,localStorage.getItem("username"))
        .send({
          from: account,
          to: contract.options.address
        })
        .then((res) => {
          console.log(res);
          window.location.href="/bid"
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  useEffect(() => {
    const getContractDetails = async () => {
      console.log(id);

      await contract.methods
        .contracts(id)
        .call()
        .then((res) => {
          setName(res.name)
          setSector(res.sector)
          setDesc(res.description)
          setBaseAmount(res.baseAmount)
          setAllocation(res.allocatedTo)
          setCreatedDate(new Date(res.createdAt * 1000).toLocaleString());

          console.log(createdDate);
          console.log(res);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      getContractDetails();
    }
    // eslint-disable-next-line
  }, [web3, account, contract]);







  return (
    <div>
    <h1>Contract-Details</h1>

    <h1>NAME:{name}</h1>
    <h1>DESC:{desc} </h1>
    <h1>SECTOR:{sector}  </h1>
    <h1>BASE:{baseAmount} </h1>
    <h1>ALLOCATION:{allocation}   </h1>


    <button onClick={openModal}>
     ADD A NEW BID NOW
    </button>


    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="New Contract Addition"
      >

        <h2>Place your best bid here:</h2>
        <button onClick={closeModal}>close</button>

        <div>
          <h3>
           Description
          </h3>
          <input type="text" value={newBidDesc}
          
          onChange={(e)=>{
            setNewBidDesc(e.target.value)
          }}
          
          ></input>

        </div>
        <div>
          <h3>
           Amount in ETH
          </h3>
          <input type="text" value={newBidAmt}
          
          onChange={(e)=>{
            setNewBidAmt(e.target.value)
          }}
          
          ></input>

        </div> 

        <button onClick={addNewBid}>BID NOW</button>
      </Modal>

    </div>
  )
}

export default ContractBid