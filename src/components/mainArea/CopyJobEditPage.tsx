import { CopyJob } from '../../schemas/copyJobSchemas.ts'
import useCopyJob from '../../hooks/useCopyJob.ts'
import CopyJobForm from './CopyJobForm/CopyJobForm.tsx'
import ActionButton from './actionButtonPanel/ActionButton.tsx'
import MainAreaHeader from './MainAreaHeader.tsx'
import ActionButtonPanel from './actionButtonPanel/ActionButtonPanel.tsx'

type CopyJobEditPageProps = {
    copyJob: CopyJob
    closeEdit: () => void
}

function CopyJobEditPage(props: CopyJobEditPageProps) {
    const { editCopyJob } = useCopyJob()

    const handleFormSubmit = async (copyJob: CopyJob) => {
        await editCopyJob(copyJob)
        props.closeEdit()
    }

    return (
        <div className="flex flex-col">
            <MainAreaHeader>Edit copy job</MainAreaHeader>
            <CopyJobForm
                formId="copyJobEditForm"
                handleFormSubmit={handleFormSubmit}
                originalCopyJob={props.copyJob}
            />
            <ActionButtonPanel>
                <ActionButton type="submit" form="copyJobEditForm">
                    Save
                </ActionButton>
                <ActionButton type="button" onClick={props.closeEdit}>
                    Cancel
                </ActionButton>
            </ActionButtonPanel>
        </div>
    )
}

export default CopyJobEditPage
