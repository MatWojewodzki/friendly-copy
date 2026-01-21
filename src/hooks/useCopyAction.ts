import { useContext } from 'react'
import { CopyActionContext } from '../contexts/copyActionContext.tsx'

const useCopyAction = () => {
    const context = useContext(CopyActionContext)
    if (!context) {
        throw new Error(
            'useCopyAction must be used within a CopyActionProvider'
        )
    }
    return context
}

export default useCopyAction
