import useCopyJob from '../../hooks/useCopyJob.ts'

type CopyJobViewProps = {
    id: string
}

function CopyJobView(props: CopyJobViewProps) {
    const { getCopyJob } = useCopyJob()
    const copyJob = getCopyJob(props.id)!
    return (
        <div>
            {copyJob.title} {copyJob.id} {copyJob.mode}
        </div>
    )
}

export default CopyJobView
