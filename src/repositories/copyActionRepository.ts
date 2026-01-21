import { getDb } from '../db'
import { UserInputCopyAction } from '../schemas/copyActionSchemas.ts'
import { CopyAction } from '../schemas/copyActionSchemas.ts'

export async function listCopyActions(): Promise<CopyAction[]> {
    const db = await getDb()
    return await db.select('SELECT * FROM copy_action')
}

export async function insertCopyAction(
    copyAction: UserInputCopyAction
): Promise<number> {
    const db = await getDb()
    await db.execute(
        'INSERT INTO copy_action (title, src_path, dst_path) VALUES ($1, $2, $3)',
        [copyAction.title, copyAction.srcDirPath, copyAction.dstDirPath]
    )
    const [{ id }] = await db.select<{ id: number }[]>(
        'SELECT last_insert_rowid() as id'
    )
    return id
}

export async function deleteCopyAction(id: number): Promise<void> {
    const db = await getDb()
    await db.execute('DELETE FROM copy_action WHERE id = $1', [id])
}
