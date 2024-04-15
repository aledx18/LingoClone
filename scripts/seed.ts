import 'dotenv/config'

import * as schema from '../db/schema'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding...')
    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    console.log('Seeding finished')
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}

main()
