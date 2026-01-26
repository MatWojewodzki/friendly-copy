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

async function listCopyJobs(): Promise<CopyJob[]> {
    const db = await getDb()
    const rows = await db.select<CopyJobRow[]>('SELECT * FROM copy_job')
    return await Promise.all(rows.map(mapRowToCopyJob))
}

async function insertCopyJob(copyJob: CopyJob): Promise<void> {
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

async function deleteCopyJob(id: string): Promise<void> {
    const db = await getDb()
    await db.execute('DELETE FROM copy_job WHERE id = $1', [id])
}

async function editCopyJob(copyJob: CopyJob): Promise<void> {
    const db = await getDb()
    console.log(
        await db.execute(
            'UPDATE copy_job SET title = $1, src_path = $2, dst_path = $3, mode = $4 WHERE id = $5',
            [
                copyJob.title,
                copyJob.srcDirPath,
                copyJob.dstDirPath,
                copyJob.mode,
                copyJob.id,
            ]
        )
    )
}

const copyJobRepository = {
    listCopyJobs,
    insertCopyJob,
    deleteCopyJob,
    editCopyJob,
}

export default copyJobRepository
