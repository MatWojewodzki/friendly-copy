import useCopyJob from '../../hooks/useCopyJob.ts'
import MainAreaHeader from './MainAreaHeader.tsx'
import DirPathView from './DirPathView.tsx'
import CopyJobFormButton from './CopyJobForm/CopyJobFormButton.tsx'
import { SelectedPage } from '../../App.tsx'
import React, { useState } from 'react'
import CopyJobEditPage from './CopyJobEditPage.tsx'
import useCopyJobExecution from '../../hooks/useCopyJobExecution.ts'
import CopyJobRunningPage from './CopyJobRunningPage.tsx'

type CopyJobViewProps = {
    id: string
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyJobViewPage(props: CopyJobViewProps) {
    const [isEditing, setIsEditing] = useState(false)
    const { getCopyJob, deleteCopyJob } = useCopyJob()
    const { isCopyJobRunning, startCopyJob } = useCopyJobExecution()

    const copyJob = getCopyJob(props.id)!
    const isRunning = isCopyJobRunning(copyJob.id)

    const handleEdit = () => setIsEditing(true)

    const handleRun = async () => {
        await startCopyJob(copyJob)
    }

    const handleDelete = async () => {
        await deleteCopyJob(copyJob.id)
        props.setSelectedPage('new')
    }

    if (isRunning) {
        return <CopyJobRunningPage id={copyJob.id} title={copyJob.title} />
    }
    if (isEditing) {
        return (
            <CopyJobEditPage
                copyJob={copyJob}
                closeEdit={() => setIsEditing(false)}
            />
        )
    }
    return (
        <div className="flex flex-col">
            <MainAreaHeader>{`Job: ${copyJob.title}`}</MainAreaHeader>
            <h2 className="text-sm font-semibold mb-1">Source directory</h2>
            <DirPathView path={copyJob.srcDirPath} />
            <h2 className="text-sm font-semibold mb-1">
                Destination directory
            </h2>
            <DirPathView path={copyJob.dstDirPath} />
            <h2 className="text-sm font-semibold mb-1">Copy mode</h2>
            <p className="text-sm mb-8">
                {copyJob.mode === 0 ? 'Copy' : 'Mirror'}
            </p>
            <div className="flex justify-end gap-4">
                <CopyJobFormButton type="button" onClick={handleEdit}>
                    Edit
                </CopyJobFormButton>
                <CopyJobFormButton type="button" onClick={handleRun}>
                    Run
                </CopyJobFormButton>
                <CopyJobFormButton type="button" onClick={handleDelete}>
                    Delete
                </CopyJobFormButton>
            </div>
        </div>
    )
}

export default CopyJobViewPage
