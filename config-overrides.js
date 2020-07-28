const { override } = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': ["'self'"],
    'connect-src': ["'self'", "https://anyx.io/", "https://picsum.photos/", "https://inkito-ipfs.herokuapp.com/", "https://hivesigner.com/", "blacklist.usehive.com"],
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': ["'self'","http://www.xiti.com/", "https://logv2.xiti.com/", "nounce-reactDevTool"],
    'style-src': ["'self'", "unsafe-inline", "fonts.googleapis.com", "https://logv2.xiti.com/"],
    'img-src': ["*", "data:", "blob:", "https://logv2.xiti.com/"],
    'media-src': "*",
    'font-src': ["'self'", "data:", "fonts.gstatic.com"],
    'worker-src': ["'self'","https://storage.googleapis.com"],
    'frame-src': ["'self'", "platform.twitter.com", "syndication.twitter.com", "www.youtube.com", "player.vimeo.com", "open.spotify.com", "3speak.online", "emb.d.tube", "player.twitch.tv", "clips.twitch.tv", "www.dailymotion.com", "lbry.tv", "w.soundcloud.com", "www.vimm.tv", "simpleswap.io", "titanembeds.com"]
};

function addCspHtmlWebpackPlugin(config) {
    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    }

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};

