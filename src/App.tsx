import React from 'react';
import { drizzle, DrizzleProps } from './web3'
import * as UI from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Account } from './components/Account'

class PackageTracking extends React.Component<DrizzleProps> {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.PackageTracking;
    const dataKey = contract.methods.message.cacheCall();
    this.setState({ dataKey });
    console.log(dataKey)
  }

  render() {
    const { PackageTracking } = this.props.drizzleState.contracts;
    // @ts-ignore
    const myString = PackageTracking.message[this.state.dataKey];
    return <p>{myString && myString.value}</p>;
  }
}

class App extends React.Component {
  state = { loading: true, drizzleState: ({} as any) }
  
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
    if (this.state.loading) return <UI.Loader active inline='centered'>Loading Drizzle...</UI.Loader>
    //return <D>{JSON.stringify(this.state.drizzleState, null, 2)}</D>
    const panes = [
      // Only enabled if address exists
      { menuItem: 'Track Package', render: () => <UI.Tab.Pane attached={false}><PackageTracking drizzle={drizzle} drizzleState={this.state.drizzleState}/></UI.Tab.Pane> },
      { menuItem: 'Scan Package', render: () => <UI.Tab.Pane attached={false}>Scanning Contents</UI.Tab.Pane> },
      { menuItem: 'Register new Package', render: () => <div>yolo</div> }
    ]
    // Make sure address
    return (
      <div className="App">
        <UI.Header as='h1' textAlign='center'>
          Package Tracking
          <UI.Header.Subheader>
            On Ethereum
          </UI.Header.Subheader>
        </UI.Header>

        <Account drizzle={drizzle} drizzleState={this.state.drizzleState} />

        <UI.Tab menu={{ pointing: true }} panes={panes} />
      </div>
    )
  }
}

export default App
