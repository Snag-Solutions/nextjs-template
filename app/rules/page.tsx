import { Rules } from '@/components/pages'
import { snag } from '@/lib/snag'

export const getRules = async () => {
  return snag.loyalty.rules.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    limit: 10,
  })
}

export default async function RulesPage() {
  const data = await getRules()

  return <Rules rules={data?.data} />
}
