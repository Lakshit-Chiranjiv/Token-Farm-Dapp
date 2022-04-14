// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm{
    string public contractName = "Lakshit Token Farm";
    DaiToken public daiToken;
    DappToken public dappToken;

    constructor(DaiToken _daiToken,DappToken _dappToken){
        daiToken = _daiToken;
        dappToken = _dappToken;
    }
}