import 'dotenv/config'

import * as schema from '../db/schema'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding...')
    console.log('...')
    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)
    console.log('deleting...')

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Games',
        imageSrc: '/course-game.svg',
        color: '#60a5fa'
      },
      {
        id: 2,
        title: 'Geography',
        imageSrc: '/course-geo.svg',
        color: '#4ade80'
      },
      {
        id: 3,
        title: 'Math',
        imageSrc: '/course-math.svg',
        color: '#fb7185'
      },
      {
        id: 4,
        title: 'Art',
        imageSrc: '/course-art.svg',
        color: '#f59e0b'
      }
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        coursesId: 1,
        title: 'Unit 1 - Preguntas de historia',
        description: 'Preguntas de historia',
        order: 1
      },
      {
        id: 2,
        coursesId: 1,
        title: 'Unit 2 - Preguntas Actuales',
        description: 'Preguntas Actuales',
        order: 2
      }
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: 'Lesson 1 - Años',
        order: 1
      },
      {
        id: 2,
        unitId: 1,
        title: 'Lesson 2 - Ventas',
        order: 2
      },
      {
        id: 3,
        unitId: 2,
        title: 'Lesson 1 - Nombres',
        order: 1
      },
      {
        id: 4,
        unitId: 2,
        title: 'Lesson 2 - Significado',
        order: 2
      }
    ])
    // lesson 1 unit 1
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        order: 1,
        question: '¿En qué década se lanzó el video juego Super Mario Bros.?'
      },
      {
        id: 2,
        lessonId: 1,
        type: 'ASSIST',
        order: 2,
        question: '¿De qué país es originario el Tetris?'
      }
    ])
    // lesson 1 unit 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: '',
        text: 'En los 80',
        correct: true,
        audioSrc: ''
      },
      {
        challengeId: 1,
        imageSrc: '',
        correct: false,
        text: 'En los 90',
        audioSrc: ''
      },
      {
        challengeId: 1,
        imageSrc: '',
        correct: false,
        text: 'En los 2000',
        audioSrc: ''
      }
    ])
    // lesson 1 unit 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        imageSrc: '',
        correct: true,
        text: 'Alemania',
        audioSrc: ''
      },
      {
        challengeId: 2,
        imageSrc: '',
        correct: false,
        text: 'Canada',
        audioSrc: ''
      }
    ])
    // lesson 2 unit 1
    await db.insert(schema.challenges).values([
      {
        id: 3,
        lessonId: 2,
        type: 'ASSIST',
        order: 1,
        question: '¿En qué década se lanzó el video juego Super Mario Bros.?'
      }
    ])
    // lesson 2 unit 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: '',
        correct: true,
        text: 'Alemania',
        audioSrc: ''
      },
      {
        challengeId: 3,
        imageSrc: '',
        correct: false,
        text: 'Canada',
        audioSrc: ''
      }
    ])

    console.log('Seeding finished')
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}

main()
