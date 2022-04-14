// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm{
    string public contractName = "Lakshit Token Farm";
    DaiToken public daiToken;
    DappToken public dappToken;

    //constructor receives address of the deployed daitoken and dapptoken contract and then assigns it to separate state variables for further use and transactions
    constructor(DaiToken _daiToken,DappToken _dappToken) public{
        daiToken = _daiToken;
        dappToken = _dappToken;
    }

    address[] public daiStakers;
    mapping(address => uint) public stakedDaiBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    //function to stake dai tokens
    function stakeDaiTokens(uint amountOfTokens) public{
        daiToken.transferFrom(msg.sender,address(this),amountOfTokens);
        stakedDaiBalance[msg.sender] += amountOfTokens;

        if(!hasStaked[msg.sender])
            daiStakers.push(msg.sender);
        
        hasStaked[msg.sender] = true;
        
        isStaking[msg.sender] = true;
    }
}