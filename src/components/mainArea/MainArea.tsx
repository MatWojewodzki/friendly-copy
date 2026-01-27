import CopyJobCreationPage from './CopyJobCreationPage.tsx'
import { SelectedPage } from '../../App.tsx'
import CopyJobViewPage from './copyJobViewPage/CopyJobViewPage.tsx'
import React from 'react'

type MainAreaProps = {
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function MainArea(props: MainAreaProps) {
    return (
        <main className="min-w-xs p-8 grow">
            {props.selectedPage === 'new' ? (
                <CopyJobCreationPage setSelectedPage={props.setSelectedPage} />
            ) : (
                <CopyJobViewPage
                    key={props.selectedPage}
                    id={props.selectedPage}
                    setSelectedPage={props.setSelectedPage}
                />
            )}
        </main>
    )
}

export default MainArea
