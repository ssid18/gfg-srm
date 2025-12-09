'use client'

import { useState, useTransition } from 'react'
import { toggleRecruitmentStatus } from './recruitment/actions'

export default function RecruitmentToggle({ initialStatus }: { initialStatus: boolean }) {
    const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(initialStatus)
    const [isPending, startTransition] = useTransition()

    const handleToggle = async () => {
        const newState = !isRecruitmentOpen
        setIsRecruitmentOpen(newState) // Optimistic update

        startTransition(async () => {
            try {
                await toggleRecruitmentStatus(newState)
            } catch (error) {
                console.error('Failed to toggle status:', error)
                setIsRecruitmentOpen(!newState) // Revert on error
                alert('Failed to update recruitment status')
            }
        })
    }

    return (
        <div className="w-full p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
                <p className="text-sm text-white/40 mb-1">Recruitment Status</p>
                <p className={`text-lg font-medium ${isRecruitmentOpen ? 'text-green-400' : 'text-red-400'}`}>
                    {isRecruitmentOpen ? 'OPEN' : 'CLOSED'}
                </p>
            </div>
            <button
                onClick={handleToggle}
                disabled={isPending}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${isRecruitmentOpen ? 'bg-green-500' : 'bg-white/20'
                    } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isRecruitmentOpen ? 'translate-x-7' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    )
}
