import React from 'react'
import ModeInput from './ModeInput.tsx'
import DirPathInput from './DirPathInput.tsx'
import Input from './Input.tsx'
import { userInputCopyJobSchema } from '../../../schemas/copyJobSchemas.ts'
import CopyJobFormLabel from './CopyJobFormLabel.tsx'

export type FormInputProps = {
    ref: React.RefObject<HTMLInputElement>
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    error: string
    setError: React.Dispatch<React.SetStateAction<string>>
}

export type ModeProps = {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

type CopyJobFormProps = {
    formId: string
    titleProps: FormInputProps
    srcDirPathProps: FormInputProps
    dstDirPathProps: FormInputProps
    modeProps: ModeProps
    handleFormSubmit: () => void
}

function CopyJobForm(props: CopyJobFormProps) {
    const {
        formId,
        titleProps,
        srcDirPathProps,
        dstDirPathProps,
        modeProps,
        handleFormSubmit,
    } = props

    const validateForm = async () => {
        const result = await userInputCopyJobSchema.safeParseAsync({
            title: titleProps.value,
            srcDirPath: srcDirPathProps.value,
            dstDirPath: dstDirPathProps.value,
            mode: modeProps.value,
        })
        console.log(result)

        if (result.success) {
            return
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

        titleProps.setError(titleError)
        srcDirPathProps.setError(srcDirPathError)
        dstDirPathProps.setError(dstDirPathError)

        if (titleError != '') {
            titleProps.ref.current?.focus()
        } else if (srcDirPathError != '') {
            srcDirPathProps.ref.current?.focus()
        } else if (dstDirPathError != '') {
            dstDirPathProps.ref.current?.focus()
        }
    }

    return (
        <form
            id={formId}
            className="flex flex-col"
            onSubmit={async (e) => {
                e.preventDefault()
                await validateForm()
                handleFormSubmit()
            }}
        >
            <CopyJobFormLabel htmlFor="titleInput">Title</CopyJobFormLabel>
            <Input
                className="pe-2"
                type="text"
                id="titleInput"
                name="title"
                value={titleProps.value}
                onChange={(e) => titleProps.setValue(e.target.value)}
                placeholder={'Backup Documents to the D: drive'}
                error={titleProps.error}
                aria-invalid={titleProps.error !== ''}
                inputRef={titleProps.ref}
            />
            <CopyJobFormLabel htmlFor="srcInput">
                Source directory
            </CopyJobFormLabel>
            <DirPathInput
                id="srcInput"
                name="src"
                value={srcDirPathProps.value}
                setValue={srcDirPathProps.setValue}
                placeholder={'C:\\path\\to\\source\\directory'}
                error={srcDirPathProps.error}
                setError={srcDirPathProps.setError}
                inputRef={srcDirPathProps.ref}
            />
            <CopyJobFormLabel htmlFor="dstInput">
                Destination directory
            </CopyJobFormLabel>
            <DirPathInput
                id="dstInput"
                name="dst"
                value={dstDirPathProps.value}
                setValue={dstDirPathProps.setValue}
                placeholder={'D:\\path\\to\\destination\\directory'}
                error={dstDirPathProps.error}
                setError={dstDirPathProps.setError}
                inputRef={dstDirPathProps.ref}
            />
            <ModeInput value={modeProps.value} setValue={modeProps.setValue} />
        </form>
    )
}

export default CopyJobForm
