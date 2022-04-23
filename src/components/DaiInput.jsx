import React,{ useRef } from 'react'
import Web3 from 'web3';

const DaiInput = ({daiInputValue,setDaiInputValue,stakeDaiTokens,unstakeDaiTokens,daiBalance,stakedDaiAmount}) => {

  const web3 = new Web3(window.ethereum);
  const daiInputRef = useRef(null);
  const ethWeiFactor = 1000000000000000000;
  
  return (
    <>
        <div className="input-group m-2 p-4 bg-primary rounded mx-auto w-50">
            <input type="number" className="form-control" placeholder="Enter DAI value to stake or unstake..." aria-label="Dai value" aria-describedby="basic-addon1" onChange={(e)=>{setDaiInputValue(e.target.value)}} ref={daiInputRef}/>
            <span className="input-group-text" id="basic-addon1"><img src="./../assets/dai.png" alt="dai" className='w-50' /></span>
        </div>
        <div className="d-grid col-6 mx-auto gap-2">
          <div className="d-flex gap-2">
            <button className="btn btn-success col-6" onClick={()=>{
              let stakeAmount = web3.utils.toWei(daiInputValue.toString(),'ether');
              stakeDaiTokens(stakeAmount)
              setDaiInputValue(0);
              daiInputRef.current.value = 0;
              }}>Stake</button>
            <button className="btn btn-danger col-6" onClick={()=>{
              let unstakeAmount = web3.utils.toWei(daiInputValue.toString(),'ether');
              unstakeDaiTokens(unstakeAmount)
              setDaiInputValue(0);
              daiInputRef.current.value = 0;
              }}>Unstake</button>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-success col-6" onClick={()=>{
              daiInputRef.current.value = (daiBalance/ethWeiFactor);
              setDaiInputValue(daiBalance/ethWeiFactor);
              }}>Stake All</button>
            <button className="btn btn-outline-danger col-6" onClick={()=>{
              daiInputRef.current.value = (stakedDaiAmount/ethWeiFactor);
              setDaiInputValue(stakedDaiAmount/ethWeiFactor);
            }}>Unstake All</button>
          </div>
        </div>
    </>
  )
}

export default DaiInput