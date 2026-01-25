import CopyJobCreationPage from './CopyJobCreationPage.tsx'
import { SelectedPage } from '../../App.tsx'
import CopyJobViewPage from './CopyJobViewPage.tsx'
import React from 'react'

type MainAreaProps = {
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function MainArea(props: MainAreaProps) {
    return (
        <main className="flex-1 p-8">
            {props.selectedPage === 'new' ? (
                <CopyJobCreationPage setSelectedPage={props.setSelectedPage} />
            ) : (
                <CopyJobViewPage id={props.selectedPage} />
            )}
        </main>
    )
}

export default MainArea
