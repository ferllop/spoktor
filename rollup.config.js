import clean from 'rollup-plugin-clean'
import copy from 'rollup-plugin-copy'
import {terser} from 'rollup-plugin-terser'

const copyOptions = {
    targets: [
        {
            src: [
                'src/index.html',
            ], dest: 'build',
        },
        {
            src: [
                'src/css',
            ], dest: 'build',
        }
    ],
}

export default {
    input: 'src/js/index.js',
    output: {
        sourcemap: true,
        file: './build/js/index.js',
        format: 'es',
    },
    plugins: [
        clean(),
        copy(copyOptions),
        terser(),
    ],
}
