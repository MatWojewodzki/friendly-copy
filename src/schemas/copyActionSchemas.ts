import * as z from 'zod'
import { invoke } from '@tauri-apps/api/core'

export const pathSchema = z.string().superRefine(async (path, ctx) => {
    const error: string = await invoke('validate_path', { path })
    if (error != '') {
        ctx.addIssue(error)
    }
})

export const userInputCopyActionSchema = z
    .object({
        title: z.string().min(1, 'Title can not be empty'),
        srcDirPath: pathSchema,
        dstDirPath: pathSchema,
    })
    .superRefine(async (data, ctx) => {
        const { srcDirPath, dstDirPath } = data
        const arePathsDifferent: boolean = await invoke('are_paths_different', {
            path1: srcDirPath,
            path2: dstDirPath,
        })
        if (!arePathsDifferent) {
            ctx.addIssue('Paths must be different')
        }
    })

export type UserInputCopyAction = z.infer<typeof userInputCopyActionSchema>

export const copyActionSchema = userInputCopyActionSchema.extend({
    id: z.number(),
})

export type CopyAction = z.infer<typeof copyActionSchema>
