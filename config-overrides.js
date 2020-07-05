const {override} = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': ["'self'","https://anyx.io/","https://picsum.photos/","https://inkito-ipfs.herokuapp.com/","https://hivesigner.com/"],
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': ["'self'"],
    'style-src': ["'self'"],
    'img-src': "* data:"
};

function addCspHtmlWebpackPlugin(config) {
    if(process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    }

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};