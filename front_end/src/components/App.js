import React, {useEffect, useState} from 'react';
import Web3 from "web3";
import Navbar from "./Navbar";
import Main from "./Main";
import './App.css';

function App() {
  // const [loading, setLoading] = useState(false)
  // const [account, setAccount] = useState("")
  // const [tokenFrom, setTokenFrom] = useState("ETH")
  // const [tokenTo, setTokenTo] = useState("TDex")
  // const [tokenFromBalance, setTokenFromBalance] = useState("")
  // const [tokenToBalance, setTokenToBalance] = useState("")

  async function loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert("Non Ethereum browser detected. Please connect with MetaMask!")
    }
  }
  async function login(e) {
    e.preventDefault()
    await loadWeb3()
  }

  return (
    <div>
      <Navbar/>
      <Main /> 
    </div>
  );
}

export default App;
