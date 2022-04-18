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


function App() {

  const loadBlockchainData = async() => {
    const web3 = window.ethereum;
  
    // const accounts = await web3.eth.getAccounts();
    const accounts = await web3.request({ method: 'eth_accounts' });
    console.log(accounts);
    setUserWalletAddress(accounts[0]);

    const networkId = web3.networkVersion;
    console.log(networkId);



  }



  const [userWalletAddress,setUserWalletAddress] = useState('');
  const [transactionsArray,setTransactionsArray] = useState([]);
  const [daiInputValue,setDaiInputValue] = useState(0);
  const [daiBalance,setDaiBalance] = useState(0);
  const [dappBalance,setDappBalance] = useState(0);
  const [stakedDaiAmount,setStakedDaiAmount] = useState(0);
  const [dappEarningRate,setDappEarningRate] = useState(0);
  const [daiTokenContract,setDaiTokenContract] = useState(null);
  const [dappTokenContract,setDappTokenContract] = useState(null);
  const [tokenFarmContract,setTokenFarmContract] = useState(null);
  // const [unstakeAll,setUnstakeAll] = useState(false);
  // const [stakeAll,setStakeAll] = useState(false);

  useEffect(()=>{
    loadBlockchainData();
  },[])

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
      <Balance/>
      <DaiInput/>
      <TransactionLogs transactions={tarr.reverse()}/>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit ducimus cumque quibusdam vel dolorem voluptas ipsam officiis laudantium dicta deserunt? Sequi tempore saepe magnam incidunt similique, unde atque quo dignissimos?</p>
    </div>
  );
}

export default App;
