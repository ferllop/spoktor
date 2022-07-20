import copy from 'rollup-plugin-copy'
import {terser} from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

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
        sourcemap: false,
        file: './build/js/index.js',
        format: 'es',
    },
    plugins: [
        del({ targets: 'build/*' }),
        copy(copyOptions),
        terser(),
    ],
}
