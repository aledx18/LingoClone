'use client'

import { courses, userProgress } from '@/db/schema'
import Card from './Card'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { upsertUserProgress } from '@/actions/userProgress'

type Props = {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export default function List({ activeCourseId, courses }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const onClick = (id: number) => {
    if (pending) return
    if (id === activeCourseId) {
      return router.push('/learn')
    }
    startTransition(() => {
      upsertUserProgress(id)
    })
  }

  return (
    <div className='grid gap-4 pt-6 grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]'>
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={activeCourseId === course.id}
        />
      ))}
    </div>
  )
}
