import './main.css'
import Sidebar from './components/sidebar/Sidebar.tsx'
import MainArea from './components/mainArea/MainArea.tsx'
import { CopyActionProvider } from './contexts/copyActionContext.tsx'
import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { message } from '@tauri-apps/plugin-dialog'

export type SelectedPage = string

function App() {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>('new')
    useEffect(() => {
        invoke<boolean>('is_robocopy_available').then((is_available) => {
            if (!is_available) {
                message(
                    "Robocopy is not available on this system. You won't be able to run any Copy Actions.",
                    {
                        kind: 'error',
                    }
                ).catch(console.error)
            }
        })
    }, [])
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
