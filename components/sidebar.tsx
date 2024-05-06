import { cn } from '@/lib/utils'
import Link from 'next/link'
import SidebarItem from './SidebarItem'
import { Loader } from 'lucide-react'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

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
      <Link href='/'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image
            src='/home.svg'
            width={30}
            height={25}
            alt='left_mouse_button_light'
          />
          <h1 className='text-2xl text-primary font-extrabold tracking-wide'>
            PlayQuiz
          </h1>
        </div>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItem label='Learn' iconSrc='/learn.svg' href='/learn' />
        <SidebarItem
          label='Leaderboard'
          iconSrc='/learn.svg'
          href='/leaderboard'
        />
        <SidebarItem label='Quests' iconSrc='/quests.svg' href='/quests' />
        <SidebarItem label='Shop' iconSrc='/Shop.svg' href='/shop' />
      </div>
      <div className='p-4'>
        <ClerkLoading>
          <Loader className='w-5 h-5 animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl='/' />
        </ClerkLoaded>
      </div>
    </div>
  )
}
