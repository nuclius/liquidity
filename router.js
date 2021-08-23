const router = require("express").Router()
const abi = require('human-standard-token-abi')
require("dotenv").config()
const fetch = require("node-fetch")
const Web3 = require("web3")
// We save infura network keys inside dotenv file. Client will need to sign up for an account and create a new RPC for mainnet at infura.io
const network = process.env.KOVAN_URL
const baseURL = process.env.BASE_URL
const ethAddress = process.env.ETH_ADDRESS
const web3 = new Web3(network)

router.get("/", (req, res) => {
    res.body = "Running...";
})

/* quotes the token swap. Call this when buy and sell tokens are filled out */
// this endpoint takes in a token's ticker (I.E. WETH or USDC) and a buy amount expressed in gwei
// gwei amount = token amount with 18 zeros (IE 1WETH = 1000000000000000000 gwei)
// can also just pass a standard number and the endpoint can be modified to convert the amount
router.post("/quote", async (req, res) => {
    const {sellToken, buyToken, sellTokenAmount} = req.body;
    const amount = sellTokenAmount * 10 ** 8
    const response = await fetch(`${baseURL}quote?sellToken=${buyToken}&buyToken=${sellToken}&buyAmount=${amount}`)
    const quote = await response.json()
    res.status(200).send(quote)
})

/* executes the token swap. Call this on button press */
// takes in the same quote that was sent from the quote endpoint
router.post("/swap", async (req, res) => {
    const {buyTokenAddress, sellTokenAddress, allowanceTarget, sellAmount} = quote
    // set the abi info for the tokens (needed for sending sell order)
    const buyTokenAbi = web3.fetch.contract(abi).at(buyTokenAddress)
    const sellTokenAbi = web3.fetch.contract(abi).at(sellTokenAddress)
    // approves tokens to be sent. Because ERC20 tokens can not be attachted to contract calls, an allowance must be sent 
    // by the taker for the token being sold
    const contract = new web3.Contract(sellTokenAbi, sellTokenAddress)
    await contract.approve(allowanceTarget, sellAmount).send()

    // call the swap smart contract
    await web3.sendTransaction(quote)
})

module.exports = router