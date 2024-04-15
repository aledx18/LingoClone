import FeedWrapper from '@/components/FeedWrapper'
import StickyWrapper from '@/components/StickyWrapper'
import Header from './header'
import UserProgress from '@/components/UserProgress'
import { getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'

export default async function Page() {
  const userProgress = await getUserProgress()

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  return (
    <div className='flex gap-[48px] px-6'>
      <FeedWrapper>
        <Header title='Spanish' />
        <div className='space-y-4'>
          <div className='h-[700px]  bg-blue-400 w-full' />
          <div className='h-[700px]  bg-blue-400 w-full' />
        </div>
      </FeedWrapper>
      <StickyWrapper>
        asdas
        <UserProgress
          activeCourse={{ title: 'Spanish', imgSrc: 'asda' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  )
}
