import React from 'react'
import { Mode } from '../../../schemas/copyJobSchemas.ts'
import classNames from 'classnames'

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
            <legend className="text-sm font-semibold mb-1">Mode</legend>
            <div className="flex flex-col gap-1 ps-1">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={classNames(
                            'text-sm flex items-center gap-1',
                            { 'text-red-700': option.value === Mode.Mirror }
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
                ))}
            </div>
        </fieldset>
    )
}

export default ModeInput
