import CopyActionCreationForm from './CopyActionCreationForm/CopyActionCreationForm.tsx'
import { SelectedPage } from '../../App.tsx'
import CopyActionView from './CopyActionView.tsx'

type MainAreaProps = {
    selectedPage: SelectedPage
}

function MainArea(props: MainAreaProps) {
    return (
        <main className="flex-1 p-8">
            {props.selectedPage === 'new' ? (
                <CopyActionCreationForm />
            ) : (
                <CopyActionView id={props.selectedPage} />
            )}
        </main>
    )
}

export default MainArea
