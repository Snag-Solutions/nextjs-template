export const NATIVE_TOKEN_ADDRESS =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

export const erc721MintWithSignatureAbi = [
  {
    type: 'function',
    name: 'mintWithSignature',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'req',
        type: 'tuple',
        components: [
          { name: 'to', type: 'address' },
          { name: 'royaltyRecipient', type: 'address' },
          { name: 'royaltyBps', type: 'uint256' },
          { name: 'primarySaleRecipient', type: 'address' },
          { name: 'uri', type: 'string' },
          { name: 'price', type: 'uint256' },
          { name: 'currency', type: 'address' },
          { name: 'validityStartTimestamp', type: 'uint128' },
          { name: 'validityEndTimestamp', type: 'uint128' },
          { name: 'uid', type: 'bytes32' },
        ],
      },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [{ name: 'signer', type: 'address' }],
  },
] as const

export const erc1155MintWithSignatureAbi = [
  {
    type: 'function',
    name: 'mintWithSignature',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'req',
        type: 'tuple',
        components: [
          { name: 'to', type: 'address' },
          { name: 'royaltyRecipient', type: 'address' },
          { name: 'royaltyBps', type: 'uint256' },
          { name: 'primarySaleRecipient', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
          { name: 'uri', type: 'string' },
          { name: 'quantity', type: 'uint256' },
          { name: 'pricePerToken', type: 'uint256' },
          { name: 'currency', type: 'address' },
          { name: 'validityStartTimestamp', type: 'uint128' },
          { name: 'validityEndTimestamp', type: 'uint128' },
          { name: 'uid', type: 'bytes32' },
        ],
      },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [{ name: 'signer', type: 'address' }],
  },
] as const