import classNames from 'classnames'
import IconComponent from '../../assets/add.svg?react'

function NewCopyActionButton() {
    return (
        <button
            className={classNames(
                'py-4 ps-2 flex items-center gap-2',
                'shadow-sm cursor-pointer hover:bg-neutral-300'
            )}
        >
            <IconComponent className="size-6 shrink-0" />
            <p className="truncate">New Copy Action</p>
        </button>
    )
}

export default NewCopyActionButton
