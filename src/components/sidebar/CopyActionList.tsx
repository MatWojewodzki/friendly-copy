import useCopyAction from '../../hooks/useCopyAction.ts'
import { SelectedPage } from '../../App.tsx'
import React from 'react'
import CopyActionListItem from './CopyActionListItem.tsx'

type CopyActionListProps = {
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function CopyActionList(props: CopyActionListProps) {
    const { getCopyActions } = useCopyAction()
    const copyActions = getCopyActions()
    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            <h2 className="px-2 mt-8 mb-2 font-semibold">Copy Actions</h2>
            <ul className="overflow-y-auto">
                {copyActions.length === 0 && (
                    <li className="text-sm text-center">No Copy Actions</li>
                )}
                {copyActions.map((copyAction) => (
                    <CopyActionListItem
                        key={copyAction.id}
                        copyAction={copyAction}
                        selectedPage={props.selectedPage}
                        setSelectedPage={props.setSelectedPage}
                    />
                ))}
            </ul>
        </div>
    )
}

export default CopyActionList
