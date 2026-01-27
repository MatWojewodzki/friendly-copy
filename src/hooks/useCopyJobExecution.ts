import { useContext } from 'react'
import { CopyJobExecutionContext } from '../contexts/copyJobExecutionContext.tsx'

const useCopyJobExecution = () => {
    const context = useContext(CopyJobExecutionContext)
    if (!context) {
        throw new Error(
            'useCopyJobExecution must be used within a CopyJobExecutionProvider'
        )
    }
    return context
}

export default useCopyJobExecution
