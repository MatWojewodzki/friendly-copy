import './main.css'
import Sidebar from './components/sidebar/Sidebar.tsx'
import MainArea from './components/mainArea/MainArea.tsx'
import { CopyJobProvider } from './contexts/copyJobContext.tsx'
import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { message } from '@tauri-apps/plugin-dialog'
import { CopyJobExecutionProvider } from './contexts/copyJobExecutionContext.tsx'

export type SelectedPage = string

function App() {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>('new')

    useEffect(() => {
        invoke<boolean>('is_robocopy_available').then((is_available) => {
            if (!is_available) {
                message(
                    "Robocopy is not available on this system. You won't be able to run any copy jobs.",
                    {
                        title: 'Robocopy not available',
                        kind: 'error',
                    }
                ).catch(console.error)
            }
        })
    }, [])
    return (
        <CopyJobProvider>
            <CopyJobExecutionProvider>
                <div className="flex h-screen bg-neutral-100 overflow-hidden">
                    <Sidebar
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                    <MainArea
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                </div>
            </CopyJobExecutionProvider>
        </CopyJobProvider>
    )
}

export default App
