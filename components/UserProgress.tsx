import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, InfinityIcon, Zap } from 'lucide-react'

type Props = {
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export default function UserProgress({
  points,
  hearts,
  hasActiveSubscription
}: Props) {
  return (
    <div className='flex items-center justify-evenly w-full'>
      <Link href='/shop'>
        <Button variant='shadowPrimary'>
          <Zap className='mr-2' />
          {points}
        </Button>
      </Link>
      <Link href='/shop'>
        <Button className='text-rose-500 bg-rose-500/20 hover:bg-rose-500 hover:text-white shadow-sm'>
          <Heart strokeWidth={2} className='mr-2 text-rose-500 text-current' />
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
