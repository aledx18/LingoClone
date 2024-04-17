import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfinityIcon } from 'lucide-react'
import { courses } from '@/db/schema'

type Props = {
  activeCourse: typeof courses.$inferSelect
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export default function UserProgress({
  activeCourse,
  points,
  hearts,
  hasActiveSubscription
}: Props) {
  return (
    <div className='flex items-center justify-between gap-x-2 w-full'>
      <Link href='/courses'>
        <Button>
          <img
            className='rounded-md border'
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
          />
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant='outline'>
          <img src='/icons/heart.svg' alt='heart' className='mr-2' />
          {points}
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant='outline' className='text-rose-500'>
          <img src='/icons/heart.svg' alt='heart' className='mr-2' />
          {hasActiveSubscription ? (
            <InfinityIcon className='w-4 h-4' />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  )
}
