import React from 'react'
import Web3 from 'web3'

const loadWeb3 = async() =>{
  if(window.ethereum){
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  }
  else if(window.web3){
    window.web3 = new Web3(window.web3.currentProvider);
  }
  else{
    window.alert("No ethereum browser detected!!Please install metamask");
  }
}

const loadWeb3new = async() => {
  if (window.ethereum) {
    await window.ethereum.request({method: 'eth_requestAccounts'});
    window.web3 = new Web3(window.ethereum);
  }
  else{
    window.alert("No ethereum browser detected!!Please install metamask");
  }
}

const AddressBar = ({address}) => {
  return (
    <div className='my-3'>
        <h3>User Address : {address}</h3>
        <div className="d-grid col-6 mx-auto">
          <button className="btn btn-success" onClick={loadWeb3new}>Connect to Metamask</button>
        </div>
    </div>
  )
}

export default AddressBar