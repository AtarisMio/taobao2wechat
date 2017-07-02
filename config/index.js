const path = require('path');
const readConfig = (configPath) => {
    try{
        return require(configPath);
    } catch (e) {
        console.log(configPath, 'not readable');
        return null;
    }
}

const defaultConfig = readConfig('./default');
const developmentConfig = readConfig('./development');
const productionConfig = readConfig('./production');
const localConfig = readConfig('./local');

const env = {
    'd': 'development',
    'dev': 'development',
    'develop': 'development',
    'development': 'development',
    'p': 'production',
    'pro': 'production',
    'product': 'production',
    'production': 'production',
}[process.env.NODE_ENV];

module.exports = Object.assign({}, 
                               defaultConfig,
                               env === 'production' ? productionConfig : developmentConfig,
                               localConfig);