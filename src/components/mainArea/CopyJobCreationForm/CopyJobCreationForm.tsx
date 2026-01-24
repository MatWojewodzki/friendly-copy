import React, { useRef, useState } from 'react'
import DirPathInput from './DirPathInput.tsx'
import Input from './Input.tsx'
import { invoke } from '@tauri-apps/api/core'
import {
    userInputCopyJobSchema,
    pathSchema,
} from '../../../schemas/copyJobSchemas.ts'
import useCopyJob from '../../../hooks/useCopyJob.ts'
import ModeInput from './ModeInput.tsx'

function CopyJobCreationForm() {
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

    const validateTitle = (val: string): boolean => {
        setTitleError(val.length > 0 ? '' : 'Title can not be empty')
        return val.length > 0
    }

    const validatePath = async (
        path: string,
        setError: React.Dispatch<React.SetStateAction<string>>,
        onlyRemoveError: boolean
    ): Promise<boolean> => {
        const result = await pathSchema.safeParseAsync(path)
        const error = result.success ? '' : result.error.issues[0].message
        if (!onlyRemoveError || error === '') {
            setError(error)
        }
        return error === ''
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault()

        const titleOk = validateTitle(title)
        const srcDirPathOk = await validatePath(
            srcDirPath,
            setSrcDirPathError,
            false
        )
        const dstDirPathOk = await validatePath(
            dstDirPath,
            setDstDirPathError,
            false
        )

        if (!titleOk) {
            titleRef.current?.focus()
            return
        } else if (!srcDirPathOk) {
            srcDirRef.current?.focus()
            return
        } else if (!dstDirPathOk) {
            dstDirRef.current?.focus()
            return
        }

        const arePathsDifferent: boolean = await invoke('are_paths_different', {
            path1: srcDirPath,
            path2: dstDirPath,
        })
        if (!arePathsDifferent) {
            setDstDirPathError(
                'Destination directory can not be the same as source directory'
            )
            dstDirRef.current?.focus()
            return
        }

        const copyJob = await userInputCopyJobSchema.parseAsync({
            title,
            srcDirPath,
            dstDirPath,
            mode,
        })
        await addCopyJob(copyJob)
    }

    return (
        <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-center mb-8">
                Create a new Copy Job
            </h1>
            <form className="flex flex-col" onSubmit={handleFormSubmit}>
                <label
                    htmlFor="titleInput"
                    className="text-sm font-semibold mb-1"
                >
                    Title
                </label>
                <Input
                    type="text"
                    id="titleInput"
                    name="title"
                    value={title}
                    onChange={(e) => {
                        validateTitle(e.target.value)
                        setTitle(e.target.value)
                    }}
                    placeholder={'Backup Documents to the D: drive'}
                    error={titleError}
                    aria-invalid={titleError !== ''}
                    inputRef={titleRef}
                />
                <label
                    htmlFor="srcInput"
                    className="text-sm font-semibold mb-1"
                >
                    Source directory
                </label>
                <DirPathInput
                    id="srcInput"
                    name="src"
                    value={srcDirPath}
                    setValue={setSrcDirPath}
                    placeholder={'C:\\path\\to\\source\\directory'}
                    error={srcDirPathError}
                    setError={setSrcDirPathError}
                    validate={validatePath}
                    inputRef={srcDirRef}
                />
                <label
                    htmlFor="dstInput"
                    className="text-sm font-semibold mb-1"
                >
                    Destination directory
                </label>
                <DirPathInput
                    id="dstInput"
                    name="dst"
                    value={dstDirPath}
                    setValue={setDstDirPath}
                    placeholder={'D:\\path\\to\\destination\\directory'}
                    error={dstDirPathError}
                    setError={setDstDirPathError}
                    validate={validatePath}
                    inputRef={dstDirRef}
                />
                <ModeInput value={mode} setValue={setMode} />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-3 py-1 border border-neutral-500 rounded-lg hover:bg-neutral-300 focus:outline-none focus:ring ring-black text-sm"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CopyJobCreationForm
