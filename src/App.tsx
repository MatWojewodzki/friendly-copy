import './main.css'
import Sidebar from './components/sidebar/Sidebar.tsx'
import MainArea from './components/mainArea/MainArea.tsx'
import { CopyActionProvider } from './contexts/copyActionContext.tsx'
import { useState } from 'react'

export type SelectedPage = 'new' | number

function App() {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>('new')
    return (
        <CopyActionProvider>
            <div className="flex h-screen bg-neutral-200">
                <Sidebar
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
                <MainArea selectedPage={selectedPage} />
            </div>
        </CopyActionProvider>
    )
}

export default App
