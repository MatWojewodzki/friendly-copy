import { open } from '@tauri-apps/plugin-dialog'
import { homeDir } from '@tauri-apps/api/path'
import FolderIcon from '../../../assets/folder_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import React from 'react'

function DirPathInput({
    value,
    setValue,
    name,
    id,
}: {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    name: string
    id: string
}) {
    const handleBrowse = async () => {
        const dirPath = await open({
            directory: true,
            defaultPath: await homeDir(),
        })
        if (!dirPath) return
        setValue(dirPath)
    }

    return (
        <div className="relative flex">
            <input
                className="h-7 mb-8 ps-2 py-1 flex-1 border border-neutral-500 rounded-sm focus:outline-none focus:ring-1 ring-black text-sm"
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                className="absolute right-1 top-1 rounded-sm hover:bg-neutral-300 focus:outline-none focus:ring ring-black"
                onClick={handleBrowse}
            >
                <FolderIcon className="size-5" />
            </button>
        </div>
    )
}

export default DirPathInput
