import Resizer from './Resizer.tsx'
import classNames from 'classnames'
import { useState } from 'react'
import CopyActionCreationButton from './CopyActionCreationButton.tsx'

function Sidebar() {
    const [width, setWidth] = useState(240)

    return (
        <nav
            style={{ width: `${width}px` }}
            className={classNames(
                'relative flex flex-col',
                'rounded-r-lg shadow-lg'
            )}
        >
            <CopyActionCreationButton />
            <Resizer setSidebarWidth={setWidth} />
        </nav>
    )
}

export default Sidebar
