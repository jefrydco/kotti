import { KottiField } from '../kotti-field/types'

export namespace KottiFieldMultiSelect {
	export type Props = KottiField.Props<Value> &
		Shared.Props & {
			collapseTagsAfter: number
		}

	export type Translations = Shared.Translations

	export type Value = Shared.Entry['value'][]
}

export namespace Shared {
	export type Entry<
		V extends string | number | boolean | symbol | null =
			| string
			| number
			| boolean
			| symbol
			| null
	> = {
		isDisabled?: boolean
		label: string
		value: V
	}

	export type Props = {
		actions: Shared.Action[]
		options: Shared.Entry[]
		placeholder: string | null
	}

	export type Action = {
		label: string
		onClick: () => void
	}

	export type Translations = {
		loadingText: string
		noDataText: string
		noMatchText: string
		placeholder: string
	}
}

export namespace KottiFieldSingleSelect {
	export type Props = KottiField.Props<Value> & Shared.Props

	export type Translations = Shared.Translations

	export type Value = Shared.Entry['value']
}
