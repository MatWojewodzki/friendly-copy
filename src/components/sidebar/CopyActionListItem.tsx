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
        <li
            className={classNames(
                'ps-2 py-4 cursor-pointer shadow-sm truncate',
                'hover:bg-neutral-300 focus:outline-none focus:ring ring-black',
                { 'bg-neutral-300': props.selectedPage === copyAction.id }
            )}
            key={copyAction.id}
            onClick={() => props.setSelectedPage(copyAction.id)}
        >
            {copyAction.title}
        </li>
    )
}

export default CopyActionListItem
