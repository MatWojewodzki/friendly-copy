import './main.css'
import Sidebar from './components/sidebar/Sidebar.tsx'
import MainArea from './components/mainArea/MainArea.tsx'

function App() {
    return (
        <div className="flex h-screen bg-neutral-200">
            <Sidebar />
            <MainArea />
        </div>
    )
}

export default App
