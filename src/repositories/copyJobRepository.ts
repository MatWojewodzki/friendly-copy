import { getDb } from '../db'
import { CopyJob, copyJobSchema } from '../schemas/copyJobSchemas.ts'

type CopyJobRow = {
    id: string
    title: string
    src_path: string
    dst_path: string
    mode: number
}

async function mapRowToCopyJob(row: CopyJobRow): Promise<CopyJob> {
    return await copyJobSchema.parseAsync({
        id: row.id,
        title: row.title,
        srcDirPath: row.src_path,
        dstDirPath: row.dst_path,
        mode: row.mode,
    })
}

export async function listCopyJobs(): Promise<CopyJob[]> {
    const db = await getDb()
    const rows = await db.select<CopyJobRow[]>('SELECT * FROM copy_job')
    return await Promise.all(rows.map(mapRowToCopyJob))
}

export async function insertCopyJob(copyJob: CopyJob): Promise<void> {
    const db = await getDb()
    await db.execute(
        'INSERT INTO copy_job (id, title, src_path, dst_path, mode) VALUES ($1, $2, $3, $4, $5)',
        [
            copyJob.id,
            copyJob.title,
            copyJob.srcDirPath,
            copyJob.dstDirPath,
            copyJob.mode,
        ]
    )
}
