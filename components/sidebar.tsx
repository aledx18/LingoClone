import { cn } from '@/lib/utils'
import Link from 'next/link'
import SidebarItem from './SidebarItem'

type Props = {
  className?: string
}

export default function Sidebar({ className }: Props) {
  return (
    <div
      className={cn(
        'h-full bg-gray-300 lg:w-[256px] left-0 top-0 border-r-2 px-4 lg:fixed flex flex-col',
        className
      )}>
      <Link href='/learn'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          img
          <h1 className='text-2xl font-extrabold tracking-wide'>Lingo</h1>
        </div>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItem label='Learn' iconSrc='/learn.svg' href='/learn' />
      </div>
    </div>
  )
}
