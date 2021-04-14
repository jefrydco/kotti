<template>
	<div class="kt-popover">
		<div ref="triggerRef">
			<slot />
		</div>
		<div ref="contentRef" :class="popperClass">
			<slot :close="onClose" name="content">
				<IconTextItem
					v-for="(option, index) in options"
					:key="index"
					:dataTest="option.dataTest"
					:icon="option.icon"
					:isDisabled="option.isDisabled"
					:label="option.label"
					@click="handleItemClick(option)"
				/>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { computed, defineComponent, Ref, ref } from '@vue/composition-api'
import { Instance, roundArrow, Props as TippyProps } from 'tippy.js'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../constants'
import { isYocoIcon } from '../validators'

import IconTextItem from './components/IconTextItem.vue'
import { KottiPopover } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const optionIsValid = (option: any): option is KottiPopover.Option =>
	typeof option === 'object' &&
	option !== null &&
	(typeof option.icon === 'undefined' || isYocoIcon(option.icon)) &&
	['undefined', 'boolean'].includes(typeof option.isDisabled) &&
	(option.isDisabled || typeof option.onClick === 'function') &&
	['undefined', 'string'].includes(typeof option.label) &&
	['undefined', 'string'].includes(typeof option.dataTest)

const TRIGGER_MAP: Record<KottiPopover.Trigger, TippyProps['trigger']> = {
	[KottiPopover.Trigger.CLICK]: 'click focus',
	[KottiPopover.Trigger.HOVER]: 'mouseenter focus',
	[KottiPopover.Trigger.MANUAL]: 'manual',
}

export default defineComponent<KottiPopover.PropsInternal>({
	name: 'KtPopover',
	components: {
		IconTextItem,
	},
	props: {
		options: {
			default: () => [],
			type: Array,
			validator: (options: KottiPopover.Option[]) =>
				options.every(optionIsValid),
		},
		placement: {
			default: KottiPopover.Placement.AUTO,
			type: String,
			validator: (value: unknown): value is KottiPopover.Placement =>
				Object.values(KottiPopover.Placement).includes(
					value as KottiPopover.Placement,
				),
		},
		size: {
			default: KottiPopover.Size.AUTO,
			type: String,
			validator: (value: unknown): value is KottiPopover.Size =>
				Object.values(KottiPopover.Size).includes(value as KottiPopover.Size),
		},
		trigger: {
			required: true,
			type: String,
			validator: (value: unknown): value is KottiPopover.Trigger =>
				Object.values(KottiPopover.Trigger).includes(
					value as KottiPopover.Trigger,
				),
		},
	},
	setup(props) {
		const triggerRef = ref<HTMLElement | null>(null)
		const contentRef = ref<HTMLElement | null>(null)

		const tippy = useTippy(
			triggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: contentRef.value,
				interactive: true,
				maxWidth: 'none',
				offset: [0, TIPPY_LIGHT_BORDER_ARROW_HEIGHT],
				placement: props.placement,
				theme: 'light-border',
				trigger: TRIGGER_MAP[props.trigger],
			})),
		).tippy as Ref<Instance>

		return {
			close: () => tippy.value.hide(),
			contentRef,
			handleItemClick: (option: KottiPopover.Option) => {
				if (!option.isDisabled && option.onClick) option.onClick()
			},
			onClose: () => tippy.value.hide(),
			open: () => tippy.value.show(),
			popperClass: computed(() => {
				const classes = ['kt-popper', `kt-popper--size-${props.size}`]

				if (props.options.length >= 1) classes.push(`kt-popper--has-options`)

				return classes
			}),
			triggerRef,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-popover {
	display: inline-block;
	&-item {
		padding: $unit-4;
		margin: -$unit-1;
	}
}

.kt-popper {
	margin: 3px -1px; // tippy theme applies 5px 9px padding, therefore this equals 8px 8px

	&--has-options {
		min-width: 200px;
	}

	&--size {
		&-auto {
			width: auto;
		}

		&-sm {
			width: 12rem;
		}

		&-md {
			width: 16rem;
		}

		&-lg {
			width: 20rem;
		}

		&-xl {
			width: 24rem;
		}
	}
}
</style>
