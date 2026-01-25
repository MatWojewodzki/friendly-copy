import { open } from '@tauri-apps/plugin-dialog'
import { homeDir } from '@tauri-apps/api/path'
import FolderIcon from '../../../assets/folder_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import React from 'react'
import Input from './Input.tsx'
import { pathSchema } from '../../../schemas/copyJobSchemas.ts'
import Tooltip from '../../Tooltip.tsx'

type DirPathInputProps = {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    name: string
    id: string
    placeholder?: string
    error: string
    setError: React.Dispatch<React.SetStateAction<string>>
    inputRef?: React.LegacyRef<HTMLInputElement>
}

function DirPathInput(props: DirPathInputProps) {
    const validatePath = async (
        path: string,
        onlyRemoveError: boolean
    ): Promise<boolean> => {
        if (path === '') {
            props.setError('')
            return false
        }
        const result = await pathSchema.safeParseAsync(path)
        const issue = result.success
            ? null
            : result.error.issues.find((issue) => issue.code != 'too_small')
        const error = issue ? issue.message : ''
        if (!onlyRemoveError || error === '') {
            props.setError(error)
        }
        return error === ''
    }

    const handleBrowse = async () => {
        const dirPath = await open({
            directory: true,
            defaultPath: await homeDir(),
        })
        if (!dirPath) return
        await validatePath(dirPath, false)
        props.setValue(dirPath)
    }

    return (
        <div className="relative flex flex-col">
            <Input
                className="pe-7 font-mono"
                type={'text'}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={async (e) => {
                    props.setValue(e.target.value)
                    await validatePath(e.target.value, true)
                }}
                onBlur={(e) => validatePath(e.target.value, false)}
                placeholder={props.placeholder}
                error={props.error}
                aria-invalid={props.error !== ''}
                inputRef={props.inputRef}
            />
            <button
                type="button"
                className="absolute right-1 top-1 rounded-sm hover:bg-neutral-300 focus:outline-none focus:ring ring-black"
                onClick={handleBrowse}
                aria-label="Browse"
            >
                <Tooltip text="Browse">
                    <FolderIcon className="size-5" />
                </Tooltip>
            </button>
        </div>
    )
}

export default DirPathInput
