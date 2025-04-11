import SnagSolutions from '@snagsolutions/sdk'
import * as dotenv from 'dotenv'
dotenv.config()

const snag = new SnagSolutions({
  apiKey: process.env.SNAG_API_KEY!,
})

export { snag, SnagSolutions }
