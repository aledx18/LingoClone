import FeedWrapper from '@/components/FeedWrapper'
import StickyWrapper from '@/components/StickyWrapper'
import Header from './header'
import UserProgress from '@/components/UserProgress'
import {
  getCoursesProgress,
  getLessonsPercentage,
  getUnits,
  getUserProgress
} from '@/db/queries'
import { redirect } from 'next/navigation'
import Unit from './Unit'
import { lessons, units as unitsSchema } from '@/db/schema'

export default async function Page() {
  const userProgress = await getUserProgress()
  const units = await getUnits()
  const courseProgress = await getCoursesProgress()
  const lessonPercentage = await getLessonsPercentage()

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }
  if (!courseProgress) {
    redirect('/courses')
  }

  return (
    <div className='flex gap-[48px] px-6'>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id}>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect
                    })
                  | undefined
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  )
}
