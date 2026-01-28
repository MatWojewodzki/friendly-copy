import classNames from 'classnames'
import IconComponent from '../../assets/add_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import React from 'react'
import { SelectedPage } from '../../App.tsx'

type NewCopyJobButtonProps = {
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function NewCopyJobButton(props: NewCopyJobButtonProps) {
    return (
        <button
            className={classNames(
                'py-4 ps-2 flex items-center gap-2',
                ' cursor-pointer hover:bg-neutral-300 focus:outline-none focus-visible:bg-neutral-300'
            )}
            onClick={() => props.setSelectedPage('new')}
        >
            <IconComponent className="size-6 shrink-0" />
            <p className="truncate">New copy job</p>
        </button>
    )
}

export default NewCopyJobButton
