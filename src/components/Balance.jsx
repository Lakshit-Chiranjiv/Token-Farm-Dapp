import React from 'react'

const Balance = ({daiBalance,dappBalance,stakedDaiAmount=0}) => {

    let currDappEarningRate = 0;
    const ethWeiFactor = 1000000000000000000;
    const stkBalance = stakedDaiAmount/ethWeiFactor;
    if(stkBalance>0 && stkBalance<=50)
      currDappEarningRate = 10;
    else if(stkBalance>50 && stkBalance<=100)
      currDappEarningRate = 20;
    else if(stkBalance>100 && stkBalance<=150)
      currDappEarningRate = 30;
    else if(stkBalance>150)
      currDappEarningRate = 50;

  return (
    <div className='mx-2'>
    <div className='d-flex justify-content-center gap-3 my-4'>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>DAI Balance <span><img src="./../assets/dai.png" alt="dai" style={{width: '40px', marginLeft: '10px'}} /></span> </h3>
            <h5>{daiBalance/ethWeiFactor}</h5>
        </div>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>DAPP Balance <span><img src="./../assets/token-logo.png" alt="dapp" style={{width: '40px', marginLeft: '10px'}} /></span> </h3>
            <h5>{dappBalance/ethWeiFactor}</h5>
        </div>
    </div>
    <div className='d-flex justify-content-center gap-3 my-4'>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>Staked DAI Amount</h3>
            <h5>{stakedDaiAmount/ethWeiFactor}</h5>
        </div>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>Current DAPP earning rate</h3>
            <h5>{currDappEarningRate}</h5>
        </div>
    </div>
    </div>
  )
}

export default Balance