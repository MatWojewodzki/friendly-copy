import React, { createContext, useEffect, useState } from 'react'
import {
    insertCopyJob,
    listCopyJobs,
} from '../repositories/copyJobRepository.ts'
import { CopyJob } from '../schemas/copyJobSchemas.ts'

export type CopyJobContextValue = {
    getCopyJobs: () => CopyJob[]
    addCopyJob: (copyJob: CopyJob) => Promise<void>
    getCopyJob: (id: string) => CopyJob | undefined
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

    const addCopyJob = async (copyJob: CopyJob): Promise<void> => {
        await insertCopyJob(copyJob)
        setCopyJobs([...copyJobs, copyJob])
    }

    useEffect(() => {
        const loadCopyJobs = async () => {
            setCopyJobs(await listCopyJobs())
        }
        loadCopyJobs().catch(console.error)
    }, [])

    return (
        <CopyJobContext.Provider
            value={{
                getCopyJobs,
                getCopyJob,
                addCopyJob,
            }}
        >
            {children}
        </CopyJobContext.Provider>
    )
}
