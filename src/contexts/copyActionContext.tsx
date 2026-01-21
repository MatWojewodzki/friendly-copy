import React, { createContext, useEffect, useState } from 'react'
import {
    deleteCopyAction,
    insertCopyAction,
    listCopyActions,
} from '../repositories/copyActionRepository'
import {
    UserInputCopyAction,
    copyActionSchema,
    CopyAction,
} from '../schemas/copyActionSchemas.ts'

export type CopyActionContextValue = {
    getCopyActions: () => CopyAction[]
    addCopyAction: (copyAction: UserInputCopyAction) => Promise<number>
    removeCopyAction: (id: number) => Promise<void>
    getCopyAction: (id: number) => CopyAction | undefined
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

    const getCopyAction = (id: number): CopyAction | undefined => {
        return copyActions.find((copyAction) => copyAction.id === id)
    }

    const addCopyAction = async (
        userInputCopyAction: UserInputCopyAction
    ): Promise<number> => {
        const id = await insertCopyAction(userInputCopyAction)
        const copyAction = await copyActionSchema.parseAsync({
            id,
            ...userInputCopyAction,
        })
        setCopyActions([...copyActions, copyAction])
        return id
    }

    const removeCopyAction = async (id: number) => {
        await deleteCopyAction(id)
        setCopyActions(copyActions.filter((copyAction) => copyAction.id !== id))
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
                removeCopyAction,
            }}
        >
            {children}
        </CopyActionContext.Provider>
    )
}
