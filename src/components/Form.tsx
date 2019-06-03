import * as UI from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { DrizzleProps } from '../web3'

export class Form extends React.Component<DrizzleProps> {
  state = { value: '' }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const account = this.props.drizzleState.accounts[0]
    const { PackageTracking } = this.props.drizzle.contracts
    const stackId = PackageTracking.methods.setMessage.cacheSend(this.state.value, { from: account })
    console.log(stackId)
  }

  render() {
    return <UI.Form>
      <UI.Form.Field>
        <label>Text</label>
        <input type='text' value={this.state.value} onChange={e => this.handleChange(e)} />
      </UI.Form.Field>
      <UI.Button onClick={e => this.handleSubmit(e)}>Submit</UI.Button>
    </UI.Form>
  }
}