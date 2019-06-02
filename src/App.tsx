import React, { useState } from 'react';
import { PackageTracking, getAccounts } from './web3'

const X = () => {
  const [value, setValue] = useState('...')
  PackageTracking.methods.message().call().then(setValue)
  return <div>{value}</div>
}

const Y = () => {
  const [v, s] = useState('...')
  getAccounts().then(JSON.stringify).then(s)
  return <div>{v}</div>
}

const App = () => (
  <div className="App">
    <header className="App-header">
      <X />
      <Y />
    </header>
  </div>
)

export default App
