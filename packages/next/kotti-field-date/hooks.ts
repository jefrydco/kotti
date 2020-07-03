import { onMounted, Ref, watchEffect } from '@vue/composition-api'
import { DatePicker as ElDate, Header } from 'element-ui'

import { KottiField } from '../kotti-field/types'
import { Yoco } from '../types'

import {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
} from './types'

type Values =
	| KottiFieldDate.Value
	| KottiFieldDateRange.Value
	| KottiFieldDateTime.Value
	| KottiFieldDateTimeRange.Value

type HookParameters<DATA_TYPE extends Values> = {
	elDateRef: Ref<ElDateWithInternalAPI | null>
	field: KottiField.Hook.Returns<DATA_TYPE>
	inputContainerRef: Ref<Element | null>
	popperHeight: string
	popperWidth: string
}

export type ElDateWithInternalAPI = ElDate & {
	blur(): void
	picker: Vue & {
		$el: HTMLElement
		leftLabel: string
		rightLabel: string
		width: number
	}
	pickerVisible: boolean
	referenceElm: Element
}

const getDateComponent = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	const dateComponent = elDateRef.value
	if (dateComponent === null) throw new Error('el-date not available')

	return dateComponent
}

/**
 * `picker` (the popper component) is (un)set with `(un)mountPicker`.
 * dependency tracking is done through `pickerVisible`, an internally computed prop,
 * because the `picker` gets a new reference on each call of `mountPicker()`.
 * so using any property on the picker to trigger the `watchEffect` won’t work
 * NOTE: The order inside the condition matters as pickerVisible needs to be accessed first
 */
const isPickerVisible = (dateComponent: ElDateWithInternalAPI) =>
	dateComponent.pickerVisible

const useInputDecoration = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		const dateComponent = getDateComponent({ elDateRef })

		// replace el-input affix icons with yoco icons
		for (const icon of dateComponent.$el.querySelectorAll('.el-input__icon'))
			icon.classList.add('yoco')

		const prefixIcon = dateComponent.$el.querySelector(
			'.el-input__icon.el-icon-time, .el-input__icon.el-icon-date',
		) as HTMLElement

		prefixIcon.innerText = prefixIcon.classList.contains('el-icon-time')
			? 'clock'
			: 'calendar'

		const suffixIcon = dateComponent.$el.querySelector(
			'.el-input__icon:not(.el-icon-time):not(.el-icon-date)',
		) as HTMLElement

		suffixIcon.innerText = 'close'
	})
}

const useInputSizeFix = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		const dateComponent = getDateComponent({ elDateRef })

		const elInput = dateComponent.$el.querySelector('.el-input__inner')
		elInput?.setAttribute('size', '1')
	})
}

const usePickerDimensionsFix = <DATA_TYPE extends Values>({
	elDateRef,
	inputContainerRef,
	popperWidth,
	popperHeight,
}: Pick<
	HookParameters<DATA_TYPE>,
	'elDateRef' | 'inputContainerRef' | 'popperHeight' | 'popperWidth'
>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })

		const ktFieldDateInputContainer = inputContainerRef.value
		if (ktFieldDateInputContainer === null)
			throw new Error('kt-field-date__input-container not available')

		if (isPickerVisible(dateComponent)) {
			const newWidth = ktFieldDateInputContainer.getBoundingClientRect().width
			// eslint-disable-next-line no-magic-numbers
			dateComponent.picker.$el.style.width = `${(newWidth * 50) / 100}px`
			dateComponent.picker.$el.style.minWidth = popperWidth
			dateComponent.picker.$el.style.height = popperHeight
		}
	})
}

