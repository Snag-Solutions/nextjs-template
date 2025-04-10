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
