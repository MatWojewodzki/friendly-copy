import CopyJobCreationForm from './CopyJobCreationForm.tsx'
import { SelectedPage } from '../../App.tsx'
import CopyJobView from './CopyJobView.tsx'
import React from 'react'

type MainAreaProps = {
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function MainArea(props: MainAreaProps) {
    return (
        <main className="flex-1 p-8">
            {props.selectedPage === 'new' ? (
                <CopyJobCreationForm setSelectedPage={props.setSelectedPage} />
            ) : (
                <CopyJobView id={props.selectedPage} />
            )}
        </main>
    )
}

export default MainArea
