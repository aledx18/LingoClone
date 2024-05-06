import { Button } from '@/components/ui/button'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  title: string
  img: string
  color: string | null
}

export default function Header({ title, color, img }: Props) {
  const titleStyle = {
    backgroundColor: `${color}26`,
    borderColor: color !== null ? color : 'blue'
  }
  const iconStyle = {
    color: color !== null ? color : 'black'
  }

  return (
    <div className='sticky top-0 pb-3 lg:pt[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 lg:z-50'>
      <Link href='/courses'>
        <Button variant='secondary' size='sm'>
          <ArrowLeft style={iconStyle} className='w-5 h-5 stroke-2' />
        </Button>
      </Link>
      <div
        style={titleStyle}
        className='flex items-center gap-x-4 rounded-lg px-3 border-r-2 border-b-2 border-l border-t'>
        <h1 className='font-bold text-xl text-center'>{title}</h1>
        <img className='w-10' src={img} alt={title} />
      </div>
      {/* <Link href='/courses'>
        <Button variant='secondary'>
          <img className='w-10' src={img} alt={title} />
        </Button>
      </Link> */}
      <div />
    </div>
  )
}
