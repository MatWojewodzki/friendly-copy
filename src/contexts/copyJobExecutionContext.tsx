import React, { createContext, useEffect, useState } from 'react'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { CopyJob } from '../schemas/copyJobSchemas.ts'

export type CopyJobExecutionContextValue = {
    isCopyJobRunning: (id: string) => boolean
    startCopyJob: (copyJob: CopyJob) => Promise<void>
    stopCopyJob: (id: string) => Promise<void>
}

export const CopyJobExecutionContext =
    createContext<CopyJobExecutionContextValue | null>(null)

export type CopyJobExecutionProviderProps = {
    children?: React.ReactNode
}

export function CopyJobExecutionProvider(props: CopyJobExecutionProviderProps) {
    const [copyJobsRunning, setCopyJobsRunning] = useState<string[]>([])

    const isCopyJobRunning = (id: string): boolean => {
        return copyJobsRunning.includes(id)
    }

    const startCopyJob = async (copyJob: CopyJob) => {
        await invoke<void>('start_copy_job', {
            copyJobId: copyJob.id,
            copyJobSrcDirPath: copyJob.srcDirPath,
            copyJobDstDirPath: copyJob.dstDirPath,
            copyJobMode: copyJob.mode,
        })
    }

    const stopCopyJob = async (id: string) => {
        await invoke<void>('stop_copy_job', { copyJobId: id })
    }

    useEffect(() => {
        const unlistenStarted = listen<string>('copy-job-started', (event) => {
            setCopyJobsRunning([...copyJobsRunning, event.payload])
        })
        const unlistenFinished = listen<string>(
            'copy-job-finished',
            (event) => {
                setCopyJobsRunning(
                    copyJobsRunning.filter((id) => id !== event.payload)
                )
            }
        )

        return () => {
            unlistenStarted.then((f) => f())
            unlistenFinished.then((f) => f())
        }
    })
    return (
        <CopyJobExecutionContext.Provider
            value={{ isCopyJobRunning, startCopyJob, stopCopyJob }}
        >
            {props.children}
        </CopyJobExecutionContext.Provider>
    )
}
