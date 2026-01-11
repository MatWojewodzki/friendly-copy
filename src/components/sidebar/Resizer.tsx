import React, { useEffect, useRef } from 'react'

const RESIZER_WIDTH = 12 // px

function Resizer({
    setSidebarWidth,
}: {
    setSidebarWidth: React.Dispatch<React.SetStateAction<number>>
}) {
    const isDraggingRef = useRef(false)
    const lastMouseXRef = useRef(0)

    const startDragging: React.MouseEventHandler<HTMLDivElement> = (e) => {
        document.body.style.cursor = 'ew-resize'
        document.body.style.userSelect = 'none'
        isDraggingRef.current = true
        lastMouseXRef.current = e.clientX
    }

    const mouseMoveHandler = (e: MouseEvent) => {
        if (!isDraggingRef.current) return
        const deltaX = e.clientX - lastMouseXRef.current
        lastMouseXRef.current = e.clientX
        setSidebarWidth((oldWidth) =>
            Math.max(RESIZER_WIDTH, Math.min(oldWidth + deltaX, 400))
        )
    }

    const mouseUpHandler = () => {
        document.body.style.cursor = 'auto'
        document.body.style.userSelect = ''
        isDraggingRef.current = false
    }

    useEffect(() => {
        document.addEventListener('mouseup', mouseUpHandler)
        document.addEventListener('mousemove', mouseMoveHandler)
        return () => {
            document.removeEventListener('mouseup', mouseUpHandler)
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    }, [])

    return (
        <div
            style={{ width: RESIZER_WIDTH, right: -RESIZER_WIDTH / 2 }}
            className="h-screen absolute z-99 cursor-ew-resize"
            onMouseDown={startDragging}
        ></div>
    )
}

export default Resizer
