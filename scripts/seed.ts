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
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Italian',
        imageSrc: '/it.svg'
      },
      {
        id: 2,
        title: 'French',
        imageSrc: '/fr.svg'
      },
      {
        id: 3,
        title: 'Spanish',
        imageSrc: '/sp.svg'
      }
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        coursesId: 3,
        title: 'Unit 1',
        description: 'Unit 1 description',
        order: 1
      }
    ])

    console.log('Seeding finished')
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}

main()
