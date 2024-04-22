import { Progress } from '@/components/ui/progress'
import { X, InfinityIcon } from 'lucide-react'

type Props = {
  hearts: number
  percentage: number
  hasActiveSubscription: boolean
}

export default function Header({
  hasActiveSubscription,
  hearts,
  percentage
}: Props) {
  return (
    <header className='lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full '>
      <X
        onClick={() => {}}
        className='hover:opacity-55 transition cursor-pointer'
      />
      <Progress value={percentage} />
      <div className='text-rose-400 flex items-center font-bold'>
        <img src='/heart.svg' alt='heart' className='mr-2' />
        {hasActiveSubscription ? (
          <InfinityIcon className='h-6 w-6 stroke-[3]' />
        ) : (
          hearts
        )}
      </div>
    </header>
  )
}
