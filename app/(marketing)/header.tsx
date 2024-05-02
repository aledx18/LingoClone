// import Logo from '@/components/logos/logo'
import { Button } from '@/components/ui/button'
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='h-14 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <Link href='/'>
          <div className='pl-4 flex items-center gap-x-3'>
            <Image
              src='/home.svg'
              width={30}
              height={25}
              alt='left_mouse_button_light'
            />
            <h1 className='text-lg text-primary font-extrabold tracking-wide'>
              PlayQuiz
            </h1>
          </div>
        </Link>

        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode='modal'
              afterSignUpUrl='/learn'
              afterSignInUrl='/learn'>
              <Button size='lg' variant='outline'>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}
