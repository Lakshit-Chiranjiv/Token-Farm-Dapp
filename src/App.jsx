import React,{ useState,useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import Header from './components/Header';
import AddressBar from './components/AddressBar';
import Balance from './components/Balance';
import DaiInput from './components/DaiInput';
import TransactionLogs from './components/TransactionLogs';
import DaiToken from './artifacts/DaiToken.json';
import DappToken from './artifacts/DappToken.json';
import TokenFarm from './artifacts/TokenFarm.json';
import axios from 'axios';

function App() {

  const loadBlockchainData = async() => {
    const web3 = new Web3(window.ethereum);
  
    // const accounts = await web3.eth.getAccounts();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    setUserWalletAddress(accounts[0]);
    const userAddress = accounts[0];
    console.log(accounts);

    // const networkId = await web3.eth.net.getId();
    const networkId = window.ethereum.networkVersion;
    console.log(networkId)

    const daiTokenData = DaiToken.networks[networkId];
    if(daiTokenData){
      const daiToken = new web3.eth.Contract(DaiToken.abi,daiTokenData.address);
      setDaiTokenContract(daiToken);
      console.log("address = "+userWalletAddress);
      const daiTokenBalance = await daiToken.methods.balanceOf(userAddress).call();
      // const daiTokenBalance = await daiToken.methods.balanceOf(accounts[0]).call();
      setDaiBalance(daiTokenBalance);
      console.log(daiTokenBalance,"hello");
    }
    else{
      window.alert("Dai token contract not yet deployed on this network");
    }

    const dappTokenData = DappToken.networks[networkId];
    if(dappTokenData){
      const dappToken = new web3.eth.Contract(DappToken.abi,dappTokenData.address);
      setDappTokenContract(dappToken);
      const dappTokenBalance = await dappToken.methods.balanceOf(userAddress).call();
      setDappBalance(dappTokenBalance);
    }
    else{
      window.alert("Dapp token contract not yet deployed on this network");
    }

    
    const tokenFarmData = TokenFarm.networks[networkId];
    if(tokenFarmData){
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi,tokenFarmData.address);
      setTokenFarmContract(tokenFarm);
      const stakingBalance = await tokenFarm.methods.stakedDaiBalance(userAddress).call();
      setStakedDaiAmount(stakingBalance);
      console.log(stakingBalance);
    }
    else{
      window.alert("Token Farm contract not yet deployed on this network");
    }

    setLoadingPage(false);

  }

  const getBalances = async() => {
    setLoadingPage(true);
    const daiTokenBalance = await daiTokenContract.methods.balanceOf(userWalletAddress).call();
    setDaiBalance(daiTokenBalance);
    const dappTokenBalance = await dappTokenContract.methods.balanceOf(userWalletAddress).call();
    setDappBalance(dappTokenBalance);
    const stakingBalance = await tokenFarmContract.methods.stakedDaiBalance(userWalletAddress).call();
    setStakedDaiAmount(stakingBalance);
    setLoadingPage(false);
    console.log("done!!")
  }

  const ethWeiFactor = 1000000000000000000;

  const [userWalletAddress,setUserWalletAddress] = useState('');
  const [transactionsArray,setTransactionsArray] = useState([]);
  const [daiInputValue,setDaiInputValue] = useState(0);
  const [daiBalance,setDaiBalance] = useState(0);
  const [dappBalance,setDappBalance] = useState(0);
  const [stakedDaiAmount,setStakedDaiAmount] = useState(0);
  const [daiTokenContract,setDaiTokenContract] = useState(null);
  const [dappTokenContract,setDappTokenContract] = useState(null);
  const [tokenFarmContract,setTokenFarmContract] = useState(null);
  const [loadingPage,setLoadingPage] = useState(true);

  const loadTransactions = async () => {
    const transcData = await axios.get('http://localhost:5000/trancs')
    console.log(transcData.data);
    setTransactionsArray(transcData.data);
  }

  const addTransaction = async (reqBody) => {
    await axios.post('http://localhost:5000/newtransaction',reqBody)
  }

  useEffect(()=>{
    loadBlockchainData();
    loadTransactions();
  },[])


  const stakeDaiTokens = (amount) => {
    setLoadingPage(true);
    daiTokenContract.methods.approve(tokenFarmContract._address,amount).send({ from: userWalletAddress }).on('transactionHash',(hash) => {
      tokenFarmContract.methods.stakeDaiTokens(amount).send({ from: userWalletAddress }).on('transactionHash',(hash)=> {
        getBalances();
        setLoadingPage(false)
        setTransactionsArray([...transactionsArray,{ type: 'stake',amount: (amount/ethWeiFactor) }]);
        addTransaction({ type: 'stake',amount: (amount/ethWeiFactor) })
        loadTransactions();
      })
    })
  }

  const unstakeDaiTokens = (amount) => {
    let totalUnstake = amount===stakedDaiAmount;
    if((amount/ethWeiFactor) > (stakedDaiAmount/ethWeiFactor)){
      window.alert("Haven't staked that much amount...so can't unstake");
      return;
    }
    setLoadingPage(true);
    tokenFarmContract.methods.unstakeDaiTokens(amount,totalUnstake).send({ from: userWalletAddress }).on('transactionHash',(hash)=> {
      getBalances();
      setLoadingPage(false)
      setTransactionsArray([...transactionsArray,{ type: 'unstake',amount: (amount/ethWeiFactor) }]);
      addTransaction({ type: 'unstake',amount: (amount/ethWeiFactor) })
      loadTransactions();
  })
}

  const checkValues = () => {
    console.log("wallet address = "+userWalletAddress);
    console.log("dai balance = "+daiBalance/ethWeiFactor);
    console.log(500/24)
    console.log("dapp balance = "+dappBalance);
    console.log("stake balance = "+stakedDaiAmount);
    console.log("daiInputValue = "+daiInputValue);
    console.log(transactionsArray);
    loadTransactions();
  }

  return (
    <div className="container App">
      <Header/>
      <AddressBar address={userWalletAddress}/>
      <button className='btn btn-outline-primary' onClick={checkValues}>Check values</button>
      {
        loadingPage ? 
        <h1>Loading ....</h1> :
        <>
          <Balance daiBalance={daiBalance} dappBalance={dappBalance} stakedDaiAmount={stakedDaiAmount}/>
        </>
      }
      <DaiInput daiInputValue={daiInputValue} setDaiInputValue={setDaiInputValue} stakeDaiTokens={stakeDaiTokens} unstakeDaiTokens={unstakeDaiTokens} daiBalance={daiBalance} stakedDaiAmount={stakedDaiAmount}/>
      <TransactionLogs transactions={transactionsArray}/>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit ducimus cumque quibusdam vel dolorem voluptas ipsam officiis laudantium dicta deserunt? Sequi tempore saepe magnam incidunt similique, unde atque quo dignissimos?</p>
    </div>
  );
}

export default App;
