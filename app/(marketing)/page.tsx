import { Button } from '@/components/ui/button'
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='max-w-[988px] justify-center p-4 gap-2 mx-auto flex-1 w-full flex flex-col lg:flex-row items-center'>
      <div className='relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] lg:mb-0 mb-8'>
        img
      </div>
      <div className='flex flex-col items-center gap-y-8'>
        <h1 className='text-xl lg:text-3xl font-bold max-w-[480px] '>
          Learn, practice and master
        </h1>
        <div className='flex flex-col items-center gap-y-3 max-w-[330px] w-full'>
          <ClerkLoading>
            <Loader className='w-5 h-5 animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode='modal'
                afterSignInUrl='/learn'
                afterSignUpUrl='/learn'>
                <Button className='w-full'>Get Started</Button>
              </SignUpButton>
              <SignInButton
                mode='modal'
                afterSignInUrl='/learn'
                afterSignUpUrl='/learn'>
                <Button variant='outline' className='w-full'>
                  I alreadty have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button variant='secondary' asChild className='w-full'>
                <Link href='/learn'>Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
