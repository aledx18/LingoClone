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

export default function Header() {
  return (
    <header className='h-14 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          img
          <h1 className='text-2xl font-extrabold tracking-wide'>Lingo</h1>
        </div>
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