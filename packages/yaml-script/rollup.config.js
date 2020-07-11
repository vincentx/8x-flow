import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: 'src/main.js',
        output: {file: 'dist/8x-flow.yaml-script.full.js', format: 'umd', name: 'YamlScript'},
        plugins: [
            commonjs(),
            resolve(),
            babel({babelHelpers: 'bundled'})]
    },
    {
        output: {file: 'dist/8x-flow.yaml-script.esm.js', format: 'esm'},
        input: 'src/main.js',
        plugins: [
            babel({babelHelpers: 'bundled'})]
    },
];