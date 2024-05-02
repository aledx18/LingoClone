'use client'

import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
  title: string
  description: string
  percentage: number
}

export default function UnitBanner({ title, description, percentage }: Props) {
  return (
    <div className='w-full rounded-xl bg-sky-100 p-5 flex items-center justify-between'>
      <div className='space-y-2.5'>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      {/* <Link href='/lesson'>
        <Button size='lg' variant='secondary' className='hidden md:flex'>
          <NotebookText className='mr-2' />
          Continue
        </Button>
      </Link> */}
      <div className='w-16'>
        <CircularProgressbar
          value={Number.isNaN(percentage) ? 0 : percentage}
          text={`${percentage * 1}%`}
        />
      </div>
    </div>
  )
}
