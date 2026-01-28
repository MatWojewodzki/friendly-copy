import React from 'react'
import classNames from 'classnames'

type ActionButtonProps = {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    children?: React.ReactNode
    form?: string
    onClick?: () => void
}

function ActionButton(props: ActionButtonProps) {
    return (
        <button
            type={props.type}
            form={props.form}
            className={classNames(
                'px-3 py-1 border border-neutral-500 rounded-lg text-sm',
                'hover:bg-neutral-300 focus:outline-none focus-visible:bg-neutral-300 focus-visible:ring ring-black '
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default ActionButton
