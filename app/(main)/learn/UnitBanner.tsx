import { Button } from '@/components/ui/button'
import { NotebookText } from 'lucide-react'
import Link from 'next/link'

type Props = {
  title: string
  description: string
}

export default function UnitBanner({ title, description }: Props) {
  return (
    <div className='w-full rounded-xl bg-black p-5 flex items-center justify-between'>
      <div className='space-y-2.5'>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <Link href='/lesson'>
        <Button size='lg' variant='secondary' className='hidden md:flex'>
          <NotebookText className='mr-2' />
          Continue
        </Button>
      </Link>
    </div>
  )
}
