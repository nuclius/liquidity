import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {FormControl, Select, MenuItem, Button} from "@material-ui/core"

function Main() {
    const [coinList, setCoinList] = useState([])
    const [sellToken, setSellToken] = useState("ETH")
    const [buyToken, setBuyToken] = useState("TDex")
    const [sellTokenAmount, setSellTokenAmount] = useState(0)
    const [buyTokenAmount, setBuyTokenAmount] = useState(0)
    const [buyTokenBalance, setBuyTokenBalance] = useState(0)
    const [sellTokenBalance, setSellTokenBalance] = useState(0.00)
    const [output, setOutput] = useState(0)
    const [rate, setRate] = useState(100)
    const [order, setOrder] = useState([])
    let tokenList = []
    useEffect(() => {
    Axios.get("https:/api.0x.org/swap/v1/tokens")
    .then(res => {
      setCoinList(res.data.records)
    })
    .catch(err => console.log(err))
  },[])

    function calculateRate() {
        fetchPrice()
        return 100
    }

    function swapTokens(e) {
        e.preventDefault()
        Axios.post("/quote", {sellToken, buyToken, sellTokenAmount})
        .then(res => console.log(res.data))
    }

    function fetchPrice() {
        if(buyToken === "TDex") {
            if (sellToken === "ETH") {
                setRate(100)
            } else {
            Axios.get(`https://kovan.api.0x.org/swap/v1/quote?sellToken=ETH&buyToken=${sellToken}&buyAmount=1000000000000000000`)
            .then(res => {
                const priceInCurrency = parseFloat(res.data.guaranteedPrice)
                console.log(priceInCurrency)
                setRate((priceInCurrency * 100).toFixed(4))
            })}
        } else {
            Axios.get(`https://kovan.api.0x.org/swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=1000000000000000000`)
            .then(res => {
                console.log(res.data.guaranteedPrice)
                setRate(parseFloat(res.data.guaranteedPrice).toFixed(4))
                })
        }  
    }
    return (


    <div className="content">
        <div className="card">
            <div className="card-body">
            <form className="currency-swap" onSubmit={e => swapTokens(e)}>
                <div className="textWrapper">
                    <h3>Input</h3>
                </div>
                <div className="input-group">
                    <input 
                    type="number"
                    step="0.01"
                    onChange={(event) => {
                        setSellTokenAmount(event.target.value)
                    }}
                    className="inputBox"
                    placeholder="0.00"
                    required/>
                    <div className="small">
                    <form className="full"
                    onChange={e => {
                        setSellToken(e.target.value)
                        fetchPrice()
                        }}>
                        <select className="full">
                            {coinList.map((token, id) => (
                                <option key={id} value={token.symbol}>{token.symbol}</option>
                            ))}
                        </select>
                    </form>
                    </div>
                    <div className="one-col">
                        {sellToken} &nbsp;
                        <span className="right">Balance: &nbsp; {sellTokenBalance}</span>
                    </div>
                </div>
                <div className="textWrapper">
                    <h3>Output</h3>
                </div>
                <div className="input-group">
                    <input 
                    type="number"
                    step="0.01"
                    value={output}
                    className="inputBox"
                    disabled/> 
                    <div className="small">
                        <form className="full"
                        onChange={e => {
                            setBuyToken(e.target.value)
                            fetchPrice()
                            }}>
                            <select className="full">
                                <option value={buyToken}>{buyToken}</option>
                                {coinList.map((token, id) => (
                                    <option key={id} value={token.symbol}>{token.symbol}</option>
                                ))}
                            </select>
                        </form> 
                    </div>
                    <div className="one-col">
                        {buyToken} &nbsp;
                        <div className="right">Balance: &nbsp; {buyTokenBalance}</div>
                    </div>
                    <div className="details">
                        {`Exchange Rate: 1 ${sellToken} = ${rate} ${buyToken}`}
                    </div>
                </div>
                <button type="submit" className="swap-button">SWAP!</button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default Main
