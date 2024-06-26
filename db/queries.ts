import { cache } from 'react'
import db from './drizzle'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress
} from '@/db/schema'

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany()
  return data
})

export const getUserProgress = cache(async () => {
  const { userId } = auth()
  if (!userId) {
    return null
  }
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: { activeCourse: true }
  })
  return data
})

export const getCoursesById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId)
  })
  return data
})

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress()
  const { userId } = auth()

  if (!userProgress?.activeCourseId || !userId) {
    return []
  }

  const data = await db.query.units.findMany({
    where: eq(units.coursesId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId)
              }
            }
          }
        }
      }
    }
  })

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false }
      }
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        )
      })

      return { ...lesson, completed: allCompletedChallenges }
    })
    return { ...unit, lessons: lessonsWithCompletedStatus }
  })

  return normalizedData
})

export const getCoursesProgress = cache(async () => {
  const { userId } = auth()
  const userProgress = await getUserProgress()

  if (!userId || !userProgress?.activeCourseId) {
    return null
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.coursesId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          units: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId)
              }
            }
          }
        }
      }
    }
  })

  const firstUnCompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false
          )
        )
      })
    })

  return {
    activeLessonId: firstUnCompletedLesson?.id,
    activeLesson: firstUnCompletedLesson
  }
})

export const getLesson = cache(async (id?: number) => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const courseProgress = await getCoursesProgress()

  const lessonId = id || courseProgress?.activeLessonId

  if (!lessonId) {
    return null
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId)
          }
        }
      }
    }
  })

  if (!data || !data.challenges) {
    return null
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress?.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed)

    return { ...challenge, completed }
  })

  return { ...data, challenges: normalizedChallenges }
})

export const getLessonsPercentage = cache(async () => {
  const courseProgress = await getCoursesProgress()

  if (!courseProgress?.activeLessonId) {
    return 0
  }

  const lesson = await getLesson(courseProgress.activeLessonId)

  if (!lesson) {
    return 0
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  )

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  )

  return percentage
})

export const getUnitsPercentage = cache(async () => {
  const userProgress = await getUserProgress()
  const courseProgress = await getCoursesProgress()

  const { userId } = auth()

  if (!userProgress?.activeCourseId || !userId) {
    return null
  }
  if (!courseProgress?.activeLessonId) {
    return 0
  }

  const lesson = await getLesson(courseProgress.activeLessonId)

  //   console.log('courseProgress', courseProgress.activeLesson)

  if (!lesson) {
    return 0
  }

  //   const completedChallenges = lesson.challenges.filter(
  //     (challenge) => challenge.completed
  //   )

  //   const idUNi = 1

  //   const dataLes = await db.query.lessons.findMany({
  //     where: eq(lessons.unitId, idUNi)
  //   })

  //   const dataPro = await db.query.challengeProgress.findMany({})

  // console.log('Cantidad de lesson unit 1 :', dataLes.length)
})
