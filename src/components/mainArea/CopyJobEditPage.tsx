import { CopyJob } from '../../schemas/copyJobSchemas.ts'
import useCopyJob from '../../hooks/useCopyJob.ts'
import CopyJobForm from './CopyJobForm/CopyJobForm.tsx'
import CopyJobFormButton from './CopyJobForm/CopyJobFormButton.tsx'
import MainAreaHeader from './MainAreaHeader.tsx'

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
            <MainAreaHeader>Edit Copy Job</MainAreaHeader>
            <CopyJobForm
                formId="copyJobEditForm"
                handleFormSubmit={handleFormSubmit}
                originalCopyJob={props.copyJob}
            />
            <div className="flex justify-end gap-4">
                <CopyJobFormButton type="submit" form="copyJobEditForm">
                    Ok
                </CopyJobFormButton>
                <CopyJobFormButton type="button" onClick={props.closeEdit}>
                    Cancel
                </CopyJobFormButton>
            </div>
        </div>
    )
}

export default CopyJobEditPage
