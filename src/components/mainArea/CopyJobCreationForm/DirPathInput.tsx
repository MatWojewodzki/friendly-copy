import { open } from '@tauri-apps/plugin-dialog'
import { homeDir } from '@tauri-apps/api/path'
import FolderIcon from '../../../assets/folder_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import React from 'react'
import Input from './Input.tsx'

type DirPathInputProps = {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    name: string
    id: string
    placeholder?: string
    error: string
    setError: React.Dispatch<React.SetStateAction<string>>
    validate: (
        path: string,
        setError: React.Dispatch<React.SetStateAction<string>>,
        onlyRemoveError: boolean
    ) => Promise<any>
    inputRef?: React.LegacyRef<HTMLInputElement>
}

function DirPathInput(props: DirPathInputProps) {
    const handleBrowse = async () => {
        const dirPath = await open({
            directory: true,
            defaultPath: await homeDir(),
        })
        if (!dirPath) return
        await props.validate(dirPath, props.setError, false)
        props.setValue(dirPath)
    }

    return (
        <div className="relative flex flex-col">
            <Input
                type={'text'}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={async (e) => {
                    props.setValue(e.target.value)
                    await props.validate(e.target.value, props.setError, true)
                }}
                onBlur={(e) =>
                    props.validate(e.target.value, props.setError, false)
                }
                placeholder={props.placeholder}
                error={props.error}
                aria-invalid={props.error !== ''}
                inputRef={props.inputRef}
            />
            <button
                type="button"
                className="absolute right-1 top-1 rounded-sm hover:bg-neutral-300 focus:outline-none focus:ring ring-black"
                onClick={handleBrowse}
            >
                <FolderIcon className="size-5" />
            </button>
        </div>
    )
}

export default DirPathInput
