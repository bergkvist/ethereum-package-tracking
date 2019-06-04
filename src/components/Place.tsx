import * as UI from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Fragment } from 'react'
import { DrizzleProps } from '../web3'

export class Place extends React.Component<DrizzleProps> {
  state = { dataKey: null, newCountry: '', newLocation: '' }
  componentDidMount() {
    const dataKey = this.props.drizzle.contracts.PackageTracking.methods.getPlace.cacheCall()
    this.setState({ dataKey })
  }
  handleChange(event) {

  }
  handleSubmit(event) {
    event.preventDefault()
    const country = this.state.newCountry
    const location = this.state.newLocation
    const address = this.props.drizzleState.addresses[0]
    this.props.drizzle.contracts.PackageTracking.methods.setPlace(country, location, { from: address })
  }
  render() {
    // @ts-ignore
    const place = this.props.drizzleState.contracts.PackageTracking.getPlace[this.state.dataKey]
    
    const country  = 'Current: ' + (place ? place.value[0] : 'None')
    const location = 'Current: ' + (place ? place.value[1] : 'None')

    return <Fragment>
    <UI.Form>
      <UI.Form.Field>
        <label>Country</label>
        <input type='text' placeholder={country} value={this.state.newCountry} onChange={e => this.handleChange(e)} />
      </UI.Form.Field>
      <UI.Form.Field>
        <label>Location</label>
        <input type='text' placeholder={location} value={this.state.newLocation} onChange={e => this.handleChange(e)} />
      </UI.Form.Field>
      <UI.Button onClick={e => this.handleSubmit(e)}>Submit</UI.Button>
    </UI.Form>
  </Fragment>
  }
}