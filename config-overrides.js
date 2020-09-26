const { override } = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': ["'self'"],
    'connect-src': ["'self'", "http://localhost:5000/", "https://anyx.io/", "https://picsum.photos/", "https://inkito-ipfs.herokuapp.com/", "https://hivesigner.com/", "blacklist.usehive.com"],
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': ["'self'", "http://www.xiti.com/", "https://logv2.xiti.com/"],
    'style-src': ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
    'img-src': ["*", "data:", "blob:"],
    'media-src': "*",
    'font-src': ["'self'", "data:", "fonts.gstatic.com"],
    'worker-src': ["'self'", "https://storage.googleapis.com"],
    'frame-src': ["'self'", "platform.twitter.com", "syndication.twitter.com", "www.youtube.com", "player.vimeo.com", "open.spotify.com", "3speak.online", "emb.d.tube", "player.twitch.tv", "clips.twitch.tv", "www.dailymotion.com", "lbry.tv", "w.soundcloud.com", "www.vimm.tv", "simpleswap.io", "titanembeds.com"]
};

const cspOptions = {
    enabled: true,
    hashingMethod: 'sha256',
    hashEnabled: {
      'script-src': true,
      'style-src': false
    },
    nonceEnabled: {
      'script-src': true,
      'style-src': false
    },
}

function addCspHtmlWebpackPlugin(config) {
    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy, cspOptions));
    }

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};

