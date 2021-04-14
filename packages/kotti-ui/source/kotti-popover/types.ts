import { Yoco } from '@3yourmind/yoco'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiPopover {
	export type Option = {
		dataTest?: string
		icon: Yoco.Icon
		isDisabled?: boolean
		label?: string
		onClick?: () => void
	}

	export type PropsInternal = {
		options: Option[]
		placement: Placement
		size: Size
		trigger: Trigger
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'trigger'>

	export type Ref = {
		close(): void
		open(): void
	}

	export enum Size {
		AUTO = 'auto',
		EXTRA_LARGE = 'xl',
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export enum Trigger {
		CLICK = 'click',
		HOVER = 'hover',
		MANUAL = 'manual',
	}

	export enum Placement {
		AUTO = 'auto',
		AUTO_END = 'auto-end',
		AUTO_START = 'auto-start',
		BOTTOM = 'bottom',
		BOTTOM_END = 'bottom-end',
		BOTTOM_START = 'bottom-start',
		LEFT = 'left',
		LEFT_END = 'left-end',
		LEFT_START = 'left-start',
		RIGHT = 'right',
		RIGHT_END = 'right-end',
		RIGHT_START = 'right-start',
		TOP = 'top',
		TOP_END = 'top-end',
		TOP_START = 'top-start',
	}
}
