const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

const chai = require('chai');
const web3 = require('web3');

chai.use(require('chai-as-promised')).should();

const tokensToWei = (n) => {
    return web3.utils.toWei(n,'ether');
}

contract('TokenFarm',(accounts)=>{

    let daiToken,dappToken,tokenFarm;

    before(async()=>{
        //in this block we have to do all the constructors tasks again testing it further
        daiToken = await DaiToken.new();
        dappToken = await DappToken.new();
        tokenFarm = await TokenFarm.new(daiToken.address,dappToken.address);

        dappToken.transfer(tokenFarm.address,tokensToWei('1000000'));

        for(let i = 1; i <= 5; i++){
            daiToken.transfer(accounts[i],tokensToWei('200'),{ from: accounts[0] });//from part is meta data about the transfer ...account[0] deploys so account[0] is the owner
        }
    })

    describe("Mock DAI Deployment",async()=>{
        it('dai token has a name',async()=>{
            const name = await daiToken.name();
            assert.equal(name,"Mock DAI Token");
        })
    })

    describe("DApp Deployment",async()=>{
        it('dapp token has a name',async()=>{
            const name = await dappToken.name();
            assert.equal(name,"DApp Token");
        })
    })

    describe("Token Farm Deployment",async()=>{
        it('token farm has a name',async()=>{
            const name = await tokenFarm.contractName();
            assert.equal(name,"Lakshit Token Farm");
        })
    })

    describe("Initially Token Farm has 1 million dapp tokens",async()=>{
        it('token farm has 1 million dapp tokens',async()=>{
            const balanceTokenFarm = await dappToken.balanceOf(tokenFarm.address);
            assert.equal(balanceTokenFarm.toString(),tokensToWei('1000000'));
        })
    })

    describe("Initially all accounts 1-5 have 200 dai tokens",async()=>{
        it('accounts 1-5 get 200 dai tokens initially',async()=>{
            for(let i = 1; i <= 5; i++){
                const accountDaiBalance = await daiToken.balanceOf(accounts[i]);
                assert.equal(accountDaiBalance.toString(),tokensToWei('200'));
            }
        })
    })

    describe("testing the stake function",async()=>{
        it('account and contract balance should be correct after staking',async()=>{
            await daiToken.approve(tokenFarm.address,tokensToWei('150'),{ from: accounts[1] })
            await tokenFarm.stakeDaiTokens(tokensToWei('150'),{ from: accounts[1] })//this from address will act as the msg.sender in the contract
            const accountDaiBalance = await daiToken.balanceOf(accounts[1]);
            assert.equal(accountDaiBalance.toString(),tokensToWei('50'),'account 1 dai balance is correct after staking');

            const tokenFarmContractDaiBalance = await daiToken.balanceOf(tokenFarm.address);
            assert.equal(tokenFarmContractDaiBalance.toString(),tokensToWei('150'),'token farm contract dai balance is correct after staking');

            const stakedMappingBalance = await tokenFarm.stakedDaiBalance(accounts[1]);
            assert.equal(stakedMappingBalance.toString(),tokensToWei('150'),'mapping addr1 dai balance is correct after staking');

            const hasStakedMappingValue = await tokenFarm.hasStaked(accounts[1]);
            assert.equal(hasStakedMappingValue.toString(),'true','mapping hasStaked value is correct after staking');
        })
    })

})