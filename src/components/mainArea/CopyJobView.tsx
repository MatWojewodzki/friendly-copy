import useCopyJob from '../../hooks/useCopyJob.ts'

type CopyJobViewProps = {
    id: string
}

function CopyJobView(props: CopyJobViewProps) {
    const { getCopyJob } = useCopyJob()
    const copyJob = getCopyJob(props.id)!
    return (
        <div>
            <h1 className="font-bold text-2xl text-center mb-8">{`Job: ${copyJob.title}`}</h1>
        </div>
    )
}

export default CopyJobView
