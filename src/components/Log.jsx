import React from 'react'

const Log = ({staked=false,unstaked=false,earned=false,stakeAmount,unstakeAmount,earnAmount}) => {
  return (
    <div className='text-center'>
        {
            staked &&
            <h6 className='text-danger'>Staked {stakeAmount} DAI tokens</h6>
        }
        {
            unstaked &&
            <h6 className='text-warning'>Unstaked {unstakeAmount} DAI tokens</h6>
        }
        {
            earned &&
            <h6 className='text-success'>Earned {earnAmount} DAPP tokens</h6>
        }
        <hr className='w-50 mx-auto'/>
    </div>
  )
}

export default Log