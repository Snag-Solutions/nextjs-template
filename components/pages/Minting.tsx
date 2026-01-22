'use client'

import { useWalletAccount } from '@/components/providers/WalletAccountProvider'
import { useWebsiteContext } from '@/components/providers/WebsiteProvider'
import { Button } from '@/components/ui/Button'
import { Code } from '@/components/ui/Code'
import { Header } from '@/components/ui/Header'
import { getMintingContracts } from '@/lib/actions/getMintingContracts'
import { getMintingContractAssets } from '@/lib/actions/getMintingContractAssets'
import { mintMintingContractAsset } from '@/lib/actions/mintMintingContractAsset'
import { updateMintingStatus } from '@/lib/actions/updateMintingStatus'
import {
  erc1155MintWithSignatureAbi,
  erc721MintWithSignatureAbi,
  NATIVE_TOKEN_ADDRESS,
} from '@/lib/minting/abis'
import { getChainIdFromNetwork } from '@/lib/chains'
import {
  getReadyWalletClient,
  sleep,
  toBigInt,
  waitForMintSignature,
} from '@/lib/minting/utils'
import { useAuthAccount } from '@/lib/useAuthAccount'
import { ContractListResponse } from '@snagsolutions/sdk/resources/minting/contracts.mjs'
import { MintingGetAssetsResponse } from '@snagsolutions/sdk/resources/minting/minting.mjs'
import { useEffect, useState } from 'react'
import { useAccount, useConfig, useConnect, usePublicClient } from 'wagmi'

