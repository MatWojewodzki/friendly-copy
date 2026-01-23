import './main.css'
import Sidebar from './components/sidebar/Sidebar.tsx'
import MainArea from './components/mainArea/MainArea.tsx'
import { CopyActionProvider } from './contexts/copyActionContext.tsx'
import { useState } from 'react'

export type SelectedPage = string

function App() {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>('new')
    return (
        <CopyActionProvider>
            <div className="flex h-screen bg-neutral-100">
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
