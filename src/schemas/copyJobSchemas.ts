import * as z from 'zod'
import { invoke } from '@tauri-apps/api/core'

export const pathSchema = z
    .string()
    .min(1, 'Path can not be empty')
    .superRefine(async (path, ctx) => {
        const error: string = await invoke('validate_path', { path })
        if (error != '') {
            ctx.addIssue(error)
        }
    })

export const Mode = {
    Copy: 0,
    Mirror: 1,
}

const copyJobBaseSchema = z
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
            ctx.addIssue({
                code: 'custom',
                message: 'Source and destination paths must be different',
                path: ['dstDirPath'],
            })
        }
    })

export const copyJobSchema = copyJobBaseSchema.extend({ id: z.uuidv4() })

export type CopyJob = z.infer<typeof copyJobSchema>

export const userInputCopyJobSchema = copyJobBaseSchema.extend({
    id: z.uuidv4().default(() => crypto.randomUUID()),
})
