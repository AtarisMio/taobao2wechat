const express = require('express');
const taobao = require('./taobao');
const tmall = require('./tmall');
const page = require('./page');
const apis = express.Router();
const pages = express.Router();
const { domain } = require('./../../../config');

const fetchData = async (req, res, next) => {
    const { id } = req.params;
    const data = await req.app.db_find({ id });
    res.status(200).json(data);
};

const crawlData = async (req, res, next) => {
    const { type, id } = req.params;
    switch (type) {
        case 'taobao': {
            try {
                const pageId = await taobao(id, req.app);
                res.status(200).json({
                    id,
                    url: `${domain}/crawler/${pageId}`
                })
            } catch (e) {
                console.error(e);
                res.send(500);
            }
            break;
        }
        case 'tmall': {
            try {
                const pageId = await tmall(id, req.app);
                res.status(200).json({
                    id,
                    url: `${domain}/crawler/${pageId}`
                })
            } catch (e) {
                console.error(e);
                res.send(500);
            }
            break;
        }
        default:
            res.send(404);
            break;
    }
};

apis.post('/crawl/:type/:id', crawlData);
apis.get('/fetch/:id', fetchData);

pages.get('/:id', page.show);
pages.get('/', page.put);

module.exports = (app) => {
    app.use('/crawler/api/v1', apis);
    app.use('/crawler/', pages);
}