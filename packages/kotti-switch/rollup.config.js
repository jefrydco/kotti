import vue from 'rollup-plugin-vue';

const inputPath = 'src/Switch.vue';
const filePrefix = 'kotti-switch';
const camelCasesPrefix = 'KottiSwitch';

export default {
	input: inputPath,
	output: [
		{
			file: `dist/${filePrefix}.cjs.js`,
			format: 'cjs',
			sourcemap: true,
		},
		{
			name: camelCasesPrefix,
			file: `dist/${filePrefix}.umd.js`,
			format: 'umd',
			sourcemap: true,
		},
		{
			file: `dist/${filePrefix}.amd.js`,
			format: 'amd',
			sourcemap: true,
		},
		{
			file: `dist/${filePrefix}.esm.js`,
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		vue({
			css: `dist/${filePrefix}.css`,
		}),
	],
};
