import React from 'react'
import { Mode } from '../../../schemas/copyJobSchemas.ts'
import classNames from 'classnames'
import ModeInfoTooltip from './ModeInfoTooltip.tsx'

export const modeOptions = [
    {
        value: Mode.Copy,
        label: 'Copy (keep extras)',
        modeName: 'copy',
        description:
            'Copies new and changed files. Keeps files and directories in the destination that do not exist in the source.',
    },
    {
        value: Mode.Mirror,
        label: 'Mirror (delete extras)',
        modeName: 'mirror',
        description:
            'Copies new and changed files. Deletes files and directories in the destination that do not exist in the source.',
    },
]

type CopyModeInputProps = {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}


function ModeInput(props: CopyModeInputProps) {
    return (
        <fieldset className="flex flex-col mb-8">
            <legend className="text-sm font-semibold mb-1">Mode</legend>
            <div className="flex flex-col gap-1 ps-1">
                {modeOptions.map((option) => (
                    <div key={option.value} className="flex gap-2">
                        <label
                            className={classNames(
                                'text-sm flex items-center gap-1',
                                {'text-red-700': option.value === Mode.Mirror}
                            )}
                        >
                            <input
                                type="radio"
                                name="mode"
                                value={option.value}
                                checked={props.value === option.value}
                                onChange={(e) =>
                                    props.setValue(parseInt(e.target.value))
                                }
                            />
                            {option.label}
                        </label>
                        <ModeInfoTooltip modeName={option.modeName} description={option.description} />
                    </div>
                ))}
            </div>
        </fieldset>
    )
}

export default ModeInput
