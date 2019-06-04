import * as UI from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'

export class Scan extends React.Component<{ drizzle: any, drizzleState: any, scanId: number }> {
  state = { dataKey: null }
  componentDidMount() {
    const { PackageTracking } = this.props.drizzle.contracts
    const dataKey = PackageTracking.methods.getScanById.cacheCall(this.props.scanId)
    this.setState({ dataKey })
  }
  render() {
    const { PackageTracking } = this.props.drizzleState.contracts
    // @ts-ignore
    const x = PackageTracking.getScanById[this.state.dataKey]
    
    if (!x) return <UI.Table.Row>
      <UI.Table.Cell>
        <UI.Loader>Loading</UI.Loader>
      </UI.Table.Cell>
    </UI.Table.Row>
    
    const address = x.value[0]
    const timestamp = x.value[2]
    const country = x.value[3]
    const location = x.value[4]
    
    return <UI.Table.Row>
      <UI.Table.Cell>{location}</UI.Table.Cell>
      <UI.Table.Cell>{country}</UI.Table.Cell>
      <UI.Table.Cell>{timestamp}</UI.Table.Cell>
      <UI.Table.Cell>{address}</UI.Table.Cell>
    </UI.Table.Row>
  }
}

export class Package extends React.Component<{ drizzle: any, drizzleState: any, packageId: number }> {
  state = { dataKeyPackage: null, dataKeyScans: null, dataKeyPlace: null }
  componentDidMount() {
    // Might want to "uncache" upon removal
    const { PackageTracking } = this.props.drizzle.contracts
    const dataKeyPackage = PackageTracking.methods.getPackageById.cacheCall(this.props.packageId)
    const dataKeyScans = PackageTracking.methods.getScanIdsByPackageId.cacheCall(this.props.packageId)
    const dataKeyPlace = PackageTracking.methods.getPlace.cacheCall()
    this.setState({ dataKeyPackage, dataKeyScans, dataKeyPlace })
  }
  
  handleScanPackage() {
    const account = this.props.drizzleState.accounts[0]
    const { PackageTracking } = this.props.drizzle.contracts
    PackageTracking.methods.scanPackage.cacheSend(this.props.packageId, { from: account })
  }

  render() {
    const { PackageTracking } = this.props.drizzleState.contracts
    // @ts-ignore
    const pkg = PackageTracking.getPackageById[this.state.dataKeyPackage]
    // @ts-ignore
    const scan = PackageTracking.getScanIdsByPackageId[this.state.dataKeyScans]
    // @ts-ignore
    const place = PackageTracking.getPlace[this.state.dataKeyPlace]
    
    if (!pkg || !scan) return <UI.Loader>Searching for package...</UI.Loader>
    if (!pkg.value) return <UI.Message error>No package with id {this.props.packageId} found</UI.Message>

    const sender = pkg.value[0]
    const destination = pkg.value[1]
    const scans = scan.value.map(id => (<Scan key={id} scanId={id} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />))
    
    return <React.Fragment>
    <UI.List celled>
      <UI.List.Item>
        <UI.List.Header>Id</UI.List.Header>
        {this.props.packageId}
      </UI.List.Item>
      <UI.List.Item>
        <UI.List.Header>Sender</UI.List.Header>
        {sender}
      </UI.List.Item>
      <UI.List.Item>
        <UI.List.Header>Destination</UI.List.Header>
        {destination}
      </UI.List.Item>
    </UI.List>
    <UI.Table celled>
    <UI.Table.Header>
    <UI.Table.Row>
    <UI.Table.HeaderCell>Location</UI.Table.HeaderCell>
    <UI.Table.HeaderCell>Country</UI.Table.HeaderCell>
    <UI.Table.HeaderCell>Timestamp</UI.Table.HeaderCell>
    <UI.Table.HeaderCell>Scanned By</UI.Table.HeaderCell>
    </UI.Table.Row>
    </UI.Table.Header>
    <UI.Table.Body>{scans}</UI.Table.Body>
    </UI.Table>

    {place && place.value
      ? (
        <React.Fragment>
        <UI.Divider horizontal>
          <UI.Header as='h4'>
            <UI.Icon name='barcode' />
            Scan Package
          </UI.Header>
        </UI.Divider>
        <p>{place.value[0]}</p>
        <p>{place.value[1]}</p>
        <UI.Button fluid size='large' onClick={() => this.handleScanPackage()}>Scan</UI.Button>
        </React.Fragment>
      ) : (
        null
      )
    }
    
    </React.Fragment>
  }
}

export class PackagePicker extends React.Component<{ drizzle: any, drizzleState: any }> {
  state = { packageId: '' }
  handleInputChange(event) {
    this.setState({ packageId: event.target.value })
  }
  render() {
    const isValidId = this.state.packageId !== ''
      && !isNaN(Number(this.state.packageId))

    return <React.Fragment>
      <UI.Divider horizontal>
      <UI.Header as='h4'>
        <UI.Icon name='search' />
        Find Package
      </UI.Header>
      </UI.Divider>
      <UI.Input fluid size='large' placeholder='Enter Package Id' onChange={e => this.handleInputChange(e)} value={this.state.packageId} />
      
      <UI.Divider horizontal>
      <UI.Header as='h4'>
        <UI.Icon name='box' />
        Package Details
      </UI.Header>
      </UI.Divider>
      
      {isValidId
        ? <Package key={this.state.packageId} packageId={Number(this.state.packageId)} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}></Package>
        : <UI.Message info>Enter a Package Id to track your package</UI.Message>
      }
      
    </React.Fragment>
  }
}