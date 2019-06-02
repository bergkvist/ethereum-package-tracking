import Web3 from 'web3'
import { abi, networks } from './ethereum/build/contracts/PackageTracking.json'

const NETWORK_ID = 3
const NETWORK_NODE = 'wss://ropsten.infura.io/ws'

// @ts-ignore (window.web3 might be injected)
const web3IsInjected = typeof window.web3 !== 'undefined'
// @ts-ignore (window.ethereum might be injected)
const web3IsLocked = typeof window.ethereum !== 'undefined'

export const web3 = web3IsInjected
    // @ts-ignore (window.web3.currentProvider is injected by Metamask)
    ? new Web3(window.web3.currentProvider)
    : new Web3(NETWORK_NODE)

export const getAccounts = async () => {
    if (!web3IsInjected) return Promise.resolve([])
    if (!web3IsLocked) return web3.eth.getAccounts()
    // @ts-ignore (window.ethereum is injected by Metamask)
    return window.ethereum.enable().catch(err => ([]))
}

export const PackageTracking = new web3.eth.Contract(abi as any[], networks[NETWORK_ID].address)