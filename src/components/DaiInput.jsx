import React from 'react'

const DaiInput = () => {
  return (
    <>
        <div class="input-group m-2 p-4 bg-primary rounded mx-auto w-50">
            <input type="number" className="form-control" placeholder="Enter DAI value to stake or unstake..." aria-label="Dai value" aria-describedby="basic-addon1"/>
            <span class="input-group-text" id="basic-addon1"><img src="./../assets/dai.png" alt="dai" className='w-50' /></span>
        </div>
        <div className="d-grid col-6 mx-auto gap-2">
            <button className="btn btn-success">Stake</button>
            <button className="btn btn-danger">Unstake</button>
        </div>
    </>
  )
}

export default DaiInput