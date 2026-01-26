import classNames from 'classnames'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import ContentCopyIcon from '../../assets/content_copy_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import CheckIcon from '../../assets/check_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import { useRef, useState } from 'react'
import Tooltip from '../Tooltip.tsx'

export type DirPathViewProps = {
    path: string
}

const COPIED_DURATION = 1000

function DirPathView(props: DirPathViewProps) {
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<number | null>(null)
    const copyPath = async () => {
        await writeText(props.path)
        setCopied(true)
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = window.setTimeout(() => {
            setCopied(false)
        }, COPIED_DURATION)
    }
    return (
        <div
            className={classNames(
                'relative flex h-7 ps-2 pe-7 py-1 mb-8',
                'border border-neutral-500 rounded-sm'
            )}
        >
            <span className="font-mono text-sm truncate">{props.path}</span>
            <button
                type="button"
                className="absolute right-1 top-1 rounded-sm hover:bg-neutral-300 focus:outline-none focus:ring ring-black"
                onClick={copyPath}
                aria-label={copied ? 'Copied' : 'Copy path'}
            >
                <Tooltip text={copied ? 'Copied!' : 'Copy path'}>
                    {copied ? (
                        <CheckIcon className="size-5" />
                    ) : (
                        <ContentCopyIcon className="size-5" />
                    )}
                </Tooltip>
            </button>
        </div>
    )
}

export default DirPathView
