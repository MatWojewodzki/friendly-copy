import classNames from 'classnames'
import IconComponent from '../../assets/add.svg?react'

function CopyActionCreationButton() {
    return (
        <button
            className={classNames(
                'py-4 ps-2 flex items-center gap-2',
                'shadow-sm cursor-pointer hover:bg-neutral-300'
            )}
        >
            <IconComponent className="size-6 shrink-0" />
            <p className="truncate">Create new Copy Action</p>
        </button>
    )
}

export default CopyActionCreationButton
