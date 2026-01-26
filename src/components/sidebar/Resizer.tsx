import React, { useEffect, useRef } from 'react'

type ResizerProps = {
    setSidebarWidth: React.Dispatch<React.SetStateAction<number>>
}

const MIN_WIDTH = 100

function Resizer(props: ResizerProps) {
    const isDraggingRef = useRef(false)
    const lastMouseXRef = useRef(0)
    const resizerRef = useRef<HTMLDivElement | null>(null)

    const startDragging: React.MouseEventHandler<HTMLDivElement> = (e) => {
        document.body.style.cursor = 'ew-resize'
        document.body.style.userSelect = 'none'
        isDraggingRef.current = true
        lastMouseXRef.current = e.clientX
    }

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => {
            if (!isDraggingRef.current) return

            const deltaX = e.clientX - lastMouseXRef.current
            lastMouseXRef.current = e.clientX

            const resizerElement = resizerRef.current!
            const appElement = resizerElement.parentElement!.parentElement!
            const maxWidth = appElement.clientWidth - 30

            props.setSidebarWidth((oldWidth) =>
                Math.max(MIN_WIDTH, Math.min(oldWidth + deltaX, maxWidth))
            )
        }

        const mouseUpHandler = () => {
            document.body.style.cursor = 'auto'
            document.body.style.userSelect = ''
            isDraggingRef.current = false
        }

        document.addEventListener('mouseup', mouseUpHandler)
        document.addEventListener('mousemove', mouseMoveHandler)

        return () => {
            document.removeEventListener('mouseup', mouseUpHandler)
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    }, [])

    return (
        <div
            className="h-screen w-3 right-0 translate-x-1/2 absolute z-99 cursor-ew-resize"
            onMouseDown={startDragging}
            ref={resizerRef}
        ></div>
    )
}

export default Resizer
