import React, { createContext, useEffect, useState } from 'react'
import {
    insertCopyAction,
    listCopyActions,
} from '../repositories/copyActionRepository'
import { CopyAction } from '../schemas/copyActionSchemas.ts'

export type CopyActionContextValue = {
    getCopyActions: () => CopyAction[]
    addCopyAction: (copyAction: CopyAction) => Promise<void>
    getCopyAction: (id: string) => CopyAction | undefined
}

export const CopyActionContext = createContext<CopyActionContextValue | null>(
    null
)

export function CopyActionProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [copyActions, setCopyActions] = useState<CopyAction[]>([])

    const getCopyActions = (): CopyAction[] => {
        return copyActions
    }

    const getCopyAction = (id: string): CopyAction | undefined => {
        return copyActions.find((copyAction) => copyAction.id === id)
    }

    const addCopyAction = async (copyAction: CopyAction): Promise<void> => {
        await insertCopyAction(copyAction)
        setCopyActions([...copyActions, copyAction])
    }

    useEffect(() => {
        const loadCopyActions = async () => {
            setCopyActions(await listCopyActions())
        }
        loadCopyActions().catch(console.error)
    }, [])

    return (
        <CopyActionContext.Provider
            value={{
                getCopyActions,
                getCopyAction,
                addCopyAction,
            }}
        >
            {children}
        </CopyActionContext.Provider>
    )
}
