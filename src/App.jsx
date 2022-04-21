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
      // console.log(dappTokenBalance);
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
    console.log("dai token bal "+daiTokenBalance);
    setDaiBalance(daiTokenBalance);
    console.log(200,"bye");
    const dappTokenBalance = await dappTokenContract.methods.balanceOf(userWalletAddress).call();
    console.log("dapp token bal "+dappTokenBalance);
    setDappBalance(dappTokenBalance);
    const stakingBalance = await tokenFarmContract.methods.stakedDaiBalance(userWalletAddress).call();
    console.log("stake bal "+stakingBalance);
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
  // const [dappEarningRate,setDappEarningRate] = useState(0);
  const [daiTokenContract,setDaiTokenContract] = useState(null);
  const [dappTokenContract,setDappTokenContract] = useState(null);
  const [tokenFarmContract,setTokenFarmContract] = useState(null);
  // const [unstakeAll,setUnstakeAll] = useState(false);
  // const [stakeAll,setStakeAll] = useState(false);
  const [loadingPage,setLoadingPage] = useState(true);

  useEffect(()=>{
    loadBlockchainData();
  },[])


  const stakeDaiTokens = (amount) => {
    setLoadingPage(true);
    daiTokenContract.methods.approve(tokenFarmContract._address,amount).send({ from: userWalletAddress }).on('transactionHash',(hash) => {
      tokenFarmContract.methods.stakeDaiTokens(amount).send({ from: userWalletAddress }).on('transactionHash',(hash)=> {
        getBalances();
        console.log(daiBalance,56);
        setLoadingPage(false)

        console.log("after stake "+daiBalance,dappBalance,stakedDaiAmount);
      })
    })
  }

  const unstakeDaiTokens = (amount) => {
    console.log("unstake",amount,stakedDaiAmount,(amount>stakedDaiAmount),(amount-stakedDaiAmount));
    let totalUnstake = amount===stakedDaiAmount;
    if((amount/ethWeiFactor) > (stakedDaiAmount/ethWeiFactor)){
      window.alert("Haven't staked that much amount...so can't unstake");
      return;
    }
    setLoadingPage(true);
    tokenFarmContract.methods.unstakeDaiTokens(amount,totalUnstake).send({ from: userWalletAddress }).on('transactionHash',(hash)=> {
      getBalances();
      setLoadingPage(false)
  })
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

  const checkValues = () => {
    console.log("wallet address = "+userWalletAddress);
    console.log("dai balance = "+daiBalance/ethWeiFactor);
    console.log(500/24)
    console.log("dapp balance = "+dappBalance);
    console.log("stake balance = "+stakedDaiAmount);

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
      <DaiInput daiInputValue={daiInputValue} setDaiInputValue={setDaiInputValue} stakeDaiTokens={stakeDaiTokens} unstakeDaiTokens={unstakeDaiTokens}/>
      <TransactionLogs transactions={tarr.reverse()}/>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit ducimus cumque quibusdam vel dolorem voluptas ipsam officiis laudantium dicta deserunt? Sequi tempore saepe magnam incidunt similique, unde atque quo dignissimos?</p>
    </div>
  );
}

export default App;
