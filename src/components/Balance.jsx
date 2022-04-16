import React from 'react'

const Balance = ({daiBalance=55,dappBalance=55,stakedDaiAmount=55}) => {
  return (
    <>
    <div className='d-flex justify-content-center gap-3 my-4'>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>DAI Balance</h3>
            <h5>{daiBalance}</h5>
        </div>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>DAPP Balance</h3>
            <h5>{dappBalance}</h5>
        </div>
    </div>
    <div className='d-flex justify-content-center gap-3 my-4'>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>Staked DAI Amount</h3>
            <h5>{stakedDaiAmount}</h5>
        </div>
        <div className='text-center bg-dark text-white p-2 rounded w-50'>
            <h3 className='mb-2'>Current DAPP earning rate</h3>
            <h5>{stakedDaiAmount}</h5>
        </div>
    </div>
    </>
  )
}

export default Balance