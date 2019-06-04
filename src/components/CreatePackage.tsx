import * as UI from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Fragment } from 'react'
import { DrizzleProps } from '../web3'

export class CreatePackage extends React.Component<DrizzleProps> {
  state = { packageDestination: '' }

  handleChange(event) {
    this.setState({ packageDestination: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const account = this.props.drizzleState.accounts[0]
    this.props.drizzle.contracts.PackageTracking.methods.createPackage.cacheSend(this.state.packageDestination, { from: account })
    this.setState({ packageDestination: '' })
  }

  // TODO: Large input
  render() {
    return <Fragment>
      <UI.Form>
        <UI.Form.Field>
          <label>Package Destination</label>
          <input type='text' value={this.state.packageDestination} onChange={e => this.handleChange(e)} />
        </UI.Form.Field>
        <UI.Button onClick={e => this.handleSubmit(e)}>Submit</UI.Button>
      </UI.Form>
    </Fragment>
  }
}