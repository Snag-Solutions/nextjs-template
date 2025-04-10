import { snag } from '@/lib/snag'
import { rulesExample } from '@/scripts/utils/rules-example'

const createRules = async () => {
  let createdRules = 0
  const scriptName = '[create-rules]'
  console.time(scriptName)

  try {
    console.log(scriptName, `⚪️ Found ${rulesExample.length} rules to create`)

    // Create rule group
    const ruleGroup = await snag.loyalty.ruleGroups.createRuleGroup({
      name: 'Example Quests',
      organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
      websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    })
    const ruleGroupId = ruleGroup.id
    console.log(scriptName, `🟢 Created rule group "${ruleGroup.name}"`)

    for (let index = 0; index < rulesExample.length; index++) {
      const rule = rulesExample[index]
      console.log(
        scriptName,
        `Creating "${rule.name}" | ${index + 1} of ${rulesExample.length}`
      )
      await snag.loyalty.rules
        .create({
          ...rule,
          loyaltyRuleGroupId: ruleGroupId,
        })
        .then(() => {
          createdRules++
        })
    }

    console.log(
      scriptName,
      `🟢 Created ${createdRules} out of ${rulesExample.length}`
    )
  } catch (e) {
    console.error(e)
    console.log(scriptName, '🔴 Failed to create rules')
  }

  console.timeEnd(scriptName)
}

createRules()
