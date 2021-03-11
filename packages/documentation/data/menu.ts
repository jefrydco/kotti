import {
	Kotti,
	KtAccordion,
	KtActionbar,
	KtAvatar,
	KtBanner,
	KtBreadcrumb,
	KtButton,
	KtCard,
	KtComment,
	KtDrawer,
	KtDropdown,
	KtForm,
	KtHeading,
	KtInlineEdit,
	KtInput,
	KtLine,
	KtModal,
	KtNavbar,
	KtPagination,
	KtPopover,
	KtRadio,
	KtSteps,
	KtTable,
	KtToaster,
	KtUserMenu,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { kebabCase, startCase } from 'lodash'

export enum Tag {
	CSS = 'css',
	DEPRECATED = 'deprecated',
	GUIDE = 'guide',
	TS = 'ts',
}

export type SubsectionPage = {
	label: string
	tags: Array<Tag>
	path: string
}

export type Subsection = {
	icon: Yoco.Icon
	title: string
	path: string
	pages: Array<SubsectionPage>
}

export type Section = {
	title: string | null
	subsections: Array<Subsection>
}

const makeComponentMenuItem = (component: {
	name: string
	meta: Kotti.Meta
}): SubsectionPage => ({
	label: startCase(component.name.replace(/^Kt/, '')),
	path: kebabCase(component.name.replace(/^Kt/, '')),
	tags: [
		component.meta.deprecated === null ? null : Tag.DEPRECATED,
		component.meta.typeScript === null ? null : Tag.TS,
	].filter((x) => x !== null) as Tag[],
})

export const menu: Array<Section> = [
	{
		title: null,
		subsections: [
			{ icon: Yoco.Icon.FILE, title: 'Overview', path: '', pages: [] },
			{
				icon: Yoco.Icon.VERSION,
				title: 'Changelog',
				path: 'changelog',
				pages: [],
			},
		],
	},
	{
		title: 'Foundations',
		subsections: [
			{
				icon: Yoco.Icon.EDIT,
				title: 'Text',
				path: 'foundations/text',
				pages: [
					{ label: 'Typography', path: 'typography', tags: [Tag.CSS] },
					{ label: 'Writing Style ', path: 'writing-style', tags: [Tag.GUIDE] },
				],
			},
			{
				icon: Yoco.Icon.DIMENSION,
				title: 'Units',
				path: 'foundations/units',
				pages: [],
			},
			{
				icon: Yoco.Icon.MARKUP,
				title: 'Icons',
				path: 'foundations/icons',
				pages: [
					{ label: 'List', path: 'list', tags: [Tag.CSS, Tag.TS] },
					{
						label: 'TypeScript Usage',
						path: 'typescript',
						tags: [Tag.GUIDE],
					},
					{
						label: 'Design Guidelines',
						path: 'design-guidelines',
						tags: [Tag.GUIDE],
					},
				],
			},
			{
				icon: Yoco.Icon.JSON,
				title: 'Tokens',
				path: 'foundations/tokens',
				pages: [
					{
						label: 'Introduction to tokens',
						path: 'introduction',
						tags: [Tag.GUIDE],
					},
					{ label: 'Colors', path: 'colors', tags: [Tag.CSS] },
					{ label: 'Figma', path: 'figma', tags: [Tag.GUIDE] },
					{ label: 'Theming', path: 'theming', tags: [Tag.GUIDE] },
				],
			},
		],
	},
	{
		title: 'Usage',
		subsections: [
			{
				icon: Yoco.Icon.DASHBOARD,
				title: 'Components',
				path: 'usage/components',
				pages: [
					makeComponentMenuItem(KtAccordion),
					makeComponentMenuItem(KtAvatar),
					makeComponentMenuItem(KtBanner),
					makeComponentMenuItem(KtButton),
					makeComponentMenuItem(KtBreadcrumb),
					makeComponentMenuItem(KtCard),
					makeComponentMenuItem(KtComment),
					makeComponentMenuItem(KtDrawer),
					makeComponentMenuItem(KtDropdown),
					makeComponentMenuItem(KtForm),
					{ label: 'Form Fields', path: 'form-fields', tags: [Tag.TS] },
					makeComponentMenuItem(KtHeading),
					makeComponentMenuItem(KtInlineEdit),
					makeComponentMenuItem(KtInput),
					makeComponentMenuItem(KtLine),
					{ label: 'Loadings', path: 'loadings', tags: [Tag.CSS] },
					makeComponentMenuItem(KtModal),
					makeComponentMenuItem(KtPagination),
					makeComponentMenuItem(KtPopover),
					makeComponentMenuItem(KtRadio),
					makeComponentMenuItem(KtSteps),
					makeComponentMenuItem(KtTable),
					makeComponentMenuItem(KtToaster),
				],
			},
			{
				icon: Yoco.Icon.LAYER,
				title: 'Layouts',
				path: 'usage/layouts',
				pages: [
					{ label: 'Introduction', path: 'introduction', tags: [Tag.GUIDE] },
					{ label: 'Grid System', path: 'grid-system', tags: [Tag.TS] },
					makeComponentMenuItem(KtNavbar),
					makeComponentMenuItem(KtActionbar),
					makeComponentMenuItem(KtUserMenu),
				],
			},
			{
				icon: Yoco.Icon.MATERIAL,
				title: 'Utilities',
				path: 'usage/utilities',
				pages: [],
			},
		],
	},
]
