import Web3 from 'web3'
import PackageTracking from './ethereum/build/contracts/PackageTracking.json'
// @ts-ignore (drizzle does sadly not have typescript bindings)
import { Drizzle, generateStore } from 'drizzle'

//const NETWORK_ID = 3
const NETWORK_NODE = 'wss://ropsten.infura.io/ws'
//const NETWORK_NODE = 'https://ropsten.infura.io'


// @ts-ignore (window.web3 might be injected)
const web3IsInjected = typeof window.web3 !== 'undefined'

export const web3 = web3IsInjected
  // @ts-ignore (window.web3.currentProvider is injected by Metamask)
  ? new Web3(window.web3.currentProvider)
  //: new Web3.providers.HttpProvider('https://ropsten.infura.io')
  : new Web3(NETWORK_NODE)

//web3.eth.net.getId().then(console.log)
//console.log(customProvider)
console.log(web3.version)
const drizzleOptions = {
  contracts: [ PackageTracking ],
  polls: { accounts: 3000, blocks: 3000 },
  syncAlways: false,
  web3: { 
    customProvider: web3.currentProvider,
    fallback: {
      type: 'ws',
      url: NETWORK_NODE
    }
  }
}

export const drizzle = new Drizzle(drizzleOptions, generateStore(drizzleOptions))

// Enable a React component to interract with Drizzle.
// React.Component<DrizzleProps>
export interface DrizzleProps {
  drizzle: any
  drizzleState: any 
}
