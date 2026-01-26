import React, { createContext, useEffect, useState } from 'react'
import copyJobRepository from '../repositories/copyJobRepository.ts'
import { CopyJob } from '../schemas/copyJobSchemas.ts'

export type CopyJobContextValue = {
    getCopyJobs: () => CopyJob[]
    getCopyJob: (id: string) => CopyJob | undefined
    createCopyJob: (copyJob: CopyJob) => Promise<void>
    deleteCopyJob: (id: string) => Promise<void>
    editCopyJob: (copyJob: CopyJob) => Promise<void>
}

export const CopyJobContext = createContext<CopyJobContextValue | null>(null)

export function CopyJobProvider({ children }: { children: React.ReactNode }) {
    const [copyJobs, setCopyJobs] = useState<CopyJob[]>([])

    const getCopyJobs = (): CopyJob[] => {
        return copyJobs
    }

    const getCopyJob = (id: string): CopyJob | undefined => {
        return copyJobs.find((copyJob) => copyJob.id === id)
    }

    const createCopyJob = async (copyJob: CopyJob): Promise<void> => {
        await copyJobRepository.insertCopyJob(copyJob)
        setCopyJobs([...copyJobs, copyJob])
    }

    const deleteCopyJob = async (id: string): Promise<void> => {
        await copyJobRepository.deleteCopyJob(id)
        setCopyJobs(copyJobs.filter((copyJob) => copyJob.id !== id))
    }

    const editCopyJob = async (copyJob: CopyJob): Promise<void> => {
        await copyJobRepository.editCopyJob(copyJob)
        setCopyJobs(
            copyJobs.map((job) => (job.id === copyJob.id ? copyJob : job))
        )
    }

    useEffect(() => {
        const loadCopyJobs = async () => {
            setCopyJobs(await copyJobRepository.listCopyJobs())
        }
        loadCopyJobs().catch(console.error)
    }, [])

    return (
        <CopyJobContext.Provider
            value={{
                getCopyJobs,
                getCopyJob,
                createCopyJob,
                deleteCopyJob,
                editCopyJob,
            }}
        >
            {children}
        </CopyJobContext.Provider>
    )
}
