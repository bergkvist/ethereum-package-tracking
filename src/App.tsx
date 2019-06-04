import React from 'react';
import { drizzle } from './web3'
import * as UI from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Account } from './components/Account'
import { Place } from './components/Place'
import { TransactionList } from './components/Transaction'
import { PackagePicker } from './components/TrackPackage'
import { CreatePackage } from './components/CreatePackage'

class App extends React.Component {
  state = { loading: true, drizzleState: drizzle.store.getState() }
  
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
    const panes = [
      // Only enabled if address exists
      { menuItem: 'Track Package', render: () => <UI.Tab.Pane attached={false}><PackagePicker drizzle={drizzle} drizzleState={this.state.drizzleState}/></UI.Tab.Pane> },
      // Should only exist if address is defined (user is signed in)
      { menuItem: 'My Place', render: () => <UI.Tab.Pane attached={false}><Place drizzle={drizzle} drizzleState={this.state.drizzleState} /></UI.Tab.Pane> },
      { menuItem: 'Create Package', render: () => <UI.Tab.Pane attached={false}><CreatePackage drizzle={drizzle} drizzleState={this.state.drizzleState} /></UI.Tab.Pane> }
    ]
    // Make sure address
    return (
      <div className="App">
        <UI.Header as='h1' textAlign='center'>
          Package Tracking
          <UI.Header.Subheader>
            On Ethereum (Ropsten Testnet)
          </UI.Header.Subheader>
        </UI.Header>

        <Account drizzleState={this.state.drizzleState} loading={this.state.loading} />

        {!this.state.loading
          ? <UI.Tab menu={{ pointing: true }} panes={panes} />
          : null
        }

        {!this.state.loading
          ? <TransactionList drizzleState={this.state.drizzleState} />
          : null
        }
        </div>
    )
  }
}

export default App
