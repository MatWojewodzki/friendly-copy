import React from 'react'

export type ActionButtonPanelProps = {
    children?: React.ReactNode
}

function ActionButtonPanel(props: ActionButtonPanelProps) {
    return <div className="flex justify-end gap-3">{props.children}</div>
}

export default ActionButtonPanel
