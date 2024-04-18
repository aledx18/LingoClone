import MobileHeader from '@/components/Mobile/MobileHeader'
import Sidebar from '@/components/sidebar'

/* eslint-disable no-undef */
export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MobileHeader />
      <Sidebar className='hidden lg:flex' />
      <main className='lg:pl-[256px] pt-[50px] h-full lg:pt-4'>
        <div className='pt-6 h-full mx-auto max-w-[1056px]'>{children}</div>
      </main>
    </>
  )
}
