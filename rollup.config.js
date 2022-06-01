import clean from 'rollup-plugin-clean'
import copy from 'rollup-plugin-copy'
import {terser} from 'rollup-plugin-terser'

const copyOptions = {
    targets: [
        {
            src: [
                'src/delivery/web/index.html',
            ], dest: 'build',
        },
    ],
}

export default {
    input: 'src/delivery/web/index.js',
    output: {
        file: './build/index.js',
        format: 'es',
    },
    plugins: [
        clean(),
        copy(copyOptions),
        terser(),
    ],
}
