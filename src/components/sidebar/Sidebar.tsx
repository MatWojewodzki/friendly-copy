import Resizer from './Resizer.tsx'
import classNames from 'classnames'
import React, { useState } from 'react'
import NewCopyActionButton from './NewCopyActionButton.tsx'
import CopyActionList from './CopyActionList.tsx'
import { SelectedPage } from '../../App.tsx'

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
                'relative flex flex-col',
                'rounded-r-lg shadow-lg'
            )}
        >
            <NewCopyActionButton setSelectedPage={props.setSelectedPage} />
            <CopyActionList
                selectedPage={props.selectedPage}
                setSelectedPage={props.setSelectedPage}
            />
            <Resizer setSidebarWidth={setWidth} />
        </nav>
    )
}

export default Sidebar
