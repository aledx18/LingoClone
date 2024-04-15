import { getCourses } from '@/db/queries'
import List from './List'

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto'>
      <h1 className='text-2xl font-bold'>Courses</h1>
      <List courses={courses} activeCourseId={1} />
    </div>
  )
}