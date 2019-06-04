import * as UI from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Fragment } from 'react'
import { DrizzleProps } from '../web3'

export class Place extends React.Component<DrizzleProps> {
  state = { dataKey: null, newCountry: '', newLocation: '' }
  componentDidMount() {
    const account = this.props.drizzleState.accounts[0]
    const dataKey = this.props.drizzle.contracts.PackageTracking.methods.getPlace.cacheCall({ from: account })
    this.setState({ dataKey })
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    const country = this.state.newCountry
    const location = this.state.newLocation
    const address = this.props.drizzleState.accounts[0]
    this.props.drizzle.contracts.PackageTracking.methods.setPlace.cacheSend(country, location, { from: address })
  }
  render() {
    console.log(this.state.dataKey)
    // @ts-ignore
    const place = this.props.drizzleState.contracts.PackageTracking.getPlace[this.state.dataKey]
    const country  = 'Current: ' + (place && place.value ? place.value[0] : 'None')
    const location = 'Current: ' + (place && place.value ? place.value[1] : 'None')

    return <Fragment>
    <UI.Form>
      <UI.Form.Field>
        <label>Country</label>
        <input type='text' name='newCountry' placeholder={country} value={this.state.newCountry} onChange={e => this.handleChange(e)} />
      </UI.Form.Field>
      <UI.Form.Field>
        <label>Location</label>
        <input type='text' name='newLocation' placeholder={location} value={this.state.newLocation} onChange={e => this.handleChange(e)} />
      </UI.Form.Field>
      <UI.Button onClick={e => this.handleSubmit(e)}>Submit</UI.Button>
    </UI.Form>
  </Fragment>
  }
}