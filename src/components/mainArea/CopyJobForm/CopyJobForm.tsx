import { useRef, useState } from 'react'
import ModeInput from './ModeInput.tsx'
import DirPathInput from './DirPathInput.tsx'
import Input from './Input.tsx'
import {
    CopyJob,
    copyJobSchema,
    userInputCopyJobSchema,
} from '../../../schemas/copyJobSchemas.ts'
import CopyJobFormLabel from './CopyJobFormLabel.tsx'

type CopyJobFormProps = {
    formId: string
    handleFormSubmit: (copyJob: CopyJob) => void
    originalCopyJob?: CopyJob
}

function CopyJobForm(props: CopyJobFormProps) {
    const originalCopyJob = props.originalCopyJob

    const titleRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState(originalCopyJob?.title ?? '')
    const [titleError, setTitleError] = useState<string>('')

    const srcDirRef = useRef<HTMLInputElement>(null)
    const [srcDirPath, setSrcDirPath] = useState(
        originalCopyJob?.srcDirPath ?? ''
    )
    const [srcDirPathError, setSrcDirPathError] = useState<string>('')

    const dstDirRef = useRef<HTMLInputElement>(null)
    const [dstDirPath, setDstDirPath] = useState(
        originalCopyJob?.dstDirPath ?? ''
    )
    const [dstDirPathError, setDstDirPathError] = useState<string>('')

    const [mode, setMode] = useState(originalCopyJob?.mode ?? 0)

    const validateForm = async (): Promise<CopyJob | null> => {
        const result = originalCopyJob
            ? await copyJobSchema.safeParseAsync({
                  id: originalCopyJob.id,
                  title,
                  srcDirPath,
                  dstDirPath,
                  mode,
              })
            : await userInputCopyJobSchema.safeParseAsync({
                  title,
                  srcDirPath,
                  dstDirPath,
                  mode,
              })

        if (result.success) {
            return result.data
        }

        const issues = result.error.issues
        const titleIssue = issues.find(
            (issue) => issue.path.toString() === 'title'
        )
        const srcDirPathIssue = issues.find(
            (issue) => issue.path.toString() === 'srcDirPath'
        )
        const dstDirPathIssue = issues.find(
            (issue) => issue.path.toString() === 'dstDirPath'
        )

        const titleError = titleIssue ? titleIssue.message : ''
        const srcDirPathError = srcDirPathIssue ? srcDirPathIssue.message : ''
        const dstDirPathError = dstDirPathIssue ? dstDirPathIssue.message : ''

        setTitleError(titleError)
        setSrcDirPathError(srcDirPathError)
        setDstDirPathError(dstDirPathError)

        if (titleError != '') {
            titleRef.current?.focus()
        } else if (srcDirPathError != '') {
            srcDirRef.current?.focus()
        } else if (dstDirPathError != '') {
            dstDirRef.current?.focus()
        }

        return null
    }

    return (
        <form
            id={props.formId}
            className="flex flex-col"
            onSubmit={async (e) => {
                e.preventDefault()
                const copyJob = await validateForm()
                if (!copyJob) return
                props.handleFormSubmit(copyJob)
            }}
        >
            <CopyJobFormLabel htmlFor="titleInput">Title</CopyJobFormLabel>
            <Input
                className="pe-2"
                type="text"
                id="titleInput"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Backup Documents to the D: drive'}
                error={titleError}
                aria-invalid={titleError !== ''}
                inputRef={titleRef}
            />
            <CopyJobFormLabel htmlFor="srcInput">
                Source directory
            </CopyJobFormLabel>
            <DirPathInput
                id="srcInput"
                name="src"
                value={srcDirPath}
                setValue={setSrcDirPath}
                placeholder={'C:\\path\\to\\source\\directory'}
                error={srcDirPathError}
                setError={setSrcDirPathError}
                inputRef={srcDirRef}
            />
            <CopyJobFormLabel htmlFor="dstInput">
                Destination directory
            </CopyJobFormLabel>
            <DirPathInput
                id="dstInput"
                name="dst"
                value={dstDirPath}
                setValue={setDstDirPath}
                placeholder={'D:\\path\\to\\destination\\directory'}
                error={dstDirPathError}
                setError={setDstDirPathError}
                inputRef={dstDirRef}
            />
            <ModeInput value={mode} setValue={setMode} />
        </form>
    )
}

export default CopyJobForm
