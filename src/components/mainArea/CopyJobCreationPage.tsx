import React from 'react'
import { CopyJob } from '../../schemas/copyJobSchemas.ts'
import useCopyJob from '../../hooks/useCopyJob.ts'
import { SelectedPage } from '../../App.tsx'
import CopyJobForm from './CopyJobForm/CopyJobForm.tsx'
import ActionButton from './actionButtonPanel/ActionButton.tsx'
import MainAreaHeader from './MainAreaHeader.tsx'
import ActionButtonPanel from './actionButtonPanel/ActionButtonPanel.tsx'

type CopyJobCreationPageProps = {
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyJobCreationPage(props: CopyJobCreationPageProps) {
    const { createCopyJob } = useCopyJob()

    const handleFormSubmit = async (copyJob: CopyJob) => {
        await createCopyJob(copyJob)
        props.setSelectedPage(copyJob.id)
    }

    return (
        <div className="flex flex-col">
            <MainAreaHeader>Create a new copy job</MainAreaHeader>
            <CopyJobForm
                formId={'copyJobCreationForm'}
                handleFormSubmit={handleFormSubmit}
            />
            <ActionButtonPanel>
                <ActionButton type="submit" form="copyJobCreationForm">
                    Create
                </ActionButton>
            </ActionButtonPanel>
        </div>
    )
}

export default CopyJobCreationPage
