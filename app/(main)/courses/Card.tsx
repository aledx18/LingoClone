import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

type Props = {
  title: string
  id: number
  imageSrc: string
  onClick: (id: number) => void
  disabled?: boolean
  active?: boolean
}

export default function Card({
  id,
  imageSrc,
  title,
  onClick,
  active,
  disabled
}: Props) {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'h-full border-2 rounded-xl active:border-b-2 border-b-4 hover:bg-black/5 cursor-pointer flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]',
        disabled && 'pointer-events-none opacity-50'
      )}>
      <div className='min-[24px] w-full flex items-center justify-end'>
        {active && (
          <div className='flex items-center justify-center p-1.5'>
            <Check className='stroke-[4] h-4 w-4' />
          </div>
        )}
      </div>
      <img
        src={imageSrc}
        alt={title}
        className='rounded-lg drop-shadow-md border object-cover'
      />
      <p className='text-center font-bold mt-3'>{title}</p>
    </div>
  )
}
