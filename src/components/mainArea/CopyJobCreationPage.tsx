import React, { useRef, useState } from 'react'
import { userInputCopyJobSchema } from '../../schemas/copyJobSchemas.ts'
import useCopyJob from '../../hooks/useCopyJob.ts'
import { SelectedPage } from '../../App.tsx'
import CopyJobForm from './CopyJobForm/CopyJobForm.tsx'
import CopyJobFormButton from './CopyJobForm/CopyJobFormButton.tsx'
import MainAreaHeader from './MainAreaHeader.tsx'

type CopyJobCreationFormProps = {
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyJobCreationPage(props: CopyJobCreationFormProps) {
    const { addCopyJob } = useCopyJob()

    const titleRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState<string>('')

    const srcDirRef = useRef<HTMLInputElement>(null)
    const [srcDirPath, setSrcDirPath] = useState('')
    const [srcDirPathError, setSrcDirPathError] = useState<string>('')

    const dstDirRef = useRef<HTMLInputElement>(null)
    const [dstDirPath, setDstDirPath] = useState('')
    const [dstDirPathError, setDstDirPathError] = useState<string>('')

    const [mode, setMode] = useState(0)

    const handleFormSubmit = async () => {
        const copyJob = await userInputCopyJobSchema.parseAsync({
            title,
            srcDirPath,
            dstDirPath,
            mode,
        })
        await addCopyJob(copyJob)
        props.setSelectedPage(copyJob.id)
    }

    return (
        <div className="flex flex-col">
            <MainAreaHeader>Create a new Copy Job</MainAreaHeader>
            <CopyJobForm
                formId={'copyJobCreationForm'}
                titleProps={{
                    value: title,
                    setValue: setTitle,
                    error: titleError,
                    setError: setTitleError,
                    ref: titleRef,
                }}
                srcDirPathProps={{
                    value: srcDirPath,
                    setValue: setSrcDirPath,
                    error: srcDirPathError,
                    setError: setSrcDirPathError,
                    ref: srcDirRef,
                }}
                dstDirPathProps={{
                    value: dstDirPath,
                    setValue: setDstDirPath,
                    error: dstDirPathError,
                    setError: setDstDirPathError,
                    ref: dstDirRef,
                }}
                modeProps={{ value: mode, setValue: setMode }}
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
