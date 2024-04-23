/* eslint-disable no-unused-vars */
'use client'

import { challenges, challengeOptions } from '@/db/schema'
import { useState } from 'react'
import Header from './header'
import QuestionBubble from './questionBubble'
import Challenge from './challenge'
import Footer from './footer'

type Props = {
  initialPercentage: number
  initialHearts: number
  initialLessonId: number
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  userSubscription: any
}

export default function Quiz({
  initialPercentage,
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  userSubscription
}: Props) {
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const unCompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    )
    return unCompletedIndex === -1 ? 0 : unCompletedIndex
  })
  const [status, setStatus] = useState<'none' | 'correct' | 'wrong'>('none')
  const [selectedOption, setSelectedOption] = useState<number>()
  const onSelect = (id: number) => {
    if (status !== 'none') return

    setSelectedOption(id)
  }
  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []
  const title =
    challenge.type === ' ASSIST'
      ? 'Select the Correct meaning'
      : challenge.question
  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className='flex-1'>
        <div className='h-full flex items-center justify-center'>
          <div className='lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12'>
            <h1 className='text-lg lg:text-start font-bold lg:text-3xl text-center'>
              {title}
            </h1>
            <div className=''>
              {challenge.type === 'SELECT' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer disabled={!selectedOption} status={status} onCheck={() => {}} />
    </>
  )
}
