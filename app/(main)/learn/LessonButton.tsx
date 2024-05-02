'use client'

import { Check, Crown, Star } from 'lucide-react'
// import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { cn } from '@/lib/utils'
// import 'react-circular-progressbar/dist/styles.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  id: number
  index: number
  totalCount: number
  locked?: boolean
  current?: boolean
  percentage: number
}

export default function LessonButton({
  id,
  index,
  percentage,
  totalCount,
  current,
  locked
}: Props) {
  const cycleLength = 8
  const cycleIndex = index % cycleLength

  let indetationLevel

  if (cycleIndex <= 2) {
    indetationLevel = cycleIndex
  } else if (cycleIndex <= 4) {
    indetationLevel = 4 - cycleIndex
  } else if (cycleIndex <= 6) {
    indetationLevel = 4 - cycleIndex
  } else {
    indetationLevel = cycleIndex - 8
  }

  const rightPosition = indetationLevel * 40

  const isFirst = index === 0
  const isLast = index === totalCount - 1
  const isCompleted = !current && !locked

  const Icon = isCompleted ? Check : isLast ? Crown : Star

  const href = isCompleted ? `/lesson/${id}` : '/lesson'

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{
        pointerEvents: locked ? 'none' : 'auto'
      }}>
      <div
        className='relative'
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24
        }}>
        {current ? (
          <Button
            variant={locked ? 'locked' : 'secondary'}
            className='h-[70px] w-[70px] border-b-8'
            size='rounded'>
            <Icon
              className={cn(
                'h-10 w-10',
                locked
                  ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground',
                isCompleted && 'fill-none stroke-[4]'
              )}
            />
          </Button>
        ) : (
          <Button
            variant={locked ? 'locked' : 'secondary'}
            className='h-[70px] w-[70px] border-b-8 '
            size='rounded'>
            <Icon
              className={cn(
                'h-10 w-10',
                locked
                  ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground',
                isCompleted && 'fill-none stroke-[4]'
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  )
}
