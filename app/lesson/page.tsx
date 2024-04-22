import { getLesson, getUserProgress } from '@/db/queries'

import { redirect } from 'next/navigation'
import Quiz from './quiz'

export default async function LessonPage() {
  const lessonData = await getLesson()
  const userProgressData = await getUserProgress()

  if (!lessonData || !userProgressData) {
    redirect('/learn')
  }

  const initialPercentage =
    (lessonData.challenges.filter((challenge) => challenge.completed).length /
      lessonData.challenges.length) *
    100

  return (
    <Quiz
      userSubscription={null}
      initialPercentage={initialPercentage}
      initialHearts={userProgressData.hearts}
      initialLessonId={lessonData.id}
      initialLessonChallenges={lessonData.challenges}
    />
  )
}
