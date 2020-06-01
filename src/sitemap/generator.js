const { sitemapBuilder } = require('react-router-sitemap');
const routes = require('./routes');
const path = require('path'); 
const fs = require('fs'); 

const dest = path.resolve('./public', 'sitemap.xml');

const hostname = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://inkito.io'; 

const sitemap = sitemapBuilder(hostname, routes);

fs.writeFileSync(dest, sitemap.toString());