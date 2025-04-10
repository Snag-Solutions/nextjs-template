import { RuleCreateParams } from '@snagsolutions/sdk/resources/loyalty/rules.mjs'
import dayjs from 'dayjs'

const getEnvCollections = () => {
  const envCollections = process.env.RULES_COLLECTIONS
  if (!envCollections) {
    return []
  }
  try {
    return JSON.parse(envCollections) as {
      address: string
      network: string
    }[]
  } catch (error) {
    console.error('Error parsing RULES_COLLECTIONS:', error)
    return []
  }
}
const collections = getEnvCollections()

export const rulesExample = [
  {
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    loyaltyCurrencyId: process.env.LOYALTY_CURRENCY_ID!,
    name: 'Daily Check-in',
    description: 'Check in daily to earn rewards',
    type: 'check_in',
    amount: '100',
    rewardType: 'points',
    interval: 'daily',
    frequency: 'immediately',
    collectionAddress: '',
    network: 'mainnet',
    startTime: dayjs().startOf('minute').toISOString(),
    endTime: null,
    effectiveEndTime: null,
    effectiveStartTime: null,
    metadata: {},
    hideInUi: false,
  },
  ...(process.env.ENABLE_TWITTER_RULES === 'true'
    ? [
        {
          websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
          organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
          loyaltyCurrencyId: process.env.LOYALTY_CURRENCY_ID!,
          name: 'Connect Twitter',
          description: 'Connect Twitter to get reward',
          type: 'connected_twitter',
          amount: '100',
          rewardType: 'points',
          interval: 'once',
          frequency: 'daily',
          collectionAddress: '',
          network: 'mainnet',
          startTime: dayjs().startOf('minute').toISOString(),
          endTime: null,
          effectiveEndTime: null,
          effectiveStartTime: null,
          metadata: {},
          hideInUi: false,
        },
      ]
    : []),
  ...(process.env.ENABLE_TELEGRAM_RULES === 'true'
    ? [
        {
          websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
          organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
          loyaltyCurrencyId: process.env.LOYALTY_CURRENCY_ID!,
          name: 'Connect Telegram',
          description: 'Connect Telegram to get reward',
          type: 'connected_telegram',
          amount: '100',
          rewardType: 'points',
          interval: 'once',
          frequency: 'daily',
          collectionAddress: '',
          network: 'mainnet',
          startTime: dayjs().startOf('minute').toISOString(),
          endTime: null,
          effectiveEndTime: null,
          effectiveStartTime: null,
          metadata: {},
          hideInUi: false,
        },
      ]
    : []),
  ...(collections.length > 0
    ? collections
        .map((c) => [
          {
            websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
            organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
            loyaltyCurrencyId: process.env.LOYALTY_CURRENCY_ID!,
            name: `Hold Collection ${c.address}`,
            description: 'Hold collection to earn rewards',
            type: 'TokenHold',
            amount: '100',
            rewardType: 'points',
            interval: 'daily',
            frequency: 'daily',
            collectionAddress: c.address,
            network: c.network,
            startTime: dayjs().startOf('minute').toISOString(),
            endTime: null,
            effectiveEndTime: null,
            effectiveStartTime: null,
            metadata: {},
            hideInUi: false,
          },
          {
            websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
            organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
            loyaltyCurrencyId: process.env.LOYALTY_CURRENCY_ID!,
            name: `Collection ${c.address} Multiplier`,
            description: `Multiply rewards by holding ${c.address}`,
            type: 'TokenHold',
            amount: '0',
            rewardType: 'multiplier',
            interval: 'daily',
            frequency: 'daily',
            collectionAddress: c.address,
            network: c.network,
            startTime: dayjs().startOf('minute').toISOString(),
            endTime: null,
            effectiveEndTime: null,
            effectiveStartTime: null,
            metadata: {
              range: [
                {
                  startRange: 1,
                  endRange: 9007199254740991,
                  amount: 3,
                },
              ],
            },
            hideInUi: false,
          },
        ])
        .flat()
    : []),
] as RuleCreateParams[]
