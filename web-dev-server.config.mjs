import {devLocalConfig} from './dev-local-config.js'

export default {
    rootDir: 'src',
    nodeResolve: true,
    port: devLocalConfig.devServerPort,
}
