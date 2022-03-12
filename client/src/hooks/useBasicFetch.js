import {useState,useEffect} from "react"
import Contractio from "../contracts/Contractio.json";
import getWeb3 from "../getWeb3";


const useBasicFetch = () => {
     const [contract, setContract] = useState(undefined);
     const [account, setAccount] = useState(undefined);
     const [web3, setWeb3] = useState(undefined);
     const [contractLoading, setContractLoading] = useState(true);
   useEffect(() => {
     const getBasicDetails = async () => {
       try {
         // Get network provider and web3 instance.
         const web3 = await getWeb3();

         // Use web3 to get the user's accounts.
         const accounts = await web3.eth.getAccounts();

         // Get the contract instance.
         const networkId = await web3.eth.net.getId();
         const deployedNetwork = Contractio.networks[networkId];
         const instance = new web3.eth.Contract(
           Contractio.abi,
           deployedNetwork && deployedNetwork.address
         );

         setWeb3(web3);
         setAccount(accounts[0]);
         setContract(instance);
         setContractLoading(false);
       } catch (error) {
         // Catch any errors for any of the above operations.
         alert(
           `Failed to load web3, accounts, or contract. Check console for details.`
         );
         console.error(error);
       }
     };

     getBasicDetails();
   }, []);


   return[web3,account,contract,contractLoading]
}

export default useBasicFetch
