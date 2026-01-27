import useCopyJob from '../../../hooks/useCopyJob.ts'
import MainAreaHeader from '../MainAreaHeader.tsx'
import DirPathView from './DirPathView.tsx'
import ActionButton from '../actionButtonPanel/ActionButton.tsx'
import { SelectedPage } from '../../../App.tsx'
import React, { useState } from 'react'
import CopyJobEditPage from '../CopyJobEditPage.tsx'
import useCopyJobExecution from '../../../hooks/useCopyJobExecution.ts'
import CopyJobRunningPage from '../CopyJobRunningPage.tsx'
import classNames from 'classnames'
import { Mode } from '../../../schemas/copyJobSchemas.ts'
import { confirm } from '@tauri-apps/plugin-dialog'
import ActionButtonPanel from '../actionButtonPanel/ActionButtonPanel.tsx'

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
        if (copyJob.mode === Mode.Mirror) {
            const confirmation = await confirm(
                'Are you sure you want to run this copy job in MIRROR mode? This action is destructive and will delete any files and directories in the destination directory that do not exist in the source directory. This action cannot be undone.',
                { title: 'Confirm Mirror Mode', kind: 'warning' }
            )
            if (!confirmation) {
                return
            }
        }
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
            <h2 className="text-sm font-semibold mb-1">Mode</h2>
            <p
                className={classNames('text-sm mb-8', {
                    'text-red-700': copyJob.mode === Mode.Mirror,
                })}
            >
                {copyJob.mode === 0 ? 'Copy' : 'Mirror'}
            </p>
            <ActionButtonPanel>
                <ActionButton type="button" onClick={handleEdit}>
                    Edit
                </ActionButton>
                <ActionButton type="button" onClick={handleRun}>
                    Run
                </ActionButton>
                <ActionButton type="button" onClick={handleDelete}>
                    Delete
                </ActionButton>
            </ActionButtonPanel>
            <div className="flex justify-end gap-3">
            </div>
        </div>
    )
}

export default CopyJobViewPage
