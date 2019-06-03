import React, { useState, useEffect } from 'react';
import { drizzle, getAccounts, web3 } from './web3'
import { Dropdown } from 'semantic-ui-react'
import * as R from 'ramda'
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components'

const D = styled.div`
  white-space: pre-wrap;
`

const AccountPicker = () => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    ;(async () => {
      const accounts = await getAccounts()
      const balances = await Promise.all(accounts.map((a: string) => web3.eth.getBalance(a).then(b => web3.utils.fromWei(b, 'ether'))))
      setAccounts(
        //@ts-ignore
        R.zip(accounts, balances).map(([account, balance]) => ({
          key: account,
          text: account,
          value: account,
          description: `${balance} ETH`
        }))
      )
    })()
  }, [])

  //getAccounts()
  //  .then(as => as.map((a: string) => ({ key: a, text: a, value: a }))).then(setAccounts)
  return <Dropdown 
    placeholder='Select account'
    selection
    fluid
    options={accounts}
  />
}

interface DrizzleProps {
  drizzle: any
  drizzleState: any
}
class PackageTracking extends React.Component<DrizzleProps> {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.PackageTracking;
    const dataKey = contract.methods.message.cacheCall();
    this.setState({ dataKey });
  }

  render() {
    const { PackageTracking } = this.props.drizzleState.contracts;
    // @ts-ignore
    const myString = PackageTracking.message[this.state.dataKey];
    return <p>{myString && myString.value}</p>;
  }
}

class App extends React.Component {
  state = { loading: true, drizzleState: null }
  
  componentDidMount() {
    drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState()
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState })
      } else {
        this.setState({ drizzleState })
      }
    })
  }

  render() {
    if (this.state.loading) return <D>{JSON.stringify(this.state.drizzleState, null, 2)}</D>
    return (
      <div className="App">
        <header className="App-header">
          <AccountPicker />
          <PackageTracking 
            drizzle={drizzle} 
            drizzleState={this.state.drizzleState} />
        </header>
      </div>
    )
  }
}

export default App
