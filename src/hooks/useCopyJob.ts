import { useContext } from 'react'
import { CopyJobContext } from '../contexts/copyJobContext.tsx'

const useCopyJob = () => {
    const context = useContext(CopyJobContext)
    if (!context) {
        throw new Error('useCopyJob must be used within a CopyJobProvider')
    }
    return context
}

export default useCopyJob
