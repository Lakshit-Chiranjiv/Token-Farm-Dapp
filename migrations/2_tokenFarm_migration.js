//importing all the 3 contracts' artifacts to deploy here
const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

//receives the deployer account address,networ, and all the ganache accounts in form of array as parameters
//created this function as async bcoz we want to deploy 3 contracts and in order....1st daitoken,2nd dapptoken,3rd tokenfarm
module.exports = async function (deployer,network,accounts) {

  //deployed all 3 contracts sequentially and stored their deployed() object in a variable to access their address to pass in the constructor in the TokenFarm contract

  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  //deploying tokenfarm contract and passing the daitoken and dapptoken contracts addresses as parameter in the constructor
  await deployer.deploy(TokenFarm,daiToken.address,dappToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //now the tokenfarm contract needs to supply dapp tokens whenever it receives daitokens so we put the total amount of dapptokens in the tokenFarm contract address
  await dappToken.transfer(tokenFarm.address,'1000000000000000000000000');// 1 million dapp tokens
  //this is the transfer function implemented in dapptoken contract.

  //now for demo purposes we will put some amount of daitokens in the ganache accounts to try out this project

  for(let i = 1; i <= 5; i++){
    await daiToken.transfer(accounts[i],'200000000000000000000') //200 dai tokens in the accounts 1-5
  }
};
