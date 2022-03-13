import React,{useState,useEffect} from 'react'
import './ContractGov.css'
import { useParams } from "react-router-dom";
import useBasicFetch from '../../hooks/useBasicFetch'


const ContractGov = () => {


  const [name,setName]=useState(undefined)
  const [createdDate,setCreatedDate]=useState(undefined)
  const [loading,setLoading]=useState(true)
  const [loading2,setLoading2]=useState(true)
  const [baseAmount,setBaseAmount]=useState(undefined)
  const [sector, setSector] = useState("");
  const [desc, setDesc] = useState("");
  const [allocation, setAllocation] = useState("");
  const [bids,setBids]=useState([])


  // //Use the same variable predefined after " :"
  const { id } = useParams();
  const [web3,account,contract,contractAddress]=useBasicFetch()

  const approveBid=async(bidSerial)=>{

   await contract.methods.approveBid(bidSerial,id).send({from:account})
  .then(async(res) => {
       window.location.href="/gov";
       console.log(res);
  })

  .catch((err) => {
    console.log(err);
  });
}

  

  useEffect(() => {
   
    const getAllBids=async()=>{

        const bidCount = await contract.methods. bidCount().call();
        var tempName;
         await contract.methods. contracts(id).call()
        .then((res)=>{
            tempName=res.name
        })

        console.log( bidCount);
  
        for (let i = 1; i <= bidCount; i++) {
          await contract.methods
            .bids(i)
            .call()
            .then((res) => {
              var temp = bids;
              if (res.forContract === tempName) {
                bids.push({
                 id:res.id,
                 desc:res.desc,
                 bidder:res.bidder,
                 amount:res.amount
                });
              }
              setBids(temp);
              console.log(res);
              console.log(bids);
            })
            .then(()=>{
              setLoading2(false)
            })
            .catch((err) => {
              console.log(err);
            });
        }
    }
    


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
        .then(()=>{
          getAllBids();
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
      getAllBids()
    }
    // eslint-disable-next-line
  }, [web3, account, contract]);



  return (
    <div className='container-main'>
    <h1 className="detail-header">Contract-Details</h1>
    <div className="detail-card">

    <h1 className="detail-sides">NAME:{name}</h1>
    <h1 className="detail-sides">DESC:{desc} </h1>
    <h1 className="detail-sides">SECTOR:{sector}  </h1>
    <h1 className="detail-sides">BASE:{baseAmount} </h1>
    <h1 className="detail-sides">ALLOCATION:{allocation}   </h1>
    </div>
    <h1 className="detail-sides">BIDS:</h1>

    <div className='all-bids'>
     
    {
            !loading2?bids.map((bid)=>{
           return (
          <div className='single-bid'>
            <h1>DESCRIPTION:{bid.desc}</h1>
            <h1>AMOUNT:{bid.amount}</h1>
            <h1>BIDDER:{bid.bidder}</h1>
            <button className="general-button" 
            
            
            onClick={()=>approveBid(bid.id)}
            
            > APPROVE BID</button>
          </div>
          
          )
            }):null

           }



    </div>

    

    </div>
  )
}

export default ContractGov