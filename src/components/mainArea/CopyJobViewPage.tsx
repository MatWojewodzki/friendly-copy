import useCopyJob from '../../hooks/useCopyJob.ts'
import MainAreaHeader from './MainAreaHeader.tsx'
import DirPathView from './DirPathView.tsx'

type CopyJobViewProps = {
    id: string
}

function CopyJobViewPage(props: CopyJobViewProps) {
    const { getCopyJob } = useCopyJob()
    const copyJob = getCopyJob(props.id)!
    return (
        <div className="flex flex-col">
            <MainAreaHeader>{`Job: ${copyJob.title}`}</MainAreaHeader>
            <h2 className="text-sm font-semibold mb-1">Source directory</h2>
            <DirPathView path={copyJob.srcDirPath} />
            <h2 className="text-sm font-semibold mb-1">
                Destination directory
            </h2>
            <DirPathView path={copyJob.dstDirPath} />
            <h2 className="text-sm font-semibold mb-1">Copy mode</h2>
            <p className="text-sm">{copyJob.mode === 0 ? 'Copy' : 'Mirror'}</p>
        </div>
    )
}

export default CopyJobViewPage
