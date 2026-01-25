import React from 'react'

export type MainAreaHeaderProps = {
    children?: React.ReactNode
}

function MainAreaHeader(props: MainAreaHeaderProps) {
    return (
        <h1 className="font-bold text-2xl text-center mb-8">
            {props.children}
        </h1>
    )
}

export default MainAreaHeader
