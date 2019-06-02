import React, { useState } from 'react';
import Web3 from 'web3'
//import './reset.css'
//import './App.css';


// backup...
// const web3 = new Web3('wss://mainnet.infura.io/ws')
import { abi } from './contracts/PackageTracking.json'
const web3Promise = getInjectedWeb3()

async function getInjectedWeb3 () {
  await new Promise(resolve => window.addEventListener('load', resolve))
  if (typeof window.web3 === 'undefined') throw Error('Please install Metamask...')
  if (typeof window.ethereum !== 'undefined') await window.ethereum.enable() // Some wallets requires unlocking
  return new Web3(window.web3.currentProvider)
}

async function x() {
  const web3 = await web3Promise
  const contract = await new web3.eth.Contract(abi, '0x4394E30B1965566E5072F6fBd112c2225aaC4E93')
  const result = await contract.methods.message().call()
  return result
}

const X = () => {
  const [value, setValue] = useState('...')
  x().then(setValue)
  return <div>{value}</div>
}

const App = () => (
  <div className="App">
    <header className="App-header">
      <X />
    </header>
  </div>
)

export default App
