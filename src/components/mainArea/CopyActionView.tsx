import useCopyAction from '../../hooks/useCopyAction.ts'

type CopyActionViewProps = {
    id: number
}

function CopyActionView(props: CopyActionViewProps) {
    const { getCopyAction } = useCopyAction()
    const copyAction = getCopyAction(props.id)!
    return <div>{copyAction.title}</div>
}

export default CopyActionView
