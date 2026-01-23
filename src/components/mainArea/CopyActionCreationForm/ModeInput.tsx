import React from 'react'
import { Mode } from '../../../schemas/copyActionSchemas.ts'

type CopyModeInputProps = {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

function ModeInput(props: CopyModeInputProps) {
    const options = [
        { label: 'Copy', value: Mode.Copy },
        { label: 'Mirror', value: Mode.Mirror },
    ]
    return (
        <fieldset className="flex flex-col mb-8">
            <legend className="text-sm font-semibold mb-1">Copy mode</legend>
            <div className="flex flex-col gap-1 ps-1">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="text-sm flex items-center gap-1"
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
                ))}
            </div>
        </fieldset>
    )
}

export default ModeInput
