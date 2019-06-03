import { Icon, Table, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'

const RawJSON = styled.div`
  white-space: pre
`

export class Transaction extends React.Component<{ txid: string, drizzleState: any }> {
  render() {
    const transaction = this.props.drizzleState.transactions[this.props.txid]

    if (transaction === undefined) return <Table.Row warning>
      <Table.Cell>
      <Header as='h4'>
        <Icon name='circle notched' loading />
        <Header.Content>
          Transaction: waiting for signature
          <Header.Subheader>
          Please sign the transaction with Metamask
          </Header.Subheader>
        </Header.Content>
      </Header>
      </Table.Cell>
    </Table.Row>

    if (transaction.status === 'error') return <Table.Row negative>
      <Table.Cell>
      <Header as='h4'>
        <Icon name='x' />
        <Header.Content>
        Transaction: failed
          <Header.Subheader>
          {transaction.error.message}
          </Header.Subheader>
        </Header.Content>
      </Header>
      </Table.Cell>
    </Table.Row>

    if (transaction.status === 'pending') return <Table.Row>
      <Table.Cell>
      <Header as='h4'>
      <Icon name='circle notched' loading />
        <Header.Content>
        Transaction: waiting to be mined
          <Header.Subheader>
          Please hold on
          </Header.Subheader>
        </Header.Content>
      </Header>
      </Table.Cell>
    </Table.Row>
    

    if (transaction.status === 'success') return <Table.Row positive>
      <Table.Cell>
      <Header as='h4'>
        <Icon name='checkmark' />
        <Header.Content>
          Transaction: successful
          <Header.Subheader>
            {this.props.txid}
          </Header.Subheader>
        </Header.Content>
      </Header>
      </Table.Cell>
    </Table.Row>
  
    return <Table.Row>
      <Table.Cell>
        <RawJSON>{JSON.stringify(transaction, null, 2)}</RawJSON>
      </Table.Cell>
    </Table.Row>
  }
}



export class TransactionList extends React.Component<{ drizzleState: any }> {
  render() {
    const transactions = R.reverse(this.props.drizzleState.transactionStack as string[])
      .map(txid => {
        return <Transaction 
          key={txid}
          txid={txid}
          drizzleState={this.props.drizzleState}
        />
      })
    
    return <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Transactions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {transactions}
      </Table.Body>
    </Table>
  }
}