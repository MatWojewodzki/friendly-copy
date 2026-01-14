import React, { useState } from 'react'
import DirPathInput from './DirPathInput.tsx'

function CopyActionCreationForm() {
    const [srcDirPath, setSrcDirPath] = useState('')
    const [dstDirPath, setDstDirPath] = useState('')

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
    }

    return (
        <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-center mb-8">
                Create new Copy Action
            </h1>
            <form className="flex flex-col" onSubmit={handleFormSubmit}>
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
                />
                <div className="flex justify-end">
                    <button className="px-3 py-1 border border-neutral-500 rounded-lg hover:bg-neutral-300 focus:outline-none focus:ring ring-black text-sm">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CopyActionCreationForm
