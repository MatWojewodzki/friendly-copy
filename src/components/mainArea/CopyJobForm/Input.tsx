import React from 'react'
import classNames from 'classnames'

export type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    error?: string
    id: string
    inputRef?: React.LegacyRef<HTMLInputElement>
}

function Input({ error, className, id, inputRef, ...props }: InputProps) {
    const errorId = `${id}Error`
    return (
        <div className="flex flex-col">
            <input
                className={classNames(
                    'h-7 mb-1 ps-2 py-1 flex-1 text-sm',
                    'border border-neutral-500 aria-invalid:border-red-700 rounded-sm',
                    'focus:outline-none focus:ring-1 ring-black aria-invalid:ring-red-700',
                    className
                )}
                {...props}
                autoComplete="off"
                aria-describedby={errorId}
                ref={inputRef}
            />
            <p
                id={errorId}
                aria-live="polite"
                className={classNames('min-h-5 mb-2 text-xs text-red-700', {
                    invisible: error && error === '',
                })}
            >
                {error}
            </p>
        </div>
    )
}

export default Input
