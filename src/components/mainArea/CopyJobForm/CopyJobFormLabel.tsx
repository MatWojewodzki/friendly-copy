import React from 'react'

export type CopyJobFormLabelProps = {
    htmlFor: string
    children?: React.ReactNode
}

function CopyJobFormLabel(props: CopyJobFormLabelProps) {
    return (
        <label htmlFor={props.htmlFor} className="text-sm font-semibold mb-1">
            {props.children}
        </label>
    )
}

export default CopyJobFormLabel
