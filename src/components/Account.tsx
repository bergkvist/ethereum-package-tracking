import { Message, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { web3 } from '../web3'

export class Account extends React.Component<{ loading: boolean, drizzleState: any }> {
  render() {
    if (this.props.loading) return (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>
            Loading Account...
          </Message.Header>
          Please hold on
        </Message.Content>
      </Message>
    )

    const account = this.props.drizzleState.accounts[0]
    if (!account) return (
      <Message warning>
        <Message.Header>
          You are not signed in.
        </Message.Header>
        Install Metamask for full functionality
      </Message>
    )

    const balance = this.props.drizzleState.accountBalances[account]
    if (balance === undefined) return (
      <Message success icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>
            You are signed in!
          </Message.Header>
          <div>{account}</div>
          <div>Loading balance...</div>
        </Message.Content>
      </Message>
    )

    const balanceText = `(${web3.utils.fromWei(balance, 'ether')} ETH)`
    return (
      <Message success>
        <Message.Header>
          You are signed in!
        </Message.Header>
        <div>{account}</div>
        <div>{balanceText}</div>
      </Message>
    )
  }
}