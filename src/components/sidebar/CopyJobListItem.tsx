import { CopyJob } from '../../schemas/copyJobSchemas.ts'
import { SelectedPage } from '../../App.tsx'
import React from 'react'
import classNames from 'classnames'
import useCopyJobExecution from '../../hooks/useCopyJobExecution.ts'
import RunningBadge from '../RunningBadge.tsx'

type CopyJobListItemProps = {
    copyJob: CopyJob
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyJobListItem(props: CopyJobListItemProps) {
    const { copyJob } = props
    const { isCopyJobRunning } = useCopyJobExecution()

    const isSelected = props.selectedPage === copyJob.id
    const isRunning = isCopyJobRunning(copyJob.id)

    return (
        <li className="flex flex-col">
            <button
                type="button"
                className={classNames(
                    'flex items-center gap-2 ps-4 pe-2 py-4 cursor-pointer focus:outline-none',
                    'hover:bg-neutral-300 focus-visible:bg-neutral-300',
                    { 'bg-neutral-200': isSelected }
                )}
                key={copyJob.id}
                onClick={() => props.setSelectedPage(copyJob.id)}
            >
                <span className="truncate">{copyJob.title}</span>
                {isRunning && <RunningBadge />}
            </button>
        </li>
    )
}

export default CopyJobListItem
