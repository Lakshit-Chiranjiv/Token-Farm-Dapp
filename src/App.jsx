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


function App() {

  const loadBlockchainData = async() => {
    const web3 = new Web3(window.ethereum);
  
    // const accounts = await web3.eth.getAccounts();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    setUserWalletAddress(accounts[0]);
    console.log(accounts);

    const networkId = window.ethereum.networkVersion;
    console.log(networkId)

    const daiTokenData = DaiToken.networks[networkId];
    if(daiTokenData){
      const daiToken = new web3.eth.Contract(DaiToken.abi,daiTokenData.address);
      setDaiTokenContract(daiToken);
      const daiTokenBalance = await daiToken.methods.balanceOf(userWalletAddress).call();
      setDaiBalance(daiTokenBalance);
      console.log(daiTokenBalance,userWalletAddress,"Hello");
    }
    else{
      window.alert("Dai token contract not yet deployed on this network");
    }

    const dappTokenData = DappToken.networks[networkId];
    if(dappTokenData){
      const dappToken = new web3.eth.Contract(DappToken.abi,dappTokenData.address);
      setDappTokenContract(dappToken);
      const dappTokenBalance = await dappToken.methods.balanceOf(userWalletAddress).call();
      setDappBalance(dappTokenBalance);
      console.log(dappTokenBalance);
    }
    else{
      window.alert("Dapp token contract not yet deployed on this network");
    }

    
    const tokenFarmData = TokenFarm.networks[networkId];
    if(tokenFarmData){
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi,tokenFarmData.address);
      setTokenFarmContract(tokenFarm);
      const stakingBalance = await tokenFarm.methods.stakedDaiBalance(userWalletAddress).call();
      setStakedDaiAmount(stakingBalance);
    }
    else{
      window.alert("Token Farm contract not yet deployed on this network");
    }

  }



  const [userWalletAddress,setUserWalletAddress] = useState('');
  const [transactionsArray,setTransactionsArray] = useState([]);
  const [daiInputValue,setDaiInputValue] = useState(0);
  const [daiBalance,setDaiBalance] = useState(0);
  const [dappBalance,setDappBalance] = useState(0);
  const [stakedDaiAmount,setStakedDaiAmount] = useState(0);
  // const [dappEarningRate,setDappEarningRate] = useState(0);
  const [daiTokenContract,setDaiTokenContract] = useState(null);
  const [dappTokenContract,setDappTokenContract] = useState(null);
  const [tokenFarmContract,setTokenFarmContract] = useState(null);
  // const [unstakeAll,setUnstakeAll] = useState(false);
  // const [stakeAll,setStakeAll] = useState(false);

  useEffect(()=>{
    loadBlockchainData();
  },[])


  const stakeDaiTokens = (amount) => {
    
  }

  const tarr = [
    {
      type: 'stake',
      amount: 400
    },
    {
      type: 'unstake',
      amount: 130
    },
    {
      type: 'stake',
      amount: 90
    },
    {
      type: 'earn',
      amount: 70
    }
  ]

  return (
    <div className="container App">
      <Header/>
      <AddressBar address={userWalletAddress}/>
      <Balance daiBalance={daiBalance} dappBalance={dappBalance} stakedDaiBalance={stakedDaiAmount}/>
      <DaiInput setDaiInputValue={setDaiInputValue}/>
      <TransactionLogs transactions={tarr.reverse()}/>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit ducimus cumque quibusdam vel dolorem voluptas ipsam officiis laudantium dicta deserunt? Sequi tempore saepe magnam incidunt similique, unde atque quo dignissimos?</p>
    </div>
  );
}

export default App;
