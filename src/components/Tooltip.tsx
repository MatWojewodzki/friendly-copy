import React from 'react'
import classNames from 'classnames'

export type TooltipProps = {
    text: string
    children?: React.ReactNode
}

function Tooltip(props: TooltipProps) {
    return (
        <div className="relative group">
            {props.children}
            <div
                className={classNames(
                    'absolute left-1/2 -translate-x-1/2 -top-1 -translate-y-full px-2 py-1 w-max',
                    'bg-neutral-900 text-white font-sans rounded-md text-xs pointer-events-none',
                    'opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 ease-in-out'
                )}
            >
                {props.text}
            </div>
        </div>
    )
}

export default Tooltip
