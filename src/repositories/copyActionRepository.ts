import { getDb } from '../db'
import { CopyAction } from '../schemas/copyActionSchemas.ts'

export async function listCopyActions(): Promise<CopyAction[]> {
    const db = await getDb()
    return await db.select('SELECT * FROM copy_action')
}

export async function insertCopyAction(copyAction: CopyAction): Promise<void> {
    const db = await getDb()
    await db.execute(
        'INSERT INTO copy_action (id, title, src_path, dst_path, mode) VALUES ($1, $2, $3, $4, $5)',
        [
            copyAction.id,
            copyAction.title,
            copyAction.srcDirPath,
            copyAction.dstDirPath,
            copyAction.mode,
        ]
    )
}
