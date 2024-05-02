import { getLesson, getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'
import Quiz from '../quiz'

type Props = {
  params: {
    lessonId: number
  }
}

export default async function LessonIdPage({ params }: Props) {
  const lessonData = await getLesson(params.lessonId)
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
      userSubscription={null} // todo
      initialPercentage={initialPercentage}
      initialHearts={userProgressData.hearts}
      initialLessonId={lessonData.id}
      initialLessonChallenges={lessonData.challenges}
    />
  )
}
