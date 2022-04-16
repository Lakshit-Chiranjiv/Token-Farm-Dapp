
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (callback) {

  const tokenFarm = await TokenFarm.deployed();

  await tokenFarm.issueDappTokens();

  console.log("Dapp tokens issued to stakers");
  callback();
};
