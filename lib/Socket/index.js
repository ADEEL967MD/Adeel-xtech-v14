import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';
// export the last socket layer
const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    if (config.auth?.creds?.registered) {
        newConfig.browser = ['Chrome', 'Android', '15'];
    }
    return makeCommunitiesSocket(newConfig);
};
export default makeWASocket;
//# sourceMappingURL=index.js.map