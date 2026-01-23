import { CopyAction } from '../../schemas/copyActionSchemas.ts'
import { SelectedPage } from '../../App.tsx'
import React from 'react'
import classNames from 'classnames'

type CopyActionListItemProps = {
    copyAction: CopyAction
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyActionListItem(props: CopyActionListItemProps) {
    const { copyAction } = props

    return (
        <li className="flex flex-col">
            <button
                type="button"
                className={classNames(
                    'ps-4 py-4 cursor-pointer text-start truncate',
                    'hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300',
                    { 'bg-neutral-200': props.selectedPage === copyAction.id }
                )}
                key={copyAction.id}
                onClick={() => props.setSelectedPage(copyAction.id)}
            >
                {copyAction.title}
            </button>
        </li>
    )
}

export default CopyActionListItem