export const Minting = () => {
  const { website, isLoading: isWebsiteLoading } = useWebsiteContext()
  const { walletAddress, connect } = useAuthAccount()
  const walletAccount = useWalletAccount()
  const { isConnected } = useAccount()
  const wagmiConfig = useConfig()
  const { connectAsync, connectors } = useConnect()
  const publicClient = usePublicClient()
  const [contracts, setContracts] = useState<ContractListResponse['data']>([])
  const [isLoading, setIsLoading] = useState(true)
  const [assetsByContract, setAssetsByContract] = useState<
    Record<string, MintingGetAssetsResponse['data']>
  >({})
  const [assetsLoadingByContract, setAssetsLoadingByContract] = useState<
    Record<string, boolean>
  >({})
  const [mintingByAsset, setMintingByAsset] = useState<Record<string, boolean>>(
    {}
  )


  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true)
      const data = await getMintingContracts()
      setContracts(data)
      setIsLoading(false)
    }

    fetchContracts()
  }, [])

  const handleToggle = async (contractId: string, isOpen: boolean) => {
    if (!isOpen) return
    if (assetsByContract[contractId] || assetsLoadingByContract[contractId]) {
      return
    }
    if (!website?.id) return

    setAssetsLoadingByContract((prev) => ({ ...prev, [contractId]: true }))
    try {
      const assets = await getMintingContractAssets({
        contractId,
        websiteId: website.id,
      })
      setAssetsByContract((prev) => ({ ...prev, [contractId]: assets }))
    } finally {
      setAssetsLoadingByContract((prev) => ({ ...prev, [contractId]: false }))
    }
  }

  const handleMint = async (
    contract: ContractListResponse.Data,
    assetId: string
  ) => {
    if (!walletAddress) {
      await connect()
      return
    }

    setMintingByAsset((prev) => ({ ...prev, [assetId]: true }))
    try {
      const chainId = getChainIdFromNetwork(contract.network)
      if (!chainId) {
        throw new Error('Unsupported network for minting.')
      }

      if (walletAccount.chainId && walletAccount.chainId !== chainId) {
        await walletAccount.switchNetwork({ networkChainId: chainId })
        await sleep(500)
      }

      if (!isConnected) {
        const firstConnector = connectors?.[0]
        if (firstConnector) {
          await connectAsync({ connector: firstConnector })
        }
      }

      const walletClient = await getReadyWalletClient(wagmiConfig, chainId)
      if (!walletClient) {
        throw new Error('Wallet client not ready.')
      }
      if (!publicClient) {
        throw new Error('Public client not ready.')
      }

      const response = await mintMintingContractAsset({
        assetId,
        contractId: contract.id,
        walletAddress,
      })

      const statusId = response.mintingContractAssetMintStatusId
      const signaturePayload = await waitForMintSignature(statusId)
      const payload = signaturePayload.payload || {}

      const currency =
        (payload.currency as string | undefined) ||
        (payload.currencyAddress as string | undefined)
      const missingFields = [
        ['to', payload.to],
        ['royaltyRecipient', payload.royaltyRecipient],
        ['primarySaleRecipient', payload.primarySaleRecipient],
        ['uri', payload.uri],
        ['currency', currency],
        ['uid', payload.uid],
      ]
        .filter(([, value]) => !value)
        .map(([key]) => key)
      if (missingFields.length > 0) {
        throw new Error(
          `Mint signature missing fields: ${missingFields.join(', ')}`
        )
      }
      const isNative =
        currency?.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()

      const erc1155Quantity = toBigInt(payload.quantity) ?? BigInt(1)
      const erc721Price = toBigInt(payload.price) ?? BigInt(0)
      const erc1155PricePerToken = toBigInt(payload.pricePerToken) ?? BigInt(0)
      const valueToSend =
        contract.tokenType === 'erc1155'
          ? isNative
            ? erc1155PricePerToken * erc1155Quantity
            : BigInt(0)
          : isNative
            ? erc721Price
            : BigInt(0)

      const mintRequest721 = {
        to: payload.to,
        royaltyRecipient: payload.royaltyRecipient,
        royaltyBps: toBigInt(payload.royaltyBps) ?? BigInt(0),
        primarySaleRecipient: payload.primarySaleRecipient,
        uri: payload.uri,
        price: erc721Price,
        currency: currency,
        validityStartTimestamp:
          toBigInt(payload.validityStartTimestamp) ?? BigInt(0),
        validityEndTimestamp: toBigInt(payload.validityEndTimestamp) ?? BigInt(0),
        uid: payload.uid,
      }

      const mintRequest1155 = {
        to: payload.to,
        royaltyRecipient: payload.royaltyRecipient,
        royaltyBps: toBigInt(payload.royaltyBps) ?? BigInt(0),
        primarySaleRecipient: payload.primarySaleRecipient,
        tokenId: toBigInt(payload.tokenId) ?? BigInt(0),
        uri: payload.uri,
        quantity: erc1155Quantity,
        pricePerToken: erc1155PricePerToken,
        currency: currency,
        validityStartTimestamp:
          toBigInt(payload.validityStartTimestamp) ?? BigInt(0),
        validityEndTimestamp: toBigInt(payload.validityEndTimestamp) ?? BigInt(0),
        uid: payload.uid,
      }

      const abiToUse =
        contract.tokenType === 'erc1155'
          ? erc1155MintWithSignatureAbi
          : erc721MintWithSignatureAbi

      const args =
        contract.tokenType === 'erc1155'
          ? [mintRequest1155, signaturePayload.signature]
          : [mintRequest721, signaturePayload.signature]

      const txHash = await walletClient.writeContract({
        address: contract.address as `0x${string}`,
        abi: abiToUse,
        functionName: 'mintWithSignature',
        args: args as any,
        value: valueToSend,
        chain: walletClient.chain,
      })

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })

      if (receipt.status === 'reverted') {
        await updateMintingStatus(statusId, {
          status: 'failed',
          txHash,
        })
        throw new Error('Minting transaction reverted.')
      }

      await updateMintingStatus(statusId, {
        status: 'minted',
        txHash,
      })

      alert('Mint successful.')
    } catch (error: any) {
      alert(
        error?.message
          ? `${error?.title ? `${error.title} - ` : ''}${error.message}`
          : 'Failed to start mint.'
      )
    } finally {
      setMintingByAsset((prev) => ({ ...prev, [assetId]: false }))
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full items-start justify-start">
      <Header as="h1">Minting</Header>
      <Code data={contracts} />
      <Header as="h4">Minting Contracts</Header>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : contracts.length === 0 ? (
        <Header as="p">No minting contracts found.</Header>
      ) : (
        <div className="flex flex-col gap-4 w-full items-start justify-start">
          {contracts.map((contract) => {
            const assets = assetsByContract[contract.id] || []
            const isAssetsLoading = assetsLoadingByContract[contract.id]
            return (
              <details
                key={contract.id}
                className="w-full rounded-xl border border-accent"
                onToggle={(event) =>
                  handleToggle(
                    contract.id,
                    (event.currentTarget as HTMLDetailsElement).open
                  )
                }
              >
                <summary className="flex w-full items-center justify-between gap-4 cursor-pointer list-none rounded-xl bg-accent p-4">
                  <div className="flex flex-col gap-1">
                    <Header as="h5">{contract.name}</Header>
                    <Header as="p" className="text-sm text-gray-500">
                      {contract.network} • {contract.address}
                    </Header>
                  </div>
                  <div className="flex flex-col items-end">
                    <Header as="p">
                      {contract._count.mintingContractAssets} assets
                    </Header>
                    <Header as="p" className="text-sm text-gray-500">
                      {contract.tokenType === 'erc721' || contract.tokenType === 'erc721c'
                        ? '721'
                        : contract.tokenType === 'erc1155'
                          ? '1155'
                          : contract.tokenType}{' '}
                      • {contract.network} •{' '}
                      {contract.isListed ? 'Listed' : 'Unlisted'}
                    </Header>
                  </div>
                </summary>
                <div className="flex flex-col gap-4 p-4 pt-0">
                  {isWebsiteLoading ? (
                    <Header as="p">Loading website context...</Header>
                  ) : !website?.id ? (
                    <Header as="p">
                      Website ID is required to load minting assets.
                    </Header>
                  ) : isAssetsLoading ? (
                    <div className="flex items-center justify-center w-full">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : assets.length === 0 ? (
                    <Header as="p">No listed assets found.</Header>
                  ) : (
                    <div className="flex flex-col gap-3 w-full items-start justify-start">
                      <Header as="h5">Listed Assets</Header>
                      <div className="flex flex-col gap-3 w-full items-start justify-start">
                        {assets.map((asset: any) => (
                          <div
                            key={asset?.id}
                            className="flex flex-col gap-2 w-full rounded-xl bg-accent p-3"
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between w-full">
                              <div className="flex flex-col gap-1">
                                <Header as="p">
                                  {asset?.name || 'Untitled'}
                                </Header>
                                <Header as="p" className="text-sm text-gray-500">
                                  {asset?.id}
                                </Header>
                                <Header as="p" className="text-sm text-gray-500">
                                  {Number(asset?.quantityMinted || 0)}/
                                  {Number(asset?.quantity || 0)} minted
                                </Header>
                                <Header as="p" className="text-sm text-gray-500">
                                  {(() => {
                                    const rawPrice = asset?.price
                                    const currencyLabel =
                                      asset?.loyaltyCurrency?.symbol ||
                                      asset?.loyaltyCurrency?.name ||
                                      (asset?.currencyAddress
                                        ? 'Token'
                                        : 'ETH')
                                    if (!rawPrice || Number(rawPrice) === 0) {
                                      return currencyLabel
                                        ? `Free (${currencyLabel})`
                                        : 'Free'
                                    }
                                    const decimals =
                                      typeof asset?.currencyDecimals ===
                                        'number'
                                        ? asset.currencyDecimals
                                        : 0
                                    const priceNumber =
                                      Number(rawPrice) / 10 ** decimals
                                    return `Price: ${priceNumber} ${currencyLabel}`
                                  })()}
                                </Header>
                              </div>
                              <Button
                                variant="secondary"
                                disabled={mintingByAsset[asset?.id]}
                                onClick={() =>
                                  handleMint(contract, asset?.id)
                                }
                              >
                                {!walletAddress
                                  ? 'Connect Wallet'
                                  : mintingByAsset[asset?.id]
                                    ? 'Minting...'
                                    : 'Mint'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      )}
    </div>
  )
}
