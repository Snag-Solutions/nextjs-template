'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Spend in Shopify Store" (shopify_spend) rule type.
 */
export function ShopifySpendFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const shopifyStoreUrl = (metadata.shopifyStoreUrl as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Spend in Shopify Store</h3>
      <p className="text-sm text-gray-600">
        Reward users based on how much they spend in your Shopify store.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Store domain *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={shopifyStoreUrl}
          onChange={(e) => updateMetadata({ shopifyStoreUrl: e.target.value })}
          placeholder="e.g. https://your-store.myshopify.com"
        />
      </label>
      <p className="text-xs text-gray-500">
        URL must end with .myshopify.com. Connect with Client ID and Access token in the full rule editor.
      </p>
    </div>
  )
}