const usePickerInnerInputsFix = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })
		if (isPickerVisible(dateComponent)) {
			const innerInputsWrapper: Array<Element> = Array.from(
				dateComponent.picker.$el.querySelectorAll(
					'.el-date-picker__editor-wrap, .el-date-range-picker__time-picker-wrap',
				),
			)
			innerInputsWrapper.forEach((input) =>
				input.classList.add(
					...[
						'kt-field__wrapper',
						'kt-field__wrapper--is-small',
						'kt-field__wrapper--no-validation',
					],
				),
			)

			const innerInputs: Array<Element> = Array.from(
				dateComponent.picker.$el.querySelectorAll('.el-input__inner'),
			)

			innerInputs.forEach((input) => {
				input.classList.add('kt-field__input-container')
				input.setAttribute('size', '1')
			})
		}
	})
}

/**
 * If the field is loading, we want to unfocus in case the popper is open
 * so that when isLoading changes, the popper isn't misplaced
 */
const usePickerMisplacementFix = <DATA_TYPE extends Values>({
	elDateRef,
	field,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef' | 'field'>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })

		if (field.isLoading || field.isDisabled) return dateComponent.blur()
	})
}

/**
 * add yoco class to header icons to enable yoco icons
 */
const usePickerNavigationIcons = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })

		if (isPickerVisible(dateComponent)) {
			const insertYocoIcon = (icon: Yoco.Icon) => `<i class="yoco">${icon}</i>`

			const pickerHeaderIcons: Array<HTMLElement> = Array.from(
				dateComponent.picker.$el.querySelectorAll('.el-picker-panel__icon-btn'),
			)

			const headerYocoIcons = [
				// TODO: replace triangle_* with double_chevron*
				insertYocoIcon('triangle_left'),
				insertYocoIcon('chevron_left'),
				insertYocoIcon('triangle_right'),
				insertYocoIcon('chevron_right'),
			]

			pickerHeaderIcons.forEach((icon, index) => {
				icon.innerHTML = headerYocoIcons[index]
			})
		}
	})
}

/**
 * placement fix
 * same hack as the one used in the selects but for the datepickers, the popper component.data
 * are merged with the DateComponent’s own data, therefore allowing access to properties on popper component
 * directly through dateComponent
 */
const usePickerPlacementFix = <DATA_TYPE extends Values>({
	elDateRef,
	inputContainerRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef' | 'inputContainerRef'>) => {
	onMounted(() => {
		const dateComponent = getDateComponent({ elDateRef })

		const ktFieldDateInputContainer = inputContainerRef.value
		if (ktFieldDateInputContainer === null)
			throw new Error('kt-field-date__input-container not available')

		dateComponent.referenceElm = ktFieldDateInputContainer
	})
}

const useRangePickerHeaderFix = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })
		if (isPickerVisible(dateComponent)) {
			// change when any of the navigation buttons in the range-pickers are clicked
			const dates = [
				dateComponent.picker.leftLabel?.split(/\s+/) ?? ['', ''],
				dateComponent.picker.rightLabel?.split(/\s+/) ?? ['', ''],
			]

			const headers = dateComponent.picker.$el.querySelectorAll(
				'.el-date-range-picker__header',
			)

			headers.forEach((header, index) => {
				const fullDate = header.querySelector('div')
				if (fullDate) {
					fullDate.innerHTML = dates[index][0] // leftMonth or rightMonth
					if (header.lastChild?.nodeType === Node.TEXT_NODE) {
						// we add a text node each call with the new year value, thus need to remove the old first
						header.removeChild(header.lastChild)
					}
					header.append(dates[index][1])
				}
			})
		}
	})
}

export const usePicker = <DATA_TYPE extends Values>({
	elDateRef,
	field,
	inputContainerRef,
	popperHeight,
	popperWidth,
}: HookParameters<DATA_TYPE>) => {
	useInputDecoration({ elDateRef })
	useInputSizeFix({ elDateRef })
	usePickerDimensionsFix({
		elDateRef,
		inputContainerRef,
		popperHeight,
		popperWidth,
	})
	usePickerInnerInputsFix({ elDateRef })
	usePickerMisplacementFix({ elDateRef, field })
	usePickerNavigationIcons({ elDateRef })
	usePickerPlacementFix({ elDateRef, inputContainerRef })
	useRangePickerHeaderFix({ elDateRef })
}
