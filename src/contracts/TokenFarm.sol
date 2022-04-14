// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm{
    string public contractName = "Lakshit Token Farm";
    DaiToken public daiToken;
    DappToken public dappToken;

    //constructor receives address of the deployed daitoken and dapptoken contract and then assigns it to separate state variables for further use and transactions
    constructor(DaiToken _daiToken,DappToken _dappToken){
        daiToken = _daiToken;
        dappToken = _dappToken;
    }
}