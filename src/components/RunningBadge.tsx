function RunningBadge() {
    return (
        <div className="flex gap-1 items-center border border-green-700 px-2 py-1 rounded-full">
            <div className="size-1 rounded-full bg-green-700 animate-pulse" />
            <div className="text-xs font-semibold text-green-700">Running</div>
        </div>
    )
}

export default RunningBadge
