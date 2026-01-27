import MainAreaHeader from './MainAreaHeader.tsx'
import useCopyJobExecution from '../../hooks/useCopyJobExecution.ts'
import CopyJobFormButton from './CopyJobForm/CopyJobFormButton.tsx'

export type CopyJobRunningPageProps = {
    title: String
    id: string
}

function CopyJobRunningPage(props: CopyJobRunningPageProps) {
    const { stopCopyJob } = useCopyJobExecution()

    const handleStop = async () => {
        await stopCopyJob(props.id)
    }
    return (
        <div className="flex flex-col">
            <MainAreaHeader>{`Job: ${props.title}`}</MainAreaHeader>
            <div className="flex justify-center items-center gap-6">
                <span>
                    This Copy Job is currently{' '}
                    <span className="text-green-700">running</span>.
                </span>
                <CopyJobFormButton type="button" onClick={handleStop}>
                    Stop
                </CopyJobFormButton>
            </div>
        </div>
    )
}

export default CopyJobRunningPage
