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
import { useExitModal } from '@/app/store/use-exit-modal'

export default function ExitModal() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useExitModal()

  useEffect(() => setIsClient(true), [])

  if (!isClient) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Are you sure you want to exit?</DialogTitle>
          <DialogDescription>
            You&apos;re about to leave the lesson. Are you sure ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button variant='shadowPrimary' onClick={close}>
              Keep learning
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                close()
                router.push('/learn')
              }}>
              End session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
