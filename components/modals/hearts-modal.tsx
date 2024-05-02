'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useHeartsModal } from '@/app/store/use-hearts-modal'

export default function HeartsModal() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useHeartsModal()

  useEffect(() => setIsClient(true), [])

  const onclick = () => {
    close()
    router.push('/store')
  }

  if (!isClient) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>You ran out of Hearts!</DialogTitle>
          <DialogDescription>
            Get Pro for unlimited hearts and more!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button onClick={onclick}>Get unlimited hearts</Button>
            <Button onClick={close}>No thanks</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
