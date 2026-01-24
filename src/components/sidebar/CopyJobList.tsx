import useCopyJob from '../../hooks/useCopyJob.ts'
import { SelectedPage } from '../../App.tsx'
import React from 'react'
import CopyJobListItem from './CopyJobListItem.tsx'

type CopyJobListProps = {
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyJobList(props: CopyJobListProps) {
    const { getCopyJobs } = useCopyJob()
    const copyJobs = getCopyJobs()
    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            <h2 className="px-2 mt-8 mb-2 font-semibold">Copy Jobs</h2>
            <ul className="overflow-y-auto">
                {copyJobs.length === 0 && (
                    <li className="text-sm text-center">No Copy Jobs</li>
                )}
                {copyJobs.map((copyJob) => (
                    <CopyJobListItem
                        key={copyJob.id}
                        copyJob={copyJob}
                        selectedPage={props.selectedPage}
                        setSelectedPage={props.setSelectedPage}
                    />
                ))}
            </ul>
        </div>
    )
}

export default CopyJobList
