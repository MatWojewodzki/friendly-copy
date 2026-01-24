import { getDb } from '../db'
import { CopyJob } from '../schemas/copyJobSchemas.ts'

export async function listCopyJobs(): Promise<CopyJob[]> {
    const db = await getDb()
    return await db.select('SELECT * FROM copy_job')
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
