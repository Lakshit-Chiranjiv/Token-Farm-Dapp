import React from 'react'
import Log from './Log'

const TransactionLogs = ({transactions}) => {
  return (
    <div>
        <h3 className='text-center my-4'><u>Transaction Logs</u></h3>
        {
            transactions.map((transaction,i) => {
                if(transaction.type === 'stake')
                    return <Log key={i+Math.random()*Math.random()} staked stakeAmount={transaction.amount} />
                else if(transaction.type === 'unstake')
                    return <Log key={i+Math.random()*Math.random()} unstaked unstakeAmount={transaction.amount} />
                else
                    return <Log key={i+Math.random()*Math.random()} earned earnAmount={transaction.amount} />
            })
        }
    </div>
  )
}

export default TransactionLogs