// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm{
    string public contractName = "Lakshit Token Farm";
    DaiToken public daiToken;
    DappToken public dappToken;
    address public owner;

    //constructor receives address of the deployed daitoken and dapptoken contract and then assigns it to separate state variables for further use and transactions
    constructor(DaiToken _daiToken,DappToken _dappToken) public{
        daiToken = _daiToken;
        dappToken = _dappToken;
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"only owner can call this");
        _;
    }

    address[] public daiStakers;
    mapping(address => uint) public stakedDaiBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    //function to stake dai tokens
    function stakeDaiTokens(uint amountOfTokens) public{
        require(amountOfTokens > 0,"More than 0 dai tokens should be staked");

        daiToken.transferFrom(msg.sender,address(this),amountOfTokens);
        stakedDaiBalance[msg.sender] += amountOfTokens;

        if(!hasStaked[msg.sender])
            daiStakers.push(msg.sender);
        
        hasStaked[msg.sender] = true;
        
        isStaking[msg.sender] = true;
    }


    //function to issue dapp tokens
    function issueDappTokens() onlyOwner public{
        
        for(uint i = 0;i < daiStakers.length; i++){
            address recpt = daiStakers[i];
            uint stakedBalance = stakedDaiBalance[recpt];
            uint issueAmount;
            if(stakedBalance> 0){
                if(stakedBalance>0 && stakedBalance <= (50 * 1 ether))
                    issueAmount = (10 * 1 ether);
                else if(stakedBalance>=51 && stakedBalance <= (100 * 1 ether))
                    issueAmount = (20 * 1 ether);
                else if(stakedBalance>=101 && stakedBalance <= (150 * 1 ether))
                    issueAmount = (30 * 1 ether);
                else if(stakedBalance > 150)
                    issueAmount = (50 * 1 ether);
                dappToken.transfer(recpt, issueAmount);
            }
        }
    }
}