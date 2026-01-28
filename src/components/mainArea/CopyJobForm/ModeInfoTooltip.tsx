import Tooltip from '../../Tooltip.tsx'
import InfoIcon from '../../../assets/info_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'

type ModeInfoTooltipProps = {
    modeName: string
    description: string
}

function ModeInfoTooltip(props: ModeInfoTooltipProps) {
    return <Tooltip
        text={props.description}
        id={`${props.modeName}ModeTooltip`}
    >
        <button
            type="button"
            className="p-1 hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300 rounded-sm"
            aria-label={`More info about ${props.modeName} mode`}
            aria-describedby={`${props.modeName}ModeTooltip`}
        >
            <InfoIcon className="size-3"/>
        </button>
    </Tooltip>
}

export default ModeInfoTooltip
