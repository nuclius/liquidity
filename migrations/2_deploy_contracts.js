const Token = artifacts.require("TDexToken");
// test address. Update before deployment
const address = "0x2cCA3fd1d1FA0241Cd40668d5A458c81ABd895Bd";

module.exports = async function(deployer) {
    await deployer.deployer(Token)
    const token = await Token.deployed()

    await token.transfer(address, "1000000000000000000000000")
}