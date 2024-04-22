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
      }
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        coursesId: 1,
        title: 'Unit 1',
        description: 'Unit 1 description',
        order: 1
      },
      {
        id: 2,
        coursesId: 1,
        title: 'Unit 2',
        description: 'Unit 2 description',
        order: 2
      }
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: 'Lesson 1',
        order: 1
      },
      {
        id: 2,
        unitId: 1,
        title: 'Lesson verbs',
        order: 2
      },
      {
        id: 3,
        unitId: 1,
        title: 'Lesson 3',
        order: 3
      }
    ])

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        order: 1,
        question: 'What is the Italian word for "hello"?'
      },
      {
        id: 2,
        lessonId: 2,
        type: 'SELECT',
        order: 2,
        question: 'What is the Italian word for "goodbye"?'
      }
    ])

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: '/it.svg',
        text: 'ciao',
        correct: true,
        audioSrc: '/it.mp3'
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: '/fr.svg',
        correct: false,
        text: 'bonjour',
        audioSrc: '/fr.mp3'
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: '/sp.svg',
        correct: false,
        text: 'hola',
        audioSrc: '/sp.mp3'
      }
    ])
    console.log('Seeding finished')
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}

main()
