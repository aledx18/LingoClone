'use client'

import { challenges, challengeOptions } from '@/db/schema'
import { useState, useTransition } from 'react'
import Header from './header'
import QuestionBubble from './questionBubble'
import Challenge from './challenge'
import Footer from './footer'
import { upsertChallengeProgress } from '@/actions/challenge-progress'
import { toast } from 'sonner'
import { reduceHearts } from '@/actions/userProgress'
import ResultCard from './resultCard'
import { useRouter } from 'next/navigation'
import { useHeartsModal } from '@/app/store/use-hearts-modal'

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
  const { open: openHeartsModal } = useHeartsModal()
  const router = useRouter()

  const [pending, startTransition] = useTransition()

  const [lessonId] = useState(initialLessonId)
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

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  const onNext = () => {
    setActiveIndex((current) => current + 1)
  }
  const onSelect = (id: number) => {
    if (status !== 'none') return

    setSelectedOption(id)
  }
  const onContinue = () => {
    if (!selectedOption) return

    if (status === 'wrong') {
      setStatus('none')
      setSelectedOption(undefined)
      return
    }
    if (status === 'correct') {
      onNext()
      setStatus('none')
      setSelectedOption(undefined)
      return
    }
    const correctOption = options.find((option) => option.correct)

    if (!correctOption) return

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              openHeartsModal()
              return
            }
            setStatus('correct')
            setPercentage((current) => current + 100 / challenges.length)

            if (initialPercentage === 100) {
              setHearts((current) => Math.min(current + 1, 5))
            }
          })
          .catch(() => toast.error('Someth went wrong'))
      })
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              openHeartsModal()
              return
            }
            setStatus('wrong')

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0))
            }
          })
          .catch(() => toast.error('Someth went wrong'))
      })
    }
  }

  if (!challenge) {
    return (
      <>
        <div className='flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full'>
          <h1 className='text-xl lg:text-3xl font-bold'>Great job !</h1>
          <div className='flex items-center gap-x-4 w-full'>
            <ResultCard variant='points' value={challenges.length * 10} />
            <ResultCard variant='hearts' value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status='completed'
          onCheck={() => router.push('/learn')}
        />
      </>
    )
  }

  const title =
    challenge.type === 'ASSIST'
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
            <div className='bg-primary/15 border-primary border-2 border-b-8 border-r-8 rounded-3xl'>
              <div className='border-t-8 border-l-4 border-b-2 border-r-2 rounded-tl-3xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border-white px-6 pb-6 pt-2'>
                <p className='py-3 font-bold text-md text-primary'>
                  Question {activeIndex + 1}/{challenges.length}
                </p>
                <h1 className='text-lg lg:text-start font-bold lg:text-3xl text-center'>
                  {title}
                </h1>
              </div>
            </div>
            <div>
              {challenge.type === 'ASSIST' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}
