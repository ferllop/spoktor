import clean from 'rollup-plugin-clean'
import copy from 'rollup-plugin-copy'
import {terser} from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

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
    input: 'src/delivery/web/index.ts',
    output: {
        sourcemap: true,
        file: './build/index.js',
        format: 'es',
    },
    plugins: [
        clean(),
        copy(copyOptions),
        terser(),
        typescript(),
    ],
}
