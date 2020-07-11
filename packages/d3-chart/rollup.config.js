import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: 'src/main.js',
        output: {file: 'dist/8x-flow.d3-chart.full.js', format: 'umd', name: 'D3Chart'},
        plugins: [
            commonjs(),
            json(),
            resolve(),
            babel({babelHelpers: 'bundled'})]
    },
    {
        output: {file: 'dist/8x-flow.d3-chart.esm.js', format: 'esm'},
        input: 'src/main.js',
        plugins: [
            babel({babelHelpers: 'bundled'})]
    },
];