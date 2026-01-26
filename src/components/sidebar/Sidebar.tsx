import Resizer from './Resizer.tsx'
import classNames from 'classnames'
import NewCopyJobButton from './NewCopyJobButton.tsx'
import CopyJobList from './CopyJobList.tsx'
import { SelectedPage } from '../../App.tsx'
import React, { useState } from 'react'

type SidebarProps = {
    selectedPage: SelectedPage
    setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>
}

function Sidebar(props: SidebarProps) {
    const [width, setWidth] = useState(240)
    return (
        <nav
            style={{ width: `${width}px` }}
            className={classNames(
                'relative flex flex-col shrink-0',
                'rounded-r-lg shadow-lg'
            )}
        >
            <NewCopyJobButton setSelectedPage={props.setSelectedPage} />
            <CopyJobList
                selectedPage={props.selectedPage}
                setSelectedPage={props.setSelectedPage}
            />
            <Resizer setSidebarWidth={setWidth} />
        </nav>
    )
}

export default Sidebar
