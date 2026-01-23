import * as z from 'zod'
import { invoke } from '@tauri-apps/api/core'

export const pathSchema = z.string().superRefine(async (path, ctx) => {
    const error: string = await invoke('validate_path', { path })
    if (error != '') {
        ctx.addIssue(error)
    }
})

export const Mode = {
    Copy: 0,
    Mirror: 1,
}

const copyActionBaseSchema = z
    .object({
        title: z.string().min(1, 'Title can not be empty'),
        srcDirPath: pathSchema,
        dstDirPath: pathSchema,
        mode: z.enum(Mode),
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

export const copyActionSchema = copyActionBaseSchema.extend({ id: z.uuidv4() })

export type CopyAction = z.infer<typeof copyActionSchema>

export const userInputCopyActionSchema = copyActionBaseSchema.extend({
    id: z.uuidv4().default(() => crypto.randomUUID()),
})
