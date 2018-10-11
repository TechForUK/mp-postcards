import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

export default {
    input: 'index.js',
    output: {
        file: 'dist/gbhackoff-postcards-action.js',
        format: 'cjs'
    },
    plugins: [resolve(), commonjs(), json(), builtins()]
};
