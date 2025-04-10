import { snag } from '@/lib/snag'

const removeRules = async () => {
  let totalRules = 0
  let removedRules = 0
  const scriptName = '[remove-rules]'
  console.time(scriptName)

  try {
    await snag.loyalty.rules
      .list({
        organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
        limit: 100,
      })
      .then(async ({ data: rules }) => {
        totalRules = rules.length
        console.log(scriptName, `⚪️ Found ${totalRules} rules to delete`)
        for (const rule of rules) {
          await snag.loyalty.rules.delete(rule.id).then(() => {
            console.log(scriptName, `Deleted rule ${rule.id}`)
            removedRules++
          })
        }
      })

    console.log(
      scriptName,
      `🟢 Deleted ${removedRules} out of ${totalRules} rules`
    )
  } catch (e) {
    console.error(e)
    console.log(scriptName, '🔴 Failed to remove rules')
  }

  console.timeEnd(scriptName)
}

removeRules()
