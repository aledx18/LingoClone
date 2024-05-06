import { Progress } from '@/components/ui/progress'
import { X, InfinityIcon, Heart } from 'lucide-react'
import { useExitModal } from '../store/use-exit-modal'

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
  const { open } = useExitModal()
  return (
    <header className='lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full '>
      <X
        onClick={open}
        className='hover:opacity-55 transition cursor-pointer'
      />
      <Progress value={percentage} />
      <div className='text-rose-600 flex items-center font-bold'>
        <Heart strokeWidth={3} className='mr-2 text-rose-600' />
        {hasActiveSubscription ? (
          <InfinityIcon className='h-6 w-6 stroke-[3]' />
        ) : (
          hearts
        )}
      </div>
    </header>
  )
}
