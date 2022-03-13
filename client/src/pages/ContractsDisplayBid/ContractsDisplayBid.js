import React,{useState,useEffect} from 'react'
import './ContractsDisplayBid.css'
import useBasicFetch from '../../hooks/useBasicFetch'



const ContractsDisplayBid = () => {
  
  const [web3,account,contract,contractLoading]=useBasicFetch();
  const [completedContracts, setCompletedContracts] = useState([]);
  const [incompleteContracts, setIncompleteContracts] = useState([]);
  const [loading1,setLoading1]=useState(true)
  const [loading2,setLoading2]=useState(true)
  const [newContractName,setNewContractName]=useState("")
  const [newContractSector,setNewContractSector]=useState("")
  const [newContractDesc,setNewContractDesc]=useState("")
  const [newContractBase,setNewContractBase]=useState("")


  useEffect(() => {

    // For complete contracts 
    const getCompletedContracts = async () => {
      const contractCount = await contract.methods.contractCount().call();
      console.log(contractCount);

      for (let i = 1; i <= contractCount; i++) {
        await contract.methods
          .contracts(i)
          .call()
          .then((res) => {

            var temp = completedContracts;
            if (res.completed) {
             temp.push({

                name: res.name,
                sector: res.sector,
                id: res.id,
                description: res.description,
                baseAmount:res.baseAmount,
                createdAt:res.createdAt,
                completed:res.completed

              });
            }
            setCompletedContracts(temp);
            console.log(res);
            console.log(completedContracts);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setLoading1(false);
    };
   



    // For incomplete contracts
    const getIncompleteContracts = async () => {
      const contractCount = await contract.methods.contractCount().call();
      console.log(contractCount);

      for (let i = 1; i <= contractCount; i++) {
        await contract.methods
          .contracts(i)
          .call()
          .then((res) => {

            var temp2 = incompleteContracts;
            if (!res.completed) {
             temp2.push({

                name: res.name,
                sector: res.sector,
                id: res.id,
                description: res.description,
                baseAmount:res.baseAmount,
                createdAt:res.createdAt,
                completed:res.completed

              });
            }
            setIncompleteContracts(temp2);
            console.log(res);
            console.log(incompleteContracts);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setLoading2(false);
    };
   

    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      getCompletedContracts();
      getIncompleteContracts();
    }
    // eslint-disable-next-line
  }, [web3, account, contract]);



  return (

    <div className='container-main'>
      <div>
      <div className='side-headers'>
        Completed Contracts
      </div>
      <div className="all-contracts">
      {
            !loading1?completedContracts.map((contract)=>{
           return (
          <div
            className="single-contract"
            onClick={() => (window.location = `/bid/contracts/${contract.id}`)}
          >
            <img src="/assets/contract2.svg" className="cover-image" ></img>
            <h3 >NAME: {contract.name}</h3>
            <h3 >SECTOR: {contract.sector}</h3>
            <h3 >BASE AMOUNT: {contract.baseAmount} ETH</h3>

          </div>)
            }):null

           }
      </div>
      </div>
      <div>
      <div className='side-headers'>
        Incomplete Contracts
      </div>
      <div className="all-contracts">
{
      !loading1?incompleteContracts.map((contract)=>{
     return (
    <div
      className="single-contract"
      onClick={() => (window.location = `/bid/contracts/${contract.id}`)}
    >
          <img src="/assets/contract2.svg" className="cover-image" ></img>
            <h3 >NAME: {contract.name}</h3>
            <h3 >SECTOR: {contract.sector}</h3>
            <h3 >BASE AMOUNT: {contract.baseAmount} ETH</h3>
    </div>)

      }):null

     }  
</div>
      </div>



    </div>
    
  )
}



export default ContractsDisplayBid