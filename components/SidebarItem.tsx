/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  label: string
  iconSrc: string
  href: string
}

export default function SidebarItem({ label, iconSrc, href }: Props) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Button
      asChild
      className='justify-start h-[52px]'
      variant={active ? 'default' : 'outline'}>
      <Link href={href}>
        <img src={iconSrc} alt={label} className='mr-5' />
        {label}
      </Link>
    </Button>
  )
}
