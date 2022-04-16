import React from 'react'

const Header = () => {
  return (
    <div className="bg-primary d-flex justify-content-center align-items-center gap-4">
        <img src="./../assets/tokenfarm.png" alt="farmer"  style={{width: '125px'}}/>
        <p className='display-3 text-white'>Dapp Token Farm</p>
    </div>
  )
}

export default Header