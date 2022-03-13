import React,{useState,useEffect} from 'react'
import './ContractsDisplayGov.css'
import useBasicFetch from '../../hooks/useBasicFetch'
import Modal from 'react-modal';



const ContractsDisplayGov = () => {
  
  const [web3,account,contract,contractLoading]=useBasicFetch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [completedContracts, setCompletedContracts] = useState([]);
  const [incompleteContracts, setIncompleteContracts] = useState([]);
  const [loading1,setLoading1]=useState(true)
  const [loading2,setLoading2]=useState(true)
  const [newContractName,setNewContractName]=useState("")
  const [newContractSector,setNewContractSector]=useState("")
  const [newContractDesc,setNewContractDesc]=useState("")
  const [newContractBase,setNewContractBase]=useState("")



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
  



  // For addition of new contract
  const addNewContract = async (e) => {
    e.preventDefault();
    console.log(contract.methods);
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {

      
      await contract.methods
        .addContract(newContractName,newContractSector,newContractDesc,newContractBase)
        .send({
          from: account,
          to: contract.options.address
        })
        .then((res) => {
         
          console.log(res);
          window.location.href="/gov"
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  function openModal() {
    console.log("hello")
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }






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



    <div>
      
      <div>
      <div>
        Completed Contracts
      </div>
      <div className="all-contracts">

      {
            !loading1?completedContracts.map((contract)=>{
           return (
          <div
            className="single-contract"
            onClick={() => (window.location = `/gov/contracts/${contract.id}`)}
          >
            <h1 >{contract.name}</h1>
            <h1 >{contract.sector}</h1>
            <h1 >{contract.baseAmount} ETH</h1>

          </div>)


            }):null

            
           }
       
          
        
        
      </div>

      </div>

      <div>
      <div>
        Incomplete Contracts
      </div>

      <div className="all-contracts">

{
      !loading1?incompleteContracts.map((contract)=>{
     return (
    <div
      className="single-contract"
      onClick={() => (window.location = `/gov/contracts/${contract.id}`)}
    >
      <h1 >{contract.name}</h1>
      <h1 >{contract.sector}</h1>
      <h1 >{contract.baseAmount} ETH</h1>
    </div>)


      }):null

      
     }

  
</div>
      </div>






{/* Functionality to add a new contract  */}
      <button onClick={openModal}>ADD NEW CONTRACT</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="New Contract Addition"
      >
        <h2>Add a new contract here:</h2>
        <button onClick={closeModal}>close</button>
        <div>
          <h3>
           Name
          </h3>
          <input type="text" value={newContractName}
          
          onChange={(e)=>{
            setNewContractName(e.target.value)
          }}
          
          ></input>

        </div>
        <div>
          <h3>
           Sector
          </h3>
          <input type="text" value={newContractSector}
          
          onChange={(e)=>{
            setNewContractSector(e.target.value)
          }}
          
          ></input>

        </div> <div>
          <h3>
           Description
          </h3>
          <input type="text" value={newContractDesc}
          
          onChange={(e)=>{
            setNewContractDesc(e.target.value)
          }}
          
          ></input>

        </div> <div>
          <h3>
           Base Amount in ETH 
          </h3>
          <input type="text" value={newContractBase}
          
          onChange={(e)=>{
            setNewContractBase(e.target.value)
          }}
          
          ></input>

        </div>

        <button onClick={addNewContract}>ADD NOW</button>
      </Modal>


    </div>
    
  )
}



export default ContractsDisplayGov