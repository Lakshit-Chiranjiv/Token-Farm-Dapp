import React from 'react'

const DaiInput = () => {
  return (
    <>
        <div className="input-group m-2 p-4 bg-primary rounded mx-auto w-50">
            <input type="number" className="form-control" placeholder="Enter DAI value to stake or unstake..." aria-label="Dai value" aria-describedby="basic-addon1"/>
            <span className="input-group-text" id="basic-addon1"><img src="./../assets/dai.png" alt="dai" className='w-50' /></span>
        </div>
        <div className="d-grid col-6 mx-auto gap-2">
          <div className="d-flex gap-2">
            <button className="btn btn-success col-6">Stake</button>
            <button className="btn btn-danger col-6">Unstake</button>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-success col-6">Stake All</button>
            <button className="btn btn-outline-danger col-6">Unstake All</button>
          </div>
        </div>
    </>
  )
}

export default DaiInput