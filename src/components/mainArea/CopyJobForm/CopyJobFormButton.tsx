import React from 'react'

type FormButtonProps = {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    children?: React.ReactNode
    form?: string
}

function CopyJobFormButton(props: FormButtonProps) {
    return (
        <button
            type={props.type}
            form={props.form}
            className="px-3 py-1 border border-neutral-500 rounded-lg hover:bg-neutral-300 focus:outline-none focus:ring ring-black text-sm"
        >
            {props.children}
        </button>
    )
}

export default CopyJobFormButton
