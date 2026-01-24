import { CopyJob } from '../../schemas/copyJobSchemas.ts'
import { SelectedPage } from '../../App.tsx'
import React from 'react'
import classNames from 'classnames'

type CopyJobListItemProps = {
    copyJob: CopyJob
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyJobListItem(props: CopyJobListItemProps) {
    const { copyJob } = props

    return (
        <li className="flex flex-col">
            <button
                type="button"
                className={classNames(
                    'ps-4 py-4 cursor-pointer text-start truncate',
                    'hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300',
                    { 'bg-neutral-200': props.selectedPage === copyJob.id }
                )}
                key={copyJob.id}
                onClick={() => props.setSelectedPage(copyJob.id)}
            >
                {copyJob.title}
            </button>
        </li>
    )
}

export default CopyJobListItem
