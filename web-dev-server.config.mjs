import {devLocalConfig} from './dev-local-config.js'
import { esbuildPlugin } from '@web/dev-server-esbuild'

export default {
    rootDir: 'src',
    nodeResolve: true,
    port: devLocalConfig.devServerPort,
    plugins: [
        esbuildPlugin({
            ts: true,
        }),
    ],
}
