import CopyJobCreationForm from './CopyJobCreationForm/CopyJobCreationForm.tsx'
import { SelectedPage } from '../../App.tsx'
import CopyJobView from './CopyJobView.tsx'

type MainAreaProps = {
    selectedPage: SelectedPage
}

function MainArea(props: MainAreaProps) {
    return (
        <main className="flex-1 p-8">
            {props.selectedPage === 'new' ? (
                <CopyJobCreationForm />
            ) : (
                <CopyJobView id={props.selectedPage} />
            )}
        </main>
    )
}

export default MainArea
