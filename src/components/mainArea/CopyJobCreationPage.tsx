import React from 'react'
import { CopyJob } from '../../schemas/copyJobSchemas.ts'
import useCopyJob from '../../hooks/useCopyJob.ts'
import { SelectedPage } from '../../App.tsx'
import CopyJobForm from './CopyJobForm/CopyJobForm.tsx'
import CopyJobFormButton from './CopyJobForm/CopyJobFormButton.tsx'
import MainAreaHeader from './MainAreaHeader.tsx'

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
            <div className="flex justify-end">
                <CopyJobFormButton type="submit" form="copyJobCreationForm">
                    Create
                </CopyJobFormButton>
            </div>
        </div>
    )
}

export default CopyJobCreationPage
