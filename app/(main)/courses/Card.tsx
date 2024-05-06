import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

type Props = {
  title: string
  id: number
  imageSrc: string
  onClick: (id: number) => void
  disabled?: boolean
  active?: boolean
  color: string | null
}

export default function Card({
  id,
  imageSrc,
  title,
  onClick,
  color,
  active,
  disabled
}: Props) {
  const divStyle = {
    borderColor: color !== null ? color : 'blue',
    backgroundColor: color !== null ? `${color}26` : 'blue'
  }
  const checkStyle = {
    borderColor: color !== null ? color : 'blue'
  }

  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'h-full border-2 border-r-8 rounded-3xl active:border-b-4 border-b-8 cursor-pointer flex flex-col items-start justify-between min-h-[217px] min-w-[200px]',
        disabled && 'pointer-events-none opacity-50'
      )}
      style={divStyle}>
      <div className='min-[24px] w-full flex flex-col items-center justify-center gap-1 rounded-tl-3xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border-white px-6 pt-2'>
        <div className='flex gap-10 items-center rounded-sm'>
          <p className='text-center font-bold px-2.5 bg-white rounded-lg'>
            {title}
          </p>
          {active ? (
            <div
              className='flex items-center border rounded-lg justify-center p-0.5'
              style={checkStyle}>
              <Check className='stroke-[4] h-5 w-5 ' />
            </div>
          ) : (
            <div className='p-[13px] '> </div>
          )}
        </div>

        <img
          src={imageSrc}
          alt={title}
          className='rounded-sm object-cover w-48 min-h-40'
        />
      </div>
    </div>
  )
}

/* <div
  onClick={() => onClick(id)}
  className={cn(
    `h-full border-2 border-r-8 rounded-3xl active:border-b-4 hover:bg-${color}/30 border-b-8 cursor-pointer flex flex-col items-start justify-between min-h-[217px] min-w-[200px]`,
    disabled && 'pointer-events-none opacity-50'
  )}>
  <div className='min-[24px] w-full flex flex-col items-end justify-center gap-1 rounded-tl-3xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border-white px-6 pt-2'>
    {active && (
      <div
        className={`flex items-center border border-${color} rounded-lg justify-center p-1`}>
        <Check className='stroke-[4] h-5 w-5 ' />
      </div>
    )}
    <div className='flex flex-col gap-1 items-start rounded-sm'>
      <img
        src={imageSrc}
        alt={title}
        className='rounded-sm object-cover w-48 bg-white'
      />
      <p className='text-center font-bold pb-2'>
        {title}, {color}{' '}
      </p>
    </div>
  </div>
</div> */
