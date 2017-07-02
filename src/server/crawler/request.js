const iconv = require('iconv-lite');
const request = require('request');

module.exports = async (url) => {
    return await new Promise((resolve) => {
        request.get(url, { headers: { referer: 'https://www.taobao.com/' }, encoding: null }, (err, res, body) => {
            resolve(iconv.decode(body, 'GBK'));
        });
    });
}