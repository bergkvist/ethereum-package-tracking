import { Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { DrizzleProps, web3 } from '../web3'

export class Account extends React.Component<DrizzleProps> {
  render() {
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

    const balanceText: string = (balance !== undefined)
      ? `(${web3.utils.fromWei(balance, 'ether')} ETH)`
      : '(Loading balance...)'

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