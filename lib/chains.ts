import { base, Chain, mainnet } from 'viem/chains'

/**
 * SupportedChainId
 *
 * This type is used to define the supported chain IDs in the application.
 * You can extend this type to add more chain IDs as needed.
 */
export type SupportedChainId = 1 | 8453

/**
 * isSupportedChain
 *
 * @param {unknown} chainId - The chain ID to check
 * @returns {chainId is SupportedChainId} - Returns true if the chain ID is supported, false otherwise
 */
export const isSupportedChain = (
  chainId: unknown
): chainId is SupportedChainId => {
  return [1, 8453].includes(Number(chainId))
}

/**
 * ViemChainByChainId
 *
 * This object maps supported chain IDs to their respective Chain objects.
 * You can extend this object to add more chains as needed.
 */
export const ViemChainByChainId: { [key in SupportedChainId]: Chain } = {
  1: mainnet,
  8453: base,
}

/**
 * Get all supported chains
 *
 * @returns {readonly [Chain, ...Chain[]]} - An array of supported chains
 *
 * This function returns an array of all supported chains in the application.
 * You can extend this function to add more chains as needed.
 */
export const getAllSupportedChains = () => {
  return [mainnet, base] as readonly [Chain, ...Chain[]]
}

type NetworkKey =
  | 'abstract'
  | 'abstractTestnet'
  | 'apechain'
  | 'arbitrum'
  | 'arbitrumGoerli'
  | 'arbitrumSepolia'
  | 'avalanche'
  | 'avalancheFuji'
  | 'base'
  | 'baseSepolia'
  | 'basecamp'
  | 'berachain'
  | 'berachainArtio'
  | 'berachainBepolia'
  | 'binance'
  | 'bscTestnet'
  | 'campTestnet'
  | 'coti'
  | 'cotiTestnet'
  | 'fantom'
  | 'fantomTestnet'
  | 'flowMainnet'
  | 'flow_cadence'
  | 'goerli'
  | 'mainnet'
  | 'morph'
  | 'morphHolesky'
  | 'morphTestnet'
  | 'nexusTestnet'
  | 'nitrograph'
  | 'optimism'
  | 'optimism_goerli'
  | 'optimism_sepolia'
  | 'polkadot'
  | 'polygon'
  | 'polygon_mumbai'
  | 'sepolia'
  | 'skaleCalypso'
  | 'skaleEuropa'
  | 'skaleNebula'
  | 'solana'
  | 'somnia'
  | 'sophon'
  | 'sophonTestnet'
  | 'sui'
  | 'superseed'
  | 'superseedSepolia'
  | 'ultra'
  | 'ultraTestnet'
  | 'vanar'
  | 'xai'
  | 'zkverify'
  | 'zksync'
  | 'kusama'

const networkChainIdMap: Partial<Record<NetworkKey, number>> = {
  abstract: 2741,
  abstractTestnet: 11124,
  apechain: 33139,
  arbitrum: 42161,
  arbitrumGoerli: 421613,
  arbitrumSepolia: 421614,
  mainnet: 1,
  sepolia: 11155111,
  goerli: 5,
  base: 8453,
  baseSepolia: 84532,
  basecamp: 8453,
  binance: 56,
  bscTestnet: 97,
  campTestnet: 7701,
  optimism: 10,
  optimism_sepolia: 11155420,
  optimism_goerli: 420,
  polygon: 137,
  polygon_mumbai: 80001,
  avalanche: 43114,
  avalancheFuji: 43113,
  fantom: 250,
  fantomTestnet: 4002,
  morph: 2818,
  morphHolesky: 2810,
  morphTestnet: 2810,
  superseed: 5330,
  superseedSepolia: 5331,
  xai: 660279,
  zksync: 324,
}

export const getChainIdFromNetwork = (network?: string | null) => {
  if (!network) return undefined
  return networkChainIdMap[network as NetworkKey]
}